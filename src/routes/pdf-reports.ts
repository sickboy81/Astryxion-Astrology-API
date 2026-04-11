import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { errorBody } from "../lib/utils.js";
import {
  generatePDF,
  createNatalReportHTML,
  createMiniReportHTML,
  createMatchmakingReportHTML,
  createAnnualForecastPDFHTML,
  PDFGenerationOptions,
} from "../lib/pdf-engine.js";
import { calculateNatalChart } from "../services/calculation.service.js";
import { calculateAnnualPredictions } from "../astrocartography.js";
import { HouseSystemSchema } from "../lib/astro/house-systems.js";
import { getResolvedInternalSecret } from "../lib/env-validation.js";
import type { Language } from "../i18n.js";

/** Same bypass as MCP/portal `app.inject` — `preHandler` only honors `x-internal-secret`, not `x-internal-call`. */
function pdfInternalInjectHeaders():
  | { "x-internal-secret": string; "Content-Type": string }
  | null {
  const s = getResolvedInternalSecret();
  if (!s) return null;
  return { "x-internal-secret": s, "Content-Type": "application/json" };
}

const LangSchema = z.enum(["en", "pt", "es", "hi"]).default("en");

const PDFReportParamsSchema = z.object({
  fullName: z.string().default("Consultant"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeUtc: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  latitude: z.number(),
  longitude: z.number(),
  lang: LangSchema,
});

const AnnualForecastPdfSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeUtc: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  latitude: z.number(),
  longitude: z.number(),
  year: z.number().int().min(2020).max(2050),
  houseSystem: HouseSystemSchema.default("placidus"),
  lang: LangSchema,
});

