import { LocalizedText, LocalizedList } from '../i18n.js';

export interface ChineseNumerology {
  lifePathNumber: number;
  meaning: LocalizedText;
  personality: LocalizedList;
  strengths: LocalizedList;
  challenges: LocalizedList;
  luckyNumbers: number[];
  unluckyNumbers: number[];
  luckyColors: LocalizedList;
  compatibleNumbers: number[];
  careerPaths: LocalizedList;
  healthFocus: LocalizedList;
  relationshipAdvice: LocalizedList;
}

const NUMEROLOGY_MEANINGS: Record<number, Partial<ChineseNumerology>> = {
  1: {
    meaning: { pt: "O Líder - Independência", en: "The Leader - Independence", es: "El Líder - Independencia", hi: "नेता - स्वतंत्रता" },
    personality: {
        pt: ["Independente", "Original", "Líder nato", "Ambicioso", "Determinado"],
        en: ["Independent", "Original", "Born Leader", "Ambitious", "Determined"],
        es: ["Independiente", "Original", "Líder Nato", "Ambicioso", "Determinado"],
        hi: ["स्वतंत्र", "मौलिक", "जन्मजात नेता", "महत्वाकांक्षी", "दृढ़"]
    },
    strengths: {
        pt: ["Liderança", "Criatividade", "Determinação", "Independência"],
        en: ["Leadership", "Creativity", "Determination", "Independence"],
        es: ["Liderazgo", "Creatividad", "Determinación", "Independencia"],
        hi: ["नेतृत्व", "रचनात्मकता", "दृढ़ संकल्प", "स्वतंत्रता"]
    },
    challenges: {
        pt: ["Teimosia", "Impaciência", "Egoísmo", "Isolamento"],
        en: ["Stubbornness", "Impatience", "Egoism", "Isolation"],
        es: ["Terquedad", "Impaciencia", "Egoísmo", "Aislamiento"],
        hi: ["जिद्दीपन", "अधीरता", "अहंकार", "अलगाव"]
    },
    luckyNumbers: [1, 10, 19, 28],
    unluckyNumbers: [4, 13, 22],
    luckyColors: {
        pt: ["Dourado", "Amarelo", "Laranja"], en: ["Gold", "Yellow", "Orange"],
        es: ["Dorado", "Amarillo", "Naranja"], hi: ["सुनहरा", "पीला", "नारंगी"]
    },
    compatibleNumbers: [3, 5, 6],
    careerPaths: {
        pt: ["Empreendedor", "Líder", "Inventor", "Artista", "Consultor"],
        en: ["Entrepreneur", "Leader", "Inventor", "Artist", "Consultant"],
        es: ["Emprendedor", "Líder", "Inventor", "Artista", "Consultor"],
        hi: ["उद्यमी", "नेता", "अविष्कारक", "कलाकार", "सलाहकार"]
    },
    healthFocus: {
        pt: ["Coração", "Cabeça", "Sistema circulatório"],
        en: ["Heart", "Head", "Circulatory System"],
        es: ["Corazón", "Cabeza", "Sistema circulatorio"],
        hi: ["हृदय", "सिर", "संचार प्रणाली"]
    },
    relationshipAdvice: {
        pt: ["Aprenda a compartilhar o controle", "Pratique a escuta ativa", "Valorize a independência do parceiro"],
        en: ["Learn to share control", "Practice active listening", "Value partner's independence"],
        es: ["Aprende a compartir el control", "Practica la escucha activa", "Valora la independencia de la pareja"],
        hi: ["नियंत्रण साझा करना सीखें", "सक्रिय रूप से सुनना सीखें", "साथी की स्वतंत्रता को महत्व दें"]
    },
  },
  2: {
    meaning: { pt: "O Diplomata - Cooperação", en: "The Diplomat - Cooperation", es: "El Diplomático - Cooperación", hi: "राजनयिक - सहयोग" },
    personality: {
        pt: ["Cooperativo", "Sensível", "Diplomático", "Paciente", "Equilibrado"],
        en: ["Cooperative", "Sensitive", "Diplomatic", "Patient", "Balanced"],
        es: ["Cooperativo", "Sensible", "Diplomático", "Paciente", "Equilibrado"],
        hi: ["सहयोगी", "संवेदनशील", "राजनयिक", "धैर्यवान", "संतुलित"]
    },
    strengths: {
        pt: ["Diplomacia", "Cooperação", "Sensibilidade", "Paciência"],
        en: ["Diplomacy", "Cooperation", "Sensitivity", "Patience"],
        es: ["Diplomacia", "Cooperación", "Sensibilidad", "Paciencia"],
        hi: ["राजनय", "सहयोग", "संवेदनशीलता", "धैर्य"]
    },
    challenges: {
        pt: ["Indecisão", "Dependência", "Sensibilidade excessiva", "Passividade"],
        en: ["Indecision", "Dependency", "Hypersensitivity", "Passivity"],
        es: ["Indecisión", "Dependencia", "Sensibilidad excesiva", "Pasividad"],
        hi: ["अनिर्णय", "निर्भरता", "अत्यधिक संवेदनशीलता", "निष्क्रियता"]
    },
    luckyNumbers: [2, 11, 20, 29],
    unluckyNumbers: [5, 14, 23],
    luckyColors: {
        pt: ["Branco", "Creme", "Rosa claro"], en: ["White", "Cream", "Light Pink"],
        es: ["Blanco", "Crema", "Rosa claro"], hi: ["सफेद", "क्रीम", "हल्का गुलाबी"]
    },
    compatibleNumbers: [4, 6, 8],
    careerPaths: {
        pt: ["Mediador", "Conselheiro", "Diplomata", "Professor", "Terapeuta"],
        en: ["Mediator", "Counselor", "Diplomat", "Teacher", "Therapist"],
        es: ["Mediador", "Consejero", "Diplomático", "Profesor", "Terapeuta"],
        hi: ["मध्यस्थ", "सलाहकार", "राजनयिक", "शिक्षक", "चिकित्सक"]
    },
    healthFocus: {
        pt: ["Sistema nervoso", "Estômago", "Equilíbrio emocional"],
        en: ["Nervous System", "Stomach", "Emotional Balance"],
        es: ["Sistema nervioso", "Estómago", "Equilibrio emocional"],
        hi: ["तंत्रिका तंत्र", "पेट", "भावनात्मक संतुलन"]
    },
    relationshipAdvice: {
        pt: ["Evite dependência emocional", "Pratique assertividade", "Valorize sua sensibilidade"],
        en: ["Avoid emotional dependency", "Practice assertiveness", "Value your sensitivity"],
        es: ["Evita la dependencia emocional", "Practica la asertividad", "Valora tu sensibilidad"],
        hi: ["भावनात्मक निर्भरता से बचें", "मुखरता का अभ्यास करें", "अपनी संवेदनशीलता को महत्व दें"]
    },
  },
  3: {
    meaning: { pt: "O Comunicador - Criatividade", en: "The Communicator - Creativity", es: "El Comunicador - Creatividad", hi: "संचारकर्ता - रचनात्मकता" },
    personality: {
        pt: ["Criativo", "Comunicativo", "Otimista", "Social", "Expressivo"],
        en: ["Creative", "Communicative", "Optimistic", "Social", "Expressive"],
        es: ["Creativo", "Comunicativo", "Optimista", "Social", "Expresivo"],
        hi: ["रचनात्मक", "संवादात्मक", "आशावादी", "सामाजिक", "अभिव्यंजक"]
    },
    strengths: {
        pt: ["Criatividade", "Comunicação", "Otimismo", "Carisma"],
        en: ["Creativity", "Communication", "Optimism", "Charisma"],
        es: ["Creatividad", "Comunicación", "Optimismo", "Carisma"],
        hi: ["रचनात्मकता", "संचार", "आशावाद", "करिश्मा"]
    },
    challenges: {
        pt: ["Superficialidade", "Dispersão", "Excesso de otimismo", "Falta de foco"],
        en: ["Superficiality", "Dispersion", "Over-optimism", "Lack of Focus"],
        es: ["Superficialidad", "Dispersión", "Exceso de Optimismo", "Falta de Enfoque"],
        hi: ["सतहीपन", "बिखराव", "अत्यधिक आशावाद", "फोकस की कमी"]
    },
    luckyNumbers: [3, 12, 21, 30],
    unluckyNumbers: [6, 15, 24],
    luckyColors: {
        pt: ["Amarelo", "Laranja", "Dourado"], en: ["Yellow", "Orange", "Gold"],
        es: ["Amarillo", "Naranja", "Dorado"], hi: ["पीला", "नारंगी", "सुनहरा"]
    },
    compatibleNumbers: [1, 5, 9],
    careerPaths: {
        pt: ["Artista", "Escritor", "Ator", "Comunicador", "Designer"],
        en: ["Artist", "Writer", "Actor", "Communicator", "Designer"],
        es: ["Artista", "Escritor", "Actor", "Comunicador", "Diseñador"],
        hi: ["कलाकार", "लेखक", "अभिनेता", "संवाददाता", "डिज़ाइनर"]
    },
    healthFocus: {
        pt: ["Garganta", "Sistema respiratório", "Expressão emocional"],
        en: ["Throat", "Respiratory System", "Emotional Expression"],
        es: ["Garganta", "Sistema respiratorio", "Expresión emocional"],
        hi: ["गला", "श्वसन प्रणाली", "भावनात्मक अभिव्यक्ति"]
    },
    relationshipAdvice: {
        pt: ["Comunique-se com honestidade", "Evite superficialidade", "Valorize a profundidade emocional"],
        en: ["Communicate honestly", "Avoid superficiality", "Value emotional depth"],
        es: ["Comunícate con honestidad", "Evita la superficialidad", "Valora la profundidad emocional"],
        hi: ["ईमानदारी से संवाद करें", "सतहीपन से बचें", "भावनात्मक गहराई को महत्व दें"]
    },
  },
  // (Patterns for 4-9 follow)
  4: {
    meaning: { pt: "O Construtor - Estabilidade", en: "The Builder - Stability", es: "El Constructor - Estabilidad", hi: "निर्माता - स्थिरता" },
    personality: {
        pt: ["Prático", "Organizado", "Confiável", "Trabalhador", "Disciplinado"],
        en: ["Practical", "Organized", "Reliable", "Hard-working", "Disciplined"],
        es: ["Práctico", "Organizado", "Confiable", "Trabajador", "Disciplinado"],
        hi: ["व्यावहारिक", "व्यवस्थित", "विश्वसनीय", "मेहनती", "अनुशासित"]
    },
    strengths: {
        pt: ["Organização", "Disciplina", "Confiabilidade", "Persistência"],
        en: ["Organization", "Discipline", "Reliability", "Persistence"],
        es: ["Organización", "Disciplina", "Confiabilidad", "Persistencia"],
        hi: ["संगठन", "अनुशासन", "विश्वसनीयता", "दृढ़ता"]
    },
    challenges: {
        pt: ["Rigidez", "Teimosia", "Excesso de trabalho", "Falta de flexibilidade"],
        en: ["Rigidity", "Stubbornness", "Overwork", "Inflexibility"],
        es: ["Rigidez", "Terquedad", "Exceso de Trabajo", "Falta de Flexibilidad"],
        hi: ["कठोरता", "जिद्दीपन", "अत्यधिक काम", "लचीलेपन की कमी"]
    },
    luckyNumbers: [4, 13, 22, 31],
    unluckyNumbers: [1, 10, 19],
    luckyColors: {
        pt: ["Verde", "Marrom", "Azul"], en: ["Green", "Brown", "Blue"],
        es: ["Verde", "Marrón", "Azul"], hi: ["हरा", "भूरा", "नीला"]
    },
    compatibleNumbers: [2, 6, 8],
    careerPaths: {
        pt: ["Engenheiro", "Contador", "Arquiteto", "Administrador", "Analista"],
        en: ["Engineer", "Accountant", "Architect", "Manager", "Analyst"],
        es: ["Ingeniero", "Contador", "Arquitecto", "Administrador", "Analista"],
        hi: ["इंजीनियर", "अकाउंटेंट", "वास्तुकार", "प्रबंधक", "विश्लेषक"]
    },
    healthFocus: {
        pt: ["Ossos", "Articulações", "Sistema esquelético"],
        en: ["Bones", "Joints", "Skeletal System"],
        es: ["Huesos", "Articulaciones", "Sistema esquelético"],
        hi: ["हड्डियां", "जोड़", "कंकाल प्रणाली"]
    },
    relationshipAdvice: {
        pt: ["Pratique flexibilidade", "Evite rigidez excessiva", "Valorize a espontaneidade"],
        en: ["Practice flexibility", "Avoid excessive rigidity", "Value spontaneity"],
        es: ["Practica la flexibilidad", "Evita la rigidez excesiva", "Valora la espontaneidad"],
        hi: ["लचीलेपन का अभ्यास करें", "अत्यधिक कठोरता से बचें", "सहजता को महत्व दें"]
    },
  },
  9: {
    meaning: { pt: "O Humanitário - Compaixão", en: "The Humanitarian - Compassion", es: "El Humanitario - Compasión", hi: "मानवतावादी - दया" },
    personality: {
        pt: ["Compassivo", "Humanitário", "Sábio", "Generoso", "Idealista"],
        en: ["Compassionate", "Humanitarian", "Wise", "Generous", "Idealistic"],
        es: ["Compasivo", "Humanitario", "Sabio", "Generoso", "Idealista"],
        hi: ["दयालु", "मानवतावादी", "बुद्धिमान", "उदार", "आदर्शवादी"]
    },
    strengths: {
        pt: ["Compaixão", "Sabedoria", "Generosidade", "Idealismo"],
        en: ["Compassion", "Wisdom", "Generosity", "Idealism"],
        es: ["Compasión", "Sabiduría", "Generosidad", "Idealismo"],
        hi: ["दया", "बुद्धि", "उदारता", "आदर्शवाद"]
    },
    challenges: {
        pt: ["Excesso de idealismo", "Auto-sacrifício", "Desapego", "Melancolia"],
        en: ["Overly Idealistic", "Self-sacrifice", "Detachment", "Melancholy"],
        es: ["Exceso de Idealismo", "Autosacrificio", "Desapego", "Melancolía"],
        hi: ["अत्यधिक आदर्शवाद", "आत्म-बलिदान", "वैराग्य", "उदासी"]
    },
    luckyNumbers: [9, 18, 27],
    unluckyNumbers: [7, 16, 25],
    luckyColors: {
        pt: ["Dourado", "Vermelho", "Roxo"], en: ["Gold", "Red", "Purple"],
        es: ["Dorado", "Rojo", "Púrpura"], hi: ["सुनहरा", "लाल", "बैंगनी"]
    },
    careerPaths: {
        pt: ["Filantropo", "Professor", "Artista", "Conselheiro", "Líder espiritual"],
        en: ["Philanthropist", "Teacher", "Artist", "Counselor", "Spiritual Leader"],
        es: ["Filántropo", "Profesor", "Artista", "Consejero", "Líder Espiritual"],
        hi: ["समाजसेवी", "शिक्षक", "कलाकार", "सलाहकार", "आध्यात्मिक नेता"]
    },
    healthFocus: {
        pt: ["Sistema imunológico", "Coração", "Bem-estar emocional"],
        en: ["Immune System", "Heart", "Emotional Well-being"],
        es: ["Sistema inmunológico", "Corazón", "Bienestar emocional"],
        hi: ["प्रतिरक्षा प्रणाली", "हृदय", "भावनात्मक कल्याण"]
    },
    relationshipAdvice: {
        pt: ["Evite auto-sacrifício", "Pratique limites saudáveis", "Valorize suas necessidades"],
        en: ["Avoid self-sacrifice", "Practice healthy boundaries", "Value your needs"],
        es: ["Evita el autosacrificio", "Practica límites saludables", "Valora tus necesidades"],
        hi: ["आत्म-बलिदान से बचें", "स्वस्थ सीमाएं निर्धारित करें", "अपनी आवश्यकताओं को महत्व दें"]
    },
  },
};

