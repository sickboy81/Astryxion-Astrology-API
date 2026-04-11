import {
  calculateArabicParts,
  calculateFixedStarAspects,
  detectAspectPatterns,
  calculateLunarPhase,
  calculateVoidOfCourseMoon,
  calculateDignities,
  getSignForLongitude,
  getSignDegree,
  getSignDegreeMinutes,
  normalize360,
  angleDiff,
  type PlanetData,
  type AspectData,
} from "../astro-calculations.js";
import { ASPECT_TYPES } from "../lib/astro/constants.js";
import { HouseSystemSchema, toSwephHsys } from "../lib/astro/house-systems.js";
import {
  applySwephEphePath,
  buildHousesIflag,
  buildPlanetCalcFlags,
  resolveSwephEpheFlag,
  withSwephSiderealWork,
  type CoordinateModel,
  type ZodiacMode,
} from "../lib/sweph-zodiac.js";
import { getTranslations, type Language } from "../i18n.js";
import { z } from "zod";

export const NatalChartBodySchema = z.object({
  date: z.string().min(1),
  timeUtc: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  houseSystem: HouseSystemSchema.default("placidus"),
  lang: z.enum(["en", "pt", "es", "hi"]).optional(),
});

export type NatalChartBody = z.infer<typeof NatalChartBodySchema>;

