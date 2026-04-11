import { test } from "node:test";
import assert from "node:assert/strict";
import type Redis from "ioredis";
import {
  DEV_INTERNAL_SECRET_FALLBACK,
  internalSecretMatches,
  parseSwaggerSandboxTier,
} from "./env-validation.js";
import { createRateLimiter } from "./auth.js";

test("internalSecretMatches: false when INTERNAL_SECRET unset", () => {
  const prev = process.env.INTERNAL_SECRET;
  const prevNode = process.env.NODE_ENV;
  delete process.env.INTERNAL_SECRET;
  process.env.NODE_ENV = "test";
  try {
    assert.equal(internalSecretMatches("x"), false);
    assert.equal(internalSecretMatches(DEV_INTERNAL_SECRET_FALLBACK), true);
  } finally {
    process.env.NODE_ENV = prevNode;
    if (prev === undefined) delete process.env.INTERNAL_SECRET;
    else process.env.INTERNAL_SECRET = prev;
  }
});

test("internalSecretMatches: production without INTERNAL_SECRET rejects", () => {
  const prevNode = process.env.NODE_ENV;
  const prevInt = process.env.INTERNAL_SECRET;
  process.env.NODE_ENV = "production";
  delete process.env.INTERNAL_SECRET;
  try {
    assert.equal(internalSecretMatches(DEV_INTERNAL_SECRET_FALLBACK), false);
    assert.equal(internalSecretMatches("x"), false);
  } finally {
    process.env.NODE_ENV = prevNode;
    if (prevInt === undefined) delete process.env.INTERNAL_SECRET;
    else process.env.INTERNAL_SECRET = prevInt;
  }
});

test("internalSecretMatches: true only for exact match", () => {
  const prev = process.env.INTERNAL_SECRET;
  process.env.INTERNAL_SECRET = "a".repeat(32);
  try {
    assert.equal(internalSecretMatches("a".repeat(32)), true);
    assert.equal(internalSecretMatches("b".repeat(32)), false);
  } finally {
    if (prev === undefined) delete process.env.INTERNAL_SECRET;
    else process.env.INTERNAL_SECRET = prev;
  }
});

test("parseSwaggerSandboxTier: default and invalid", () => {
  const prev = process.env.SWAGGER_SANDBOX_TIER;
  try {
    delete process.env.SWAGGER_SANDBOX_TIER;
    assert.equal(parseSwaggerSandboxTier(), "mercury");
    process.env.SWAGGER_SANDBOX_TIER = "admin";
    assert.equal(parseSwaggerSandboxTier(), "mercury");
    process.env.SWAGGER_SANDBOX_TIER = "saturn";
    assert.equal(parseSwaggerSandboxTier(), "saturn");
  } finally {
    if (prev === undefined) delete process.env.SWAGGER_SANDBOX_TIER;
    else process.env.SWAGGER_SANDBOX_TIER = prev;
  }
});

test("createRateLimiter: admin tier exempt from redis", async () => {
  const rl = createRateLimiter(null);
  const r = await rl.checkAndIncrement({ apiKeyHash: "h", tier: "admin" });
  assert.equal(r.allowed, true);
  assert.equal(r.remaining, null);
});

test("createRateLimiter: enforces daily cap with redis mock", async () => {
  const mock = makeMockRedis(2);
  const rl = createRateLimiter(mock);
  const h = "same_hash";
  assert.equal((await rl.checkAndIncrement({ apiKeyHash: h, tier: "mercury" })).allowed, true);
  assert.equal((await rl.checkAndIncrement({ apiKeyHash: h, tier: "mercury" })).allowed, true);
  assert.equal((await rl.checkAndIncrement({ apiKeyHash: h, tier: "mercury" })).allowed, false);
});

function makeMockRedis(dailyLimit: number): Redis {
  const counts = new Map<string, number>();
  return {
    async hget(table: string, key: string) {
      if (table === "config:tiers" && key === "mercury") {
        return JSON.stringify({
          id: "mercury",
          displayName: "Mercury",
          requestsPerDay: dailyLimit,
          price: "",
          features: [],
        });
      }
      return null;
    },
    multi() {
      const ctx: { key: string } = { key: "" };
      return {
        incr(k: string) {
          ctx.key = k;
          return this;
        },
        expire() {
          return this;
        },
        async exec() {
          const n = (counts.get(ctx.key) ?? 0) + 1;
          counts.set(ctx.key, n);
          return [
            [null, n],
            [null, 1],
          ] as [Error | null, unknown][];
        },
      };
    },
  } as unknown as Redis;
}
