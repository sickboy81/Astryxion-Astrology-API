import { LocalizedText, LocalizedList } from '../i18n.js';

export interface YinYangAnalysis {
  yinScore: number;
  yangScore: number;
  balance: "yin-dominant" | "yang-dominant" | "balanced";
  description: LocalizedText;
  recommendations: LocalizedList;
  healthImplications: LocalizedList;
  personalityTraits: LocalizedList;
  careerImplications: LocalizedList;
  relationshipImplications: LocalizedList;
}

export function analyzeYinYang(birthYear: number, birthMonth: number, birthDay: number): YinYangAnalysis {
  const yearYin = birthYear % 2 === 0;
  const monthYin = birthMonth % 2 === 0;
  const dayYin = birthDay % 2 === 0;

  let yinScore = 0;
  let yangScore = 0;

  if (yearYin) yinScore += 40; else yangScore += 40;
  if (monthYin) yinScore += 30; else yangScore += 30;
  if (dayYin) yinScore += 30; else yangScore += 30;

  const balance: YinYangAnalysis["balance"] =
    Math.abs(yinScore - yangScore) <= 10 ? "balanced" :
    yinScore > yangScore ? "yin-dominant" : "yang-dominant";

  const descriptions: Record<string, LocalizedText> = {
    "yin-dominant": {
        pt: "Sua energia é predominantemente Yin - receptiva, intuitiva e reflexiva.",
        en: "Your energy is predominantly Yin - receptive, intuitive and reflective.",
        es: "Tu energía es predominantemente Yin - receptiva, intuitiva y reflexiva.",
        hi: "आपकी ऊर्जा मुख्य रूप से यिन है - ग्रहणशील, सहज और चिंतनशील।"
    },
    "yang-dominant": {
        pt: "Sua energia é predominantemente Yang - ativa, expressiva e dinâmica.",
        en: "Your energy is predominantly Yang - active, expressive and dynamic.",
        es: "Tu energía es predominantemente Yang - activa, expresiva y dinámica.",
        hi: "आपकी ऊर्जा मुख्य रूप से यांग है - सक्रिय, अभिव्यंजक और गतिशील।"
    },
    "balanced": {
        pt: "Sua energia Yin e Yang está equilibrada - harmonia entre receptividade e ação.",
        en: "Your Yin and Yang energy is balanced - harmony between receptivity and action.",
        es: "Tu energía Yin y Yang está equilibrada - armonía entre receptividad y acción.",
        hi: "आपकी यिन और यांग ऊर्जा संतुलित है - ग्रहणशीलता और क्रिया के बीच सद्भाव।"
    },
  };

  const recommendations: Record<string, LocalizedList> = {
    "yin-dominant": {
        pt: ["Pratique exercícios físicos regulares", "Socialize mais", "Estabeleça metas claras"],
        en: ["Practice regular physical exercise", "Socialize more", "Establish clear goals"],
        es: ["Practica ejercicio físico regular", "Socializa más", "Establece metas claras"],
        hi: ["नियमित शारीरिक व्यायाम करें", "अधिक मेलजोल बढ़ाएं", "स्पष्ट लक्ष्य निर्धारित करें"]
    },
    "yang-dominant": {
        pt: ["Pratique meditação e mindfulness", "Reserve tempo para reflexão", "Evite excesso de atividade"],
        en: ["Practice meditation and mindfulness", "Set time for reflection", "Avoid over-activity"],
        es: ["Practica meditación y mindfulness", "Reserva tiempo para la reflexión", "Evita el exceso de actividad"],
        hi: ["ध्यान और माइंडफुलनेस का अभ्यास करें", "चिंतन के लिए समय निकालें", "अत्यधिक गतिविधि से बचें"]
    },
    "balanced": {
        pt: ["Mantenha o equilíbrio entre atividade e descanso", "Continue praticando exercícios e meditação"],
        en: ["Maintain balance between activity and rest", "Keep practicing both exercise and meditation"],
        es: ["Mantén el equilibrio entre actividad y descanso", "Sigue practicando tanto ejercicio como meditación"],
        hi: ["गतिविधि और विश्राम के बीच संतुलन बनाए रखें", "व्यायाम और ध्यान दोनों का अभ्यास जारी रखें"]
    },
  };

  const healthImplications: Record<string, LocalizedList> = {
    "yin-dominant": {
        pt: ["Tendência a frio nas extremidades", "Beneficia-se de alimentos quentes"],
        en: ["Tendency for cold extremities", "Benefits from warm foods"],
        es: ["Tendencia a frío en las extremidades", "Se beneficia de alimentos calientes"],
        hi: ["अंगों में ठंडक की प्रवृत्ति", "गर्म खाद्य पदार्थों से लाभ"]
    },
    "yang-dominant": {
        pt: ["Tendência a calor excessivo", "Beneficia-se de alimentos frescos"],
        en: ["Tendency for excessive heat", "Benefits from fresh foods"],
        es: ["Tendencia al calor excesivo", "Se beneficia de alimentos frescos"],
        hi: ["अत्यधिक गर्मी की प्रवृत्ति", "ताजा खाद्य पदार्थों से लाभ"]
    },
    "balanced": {
        pt: ["Saúde geralmente estável", "Prevenção é sua melhor estratégia"],
        en: ["Generally stable health", "Prevention is your best strategy"],
        es: ["Salud generalmente estable", "La prevención es tu mejor estrategia"],
        hi: ["सामान्य रूप से स्थिर स्वास्थ्य", "निवारण आपकी सर्वोत्तम रणनीति है"]
    },
  };

  const personalityTraits: Record<string, LocalizedList> = {
    "yin-dominant": {
        pt: ["Intuitivo", "Sensível", "Reflexivo", "Paciente"],
        en: ["Intuitive", "Sensitive", "Reflective", "Patient"],
        es: ["Intuitivo", "Sensible", "Reflexivo", "Paciente"],
        hi: ["सहज", "संवेदनशील", "चिंतनशील", "धैर्यवान"]
    },
    "yang-dominant": {
        pt: ["Ativo", "Assertivo", "Dinâmico", "Líder"],
        en: ["Active", "Assertive", "Dynamic", "Leader"],
        es: ["Activo", "Asertivo", "Dinámico", "Líder"],
        hi: ["सक्रिय", "मुखर", "गतिशील", "नेता"]
    },
    "balanced": {
        pt: ["Adaptável", "Equilibrado", "Versátil", "Harmonioso"],
        en: ["Adaptable", "Balanced", "Versatile", "Harmonious"],
        es: ["Adaptable", "Equilibrado", "Versátil", "Armonioso"],
        hi: ["अनुकूलनीय", "संतुलित", "बहुमुखी", "सद्भावपूर्ण"]
    },
  };

  const careerImplications: Record<string, LocalizedList> = {
    "yin-dominant": {
        pt: ["Pesquisa", "Arte", "Conselho", "Escrita"],
        en: ["Research", "Art", "Counseling", "Writing"],
        es: ["Investigación", "Arte", "Consejería", "Escritura"],
        hi: ["अनुसंधान", "कला", "परामर्श", "लेखन"]
    },
    "yang-dominant": {
        pt: ["Liderança", "Vendas", "Esportes", "Empreendedorismo"],
        en: ["Leadership", "Sales", "Sports", "Entrepreneurship"],
        es: ["Liderazgo", "Ventas", "Deportes", "Emprendimiento"],
        hi: ["नेतृत्व", "बिक्री", "खेल", "उद्यमिता"]
    },
    "balanced": {
        pt: ["Mediação", "Ensino", "Consultoria", "Gestão de projetos"],
        en: ["Mediation", "Teaching", "Consulting", "Project Management"],
        es: ["Mediación", "Enseñanza", "Consultoría", "Gestión de Proyectos"],
        hi: ["मध्यस्थता", "शिक्षण", "परामर्श", "परियोजना प्रबंधन"]
    },
  };

  const relationshipImplications: Record<string, LocalizedList> = {
    "yin-dominant": {
        pt: ["Parceiros Yang complementam bem", "Avoid dependência emocional"],
        en: ["Yang partners complement well", "Avoid emotional dependency"],
        es: ["Las parejas Yang complementan bien", "Evita la dependencia emocional"],
        hi: ["यांग साथी अच्छी तरह से पूरक होते हैं", "भावनात्मक निर्भरता से बचें"]
    },
    "yang-dominant": {
        pt: ["Parceiros Yin trazem equilíbrio", "Pratique escuta ativa"],
        en: ["Yin partners bring balance", "Practice active listening"],
        es: ["Las parejas Yin traen equilibrio", "Practica la escucha activa"],
        hi: ["यिन साथी संतुलन लाते हैं", "सक्रिय रूप से सुनने का अभ्यास करें"]
    },
    "balanced": {
        pt: ["Compatível com diversos perfis", "Mantenha equilíbrio"],
        en: ["Compatible with diverse profiles", "Maintain balance"],
        es: ["Compatible con diversos perfiles", "Manten el equilibrio"],
        hi: ["विविध प्रोफाइलों के साथ संगत", "संतुलन बनाए रखें"]
    },
  };

  return {
    yinScore,
    yangScore,
    balance,
    description: descriptions[balance],
    recommendations: recommendations[balance],
    healthImplications: healthImplications[balance],
    personalityTraits: personalityTraits[balance],
    careerImplications: careerImplications[balance],
    relationshipImplications: relationshipImplications[balance],
  };
}

export function getYinYangForYear(year: number): "yin" | "yang" {
  return year % 2 === 0 ? "yin" : "yang";
}

export function getYinYangForAnimal(animal: string): "yin" | "yang" {
  const yangAnimals = ["rat", "tiger", "dragon", "horse", "monkey", "dog"];
  return yangAnimals.includes(animal.toLowerCase()) ? "yang" : "yin";
}