export async function calculateNatalChart(body: NatalChartBody) {
  const sweph = await import("sweph");
  const ephePath = process.env.SWEPH_EPHE_PATH;
  if (ephePath) sweph.set_ephe_path(ephePath);

  const [yearStr, monthStr, dayStr] = body.date.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error("INVALID_DATE");
  }

  const [hourStr, minStr, secStr] = body.timeUtc.split(":");
  const hour = Number(hourStr);
  const minute = Number(minStr);
  const second = Number(secStr ?? "0");
  if (![hour, minute, second].every((n) => Number.isFinite(n))) {
    throw new Error("INVALID_TIME");
  }

  const date = sweph.utc_to_jd(year, month, day, hour, minute, second, sweph.constants.SE_GREG_CAL);
  if (date.flag !== sweph.constants.OK) throw new Error("JD_ERROR");

  const [jdEt, jdUt] = date.data as [number, number];
  const flags = sweph.constants.SEFLG_MOSEPH;

  const planetIds = [
    sweph.constants.SE_SUN,
    sweph.constants.SE_MOON,
    sweph.constants.SE_MERCURY,
    sweph.constants.SE_VENUS,
    sweph.constants.SE_MARS,
    sweph.constants.SE_JUPITER,
    sweph.constants.SE_SATURN,
    sweph.constants.SE_URANUS,
    sweph.constants.SE_NEPTUNE,
    sweph.constants.SE_PLUTO,
    sweph.constants.SE_CHIRON,
    sweph.constants.SE_MEAN_APOG,
    sweph.constants.SE_CERES,
    sweph.constants.SE_PALLAS,
    sweph.constants.SE_JUNO,
    sweph.constants.SE_VESTA,
  ] as const;

  const planetNames: Record<number, string> = {
    [sweph.constants.SE_SUN]: "Sun",
    [sweph.constants.SE_MOON]: "Moon",
    [sweph.constants.SE_MERCURY]: "Mercury",
    [sweph.constants.SE_VENUS]: "Venus",
    [sweph.constants.SE_MARS]: "Mars",
    [sweph.constants.SE_JUPITER]: "Jupiter",
    [sweph.constants.SE_SATURN]: "Saturn",
    [sweph.constants.SE_URANUS]: "Uranus",
    [sweph.constants.SE_NEPTUNE]: "Neptune",
    [sweph.constants.SE_PLUTO]: "Pluto",
    [sweph.constants.SE_CHIRON]: "Chiron",
    [sweph.constants.SE_MEAN_APOG]: "Lilith",
    [sweph.constants.SE_CERES]: "Ceres",
    [sweph.constants.SE_PALLAS]: "Pallas",
    [sweph.constants.SE_JUNO]: "Juno",
    [sweph.constants.SE_VESTA]: "Vesta",
  };

  const houseSystemChar = toSwephHsys(body.houseSystem);
  const housesResult = sweph.houses_ex2(jdUt, 0, body.latitude, body.longitude, houseSystemChar);
  if (housesResult.flag !== sweph.constants.OK) throw new Error("HOUSES_ERROR");

  const points = housesResult.data.points as unknown as number[];
  const housesRaw = housesResult.data.houses as unknown as number[] | Record<string, number>;
  const cusps = Array.isArray(housesRaw)
    ? housesRaw.slice(0, 12)
    : Array.from({ length: 12 }, (_, i) => (housesRaw as Record<string, number>)[`house_${i + 1}`] ?? 0);

  const ascendant = points[0] ?? 0;
  const midheaven = points[1] ?? 0;

  function houseOfLongitude(lon: number) {
    const x = normalize360(lon);
    const cusp = cusps.map(normalize360);
    for (let i = 0; i < 12; i++) {
        const start = cusp[i]!;
        const end = cusp[(i + 1) % 12]!;
        if (start <= end) {
            if (x >= start && x < end) return i + 1;
        } else {
            if (x >= start || x < end) return i + 1;
        }
    }
    return 1;
  }

  const planets: PlanetData[] = planetIds.flatMap((id) => {
    const r = sweph.calc_ut(jdEt, id, flags);
    if (r.flag === sweph.constants.ERR) return [];
    const [lon, lat, dist, speedLon] = r.data as unknown as number[];
    return {
      id,
      name: planetNames[id] ?? String(id),
      longitude: lon,
      latitude: lat,
      distanceAu: dist,
      speedLongitude: speedLon,
      sign: getSignForLongitude(lon),
      degree: Math.floor(getSignDegree(lon)),
      minutes: getSignDegreeMinutes(lon),
      house: houseOfLongitude(lon),
      retrograde: speedLon < 0,
    };
  });

  const nodeResult = sweph.calc_ut(jdEt, sweph.constants.SE_TRUE_NODE, flags);
  const nodeLon = nodeResult.flag === sweph.constants.ERR ? null : (nodeResult.data[0] as number);

  const sunPon = planets.find((p) => p.id === sweph.constants.SE_SUN)!;
  const isDayChart = sunPon.house >= 7 && sunPon.house <= 12;

  const moonLon = planets.find((p) => p.id === sweph.constants.SE_MOON)!.longitude;
  const fortuna = normalize360(isDayChart ? ascendant + moonLon - sunPon.longitude : ascendant - moonLon + sunPon.longitude);

  const venusLon = planets.find((p) => p.id === sweph.constants.SE_VENUS)!.longitude;
  const mercuryLon = planets.find((p) => p.id === sweph.constants.SE_MERCURY)!.longitude;
  const marsLon = planets.find((p) => p.id === sweph.constants.SE_MARS)!.longitude;
  const jupiterLon = planets.find((p) => p.id === sweph.constants.SE_JUPITER)!.longitude;
  const saturnLon = planets.find((p) => p.id === sweph.constants.SE_SATURN)!.longitude;
  const uranusLon = planets.find((p) => p.id === sweph.constants.SE_URANUS)!.longitude;
  const neptuneLon = planets.find((p) => p.id === sweph.constants.SE_NEPTUNE)!.longitude;
  const plutoLon = planets.find((p) => p.id === sweph.constants.SE_PLUTO)!.longitude;

  const arabicParts = calculateArabicParts(
    ascendant,
    { sun: sunPon.longitude, moon: moonLon, mercury: mercuryLon, venus: venusLon, mars: marsLon, jupiter: jupiterLon, saturn: saturnLon, uranus: uranusLon, neptune: neptuneLon, pluto: plutoLon },
    isDayChart
  );

  const aspects: AspectData[] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i]!;
      const p2 = planets[j]!;
      const sep = angleDiff(p1.longitude, p2.longitude);
      for (const asp of ASPECT_TYPES) {
        const orb = Math.abs(sep - asp.angle);
        if (orb <= asp.orb) {
          aspects.push({
            a: p1.name,
            b: p2.name,
            type: asp.name,
            symbol: asp.symbol,
            exactAngle: asp.angle,
            orb,
            separation: sep,
            applying: p1.speedLongitude > p2.speedLongitude,
          });
          break;
        }
      }
    }
  }

  const lang: Language =
    body.lang && ["en", "pt", "es", "hi"].includes(body.lang) ? (body.lang as Language) : "en";
  const tr = getTranslations(lang);
  const aspectPatternsRaw = detectAspectPatterns(aspects, planets);
  const aspectPatterns = aspectPatternsRaw.map((p) => ({
    ...p,
    description:
      p.patternKey && p.patternKey in tr.aspectPatterns
        ? tr.aspectPatterns[p.patternKey as keyof typeof tr.aspectPatterns]
        : p.description,
  }));
  const fixedStarAspects = calculateFixedStarAspects(planets);
  const dignities = calculateDignities(planets);
  const lunarPhase = calculateLunarPhase(jdEt);
  const moonPlanet = planets.find((p) => p.id === sweph.constants.SE_MOON)!;
  const voidOfCourseMoon = calculateVoidOfCourseMoon(
    moonLon, Math.abs(moonPlanet.speedLongitude), planets
  );

  const southNode = nodeLon !== null ? normalize360(nodeLon + 180) : null;

  return {
    input: {
      date: body.date,
      timeUtc: body.timeUtc,
      latitude: body.latitude,
      longitude: body.longitude,
      houseSystem: body.houseSystem,
    },
    jdEt,
    jdUt,
    angles: {
      ascendant,
      midheaven,
      lunarNode: nodeLon,
      southNode,
      partOfFortune: fortuna,
    },
    houses: { cusps },
    planets,
    aspects,
    arabicParts,
    aspectPatterns,
    fixedStarAspects,
    dignities,
    lunarPhase,
    voidOfCourseMoon,
    isDayChart,
  };
}

