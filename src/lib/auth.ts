import Redis from "ioredis";
import { Tier, ApiKeyRecord, TierConfig } from "./types.js";
import { sha256Base64Url, hmacSha256Base64Url, jsonParseSafe, endOfDayUtcSeconds } from "./utils.js";
import { TIERS, TIERS_CONFIG } from "../data/constants.js";
import {
  getResolvedApiKeyHashSecret,
  getSwaggerSandboxApiKey,
  isLegacyDevTestKeyAllowed,
  parseSwaggerSandboxTier,
} from "./env-validation.js";

export function createApiKeyStore(redis: Redis | null) {
  const envKeysRaw = process.env.API_KEYS_JSON;
  const envKeys = envKeysRaw ? jsonParseSafe<Array<{ key: string; tier: Tier; status?: "active" | "disabled" }>>(envKeysRaw) : null;
  const envKeyMap = new Map<string, ApiKeyRecord>();
  
  if (envKeys?.length) {
    for (const entry of envKeys) {
      if (entry?.key && entry?.tier) {
        envKeyMap.set(entry.key, { tier: entry.tier, status: entry.status ?? "active" });
      }
    }
  }

  const inMemoryKeys = new Map<string, string>(); // hash -> json string

  async function getRecordByKey(apiKey: string): Promise<{ hash: string; record: ApiKeyRecord } | null> {
    const sandboxKey = getSwaggerSandboxApiKey();
    if (sandboxKey && apiKey === sandboxKey) {
      const tier = parseSwaggerSandboxTier() as Tier;
      const hmacSecret = getResolvedApiKeyHashSecret();
      return {
        hash: hmacSha256Base64Url(hmacSecret, apiKey),
        record: { tier, status: "active" },
      };
    }

    if (apiKey === "dev_test_key" && isLegacyDevTestKeyAllowed()) {
      return { hash: sha256Base64Url(apiKey), record: { tier: "admin", status: "active" } };
    }

    const hmacSecret = getResolvedApiKeyHashSecret();
    const hash = hmacSha256Base64Url(hmacSecret, apiKey);
    
    // Check Redis if available
    if (redis) {
      const blacklisted = await redis.sismember("api_keys:blacklist", hash);
      if (blacklisted) return null;
      const raw = await redis.hget("api_keys", hash);
      const record = raw ? (jsonParseSafe<ApiKeyRecord>(raw) ?? null) : null;
      if (record && record.status === "active") return { hash, record };
    }

    // Check In-Memory fallback (for development without Redis)
    const rawInMemory = inMemoryKeys.get(hash);
    if (rawInMemory) {
      const record = jsonParseSafe<ApiKeyRecord>(rawInMemory);
      if (record && record.status === "active") return { hash, record };
    }

    // Check Environment Hardcoded Keys (supports plain text or fallback hash)
    const record = envKeyMap.get(apiKey);
    if (record && record.status === "active") return { hash, record };

    return null;
  }

  async function saveRecord(hash: string, record: ApiKeyRecord): Promise<void> {
    const json = JSON.stringify(record);
    if (redis) {
      await redis.hset("api_keys", hash, json);
    }
    // Always save to memory as secondary/fallback
    inMemoryKeys.set(hash, json);
  }

  async function getAllRecords(): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    
    // 1. Get from InMemory Fallback First
    for (const [k, v] of inMemoryKeys.entries()) {
      result[k] = v;
    }
    
    // 2. Merge with Redis if available
    if (redis) {
      try {
        const raw = await redis.hgetall("api_keys");
        for (const [k, v] of Object.entries(raw)) {
           result[k] = v;
        }
      } catch (e) { } // Ignore redis failures, graceful fallback
    }
    
    // 3. Add static env keys if available
    for (const [k, v] of envKeyMap.entries()) {
       const staticHash = sha256Base64Url(k);
       result[staticHash] = JSON.stringify(v);
    }
    
    return result;
  }

  async function getRecordByHash(hash: string): Promise<string | null> {
    if (redis) {
       const raw = await redis.hget("api_keys", hash);
       if (raw) return raw;
    }
    return inMemoryKeys.get(hash) || null;
  }

  async function deleteRecord(hash: string): Promise<void> {
    inMemoryKeys.delete(hash);
    if (redis) {
      await redis.hdel("api_keys", hash);
      await redis.srem("api_keys:blacklist", hash);
    }
  }

  return { getRecordByKey, saveRecord, getAllRecords, getRecordByHash, deleteRecord };
}

async function getTierLimits(redis: Redis | null, tier: Tier): Promise<{ requestsPerDay: number }> {
  if (redis) {
    try {
      const raw = await redis.hget("config:tiers", tier);
      if (raw) {
        const config = jsonParseSafe<TierConfig>(raw);
        if (config && typeof config.requestsPerDay === "number") {
          return { requestsPerDay: config.requestsPerDay };
        }
      }
    } catch { /* ignore */ }
  }
  return TIERS[tier] || { requestsPerDay: 0 };
}

export function createRateLimiter(redis: Redis | null) {
  async function checkAndIncrement(opts: { apiKeyHash: string; tier: Tier }) {
    const { requestsPerDay: limit } = await getTierLimits(redis, opts.tier);
    const today = new Date();
    const dateBucket = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, "0")}-${String(today.getUTCDate()).padStart(2, "0")}`;
    const key = `rate:${opts.apiKeyHash}:${dateBucket}`;
    const ttlSeconds = endOfDayUtcSeconds(today) + 5;
    const resetAt = Date.now() + ttlSeconds * 1000;

    if (opts.tier === "admin") {
      return { allowed: true, limit, remaining: null as number | null, resetAt };
    }

    if (!redis) {
      return { allowed: true, limit, remaining: null as number | null, resetAt };
    }

    const multi = redis.multi();
    multi.incr(key);
    multi.expire(key, ttlSeconds);
    const results = await multi.exec();
    const count = Number(results?.[0]?.[1] ?? 0);
    const remaining = Math.max(0, limit - count);
    const allowed = count <= limit;
    return { allowed, limit, remaining, resetAt };
  }

  return { checkAndIncrement };
}

export function parseBearer(authorizationHeader: string | null) {
  if (!authorizationHeader) return null;
  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}
