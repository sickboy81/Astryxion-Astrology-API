import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { hmacSha256Base64Url } from "../lib/utils.js";
import { ApiKeyRecord } from "../lib/types.js";
import { getResolvedApiKeyHashSecret } from "../lib/env-validation.js";

export async function registerAuthRoutes(app: FastifyInstance, apiKeyStore: any, redis: any) {
  /**
   * Generates a free "Basic" tier API key for immediate testing.
   * No auth required for this specific demo endpoint.
   */
  app.post("/api/v1/auth/demo-key", { schema: { hide: true } }, async (req: any, reply) => {
    const secret = getResolvedApiKeyHashSecret();
    const { domain } = req.body || {};

    if (!domain) {
      return reply.code(400).send({ error: "VALIDATION_ERROR", message: "Authorized domain is required." });
    }

    // Generate a unique key
    const apiKey = `ak_demo_${crypto.randomBytes(18).toString("base64url")}`;
    const hash = hmacSha256Base64Url(secret, apiKey);

    const record: ApiKeyRecord = {
      tier: "free",
      status: "active",
      customerId: "demo_visitor",
      authorizedDomains: domain ? [domain] : []
    };

    // Save to the store (Redis + In-Memory Fallback)
    await apiKeyStore.saveRecord(hash, record);

    app.log.info({ hash }, "New demo API key generated via landing page.");

    return {
      apiKey,
      tier: "free",
      expiresAt: "Never (Demo)",
      message: "This is a basic tier key. Enjoy exploring the Astro API!"
    };
  });
}
