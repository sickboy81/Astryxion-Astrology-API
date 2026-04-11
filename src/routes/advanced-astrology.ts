import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { calculateNatalChart, calculatePlanets } from "../services/calculation.service.js";
import { ZodiacModeSchema } from "../lib/sweph-zodiac.js";
import { 
  calculateSolarReturn, 
  calculateSecondaryProgressions, 
  calculateTransits, 
  calculateSynastry, 
  calculateComposite, 
  calculateEclipses,
  calculateAyanamsa,
  calculateNavamsa,
  calculateDasamsa,
  rectifyBirthTime,
  normalize360,
  getSignForLongitude,
  getSignDegree,
  getNakshatra,
  calculateSolarArcDirected,
} from "../astro-calculations.js";
import {
  calculateAstrocartography,
  calculateAnnualPredictions
} from "../astrocartography.js";
import { calculateVimshottariDasha } from "../vedic-astrology.js";
import { nowUtcIso, errorBody } from "../lib/utils.js";
import { HouseSystemSchema, toSwephHsys } from "../lib/astro/house-systems.js";
import type { Language } from "../i18n.js";
import {
  localizeVedicPlanetLabel,
  localizeVedicPlanetRows,
  localizeZodiacSignLabel,
} from "../lib/vedic-planet-labels.js";

const SolarReturnSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  year: z.number().int().min(1900).max(2100),
  houseSystem: HouseSystemSchema.default("placidus"),
});

const ProgressionsSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  daysProgressed: z.number().int().min(1).max(36500),
  houseSystem: HouseSystemSchema.default("placidus"),
});

const TransitsSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  transitDate: z.string().min(1),
  transitTimeUtc: z.string().min(1),
  houseSystem: HouseSystemSchema.default("placidus"),
});

const SynastrySchema = z.object({
  person1: z.object({
    date: z.string().min(1),
    timeUtc: z.string().min(1),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  person2: z.object({
    date: z.string().min(1),
    timeUtc: z.string().min(1),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  houseSystem: HouseSystemSchema.default("placidus"),
});

const EclipsesSchema = z.object({
  year: z.number().int().min(1900).max(2100),
});

const AstrocartographySchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  houseSystem: HouseSystemSchema.default("placidus"),
});

const AnnualPredictionSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  year: z.number().int().min(2020).max(2050),
  houseSystem: HouseSystemSchema.default("placidus"),
  lang: z.enum(["en", "pt", "es", "hi"]).optional(),
});

const SolarArcSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  directedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  directedTimeUtc: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional().default("12:00:00"),
  houseSystem: HouseSystemSchema.default("placidus"),
});

const VedicChartSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  houseSystem: HouseSystemSchema.default("placidus"),
  /** `tropical`: mapa trópico + ayanamsa linear legada (comportamento anterior). `sidereal_lahiri`: efemérides Swiss siderais Lahiri. */
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  /** Rótulos de planetas e signos (navamsa/dasamsa) neste idioma. Default `en`. */
  lang: z.enum(["en", "pt", "es", "hi"]).optional().default("en"),
});

const RectificationSchema = z.object({
  date: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timeRange: z.object({
    start: z.string().regex(/^\d{2}:\d{2}$/),
    end: z.string().regex(/^\d{2}:\d{2}$/),
  }),
  events: z.array(z.object({
    date: z.string().min(1),
    description: z.string().min(1),
  })).min(1).max(20),
});

