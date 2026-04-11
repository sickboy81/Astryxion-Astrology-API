import { CHINESE_ANIMALS, type ChineseAnimal } from "./animals.js";
import { CHINESE_ELEMENTS, type ChineseElement } from "./elements.js";

export interface CompatibilityMatrix {
  animal: string;
  bestMatches: string[];
  goodMatches: string[];
  neutralMatches: string[];
  challengingMatches: string[];
  worstMatches: string[];
}

export interface RelationshipAdvice {
  animal1: string;
  animal2: string;
  overallScore: number;
  loveScore: number;
  friendshipScore: number;
  businessScore: number;
  strengths: string[];
  challenges: string[];
  advice: string;
  tips: string[];
}

const COMPATIBILITY_MATRIX: Record<string, CompatibilityMatrix> = {
  rat: {
    animal: "rat",
    bestMatches: ["dragon", "monkey"],
    goodMatches: ["ox"],
    neutralMatches: ["tiger", "rabbit", "snake", "rooster", "dog", "pig"],
    challengingMatches: ["horse"],
    worstMatches: ["goat", "rabbit"],
  },
  ox: {
    animal: "ox",
    bestMatches: ["rat", "snake", "rooster"],
    goodMatches: [],
    neutralMatches: ["tiger", "rabbit", "dragon", "horse", "goat", "monkey", "dog", "pig"],
    challengingMatches: [],
    worstMatches: ["tiger", "dragon", "horse", "goat"],
  },
  tiger: {
    animal: "tiger",
    bestMatches: ["horse", "dog"],
    goodMatches: ["pig"],
    neutralMatches: ["rabbit", "dragon", "snake", "goat", "monkey", "rooster"],
    challengingMatches: ["ox"],
    worstMatches: ["ox", "tiger", "snake", "monkey"],
  },
  rabbit: {
    animal: "rabbit",
    bestMatches: ["goat", "dog", "pig"],
    goodMatches: ["monkey"],
    neutralMatches: ["tiger", "dragon", "snake", "horse", "rooster"],
    challengingMatches: ["rat"],
    worstMatches: ["rat", "tiger", "dragon", "rooster"],
  },
  dragon: {
    animal: "dragon",
    bestMatches: ["rat", "monkey", "rooster"],
    goodMatches: [],
    neutralMatches: ["tiger", "rabbit", "snake", "horse", "goat", "dog", "pig"],
    challengingMatches: ["ox"],
    worstMatches: ["ox", "tiger", "rabbit", "dog"],
  },
  snake: {
    animal: "snake",
    bestMatches: ["dragon", "rooster", "ox"],
    goodMatches: [],
    neutralMatches: ["rat", "tiger", "rabbit", "horse", "monkey", "dog"],
    challengingMatches: ["goat", "pig"],
    worstMatches: ["tiger", "rabbit", "snake", "goat", "pig"],
  },
  horse: {
    animal: "horse",
    bestMatches: ["tiger", "goat", "dog"],
    goodMatches: [],
    neutralMatches: ["rat", "rabbit", "dragon", "snake", "monkey", "rooster", "pig"],
    challengingMatches: ["ox"],
    worstMatches: ["rat", "ox", "rabbit", "horse"],
  },
  goat: {
    animal: "goat",
    bestMatches: ["rabbit", "horse", "pig"],
    goodMatches: [],
    neutralMatches: ["rat", "tiger", "dragon", "snake", "monkey", "rooster", "dog"],
    challengingMatches: ["ox"],
    worstMatches: ["ox", "tiger", "dog"],
  },
  monkey: {
    animal: "monkey",
    bestMatches: ["rat", "dragon"],
    goodMatches: [],
    neutralMatches: ["ox", "tiger", "rabbit", "snake", "horse", "goat", "rooster", "dog"],
    challengingMatches: ["pig"],
    worstMatches: ["tiger", "pig"],
  },
  rooster: {
    animal: "rooster",
    bestMatches: ["ox", "dragon", "snake"],
    goodMatches: [],
    neutralMatches: ["rat", "tiger", "rabbit", "horse", "goat", "monkey", "dog", "pig"],
    challengingMatches: [],
    worstMatches: ["rat", "rabbit", "horse", "goat", "rooster"],
  },
  dog: {
    animal: "dog",
    bestMatches: ["tiger", "rabbit", "horse"],
    goodMatches: [],
    neutralMatches: ["rat", "ox", "dragon", "snake", "goat", "monkey", "rooster", "pig"],
    challengingMatches: ["dragon"],
    worstMatches: ["dragon", "goat", "rooster"],
  },
  pig: {
    animal: "pig",
    bestMatches: ["tiger", "rabbit", "goat"],
    goodMatches: [],
    neutralMatches: ["rat", "ox", "dragon", "snake", "horse", "monkey", "rooster", "dog"],
    challengingMatches: ["snake", "monkey"],
    worstMatches: ["snake", "monkey"],
  },
};

