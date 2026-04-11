import crypto from "node:crypto";
import { NAKSHATRAS } from "../vedic-astrology.js";
import { VEDIC_HOROSCOPE_TEXTS, NAKSHATRA_SLUGS } from "../vedic-horoscope-texts.js";
import { VEDIC_ACTIONS, VEDIC_WATCHOUTS } from "../data/horoscope-data.js";
import { nowUtcIso } from "../lib/utils.js";
import { getTranslations, Language } from "../i18n.js";
import { getMoonIllumination, getVedicTithi, getMoonLongitude, getVedicYoga, getVedicKarana } from "./astronomy.service.js";
import { getNakshatra } from "../astro-calculations.js";
import { VedicHoroscopePeriod, VedicHoroscopeCategory } from "../lib/types.js";

export function getVedicNakshatraText(nakshatra: string, category: VedicHoroscopeCategory, period: VedicHoroscopePeriod, lang: Language = 'en'): string {
  const texts = (VEDIC_HOROSCOPE_TEXTS as any)[category]?.[nakshatra]?.[period];
  if (texts && texts.length > 0) {
    const day = new Date();
    const seedBase = `${period}:${nakshatra}:${category}:${day.toISOString().slice(0, 10)}`;
    const hash = crypto.createHash("md5").update(seedBase).digest("hex");
    const index = parseInt(hash.slice(0, 8), 16) % texts.length;
    
    const textEntry = texts[index];
    if (typeof textEntry === 'object' && textEntry !== null) {
      const langKey = lang as string;
      return (textEntry as any)[langKey] || (textEntry as any).pt || '';
    }
    return textEntry as string;
  }

  const nakshatraData = NAKSHATRAS.find(n => n.name.toLowerCase().replace(/\s+/g, "-") === nakshatra.toLowerCase());
  const lord = nakshatraData?.lord || "Lua";
  const name = nakshatraData?.name || nakshatra;

  const FALLBACK_TEXTS: Record<Language, Record<string, Record<string, string>>> = {
    pt: {
      love: { daily: `A energia de ${lord} favorece seus relacionamentos hoje. ${name} traz sensibilidade e intuição ao amor.`, weekly: `Esta semana ${name} sob regência de ${lord} traz renovação aos relacionamentos.`, monthly: `Este mês ${name} sob regência de ${lord} traz transformação completa aos relacionamentos.` },
      health: { daily: `A energia de ${lord} favorece sua saúde hoje. ${name} traz vitalidade e equilíbrio.`, weekly: `Esta semana ${name} sob regência de ${lord} traz renovação à saúde.`, monthly: `Este mês ${name} sob regência de ${lord} traz transformação à saúde.` },
      career: { daily: `A energia de ${lord} favorece sua carreira hoje. ${name} traz oportunidades profissionais.`, weekly: `Esta semana ${name} sob regência de ${lord} traz oportunidades profissionais.`, monthly: `Este mês ${name} sob regência de ${lord} traz transformação na carreira.` },
      finance: { daily: `A energia de ${lord} favorece suas finanças hoje. ${name} traz oportunidades financeiras.`, weekly: `Esta semana ${name} sob regência de ${lord} traz oportunidades financeiras.`, monthly: `Este mês ${name} sob regência de ${lord} traz transformação financeira.` },
    },
    en: {
      love: { daily: `${lord}'s energy favors your relationships today. ${name} brings sensitivity and intuition to love.`, weekly: `This week ${name} under ${lord}'s rule brings renewal to relationships.`, monthly: `This month ${name} under ${lord}'s rule brings complete transformation to relationships.` },
      health: { daily: `${lord}'s energy favors your health today. ${name} brings vitality and balance.`, weekly: `This week ${name} under ${lord}'s rule brings renewal to health.`, monthly: `This month ${name} under ${lord}'s rule brings transformation to health.` },
      career: { daily: `${lord}'s energy favors your career today. ${name} brings professional opportunities.`, weekly: `This week ${name} under ${lord}'s rule brings professional opportunities.`, monthly: `This month ${name} under ${lord}'s rule brings career transformation.` },
      finance: { daily: `${lord}'s energy favors your finances today. ${name} brings financial opportunities.`, weekly: `This week ${name} under ${lord}'s rule brings financial opportunities.`, monthly: `This month ${name} under ${lord}'s rule brings financial transformation.` },
    },
    es: {
      love: { daily: `La energía de ${lord} favorece tus relaciones hoy. ${name} trae sensibilidad e intuición al amor.`, weekly: `Esta semana ${name} bajo el dominio de ${lord} trae renovación a las relaciones.`, monthly: `Este mes ${name} bajo el dominio de ${lord} trae transformación completa a las relaciones.` },
      health: { daily: `La energía de ${lord} favorece tu salud hoy. ${name} trae vitalidad y equilibrio.`, weekly: `Esta semana ${name} bajo el dominio de ${lord} trae renovación a la salud.`, monthly: `Este mes ${name} bajo el dominio de ${lord} transformación a la salud.` },
      career: { daily: `La energía de ${lord} favorece tu carrera hoy. ${name} trae oportunidades profesionales.`, weekly: `Esta semana ${name} bajo el dominio de ${lord} trae oportunidades profesionales.`, monthly: `Este mes ${name} bajo el dominio de ${lord} trae transformación en la carrera.` },
      finance: { daily: `La energía de ${lord} favorece tus finanzas hoy. ${name} trae oportunidades financieras.`, weekly: `Esta semana ${name} bajo el dominio de ${lord} trae oportunidades financieras.`, monthly: `Este mes ${name} bajo el dominio de ${lord} trae transformación financiera.` },
    },
    hi: {
      love: { daily: `आज ${lord} की ऊर्जा आपके संबंधों को लाभ पहुंचाती है। ${name} प्रेम में संवेदनशीलता और अंतर्ज्ञान लाता है।`, weekly: `इस सप्ताह ${name} ${lord} के शासन में संबंधों में नवीनीकरण लाता है।`, monthly: `इस माह ${name} ${lord} के शासन में संबंधों में पूर्ण परिवर्तन लाता है।` },
      health: { daily: `आज ${lord} की ऊर्जा आपके स्वास्थ्य को लाभ पहुंचाती है। ${name} ऊर्जा और संतुलन लाता है।`, weekly: `इस सप्ताह ${name} ${lord} के शासन में स्वास्थ्य में नवीनीकरण लाता है।`, monthly: `इस माह ${name} ${lord} के शासन में स्वास्थ्य में परिवर्तन लाता है।` },
      career: { daily: `आज ${lord} की ऊर्जा आपके करियर को लाभ पहुंचाती है। ${name} पेशेवर अवसर लाता है।`, weekly: `इस सप्ताह ${name} ${lord} के शासन में पेशेवर अवसर लाता है।`, monthly: `इस माह ${name} ${lord} के शासन में करियर में परिवर्तन लाता है।` },
      finance: { daily: `आज ${lord} की ऊर्जा आपके वित्त को लाभ पहुंचाती है। ${name} वित्तीय अवसर लाता है।`, weekly: `इस सप्ताह ${name} ${lord} के शासन में वित्तीय अवसर लाता है।`, monthly: `इस माह ${name} ${lord} के शासन में वित्तीय परिवर्तन लाता है।` },
    },
  };

  return FALLBACK_TEXTS[lang]?.[category]?.[period] || FALLBACK_TEXTS.pt[category]?.[period] || "";
}