export async function registerAdvancedAstrologyRoutes(app: FastifyInstance) {
  // Solar Return
  app.post("/api/v1/solar-return", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(SolarReturnSchema) }
  }, async (req, reply) => {
    const parsed = SolarReturnSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    try {
      const [yearStr, monthStr, dayStr] = parsed.data.date.split("-");
      const [hourStr, minStr, secStr] = parsed.data.timeUtc.split(":");
      const result = calculateSolarReturn(
        Number(yearStr), Number(monthStr), Number(dayStr),
        Number(hourStr), Number(minStr), Number(secStr || "0"),
        parsed.data.latitude, parsed.data.longitude, parsed.data.year,
        toSwephHsys(parsed.data.houseSystem)
      );
      return { generatedAtUtc: nowUtcIso(), solarReturn: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular revolução solar.")); }
  });

  // Progressions
  app.post("/api/v1/progressions", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(ProgressionsSchema) }
  }, async (req, reply) => {
    const parsed = ProgressionsSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    try {
      const natal = await calculateNatalChart(parsed.data);
      const result = calculateSecondaryProgressions(
        natal.jdEt, natal.jdUt, parsed.data.latitude, parsed.data.longitude,
        toSwephHsys(parsed.data.houseSystem),
        parsed.data.daysProgressed
      );
      return { generatedAtUtc: nowUtcIso(), progressions: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular progressões.")); }
  });

  // Transits
  app.post("/api/v1/transits", {
    schema: { tags: ["Advanced"] }
  }, async (req, reply) => {
    try {
      let parsed = TransitsSchema.safeParse(req.body);

      // Support simplified dashboard payload: {natalDate, natalTimeUtc, natalLatitude, natalLongitude}
      if (!parsed.success && (req.body as any).natalDate && (req.body as any).natalTimeUtc) {
        const body = req.body as any;
        const now = new Date();
        parsed = TransitsSchema.safeParse({
          date: body.natalDate,
          timeUtc: body.natalTimeUtc,
          latitude: parseFloat(body.natalLatitude),
          longitude: parseFloat(body.natalLongitude),
          transitDate: now.toISOString().slice(0, 10),
          transitTimeUtc: now.toISOString().slice(11, 19),
          houseSystem: body.houseSystem || "placidus",
        });
      }

      if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
      try {
        const natal = await calculateNatalChart(parsed.data);
        const sweph = await import("sweph");
        const [y, m, d] = parsed.data.transitDate.split("-").map(Number);
        const [h, min, s] = parsed.data.transitTimeUtc.split(":").map(Number);
        const jd = sweph.utc_to_jd(y!, m!, d!, h!, min!, s || 0, sweph.constants.SE_GREG_CAL);
        const result = calculateTransits(jd.data[0], natal.planets, parsed.data.latitude, parsed.data.longitude, toSwephHsys(parsed.data.houseSystem));
        return { generatedAtUtc: nowUtcIso(), transits: result };
      } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular trânsitos.")); }
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular trânsitos.")); }
  });

  // Synastry
  app.post("/api/v1/synastry", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(SynastrySchema) }
  }, async (req, reply) => {
    const parsed = SynastrySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    try {
      const [p1, p2] = await Promise.all([
        calculateNatalChart({ ...parsed.data.person1, houseSystem: parsed.data.houseSystem }),
        calculateNatalChart({ ...parsed.data.person2, houseSystem: parsed.data.houseSystem })
      ]);
      const result = calculateSynastry(p1.planets, p2.planets);
      return { generatedAtUtc: nowUtcIso(), synastry: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular sinastria.")); }
  });

  // Composite
  app.post("/api/v1/composite", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(SynastrySchema) }
  }, async (req, reply) => {
    const parsed = SynastrySchema.safeParse(req.body); // Same schema
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    try {
      const [p1, p2] = await Promise.all([
        calculateNatalChart({ ...parsed.data.person1, houseSystem: parsed.data.houseSystem }),
        calculateNatalChart({ ...parsed.data.person2, houseSystem: parsed.data.houseSystem })
      ]);
      const result = calculateComposite(p1.planets, p2.planets, parsed.data.person1.latitude, parsed.data.person1.longitude, toSwephHsys(parsed.data.houseSystem));
      return { generatedAtUtc: nowUtcIso(), composite: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular mapa composto.")); }
  });

  // Eclipses
  app.post("/api/v1/eclipses", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(EclipsesSchema) }
  }, async (req, reply) => {
    const parsed = EclipsesSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));
    return { generatedAtUtc: nowUtcIso(), eclipses: calculateEclipses(parsed.data.year) };
  });

  // Astrocartography
  app.post("/api/v1/astrocartography", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(AstrocartographySchema) }
  }, async (req, reply) => {
    const parsed = AstrocartographySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));
    try {
      const natal = await calculateNatalChart(parsed.data);
      const result = calculateAstrocartography(natal.planets, natal.angles.ascendant, natal.angles.midheaven, parsed.data);
      return { generatedAtUtc: nowUtcIso(), astrocartography: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular astrocartografia.")); }
  });

  // Annual Predictions
  app.post("/api/v1/annual-predictions", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(AnnualPredictionSchema) }
  }, async (req, reply) => {
    const parsed = AnnualPredictionSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));
    try {
      const natal = await calculateNatalChart(parsed.data);
      const lang = (parsed.data.lang || "en") as Language;
      const result = calculateAnnualPredictions(natal.planets, natal.aspects, parsed.data, parsed.data.year, lang);
      return { generatedAtUtc: nowUtcIso(), predictions: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular previsões anuais.")); }
  });

  // Solar arc (true Sun arc; houses for directed UT)
  app.post("/api/v1/solar-arc", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(SolarArcSchema) },
  }, async (req, reply) => {
    const parsed = SolarArcSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    try {
      const natal = await calculateNatalChart({
        date: parsed.data.date,
        timeUtc: parsed.data.timeUtc.length === 5 ? `${parsed.data.timeUtc}:00` : parsed.data.timeUtc,
        latitude: parsed.data.latitude,
        longitude: parsed.data.longitude,
        houseSystem: parsed.data.houseSystem,
      });
      const sweph = await import("sweph");
      const cal = sweph.constants.SE_GREG_CAL;
      const [y, m, d] = parsed.data.date.split("-").map(Number);
      const [h, mi, se] = (parsed.data.timeUtc.length === 5 ? `${parsed.data.timeUtc}:00` : parsed.data.timeUtc).split(":").map(Number);
      const birthJdUt = sweph.utc_to_jd(y!, m!, d!, h!, mi!, se ?? 0, cal).data[1] as number;
      const [dy, dm, dd] = parsed.data.directedDate.split("-").map(Number);
      const dirT = parsed.data.directedTimeUtc.length === 5 ? `${parsed.data.directedTimeUtc}:00` : parsed.data.directedTimeUtc;
      const [dh, dmi, dse] = dirT.split(":").map(Number);
      const dirJdUt = sweph.utc_to_jd(dy!, dm!, dd!, dh!, dmi!, dse ?? 0, cal).data[1] as number;
      const hsys = toSwephHsys(parsed.data.houseSystem);
      const directed = calculateSolarArcDirected(natal.planets, birthJdUt, dirJdUt, parsed.data.latitude, parsed.data.longitude, hsys);
      return {
        generatedAtUtc: nowUtcIso(),
        method: directed.method,
        solarArcDegrees: directed.solarArcDegrees,
        birthJulianDayUt: directed.birthJulianDayUt,
        directedJulianDayUt: directed.directedJulianDayUt,
        angles: directed.angles,
        cusps: directed.cusps,
        planets: directed.planets,
      };
    } catch (e: any) {
      return reply.code(500).send(errorBody("INTERNAL_ERROR", e?.message || "Erro ao calcular arco solar."));
    }
  });

  // Vedic Chart
  app.post("/api/v1/vedic-chart", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(VedicChartSchema) }
  }, async (req, reply) => {
    const parsed = VedicChartSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));
    try {
      const timeNormalized =
        parsed.data.timeUtc.length === 5 ? `${parsed.data.timeUtc}:00` : parsed.data.timeUtc;
      const birthDate = new Date(`${parsed.data.date}T${timeNormalized}Z`);
      const zm = parsed.data.zodiacMode;
      const lang: Language = parsed.data.lang;

      if (zm === "sidereal_lahiri") {
        const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, timeNormalized, {
          zodiacMode: "sidereal_lahiri",
        });
        const siderealPlanets = planets.map((p: Record<string, unknown> & { longitude: number; name: string }) => {
          const slon = normalize360(p.longitude);
          return {
            ...p,
            siderealLongitude: slon,
            nakshatra: getNakshatra(slon),
          };
        });
        const navamsa = siderealPlanets.map((p) => ({
          name: p.name,
          longitude: calculateNavamsa(p.siderealLongitude),
          sign: getSignForLongitude(calculateNavamsa(p.siderealLongitude)),
          degree: Math.floor(getSignDegree(calculateNavamsa(p.siderealLongitude))),
        }));
        const dasamsa = siderealPlanets.map((p) => ({
          name: p.name,
          longitude: calculateDasamsa(p.siderealLongitude),
          sign: getSignForLongitude(calculateDasamsa(p.siderealLongitude)),
          degree: Math.floor(getSignDegree(calculateDasamsa(p.siderealLongitude))),
        }));
        const moon = siderealPlanets.find((p) => p.name === "Moon" || p.name === "Lua");
        const dasha = moon ? calculateVimshottariDasha(moon.siderealLongitude, birthDate) : null;
        const ayanamsaDeg =
          coordinateModel.zodiacMode === "sidereal_lahiri" ? coordinateModel.ayanamsaDegrees : 0;
        return {
          generatedAtUtc: nowUtcIso(),
          coordinateModel,
          vedicChart: {
            ayanamsa: ayanamsaDeg,
            planets: localizeVedicPlanetRows(siderealPlanets, lang),
            navamsa: navamsa.map((row) => ({
              ...row,
              name: localizeVedicPlanetLabel(row.name, lang),
              sign: localizeZodiacSignLabel(row.sign, lang),
            })),
            dasamsa: dasamsa.map((row) => ({
              ...row,
              name: localizeVedicPlanetLabel(row.name, lang),
              sign: localizeZodiacSignLabel(row.sign, lang),
            })),
            dasha,
          },
        };
      }

      const natal = await calculateNatalChart({
        date: parsed.data.date,
        timeUtc: timeNormalized,
        latitude: parsed.data.latitude,
        longitude: parsed.data.longitude,
        houseSystem: parsed.data.houseSystem,
      });
      const ayanamsa = calculateAyanamsa(natal.jdEt);
      const siderealPlanets = natal.planets.map((p) => ({
        ...p,
        siderealLongitude: normalize360(p.longitude - ayanamsa),
        nakshatra: getNakshatra(normalize360(p.longitude - ayanamsa)),
      }));
      const navamsa = siderealPlanets.map((p) => ({
        name: p.name,
        longitude: calculateNavamsa(p.siderealLongitude),
        sign: getSignForLongitude(calculateNavamsa(p.siderealLongitude)),
        degree: Math.floor(getSignDegree(calculateNavamsa(p.siderealLongitude))),
      }));
      const dasamsa = siderealPlanets.map((p) => ({
        name: p.name,
        longitude: calculateDasamsa(p.siderealLongitude),
        sign: getSignForLongitude(calculateDasamsa(p.siderealLongitude)),
        degree: Math.floor(getSignDegree(calculateDasamsa(p.siderealLongitude))),
      }));
      const moon = siderealPlanets.find((p) => p.name === "Moon");
      const dasha = moon ? calculateVimshottariDasha(moon.siderealLongitude, birthDate) : null;
      return {
        generatedAtUtc: nowUtcIso(),
        coordinateModel: { zodiacMode: "tropical" as const },
        vedicChart: {
          ayanamsa: Math.round(ayanamsa * 10000) / 10000,
          planets: localizeVedicPlanetRows(siderealPlanets, lang),
          navamsa: navamsa.map((row) => ({
            ...row,
            name: localizeVedicPlanetLabel(row.name, lang),
            sign: localizeZodiacSignLabel(row.sign, lang),
          })),
          dasamsa: dasamsa.map((row) => ({
            ...row,
            name: localizeVedicPlanetLabel(row.name, lang),
            sign: localizeZodiacSignLabel(row.sign, lang),
          })),
          dasha,
        },
      };
    } catch (e) {
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular mapa védico."));
    }
  });

  // Rectification
  app.post("/api/v1/rectification", {
    schema: { tags: ["Advanced"], body: zodToJsonSchema(RectificationSchema) }
  }, async (req, reply) => {
    const parsed = RectificationSchema.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido."));
    try {
      const [y, m, d] = parsed.data.date.split("-").map(Number);
      const result = rectifyBirthTime(y!, m!, d!, parsed.data.latitude, parsed.data.longitude, parsed.data.events.map(e => ({ event: e.description, date: e.date, description: e.description })), parsed.data.timeRange);
      return { generatedAtUtc: nowUtcIso(), rectification: result };
    } catch (e) { return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao retificar horário.")); }
  });

  // Relationship Compatibility (Simplified Synastry for Reports)
  app.post("/api/v1/compatibility", {
    schema: { tags: ["Advanced"] }
  }, async (req, reply) => {
    const body = req.body as any;
    const { p1, p2, lang = "en" } = body;

    if (!p1 || !p2) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Dados das pessoas P1 e P2 são necessários."));
    }

    try {
      const [natal1, natal2] = await Promise.all([
        calculateNatalChart({ ...p1, lang }),
        calculateNatalChart({ ...p2, lang })
      ]);

      const result = calculateSynastry(natal1.planets, natal2.planets);
      
      // Calculate a dynamic score based on aspects
      let score = 50; 
      const harmonyCount = result.synastryAspects.filter(a => ["trine", "sextile", "conjunction"].includes(a.type)).length;
      const tensionCount = result.synastryAspects.filter(a => ["square", "opposition"].includes(a.type)).length;
      
      score += (harmonyCount * 5);
      score -= (tensionCount * 3);
      score = Math.max(10, Math.min(99, score));

      const summaries: any = {
        en: `High resonance detected in ${harmonyCount} planetary aspects. Some tension in ${tensionCount} areas.`,
        pt: `Alta ressonância detectada em ${harmonyCount} aspectos planetários. Alguma tensão em ${tensionCount} áreas.`,
        es: `Alta resonancia detectada en ${harmonyCount} aspectos planetarios. Algo de tensión en ${tensionCount} áreas.`,
        hi: `${harmonyCount} ग्रह दृष्टिकोणों में उच्च अनुनाद पाया गया। ${tensionCount} क्षेत्रों में कुछ तनाव।`
      };

      return {
        generatedAtUtc: nowUtcIso(),
        compatibility: {
          score,
          summary: summaries[lang] || summaries.en
        },
        planets1: natal1.planets,
        planets2: natal2.planets
      };
    } catch (e) {
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular compatibilidade."));
    }
  });
}
