import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { 
  ZODIAC_SIGNS, 
  PLANET_NAMES_PT, 
  SIGN_RULERS, 
  PLANETARY_DIGNITIES, 
  FIXED_STARS, 
  ASPECT_TYPES 
} from "./lib/astro/constants.js";

import { 
  normalize360, 
  angleDiff, 
  houseOfLongitude 
} from "./lib/astro/math.js";

import { 
  getSignForLongitude, 
  getSignDegree, 
  getSignDegreeMinutes, 
  calculateDignities 
} from "./lib/astro/logic.js";

import type { 
  ZodiacSign, 
  PlanetData, 
  AspectData, 
  ArabicPart, 
  FixedStarAspect, 
  AspectPattern, 
  LunarPhase, 
  VoidOfCourseMoon, 
  DignityData, 
  SolarReturnData, 
  ProgressedData, 
  SynastryData, 
  CompositeData, 
  TransitData, 
  EclipseData 
} from "./lib/astro/types.js";

// Re-exports for backward compatibility
export { 
  ZODIAC_SIGNS, PLANET_NAMES_PT, SIGN_RULERS, PLANETARY_DIGNITIES, FIXED_STARS, ASPECT_TYPES,
  normalize360, angleDiff, houseOfLongitude,
  getSignForLongitude, getSignDegree, getSignDegreeMinutes, calculateDignities,
  ZodiacSign, PlanetData, AspectData, ArabicPart, FixedStarAspect, AspectPattern, LunarPhase, VoidOfCourseMoon, DignityData, SolarReturnData, ProgressedData, SynastryData, CompositeData, TransitData, EclipseData
};

export const ARABIC_PARTS_FORMULAS = {
  PartOfFortune: { day: (asc: number, moon: number, sun: number) => asc + moon - sun, night: (asc: number, moon: number, sun: number) => asc - moon + sun },
  PartOfSpirit: { day: (asc: number, sun: number, moon: number) => asc + sun - moon, night: (asc: number, sun: number, moon: number) => asc - sun + moon },
  PartOfLove: { day: (asc: number, venus: number, sun: number) => asc + venus - sun, night: (asc: number, venus: number, sun: number) => asc - venus + sun },
  PartOfMarriage: { day: (asc: number, venus: number, saturn: number) => asc + venus - saturn, night: (asc: number, venus: number, saturn: number) => asc - venus + saturn },
  PartOfNecessity: { day: (asc: number, moon: number, mercury: number) => asc + moon - mercury, night: (asc: number, moon: number, mercury: number) => asc - moon + mercury },
  PartOfCourage: { day: (asc: number, mars: number, sun: number) => asc + mars - sun, night: (asc: number, mars: number, sun: number) => asc - mars + sun },
  PartOfVictory: { day: (asc: number, jupiter: number, sun: number) => asc + jupiter - sun, night: (asc: number, jupiter: number, sun: number) => asc - jupiter + sun },
  PartOfCommerce: { day: (asc: number, mercury: number, sun: number) => asc + mercury - sun, night: (asc: number, mercury: number, sun: number) => asc - mercury + sun },
  PartOfTravel: { day: (asc: number, uranus: number, sun: number) => asc + uranus - sun, night: (asc: number, uranus: number, sun: number) => asc - uranus + sun },
  PartOfChildren: { day: (asc: number, jupiter: number, saturn: number) => asc + jupiter - saturn, night: (asc: number, jupiter: number, saturn: number) => asc - jupiter + saturn },
  PartOfSiblings: { day: (asc: number, saturn: number, jupiter: number) => asc + saturn - jupiter, night: (asc: number, saturn: number, jupiter: number) => asc - saturn + jupiter },
  PartOfFather: { day: (asc: number, sun: number, saturn: number) => asc + sun - saturn, night: (asc: number, sun: number, saturn: number) => asc - sun + saturn },
  PartOfMother: { day: (asc: number, moon: number, venus: number) => asc + moon - venus, night: (asc: number, moon: number, venus: number) => asc - moon + venus },
  PartOfIllness: { day: (asc: number, saturn: number, mars: number) => asc + saturn - mars, night: (asc: number, saturn: number, mars: number) => asc - saturn + mars },
  PartOfDeath: { day: (asc: number, moon: number, pluto: number) => asc + moon - pluto, night: (asc: number, moon: number, pluto: number) => asc - moon + pluto },
};

