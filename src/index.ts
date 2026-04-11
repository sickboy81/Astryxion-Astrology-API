import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import Redis from "ioredis";
import { Registry } from "prom-client";
import { parseBearer } from "./lib/utils.js";
import {
  validateProductionEnvironment,
  logBootstrapWarnings,
  buildSwaggerAuthMarkdown,
  buildSwaggerBearerDescription,
  internalSecretMatches,
} from "./lib/env-validation.js";
import { createCache } from "./lib/cache.js";
import { createApiKeyStore, createRateLimiter } from "./lib/auth.js";
import { createUserStore } from "./lib/user-store.js";
import { registerMonitoringRoutes } from "./routes/monitoring.js";
import { registerHoroscopeRoutes } from "./routes/horoscope.js";
import { registerNatalRoutes } from "./routes/natal.js";
import { registerChartSvgRoutes } from "./routes/chart-svg.js";
import { registerAdvancedAstrologyRoutes } from "./routes/advanced-astrology.js";
import { registerNumerologyRoutes } from "./routes/numerology.js";
import { registerCabalisticRoutes } from "./routes/numerology-cabalistic.js";
import { registerNumerologyEngineRoutes } from "./routes/numerology-engine.js";
import { registerPalmistryRoutes } from "./routes/palmistry.js";
import { registerTarotRoutes } from "./routes/tarot.js";
import { registerRunesRoutes } from "./routes/runes.js";
import { registerIChingRoutes } from "./routes/iching.js";
import { registerPDFRoutes } from "./routes/pdf-reports.js";
import { registerMCPRoutes } from "./routes/mcp.js";
import { registerAdminRoutes } from "./routes/admin.js";
import { registerBillingRoutes } from "./routes/billing.js";
import { registerInternalRoutes } from "./routes/internal.js";
import { registerAuthRoutes } from "./routes/auth.js";
import { registerPortalAuthRoutes } from "./routes/portal-auth.js";
import { registerChineseAstrologyRoutes } from "./chinese-astrology/routes.js";
import { registerVedicRoutes } from "./vedic-routes/routes.js";
import { registerVedicAdvancedRoutes } from "./routes/vedic-advanced.js";
import { registerGeoRoutes } from "./routes/geo.js";
import { registerPortalMgmtRoutes } from "./routes/portal-mgmt.js";
import { globalErrorHandler } from "./lib/error-handler.js";
import { generateDashboardHTML } from "./dashboard-html.js";
import { generatePortalHTML } from "./portal-html.js";
import { generateStatusHTML } from "./status-html.js";
import { generateAdminHTML } from "./admin-html.js";
async function main() {
  validateProductionEnvironment();
  logBootstrapWarnings();
  if (process.env.SWEPH_EPHE_PATH?.trim()) {
    console.info("[INFO] SWEPH_EPHE_PATH is set; Swiss Ephemeris will use that ephemeris path.");
  }

  const startedAtUtc = new Date().toISOString();
  const instanceId = `inst_${Math.random().toString(36).slice(2, 9)}`;
  const serviceName = "ASTRYXION API";
  const port = Number(process.env.PORT) || 3000;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = Fastify({
    logger: {
      transport: process.env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
    },
  });

  // Static files for Landing Page
  await app.register(fastifyStatic, {
    root: path.join(__dirname, "../landing"),
    prefix: "/",
    extensions: ["html"],
  });

  // Favicon 204
  app.get("/favicon.ico", (req, reply) => reply.code(204).send());

  // CORS
  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  // Prometheus Registry & Redis Setup
  const register = new Registry();
  const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;
  const cache = createCache(redis);
  const apiKeyStore = createApiKeyStore(redis);
  const rateLimiter = createRateLimiter(redis);
  const userStore = createUserStore(redis);

  await userStore.setupDefaultAdmin();

  // Swagger setup
  await app.register(swagger, {
    openapi: {
      info: {
        title: serviceName,
        version: "2.5.0",
        description: buildSwaggerAuthMarkdown().trim()
      },
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: "http",
            scheme: "bearer",
            description: buildSwaggerBearerDescription()
          },
        },
      },
      security: [{ ApiKeyAuth: [] }],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "list", deepLinking: false },
  });

  // Expose raw OpenAPI JSON
  app.get("/api/v1/openapi.json", { schema: { hide: true } }, async () => {
    return app.swagger();
  });

  // API Key & Rate Limit Hook
  app.addHook("preHandler", async (req, reply) => {
    const isProtected =
      req.url.startsWith("/api/v1/") &&
      !req.url.startsWith("/api/v1/openapi.json") &&
      !req.url.startsWith("/api/v1/internal/") &&
      !req.url.startsWith("/api/v1/auth/") &&
      !req.url.startsWith("/api/v1/portal/") &&
      !req.url.startsWith("/api/v1/users/") &&
      !req.url.startsWith("/api/v1/system/config") &&
      !req.url.startsWith("/api/v1/reports/health");

    const isInternal = internalSecretMatches(req.headers["x-internal-secret"]);
    if (isInternal || !isProtected) return;

    const authHeader = req.headers.authorization ?? null;
    const token = parseBearer(authHeader);

    // BETA MODE CHECK (Global Promotion)
    let isBetaActive = false;
    if (redis) {
      const val = await redis.get("config:system:beta_mode");
      isBetaActive = val === "true";
    }

    // Allow admin session tokens for reports endpoints
    if (token && req.url.startsWith("/api/v1/reports/")) {
      const session = await userStore.getSession(token);
      if (session && session.role === "admin") {
        return; // Admin allowed for reports
      }
    }

    if (!token) {
      return reply.code(401).send({ error: "UNAUTHORIZED", message: "Bearer token required." });
    }

    const record = await apiKeyStore.getRecordByKey(token);

    if (!record) {
      app.log.warn({ url: req.url, token: token ? (token.substring(0, 4) + "****") : "none" }, "Authentication failed: Invalid key.");
      return reply.code(401).send({ error: "UNAUTHORIZED", message: "Invalid or disabled API key." });
    }

    // Beta Promotion: If beta is active, promote Free to Mercury for rate limiting
    if (isBetaActive && record.record.tier === "free") {
      record.record.tier = "mercury";
    }

    // Global Language Preference Injection
    if (record.record.customerId) {
      const user = await userStore.getUser(record.record.customerId);
      if (user && user.preferredLang) {
        req.headers["x-default-lang"] = user.preferredLang;
      }
    }

    // Domain Restriction Check (Elite Security)
    if (record.record.authorizedDomains?.length) {
      const origin = (req.headers.origin as string) || (req.headers.referer as string) || "";
      const isAuthorized = record.record.authorizedDomains.some(d => origin.toLowerCase().includes(d.toLowerCase()));
      if (!isAuthorized) {
        app.log.warn({ url: req.url, origin, keyHash: record.hash }, "Domain restriction failed.");
        return reply.code(403).send({ error: "FORBIDDEN", message: "This API key is restricted to specific domains." });
      }
    }

    const rate = await rateLimiter.checkAndIncrement({
      apiKeyHash: record.hash,
      tier: record.record.tier,
    });

    reply.header("X-RateLimit-Limit", String(rate.limit));
    if (rate.remaining !== null) reply.header("X-RateLimit-Remaining", String(rate.remaining));
    reply.header("X-RateLimit-Reset", String(Math.floor(rate.resetAt / 1000)));

    if (!rate.allowed) {
      const retryAfterSec = Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000));
      reply.header("Retry-After", String(retryAfterSec));
      return reply.code(429).send({
        error: "RATE_LIMITED",
        message: "Daily request limit exceeded for this API key tier.",
      });
    }
  });

  // Register Routes
  await registerMonitoringRoutes(app, register, startedAtUtc, instanceId, redis);
  await registerHoroscopeRoutes(app, cache, rateLimiter);
  await registerNatalRoutes(app);
  await registerChartSvgRoutes(app);
  await registerAdvancedAstrologyRoutes(app);
  await registerNumerologyRoutes(app);
  await registerCabalisticRoutes(app);
  await registerNumerologyEngineRoutes(app);
  await registerPalmistryRoutes(app);
  await registerTarotRoutes(app);
  await registerRunesRoutes(app);
  await registerIChingRoutes(app);
  await registerPDFRoutes(app);
  await registerMCPRoutes(app);
  await registerAdminRoutes(app, apiKeyStore, userStore, redis, serviceName, port, startedAtUtc, instanceId);
  await registerBillingRoutes(app);
  await registerInternalRoutes(app, cache);
  await registerAuthRoutes(app, apiKeyStore, redis);
  await registerPortalAuthRoutes(app, userStore);
  await registerPortalMgmtRoutes(app, apiKeyStore, userStore, redis);
  await registerChineseAstrologyRoutes(app);
  await registerVedicRoutes(app);
  await registerVedicAdvancedRoutes(app);
  await registerGeoRoutes(app);

  // Portal Dashboard & Status Pages
  app.get("/portal", async (req, reply) => {
    return reply.header("Content-Type", "text/html").send(generatePortalHTML(serviceName));
  });

  app.get("/dashboard", async (req, reply) => {
    return reply.header("Content-Type", "text/html").send(generateDashboardHTML(port, serviceName, startedAtUtc, instanceId, redis));
  });

  app.get("/playground", async (req, reply) => {
    return reply.redirect("/dashboard");
  });

  app.get("/status", async (req, reply) => {
    return reply.header("Content-Type", "text/html").send(generateStatusHTML(port, serviceName, startedAtUtc, instanceId, redis));
  });

  app.get("/admin", async (req, reply) => {
    return reply.header("Content-Type", "text/html").send(generateAdminHTML(serviceName));
  });

  // Landing Page Routes (Friendly Aliases)
  app.get("/", async (req, reply) => {
    return reply.sendFile("index.html");
  });

  app.get("/features", async (req, reply) => {
    return reply.sendFile("features.html");
  });

  // Global Error Handler
  app.setErrorHandler(globalErrorHandler);

  try {
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`🚀 ${serviceName} running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
