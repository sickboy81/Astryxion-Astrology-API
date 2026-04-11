import { FastifyInstance } from "fastify";
import { Registry } from "prom-client";
import { nowUtcIso, parseBearer } from "../lib/utils.js";

export async function registerMonitoringRoutes(app: FastifyInstance, registry: Registry, startedAtUtc: string, instanceId: string, redis: any) {
  const metricsBearerToken = process.env.METRICS_BEARER_TOKEN?.trim();
  app.get("/health", { schema: { hide: true } }, async (req, reply) => {
    let redisStatus = "unconfigured";
    let redisInfo = {};
    if (redis) {
      try {
        const ping = await redis.ping();
        redisStatus = ping === "PONG" ? "connected" : "error";
        const info = await redis.info();
        redisInfo = {
          status: redisStatus,
          info: info
        };
      } catch {
        redisStatus = "disconnected";
        redisInfo = { status: redisStatus };
      }
    }

    // Smart Detect: if browser is requesting, show status page instead of JSON
    const accept = req.headers.accept || "";
    if (accept.includes("text/html")) {
      const { generateStatusHTML } = await import("../status-html.js");
      const port = Number(process.env.PORT) || 3000;
      const serviceName = "ASTRYXION API";
      return reply.type("text/html").send(generateStatusHTML(port, serviceName, startedAtUtc, instanceId, redis));
    }

    return {
      status: "ok",
      uptimeSeconds: Math.floor(process.uptime()),
      timestampUtc: nowUtcIso(),
      startedAtUtc,
      instanceId,
      memory: process.memoryUsage(),
      redis: redisInfo,
      components: {
        astrology: "operational",
        vedic: "operational",
        esoteric: "operational",
        pdf: "operational",
        chartSvg: "available",
      }
    };
  });

  app.get("/metrics", { schema: { hide: true } }, async (req, reply) => {
    if (metricsBearerToken) {
      const bearer = parseBearer((req.headers.authorization as string) ?? null);
      const rawHeader = req.headers["x-metrics-token"];
      const headerToken = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;
      const ok = bearer === metricsBearerToken || headerToken === metricsBearerToken;
      if (!ok) {
        return reply.code(401).send({ error: "UNAUTHORIZED", message: "Metrics endpoint requires credentials." });
      }
    }
    reply.header("Content-Type", registry.contentType);
    return registry.metrics();
  });
}