const MatchmakingParamsSchema = z.object({
  personA: z.object({
    fullName: z.string().default("Partner 1"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    timeUtc: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
    latitude: z.number(),
    longitude: z.number(),
  }),
  personB: z.object({
    fullName: z.string().default("Partner 2"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    timeUtc: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
    latitude: z.number(),
    longitude: z.number(),
  }),
  lang: LangSchema,
});

// Helper para logging estruturado
function logPDFGeneration(
  app: FastifyInstance,
  params: {
    type: string;
    success: boolean;
    fromCache: boolean;
    generationTime: number;
    error?: string;
    cacheKey?: string;
  }
) {
  const logData = {
    type: "PDF_GENERATION",
    pdfType: params.type,
    success: params.success,
    fromCache: params.fromCache,
    generationTimeMs: params.generationTime,
    cacheKey: params.cacheKey,
    timestamp: new Date().toISOString(),
  };

  if (params.success) {
    app.log.info(logData, `PDF ${params.type} generated successfully`);
  } else {
    app.log.error({ ...logData, error: params.error }, `PDF ${params.type} generation failed`);
  }
}

export async function registerPDFRoutes(app: FastifyInstance) {
  // Acessar Redis da aplicação
  const redis = (app as any).redis || null;

  /**
   * NATAL HOROSCOPE - PDF Completo
   */
  app.post("/api/v1/reports/natal-pdf", {
    schema: {
      tags: ["Reports"],
      summary: "Astryxion Natal Monograph PDF (Multilingual)",
      description: "Generate a professional natal chart PDF report with visual chart map, planet positions, and QR code verification. Cached for 24 hours.",
      body: zodToJsonSchema(PDFReportParamsSchema),
    },
  }, async (req, reply) => {
    const startTime = Date.now();
    let cacheKey: string | undefined;

    try {
      const parsed = PDFReportParamsSchema.parse(req.body);
      const qLang = (req.body as any)?.lang || (req.query as any)?.lang;
      const dLang = req.headers["x-default-lang"] as string;
      const lang = (qLang && ["en", "pt", "es", "hi"].includes(qLang)) ? qLang : (dLang || "en");

      // Gerar cache key baseada nos parâmetros
      // Incluindo explicitamente o idioma para evitar colisões de cache
      cacheKey = `pdf:natal:${parsed.date}:${parsed.latitude}:${parsed.longitude}:${lang}:${parsed.fullName}`;

      // Verificar se há parâmetro para bypass cache
      const skipCache = (req.query as any)?.refresh === "true";

      app.log.info({ cacheKey, skipCache, lang }, "Generating natal PDF report");

      const ih = pdfInternalInjectHeaders();
      if (!ih) {
        return reply.code(503).send(
          errorBody("SERVICE_UNAVAILABLE", "INTERNAL_SECRET is not configured.")
        );
      }

      const natalRes = await app.inject({
        method: "POST",
        url: "/api/v1/natal-chart",
        payload: { ...parsed, lang },
        headers: ih,
      });
      const data = natalRes.json();

      if (natalRes.statusCode >= 400) {
        logPDFGeneration(app, {
          type: "natal",
          success: false,
          fromCache: false,
          generationTime: Date.now() - startTime,
          error: typeof data?.error === "string" ? data.error : JSON.stringify(data?.error),
          cacheKey,
        });
        return reply.code(natalRes.statusCode).send(data);
      }

      data.input.fullName = parsed.fullName;
      const html = createNatalReportHTML(data, "Astryxion API", lang);

      const options: PDFGenerationOptions = {
        cacheKey: skipCache ? undefined : cacheKey,
        redis: skipCache ? null : redis,
        useCache: !skipCache,
        cacheTTL: 86400, // 24 horas
        lang,
      };

      const { buffer, fromCache, generationTime } = await generatePDF(html, options);

      logPDFGeneration(app, {
        type: "natal",
        success: true,
        fromCache,
        generationTime,
        cacheKey,
      });

      reply.header("Content-Type", "application/pdf");
      reply.header("Content-Disposition", `attachment; filename=natal_${parsed.fullName.replace(/\s/g, "_")}.pdf`);
      reply.header("X-Cache-Hit", fromCache ? "HIT" : "MISS");
      reply.header("X-Generation-Time-Ms", String(generationTime));

      return buffer;
    } catch (e: any) {
      logPDFGeneration(app, {
        type: "natal",
        success: false,
        fromCache: false,
        generationTime: Date.now() - startTime,
        error: e.message,
        cacheKey,
      });

      app.log.error({ error: e.message, stack: e.stack }, "Natal PDF generation error");
      return reply.code(500).send(
        errorBody("INTERNAL_ERROR", "Error generating PDF report. Please try again or contact support.", {
          detail: process.env.NODE_ENV === "development" ? e.message : undefined,
        })
      );
    }
  });

  /**
   * MINI HOROSCOPE - PDF Resumido
   */
  app.post("/api/v1/reports/mini-horoscope", {
    schema: {
      tags: ["Reports"],
      summary: "Daily Cosmic Snapshot PDF (Multilingual)",
      description: "Generate a quick daily horoscope PDF with essential planetary positions. Cached for 6 hours.",
      body: zodToJsonSchema(PDFReportParamsSchema),
    },
  }, async (req, reply) => {
    const startTime = Date.now();
    let cacheKey: string | undefined;

    try {
      const parsed = PDFReportParamsSchema.parse(req.body);
      const qLang = (req.body as any)?.lang || (req.query as any)?.lang;
      const dLang = req.headers["x-default-lang"] as string;
      const lang = (qLang && ["en", "pt", "es", "hi"].includes(qLang)) ? qLang : (dLang || "en");

      // Cache mais curto para mini horóscopo (6 horas)
      const today = new Date().toISOString().split("T")[0];
      cacheKey = `pdf:mini:${today}:${parsed.latitude}:${parsed.longitude}:${lang}`;

      const skipCache = (req.query as any)?.refresh === "true";

      app.log.info({ cacheKey, skipCache }, "Generating mini horoscope PDF");

      const ihMini = pdfInternalInjectHeaders();
      if (!ihMini) {
        return reply.code(503).send(
          errorBody("SERVICE_UNAVAILABLE", "INTERNAL_SECRET is not configured.")
        );
      }

      const miniRes = await app.inject({
        method: "POST",
        url: "/api/v1/natal-chart",
        payload: { ...parsed, lang },
        headers: ihMini,
      });
      const data = miniRes.json();

      if (miniRes.statusCode >= 400) {
        logPDFGeneration(app, {
          type: "mini",
          success: false,
          fromCache: false,
          generationTime: Date.now() - startTime,
          error: typeof data?.error === "string" ? data.error : JSON.stringify(data?.error),
          cacheKey,
        });
        return reply.code(miniRes.statusCode).send(data);
      }

      data.input.fullName = parsed.fullName;
      const html = createMiniReportHTML(data, "Astryxion API", lang);

      const options: PDFGenerationOptions = {
        cacheKey: skipCache ? undefined : cacheKey,
        redis: skipCache ? null : redis,
        useCache: !skipCache,
        cacheTTL: 21600, // 6 horas
        lang,
      };

      const { buffer, fromCache, generationTime } = await generatePDF(html, options);

      logPDFGeneration(app, {
        type: "mini",
        success: true,
        fromCache,
        generationTime,
        cacheKey,
      });

      reply.header("Content-Type", "application/pdf");
      reply.header("Content-Disposition", `attachment; filename=mini_${parsed.fullName.replace(/\s/g, "_")}.pdf`);
      reply.header("X-Cache-Hit", fromCache ? "HIT" : "MISS");
      reply.header("X-Generation-Time-Ms", String(generationTime));

      return buffer;
    } catch (e: any) {
      logPDFGeneration(app, {
        type: "mini",
        success: false,
        fromCache: false,
        generationTime: Date.now() - startTime,
        error: e.message,
        cacheKey,
      });

      app.log.error({ error: e.message }, "Mini horoscope PDF generation error");
      return reply.code(500).send(
        errorBody("INTERNAL_ERROR", "Error generating mini horoscope PDF.", {
          detail: process.env.NODE_ENV === "development" ? e.message : undefined,
        })
      );
    }
  });

  /**
   * ANNUAL FORECAST PDF
   */
  app.post("/api/v1/reports/annual-forecast-pdf", {
    schema: {
      tags: ["Reports"],
      summary: "Annual forecast PDF (multilingual)",
      description: "Generates a year-ahead symbolic forecast PDF (same data family as /annual-predictions). Cached 24h.",
      body: zodToJsonSchema(AnnualForecastPdfSchema),
    },
  }, async (req, reply) => {
    const startTime = Date.now();
    let cacheKey: string | undefined;
    try {
      const parsed = AnnualForecastPdfSchema.parse(req.body);
      const qLang = (req.body as any)?.lang || (req.query as any)?.lang;
      const dLang = req.headers["x-default-lang"] as string;
      const lang = (qLang && ["en", "pt", "es", "hi"].includes(qLang)) ? qLang : (dLang || "en");
      const langT = lang as Language;

      cacheKey = `pdf:annual:${parsed.year}:${parsed.date}:${parsed.latitude}:${parsed.longitude}:${lang}`;
      const skipCache = (req.query as any)?.refresh === "true";

      const natal = await calculateNatalChart({
        ...parsed,
        timeUtc: parsed.timeUtc.length === 5 ? `${parsed.timeUtc}:00` : parsed.timeUtc,
      });
      const predictions = calculateAnnualPredictions(
        natal.planets,
        natal.aspects,
        {
          date: parsed.date,
          timeUtc: parsed.timeUtc.length === 5 ? `${parsed.timeUtc}:00` : parsed.timeUtc,
          latitude: parsed.latitude,
          longitude: parsed.longitude,
        },
        parsed.year,
        langT
      );

      const html = createAnnualForecastPDFHTML(predictions, "Astryxion API", lang);
      const options: PDFGenerationOptions = {
        cacheKey: skipCache ? undefined : cacheKey,
        redis: skipCache ? null : redis,
        useCache: !skipCache,
        cacheTTL: 86400,
        lang,
      };
      const { buffer, fromCache, generationTime } = await generatePDF(html, options);

      logPDFGeneration(app, {
        type: "annual-forecast",
        success: true,
        fromCache,
        generationTime,
        cacheKey,
      });

      reply.header("Content-Type", "application/pdf");
      reply.header("Content-Disposition", `attachment; filename=annual_forecast_${parsed.year}_${lang}.pdf`);
      reply.header("X-Cache-Hit", fromCache ? "HIT" : "MISS");
      reply.header("X-Generation-Time-Ms", String(generationTime));
      return buffer;
    } catch (e: any) {
      logPDFGeneration(app, {
        type: "annual-forecast",
        success: false,
        fromCache: false,
        generationTime: Date.now() - startTime,
        error: e.message,
        cacheKey,
      });
      app.log.error({ error: e.message }, "Annual forecast PDF error");
      return reply.code(500).send(
        errorBody("INTERNAL_ERROR", "Error generating annual forecast PDF.", {
          detail: process.env.NODE_ENV === "development" ? e.message : undefined,
        })
      );
    }
  });

  /**
   * MATCH-MAKING - PDF de Compatibilidade
   */
  app.post("/api/v1/reports/matchmaking", {
    schema: {
      tags: ["Reports"],
      summary: "Relationship Resonance Profile PDF (Multilingual)",
      description: "Generate a detailed compatibility report between two people with scoring visualization and analysis. Cached for 24 hours.",
      body: zodToJsonSchema(MatchmakingParamsSchema),
    },
  }, async (req, reply) => {
    const startTime = Date.now();
    let cacheKey: string | undefined;

    try {
      const parsed = MatchmakingParamsSchema.parse(req.body);
      const qLang = (req.body as any)?.lang || (req.query as any)?.lang;
      const dLang = req.headers["x-default-lang"] as string;
      const lang = (qLang && ["en", "pt", "es", "hi"].includes(qLang)) ? qLang : (dLang || "en");

      // Cache key única para o par
      cacheKey = `pdf:match:${parsed.personA.date}:${parsed.personB.date}:${parsed.personA.latitude}:${parsed.personB.latitude}:${lang}`;

      const skipCache = (req.query as any)?.refresh === "true";

      app.log.info(
        { cacheKey, skipCache, partnerA: parsed.personA.fullName, partnerB: parsed.personB.fullName },
        "Generating matchmaking PDF"
      );

      const ihMatch = pdfInternalInjectHeaders();
      if (!ihMatch) {
        return reply.code(503).send(
          errorBody("SERVICE_UNAVAILABLE", "INTERNAL_SECRET is not configured.")
        );
      }

      const compatRes = await app.inject({
        method: "POST",
        url: "/api/v1/compatibility",
        payload: { p1: parsed.personA, p2: parsed.personB, lang },
        headers: ihMatch,
      });
      const data = compatRes.json();

      if (compatRes.statusCode >= 400) {
        logPDFGeneration(app, {
          type: "matchmaking",
          success: false,
          fromCache: false,
          generationTime: Date.now() - startTime,
          error: typeof data?.error === "string" ? data.error : JSON.stringify(data?.error),
          cacheKey,
        });
        return reply.code(compatRes.statusCode).send(data);
      }

      const html = createMatchmakingReportHTML(
        {
          personA: parsed.personA,
          personB: parsed.personB,
          score: data.compatibility?.score || 0,
          analysis: data.compatibility?.summary || "",
          planetsA: data.planets1,
          planetsB: data.planets2,
        },
        "Astryxion API",
        lang
      );

      const options: PDFGenerationOptions = {
        cacheKey: skipCache ? undefined : cacheKey,
        redis: skipCache ? null : redis,
        useCache: !skipCache,
        cacheTTL: 86400, // 24 horas
        lang,
      };

      const { buffer, fromCache, generationTime } = await generatePDF(html, options);

      logPDFGeneration(app, {
        type: "matchmaking",
        success: true,
        fromCache,
        generationTime,
        cacheKey,
      });

      reply.header("Content-Type", "application/pdf");
      reply.header(
        "Content-Disposition",
        `attachment; filename=matchmaking_${parsed.personA.fullName}_${parsed.personB.fullName}.pdf`
          .replace(/\s/g, "_")
          .slice(0, 100)
      );
      reply.header("X-Cache-Hit", fromCache ? "HIT" : "MISS");
      reply.header("X-Generation-Time-Ms", String(generationTime));

      return buffer;
    } catch (e: any) {
      logPDFGeneration(app, {
        type: "matchmaking",
        success: false,
        fromCache: false,
        generationTime: Date.now() - startTime,
        error: e.message,
        cacheKey,
      });

      app.log.error({ error: e.message }, "Matchmaking PDF generation error");
      return reply.code(500).send(
        errorBody("INTERNAL_ERROR", "Error generating matchmaking PDF.", {
          detail: process.env.NODE_ENV === "development" ? e.message : undefined,
        })
      );
    }
  });

  /**
   * HEALTH CHECK - Status do serviço de PDF
   */
  app.get("/api/v1/reports/health", {
    schema: {
      tags: ["Reports"],
      summary: "PDF Service Health Check",
      description: "Check the status of the PDF generation service including browser pool and cache metrics.",
    },
  }, async (req, reply) => {
    try {
      // Testar geração rápida
      const testHtml = `<html><body><h1>Test</h1></body></html>`;
      const { buffer, fromCache, generationTime } = await generatePDF(testHtml, {
        useCache: false, // Forçar geração real
      });

      return {
        status: "healthy",
        pdfGeneration: {
          working: buffer.length > 0,
          generationTimeMs: generationTime,
          cached: fromCache,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (e: any) {
      return reply.code(503).send({
        status: "unhealthy",
        error: e.message,
        timestamp: new Date().toISOString(),
      });
    }
  });
}
