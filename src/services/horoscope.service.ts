import crypto from "node:crypto";
import { ZODIAC_SIGNS, LUCKY_COLORS, LUCKY_STONES, LUCKY_NUMBERS, FAVORABLE_HOURS } from "../data/constants.js";
import { ACTIONS_LOC, WATCHOUTS_LOC } from "../data/horoscope-data.js";
import { getCompatibleSigns, nowUtcIso, seededPick, seededPickNumber } from "../lib/utils.js";
import { getTranslations, Language } from "../i18n.js";
import { getLoveText, getHealthText, getCareerText, getFinanceText } from "../horoscope-texts.js";
import { getMoonPhaseName, getMoonIllumination, getTransitInfluence } from "./astronomy.service.js";
import { HoroscopePeriod } from "../lib/types.js";

export function buildHoroscope(sign: (typeof ZODIAC_SIGNS)[number], period: HoroscopePeriod, lang: Language = 'en') {
  const tr = getTranslations(lang);
  const day = new Date();
  const seedBase = `${period}:${sign}:${day.toISOString().slice(0, 10)}`;
  const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Get sign-specific texts with lang support
  const loveText = getLoveText(signKey, period, lang);
  const healthText = getHealthText(signKey, period, lang);
  const careerText = getCareerText(signKey, period, lang);
  const financeText = getFinanceText(signKey, period, lang);

  const intensity = tr.horoscope.intensity[period as keyof typeof tr.horoscope.intensity] || period;

  const action = seededPick(`${seedBase}:action`, ACTIONS_LOC[lang] || ACTIONS_LOC.en);
  const watchout = seededPick(`${seedBase}:watchout`, WATCHOUTS_LOC[lang] || WATCHOUTS_LOC.en);

  // Compatibility real baseada em elementos
  const compatibleSigns = getCompatibleSigns(signKey); // Assume it takes normalized sign key
  const topCompat = seededPick(`${seedBase}:topcompat`, compatibleSigns);
  const secondCompat = seededPick(`${seedBase}:secondcompat`, compatibleSigns.filter(s => s !== topCompat));

  // Dados extras
  const luckyColor = seededPick(`${seedBase}:color`, LUCKY_COLORS);
  const luckyStone = seededPick(`${seedBase}:stone`, LUCKY_STONES);
  const luckyNumbers = [
    seededPickNumber(`${seedBase}:num1`, LUCKY_NUMBERS),
    seededPickNumber(`${seedBase}:num2`, LUCKY_NUMBERS.filter(n => n !== seededPickNumber(`${seedBase}:num1`, LUCKY_NUMBERS))),
    seededPickNumber(`${seedBase}:num3`, LUCKY_NUMBERS),
  ];
  const favorableHour = seededPick(`${seedBase}:hour`, FAVORABLE_HOURS);

  // Fase lunar
  const now = new Date();
  const jd = (now.getTime() / 86400000) + 2440587.5;
  const moonPhase = getMoonPhaseName(jd);
  const moonIllumination = getMoonIllumination(jd);

  // Intensidade baseada na fase lunar (localized)
  const moonInfluence = moonPhase === "Lua Cheia" ? tr.horoscope.moonInfluences.full :
    moonPhase === "Lua Nova" ? tr.horoscope.moonInfluences.new :
    moonPhase.includes("Crescente") ? tr.horoscope.moonInfluences.crescent :
    tr.horoscope.moonInfluences.waning;

  // Get transit influences
  const transitInfluences = getTransitInfluence(null, signKey);

  return {
    sign: tr.signs[signKey] || sign,
    period: tr.horoscope[period] || period,
    generatedAtUtc: nowUtcIso(),
    moonPhase: {
      phase: tr.horoscope.moonPhase,
      illumination: `${moonIllumination}%`,
      influence: moonInfluence,
    },
    luckyData: {
      color: tr.horoscope.luckyColors[LUCKY_COLORS.indexOf(luckyColor)] || luckyColor,
      stone: tr.horoscope.luckyStones[LUCKY_STONES.indexOf(luckyStone)] || luckyStone,
      numbers: luckyNumbers,
      favorableHour,
    },
    sections: {
      love: {
        summary: loveText,
        compatibility: { 
          top: tr.signs[topCompat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] || topCompat, 
          secondary: tr.signs[secondCompat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] || secondCompat, 
          signs: compatibleSigns.map(s => tr.signs[s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] || s) 
        },
        guidance: action,
      },
      health: {
        summary: `${tr.horoscope.health} (${intensity}): ${healthText}.`,
        guidance: action,
        warning: watchout,
      },
      career: {
        summary: `${tr.horoscope.career} (${intensity}): ${careerText}.`,
        opportunities: action,
        risk: watchout,
      },
      finance: {
        summary: `${tr.horoscope.finances} (${intensity}): ${financeText}.`,
        investments: action,
        spending: watchout,
      },
    },
    transitInfluences: transitInfluences.length > 0 ? transitInfluences : undefined,
  };
}