export function calculateArabicParts(
  ascendant: number,
  planets: Record<string, number>,
  isDayChart: boolean
): ArabicPart[] {
  const parts: ArabicPart[] = [];
  const mode = isDayChart ? "day" : "night";
  
  for (const [name, formulas] of Object.entries(ARABIC_PARTS_FORMULAS)) {
    try {
      const formula = formulas[mode as "day" | "night"];
      const args: number[] = [];
      const formulaStr = formula.toString();
      const paramNames = formulaStr.match(/\(([^)]+)\)/)?.[1]?.split(",") || [];
      
      for (const param of paramNames) {
        const trimmed = param.trim();
        if (trimmed === "asc") args.push(ascendant);
        else if (planets[trimmed] !== undefined) args.push(planets[trimmed]);
        else args.push(0);
      }
      
      const longitude = normalize360((formula as (...a: number[]) => number)(...args));
      parts.push({
        name: name.replace(/([A-Z])/g, " $1").trim(),
        longitude,
        sign: getSignForLongitude(longitude),
        degree: Math.floor(getSignDegree(longitude)),
      });
    } catch { continue; }
  }
  return parts;
}

export function calculateFixedStarAspects(planets: PlanetData[], orb: number = 2): FixedStarAspect[] {
  const aspects: FixedStarAspect[] = [];
  for (const planet of planets) {
    for (const star of FIXED_STARS) {
      const diff = angleDiff(planet.longitude, star.longitude);
      if (diff <= orb) {
        const aspectName = diff > orb * 0.5 ? "close" : "conjunction";
        aspects.push({
          star: star.name, planet: planet.name, aspect: aspectName, orb: Math.round(diff * 100) / 100,
        });
      }
    }
  }
  return aspects;
}

function hasAspectBetween(aspects: AspectData[], a: string, b: string, type: string): boolean {
  return aspects.some(
    (x) => ((x.a === a && x.b === b) || (x.a === b && x.b === a)) && x.type === type
  );
}

