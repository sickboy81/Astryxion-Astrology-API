import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import crypto from "node:crypto";
import { errorBody, hmacSha256Base64Url, jsonParseSafe } from "../lib/utils.js";
import { getResolvedApiKeyHashSecret, getResolvedInternalSecret } from "../lib/env-validation.js";
import { ApiKeyRecord, Tier } from "../lib/types.js";
import { listPublicTiersOrdered } from "../lib/tier-plans.js";

const CreateUserKeySchema = z.object({
  domain: z.string().optional().nullable().transform(v => {
    if (!v || v.trim().length === 0) return null;
    return v.trim();
  }).refine(v => !v || v.length >= 3, { message: "Domain must be at least 3 characters" }),
});

export async function registerPortalMgmtRoutes(app: FastifyInstance, apiKeyStore: any, userStore: any, redis: any) {
  
  async function ensureUser(req: FastifyRequest, reply: FastifyReply) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send(errorBody("UNAUTHORIZED", "Missing session token."));
    }
    const token = authHeader.substring(7);
    const session = await userStore.getSession(token);
    if (!session) {
      return reply.code(401).send(errorBody("UNAUTHORIZED", "Invalid or expired session."));
    }
    return session;
  }

  // 1. Get Dynamic Tiers
  app.get("/api/v1/portal/tiers", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const tiers = await listPublicTiersOrdered(redis);
    return { tiers };
  });

  // 2. List User Keys
  app.get("/api/v1/portal/keys", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const allKeysRaw = await apiKeyStore.getAllRecords();
    const userKeys: any[] = [];

    for (const [hash, json] of Object.entries(allKeysRaw)) {
      const record = jsonParseSafe<ApiKeyRecord>(json as string);
      if (record && record.customerId === session.email) {
        userKeys.push({
          hash,
          tier: record.tier,
          status: record.status,
          authorizedDomains: record.authorizedDomains || []
        });
      }
    }

    return { keys: userKeys };
  });

  // 3. Create User Key (Simplified)
  app.post("/api/v1/portal/keys", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const parsed = CreateUserKeySchema.safeParse(req.body);
    const domain = parsed.success ? (parsed.data.domain || null) : null;

    app.log.info({ email: session.email, domain }, "Requesting new identity token");

    // Generate a secure key
    const newKey = `ask_${crypto.randomBytes(24).toString("hex")}`;
    const secret = getResolvedApiKeyHashSecret();
    const hash = hmacSha256Base64Url(secret, newKey);
    
    let initialTier: Tier = "free";
    if (redis) {
      const val = await redis.get("config:system:beta_mode");
      if (val === "true") {
        initialTier = "mercury";
        app.log.info({ email: session.email }, "BETA MODE: Auto-upgrading new key to mercury tier");
      }
    }

    const record: ApiKeyRecord = {
      tier: initialTier, 
      status: "active",
      customerId: session.email,
      authorizedDomains: domain ? [domain] : []
    };

    try {
      await apiKeyStore.saveRecord(hash, record);
      app.log.info({ email: session.email, hash }, "Identity token generated successfully");
      return { ok: true, apiKey: newKey, hash };
    } catch (e: any) {
      app.log.error({ email: session.email, error: e.message }, "Failed to persist identity token");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Failed to save the secret token."));
    }
  });

  // 4. Delete/Disable User Key
  app.delete("/api/v1/portal/keys/:hash", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const { hash } = req.params as { hash: string };
    const raw = await apiKeyStore.getRecordByHash(hash);
    const record = raw ? jsonParseSafe<ApiKeyRecord>(raw) : null;

    if (!record || record.customerId !== session.email) {
      return reply.code(404).send(errorBody("NOT_FOUND", "Key not found or access denied."));
    }

    await apiKeyStore.deleteRecord(hash);
    
    // Add to blacklist just in case they're being tracked elsewhere
    if (redis) {
      await redis.sadd("api_keys:blacklist", hash);
    }

    return { ok: true };
  });

  // 4b. Edit User Key
  app.put("/api/v1/portal/keys/:hash", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const { hash } = req.params as { hash: string };
    const parsed = CreateUserKeySchema.safeParse(req.body);
    const domain = parsed.success ? parsed.data.domain : null;

    const raw = await apiKeyStore.getRecordByHash(hash);
    const record = raw ? jsonParseSafe<ApiKeyRecord>(raw) : null;

    if (!record || record.customerId !== session.email) {
      return reply.code(404).send(errorBody("NOT_FOUND", "Key not found or access denied."));
    }

    record.authorizedDomains = domain ? [domain] : [];
    await apiKeyStore.saveRecord(hash, record);

    return { ok: true };
  });

  // 5. Usage Stats (Real Redis Tracking)
  app.get("/api/v1/portal/usage", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    let todayHits = 0;
    const history = Array(7).fill(0);
    let totalThisMonth = 0;

    if (redis) {
      // 1. Get all API keys for this user
      const allKeysRaw = await apiKeyStore.getAllRecords();
      const userHashes = Object.entries(allKeysRaw)
        .map(([hash, json]) => {
          const rec = jsonParseSafe<ApiKeyRecord>(json as string);
          return (rec && rec.customerId === session.email) ? hash : null;
        })
        .filter((h): h is string => h !== null);

      if (userHashes.length > 0) {
        const today = new Date();
        
        // Build an array of the last 7 days strings
        const dateBuckets = [];
        for (let i = 0; i < 7; i++) {
          const d = new Date(today);
          d.setUTCDate(today.getUTCDate() - i);
          dateBuckets.push(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`);
        }

        // 2. Fetch data for each day for each hash
        const multi = redis.multi();
        for (const hash of userHashes) {
          for (const bucket of dateBuckets) {
            multi.get(`rate:${hash}:${bucket}`);
          }
        }
        
        const results = await multi.exec();
        
        if (results) {
          // Parse results back into daily sums
          let resultIdx = 0;
          for (const hash of userHashes) {
            for (let i = 0; i < 7; i++) {
              const val = Number(results[resultIdx]?.[1] ?? 0);
              history[6 - i] += val; // older days first
              if (i === 0) todayHits += val;
              resultIdx++;
            }
          }
          totalThisMonth = history.reduce((sum, val) => sum + val, 0); // Simplified to last 7 days total for now
        }
      }
    }

    // Return real data (or 0s if no Redis/keys)
    return {
      today: todayHits,
      history,
      totalThisMonth
    };
  });
  app.put("/api/v1/portal/settings", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const SettingsSchema = z.object({ lang: z.enum(["en", "pt", "es", "hi"]) });
    const parsed = SettingsSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Idioma inválido."));

    await userStore.updateUser(session.email, { preferredLang: parsed.data.lang });
    return { ok: true, lang: parsed.data.lang };
  });

  // 6. Sandbox Proxy (Executes internal calls without requiring the raw API key)
  app.post("/api/v1/portal/sandbox/proxy", { schema: { hide: true } }, async (req, reply) => {
    const session = await ensureUser(req, reply);
    if (!session) return;

    const ProxySchema = z.object({
      endpoint: z.string().startsWith("/"),
      body: z.any().optional(),
      keyHash: z.string().min(1)
    });

    const parsed = ProxySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Invalid proxy request structure."));

    const { endpoint, body, keyHash } = parsed.data;

    // A. Verify key ownership
    const rawKey = await apiKeyStore.getRecordByHash(keyHash);
    const keyRecord = rawKey ? jsonParseSafe<ApiKeyRecord>(rawKey) : null;

    if (!keyRecord || keyRecord.customerId !== session.email) {
      return reply.code(403).send(errorBody("FORBIDDEN", "Unauthorized key selection."));
    }

    // B. Execute internal request via injection
    app.log.info({ email: session.email, endpoint, keyHash }, "Executing sandbox proxy request");
    
    const internalSecret = getResolvedInternalSecret();
    if (!internalSecret) {
      return reply.code(503).send(errorBody("SERVICE_UNAVAILABLE", "INTERNAL_SECRET is not configured."));
    }

    const response = await app.inject({
      method: 'POST',
      url: `/api/v1${endpoint}`,
      payload: body,
      headers: {
        'x-internal-secret': internalSecret,
        'Content-Type': 'application/json'
      }
    });

    // C. Return the result as if it were the direct API
    reply.code(response.statusCode);
    return JSON.parse(response.body);
  });
}

