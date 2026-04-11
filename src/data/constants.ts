import { Tier, TierConfig } from "../lib/types.js";

export const TIERS_CONFIG: Record<Tier, TierConfig> = {
  free: { 
    id: "free", 
    displayName: "Free", 
    requestsPerDay: 50, 
    price: "USD 0", 
    features: ["50 Requests per day", "Unlimited public projects", "Standard Grid Access"] 
  },
  mercury: { 
    id: "mercury", 
    displayName: "Mercury", 
    requestsPerDay: 1666, 
    price: "$15/mo", 
    features: ["50,000 Requests per month", "10 Requests per second", "Unlimited private projects", "E-mail support"] 
  },
  venus: { 
    id: "venus", 
    displayName: "Venus", 
    requestsPerDay: 6666, 
    price: "$40/mo", 
    features: ["200,000 Requests per month", "100 Requests per second", "Master Astro Engines", "E-mail support"] 
  },
  saturn: { 
    id: "saturn", 
    displayName: "Saturn", 
    requestsPerDay: 16666, 
    price: "$75/mo", 
    features: ["500,000 Requests per month", "1,000 Requests per second", "Dedicated Infrastructure", "Priority support"] 
  },
  admin: { 
    id: "admin", 
    displayName: "Admin", 
    requestsPerDay: 999999, 
    price: "N/A", 
    features: ["Unlimited access"] 
  },
};

export const TIERS: Record<Tier, { requestsPerDay: number }> = {
  free: { requestsPerDay: 50 },
  mercury: { requestsPerDay: 1666 },
  venus: { requestsPerDay: 6666 },
  saturn: { requestsPerDay: 16666 },
  admin: { requestsPerDay: 999999 },
};

export const ZODIAC_SIGNS = [
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

export const SIGN_ALIASES: Record<string, (typeof ZODIAC_SIGNS)[number]> = {
  aries: "aries",
  "áries": "aries",
  touro: "taurus",
  taurus: "taurus",
  gemeos: "gemini",
  "gêmeos": "gemini",
  gemini: "gemini",
  cancer: "cancer",
  "câncer": "cancer",
  leao: "leo",
  "leão": "leo",
  leo: "leo",
  virgem: "virgo",
  virgo: "virgo",
  libra: "libra",
  escorpiao: "scorpio",
  "escorpião": "scorpio",
  scorpio: "scorpio",
  sagitario: "sagittarius",
  "sagitário": "sagittarius",
  sagittarius: "sagittarius",
  capricornio: "capricorn",
  "capricórnio": "capricorn",
  capricorn: "capricorn",
  aquario: "aquarius",
  "aquário": "aquarius",
  aquarius: "aquarius",
  peixes: "pisces",
  pisces: "pisces",
};

export const SIGN_ELEMENTS: Record<string, string> = {
  aries: "fire", taurus: "earth", gemini: "air", cancer: "water",
  leo: "fire", virgo: "earth", libra: "air", scorpio: "water",
  sagittarius: "fire", capricorn: "earth", aquarius: "air", pisces: "water",
};

export const SIGN_MODALITIES: Record<string, string> = {
  aries: "cardinal", taurus: "fixed", gemini: "mutable", cancer: "cardinal",
  leo: "fixed", virgo: "mutable", libra: "cardinal", scorpio: "fixed",
  sagittarius: "mutable", capricorn: "cardinal", aquarius: "fixed", pisces: "mutable",
};

/** Chave do planeta regente (como em TRANSLATIONS.planets / i18n), minúsculas. Regências modernas ocidentais. */
export const SIGN_RULER_PLANET_KEY: Record<(typeof ZODIAC_SIGNS)[number], string> = {
  aries: "mars",
  taurus: "venus",
  gemini: "mercury",
  cancer: "moon",
  leo: "sun",
  virgo: "mercury",
  libra: "venus",
  scorpio: "pluto",
  sagittarius: "jupiter",
  capricorn: "saturn",
  aquarius: "uranus",
  pisces: "neptune",
};

export const ELEMENT_COMPAT: Record<string, string[]> = {
  fire: ["fire", "air"], earth: ["earth", "water"],
  air: ["air", "fire"], water: ["water", "earth"],
};

export const LUCKY_COLORS = ["red", "blue", "green", "gold", "purple", "white", "orange", "pink", "turquoise", "silver", "brown", "yellow"];
export const LUCKY_STONES = ["amethyst", "rose quartz", "tiger's eye", "citrine", "jade", "garnet", "topaz", "aquamarine", "obsidian", "tourmaline", "crystal", "lapis lazuli"];
export const LUCKY_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 21, 22, 23, 27, 29, 33];
export const FAVORABLE_HOURS = ["06:00-08:00", "09:00-11:00", "12:00-14:00", "15:00-17:00", "18:00-20:00", "21:00-23:00"];

export const HOROSCOPE_TTL_SECONDS: Record<string, number> = {
  daily: 6 * 60 * 60,
  weekly: 24 * 60 * 60,
  monthly: 7 * 24 * 60 * 60,
};

export const REPORT_PRICES = {
  mini: { id: "mini-horoscope", price: 0.03, currency: "USD", name: "Mini Horoscope PDF" },
  basic: { id: "basic-horoscope", price: 0.20, currency: "USD", name: "Basic Horoscope PDF" },
  pro: { id: "pro-horoscope", price: 1.50, currency: "USD", name: "Professional Horoscope PDF" },
  matchmaking: { id: "matchmaking", price: 0.62, currency: "USD", name: "Match-making Horoscope PDF" },
  natal: { id: "natal", price: 2.50, currency: "USD", name: "Natal Horoscope PDF" },
  forecast: { id: "forecast", price: 2.50, currency: "USD", name: "Life Forecast PDF" },
  solar_return: { id: "solar-return", price: 2.50, currency: "USD", name: "Solar Return PDF" },
  synastry: { id: "synastry", price: 2.50, currency: "USD", name: "Synastry Report PDF" },
};
