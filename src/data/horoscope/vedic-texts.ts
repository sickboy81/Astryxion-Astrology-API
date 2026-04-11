import { LOVE_TEXTS, HEALTH_TEXTS, CAREER_TEXTS, FINANCE_TEXTS } from './vedic-texts-data/index.js';

// Vedic horoscope text database - unique interpretations per Nakshatra, period, and category
// Each array contains 30+ unique texts for maximum variety

export const VEDIC_HOROSCOPE_TEXTS = {
  love: LOVE_TEXTS,
  health: HEALTH_TEXTS,
  career: CAREER_TEXTS,
  finance: FINANCE_TEXTS,
};

// Nakshatra slugs and aliases for API routing
export const NAKSHATRA_SLUGS = [
  "ashwini", "bharani", "krittika", "rohini", "mrigashira",
  "ardra", "punarvasu", "pushya", "ashlesha", "magha",
  "purva-phalguni", "uttara-phalguni", "hasta", "chitra", "swati",
  "vishakha", "anuradha", "jyeshtha", "mula", "purva-ashadha",
  "uttara-ashadha", "shravana", "dhanishta", "shatabhisha", "purva-bhadrapada",
  "uttara-bhadrapada", "revati",
] as const;

export const NAKSHATRA_ALIASES: Record<string, (typeof NAKSHATRA_SLUGS)[number]> = {
  ashwini: "ashwini",
  aswini: "ashwini",
  bharani: "bharani",
  krittika: "krittika",
  kritika: "krittika",
  rohini: "rohini",
  mrigashira: "mrigashira",
  mrigashirsha: "mrigashira",
  ardra: "ardra",
  arudra: "ardra",
  punarvasu: "punarvasu",
  pushya: "pushya",
  ashlesha: "ashlesha",
  magha: "magha",
  "purva-phalguni": "purva-phalguni",
  "pubba": "purva-phalguni",
  "uttara-phalguni": "uttara-phalguni",
  "uttara": "uttara-phalguni",
  hasta: "hasta",
  chitra: "chitra",
  swati: "swati",
  vishakha: "vishakha",
  anuradha: "anuradha",
  jyeshtha: "jyeshtha",
  mula: "mula",
  "purva-ashadha": "purva-ashadha",
  "uttara-ashadha": "uttara-ashadha",
  shravana: "shravana",
  sravana: "shravana",
  dhanishta: "dhanishta",
  shatabhisha: "shatabhisha",
  "purva-bhadrapada": "purva-bhadrapada",
  "uttara-bhadrapada": "uttara-bhadrapada",
  revati: "revati",
};

export type VedicHoroscopePeriod = "daily" | "weekly" | "monthly";
export type VedicHoroscopeCategory = "love" | "health" | "career" | "finance";