export function getVedicCompatibleNakshatras(nakshatra: string): string[] {
  const nakshatraData = NAKSHATRAS.find(n => n.name.toLowerCase() === nakshatra.toLowerCase());
  if (!nakshatraData) return NAKSHATRA_SLUGS.slice(0, 5) as unknown as string[];

  const nature = nakshatraData.nature;
  const element = (nakshatraData as any).element;

  const compatible = NAKSHATRAS
    .filter(n => n.nature === nature || (n as any).element === element)
    .slice(0, 5)
    .map(n => n.name.toLowerCase().replace(/\s+/g, "-"));

  return compatible.length > 0 ? compatible : NAKSHATRA_SLUGS.slice(0, 3) as unknown as string[];
}

export function getVedicLuckyColor(planet: string, lang: Language = 'en'): string {
  const colorsByLang: Record<Language, Record<string, string>> = {
    pt: { "Sol": "dourado", "Lua": "branco", "Marte": "vermelho", "Mercúrio": "verde", "Júpiter": "amarelo", "Vênus": "branco", "Saturno": "azul escuro", "Rahu": "azul", "Ketu": "multicolorido" },
    en: { "Sol": "golden", "Lua": "white", "Marte": "red", "Mercúrio": "green", "Júpiter": "yellow", "Vênus": "white", "Saturno": "dark blue", "Rahu": "blue", "Ketu": "multicolored" },
    es: { "Sol": "dorado", "Lua": "blanco", "Marte": "rojo", "Mercúrio": "verde", "Júpiter": "amarillo", "Vênus": "blanco", "Saturno": "azul oscuro", "Rahu": "azul", "Ketu": "multicolor" },
    hi: { "सूर्य": "सुनहरा", "चंद्रमा": "सफेद", "मंगल": "लाल", "बुध": "हरा", "गुरु": "पीला", "शुक्र": "सफेद", "शनि": "गहरा नीला", "राहु": "नीला", "केतु": "रंगीन" },
  };
  return colorsByLang[lang]?.[planet] || colorsByLang.pt[planet] || "branco";
}