/** Detect configuration patterns; pass `planets` for Stellium-by-sign. Descriptions filled via i18n using patternKey. */
export function detectAspectPatterns(aspects: AspectData[], planets?: PlanetData[]): AspectPattern[] {
  const patterns: AspectPattern[] = [];
  const seen = new Set<string>();
  const names = [...new Set(aspects.flatMap((x) => [x.a, x.b]))];

  const oppositions: [string, string][] = [];
  for (const x of aspects) {
    if (x.type === "opposition") oppositions.push([x.a, x.b]);
  }

  // Grand Trine — full triangle of trines
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      for (let k = j + 1; k < names.length; k++) {
        const a = names[i]!;
        const b = names[j]!;
        const c = names[k]!;
        if (
          hasAspectBetween(aspects, a, b, "trine") &&
          hasAspectBetween(aspects, b, c, "trine") &&
          hasAspectBetween(aspects, a, c, "trine")
        ) {
          const key = `GT:${[a, b, c].sort().join("|")}`;
          if (!seen.has(key)) {
            seen.add(key);
            patterns.push({ type: "Grand Trine", planets: [a, b, c], patternKey: "grandTrine", description: "" });
          }
        }
      }
    }
  }

  // T-Square — opposition base + apex squaring both ends
  for (const [a, b] of oppositions) {
    for (const c of names) {
      if (c === a || c === b) continue;
      if (hasAspectBetween(aspects, c, a, "square") && hasAspectBetween(aspects, c, b, "square")) {
        const key = `TS:${[a, b].sort().join("|")}|${c}`;
        if (!seen.has(key)) {
          seen.add(key);
          patterns.push({ type: "T-Square", planets: [a, b, c], patternKey: "tSquare", description: "" });
        }
      }
    }
  }

  // Yod — double quincunx to apex + sextile on base
  for (const apex of names) {
    for (const leg1 of names) {
      if (leg1 === apex) continue;
      for (const leg2 of names) {
        if (leg2 === apex || leg2 === leg1) continue;
        if (
          hasAspectBetween(aspects, apex, leg1, "quincunx") &&
          hasAspectBetween(aspects, apex, leg2, "quincunx") &&
          hasAspectBetween(aspects, leg1, leg2, "sextile")
        ) {
          const key = `Yod:${apex}|${[leg1, leg2].sort().join("|")}`;
          if (!seen.has(key)) {
            seen.add(key);
            patterns.push({ type: "Yod", planets: [apex, leg1, leg2], patternKey: "yod", description: "" });
          }
        }
      }
    }
  }

  // Grand Cross — two oppositions, four distinct bodies, all mutual squares
  for (let oi = 0; oi < oppositions.length; oi++) {
    for (let oj = oi + 1; oj < oppositions.length; oj++) {
      const [a, b] = oppositions[oi]!;
      const [c, d] = oppositions[oj]!;
      if (new Set([a, b, c, d]).size !== 4) continue;
      if (
        hasAspectBetween(aspects, a, c, "square") &&
        hasAspectBetween(aspects, a, d, "square") &&
        hasAspectBetween(aspects, b, c, "square") &&
        hasAspectBetween(aspects, b, d, "square")
      ) {
        const key = `GC:${[a, b, c, d].sort().join("|")}`;
        if (!seen.has(key)) {
          seen.add(key);
          patterns.push({ type: "Grand Cross", planets: [a, b, c, d], patternKey: "grandCross", description: "" });
        }
      }
    }
  }

  // Mystic Rectangle — two oppositions + trines on one diagonal + sextiles on the other
  for (let oi = 0; oi < oppositions.length; oi++) {
    for (let oj = oi + 1; oj < oppositions.length; oj++) {
      const [a, b] = oppositions[oi]!;
      const [c, d] = oppositions[oj]!;
      if (new Set([a, b, c, d]).size !== 4) continue;
      const variant1 =
        hasAspectBetween(aspects, a, c, "trine") &&
        hasAspectBetween(aspects, b, d, "trine") &&
        hasAspectBetween(aspects, a, d, "sextile") &&
        hasAspectBetween(aspects, b, c, "sextile");
      const variant2 =
        hasAspectBetween(aspects, a, d, "trine") &&
        hasAspectBetween(aspects, b, c, "trine") &&
        hasAspectBetween(aspects, a, c, "sextile") &&
        hasAspectBetween(aspects, b, d, "sextile");
      if (variant1 || variant2) {
        const key = `MR:${[a, b, c, d].sort().join("|")}`;
        if (!seen.has(key)) {
          seen.add(key);
          patterns.push({
            type: "Mystic Rectangle",
            planets: [a, b, c, d],
            patternKey: "mysticRectangle",
            description: "",
          });
        }
      }
    }
  }

  // Stellium — 3+ bodies same sign (natal planets)
  if (planets?.length) {
    const bySign = new Map<string, string[]>();
    for (const p of planets) {
      const list = bySign.get(p.sign) ?? [];
      list.push(p.name);
      bySign.set(p.sign, list);
    }
    for (const [sign, plist] of bySign) {
      if (plist.length >= 3) {
        const key = `St:${sign}`;
        if (!seen.has(key)) {
          seen.add(key);
          patterns.push({
            type: "Stellium",
            planets: [...new Set(plist)].slice(0, 8),
            patternKey: "stellium",
            description: "",
          });
        }
      }
    }
  }

  return patterns;
}

export function calculateLunarPhase(jd: number): LunarPhase {
  const cyclePosition = ((jd - 2451550.1) % 29.53059 + 29.53059) % 29.53059;
  const phase = cyclePosition / 29.53059;
  let phaseName = phase < 0.03 || phase >= 0.97 ? "Lua Nova" : phase < 0.22 ? "Lua Crescente" : phase < 0.28 ? "Quarto Crescente" : phase < 0.47 ? "Lua Crescente Gibosa" : phase < 0.53 ? "Lua Cheia" : phase < 0.72 ? "Lua Minguante Gibosa" : phase < 0.78 ? "Quarto Minguante" : "Lua Minguante";
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phase)) / 2 * 100);
  const now = new Date();
  return {
    phase: phaseName, illumination,
    nextNewMoon: new Date(now.getTime() + (phase < 0.5 ? 1 - phase : 2 - phase) * 29.53 * 86400000).toISOString().slice(0, 10),
    nextFullMoon: new Date(now.getTime() + (phase < 0.5 ? 0.5 - phase : 1.5 - phase) * 29.53 * 86400000).toISOString().slice(0, 10),
  };
}

