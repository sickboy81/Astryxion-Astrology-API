import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  getSunriseAndSet,
  getPanchangPeriods,
  getVedicTithi,
  getVedicYoga,
  getVedicKarana,
  getSunMoonLongitudes,
} from "../services/astronomy.service.js";
import { ZodiacModeSchema } from "../lib/sweph-zodiac.js";
import { CompatibilityService } from "../services/compatibility.service.js";
import { DoshaService } from "../services/dosha.service.js";
import { z } from "zod";
import { errorBody } from "../lib/utils.js";

const PanchangSchema = z.object({
  date: z.string(), // ISO String
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
});

const MatchingSchema = z.object({
  boyMoonLon: z.number(),
  girlMoonLon: z.number(),
});

const DoshaSchema = z.object({
  planets: z.array(z.object({
    name: z.string(),
    house: z.number(),
    longitude: z.number(),
  })),
  currentSaturnLon: z.number().optional(),
});

export async function registerVedicAdvancedRoutes(app: FastifyInstance) {
  /**
   * Panchang Detalhado (Rahu Kalam, etc.)
   */
  app.post("/api/v1/vedic/panchang-detailed", {
    schema: {
      tags: ["Vedic"],
      summary: "Get complete Panchang including daily periods (Rahu Kaal, etc.)",
      body: zodToJsonSchema(PanchangSchema),
    },
  }, async (req, reply) => {
    const parsed = PanchangSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));

    const date = new Date(parsed.data.date);
    const jd = (date.getTime() / 86400000) + 2440587.5;
    const { latitude, longitude, zodiacMode } = parsed.data;

    try {
      const sunResult = await getSunriseAndSet(jd, latitude, longitude);
      if (!sunResult) throw new Error("Could not calculate sunrise/sunset");

      const tithi = getVedicTithi(jd);
      const yoga = await getVedicYoga(jd, zodiacMode);
      const karana = await getVedicKarana(jd, zodiacMode);
      const periods = getPanchangPeriods(sunResult.sunrise, sunResult.sunset, date.getDay());

      const { moonLon, coordinateModel } = await getSunMoonLongitudes(jd, zodiacMode);
      const { getNakshatraForLongitude } = await import("../vedic-astrology.js");
      const nakshatra = getNakshatraForLongitude(moonLon);

      return {
        coordinateModel,
        tithi,
        yoga,
        karana,
        nakshatra,
        sunrise: sunResult.sunrise,
        sunset: sunResult.sunset,
        periods,
      };
    } catch (e: any) {
      req.log.error(e);
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular Panchang."));
    }
  });

  /**
   * Compatibilidade Marital (Ashtakoot & Porutham)
   */
  app.post("/api/v1/vedic/matching", {
    schema: {
      tags: ["Vedic"],
      summary: "Calculate relationship compatibility (Ashtakoot/Porutham)",
      body: zodToJsonSchema(MatchingSchema),
    },
  }, async (req, reply) => {
    const parsed = MatchingSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));

    const ashtakoot = CompatibilityService.calculateAshtakoot(parsed.data.boyMoonLon, parsed.data.girlMoonLon);
    const porutham = CompatibilityService.calculatePorutham(parsed.data.boyMoonLon, parsed.data.girlMoonLon);

    return { ashtakoot, porutham };
  });

  /**
   * Verificação de Doshas
   */
  app.post("/api/v1/vedic/doshas", {
    schema: {
      tags: ["Vedic"],
      summary: "Generate analysis for Mangal Dosha, Sade Sati, and other afflictions",
      body: zodToJsonSchema(DoshaSchema),
    },
  }, async (req, reply) => {
    const parsed = DoshaSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));

    const mangal = DoshaService.checkMangalDosha(parsed.data.planets as any);
    let sadesati = null;
    
    if (parsed.data.currentSaturnLon) {
      const moon = parsed.data.planets.find(p => p.name === "Moon");
      if (moon) {
        sadesati = DoshaService.checkSadeSati(moon.longitude, parsed.data.currentSaturnLon);
      }
    }

    return { mangal, sadesati };
  });
}