export type CalculatePlanetsResult = { planets: any[]; coordinateModel: CoordinateModel };

const VEDIC_PLANET_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 13, 1001, 1002, 1003, 1004] as const;
const VEDIC_PLANET_NAMES: Record<number, string> = {
  0: "Sol",
  1: "Lua",
  2: "Mercúrio",
  3: "Vênus",
  4: "Marte",
  5: "Júpiter",
  6: "Saturno",
  7: "Urano",
  8: "Netuno",
  9: "Plutão",
  15: "Quíron",
  13: "Lilith",
  1001: "Ceres",
  1002: "Palas",
  1003: "Juno",
  1004: "Vesta",
};

function normalizeHouseCusps(
  housesRaw: number[] | Record<string, number>
): number[] {
  if (Array.isArray(housesRaw)) return housesRaw.slice(0, 12);
  return Array.from({ length: 12 }, (_, i) => (housesRaw as Record<string, number>)[`house_${i + 1}`] ?? 0);
}

export async function calculatePlanets(
  date: string,
  timeUtc: string,
  opts?: { zodiacMode?: ZodiacMode }
): Promise<CalculatePlanetsResult> {
  const zodiacMode: ZodiacMode = opts?.zodiacMode ?? "tropical";
  const sweph = await import("sweph");
  applySwephEphePath(sweph);
  const [yearStr, monthStr, dayStr] = date.split("-");
  const [hourStr, minStr, secStr] = timeUtc.split(":");
  const year = Number(yearStr),
    month = Number(monthStr),
    day = Number(dayStr);
  const hour = Number(hourStr),
    min = Number(minStr),
    sec = Number(secStr || "0");
  const jdDate = sweph.utc_to_jd(year, month, day, hour, min, sec, sweph.constants.SE_GREG_CAL);
  if (jdDate.flag !== sweph.constants.OK) {
    return { planets: [], coordinateModel: { zodiacMode: "tropical" } };
  }
  const jdEt = jdDate.data[0] as number;
  const jdUt = jdDate.data[1] as number;

  const pushPlanets = (flags: number) => {
    const planets: any[] = [];
    for (let i = 0; i < VEDIC_PLANET_IDS.length; i++) {
      const id = VEDIC_PLANET_IDS[i]!;
      const result = sweph.calc_ut(jdEt, id, flags);
      if (result.flag !== sweph.constants.ERR && !result.error) {
        const [lon, lat, dist, speedLon] = result.data as unknown as number[];
        planets.push({
          name: VEDIC_PLANET_NAMES[id] ?? String(id),
          longitude: lon,
          latitude: lat,
          distanceAu: dist,
          speedLongitude: speedLon,
          sign: getSignForLongitude(lon),
          degree: Math.floor(getSignDegree(lon)),
          house: 1,
          retrograde: speedLon < 0,
        });
      }
    }
    return planets;
  };

  if (zodiacMode === "tropical") {
    const flags = sweph.constants.SEFLG_MOSEPH;
    return {
      planets: pushPlanets(flags),
      coordinateModel: { zodiacMode: "tropical" },
    };
  }

  return withSwephSiderealWork(async () => {
    applySwephEphePath(sweph);
    sweph.set_sid_mode(sweph.constants.SE_SIDM_LAHIRI, 0, 0);
    const flags = buildPlanetCalcFlags(sweph, "sidereal_lahiri");
    const planets = pushPlanets(flags);
    const ephe = resolveSwephEpheFlag(sweph);
    const ayanRes = sweph.get_ayanamsa_ex_ut(jdUt, ephe);
    const ayan =
      ayanRes.flag === sweph.constants.OK && typeof ayanRes.data === "number"
        ? Math.round(ayanRes.data * 1e6) / 1e6
        : 0;
    return {
      planets,
      coordinateModel: {
        zodiacMode: "sidereal_lahiri",
        ayanamsaName: "Lahiri",
        ayanamsaDegrees: ayan,
      },
    };
  });
}