const TRANSLATIONS: Record<string, any> = {
  pt: {
    harmoniousPair: "{a1} e {a2} formam um par tradicionalmente harmonioso",
    naturalHarmony: "Aproveitem a harmonia natural entre seus signos",
    conflictPair: "{a1} e {a2} podem ter conflitos naturais",
    patienceAdvice: "Trabalhem a paciência e compreensão mútua",
    compElements: "Elementos {e1} e {e2} são compatíveis",
    favorRel: "A energia dos elementos favorece a relação",
    incompElements: "Elementos {e1} e {e2} podem criar tensão",
    balanceComm: "Busquem equilíbrio através da comunicação",
    bothIntelligent: "Ambos são inteligentes - usem isso para resolver conflitos juntos",
    impulsiveWarning: "Cuidado com decisões impulsivas - pensem antes de agir",
    stubbornChallenge: "A teimosia pode ser um desafio - pratiquem a flexibilidade",
    loyaltyStrength: "A lealdade é um ponto forte desta relação",
    excellentComp: "Excelente compatibilidade entre {a1} e {a2}! Esta é uma combinação muito favorável com harmonia natural.",
    goodComp: "Boa compatibilidade entre {a1} e {a2}. Há potencial para uma relação harmoniosa com algum esforço.",
    modComp: "Compatibilidade moderada entre {a1} e {a2}. Requer trabalho mútuo para manter a harmonia.",
    challComp: "Compatibilidade desafiadora entre {a1} e {a2}. Não é impossível, mas requer paciência e compreensão."
  },
  en: {
    harmoniousPair: "{a1} and {a2} form a traditionally harmonious pair",
    naturalHarmony: "Enjoy the natural harmony between your signs",
    conflictPair: "{a1} and {a2} may have natural conflicts",
    patienceAdvice: "Work on patience and mutual understanding",
    compElements: "Elements {e1} and {e2} are compatible",
    favorRel: "The energy of the elements favors the relationship",
    incompElements: "Elements {e1} and {e2} can create tension",
    balanceComm: "Seek balance through communication",
    bothIntelligent: "Both are intelligent - use this to solve conflicts together",
    impulsiveWarning: "Beware of impulsive decisions - think before acting",
    stubbornChallenge: "Stubbornness can be a challenge - practice flexibility",
    loyaltyStrength: "Loyalty is a strong point of this relationship",
    excellentComp: "Excellent compatibility between {a1} and {a2}! This is a very favorable combination with natural harmony.",
    goodComp: "Good compatibility between {a1} and {a2}. There is potential for a harmonious relationship with some effort.",
    modComp: "Moderate compatibility between {a1} and {a2}. Requires mutual work to maintain harmony.",
    challComp: "Challenging compatibility between {a1} and {a2}. Not impossible, but requires patience and understanding."
  },
  es: {
    harmoniousPair: "{a1} y {a2} forman una pareja tradicionalmente armoniosa",
    naturalHarmony: "Disfruten de la armonía natural entre sus signos",
    conflictPair: "{a1} y {a2} pueden tener conflictos naturales",
    patienceAdvice: "Trabajen en la paciencia y el entendimiento mutuo",
    compElements: "Elementos {e1} y {e2} son compatibles",
    favorRel: "La energía de los elementos favorece la relación",
    incompElements: "Elementos {e1} y {e2} pueden crear tensión",
    balanceComm: "Busquen el equilibrio a través de la comunicación",
    bothIntelligent: "Ambos son inteligentes - úsenlo para resolver conflictos juntos",
    impulsiveWarning: "Cuidado con las decisiones impulsivas - piensen antes de actuar",
    stubbornChallenge: "La terquedad puede ser un desafío - practiquen la flexibilidad",
    loyaltyStrength: "La lealtad es un punto fuerte de esta relación",
    excellentComp: "¡Excelente compatibilidad entre {a1} y {a2}! Esta es una combinación muy favorable con armonía natural.",
    goodComp: "Buena compatibilidad entre {a1} y {a2}. Hay potencial para una relación armoniosa con algo de esfuerzo.",
    modComp: "Compatibilidad moderada entre {a1} y {a2}. Requiere trabajo mutuo para mantener la armonía.",
    challComp: "Compatibilidad desafiante entre {a1} y {a2}. No es imposible, pero requiere paciencia y comprensión."
  },
  hi: {
    harmoniousPair: "{a1} और {a2} एक पारंपरिक रूप से सामंजस्यपूर्ण जोड़ी बनाते हैं",
    naturalHarmony: "अपने संकेतों के बीच प्राकृतिक सद्भाव का आनंद लें",
    conflictPair: "{a1} और {a2} में प्राकृतिक संघर्ष हो सकता है",
    patienceAdvice: "धैर्य और आपसी समझ पर काम करें",
    compElements: "तत्व {e1} और {e2} अनुकूल हैं",
    favorRel: "तत्वों की ऊर्जा संबंध का पक्ष लेती है",
    incompElements: "तत्व {e1} और {e2} तनाव पैदा कर सकते हैं",
    balanceComm: "संचार के माध्यम से संतुलन खोजें",
    bothIntelligent: "दोनों बुद्धिमान हैं - संघर्षों को एक साथ हल करने के लिए इसका उपयोग करें",
    impulsiveWarning: "आवेगी निर्णयों से सावधान रहें - कार्य करने से पहले सोचें",
    stubbornChallenge: "जिद्दीपन एक चुनौती हो सकती है - लचीलेपन का अभ्यास करें",
    loyaltyStrength: "वफादारी इस रिश्ते का एक मजबूत बिंदु है",
    excellentComp: "{a1} और {a2} के बीच उत्कृष्ट अनुकूलता! यह प्राकृतिक सद्भाव के साथ एक बहुत ही अनुकूल संयोजन है।",
    goodComp: "{a1} और {a2} के बीच अच्छी अनुकूलता। कुछ प्रयास के साथ सामंजस्यपूर्ण संबंध की क्षमता है।",
    modComp: "{a1} और {a2} के बीच मध्यम अनुकूलता। सद्भाव बनाए रखने के लिए आपसी कार्य की आवश्यकता है।",
    challComp: "{a1} और {a2} के बीच चुनौतीपूर्ण अनुकूलता। असंभव नहीं है, लेकिन धैर्य और समझ की आवश्यकता है।"
  }
};

