import { getTranslations, type Language } from "../i18n.js";
import { ZODIAC_SIGNS } from "./astro/constants.js";
import type {
  ArgalaResult,
  AshtakavargaResult,
  AvasthaResult,
  DrishtiResult,
  GrahaYuddhaResult,
  PrasnaResult,
  ShadbalaAnalysis,
} from "../vedic-advanced.js";

const SIGN_KEYS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

/** Nomes do motor (PT védico ou EN ocidental) → chave em `translations.*.planets`. */
const PLANET_NAME_TO_KEY: Record<string, string> = {
  Sol: "sun",
  Lua: "moon",
  Sun: "sun",
  Moon: "moon",
  Mercúrio: "mercury",
  Mercury: "mercury",
  Vênus: "venus",
  Venus: "venus",
  Marte: "mars",
  Mars: "mars",
  Júpiter: "jupiter",
  Jupiter: "jupiter",
  Saturno: "saturn",
  Saturn: "saturn",
  Urano: "uranus",
  Uranus: "uranus",
  Netuno: "neptune",
  Neptune: "neptune",
  Plutão: "pluto",
  Pluto: "pluto",
  Quíron: "chiron",
  Chiron: "chiron",
  Lilith: "lilith",
  Ceres: "ceres",
  Palas: "pallas",
  Pallas: "pallas",
  Juno: "juno",
  Vesta: "vesta",
  Rahu: "rahu",
  Ketu: "ketu",
  "North Node": "northNode",
  "South Node": "southNode",
};

export function localizeVedicPlanetLabel(name: string, lang: Language): string {
  const key = PLANET_NAME_TO_KEY[name];
  if (!key) return name;
  const tr = getTranslations(lang);
  const label = (tr.planets as Record<string, string | undefined>)[key];
  return label ?? name;
}

export function localizeZodiacSignLabel(sign: string, lang: Language): string {
  const idx = (ZODIAC_SIGNS as readonly string[]).indexOf(sign);
  if (idx < 0) return sign;
  const sk = SIGN_KEYS[idx]!;
  const tr = getTranslations(lang);
  return (tr.signs as Record<string, string | undefined>)[sk] ?? sign;
}

export function localizeVedicPlanetRows<T extends { name: string }>(planets: T[], lang: Language): T[] {
  return planets.map((p) => ({ ...p, name: localizeVedicPlanetLabel(p.name, lang) }));
}

export function localizeShadbalaForLang(analysis: ShadbalaAnalysis, lang: Language): ShadbalaAnalysis {
  return {
    ...analysis,
    results: analysis.results.map((r) => ({
      ...r,
      planet: localizeVedicPlanetLabel(r.planet, lang),
    })),
    strongestPlanet: localizeVedicPlanetLabel(analysis.strongestPlanet, lang),
    weakestPlanet: localizeVedicPlanetLabel(analysis.weakestPlanet, lang),
  };
}

export function localizeAshtakavargaForLang(result: AshtakavargaResult, lang: Language): AshtakavargaResult {
  const planetWise: Record<string, number[]> = {};
  for (const [k, v] of Object.entries(result.planetWise)) {
    planetWise[localizeVedicPlanetLabel(k, lang)] = v;
  }
  return { ...result, planetWise };
}

export function localizeVargottamaResponse(
  analysis: {
    planets: Array<{ planet: string; rashiSign: string; navamsaSign: string; vargottama: boolean }>;
    vargottamaPlanets: string[];
    methodology: string;
  },
  lang: Language
) {
  return {
    ...analysis,
    planets: analysis.planets.map((r) => ({
      ...r,
      planet: localizeVedicPlanetLabel(r.planet, lang),
      rashiSign: localizeZodiacSignLabel(r.rashiSign, lang),
      navamsaSign: localizeZodiacSignLabel(r.navamsaSign, lang),
    })),
    vargottamaPlanets: analysis.vargottamaPlanets.map((p) => localizeVedicPlanetLabel(p, lang)),
  };
}

export function localizeGocharaRows<
  T extends { planet: string; currentSign: string; natalSign: string },
>(rows: T[], lang: Language): T[] {
  return rows.map(
    (r) =>
      ({
        ...r,
        planet: localizeVedicPlanetLabel(r.planet, lang),
        currentSign: localizeZodiacSignLabel(r.currentSign, lang),
        natalSign: localizeZodiacSignLabel(r.natalSign, lang),
      }) as T
  );
}

export function localizeGrahaYuddhaRows(rows: GrahaYuddhaResult[], lang: Language): GrahaYuddhaResult[] {
  return rows.map((r) => ({
    ...r,
    planet1: localizeVedicPlanetLabel(r.planet1, lang),
    planet2: localizeVedicPlanetLabel(r.planet2, lang),
    winner: localizeVedicPlanetLabel(r.winner, lang),
    loser: localizeVedicPlanetLabel(r.loser, lang),
  }));
}

export function localizeAvasthasRows(rows: AvasthaResult[], lang: Language): AvasthaResult[] {
  return rows.map((r) => ({
    ...r,
    planet: localizeVedicPlanetLabel(r.planet, lang),
    sign: localizeZodiacSignLabel(r.sign as string, lang) as AvasthaResult["sign"],
  }));
}

export function localizeArgalaResult(arg: ArgalaResult, lang: Language): ArgalaResult {
  return {
    ...arg,
    argalas: arg.argalas.map((a) => ({
      ...a,
      planet: localizeVedicPlanetLabel(a.planet, lang),
    })),
    virodhArgalas: arg.virodhArgalas.map((a) => ({
      ...a,
      planet: localizeVedicPlanetLabel(a.planet, lang),
    })),
  };
}

export function localizeDrishtiResults(rows: DrishtiResult[], lang: Language): DrishtiResult[] {
  return rows.map((r) => ({
    ...r,
    planet: localizeVedicPlanetLabel(r.planet, lang),
  }));
}

export function localizePrasnaResult(prasna: PrasnaResult, lang: Language): PrasnaResult {
  return {
    ...prasna,
    chart: {
      ...prasna.chart,
      ascendant: {
        ...prasna.chart.ascendant,
        sign: localizeZodiacSignLabel(prasna.chart.ascendant.sign as string, lang) as PrasnaResult["chart"]["ascendant"]["sign"],
        lord: localizeVedicPlanetLabel(prasna.chart.ascendant.lord, lang),
      },
      houses: prasna.chart.houses.map((h) => ({
        ...h,
        sign: localizeZodiacSignLabel(h.sign as string, lang) as (typeof prasna.chart.houses)[number]["sign"],
        lord: localizeVedicPlanetLabel(h.lord, lang),
      })),
      planets: localizeVedicPlanetRows(prasna.chart.planets as { name: string }[], lang) as PrasnaResult["chart"]["planets"],
    },
  };
}
