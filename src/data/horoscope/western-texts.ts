import { LOVE_TEXTS, HEALTH_TEXTS, CAREER_TEXTS, FINANCE_TEXTS, GENERAL_TEXTS } from './western-texts-data/index.js';
import { Language } from '../../i18n.js';

// Sign name mapping (localized via simple map to avoid circular imports, or provided by caller)
export function getLocalizedSignName(sign: string): string {
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Defaulting to English key as the canonical name
  return signKey;
}

// Helper to pick a localized text
function pickLocalized(data: any, signKey: string, period: string, lang: Language): string {
  const signData = data[signKey as keyof typeof data];
  if (!signData) return "";
  const periodData = signData[period as keyof typeof signData] as any[];
  if (!periodData || periodData.length === 0) return "";
  
  // Use a deterministic seed if possible, but for now simple random
  // NOTE: In production, use a seeded random based on date/sign
  const item = periodData[Math.floor(Math.random() * periodData.length)];
  return item[lang] || item['en'] || item['pt'] || "";
}

// Get love text for sign and period
export function getLoveText(sign: string, period: "daily" | "weekly" | "monthly", lang: Language = 'en'): string {
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return pickLocalized(LOVE_TEXTS, signKey, period, lang);
}

// Get health text
export function getHealthText(sign: string = "aries", period: "daily" | "weekly" | "monthly" = "daily", lang: Language = 'en'): string {
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return pickLocalized(HEALTH_TEXTS, signKey, period, lang);
}

// Get career text
export function getCareerText(sign: string = "aries", period: "daily" | "weekly" | "monthly" = "daily", lang: Language = 'en'): string {
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return pickLocalized(CAREER_TEXTS, signKey, period, lang);
}

// Get finance text
export function getFinanceText(sign: string = "aries", period: "daily" | "weekly" | "monthly" = "daily", lang: Language = 'en'): string {
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return pickLocalized(FINANCE_TEXTS, signKey, period, lang);
}

// Get general text
export function getGeneralText(sign: string = "aries", period: "daily" | "weekly" | "monthly" = "daily", lang: Language = 'en'): string {
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return pickLocalized(GENERAL_TEXTS, signKey, period, lang);
}
