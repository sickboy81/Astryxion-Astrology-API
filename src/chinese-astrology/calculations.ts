import { CHINESE_ANIMALS, getAnimalByYear, type ChineseAnimal } from "./animals.js";
import { CHINESE_ELEMENTS, getElementByYear, type ChineseElement } from "./elements.js";
import { ANIMAL_PREDICTIONS } from "./predictions.js";

export interface ChineseZodiacResult {
  year: number;
  animal: any; // Localized animal profile
  element: any; // Localized element profile
  yinYang: string;
  description: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  luckyFlowers: string[];
  bestDirection: string;
  careerStrengths: string[];
  healthTips: string[];
}

export interface CompatibilityResult {
  animal1: string;
  animal2: string;
  compatibilityScore: number;
  compatibilityLevel: string;
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

export interface YearPrediction {
  year: number;
  animal: string;
  element: string;
  generalForecast: string;
  loveForecast: string;
  careerForecast: string;
  financeForecast: string;
  healthForecast: string;
  luckyMonths: string[];
  challengingMonths: string[];
}

const TRANSLATIONS: Record<string, Record<string, string>> = {
  excelente: { pt: "excelente", en: "excellent", es: "excelente", hi: "उत्कृष्ट" },
  boa: { pt: "boa", en: "good", es: "buena", hi: "अच्छा" },
  moderada: { pt: "moderada", en: "moderate", es: "moderada", hi: "मध्यम" },
  desafiadora: { pt: "desafiadora", en: "challenging", es: "desafiante", hi: "चुनौतीपूर्ण" },
  yin: { pt: "yin", en: "yin", es: "yin", hi: "यिन" },
  yang: { pt: "yang", en: "yang", es: "yang", hi: "यांग" },
};

export function calculateChineseZodiac(year: number, lang: string = "en"): ChineseZodiacResult {
  const animal = getAnimalByYear(year);
  const element = getElementByYear(year);

  if (!animal || !element) {
    throw new Error(lang === "pt" ? `Não foi possível calcular o zodíaco chinês para o ano ${year}` : `Could not calculate Chinese zodiac for year ${year}`);
  }

  const yinYangKey = year % 2 === 0 ? "yin" : "yang";
  const yinYang = TRANSLATIONS[yinYangKey][lang] || yinYangKey;

  const animalName = animal.displayName[lang as keyof typeof animal.displayName];
  const elementName = element.displayName[lang as keyof typeof element.displayName];
  const description = `${animalName} (${elementName}) - ${yinYang.toUpperCase()}`;

  return {
    year,
    animal: {
        ...animal,
        displayName: animalName
    },
    element: {
        ...element,
        displayName: elementName
    },
    yinYang,
    description,
    personality: animal.personality[lang] || animal.personality.pt,
    strengths: animal.strengths[lang] || animal.strengths.pt,
    weaknesses: animal.weaknesses[lang] || animal.weaknesses.pt,
    luckyNumbers: animal.luckyNumbers,
    luckyColors: [...(animal.luckyColors[lang] || animal.luckyColors.pt), (element.associatedColor[lang] || element.associatedColor.pt)],
    luckyFlowers: animal.luckyFlowers[lang] || animal.luckyFlowers.pt,
    bestDirection: animal.bestDirection[lang] || animal.bestDirection.pt,
    careerStrengths: animal.careerStrengths[lang] || animal.careerStrengths.pt,
    healthTips: [
        ...(animal.healthTips[lang] || animal.healthTips.pt), 
        ...(element.healthAspects[lang] || element.healthAspects.pt)
    ],
  };
}

export function calculateCompatibility(animal1Name: string, animal2Name: string, lang: string = "en"): CompatibilityResult {
  const animal1 = CHINESE_ANIMALS.find((a) => a.name === animal1Name.toLowerCase());
  const animal2 = CHINESE_ANIMALS.find((a) => a.name === animal2Name.toLowerCase());

  if (!animal1 || !animal2) {
    throw new Error(lang === "pt" ? `Animal não encontrado: ${animal1Name} ou ${animal2Name}` : `Animal not found: ${animal1Name} or ${animal2Name}`);
  }

  let score = 50;
  if (animal1.compatibleWith.includes(animal2.name)) score += 30;
  if (animal1.incompatibleWith.includes(animal2.name)) score -= 30;
  if (animal2.compatibleWith.includes(animal1.name)) score += 10;
  if (animal2.incompatibleWith.includes(animal1.name)) score -= 10;

  score = Math.max(0, Math.min(100, score));

  let levelKey: string;
  if (score >= 80) levelKey = "excelente";
  else if (score >= 60) levelKey = "boa";
  else if (score >= 40) levelKey = "moderada";
  else levelKey = "desafiadora";

  const level = TRANSLATIONS[levelKey][lang] || levelKey;

  const animal1Label = animal1.displayName[lang as keyof typeof animal1.displayName] || animal1.displayName.pt;
  const animal2Label = animal2.displayName[lang as keyof typeof animal2.displayName] || animal2.displayName.pt;

  const strengths: string[] = [];
  const challenges: string[] = [];

  if (animal1.compatibleWith.includes(animal2.name)) {
    strengths.push(lang === "pt" ? `${animal1Label} e ${animal2Label} formam um par harmonioso` : `${animal1Label} and ${animal2Label} form a harmonious pair`);
  }
  if (animal1.incompatibleWith.includes(animal2.name)) {
    challenges.push(lang === "pt" ? `${animal1Label} e ${animal2Label} podem ter conflitos naturais` : `${animal1Label} and ${animal2Label} may have natural conflicts`);
  }

  const adviceTable: Record<string, Record<string, string>> = {
    excelente: {
      pt: "Esta é uma combinação muito favorável. Aproveitem a harmonia natural entre vocês.",
      en: "This is a very favorable combination. Enjoy the natural harmony between you.",
      es: "Esta es una combinación muy favorable. Disfruten de la armonía natural entre ustedes.",
      hi: "यह एक बहुत ही अनुकूल संयोजन है। अपने बीच के प्राकृतिक सद्भाव का आनंद लें।"
    },
    boa: {
      pt: "Há boa compatibilidade, mas é importante trabalhar nas diferenças.",
      en: "There is good compatibility, but it's important to work on differences.",
      es: "Hay buena compatibilidad, pero es importante trabajar en las diferencias.",
      hi: "अच्छी अनुकूलता है, लेकिन मतभेदों पर काम करना महत्वपूर्ण है।"
    },
    moderada: {
       pt: "Requer esforço mútuo para manter a harmonia. Comunicação é fundamental.",
       en: "Requires mutual effort to maintain harmony. Communication is key.",
       es: "Requiere esfuerzo mutuo para mantener la armonía. La comunicación es fundamental.",
       hi: "सद्भाव बनाए रखने के लिए आपसी प्रयास की आवश्यकता होती है। संवाद महत्वपूर्ण है।"
    },
    desafiadora: {
       pt: "Desafios significativos, mas não impossíveis. Paciência é essencial.",
       en: "Significant challenges, but not impossible. Patience is essential.",
       es: "Desafíos significativos, pero no imposibles. La paciencia es esencial.",
       hi: "महत्वपूर्ण चुनौतियाँ, लेकिन असंभव नहीं। धैर्य आवश्यक है।"
    }
  };

  const advice = adviceTable[levelKey][lang] || adviceTable[levelKey]["pt"];

  return {
    animal1: animal1Label,
    animal2: animal2Label,
    compatibilityScore: score,
    compatibilityLevel: level,
    description: lang === "pt" ? `Compatibilidade entre ${animal1Label} e ${animal2Label}` : `Compatibility between ${animal1Label} and ${animal2Label}`,
    strengths,
    challenges,
    advice,
  };
}

export function calculateYearPrediction(year: number, animalName: string, lang: string = "en"): YearPrediction {
  const animal = CHINESE_ANIMALS.find((a) => a.name === animalName.toLowerCase());
  const element = getElementByYear(year);

  if (!animal || !element) {
    throw new Error(lang === "pt" ? `Dados não encontrados` : `Data not found`);
  }

  const predictionData = ANIMAL_PREDICTIONS[animalName.toLowerCase()];
  
  if (!predictionData) {
      // Fallback
      return {
          year,
          animal: animal.displayName[lang] || animal.displayName.pt,
          element: element.displayName[lang] || element.displayName.pt,
          generalForecast: "...", loveForecast: "...", careerForecast: "...", financeForecast: "...", healthForecast: "...",
          luckyMonths: [], challengingMonths: []
      };
  }

  return {
    year,
    animal: animal.displayName[lang] || animal.displayName.pt,
    element: element.displayName[lang] || element.displayName.pt,
    generalForecast: predictionData.generalForecast[lang] || predictionData.generalForecast.pt,
    loveForecast: predictionData.loveForecast[lang] || predictionData.loveForecast.pt,
    careerForecast: predictionData.careerForecast[lang] || predictionData.careerForecast.pt,
    financeForecast: predictionData.financeForecast[lang] || predictionData.financeForecast.pt,
    healthForecast: predictionData.healthForecast[lang] || predictionData.healthForecast.pt,
    luckyMonths: predictionData.luckyMonths[lang] || predictionData.luckyMonths.pt,
    challengingMonths: predictionData.challengingMonths[lang] || predictionData.challengingMonths.pt,
  };
}

export function getCurrentChineseYear(): number {
  return new Date().getFullYear();
}

export function getCurrentChineseAnimal(): ChineseAnimal | undefined {
  return getAnimalByYear(getCurrentChineseYear());
}

export function getNextChineseNewYear(): Date {
  const currentYear = getCurrentChineseYear();
  return new Date(currentYear + 1, 1, 1);
}