export function getVedicLuckyStone(planet: string, lang: Language = 'en'): string {
  const stonesByLang: Record<Language, Record<string, string>> = {
    pt: { "Sol": "Rubi", "Lua": "Pérola", "Marte": "Coral", "Mercúrio": "Esmeralda", "Júpiter": "Topázio Amarelo", "Vênus": "Diamante", "Saturno": "Safira Azul", "Rahu": "Hessonita", "Ketu": "Olho de Gato" },
    en: { "Sol": "Ruby", "Lua": "Pearl", "Marte": "Coral", "Mercúrio": "Emerald", "Júpiter": "Yellow Sapphire", "Vênus": "Diamond", "Saturno": "Blue Sapphire", "Rahu": "Hessonite", "Ketu": "Cat's Eye" },
    es: { "Sol": "Rubí", "Lua": "Perla", "Marte": "Coral", "Mercúrio": "Esmeralda", "Júpiter": "Topacio Amarillo", "Vênus": "Diamante", "Saturno": "Zafiro Azul", "Rahu": "Hessonita", "Ketu": "Ojo de Gato" },
    hi: { "सूर्य": "माणिक", "चंद्रमा": "मोती", "मंगल": "प्रवाल", "बुध": "पन्ना", "गुरु": "पीला पुखराज", "शुक्र": "हीरा", "शनि": "नीला पुखराज", "राहु": "गोमेद", "केतु": "लहसुनिया" },
  };
  return stonesByLang[lang]?.[planet] || stonesByLang.pt[planet] || "Pérola";
}

export function getVedicLuckyNumbers(nakshatra: string): number[] {
  const hash = crypto.createHash("md5").update(`numbers:${nakshatra}`).digest("hex");
  const nums: number[] = [];
  for (let i = 0; i < 3; i++) {
    nums.push((parseInt(hash.slice(i * 2, i * 2 + 2), 16) % 9) + 1);
  }
  return nums;
}