function t(key: string, lang: string, params: Record<string, string> = {}): string {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
    let text = dict[key] || TRANSLATIONS.pt[key] || key;
    for (const [p, v] of Object.entries(params)) {
        text = text.replace(`{${p}}`, v);
    }
    return text;
}

export function getCompatibilityMatrix(animalName: string): CompatibilityMatrix | undefined {
  return COMPATIBILITY_MATRIX[animalName.toLowerCase()];
}

export function calculateDetailedCompatibility(
  animal1Name: string,
  animal2Name: string,
  element1?: ChineseElement,
  element2?: ChineseElement,
  lang: string = "en"
): RelationshipAdvice {
  const animal1 = CHINESE_ANIMALS.find((a) => a.name === animal1Name.toLowerCase());
  const animal2 = CHINESE_ANIMALS.find((a) => a.name === animal2Name.toLowerCase());

  if (!animal1 || !animal2) {
    throw new Error(`Animal não encontrado: ${animal1Name} ou ${animal2Name}`);
  }

  const matrix1 = COMPATIBILITY_MATRIX[animal1Name.toLowerCase()];
  const matrix2 = COMPATIBILITY_MATRIX[animal2Name.toLowerCase()];

  // Calcular scores
  let overallScore = 50;
  let loveScore = 50;
  let friendshipScore = 50;
  let businessScore = 50;

  // Compatibilidade de animais
  if (matrix1) {
    if (matrix1.bestMatches.includes(animal2Name.toLowerCase())) overallScore += 30;
    if (matrix1.goodMatches.includes(animal2Name.toLowerCase())) overallScore += 20;
    if (matrix1.challengingMatches.includes(animal2Name.toLowerCase())) overallScore -= 15;
    if (matrix1.worstMatches.includes(animal2Name.toLowerCase())) overallScore -= 25;
  }

  if (matrix2) {
    if (matrix2.bestMatches.includes(animal1Name.toLowerCase())) overallScore += 10;
    if (matrix2.worstMatches.includes(animal1Name.toLowerCase())) overallScore -= 10;
  }

  // Compatibilidade de elementos
  if (element1 && element2) {
    if (element1.compatibleElements.includes(element2.name)) {
      overallScore += 10;
      loveScore += 10;
    }
    if (element1.incompatibleElements.includes(element2.name)) {
      overallScore -= 10;
      loveScore -= 10;
    }
  }

  // Ajustar scores por tipo de relacionamento
  loveScore = Math.max(0, Math.min(100, overallScore + (animal1.compatibleWith.includes(animal2.name) ? 10 : -5)));
  friendshipScore = Math.max(0, Math.min(100, overallScore + 5));
  businessScore = Math.max(0, Math.min(100, overallScore - 5));

  // Normalizar scores
  overallScore = Math.max(0, Math.min(100, overallScore));

  const strengths: string[] = [];
  const challenges: string[] = [];
  const tips: string[] = [];

  const name1 = (animal1.displayName as any)[lang] || animal1.displayName.pt;
  const name2 = (animal2.displayName as any)[lang] || animal2.displayName.pt;

  // Gerar insights baseados na compatibilidade
  if (animal1.compatibleWith.includes(animal2.name)) {
    strengths.push(t("harmoniousPair", lang, { a1: name1, a2: name2 }));
    tips.push(t("naturalHarmony", lang));
  }

  if (animal1.incompatibleWith.includes(animal2.name)) {
    challenges.push(t("conflictPair", lang, { a1: name1, a2: name2 }));
    tips.push(t("patienceAdvice", lang));
  }

  if (element1 && element2) {
    const ename1 = (element1.displayName as any)[lang] || element1.displayName.pt;
    const ename2 = (element2.displayName as any)[lang] || element2.displayName.pt;

    if (element1.compatibleElements.includes(element2.name)) {
        strengths.push(t("compElements", lang, { e1: ename1, e2: ename2 }));
        tips.push(t("favorRel", lang));
    }

    if (element1.incompatibleElements.includes(element2.name)) {
        challenges.push(t("incompElements", lang, { e1: ename1, e2: ename2 }));
        tips.push(t("balanceComm", lang));
    }
  }

  // Adicionar dicas específicas por animal
  tips.push(...getRelationshipTips(animal1, animal2, lang));

  const advice = generateAdvice(overallScore, animal1, animal2, lang);

  return {
    animal1: name1,
    animal2: name2,
    overallScore,
    loveScore,
    friendshipScore,
    businessScore,
    strengths,
    challenges,
    advice,
    tips: tips.slice(0, 3),
  };
}