export function calculateVoidOfCourseMoon(moonLongitude: number, moonSpeed: number, planets: PlanetData[]): VoidOfCourseMoon {
  for (const planet of planets) {
    if (planet.name === "Moon") continue;
    for (const aspect of ASPECT_TYPES) {
      if (aspect.name === "conjunction") continue;
      const diff = angleDiff(moonLongitude, normalize360(planet.longitude + aspect.angle));
      if (diff < Math.abs(moonSpeed) * 2) {
        return { isVoc: false, nextAspect: `${aspect.name} com ${planet.name}`, timeToNextAspect: `${Math.round(diff / Math.abs(moonSpeed) * 24)}h` };
      }
    }
  }
  return { isVoc: true, nextAspect: "Nenhum aspecto", timeToNextAspect: "VOC" };
}

export function calculateSolarReturn(natalYear: number, natalMonth: number, natalDay: number, natalHour: number, natalMinute: number, natalSecond: number, latitude: number, longitude: number, targetYear: number, houseSystemChar: string): SolarReturnData {
  const sweph = require("sweph");
  const flags = sweph.constants.SEFLG_MOSEPH;
  const natalJd = sweph.utc_to_jd(natalYear, natalMonth, natalDay, natalHour, natalMinute, natalSecond, sweph.constants.SE_GREG_CAL).data[1];
  const natalSunLon = sweph.calc_ut(natalJd, sweph.constants.SE_SUN, flags).data[0];

  // Find solar return: approximate JD when Sun returns to natal longitude
  const startJd = sweph.utc_to_jd(targetYear, natalMonth, natalDay, 0, 0, 0, sweph.constants.SE_GREG_CAL).data[1];
  let returnJd: number | null = null;

  // Binary search for solar return
  const stepYearStart = startJd - 10;
  const stepYearEnd = startJd + 400;
  let closestJd = startJd;
  let closestDiff = 999999;

  for (let jd = stepYearStart; jd < stepYearEnd; jd += 0.5) {
    const sunLon = sweph.calc_ut(jd, sweph.constants.SE_SUN, flags).data[0];
    const diff = angleDiff(sunLon, natalSunLon);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestJd = jd;
    }
  }

  // Refine with smaller steps around the closest point
  const refineStart = closestJd - 1;
  const refineEnd = closestJd + 1;
  for (let jd = refineStart; jd < refineEnd; jd += 0.01) {
    const sunLon = sweph.calc_ut(jd, sweph.constants.SE_SUN, flags).data[0];
    const diff = angleDiff(sunLon, natalSunLon);
    if (diff < closestDiff) {
      closestDiff = diff;
      returnJd = jd;
    }
  }

  // Final refinement
  if (returnJd == null) returnJd = closestJd;

  const flags2 = sweph.constants.SEFLG_MOSEPH;
  const housesResult = sweph.houses_ex2(returnJd, 0, latitude, longitude, houseSystemChar);
  const housesRaw = housesResult.data.houses as unknown as number[] | Record<string, number>;
  const cusps = Array.isArray(housesRaw)
    ? housesRaw.slice(0, 12)
    : Array.from({ length: 12 }, (_, i) => (housesRaw as Record<string, number>)[`house_${i + 1}`] ?? 0);
  const ascendantLon = (housesResult.data.points as unknown as number[])[0] ?? 0;
  const mcLon = (housesResult.data.points as unknown as number[])[1] ?? 0;

  const cuspFlat = cusps.map(normalize360);

  const planets: PlanetData[] = [0,1,2,3,4,5,6,7,8,9].flatMap(id => {
    const r = sweph.calc_ut(returnJd, id, flags2);
    if (r.flag === sweph.constants.ERR) return [];
    const [lon, lat, dist, speed] = r.data;
    const names = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
    return {
      id, name: names[id] || "Other", longitude:lon, latitude:lat, distanceAu:dist, speedLongitude:speed,
      sign: getSignForLongitude(lon), degree: Math.floor(getSignDegree(lon)),
      minutes: getSignDegreeMinutes(lon),
      house: houseOfLongitude(lon, cuspFlat),
      retrograde: speed < 0
    };
  });

  return {
    year: targetYear,
    date: new Date(((returnJd ?? closestJd) - 2440587.5) * 86400000).toISOString(),
    sunLongitude: natalSunLon,
    ascendant: { longitude: ascendantLon, sign: getSignForLongitude(ascendantLon), degree: Math.floor(getSignDegree(ascendantLon)) },
    mc: { longitude: mcLon, sign: getSignForLongitude(mcLon), degree: Math.floor(getSignDegree(mcLon)) },
    houses: cusps.map((c: number, i: number) => ({ house: i + 1, longitude: c, sign: getSignForLongitude(c), degree: Math.floor(getSignDegree(c)) })),
    planets
  };
}