export function getVedicFavorableHour(nakshatra: string, lang: Language = 'en'): string {
  const hoursByLang: Record<Language, string[]> = {
    pt: ["06:00-07:30", "08:00-09:30", "10:00-11:30", "14:00-15:30", "16:00-17:30", "18:00-19:30"],
    en: ["06:00-07:30", "08:00-09:30", "10:00-11:30", "14:00-15:30", "16:00-17:30", "18:00-19:30"],
    es: ["06:00-07:30", "08:00-09:30", "10:00-11:30", "14:00-15:30", "16:00-17:30", "18:00-19:30"],
    hi: ["06:00-07:30", "08:00-09:30", "10:00-11:30", "14:00-15:30", "16:00-17:30", "18:00-19:30"],
  };
  const hours = hoursByLang[lang] || hoursByLang.pt;
  const hash = crypto.createHash("md5").update(`hour:${nakshatra}`).digest("hex");
  return hours[parseInt(hash.slice(0, 2), 16) % hours.length];
}

export function getMantraForPlanet(planet: string): string {
  const mantras: Record<string, string> = {
    "Sol": "Om Suryaya Namah", "Lua": "Om Chandraya Namah", "Marte": "Om Mangalaya Namah",
    "Mercúrio": "Om Budhaya Namah", "Júpiter": "Om Gurave Namah", "Vênus": "Om Shukraya Namah",
    "Saturno": "Om Shanicharaya Namah", "Rahu": "Om Rahave Namah", "Ketu": "Om Ketave Namah",
  };
  return mantras[planet] || "Om Namah Shivaya";
}

