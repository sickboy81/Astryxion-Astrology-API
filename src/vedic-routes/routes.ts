import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  houseOfLongitude,
  getSignForLongitude,
  getSignDegree,
  MAHADASHA_PERIODS,
} from "../astro-calculations.js";
import {
  getNakshatraForLongitude,
  calculateVimshottariDasha,
  calculateVargaAnalysis,
  calculateYogas,
  calculateJaiminiKarakas,
  calculateCharaDasha,
  calculateVedicRemedies,
  calculateLalKitabAnalysis,
  calculateTajikaChart,
  calculateNadiAnalysis,
  NAKSHATRAS,
} from "../vedic-astrology.js";
import {
  calculateShadbala,
  calculateAshtakavarga,
  calculatePanchanga,
  evaluateMuhurta,
  calculateGrahaYuddha,
  calculateAvasthas,
  calculateTaraBala,
  calculateGochara,
  calculatePrasna,
  calculateDashaSandhi,
  calculateArgala,
  calculateDrishti,
} from "../vedic-advanced.js";
import {
  calculatePlanets,
  calculateAscendant,
} from "../services/calculation.service.js";
import { computeVargottamaAnalysis } from "../lib/vedic-vargottama.js";
import type { PlanetData, ZodiacSign } from "../lib/astro/types.js";
import { HouseSystemSchema, HOUSE_SYSTEM_IDS } from "../lib/astro/house-systems.js";
import { ZodiacModeSchema } from "../lib/sweph-zodiac.js";
import { nowUtcIso, errorBody } from "../lib/utils.js";
import { detectLanguage, type Language } from "../i18n.js";
import { localizeVedicPlanetLabel } from "../lib/vedic-planet-labels.js";
import { localizeNakshatraForApi, nakshatraNarrativeRow } from "../i18n/nakshatra-narrative.js";
import { nakshatraFieldsRow, localizeNakshatraCompatibility } from "../i18n/nakshatra-fields-i18n.js";
import { vedErr } from "../i18n/vedic-api-messages.js";
import {
  localizeArgalaResult,
  localizeAshtakavargaForLang,
  localizeAvasthasRows,
  localizeDrishtiResults,
  localizeGocharaRows,
  localizeGrahaYuddhaRows,
  localizePrasnaResult,
  localizeShadbalaForLang,
  localizeVargottamaResponse,
  localizeVedicPlanetRows,
  localizeZodiacSignLabel,
} from "../lib/vedic-planet-labels.js";

function nowUtcIsoLocal() {
  return new Date().toISOString();
}

function errorBodyLocal(code: string, message: string, details?: unknown) {
  return { error: { code, message, details: details ?? null } };
}

function routeLang(req: FastifyRequest, body?: { lang?: Language }): Language {
  const fromBody = body?.lang;
  if (fromBody && ["pt", "en", "es", "hi"].includes(fromBody)) return fromBody;
  return detectLanguage(req.headers["accept-language"]);
}

// Schemas
const VedicRouteLangSchema = z.enum(["en", "pt", "es", "hi"]).optional().default("en");

const shadbalaSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  houseSystem: HouseSystemSchema.optional().default("placidus"),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

