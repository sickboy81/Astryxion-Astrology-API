import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import crypto from "node:crypto";
import { errorBody, hmacSha256Base64Url, jsonParseSafe } from "../lib/utils.js";
import { getResolvedApiKeyHashSecret } from "../lib/env-validation.js";
import { ApiKeyRecord, Tier, TierConfig } from "../lib/types.js";
import { TIERS_CONFIG } from "../data/constants.js";
import os from "node:os";
import { getBrowserPoolStatus, resetBrowserPool } from "../lib/pdf-engine.js";

const AdminCreateKeySchema = z.object({
  tier: z.enum(["free", "mercury", "venus", "saturn", "admin"]),
  status: z.enum(["active", "disabled"]).default("active"),
  customerId: z.string().min(1).optional().nullable(),
});

const AdminUpdateTierSchema = z.object({
  id: z.enum(["free", "mercury", "venus", "saturn"]),
  displayName: z.string().min(1),
  requestsPerDay: z.number().min(1),
  price: z.string().min(1),
  features: z.array(z.string()).optional()
});

export async function registerAdminRoutes(app: FastifyInstance, apiKeyStore: any, userStore: any, redis: any, serviceName: string, port: number, startedAtUtc: string, instanceId: string) {
  
  function getAdminAuthTokenFromRequest(req: FastifyRequest) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
    const xAdmin = req.headers["x-admin-token"];
    return typeof xAdmin === "string" ? xAdmin.trim() : null;
  }

  async function ensureAdmin(req: FastifyRequest, reply: FastifyReply) {
    const token = getAdminAuthTokenFromRequest(req);
    if (!token) {
      return reply.code(401).send(errorBody("UNAUTHORIZED", "Missing session token."));
    }
    const session = await userStore.getSession(token);
    if (!session || session.role !== "admin") {
      return reply.code(403).send(errorBody("FORBIDDEN", "Admin access required."));
    }
    return null;
  }

  app.get("/admin/api/config/tiers", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const results: Record<string, TierConfig> = { ...TIERS_CONFIG };
    if (redis) {
      try {
        const raw = await redis.hgetall("config:tiers");
        for (const [id, json] of Object.entries(raw)) {
          const cfg = jsonParseSafe<TierConfig>(json as string);
          if (cfg) results[id as Tier] = cfg;
        }
      } catch { /* ignore */ }
    }
    return { tiers: Object.values(results).filter(t => t.id !== "admin") };
  });

  app.post("/admin/api/config/tiers", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const parsed = AdminUpdateTierSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));

    const tierId = parsed.data.id;
    const existing = TIERS_CONFIG[tierId];
    const updated: TierConfig = {
      ...existing,
      ...parsed.data,
      features: parsed.data.features || existing.features
    };

    if (redis) {
      await redis.hset("config:tiers", tierId, JSON.stringify(updated));
    }

    return { ok: true, tier: updated };
  });

  app.get("/admin/api/stats", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const apiKeySecretConfigured = Boolean(process.env.API_KEY_HASH_SECRET);
    const redisEnabled = Boolean(redis);
    const redisStatus = redis ? redis.status : "offline";

    let keyCount: number | null = null;
    let blacklistCount: number | null = null;
    if (redisEnabled) {
      try {
        keyCount = await redis.hlen("api_keys");
        blacklistCount = await redis.scard("api_keys:blacklist");
      } catch { /* ignore */ }
    }

    return {
      service: serviceName,
      port,
      startedAtUtc,
      instanceId,
      adminConfigured: true,
      redis: { enabled: redisEnabled, status: redisStatus },
      apiKeys: {
        mode: redisEnabled ? "redis+memory" : "memory-only",
        apiKeyHashSecretConfigured: apiKeySecretConfigured,
        count: keyCount,
        blacklistCount,
      },
    };
  });

  app.get("/admin/api/keys", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const raw = await apiKeyStore.getAllRecords();
    const keys = Object.entries(raw).map(([hash, value]) => {
      const record = jsonParseSafe<ApiKeyRecord>(value as string) ?? { tier: "free" as Tier, status: "disabled" as const };
      return { hash, tier: record.tier, status: record.status, customerId: record.customerId ?? null };
    });
    keys.sort((a, b) => a.hash.localeCompare(b.hash));
    return { keys };
  });

  app.post("/admin/api/keys", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const secret = getResolvedApiKeyHashSecret();
    const parsed = AdminCreateKeySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));

    const apiKey = `ak_${crypto.randomBytes(24).toString("base64url")}`;
    const hash = hmacSha256Base64Url(secret, apiKey);
    const record: ApiKeyRecord = {
      tier: parsed.data.tier as Tier,
      status: parsed.data.status,
      customerId: parsed.data.customerId ?? undefined,
    };
    
    await apiKeyStore.saveRecord(hash, record);

    return { apiKey, hash, record };
  });

  app.post("/admin/api/keys/:hash/status", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const hash = (req.params as any).hash;
    const StatusSchema = z.object({ status: z.enum(["active", "disabled"]) });
    const parsed = StatusSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));

    const existing = await apiKeyStore.getRecordByHash(hash);
    
    const record = existing ? (jsonParseSafe<ApiKeyRecord>(existing) || { tier: "free", status: "disabled" }) : { tier: "free", status: "disabled" };
    const updated = { ...record, status: parsed.data.status };
    
    await apiKeyStore.saveRecord(hash, updated);
    return { ok: true, hash, record: updated };
  });

  app.delete("/admin/api/keys/:hash", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const hash = (req.params as any).hash;
    await apiKeyStore.deleteRecord(hash);
    return { ok: true, hash };
  });

  // --- SYSTEM & INFRASTRUCTURE ROUTES ---

  app.get("/admin/api/system/info", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const mem = process.memoryUsage();
    const redisInfoRaw = redis ? await redis.info() : "";
    
    // Parse some useful bits from redis info
    const redisLines = redisInfoRaw.split("\n");
    const getRedisVal = (key: string) => {
      const line = redisLines.find((l: string) => l.startsWith(key + ":"));
      return line ? line.split(":")[1].trim() : "N/A";
    };

    return {
      service: {
        name: serviceName,
        version: "2.5.0",
        uptime: Math.floor(process.uptime()),
        startedAt: startedAtUtc,
        instanceId,
        nodeVersion: process.version,
        platform: process.platform,
      },
      resources: {
        memory: {
          rss: Math.floor(mem.rss / 1024 / 1024),
          heapTotal: Math.floor(mem.heapTotal / 1024 / 1024),
          heapUsed: Math.floor(mem.heapUsed / 1024 / 1024),
        },
        os: {
          loadAvg: os.loadavg(),
          totalMem: Math.floor(os.totalmem() / 1024 / 1024),
          freeMem: Math.floor(os.freemem() / 1024 / 1024),
        }
      },
      redis: redis ? {
        status: redis.status,
        version: getRedisVal("redis_version"),
        usedMemory: getRedisVal("used_memory_human"),
        peakMemory: getRedisVal("used_memory_peak_human"),
        uptimeDays: getRedisVal("uptime_in_days"),
        connectedClients: getRedisVal("connected_clients"),
        keys: await redis.dbsize().catch(() => 0),
      } : { status: "disabled" },
      pdf: getBrowserPoolStatus()
    };
  });

  app.post("/admin/api/system/cache/clear", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    if (!redis) {
      return reply.code(400).send({ error: "REDIS_DISABLED", message: "Redis is not active." });
    }

    // Surgical Clear: Scan and delete only cache:* and tag:* keys
    let totalDeleted = 0;
    const prefixes = ["cache:*", "tag:*"];
    
    for (const pattern of prefixes) {
      let cursor = "0";
      do {
        const [newCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
        cursor = newCursor;
        if (keys.length > 0) {
          totalDeleted += await redis.del(...keys);
        }
      } while (cursor !== "0");
    }

    return { ok: true, message: `Calculation cache purged safely. ${totalDeleted} keys removed. API Keys and Users were NOT affected.` };
  });

  app.post("/admin/api/system/pool/restart", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    await resetBrowserPool();
    return { ok: true, message: "PDF Browser Pool restarted." };
  });

  // Public System Config (Unprotected for Landing Page)
  app.get("/api/v1/system/config", { schema: { hide: true } }, async (req, reply) => {
    let betaMode = false;
    if (redis) {
      const val = await redis.get("config:system:beta_mode");
      betaMode = val === "true";
    }
    return { betaMode };
  });

  app.get("/admin/api/system/settings", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    let betaMode = false;
    if (redis) {
      const val = await redis.get("config:system:beta_mode");
      betaMode = val === "true";
    }

    return { 
      settings: { betaMode }
    };
  });

  app.post("/admin/api/system/settings", { schema: { hide: true } }, async (req, reply) => {
    const authErr = await ensureAdmin(req, reply);
    if (authErr) return authErr;

    const { betaMode } = req.body as any;
    if (redis) {
      await redis.set("config:system:beta_mode", betaMode ? "true" : "false");
    }

    return { ok: true, betaMode };
  });
}
