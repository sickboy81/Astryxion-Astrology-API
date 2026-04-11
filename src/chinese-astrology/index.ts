// Astrologia Chinesa - Módulo Principal
// Exporta todas as funcionalidades de astrologia chinesa

// Dados
export { CHINESE_ANIMALS, getAnimalByName, getAnimalByYear, getAnimalNameLocalized } from "./animals.js";
export type { ChineseAnimal } from "./animals.js";

export { CHINESE_ELEMENTS, getElementByName, getElementByYear, getElementNameLocalized } from "./elements.js";
export type { ChineseElement } from "./elements.js";

export { CHINESE_MONTHS, getMonthByNumber, getMonthByName, getCurrentChineseMonth } from "./months.js";
export type { ChineseMonth } from "./months.js";

export { CHINESE_HOURS, getHourByTime, getCurrentChineseHour, getHourByName } from "./hours.js";
export type { ChineseHour } from "./hours.js";

// Cálculos
export {
  calculateChineseZodiac,
  calculateCompatibility,
  calculateYearPrediction,
  getCurrentChineseYear,
  getCurrentChineseAnimal,
  getNextChineseNewYear,
} from "./calculations.js";
export type { ChineseZodiacResult, CompatibilityResult, YearPrediction } from "./calculations.js";

// Compatibilidade
export {
  getCompatibilityMatrix,
  calculateDetailedCompatibility,
  getAllCompatibilityForAnimal,
} from "./compatibility.js";
export type { CompatibilityMatrix, RelationshipAdvice } from "./compatibility.js";

// Textos de Horóscopo
export {
  getChineseHoroscopeText,
  getAllChineseHoroscopeTexts,
} from "./horoscope-texts.js";
export type { ChineseHoroscopeCategory, ChineseHoroscopePeriod } from "./horoscope-texts.js";

// Yin/Yang
export {
  analyzeYinYang,
  getYinYangForYear,
  getYinYangForAnimal,
} from "./yin-yang.js";
export type { YinYangAnalysis } from "./yin-yang.js";

// I Ching
export {
  I_CHING_HEXAGRAMS,
  getHexagramByNumber,
  getHexagramByName,
  getDailyHexagram,
  getHexagramForQuestion,
} from "./iching.js";
export type { IChingHexagram } from "./iching.js";

// Feng Shui
export {
  getFengShuiForYear,
  getCurrentFengShui,
  localizeFengShui,
  buildAnnualFlyingStarGrid,
  getFlyingStarMonthlyNote,
  calculateKuaNumber,
} from "./fengshui.js";
export type { FengShuiData, KuaNumber, LocalizedFengShuiResponse } from "./fengshui.js";

export { computeBaZi, formatBaZiForLang, sexagenaryDayIndicesFromJdn } from "./bazi.js";
export type { BaZiResult, BaZiPillar } from "./bazi.js";

// Numerologia
export {
  calculateChineseNumerology,
  getLuckyNumbersForAnimal,
  getUnluckyNumbersForAnimal,
} from "./numerology.js";
export type { ChineseNumerology } from "./numerology.js";