const panchangaSchema = z.object({
  date: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

const muhurtaSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  purpose: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

const taraBalaSchema = z.object({
  nakshatra1: z.number().min(0).max(26),
  nakshatra2: z.number().min(0).max(26),
  lang: VedicRouteLangSchema,
});

const gocharaSchema = z.object({
  birthDate: z.string().min(1),
  birthTimeUtc: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  birthLatitude: z.number().min(-90).max(90),
  birthLongitude: z.number().min(-180).max(180),
  transitDate: z.string().optional(),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

const prasnaSchema = z.object({
  question: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

const argalaDrishtiSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  house: z.number().min(1).max(12).optional().default(1),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

const NatalChartSchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  houseSystem: HouseSystemSchema.optional().default("placidus"),
  zodiacMode: ZodiacModeSchema.optional().default("tropical"),
  lang: VedicRouteLangSchema,
});

export async function registerVedicRoutes(app: FastifyInstance) {
  // ============================================================
  // GET /api/v1/nakshatras - Lista todos os 27 nakshatras
  // ============================================================
  app.get("/api/v1/nakshatras", {
    schema: {
      tags: ["Védico"],
      summary: "Lista todos os 27 Nakshatras",
      description: "Lista os 27 nakshatras com campos localizáveis (lord, deity, description, symbol, nature, guna, element, favorableActivities, unfavorableActivities) via query lang=en|pt|es|hi.",
      querystring: {
        type: "object",
        properties: {
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en", description: "Idioma da resposta" },
          name: { type: "string", description: "Filtrar por nome do nakshatra" },
        },
      },
      response: {
        200: { description: "Lista de nakshatras" },
        401: { description: "Não autorizado" },
        429: { description: "Limite excedido" },
      },
    },
  }, async (req, reply) => {
    const queryLang = (req.query as any)?.lang;
    const lang: Language = queryLang && ['pt', 'en', 'es', 'hi'].includes(queryLang) 
      ? queryLang 
      : detectLanguage(req.headers["accept-language"]);
    const nameFilter = (req.query as any)?.name;

    let nakshatras = NAKSHATRAS;
    if (nameFilter) {
      nakshatras = nakshatras.filter(n => n.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      count: nakshatras.length,
      nakshatras: nakshatras.map((n) => {
        const idx = NAKSHATRAS.findIndex((x) => x.name === n.name);
        const i = idx >= 0 ? idx : 0;
        const row = nakshatraNarrativeRow(i, lang);
        const fields = nakshatraFieldsRow(i, lang);
        return {
          name: n.name,
          sanskritName: n.sanskritName,
          lord: localizeVedicPlanetLabel(n.lord, lang),
          deity: row.deity,
          symbol: fields.symbol,
          nature: fields.nature,
          guna: fields.guna,
          element: fields.element,
          animal: fields.animal,
          tree: fields.tree,
          direction: fields.direction,
          caste: fields.caste,
          gender: fields.gender,
          dosha: fields.dosha,
          description: row.description,
          favorableActivities: fields.favorableActivities,
          unfavorableActivities: fields.unfavorableActivities,
          compatibility: localizeNakshatraCompatibility(n.compatibility, lang),
        };
      }),
    };
  });

  // POST /api/v1/nakshatra - Calcula nakshatra para uma longitude
  app.post("/api/v1/nakshatra", {
    schema: {
      tags: ["Védico"],
      summary: "Calcula Nakshatra para uma posição",
      description: "Nakshatra e pada para uma longitude; mesmos campos localizáveis que GET /nakshatras (lang no body).",
      body: {
        type: "object",
        required: ["longitude"],
        properties: {
          longitude: { type: "number", minimum: 0, maximum: 360, description: "Longitude eclíptica (0-360°)" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Dados do nakshatra" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const Lnak = routeLang(req, body);
    if (!body.longitude || body.longitude < 0 || body.longitude > 360) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(Lnak, "longitudeRange")));
    }

    const nakshatra = localizeNakshatraForApi(getNakshatraForLongitude(body.longitude), Lnak);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      nakshatra,
    };
  });

  // POST /api/v1/dasha - Calcula Vimshottari Dasha
  app.post("/api/v1/dasha", {
    schema: {
      tags: ["Védico"],
      summary: "Calcula Vimshottari Dasha",
      description: "Calcula o sistema completo de Vimshottari Dasha baseado na posição da Lua no nascimento.",
      body: {
        type: "object",
        required: ["moonLongitude", "birthDate"],
        properties: {
          moonLongitude: { type: "number", minimum: 0, maximum: 360, description: "Longitude da Lua no nascimento" },
          birthDate: { type: "string", description: "Data de nascimento (YYYY-MM-DD)" },
          yearsToCalculate: { type: "number", default: 120, description: "Anos para calcular (padrão: 120)" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Sistema Dasha completo" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.moonLongitude || !body.birthDate) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "moonLongitudeBirthDateRequired")));
    }

    const birthDate = new Date(body.birthDate);
    const dasha = calculateVimshottariDasha(body.moonLongitude, birthDate);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      dasha,
    };
  });

  // POST /api/v1/varga-analysis - Análise completa de Divisional Charts
  app.post("/api/v1/varga-analysis", {
    schema: {
      tags: ["Védico"],
      summary: "Análise de Divisional Charts (Vargas)",
      description: "Calcula e analisa todos os divisional charts (D1, D9, D10, etc.) para avaliação de força planetária.",
      body: {
        type: "object",
        required: ["planets", "ascendantLongitude"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
                sign: { type: "string" },
                house: { type: "number" },
              },
            },
            description: "Lista de planetas com posições",
          },
          ascendantLongitude: { type: "number", description: "Longitude do Ascendente" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Análise de Vargas completa" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets || !body.ascendantLongitude) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsAscendantLongitudeRequired")));
    }

    const vargaAnalysis = calculateVargaAnalysis(body.planets, body.ascendantLongitude);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      vargaAnalysis,
    };
  });

  // POST /api/v1/yogas - Calcula Yogas planetários
  app.post("/api/v1/yogas", {
    schema: {
      tags: ["Védico"],
      summary: "Calcula Yogas Planetários",
      description: "Identifica todas as combinações planetárias auspiciosas e desafiadoras no mapa.",
      body: {
        type: "object",
        required: ["planets", "houses"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
                sign: { type: "string" },
                house: { type: "number" },
              },
            },
            description: "Lista de planetas com posições",
          },
          houses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                house: { type: "number" },
                longitude: { type: "number" },
                sign: { type: "string" },
              },
            },
            description: "Lista de casas com cúspides",
          },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Lista de Yogas encontrados" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets || !body.houses) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsHousesRequired")));
    }

    const yogas = calculateYogas(body.planets, body.houses);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      count: yogas.length,
      yogas,
    };
  });

  // POST /api/v1/jaimini - Calcula Karakas e Chara Dasha
  app.post("/api/v1/jaimini", {
    schema: {
      tags: ["Védico"],
      summary: "Sistema Jaimini - Karakas e Chara Dasha",
      description: "Calcula os Karakas (significadores) e Chara Dasha do sistema Jaimini.",
      body: {
        type: "object",
        required: ["planets", "ascendantSign", "birthDate"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
                sign: { type: "string" },
              },
            },
            description: "Lista de planetas com posições",
          },
          ascendantSign: { type: "string", description: "Signo do Ascendente" },
          birthDate: { type: "string", description: "Data de nascimento" },
          yearsToCalculate: { type: "number", default: 100 },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Dados Jaimini completos" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets || !body.ascendantSign || !body.birthDate) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsAscendantSignBirthRequired")));
    }

    const karakas = calculateJaiminiKarakas(body.planets);
    const charaDasha = calculateCharaDasha(body.ascendantSign, new Date(body.birthDate), body.yearsToCalculate || 100);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      jaimini: {
        karakas,
        charaDasha,
      },
    };
  });

  // POST /api/v1/remedies - Calcula remédios védicos
  app.post("/api/v1/remedies", {
    schema: {
      tags: ["Védico"],
      summary: "Remédios Védicos",
      description: "Calcula gemas, mantras, yantras, doações, jejuns e rituais recomendados.",
      body: {
        type: "object",
        required: ["planets"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
                sign: { type: "string" },
                house: { type: "number" },
              },
            },
            description: "Lista de planetas com posições",
          },
          houses: {
            type: "array",
            items: { type: "object" },
            description: "Lista de casas",
          },
          yogas: {
            type: "array",
            items: { type: "object" },
            description: "Lista de yogas encontrados",
          },
          dasha: {
            type: "object",
            description: "Sistema Dasha atual",
          },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Remédios védicos recomendados" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsRequired")));
    }

    const remedies = calculateVedicRemedies(body.planets, body.yogas || [], body.dasha || { currentMahadasha: { planet: "" }, currentAntardasha: { planet: "" }, currentPratyantardasha: { planet: "" }, allMahadashas: [], remainingYears: 0, balanceAtBirth: 0 });

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      remedies,
    };
  });

  // POST /api/v1/lal-kitab - Análise Lal Kitab
  app.post("/api/v1/lal-kitab", {
    schema: {
      tags: ["Védico"],
      summary: "Análise Lal Kitab",
      description: "Análise baseada no sistema Lal Kitab com remédios simplificados.",
      body: {
        type: "object",
        required: ["planets", "houses"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
                house: { type: "number" },
              },
            },
            description: "Lista de planetas com posições",
          },
          houses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                house: { type: "number" },
                longitude: { type: "number" },
                sign: { type: "string" },
              },
            },
            description: "Lista de casas",
          },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Análise Lal Kitab completa" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets || !body.houses) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsHousesRequired")));
    }

    const lalKitab = calculateLalKitabAnalysis(body.planets, body.houses);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      lalKitab,
    };
  });

  // POST /api/v1/tajika - Revolução Solar Védica
  app.post("/api/v1/tajika", {
    schema: {
      tags: ["Védico"],
      summary: "Tajika - Revolução Solar Védica",
      description: "Calcula o chart Tajika (revolução solar védica) com Muntha, Varsheshwar e previsões anuais.",
      body: {
        type: "object",
        required: ["planets", "birthDate", "year"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
              },
            },
            description: "Lista de planetas com posições",
          },
          birthDate: { type: "string", description: "Data de nascimento" },
          year: { type: "number", description: "Ano para calcular a revolução" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Chart Tajika completo" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets || !body.birthDate || !body.year) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsBirthYearRequired")));
    }

    const tajika = calculateTajikaChart(body.planets, new Date(body.birthDate), body.year);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      tajika,
    };
  });

  // POST /api/v1/nadi - Análise Nadi
  app.post("/api/v1/nadi", {
    schema: {
      tags: ["Védico"],
      summary: "Análise Nadi",
      description: "Previsões baseadas no sistema Nadi com lições kármicas e caminho espiritual.",
      body: {
        type: "object",
        required: ["planets", "moonLongitude"],
        properties: {
          planets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                longitude: { type: "number" },
              },
            },
            description: "Lista de planetas com posições",
          },
          moonLongitude: { type: "number", description: "Longitude da Lua" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
        },
      },
      response: {
        200: { description: "Análise Nadi completa" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
      },
    },
  }, async (req, reply) => {
    const body = req.body as any;
    const L = routeLang(req, body);
    if (!body.planets || !body.moonLongitude) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "planetsMoonLonRequired")));
    }

    const nakshatra = getNakshatraForLongitude(body.moonLongitude);
    const nadi = calculateNadiAnalysis(body.planets, nakshatra);

    return {
      generatedAtUtc: nowUtcIsoLocal(),
      nadi: {
        nakshatra: {
          name: nakshatra.name,
          sanskritName: nakshatra.sanskritName,
          lord: nakshatra.lord,
          deity: nakshatra.deity,
          pada: nakshatra.pada,
        },
        ...nadi,
      },
    };
  });

  // POST /api/v1/vedic-complete - Mapa Védico Completo
  app.post("/api/v1/vedic-complete", {
    schema: {
      tags: ["Védico"],
      summary: "Mapa Védico Completo",
      description: "Retorna TODAS as informações védicas em uma única chamada: Nakshatra, Dasha, Vargas, Yogas, Karakas, Remédios, Lal Kitab, Tajika e Nadi.",
      body: {
        type: "object",
        required: ["date", "timeUtc", "latitude", "longitude"],
        properties: {
          date: { type: "string", description: "Data de nascimento (YYYY-MM-DD)" },
          timeUtc: { type: "string", description: "Hora UTC (HH:MM:SS)" },
          latitude: { type: "number", minimum: -90, maximum: 90 },
          longitude: { type: "number", minimum: -180, maximum: 180 },
          houseSystem: { type: "string", enum: [...HOUSE_SYSTEM_IDS], default: "placidus" },
          lang: { type: "string", enum: ["pt", "en", "es", "hi"], default: "en" },
          zodiacMode: {
            type: "string",
            enum: ["tropical", "sidereal_lahiri"],
            default: "tropical",
            description: "tropical = ecliptic tropical (legacy); sidereal_lahiri = Swiss Ephemeris Lahiri ayanamsa.",
          },
        },
      },
      response: {
        200: { description: "Mapa védico completo" },
        400: { description: "Erro de validação" },
        401: { description: "Não autorizado" },
        429: { description: "Limite excedido" },
        500: { description: "Erro interno" },
      },
    },
  }, async (req, reply) => {
    const parsed = NatalChartSchema.safeParse(req.body);
    const Lvc = routeLang(req, req.body as { lang?: Language });
    if (!parsed.success) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(Lvc, "invalidPayload"), parsed.error.flatten()));
    }

    const lang: Language = parsed.data.lang;
    try {
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const ascendant = await calculateAscendant(
        parsed.data.date,
        parsed.data.timeUtc,
        parsed.data.latitude,
        parsed.data.longitude,
        parsed.data.houseSystem,
        { zodiacMode: zm }
      );
      const cusps = ascendant.cusps;

      for (const planet of planets) {
        planet.house = houseOfLongitude(planet.longitude, cusps);
      }

      const houses = cusps.slice(0, 12).map((c: number, i: number) => ({
        house: i + 1,
        longitude: c,
        sign: getSignForLongitude(c),
        degree: Math.floor(getSignDegree(c)),
      }));

      const moon = planets.find((p: any) => p.name === "Lua" || p.name === "Moon");
      const nakshatra = moon ? getNakshatraForLongitude(moon.longitude) : null;

      const birthDateTime = new Date(parsed.data.date + "T" + parsed.data.timeUtc);
      const dasha = moon ? calculateVimshottariDasha(moon.longitude, birthDateTime) : null;
      const vargaAnalysis = calculateVargaAnalysis(planets, ascendant.longitude);
      const yogas = calculateYogas(planets, houses);
      const karakas = calculateJaiminiKarakas(planets);
      const remedies = calculateVedicRemedies(planets, yogas, dasha || {
        currentMahadasha: { planet: "", startDate: "", endDate: "", years: 0, subPeriods: [], interpretation: "", favorable: [], challenges: [] },
        currentAntardasha: { planet: "", startDate: "", endDate: "", months: 0, interpretation: "" },
        currentPratyantardasha: { planet: "", startDate: "", endDate: "", months: 0, interpretation: "" },
        allMahadashas: [],
        remainingYears: 0,
        balanceAtBirth: 0
      });
      const lalKitab = calculateLalKitabAnalysis(planets, houses);
      const tajika = calculateTajikaChart(planets, new Date(parsed.data.date + "T" + parsed.data.timeUtc), new Date().getFullYear());
      const nadi = nakshatra ? calculateNadiAnalysis(planets, nakshatra) : null;
      const vargottama = localizeVargottamaResponse(
        computeVargottamaAnalysis(planets as PlanetData[], ascendant.longitude),
        lang
      );

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        vedicChart: {
          planets: localizeVedicPlanetRows(planets, lang),
          houses: houses.map((h) => ({ ...h, sign: localizeZodiacSignLabel(h.sign, lang) })),
          nakshatra,
          dasha,
          vargaAnalysis: {
            overallStrength: vargaAnalysis.overallStrength,
            keyInsights: vargaAnalysis.keyInsights,
          },
          vargottama,
          yogas,
          jaimini: { karakas, charaDasha: calculateCharaDasha(getSignForLongitude(ascendant.longitude), new Date(parsed.data.date + "T" + parsed.data.timeUtc), 100) },
          remedies,
          lalKitab,
          tajika,
          nadi,
        },
      };
    } catch (e) {
      req.log.error({ err: e }, "vedic-complete error");
      return reply.code(500).send(errorBodyLocal("INTERNAL_ERROR", vedErr(lang, "vedicCompleteFailed")));
    }
  });

  app.post("/api/v1/vedic/vargottama", {
    schema: {
      tags: ["Védico"],
      summary: "Vargottama (D1 vs D9)",
      description:
        "Lista planetas cujo signo no mapa principal (D1) coincide com o signo no mesmo modelo divisional D9 usado em `/api/v1/varga-analysis`. Rahu/Ketu excluídos.",
      body: zodToJsonSchema(NatalChartSchema),
      response: {
        200: { description: "Análise de vargottama" },
        400: { description: "Erro de validação" },
        500: { description: "Erro interno" },
      },
    },
  }, async (req, reply) => {
    const parsed = NatalChartSchema.safeParse(req.body);
    const Lv = routeLang(req, req.body as { lang?: Language });
    if (!parsed.success) {
      return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(Lv, "invalidPayload"), parsed.error.flatten()));
    }
    const lang: Language = parsed.data.lang;
    try {
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const ascendant = await calculateAscendant(
        parsed.data.date,
        parsed.data.timeUtc,
        parsed.data.latitude,
        parsed.data.longitude,
        parsed.data.houseSystem,
        { zodiacMode: zm }
      );
      const cusps = ascendant.cusps;
      for (const planet of planets) {
        planet.house = houseOfLongitude(planet.longitude, cusps);
      }
      const analysis = computeVargottamaAnalysis(planets as PlanetData[], ascendant.longitude);
      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        ...localizeVargottamaResponse(analysis, lang),
      };
    } catch (e) {
      req.log.error({ err: e }, "vargottama error");
      return reply.code(500).send(errorBodyLocal("INTERNAL_ERROR", vedErr(lang, "vargottamaFailed")));
    }
  });

  // ============================================================
  // SHADBALA - 6 TIPOS DE FORÇA PLANETÁRIA
  // ============================================================
  app.post("/api/v1/shadbala", {
    schema: {
      tags: ["Védico"],
      summary: "Shadbala - 6 Forças Planetárias",
      description: "Calcula as 6 forças planetárias: Sthana, Dig, Kala, Chesta, Naisargika, Drik Bala.",
      body: zodToJsonSchema(shadbalaSchema),
      response: { 200: { description: "Análise Shadbala completa" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = shadbalaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const ascendant = await calculateAscendant(
        parsed.data.date,
        parsed.data.timeUtc,
        parsed.data.latitude,
        parsed.data.longitude,
        parsed.data.houseSystem,
        { zodiacMode: zm }
      );
      const shadbala = calculateShadbala(
        planets,
        new Date(parsed.data.date + "T" + parsed.data.timeUtc),
        parsed.data.latitude,
        parsed.data.longitude,
        lang
      );

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        shadbala: localizeShadbalaForLang(shadbala, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "shadbalaFailed")));
    }
  });

  // ============================================================
  // ASHTAKAVARGA - SISTEMA DE BINDUS
  // ============================================================
  app.post("/api/v1/ashtakavarga", {
    schema: {
      tags: ["Védico"],
      summary: "Ashtakavarga - Sistema de Bindus",
      description: "Calcula o sistema Ashtakavarga com bindus (pontos) para cada planeta e casa.",
      body: zodToJsonSchema(shadbalaSchema),
      response: { 200: { description: "Análise Ashtakavarga completa" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = shadbalaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const ascendant = await calculateAscendant(
        parsed.data.date,
        parsed.data.timeUtc,
        parsed.data.latitude,
        parsed.data.longitude,
        parsed.data.houseSystem,
        { zodiacMode: zm }
      );
      const ashtakavarga = calculateAshtakavarga(planets, ascendant.sign as ZodiacSign, lang);

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        ashtakavarga: localizeAshtakavargaForLang(ashtakavarga, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "ashtakavargaFailed")));
    }
  });

  // ============================================================
  // PANCHANGA - ALMANAQUE VÉDICO DIÁRIO
  // ============================================================
  app.post("/api/v1/panchanga", {
    schema: {
      tags: ["Védico"],
      summary: "Panchanga - Almanaque Védico",
      description: "Calcula os 5 elementos do dia: Tithi, Vara, Nakshatra, Yoga, Karana.",
      body: zodToJsonSchema(panchangaSchema),
      response: { 200: { description: "Panchanga completo" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = panchangaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets: sunPlanets, coordinateModel } = await calculatePlanets(parsed.data.date, "12:00:00", {
        zodiacMode: zm,
      });
      const sun = sunPlanets.find((p: any) => p.name === "Sol");
      const moon = sunPlanets.find((p: any) => p.name === "Lua" || p.name === "Moon");

      if (!sun || !moon) return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "sunMoonFailed")));

      const panchanga = calculatePanchanga(
        new Date(parsed.data.date),
        sun.longitude,
        moon.longitude,
        parsed.data.latitude,
        parsed.data.longitude,
        lang
      );

      return { generatedAtUtc: nowUtcIsoLocal(), coordinateModel, panchanga };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "panchangaFailed")));
    }
  });

  // ============================================================
  // MUHURTA - ASTROLOGIA ELETIVA
  // ============================================================
  app.post("/api/v1/muhurta", {
    schema: {
      tags: ["Védico"],
      summary: "Muhurta - Astrologia Eletiva",
      description: "Avalia o momento mais auspicioso para iniciar atividades.",
      body: zodToJsonSchema(muhurtaSchema),
      response: { 200: { description: "Avaliação Muhurta" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = muhurtaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets: sunPlanets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const sun = sunPlanets.find((p: any) => p.name === "Sol");
      const moon = sunPlanets.find((p: any) => p.name === "Lua" || p.name === "Moon");
      const ascendant = await calculateAscendant(
        parsed.data.date,
        parsed.data.timeUtc,
        parsed.data.latitude,
        parsed.data.longitude,
        "placidus",
        { zodiacMode: zm }
      );

      if (!sun || !moon) return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "positionsFailed")));

      const muhurta = evaluateMuhurta(
        new Date(parsed.data.date + "T" + parsed.data.timeUtc),
        parsed.data.purpose,
        sun.longitude,
        moon.longitude,
        ascendant.longitude,
        lang
      );

      return { generatedAtUtc: nowUtcIsoLocal(), coordinateModel, muhurta };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "muhurtaFailed")));
    }
  });

  // ============================================================
  // GRAHA YUDDHA - GUERRA PLANETÁRIA
  // ============================================================
  app.post("/api/v1/graha-yuddha", {
    schema: {
      tags: ["Védico"],
      summary: "Graha Yuddha - Guerra Planetária",
      description: "Calcula guerras planetárias quando dois planetas estão no mesmo signo.",
      body: zodToJsonSchema(shadbalaSchema),
      response: { 200: { description: "Guerras planetárias" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = shadbalaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const grahaYuddha = calculateGrahaYuddha(planets, lang);

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        grahaYuddha: localizeGrahaYuddhaRows(grahaYuddha, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "grahaYuddhaFailed")));
    }
  });

  // ============================================================
  // AVASTHAS - ESTADOS PLANETÁRIOS
  // ============================================================
  app.post("/api/v1/avasthas", {
    schema: {
      tags: ["Védico"],
      summary: "Avasthas - Estados Planetários",
      description: "Calcula os estados planetários (Baladi, Jagradadi, Deeptadi).",
      body: zodToJsonSchema(shadbalaSchema),
      response: { 200: { description: "Estados planetários" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = shadbalaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const avasthas = calculateAvasthas(planets, lang);

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        avasthas: localizeAvasthasRows(avasthas, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "avasthasFailed")));
    }
  });

  // ============================================================
  // TARA BALA - COMPATIBILIDADE NAKSHATRA
  // ============================================================
  app.post("/api/v1/tara-bala", {
    schema: {
      tags: ["Védico"],
      summary: "Tara Bala - Compatibilidade Nakshatra",
      description: "Calcula a compatibilidade entre dois nakshatras usando o sistema Tara Bala.",
      body: zodToJsonSchema(taraBalaSchema),
      response: { 200: { description: "Compatibilidade Tara Bala" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = taraBalaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const taraBala = calculateTaraBala(parsed.data.nakshatra1, parsed.data.nakshatra2, lang);

      return { generatedAtUtc: nowUtcIsoLocal(), taraBala };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "taraBalaFailed")));
    }
  });

  // ============================================================
  // GOCHARA - TRÂNSITOS VÉDICOS AVANÇADOS
  // ============================================================
  app.post("/api/v1/gochara", {
    schema: {
      tags: ["Védico"],
      summary: "Gochara - Trânsitos Védicos",
      description: "Calcula trânsitos planetários avançados baseados na Lua natal.",
      body: zodToJsonSchema(gocharaSchema),
      response: { 200: { description: "Trânsitos Gochara" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = gocharaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets: natalPlanets, coordinateModel } = await calculatePlanets(parsed.data.birthDate, parsed.data.birthTimeUtc, {
        zodiacMode: zm,
      });
      const transitDate = parsed.data.transitDate || new Date().toISOString().split("T")[0];
      const { planets: transitPlanets } = await calculatePlanets(transitDate, "12:00:00", { zodiacMode: zm });

      const natalMoon = natalPlanets.find((p: any) => p.name === "Lua" || p.name === "Moon");
      const natalAsc = await calculateAscendant(
        parsed.data.birthDate,
        parsed.data.birthTimeUtc,
        parsed.data.birthLatitude,
        parsed.data.birthLongitude,
        "placidus",
        { zodiacMode: zm }
      );

      if (!natalMoon) return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "moonNotFound")));

      const gochara = calculateGochara(
        transitPlanets,
        natalPlanets,
        natalMoon.sign as ZodiacSign,
        natalAsc.sign as ZodiacSign,
        lang
      );

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        gochara: localizeGocharaRows(gochara, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "gocharaFailed")));
    }
  });

  // ============================================================
  // PRASNA - ASTROLOGIA HORÁRIA
  // ============================================================
  app.post("/api/v1/prasna", {
    schema: {
      tags: ["Védico"],
      summary: "Prasna - Astrologia Horária",
      description: "Responde perguntas específicas baseado no momento da consulta.",
      body: zodToJsonSchema(prasnaSchema),
      response: { 200: { description: "Resposta Prasna" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = prasnaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const now = new Date();
      const zm = parsed.data.zodiacMode ?? "tropical";
      const dateStr = now.toISOString().split("T")[0];
      const timeUtc = now.toISOString().slice(11, 19);
      const { planets, coordinateModel } = await calculatePlanets(dateStr, timeUtc, { zodiacMode: zm });
      const ascendant = await calculateAscendant(
        dateStr,
        timeUtc,
        parsed.data.latitude,
        parsed.data.longitude,
        "placidus",
        { zodiacMode: zm }
      );

      const prasna = calculatePrasna(
        parsed.data.question,
        now,
        parsed.data.latitude,
        parsed.data.longitude,
        planets,
        {
          longitude: ascendant.longitude,
          sign: ascendant.sign as ZodiacSign,
          degree: ascendant.degree,
        },
        lang
      );

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        prasna: localizePrasnaResult(prasna, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "prasnaFailed")));
    }
  });

  // ============================================================
  // DASHA SANDHI - PERÍODOS DE JUNÇÃO
  // ============================================================
  app.post("/api/v1/dasha-sandhi", {
    schema: {
      tags: ["Védico"],
      summary: "Dasha Sandhi - Períodos de Junção",
      description: "Calcula os períodos de transição entre Mahadashas e Antardashas.",
      body: zodToJsonSchema(shadbalaSchema),
      response: { 200: { description: "Períodos Dasha Sandhi" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = shadbalaSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const moon = planets.find((p: any) => p.name === "Lua" || p.name === "Moon");

      if (!moon) return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "moonNotFound")));

      const birthDateTime = new Date(parsed.data.date + "T" + parsed.data.timeUtc);
      const swephDashaSandhi = await import("sweph");
      const jdDateDashaSandhi = swephDashaSandhi.default.utc_to_jd(birthDateTime.getUTCFullYear(), birthDateTime.getUTCMonth() + 1, birthDateTime.getUTCDate(), birthDateTime.getUTCHours(), birthDateTime.getUTCMinutes(), birthDateTime.getUTCSeconds(), 1);
      const birthJdDashaSandhi = jdDateDashaSandhi.data[0] as number;

      const dasha = calculateVimshottariDasha(moon.longitude, birthDateTime);
      const dashaSandhi = calculateDashaSandhi(
        { endDate: new Date(Date.now() + dasha.remainingYears * 365.25 * 24 * 60 * 60 * 1000).toISOString() },
        { endDate: new Date(Date.now() + (dasha.remainingYears / 12) * 365.25 * 24 * 60 * 60 * 1000).toISOString() },
        lang
      );

      return { generatedAtUtc: nowUtcIsoLocal(), coordinateModel, dashaSandhi };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "dashaSandhiFailed")));
    }
  });

  // ============================================================
  // ARGALA E DRISHTI - ASPECTOS VÉDICOS
  // ============================================================
  app.post("/api/v1/argala-drishti", {
    schema: {
      tags: ["Védico"],
      summary: "Argala e Drishti - Aspectos Védicos",
      description: "Calcula Argala (obstruções) e Drishti (aspectos) védicos para uma casa específica.",
      body: zodToJsonSchema(argalaDrishtiSchema),
      response: { 200: { description: "Argala e Drishti" }, 400: { description: "Erro de validação" }, 500: { description: "Erro interno" } },
    },
  }, async (request, reply) => {
    const L = routeLang(request, request.body as { lang?: Language });
    try {
      const parsed = argalaDrishtiSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBodyLocal("VALIDATION_ERROR", vedErr(L, "validationFailed"), parsed.error.flatten()));
      }

      const lang = parsed.data.lang as Language;
      const zm = parsed.data.zodiacMode ?? "tropical";
      const { planets, coordinateModel } = await calculatePlanets(parsed.data.date, parsed.data.timeUtc, {
        zodiacMode: zm,
      });
      const argala = calculateArgala(planets, parsed.data.house, lang);
      const drishti = planets.map((p) => calculateDrishti(p, planets, lang));

      return {
        generatedAtUtc: nowUtcIsoLocal(),
        coordinateModel,
        argala: localizeArgalaResult(argala, lang),
        drishti: localizeDrishtiResults(drishti, lang),
      };
    } catch (e) {
      return reply.code(500).send(errorBodyLocal("CALCULATION_ERROR", vedErr(L, "argalaFailed")));
    }
  });
}
