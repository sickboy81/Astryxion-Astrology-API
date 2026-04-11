import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { buildHoroscope } from "../services/horoscope.service.js";
import { buildVedicHoroscope } from "../services/vedic-horoscope.service.js";
import { ZODIAC_SIGNS, HOROSCOPE_TTL_SECONDS, SIGN_ALIASES } from "../data/constants.js";
import { NAKSHATRA_SLUGS } from "../vedic-horoscope-texts.js";
import { errorBody } from "../lib/utils.js";
import { HoroscopePeriod, VedicHoroscopePeriod } from "../lib/types.js";
import { detectLanguage, Language } from "../i18n.js";

const HoroscopeParamsSchema = z.object({
  sign: z.string().min(1),
  period: z.enum(["daily", "weekly", "monthly"]).default("daily"),
});

const VedicHoroscopeParamsSchema = z.object({
  nakshatra: z.string().min(1),
  period: z.enum(["daily", "weekly", "monthly"]).default("daily"),
});

export async function registerHoroscopeRoutes(app: FastifyInstance, cache: any, rateLimiter: any) {
  // Western Horoscope
  app.get("/api/v1/horoscope/:sign", {
    schema: {
      tags: ["Horoscope"],
      summary: "Get Western Horoscope",
      params: zodToJsonSchema(HoroscopeParamsSchema),
    }
  }, async (req, reply) => {
    const params = HoroscopeParamsSchema.safeParse(req.params);
    if (!params.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos."));
    }

    const { sign, period } = params.data;
    const queryLang = (req.query as any).lang || (req.body as any)?.lang;
    const defaultLang = req.headers["x-default-lang"] as string;
    
    let lang: Language;
    if (queryLang && ['pt', 'en', 'es', 'hi'].includes(queryLang)) {
      lang = queryLang as Language;
    } else if (defaultLang && ['pt', 'en', 'es', 'hi'].includes(defaultLang)) {
      lang = defaultLang as Language;
    } else {
      lang = detectLanguage(req.headers["accept-language"]);
    }

    if (sign === "all") {
      const results = ZODIAC_SIGNS.map(s => buildHoroscope(s, period as HoroscopePeriod, lang));
      return results;
    }

    const lowerSign = sign.toLowerCase();
    const normalizedSign = SIGN_ALIASES[lowerSign] || (sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase());
    if (!ZODIAC_SIGNS.includes(normalizedSign as any)) {
      return reply.code(404).send(errorBody("NOT_FOUND", "Signo inválido."));
    }

    const cacheKey = `horoscope:${normalizedSign}:${period}:${lang}`;
    const cached = await cache.getJson(cacheKey);
    if (cached.hit) return cached.value;

    const result = buildHoroscope(normalizedSign as any, period as HoroscopePeriod, lang);
    await cache.setJson({
      key: cacheKey,
      value: result,
      ttlSeconds: HOROSCOPE_TTL_SECONDS[period] || 3600,
      tags: ["horoscope", `sign:${normalizedSign}`],
    });

    return result;
  });

  // Vedic Horoscope
  app.get("/api/v1/vedic-horoscope/:nakshatra", {
    schema: {
      tags: ["Horoscope"],
      summary: "Get Vedic Horoscope by Nakshatra",
      params: zodToJsonSchema(VedicHoroscopeParamsSchema),
    }
  }, async (req, reply) => {
    const params = VedicHoroscopeParamsSchema.safeParse(req.params);
    if (!params.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos."));
    }

    const { nakshatra, period } = params.data;
    const queryLang = (req.query as any).lang || (req.body as any)?.lang;
    const defaultLang = req.headers["x-default-lang"] as string;
    
    let lang: Language;
    if (queryLang && ['pt', 'en', 'es', 'hi'].includes(queryLang)) {
      lang = queryLang as Language;
    } else if (defaultLang && ['pt', 'en', 'es', 'hi'].includes(defaultLang)) {
      lang = defaultLang as Language;
    } else {
      lang = detectLanguage(req.headers["accept-language"]);
    }

    if (nakshatra === "all") {
      const results = await Promise.all(NAKSHATRA_SLUGS.map(s => buildVedicHoroscope(s, period as VedicHoroscopePeriod, lang)));
      return results;
    }

    if (!NAKSHATRA_SLUGS.includes(nakshatra as any)) {
      return reply.code(404).send(errorBody("NOT_FOUND", "Nakshatra inválido."));
    }

    const cacheKey = `vedic-horoscope:${nakshatra}:${period}:${lang}`;
    const cached = await cache.getJson(cacheKey);
    if (cached.hit) return cached.value;

    const result = await buildVedicHoroscope(nakshatra, period as VedicHoroscopePeriod, lang);
    await cache.setJson({
      key: cacheKey,
      value: result,
      ttlSeconds: HOROSCOPE_TTL_SECONDS[period] || 3600,
      tags: ["vedic-horoscope", `nakshatra:${nakshatra}`],
    });

    return result;
  });

  // POST /api/v1/vedic/horoscope - Alternative for Sandbox/POST-only clients
  app.post("/api/v1/vedic/horoscope", {
    schema: {
      tags: ["Horoscope"],
      summary: "Get Vedic Horoscope (POST version)",
      body: {
        type: "object",
        required: ["nakshatra"],
        properties: {
          nakshatra: { type: "string" },
          period: { type: "string", enum: ["daily", "weekly", "monthly"], default: "daily" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"] }
        }
      }
    }
  }, async (req, reply) => {
    const body = req.body as any;
    const { nakshatra, period = "daily" } = body;
    const queryLang = body.lang;
    const defaultLang = req.headers["x-default-lang"] as string;

    let lang: Language;
    if (queryLang && ['pt', 'en', 'es', 'hi'].includes(queryLang)) {
      lang = queryLang as Language;
    } else if (defaultLang && ['pt', 'en', 'es', 'hi'].includes(defaultLang)) {
      lang = defaultLang as Language;
    } else {
      lang = detectLanguage(req.headers["accept-language"]);
    }

    if (!NAKSHATRA_SLUGS.includes(nakshatra as any)) {
      return reply.code(404).send(errorBody("NOT_FOUND", "Nakshatra inválido."));
    }

    const cacheKey = `vedic-horoscope:${nakshatra}:${period}:${lang}`;
    const cached = await cache.getJson(cacheKey);
    if (cached.hit) return cached.value;

    const result = await buildVedicHoroscope(nakshatra, period as VedicHoroscopePeriod, lang);
    await cache.setJson({
      key: cacheKey,
      value: result,
      ttlSeconds: HOROSCOPE_TTL_SECONDS[period as VedicHoroscopePeriod] || 3600,
      tags: ["vedic-horoscope", `nakshatra:${nakshatra}`],
    });

    return result;
  });
}