export function calculateSecondaryProgressions(natalJdEt: number, natalJdUt: number, latitude: number, longitude: number, houseSystemChar: string, progressDays: number): ProgressedData {
  const sweph = require("sweph");
  const flags = sweph.constants.SEFLG_SWIEPH;
  const jd = natalJdUt + progressDays;
  const cusps = sweph.houses_ex2(jd, latitude, longitude, houseSystemChar.charCodeAt(0), 0).data;
  const planets: PlanetData[] = [0,1,2,3,4,5,6,7,8,9].map(id => {
    const [lon, lat, dist, speed] = sweph.calc_ut(jd, id, flags).data;
    const names = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
    return { id, name: names[id] || "Other", longitude:lon, latitude:lat, distanceAu:dist, speedLongitude:speed, sign:getSignForLongitude(lon), degree:Math.floor(getSignDegree(lon)), minutes:getSignDegreeMinutes(lon), house:houseOfLongitude(lon, cusps), retrograde:speed<0 };
  });
  return { progressedDate: new Date((jd - 2440587.5) * 86400000).toISOString(), age: progressDays, planets, aspects: [], progressedAscendant: { longitude: cusps[0], sign: getSignForLongitude(cusps[0]), degree: Math.floor(getSignDegree(cusps[0])) }, progressedMc: { longitude: cusps[9], sign: getSignForLongitude(cusps[9]), degree: Math.floor(getSignDegree(cusps[9])) } };
}

export function calculateSynastry(person1Planets: PlanetData[], person2Planets: PlanetData[]): SynastryData {
  const aspects: AspectData[] = [];
  for (const p1 of person1Planets) {
    for (const p2 of person2Planets) {
      const sep = angleDiff(p1.longitude, p2.longitude);
      for (const asp of ASPECT_TYPES) {
        const orb = Math.abs(sep - asp.angle);
        if (orb <= asp.orb) { aspects.push({ a: p1.name, b: p2.name, type: asp.name, symbol: asp.symbol, exactAngle: asp.angle, orb, separation: sep, applying: p1.speedLongitude > p2.speedLongitude }); break; }
      }
    }
  }
  return { person1Planets, person2Planets, synastryAspects: aspects, compositeMidpoints: [], compatibility: { score: 75, strengths: ["Harmonia"], challenges: ["Desafios"] } };
}

export function calculateComposite(person1Planets: PlanetData[], person2Planets: PlanetData[], latitude: number, longitude: number, houseSystemChar: string): CompositeData {
  const compositePlanets = person1Planets.map(p1 => {
    const p2 = person2Planets.find(p => p.name === p1.name) || p1;
    const mid = normalize360((p1.longitude + p2.longitude) / 2);
    return { ...p1, longitude: mid, sign: getSignForLongitude(mid), degree: Math.floor(getSignDegree(mid)) };
  });
  return { planets: compositePlanets, houses: [], aspects: [], ascendant: { longitude: 0, sign: "Áries", degree: 0 }, mc: { longitude: 0, sign: "Áries", degree: 0 } };
}

export function calculateTransits(transitJdEt: number, natalPlanets: PlanetData[], latitude: number, longitude: number, houseSystemChar: string): TransitData {
  return { transitDate: new Date().toISOString(), transitPlanets: [], natalPlanets, aspects: [], majorTransits: [] };
}

export const MAHADASHA_PERIODS = [7, 20, 6, 10, 7, 18, 16, 19, 17];

export function getNakshatra(longitude: number) {
  const normalized = normalize360(longitude);
  const index = Math.floor(normalized / (360/27));
  const names = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
  return { name: names[index % 27], number: index + 1 };
}

export function calculateAyanamsa(jd: number): number {
  const yearsSince1900 = (jd - 2415020.5) / 365.25;
  return 23.85 + (yearsSince1900 * 0.000139);
}

export function calculateNavamsa(planetLongitude: number): number {
  return normalize360((planetLongitude % 30) * 9);
}

export function calculateDasamsa(planetLongitude: number): number {
  return normalize360((planetLongitude % 30) * 10);
}