export async function buildVedicHoroscope(nakshatra: string, period: VedicHoroscopePeriod, lang: Language = 'en') {
  const tr = getTranslations(lang);
  const day = new Date();
  const seedBase = `${period}:${nakshatra}:${day.toISOString().slice(0, 10)}`;

  const loveText = getVedicNakshatraText(nakshatra, "love", period, lang);
  const healthText = getVedicNakshatraText(nakshatra, "health", period, lang);
  const careerText = getVedicNakshatraText(nakshatra, "career", period, lang);
  const financeText = getVedicNakshatraText(nakshatra, "finance", period, lang);

  const actionHash = crypto.createHash("md5").update(`${seedBase}:action`).digest("hex");
  const watchoutHash = crypto.createHash("md5").update(`${seedBase}:watchout`).digest("hex");
  const actionIndex = parseInt(actionHash.slice(0, 8), 16) % tr.horoscope.vedicActions.length;
  const watchoutIndex = parseInt(watchoutHash.slice(0, 8), 16) % tr.horoscope.vedicWatchouts.length;
  const action = tr.horoscope.vedicActions[actionIndex];
  const watchout = tr.horoscope.vedicWatchouts[watchoutIndex];

  const compatibleNakshatras = getVedicCompatibleNakshatras(nakshatra);
  const topCompat = compatibleNakshatras[0] || "ashwini";
  const secondCompat = compatibleNakshatras[1] || "rohini";

  const nakshatraData = NAKSHATRAS.find(n => n.name.toLowerCase().replace(/\s+/g, "-") === nakshatra.toLowerCase());
  const luckyColor = nakshatraData ? getVedicLuckyColor(nakshatraData.lord, lang) : (lang === 'pt' ? 'branco' : lang === 'en' ? 'white' : lang === 'es' ? 'blanco' : 'सफेद');
  const luckyStone = nakshatraData ? getVedicLuckyStone(nakshatraData.lord, lang) : (lang === 'pt' ? 'pérola' : lang === 'en' ? 'pearl' : lang === 'es' ? 'perla' : 'मोती');
  const luckyNumbers = getVedicLuckyNumbers(nakshatra);
  const favorableHour = getVedicFavorableHour(nakshatra, lang);

  const now = new Date();
  const jd = (now.getTime() / 86400000) + 2440587.5;
  const tithi = getVedicTithi(jd);
  const moonIllumination = getMoonIllumination(jd);
  const moonLongitude = await getMoonLongitude(jd);
  const currentNakshatra = getNakshatra(moonLongitude);
  const yoga = await getVedicYoga(jd);
  const karana = await getVedicKarana(jd);

  const nakshatraDisplayName = nakshatraData ? nakshatraData.sanskritName : nakshatra;
  const nakshatraLord = nakshatraData ? nakshatraData.lord : (lang === 'pt' ? 'Desconhecido' : lang === 'en' ? 'Unknown' : lang === 'es' ? 'Desconocido' : 'अज्ञात');
  const nakshatraDeity = nakshatraData ? nakshatraData.deity : (lang === 'pt' ? 'Desconhecido' : lang === 'en' ? 'Unknown' : lang === 'es' ? 'Desconocido' : 'अज्ञात');
  const nakshatraSymbol = nakshatraData ? (nakshatraData as any).symbol : "✦";

  const intensityText: Record<Language, Record<VedicHoroscopePeriod, string>> = {
    pt: { daily: "hoje", weekly: "nesta semana", monthly: "neste mês" },
    en: { daily: "today", weekly: "this week", monthly: "this month" },
    es: { daily: "hoy", weekly: "esta semana", monthly: "este mes" },
    hi: { daily: "आज", weekly: "इस सप्ताह", monthly: "इस माह" },
  };
  const intensity = intensityText[lang]?.[period] || intensityText.pt[period];

  const periodLabels: Record<Language, Record<VedicHoroscopePeriod, string>> = {
    pt: { daily: "Diário", weekly: "Semanal", monthly: "Mensal" },
    en: { daily: "Daily", weekly: "Weekly", monthly: "Monthly" },
    es: { daily: "Diario", weekly: "Semanal", monthly: "Mensual" },
    hi: { daily: "दैनिक", weekly: "साप्ताहिक", monthly: "मासिक" },
  };

  const directionLabels: Record<Language, string> = { pt: "Norte", en: "North", es: "Norte", hi: "उत्तर" };
  const doshaLabels: Record<Language, string> = { pt: "Tridoshico", en: "Tridoshic", es: "Tridoshico", hi: "त्रिदोषिक" };
  const activitiesLabels: Record<Language, string[]> = { pt: ["Trabalho em equipe"], en: ["Team work"], es: ["Trabajo en equipo"], hi: ["टीम वर्क"] };

  return {
    nakshatra: nakshatraDisplayName,
    sanskritName: nakshatraDisplayName,
    lord: nakshatraLord,
    deity: nakshatraDeity,
    symbol: nakshatraSymbol,
    period: periodLabels[lang]?.[period] || periodLabels.pt[period],
    generatedAtUtc: nowUtcIso(),
    vedicDayInfo: {
      tithi: tithi.name,
      tithiNumber: tithi.number,
      yoga: yoga,
      karana: karana,
      currentNakshatra: currentNakshatra.name,
      moonIllumination: `${moonIllumination}%`,
    },
    luckyData: {
      color: luckyColor,
      stone: luckyStone,
      numbers: luckyNumbers,
      favorableHour,
      favorableDirection: (nakshatraData as any)?.direction || directionLabels[lang] || directionLabels.pt,
      favorableDeity: nakshatraDeity,
    },
    sections: {
      love: {
        summary: loveText,
        compatibility: { top: topCompat, secondary: secondCompat, nakshatras: compatibleNakshatras },
        guidance: action,
        mantra: nakshatraData ? getMantraForPlanet(nakshatraData.lord) : "Om Namah Shivaya",
      },
      health: {
        summary: `${intensity} ${tr.horoscope.connectors.key} ${healthText}.`,
        guidance: action,
        warning: watchout,
        dosha: (nakshatraData as any)?.dosha || doshaLabels[lang] || doshaLabels.pt,
      },
      career: {
        summary: `${intensity} ${tr.horoscope.connectors.favors} ${careerText}.`,
        opportunities: action,
        risk: watchout,
        favorableActivities: (nakshatraData as any)?.favorableActivities?.slice(0, 3) || activitiesLabels[lang] || activitiesLabels.pt,
      },
      finance: {
        summary: `${intensity} ${tr.horoscope.connectors.asks} ${financeText}.`,
        investments: action,
        spending: watchout,
      },
    },
  };
}