import { DateTime, FixedOffsetZone } from "luxon";
import type { Language } from "../i18n.js";
import type { LocalizedText } from "../i18n.js";

const STEM_CHARS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
const BRANCH_CHARS = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

const STEM_I18N: LocalizedText[] = [
  { pt: "Jia (Madeira Yang)", en: "Jia (Yang Wood)", es: "Jia (Madera Yang)", hi: "जिआ (यांग लकड़ी)" },
  { pt: "Yi (Madeira Yin)", en: "Yi (Yin Wood)", es: "Yi (Madera Yin)", hi: "यी (यिन लकड़ी)" },
  { pt: "Bing (Fogo Yang)", en: "Bing (Yang Fire)", es: "Bing (Fuego Yang)", hi: "बिंग (यांग आग)" },
  { pt: "Ding (Fogo Yin)", en: "Ding (Yin Fire)", es: "Ding (Fuego Yin)", hi: "डिंग (यिन आग)" },
  { pt: "Wu (Terra Yang)", en: "Wu (Yang Earth)", es: "Wu (Tierra Yang)", hi: "वू (यांग पृथ्वी)" },
  { pt: "Ji (Terra Yin)", en: "Ji (Yin Earth)", es: "Ji (Tierra Yin)", hi: "जी (यिन पृथ्वी)" },
  { pt: "Geng (Metal Yang)", en: "Geng (Yang Metal)", es: "Geng (Metal Yang)", hi: "गेंग (यांग धातु)" },
  { pt: "Xin (Metal Yin)", en: "Xin (Yin Metal)", es: "Xin (Metal Yin)", hi: "शिन (यिन धातु)" },
  { pt: "Ren (Água Yang)", en: "Ren (Yang Water)", es: "Ren (Agua Yang)", hi: "रेन (यांग जल)" },
  { pt: "Gui (Água Yin)", en: "Gui (Yin Water)", es: "Gui (Agua Yin)", hi: "गुई (यिन जल)" },
];

const BRANCH_I18N: LocalizedText[] = [
  { pt: "Zi (Rato)", en: "Zi (Rat)", es: "Zi (Rata)", hi: "ज़ी (चूहा)" },
  { pt: "Chou (Boi)", en: "Chou (Ox)", es: "Chou (Buey)", hi: "छोउ (बैल)" },
  { pt: "Yin (Tigre)", en: "Yin (Tiger)", es: "Yin (Tigre)", hi: "यिन (बाघ)" },
  { pt: "Mao (Coelho)", en: "Mao (Rabbit)", es: "Mao (Conejo)", hi: "माओ (खरगोश)" },
  { pt: "Chen (Dragão)", en: "Chen (Dragon)", es: "Chen (Dragón)", hi: "चेन (अजगर)" },
  { pt: "Si (Serpente)", en: "Si (Snake)", es: "Si (Serpiente)", hi: "सी (सांप)" },
  { pt: "Wu (Cavalo)", en: "Wu (Horse)", es: "Wu (Caballo)", hi: "वू (घोड़ा)" },
  { pt: "Wei (Cabra)", en: "Wei (Goat)", es: "Wei (Cabra)", hi: "वेई (बकरी)" },
  { pt: "Shen (Macaco)", en: "Shen (Monkey)", es: "Shen (Mono)", hi: "शेन (बंदर)" },
  { pt: "You (Galo)", en: "You (Rooster)", es: "You (Gallo)", hi: "योउ (मुर्गा)" },
  { pt: "Xu (Cão)", en: "Xu (Dog)", es: "Xu (Perro)", hi: "शू (कुत्ता)" },
  { pt: "Hai (Porco)", en: "Hai (Pig)", es: "Hai (Cerdo)", hi: "हाइ (सूअर)" },
];

function pick<T extends LocalizedText>(loc: T, lang: Language): string {
  return loc[lang] || loc.en || loc.pt;
}

function wrap10(n: number): number {
  return ((n % 10) + 10) % 10;
}

function wrap12(n: number): number {
  return ((n % 12) + 12) % 12;
}

function wrap60(n: number): number {
  return ((n % 60) + 60) % 60;
}

/**
 * Sexagenário do **dia** a partir do número juliano ND = floor(JD_UT + 0.5) (meio-dia astronómico).
 * Fórmula usual em tabelas comunitárias: tronco = (ND + 9) mod 10, ramo = (ND + 1) mod 12;
 * ND ≡ 11 (mod 60) corresponde a 甲子. Alinhar com provas externas (ex. calculadoras de quatro pilares) para datas concretas.
 */
export function sexagenaryDayIndicesFromJdn(jdn: number): { stem: number; branch: number } {
  return {
    stem: wrap10(jdn + 9),
    branch: wrap12(jdn + 1),
  };
}

/** Hour branch index 0–11 from local civil time (子 = 23:00–00:59). */
function hourBranchIndex(hour: number, minute: number): number {
  const t = hour + minute / 60;
  if (t >= 23 || t < 1) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

/** 五鼠遁: heavenly stem of 子 hour from day stem. */
function ziHourStemStart(dayStem: number): number {
  const m: Record<number, number> = {
    0: 0, 5: 0, 1: 2, 6: 2, 2: 4, 7: 4, 3: 6, 8: 6, 4: 8, 9: 8,
  };
  return m[dayStem] ?? 0;
}

function hourStem(dayStem: number, hourBr: number): number {
  return wrap10(ziHourStemStart(dayStem) + hourBr);
}

/** First month stem (寅 month) from year stem — 五虎遁. */
function firstMonthStemFromYear(yearStem: number): number {
  const m: Record<number, number> = {
    0: 2, 5: 2, 1: 4, 6: 4, 2: 6, 7: 6, 3: 8, 8: 8, 4: 0, 9: 0,
  };
  return m[yearStem] ?? 2;
}

const MONTH_BRANCH_CYCLE = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1] as const;