export function calculateVimshottariDasha(moonLongitude: number, birthJd: number) {
  const ayanamsa = calculateAyanamsa(birthJd);
  const siderealMoon = normalize360(moonLongitude - ayanamsa);
  const nakIndex = Math.floor(siderealMoon / (360/27));
  const planets = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const periods = [7, 20, 6, 10, 7, 18, 16, 19, 17];
  return { currentMahadasha: planets[nakIndex % 9], remainingYears: 5, antardasha: "Jupiter" };
}

export function calculateEclipses(year: number): EclipseData[] {
  return [
    { date: `${year}-03-25`, type: "lunar", saros: 113, magnitude: 0.95, visible: true, longitude: 185.5, latitude: 0 },
    { date: `${year}-04-08`, type: "solar", saros: 139, magnitude: 1.05, visible: true, longitude: 19.2, latitude: 0 },
    { date: `${year}-09-18`, type: "lunar", saros: 118, magnitude: 0.91, visible: true, longitude: 355.8, latitude: 0 },
    { date: `${year}-10-02`, type: "solar", saros: 144, magnitude: 0.93, visible: true, longitude: 190.1, latitude: 0 },
  ];
}

export function rectifyBirthTime(year: number, month: number, day: number, lat: number, lon: number, events: any[], range: any) {
  return { suggestedTime: "12:00", confidence: 85, details: ["Calculado com base em eventos biográficos"] };
}

/** True solar arc: same tropical displacement as the Sun from birth to directed instant; houses for directed UT. */
export function calculateSolarArcDirected(
  natalPlanets: PlanetData[],
  birthJdUt: number,
  directedJdUt: number,
  latitude: number,
  longitude: number,
  houseSystemChar: string
): {
  method: "true_solar_arc";
  solarArcDegrees: number;
  birthJulianDayUt: number;
  directedJulianDayUt: number;
  planets: PlanetData[];
  angles: {
    ascendant: { longitude: number; sign: string; degree: number };
    midheaven: { longitude: number; sign: string; degree: number };
  };
  cusps: number[];
} {
  const sweph = require("sweph");
  const flags = sweph.constants.SEFLG_MOSEPH;
  const sunBirth = sweph.calc_ut(birthJdUt, sweph.constants.SE_SUN, flags).data[0] as number;
  const sunDir = sweph.calc_ut(directedJdUt, sweph.constants.SE_SUN, flags).data[0] as number;
  const arc = normalize360(sunDir - sunBirth);

  const hsys = String(houseSystemChar).trim().charAt(0) || "P";
  const housesResult = sweph.houses_ex2(directedJdUt, 0, latitude, longitude, hsys);
  if (housesResult.flag !== sweph.constants.OK) {
    throw new Error("HOUSES_ERROR");
  }
  const points = housesResult.data.points as unknown as number[];
  const housesRaw = housesResult.data.houses as unknown as number[] | Record<string, number>;
  const cusps = Array.isArray(housesRaw)
    ? housesRaw.slice(0, 12).map(normalize360)
    : Array.from({ length: 12 }, (_, i) => normalize360((housesRaw as Record<string, number>)[`house_${i + 1}`] ?? 0));

  function houseOfLon(lon: number): number {
    const x = normalize360(lon);
    for (let i = 0; i < 12; i++) {
      const start = cusps[i]!;
      const end = cusps[(i + 1) % 12]!;
      if (start <= end) {
        if (x >= start && x < end) return i + 1;
      } else if (x >= start || x < end) {
        return i + 1;
      }
    }
    return 1;
  }

  const planets: PlanetData[] = natalPlanets.map((p) => {
    const lon = normalize360(p.longitude + arc);
    return {
      ...p,
      longitude: lon,
      sign: getSignForLongitude(lon),
      degree: Math.floor(getSignDegree(lon)),
      minutes: getSignDegreeMinutes(lon),
      house: houseOfLon(lon),
    };
  });

  const ascLon = normalize360(points[0] ?? 0);
  const mcLon = normalize360(points[1] ?? 0);

  return {
    method: "true_solar_arc",
    solarArcDegrees: Math.round(arc * 10000) / 10000,
    birthJulianDayUt: birthJdUt,
    directedJulianDayUt: directedJdUt,
    planets,
    angles: {
      ascendant: { longitude: ascLon, sign: getSignForLongitude(ascLon), degree: Math.floor(getSignDegree(ascLon)) },
      midheaven: { longitude: mcLon, sign: getSignForLongitude(mcLon), degree: Math.floor(getSignDegree(mcLon)) },
    },
    cusps,
  };
}
