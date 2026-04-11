import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { calculateNatalChart, calculatePlanets, calculateAscendant, NatalChartBodySchema } from "../services/calculation.service.js";
import { HouseSystemSchema } from "../lib/astro/house-systems.js";
import { buildNatalLlmContextXml } from "../lib/natal-llm-context.js";
import { errorBody, nowUtcIso } from "../lib/utils.js";

const NatalLlmContextBodySchema = NatalChartBodySchema.extend({
  maxAspects: z.number().int().min(5).max(120).optional().default(40),
  /** `json` wraps XML in JSON; `xml` returns raw XML body. */
  response: z.enum(["json", "xml"]).optional().default("json"),
});

export async function registerNatalRoutes(app: FastifyInstance) {
  app.post("/api/v1/natal-chart", {
    schema: {
      tags: ["Western"],
      summary: "Calculate Complete Natal Chart",
      description: "Generates planetary positions, houses, aspects, and patterns for a specific date and location.",
      body: zodToJsonSchema(NatalChartBodySchema),
    }
  }, async (req, reply) => {
    const parsed = NatalChartBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Dados inválidos.", parsed.error.flatten()));
    }

    try {
      const qLang = (req.body as any)?.lang || (req.query as any)?.lang;
      const dLang = req.headers["x-default-lang"] as string;
      const lang = (qLang && ['en', 'pt', 'es', 'hi'].includes(qLang)) ? qLang : (dLang || "en");
      
      const result = await calculateNatalChart({ ...parsed.data, lang });
      return result;
    } catch (e: any) {
      return reply.code(500).send(errorBody("CALCULATION_ERROR", e.message || "Erro no cálculo."));
    }
  });

  app.post("/api/v1/natal/llm-context", {
    schema: {
      tags: ["Western"],
      summary: "Natal chart as LLM context (XML)",
      description:
        "Computes the same tropical natal as `/api/v1/natal-chart` and returns a compact XML document for LLM system prompts (HTTP alternative to MCP).",
      body: zodToJsonSchema(NatalLlmContextBodySchema),
    },
  }, async (req, reply) => {
    const parsed = NatalLlmContextBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Dados inválidos.", parsed.error.flatten()));
    }
    const { maxAspects, response, ...natalBody } = parsed.data;
    try {
      const qLang = (req.body as { lang?: string })?.lang || (req.query as { lang?: string })?.lang;
      const dLang = req.headers["x-default-lang"] as string;
      const raw = natalBody.lang ?? (qLang && ["en", "pt", "es", "hi"].includes(qLang) ? qLang : dLang);
      const lang = ["en", "pt", "es", "hi"].includes(String(raw)) ? (raw as "en" | "pt" | "es" | "hi") : "en";
      const result = await calculateNatalChart({ ...natalBody, lang });
      const contextXml = buildNatalLlmContextXml(result as Parameters<typeof buildNatalLlmContextXml>[0], { maxAspects });
      if (response === "xml") {
        return reply.type("application/xml; charset=utf-8").send(contextXml);
      }
      return {
        generatedAtUtc: nowUtcIso(),
        mimeType: "application/xml",
        contextXml,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro no cálculo.";
      return reply.code(500).send(errorBody("CALCULATION_ERROR", msg));
    }
  });

  app.get("/api/v1/planets", {
    schema: {
      tags: ["Western"],
      summary: "Planetary positions for specific date",
      querystring: zodToJsonSchema(z.object({
        date: z.string().describe("ISO Date"),
        timeUtc: z.string().describe("HH:mm:ss")
      }))
    }
  }, async (req, reply) => {
    const { date, timeUtc } = req.query as { date: string; timeUtc: string };
    if (!date || !timeUtc) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Date e timeUtc são obrigatórios."));
    }
    const { planets } = await calculatePlanets(date, timeUtc);
    return planets;
  });

  app.get("/api/v1/ascendant", {
    schema: {
      tags: ["Western"],
      summary: "Calculate Ascendant",
      querystring: zodToJsonSchema(z.object({
        date: z.string(),
        timeUtc: z.string(),
        lat: z.number(),
        lon: z.number(),
        houseSystem: HouseSystemSchema.optional()
      }))
    }
  }, async (req, reply) => {
    const q = req.query as Record<string, unknown>;
    const parsedQs = z.object({
      date: z.string().min(1),
      timeUtc: z.string().min(1),
      lat: z.coerce.number(),
      lon: z.coerce.number(),
      houseSystem: HouseSystemSchema.optional(),
    }).safeParse(q);
    if (!parsedQs.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros obrigatórios ausentes ou inválidos.", parsedQs.error.flatten()));
    }
    const { date, timeUtc, lat, lon, houseSystem } = parsedQs.data;
    const asc = await calculateAscendant(date, timeUtc, lat, lon, houseSystem);
    return {
      longitude: asc.longitude,
      sign: asc.sign,
      degree: asc.degree,
      cusps: asc.cusps,
    };
  });

  app.post("/api/v1/natal/planets", {
    schema: {
      tags: ["Western"],
      summary: "Planetary positions (POST version)",
      body: zodToJsonSchema(z.object({
        date: z.string(),
        timeUtc: z.string(),
        latitude: z.number(),
        longitude: z.number()
      }))
    }
  }, async (req, reply) => {
    const { date, timeUtc } = req.body as any;
    if (!date || !timeUtc) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Date e timeUtc são obrigatórios."));
    }
    const { planets } = await calculatePlanets(date, timeUtc);
    return planets;
  });
}