function getRelationshipTips(animal1: ChineseAnimal, animal2: ChineseAnimal, lang: string): string[] {
  const tips: string[] = [];

  const s1 = animal1.strengths.pt;
  const s2 = animal2.strengths.pt;
  const w1 = animal1.weaknesses.pt;
  const w2 = animal2.weaknesses.pt;

  // Dicas baseadas nas características dos animais (usamos PT como referência interna para comparação)
  if (s1.includes("Inteligente") && s2.includes("Inteligente")) {
    tips.push(t("bothIntelligent", lang));
  }

  if (w1.includes("Impulsivo") || w2.includes("Impulsivo")) {
    tips.push(t("impulsiveWarning", lang));
  }

  if (w1.includes("Teimoso") || w2.includes("Teimoso") || w1.includes("Teimosa") || w2.includes("Teimosa")) {
    tips.push(t("stubbornChallenge", lang));
  }

  if (s1.includes("Leal") || s2.includes("Leal")) {
    tips.push(t("loyaltyStrength", lang));
  }

  return tips;
}

function generateAdvice(score: number, animal1: ChineseAnimal, animal2: ChineseAnimal, lang: string): string {
    const name1 = (animal1.displayName as any)[lang] || animal1.displayName.pt;
    const name2 = (animal2.displayName as any)[lang] || animal2.displayName.pt;

  if (score >= 80) {
    return t("excellentComp", lang, { a1: name1, a2: name2 });
  } else if (score >= 60) {
    return t("goodComp", lang, { a1: name1, a2: name2 });
  } else if (score >= 40) {
    return t("modComp", lang, { a1: name1, a2: name2 });
  } else {
    return t("challComp", lang, { a1: name1, a2: name2 });
  }
}

export function getAllCompatibilityForAnimal(animalName: string, lang: string = "en"): RelationshipAdvice[] {
  const animal = CHINESE_ANIMALS.find((a) => a.name === animalName.toLowerCase());
  if (!animal) return [];

  return CHINESE_ANIMALS.filter((a) => a.name !== animalName).map((other) =>
    calculateDetailedCompatibility(animalName, other.name, undefined, undefined, lang)
  );
}