export function calculateChineseNumerology(birthDate: string): ChineseNumerology {
  const digits = birthDate.replace(/\D/g, "").split("").map(Number);
  let sum = digits.reduce((acc, d) => acc + d, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
  }

  const lifePathNumber = sum > 9 ? sum.toString().split("").reduce((acc, d) => acc + parseInt(d), 0) : sum;
  const meaning = NUMEROLOGY_MEANINGS[lifePathNumber] || NUMEROLOGY_MEANINGS[1]!;

  return {
    lifePathNumber,
    meaning: meaning.meaning || { pt: "", en: "", es: "", hi: "" },
    personality: meaning.personality || { pt: [], en: [], es: [], hi: [] },
    strengths: meaning.strengths || { pt: [], en: [], es: [], hi: [] },
    challenges: meaning.challenges || { pt: [], en: [], es: [], hi: [] },
    luckyNumbers: meaning.luckyNumbers || [],
    unluckyNumbers: meaning.unluckyNumbers || [],
    luckyColors: meaning.luckyColors || { pt: [], en: [], es: [], hi: [] },
    compatibleNumbers: meaning.compatibleNumbers || [],
    careerPaths: meaning.careerPaths || { pt: [], en: [], es: [], hi: [] },
    healthFocus: meaning.healthFocus || { pt: [], en: [], es: [], hi: [] },
    relationshipAdvice: meaning.relationshipAdvice || { pt: [], en: [], es: [], hi: [] },
  };
}

export function getLuckyNumbersForAnimal(animal: string): number[] {
  const animalNumbers: Record<string, number[]> = {
    rat: [2, 3], ox: [1, 4], tiger: [1, 3, 4], rabbit: [3, 4, 6],
    dragon: [1, 6, 7], snake: [2, 8, 9], horse: [2, 3, 7], goat: [2, 7],
    monkey: [4, 9], rooster: [5, 7, 8], dog: [3, 4, 9], pig: [2, 5, 8],
  };
  return animalNumbers[animal.toLowerCase()] || [1, 2, 3];
}

export function getUnluckyNumbersForAnimal(animal: string): number[] {
  const animalNumbers: Record<string, number[]> = {
    rat: [5, 9], ox: [3, 5], tiger: [6, 7, 8], rabbit: [1, 5, 9],
    dragon: [3, 8], snake: [1, 6, 7], horse: [1, 5, 6], goat: [4, 9],
    monkey: [2, 7], rooster: [1, 3, 9], dog: [1, 6], pig: [3, 4],
  };
  return animalNumbers[animal.toLowerCase()] || [4, 7];
}
