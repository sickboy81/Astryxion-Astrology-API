import { ZODIAC_SIGNS } from "./constants.js";

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export interface PlanetData {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  distanceAu: number;
  speedLongitude: number;
  sign: ZodiacSign;
  degree: number;
  minutes: number;
  house: number;
  retrograde: boolean;
}

export interface AspectData {
  a: string;
  b: string;
  type: string;
  symbol: string;
  exactAngle: number;
  orb: number;
  separation: number;
  applying: boolean;
}

export interface ArabicPart {
  name: string;
  longitude: number;
  sign: ZodiacSign;
  degree: number;
}

export interface FixedStarAspect {
  star: string;
  planet: string;
  aspect: string;
  orb: number;
}

export interface AspectPattern {
  type: string;
  planets: string[];
  description: string;
  /** Stable key for i18n (aspectPatterns.*) */
  patternKey?: string;
}

export interface LunarPhase {
  phase: string;
  illumination: number;
  nextNewMoon: string;
  nextFullMoon: string;
}

export interface VoidOfCourseMoon {
  isVoc: boolean;
  nextAspect: string;
  timeToNextAspect: string;
}

export interface DignityData {
  planet: string;
  sign: ZodiacSign;
  domicile: boolean;
  exaltation: boolean;
  fall: boolean;
  detriment: boolean;
}

export interface SolarReturnData {
  year: number;
  date: string;
  sunLongitude: number;
  ascendant: { longitude: number; sign: ZodiacSign; degree: number };
  mc: { longitude: number; sign: ZodiacSign; degree: number };
  houses: { house: number; longitude: number; sign: ZodiacSign; degree: number }[];
  planets: PlanetData[];
}

export interface ProgressedData {
  progressedDate: string;
  age: number;
  planets: PlanetData[];
  aspects: AspectData[];
  progressedAscendant: { longitude: number; sign: ZodiacSign; degree: number };
  progressedMc: { longitude: number; sign: ZodiacSign; degree: number };
}

export interface SynastryData {
  person1Planets: PlanetData[];
  person2Planets: PlanetData[];
  synastryAspects: AspectData[];
  compositeMidpoints: { planet: string; longitude: number; sign: ZodiacSign }[];
  compatibility: { score: number; strengths: string[]; challenges: string[] };
}

export interface CompositeData {
  planets: PlanetData[];
  houses: { house: number; longitude: number; sign: ZodiacSign; degree: number }[];
  aspects: AspectData[];
  ascendant: { longitude: number; sign: ZodiacSign; degree: number };
  mc: { longitude: number; sign: ZodiacSign; degree: number };
}

export interface TransitData {
  transitDate: string;
  transitPlanets: PlanetData[];
  natalPlanets: PlanetData[];
  aspects: AspectData[];
  majorTransits: { transit: string; natal: string; aspect: string; description: string }[];
}

export interface EclipseData {
  type: "solar" | "lunar";
  date: string;
  saros: number;
  magnitude: number;
  visible: boolean;
  longitude: number;
  latitude: number;
}