export type CalculateAscendantResult = {
  longitude: number;
  sign: string;
  degree: number;
  cusps: number[];
  coordinateModel: CoordinateModel;
};

export async function calculateAscendant(
  date: string,
  timeUtc: string,
  latitude: number,
  longitude: number,
  houseSystem: string = "placidus",
  opts?: { zodiacMode?: ZodiacMode }
): Promise<CalculateAscendantResult> {
  const zodiacMode: ZodiacMode = opts?.zodiacMode ?? "tropical";
  const sweph = await import("sweph");
  applySwephEphePath(sweph);
  const [yearStr, monthStr, dayStr] = date.split("-");
  const [hourStr, minStr, secStr] = timeUtc.split(":");
  const year = Number(yearStr),
    month = Number(monthStr),
    day = Number(dayStr);
  const hour = Number(hourStr),
    min = Number(minStr),
    sec = Number(secStr || "0");
  const jdDate = sweph.utc_to_jd(year, month, day, hour, min, sec, sweph.constants.SE_GREG_CAL);
  const fail = (): CalculateAscendantResult => ({
    longitude: 0,
    sign: "Áries",
    degree: 0,
    cusps: [],
    coordinateModel: { zodiacMode: "tropical" },
  });
  if (jdDate.flag !== sweph.constants.OK) return fail();

  const jdUt = jdDate.data[1] as number;
  const houseSystemChar = toSwephHsys(houseSystem);

  const buildReturn = (
    housesResult: { flag: number; data: { houses: unknown; points: unknown } },
    coordinateModel: CoordinateModel
  ): CalculateAscendantResult => {
    if (housesResult.flag !== sweph.constants.OK) return fail();
    const cusps = normalizeHouseCusps(housesResult.data.houses as number[] | Record<string, number>);
    const ascendantLongitude = (housesResult.data.points as unknown as number[])[0] || 0;
    return {
      longitude: ascendantLongitude,
      sign: getSignForLongitude(ascendantLongitude),
      degree: Math.floor(getSignDegree(ascendantLongitude)),
      cusps,
      coordinateModel,
    };
  };

  if (zodiacMode === "tropical") {
    const housesResult = sweph.houses_ex2(jdUt, 0, latitude, longitude, houseSystemChar);
    return buildReturn(housesResult, { zodiacMode: "tropical" });
  }

  return withSwephSiderealWork(async () => {
    applySwephEphePath(sweph);
    sweph.set_sid_mode(sweph.constants.SE_SIDM_LAHIRI, 0, 0);
    const iflag = buildHousesIflag(sweph, "sidereal_lahiri");
    const housesResult = sweph.houses_ex2(jdUt, iflag, latitude, longitude, houseSystemChar);
    const ephe = resolveSwephEpheFlag(sweph);
    const ayanRes = sweph.get_ayanamsa_ex_ut(jdUt, ephe);
    const ayan =
      ayanRes.flag === sweph.constants.OK && typeof ayanRes.data === "number"
        ? Math.round(ayanRes.data * 1e6) / 1e6
        : 0;
    return buildReturn(housesResult, {
      zodiacMode: "sidereal_lahiri",
      ayanamsaName: "Lahiri",
      ayanamsaDegrees: ayan,
    });
  });
}
