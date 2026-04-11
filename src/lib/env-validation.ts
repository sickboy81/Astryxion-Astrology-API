import type { Tier } from "./types.js";

export const MIN_SECRET_LENGTH = 32;
export const MIN_SANDBOX_KEY_LENGTH = 16;

const SANDBOX_TIERS = ["free", "mercury", "venus", "saturn"] as const;
export type SandboxTier = (typeof SANDBOX_TIERS)[number];

export function isProductionNodeEnv(): boolean {
  return process.env.NODE_ENV === "production";
}

/** Dev-only fallback when API_KEY_HASH_SECRET is unset (never used in production after validate). */
const DEV_API_KEY_HASH_FALLBACK = "fallback_dev_secret_32_chars_long_!!";

/** Dev-only fallback for `x-internal-secret` (portal sandbox proxy, MCP inject). Never used when NODE_ENV=production. */
export const DEV_INTERNAL_SECRET_FALLBACK = "astryxion_dev_internal_fallback_32chars_ok";

/** Resolved secret for in-process inject: env, or dev fallback outside production, or null in production if unset. */
export function getResolvedInternalSecret(): string | null {
  const t = process.env.INTERNAL_SECRET?.trim();
  if (t) return t;
  if (!isProductionNodeEnv()) return DEV_INTERNAL_SECRET_FALLBACK;
  return null;
}

export function getResolvedApiKeyHashSecret(): string {
  if (isProductionNodeEnv()) {
    const s = process.env.API_KEY_HASH_SECRET?.trim() ?? "";
    if (s.length < MIN_SECRET_LENGTH) {
      throw new Error("API_KEY_HASH_SECRET missing or too short (production)");
    }
    return s;
  }
  return (process.env.API_KEY_HASH_SECRET?.trim() || DEV_API_KEY_HASH_FALLBACK);
}

export function parseSwaggerSandboxTier(): SandboxTier {
  const raw = (process.env.SWAGGER_SANDBOX_TIER || "mercury").toLowerCase().trim();
  if ((SANDBOX_TIERS as readonly string[]).includes(raw)) return raw as SandboxTier;
  return "mercury";
}

export function isLegacyDevTestKeyAllowed(): boolean {
  return !isProductionNodeEnv() || process.env.ALLOW_LEGACY_DEV_TEST_KEY === "1";
}

export function getSwaggerSandboxApiKey(): string | undefined {
  const k = process.env.SWAGGER_SANDBOX_API_KEY?.trim();
  return k || undefined;
}

export function validateProductionEnvironment(): void {
  if (!isProductionNodeEnv()) return;

  const errors: string[] = [];

  if (!process.env.REDIS_URL?.trim()) {
    errors.push("REDIS_URL is required in production (e.g. Upstash Redis URL).");
  }

  const apiSecret = process.env.API_KEY_HASH_SECRET?.trim() ?? "";
  if (apiSecret.length < MIN_SECRET_LENGTH) {
    errors.push(`API_KEY_HASH_SECRET must be at least ${MIN_SECRET_LENGTH} characters in production.`);
  }

  const internal = process.env.INTERNAL_SECRET?.trim() ?? "";
  if (internal.length < MIN_SECRET_LENGTH) {
    errors.push(`INTERNAL_SECRET must be at least ${MIN_SECRET_LENGTH} characters in production.`);
  }

  const sandbox = process.env.SWAGGER_SANDBOX_API_KEY?.trim();
  if (sandbox && sandbox.length < MIN_SANDBOX_KEY_LENGTH) {
    errors.push(`SWAGGER_SANDBOX_API_KEY must be at least ${MIN_SANDBOX_KEY_LENGTH} characters if set.`);
  }

  if (errors.length) {
    console.error("[FATAL] Production environment validation failed:\n" + errors.join("\n"));
    process.exit(1);
  }
}

export function logBootstrapWarnings(): void {
  if (!isProductionNodeEnv()) {
    if (!process.env.REDIS_URL?.trim()) {
      console.warn("[WARN] REDIS_URL is unset; rate limits and API key persistence are degraded for this process.");
    }
    if (!process.env.INTERNAL_SECRET?.trim()) {
      console.warn(
        "[WARN] INTERNAL_SECRET is unset; using dev-only in-process fallback for /portal sandbox and MCP call_tool (set INTERNAL_SECRET in .env for a real secret)."
      );
    }
    return;
  }

  if (!process.env.INTERNAL_CRON_TOKEN?.trim()) {
    console.warn("[WARN] INTERNAL_CRON_TOKEN is unset; POST /api/v1/internal/horoscope-refresh rejects all requests.");
  }
  if (!process.env.SWAGGER_SANDBOX_API_KEY?.trim()) {
    console.warn("[WARN] SWAGGER_SANDBOX_API_KEY is unset; Swagger users should obtain keys from /portal.");
  }
}

export function buildSwaggerAuthMarkdown(): string {
  const lines = [
    "Welcome to the **Astryxion API** Developer Portal.",
    "",
    "### Authentication",
    "All API requests require a **Bearer Token** (Authorize padlock in Swagger UI).",
  ];

  if (getSwaggerSandboxApiKey()) {
    lines.push(
      "- **Sandbox**: use the operator-configured API key (`SWAGGER_SANDBOX_API_KEY`). Tier is limited (`SWAGGER_SANDBOX_TIER`, default `mercury`); not for production workloads."
    );
  } else {
    lines.push("- Obtain an API key from the [Developer Portal](/portal).");
  }

  if (!isProductionNodeEnv()) {
    lines.push("- **Local dev**: `dev_test_key` is accepted with **admin** tier when `NODE_ENV` is not `production`.");
  }
  if (process.env.ALLOW_LEGACY_DEV_TEST_KEY === "1") {
    lines.push("- **Legacy**: `ALLOW_LEGACY_DEV_TEST_KEY=1` enables the literal `dev_test_key` (admin) even in production—avoid unless strictly necessary.");
  }

  lines.push("");
  return lines.join("\n");
}

export function buildSwaggerBearerDescription(): string {
  if (getSwaggerSandboxApiKey()) {
    return "Bearer: your API key from /portal, or the configured sandbox key (see server operator).";
  }
  return "Bearer: API key from /portal.";
}

export function internalSecretMatches(headerValue: string | string[] | undefined): boolean {
  const secret = getResolvedInternalSecret();
  if (!secret) return false;
  const v = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  return typeof v === "string" && v === secret;
}
