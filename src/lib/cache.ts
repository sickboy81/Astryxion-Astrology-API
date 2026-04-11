import Redis from "ioredis";
import { jsonParseSafe } from "./utils.js";
import { CacheGetResult } from "./types.js";

export function buildRedisClient() {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  const redis = new Redis(url, {
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
    lazyConnect: true,
  });
  return redis;
}

export function createCache(redis: Redis | null) {
  async function getJson<T>(key: string): Promise<CacheGetResult<T>> {
    if (!redis) return { hit: false, value: null };
    const raw = await redis.get(key);
    if (!raw) return { hit: false, value: null };
    const parsed = jsonParseSafe<T>(raw);
    if (!parsed) return { hit: false, value: null };
    return { hit: true, value: parsed };
  }

  async function setJson<T>(opts: {
    key: string;
    value: T;
    ttlSeconds: number;
    tags?: string[];
  }) {
    if (!redis) return;
    const { key, value, ttlSeconds, tags } = opts;
    const pipeline = redis.multi();
    pipeline.set(key, JSON.stringify(value), "EX", ttlSeconds);
    if (tags?.length) {
      for (const tag of tags) {
        const tagKey = `tag:${tag}`;
        pipeline.sadd(tagKey, key);
        pipeline.expire(tagKey, Math.max(ttlSeconds, 60));
      }
    }
    await pipeline.exec();
  }

  async function invalidateTags(tags: string[]) {
    if (!redis) return { deletedKeys: 0 };
    const keys = new Set<string>();
    for (const tag of tags) {
      const members = await redis.smembers(`tag:${tag}`);
      for (const key of members) keys.add(key);
    }
    if (!keys.size) return { deletedKeys: 0 };
    const deleted = await redis.del([...keys]);
    return { deletedKeys: deleted };
  }

  return { getJson, setJson, invalidateTags };
}