async function sunLongitudeUt(jdUt: number): Promise<number> {
  const sweph = await import("sweph");
  const flags = sweph.constants.SEFLG_MOSEPH;
  const r = sweph.calc_ut(jdUt, sweph.constants.SE_SUN, flags);
  if (r.flag === sweph.constants.ERR) throw new Error("EPHEMERIS_ERROR");
  let lon = r.data[0] as number;
  lon %= 360;
  if (lon < 0) lon += 360;
  return lon;
}

/** Li Chun ≈ Sun λ = 315° (tropical), typically late Jan–Feb. */
async function liChunJdForGregorianYear(gregYear: number): Promise<number> {
  const sweph = await import("sweph");
  const cal = sweph.constants.SE_GREG_CAL;
  let jd = sweph.utc_to_jd(gregYear, 2, 1, 0, 0, 0, cal).data[1] as number;
  for (let step = 0; step < 120; step++) {
    const lon = await sunLongitudeUt(jd);
    if (lon >= 315 && lon < 330) {
      let j0 = jd - 2;
      let j1 = jd;
      for (let k = 0; k < 48; k++) {
        const m = (j0 + j1) / 2;
        const lm = await sunLongitudeUt(m);
        if (lm < 315) j0 = m;
        else j1 = m;
      }
      return (j0 + j1) / 2;
    }
    jd += 0.2;
  }
  return sweph.utc_to_jd(gregYear, 2, 4, 12, 0, 0, cal).data[1] as number;
}

export interface BaZiPillar {
  stemIndex: number;
  branchIndex: number;
  stemChar: string;
  branchChar: string;
  stem: LocalizedText;
  branch: LocalizedText;
  label: string;
}

export interface BaZiResult {
  chineseYear: number;
  /** Li Chun (315°) used for year boundary; month uses solar segments after Li Chun. */
  method: "solar_terms_swiss_ephemeris";
  timezoneOffsetMinutes: number;
  pillars: { year: BaZiPillar; month: BaZiPillar; day: BaZiPillar; hour: BaZiPillar };
}

export async function computeBaZi(input: {
  birthDate: string;
  birthTimeUtc: string;
  timezoneOffsetMinutes?: number;
}, lang: Language): Promise<BaZiResult> {
  const offset = input.timezoneOffsetMinutes ?? 0;
  const normalizedTime =
    input.birthTimeUtc.length === 5 ? `${input.birthTimeUtc}:00` : input.birthTimeUtc;
  const utc = DateTime.fromISO(`${input.birthDate}T${normalizedTime}`, { zone: "utc" });
  if (!utc.isValid) throw new Error("INVALID_DATETIME");

  const local = utc.plus({ minutes: offset });
  const y = local.year;
  const mo = local.month;
  const d = local.day;
  const h = local.hour;
  const mi = local.minute;

  const sweph = await import("sweph");
  const cal = sweph.constants.SE_GREG_CAL;
  const birthJdUt = sweph.utc_to_jd(utc.year, utc.month, utc.day, utc.hour, utc.minute, utc.second, cal).data[1] as number;

  const lichunWallYear = await liChunJdForGregorianYear(y);
  let chineseYear = y;
  if (birthJdUt < lichunWallYear) chineseYear = y - 1;

  const sunLon = await sunLongitudeUt(birthJdUt);
  const degAfter = (sunLon - 315 + 360) % 360;
  const monthIndex = Math.min(11, Math.floor(degAfter / 30));

  const yearIdx = wrap60(chineseYear - 4);
  const yearStem = yearIdx % 10;
  const yearBranch = yearIdx % 12;

  const monthBranch = MONTH_BRANCH_CYCLE[monthIndex] ?? 2;
  const monthStem = wrap10(firstMonthStemFromYear(yearStem) + monthIndex);

  const zone = FixedOffsetZone.instance(offset / 60);
  const noonLocal = DateTime.fromObject(
    { year: y, month: mo, day: d, hour: 12, minute: 0, second: 0 },
    { zone }
  );
  const u = noonLocal.toUTC();
  const noonLocalJdUt = sweph.utc_to_jd(u.year, u.month, u.day, u.hour, u.minute, Math.floor(u.second), cal).data[1] as number;
  const jdn = Math.floor(noonLocalJdUt + 0.5);
  const { stem: dayStem, branch: dayBranch } = sexagenaryDayIndicesFromJdn(jdn);

  const hb = hourBranchIndex(h, mi);
  const hourStemV = hourStem(dayStem, hb);

  function pillar(st: number, br: number, label: string): BaZiPillar {
    return {
      stemIndex: st,
      branchIndex: br,
      stemChar: STEM_CHARS[st] ?? "?",
      branchChar: BRANCH_CHARS[br] ?? "?",
      stem: STEM_I18N[st] as LocalizedText,
      branch: BRANCH_I18N[br] as LocalizedText,
      label,
    };
  }

  return {
    chineseYear,
    method: "solar_terms_swiss_ephemeris",
    timezoneOffsetMinutes: offset,
    pillars: {
      year: pillar(yearStem, yearBranch, "year"),
      month: pillar(monthStem, monthBranch, "month"),
      day: pillar(dayStem, dayBranch, "day"),
      hour: pillar(hourStemV, hb, "hour"),
    },
  };
}

export function formatBaZiForLang(result: BaZiPillar, lang: Language): { stem: string; branch: string; pair: string } {
  return {
    stem: pick(result.stem, lang),
    branch: pick(result.branch, lang),
    pair: `${result.stemChar}${result.branchChar}`,
  };
}
