/**
 * PDF Content Generator
 * Gera análises astrológicas ricas para inclusão nos PDFs
 */

import crypto from "node:crypto";
import {
  ZODIAC_SIGNS,
  SIGN_ALIASES,
  SIGN_ELEMENTS,
  SIGN_MODALITIES,
  SIGN_RULER_PLANET_KEY,
  ELEMENT_COMPAT,
  LUCKY_COLORS,
  LUCKY_STONES,
  LUCKY_NUMBERS,
  FAVORABLE_HOURS,
} from "../data/constants.js";
import {
  ACTIONS_LOC,
  WATCHOUTS_LOC,
} from "../data/horoscope-data.js";
import {
  getLoveText,
  getHealthText,
  getCareerText,
  getFinanceText,
} from "../data/horoscope/western-texts.js";
import { getTranslations } from "../i18n.js";
import {
  TRANSIT_INFLUENCES,
  getMoonPhaseName,
  getMoonIllumination,
} from "../services/astronomy.service.js";

export interface PlanetData {
  name: string;
  sign: string;
  longitude: number;
  house?: number;
  retrograde: boolean;
}

export interface HouseData {
  number: number;
  sign: string;
  longitude: number;
}

export interface PDFContent {
  signProfile: {
    name: string;
    elementKey: string;
    element: string;
    modality: string;
    ruler: string;
    description: string;
    strengths: string[];
    challenges: string[];
    cosmicCounsel: string;
    loveStyle: string;
  };
  moonPhase: {
    phase: string;
    influence: string;
  };
  luckyData: {
    colors: string[];
    stones: string[];
    numbers: number[];
    favorableHours: string[];
  };
  loveAnalysis: {
    title: string;
    summary: string;
    tip: string;
    highlights: string[];
  };
  careerAnalysis: {
    title: string;
    summary: string;
    tip: string;
    highlights: string[];
  };
  healthAnalysis: {
    title: string;
    summary: string;
    tip: string;
  };
  dailyAdvice: {
    action: string;
    affirmation: string;
  };
  planetAnalyses: {
    planet: string;
    sign: string;
    house: number;
    strength: string;
    interpretation: string;
  }[];
}

export const TRANSLATIONS: Record<string, any> = {
  en: {
    love: "Love & Relationships",
    career: "Career & Ambition",
    health: "Vitality & Wellness",
    finance: "Prosperity & Wealth",
    signs: {
      aries: "Aries", taurus: "Taurus", gemini: "Gemini", cancer: "Cancer",
      leo: "Leo", virgo: "Virgo", libra: "Libra", scorpio: "Scorpio",
      sagittarius: "Sagittarius", capricorn: "Capricorn", aquarius: "Aquarius", pisces: "Pisces"
    },
    planets: {
      sun: "Sun", moon: "Moon", mercury: "Mercury", venus: "Venus", mars: "Mars",
      jupiter: "Jupiter", saturn: "Saturn", uranus: "Uranus", neptune: "Neptune", pluto: "Pluto"
    },
    elements: { fire: "Fire", earth: "Earth", air: "Air", water: "Water" },
    modalities: { cardinal: "Cardinal", fixed: "Fixed", mutable: "Mutable" }
  },
  pt: {
    love: "Amor & Relacionamentos",
    career: "Carreira & Ambição",
    health: "Vitalidade & Bem-estar",
    finance: "Prosperidade & Riqueza",
    signs: {
      aries: "Áries", taurus: "Touro", gemini: "Gêmeos", cancer: "Câncer",
      leo: "Leão", virgo: "Virgem", libra: "Libra", scorpio: "Escorpião",
      sagittarius: "Sagitário", capricorn: "Capricórnio", aquarius: "Aquário", pisces: "Peixes"
    },
    planets: {
      sun: "Sol", moon: "Lua", mercury: "Mercúrio", venus: "Vênus", mars: "Marte",
      jupiter: "Júpiter", saturn: "Saturno", uranus: "Urano", neptune: "Netuno", pluto: "Plutão"
    },
    elements: { fire: "Fogo", earth: "Terra", air: "Ar", water: "Água" },
    modalities: { cardinal: "Cardinal", fixed: "Fixo", mutable: "Mutável" }
  },
  es: {
    love: "Amor y Relaciones",
    career: "Carrera y Ambición",
    health: "Vitalidad y Bienestar",
    finance: "Prosperidad y Riqueza",
    signs: {
      aries: "Aries", taurus: "Tauro", gemini: "Géminis", cancer: "Cáncer",
      leo: "Leo", virgo: "Virgo", libra: "Libra", scorpio: "Escorpio",
      sagittarius: "Sagitario", capricorn: "Capricornio", aquarius: "Acuario", pisces: "Piscis"
    },
    planets: {
      sun: "Sol", moon: "Luna", mercury: "Mercurio", venus: "Venus", mars: "Marte",
      jupiter: "Júpiter", saturn: "Saturno", uranus: "Urano", neptune: "Netuno", pluto: "Plutón"
    },
    elements: { fire: "Fuego", earth: "Tierra", air: "Aire", water: "Agua" },
    modalities: { cardinal: "Cardinal", fixed: "Fijo", mutable: "Mutable" }
  },
  hi: {
    love: "प्रेम और संबंध",
    career: "करियर और महत्वाकांक्षा",
    health: "जीवन शक्ति और कल्याण",
    finance: "समृद्धि और धन",
    signs: {
      aries: "मेष", taurus: "वृषभ", gemini: "मिथुन", cancer: "कर्क",
      leo: "सिंह", virgo: "कन्या", libra: "तुला", scorpio: "वृश्चिक",
      sagittarius: "धनु", capricorn: "मकर", aquarius: "कुंभ", pisces: "मीन"
    },
    planets: {
      sun: "सूर्य", moon: "चंद्रमा", mercury: "बुध", venus: "शुक्र", mars: "मंगल",
      jupiter: "बृहस्पति", saturn: "शनि", uranus: "अरुण", neptune: "वरुण", pluto: "यम"
    },
    elements: { fire: "अग्नि", earth: "पृथ्वी", air: "वायु", water: "जल" },
    modalities: { cardinal: "चर", fixed: "स्थिर", mutable: "द्विस्वभाव" }
  }
};

export const SIGN_PROFILES: Record<string, any> = {
  aries: {
    en: {
      description: "Aries is the sign of the cosmic pioneer and the spark of life. As the first sign of the zodiac, you possess an innate courage and a vibrant energy that pushes you to conquer new territories. Your nature is direct, honest, and filled with a passion that doesn't know the meaning of the word 'impossible'.\n\nWhile your impulsiveness is your driving force, your challenge is learning that true strength also resides in patience. When you align your willpower with a higher purpose, you become a natural leader who inspires others to find their own fire. Your life is an invitation to action and authentic self-expression.",
      loveStyle: "In love, you are the passionate conqueror. You seek a relationship that is as dynamic and honest as you are, valuing spontaneity and the thrill of the chase. You need a partner who can keep up with your pace and respect your independence. For you, love is a shared victory and a constant adventure.",
      careerStyle: "You thrive in roles that require leadership, initiative, and immediate action. Entrepreneurship, sports, emergency services, and project management are fields where your pioneering spirit can shine. You need challenges that test your limits and environments where you can be the first to open new paths.",
      cosmicCounsel: "Your fire is meant to light the way, not burn the bridges. Use your courage to build, and you'll find the world at your feet.",
      strengths: ["Corageous", "Determined", "Confident", "Enthusiastic", "Optimistic", "Honest", "Passionate", "Independent"],
      challenges: ["Impatience", "Moodiness", "Short-tempered", "Impulsiveness", "Can be aggressive", "Wait-and-see is difficult"],
    },
    pt: {
      description: "Áries é o signo do pioneiro cósmico e da centelha da vida. Como o primeiro signo do zodíaco, você possui uma coragem inata e uma energia vibrante que o impulsiona a conquistar novos territórios. Sua natureza é direta, honesta e cheia de uma paixão que desconhece o significado da palavra 'impossível'.\n\nEmbora sua impulsividade seja sua força motriz, seu desafio é aprender que a verdadeira força também reside na paciência. Quando você alinha sua força de vontade com um propósito maior, torna-se um líder natural que inspira outros a encontrar seu próprio fogo. Sua vida é um convite à ação.",
      loveStyle: "No amor, você é o conquistador apaixonado. Você busca um relacionamento que seja tão dinâmico e honesto quanto você, valorizando a espontaneidade e a emoção da conquista. Você precisa de um parceiro que acompanhe seu ritmo e respeite sua independência.",
      careerStyle: "Você prospera em funções que exigem liderança, iniciativa e ação imediata. Empreendedorismo, esportes, serviços de emergência e gestão de projetos são campos onde seu espírito pioneiro brilha. Você precisa de desafios que testem seus limites.",
      cosmicCounsel: "Seu fogo foi feito para iluminar o caminho, não para queimar as pontes. Use sua coragem para construir e verá o mundo aos seus pés.",
      strengths: ["Corajoso", "Determinado", "Confiante", "Entusiasta", "Otimista", "Honesto", "Apaixonado", "Independente"],
      challenges: ["Impaciência", "Instabilidade emocional", "Temperamental", "Impulsividade", "Pode ser agressivo", "Dificuldade em esperar"],
    },
    es: {
      description: "Aries es el signo del pionero cósmico y la chispa de la vida. Como primer signo del zodíaco, posees un coraje innato y una energía vibrante que te empuja a conquistar nuevos territorios. Tu naturaleza es directa, honesta y llena de una pasión que no conoce el significado de la palabra 'imposible'.\n\nAunque tu impulsividad es tu fuerza motriz, tu desafío es aprender que la verdadera fuerza también reside en la paciencia. Cuando alineas tu fuerza de voluntad con un propósito elevado, te conviertes en un líder natural que inspira a otros a encontrar su propio fuego.",
      loveStyle: "En el amor, eres el conquistador apasionado. Buscas una relación que sea tan dinámica y honesta como tú, valorando la espontaneidad y la emoción de la conquista. Necesitas una pareja que pueda seguir tu ritmo y respetar tu independencia. Para ti, el amor es una victoria compartida.",
      careerStyle: "Sobresales en roles que requieren liderazgo, iniciativa y acción inmediata. El espíritu empresarial, los deportes, los servicios de emergencia y la gestión de proyectos son campos donde tu espíritu pionero puede brillar.",
      cosmicCounsel: "Tu fuego está destinado a iluminar el camino, no a quemar los puentes. Usa tu coraje para construir y encontrarás el mundo a tus pies.",
      strengths: ["Valiente", "Determinado", "Seguro de sí mismo", "Entusiasta", "Optimista", "Honesto", "Apasionado", "Independiente"],
      challenges: ["Impaciencia", "Temperamental", "Irascible", "Impulsividad", "Puede ser agresivo", "Dificultad para esperar"],
    },
    hi: {
      description: "मेष ब्रह्मांडीय अग्रणी और जीवन की चिंगारी की राशि है। राशि चक्र की पहली राशि के रूप में, आपके पास एक जन्मजात साहस और एक जीवंत ऊर्जा है जो आपको नए क्षेत्रों को जीतने के लिए प्रेरित करती है। आपका स्वभाव सीधा, ईमानदार और एक ऐसे जुनून से भरा है जो 'असंभव' शब्द का अर्थ नहीं जानता है।\n\nहालाँकि आपकी आवेगशीलता आपकी प्रेरक शक्ति है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक शक्ति धैर्य में भी निवास करती है। जब आप अपनी इच्छाशक्ति को एक उच्च उद्देश्य के साथ संरेखित करते हैं, तो आप एक प्राकृतिक नेता बन जाते हैं जो दूसरों को अपनी आग खोजने के लिए प्रेरित करते हैं। आपका जीवन कार्रवाई और प्रामाणिक आत्म-अभिव्यक्ति का निमंत्रण है।",
      loveStyle: "प्रेम में, आप भावुक विजेता हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो आपकी तरह ही गतिशील और ईमानदार हो, सहजता और पीछा करने के रोमांच को महत्व देता हो। आपको एक ऐसे साथी की आवश्यकता है जो आपकी गति के साथ तालमेल बिठा सके और आपकी स्वतंत्रता का सम्मान कर सके।",
      careerStyle: "आप उन भूमिकाओं में पनपते हैं जिनमें नेतृत्व, पहल और तत्काल कार्रवाई की आवश्यकता होती है। उद्यमिता, खेल, आपातकालीन सेवाएं और परियोजना प्रबंधन ऐसे क्षेत्र हैं जहाँ आपकी अग्रणी भावना चमक सकती है।",
      cosmicCounsel: "आपकी आग रास्ता दिखाने के लिए है, पुलों को जलाने के लिए नहीं। निर्माण के लिए अपने साहस का उपयोग करें, और आप दुनिया को अपने कदमों में पाएंगे।",
      strengths: ["साहसी", "दृढ़", "आत्मविश्वासी", "उत्साही", "आशावादी", "ईमानदार", "भावुक", "स्वतंत्र"],
      challenges: ["अधैर्य", "मिजाज में बदलाव", "जल्द गुस्सा होना", "आवेगशीलता", "आक्रामक हो सकते हैं", "प्रतीक्षा करना कठिन है"],
    },
  },
  taurus: {
    en: {
      description: "Taurus is the sign of the master of values and manifested beauty. Ruled by Venus, you possess a unique connection with the physical world and a capacity for persistence that ensures your success. Your nature is stable, sensual, and grounded in a realism that many find comforting and inspiring.\n\nWhile your need for security is your solid foundation, your challenge is learning to embrace change as a tool for evolution. When you use your determination to build not just material comforts but also spiritual value, you become a pillar of strength for everyone around you. Your life is an invitation to appreciate the sacredness of the present moment and the beauty of creation.",
      loveStyle: "In love, you are the loyal nourisher. You seek a stable and enduring relationship where physical touch, comfort, and shared values are the priority. You are a deeply sensual and devoted partner who values the beauty of everyday rituals. For you, love is a garden that requires patience, care, and a solid commitment to bloom.",
      careerStyle: "You excel in roles that require patience, thoroughness, and an eye for quality. Banking, real estate, interior design, gourmet cooking, and artistic craftsmanship are fields where your practical sense and appreciation for the finer things can flow. You need an environment that values consistency and rewards long-term effort.",
      cosmicCounsel: "True abundance flows from an open heart, not just a full hand. Trust that the universe provides as you cultivate your inner peace.",
      strengths: ["Reliable", "Patient", "Practical", "Devoted", "Responsible", "Stable", "Sensual", "Strong-willed"],
      challenges: ["Stubborn", "Possessive", "Uncompromising", "Hedonistic", "Can be lazy", "Resistance to change"],
    },
    pt: {
      description: "Touro é o signo do mestre dos valores e da beleza manifestada. Regido por Vênus, você possui uma conexão única com o mundo físico e uma capacidade de persistência que garante seu sucesso. Sua natureza é estável, sensual e fundamentada em um realismo que muitos consideram reconfortante.\n\nEmbora sua necessidade de segurança seja seu alicerce sólido, seu desafio é aprender a abraçar a mudança como uma ferramenta para a evolução. Quando você usa sua determinação para construir não apenas conforto material, mas também valor espiritual, torna-se um pilar de força. Sua vida é um convite para apreciar a beleza da criação.",
      loveStyle: "No amor, você é o nutridor leal. Você busca um relacionamento estável e duradouro, onde o toque físico, o conforto e os valores compartilhados sejam a prioridade. Você é um parceiro profundamente sensual e devotado que valoriza a beleza dos rituais cotidianos. Para você, o amor é um jardim que requer paciência.",
      careerStyle: "Você se destaca em papéis que exigem paciência, minuciosidade e olho para a qualidade. Bancos, imóveis, design de interiores, culinária gourmet e artesanato são campos onde seu senso prático flui. Você precisa de um ambiente que valorize a consistência.",
      cosmicCounsel: "A verdadeira abundância flui de um coração aberto, não apenas de uma mão cheia. Confie que o universo provê enquanto você cultiva sua paz interior.",
      strengths: ["Confiável", "Paciente", "Prático", "Devotado", "Responsável", "Estável", "Sensual", "Determinado"],
      challenges: ["Teimoso", "Possessivo", "Intransigente", "Hedonista", "Pode ser preguiçoso", "Resistência a mudanças"],
    },
    es: {
      description: "Tauro es el signo del maestro de los valores y la belleza manifestada. Regido por Venus, posees una conexión única con el mundo físico y una capacidad de persistencia que asegura tu éxito. Tu naturaleza es estable, sensual y se basa en un realismo que muchos encuentran reconfortante e inspirador.\n\nAunque tu necesidad de seguridad es tu base sólida, tu desafío es aprender a aceptar el cambio como una herramienta para la evolución. Cuando usas tu determinación para construir no solo comodidades materiales sino también valor espiritual, te conviertes en un pilar de fortaleza.",
      loveStyle: "En el amor, eres el proveedor leal. Buscas una relación estable y duradera donde el contacto físico, la comodidad y los valores compartidos sean la prioridad. Eres una pareja profundamente sensual y devota que valora la belleza de los rituales diarios. Para ti, el amor es un jardín que requiere paciencia.",
      careerStyle: "Sobresales en roles que requieren paciencia, minuciosidad y buen ojo para la calidad. La banca, los bienes raíces, el diseño de interiores, la cocina gourmet y la artesanía artística son campos donde tu sentido práctico puede fluir.",
      cosmicCounsel: "la verdadera abundancia fluye de un corazón abierto, no solo de una mano llena. Confía en que el universo provee mientras cultivas tu paz interior.",
      strengths: ["Confiable", "Paciente", "Práctico", "Devoto", "Responsable", "Estable", "Sensual", "De voluntad fuerte"],
      challenges: ["Obstinado", "Poseedor", "Intransigente", "Hedonista", "Puede ser perezoso", "Resistencia al cambio"],
    },
    hi: {
      description: "वृषभ मूल्यों के स्वामी और प्रकट सुंदरता की राशि है। शुक्र द्वारा शासित, आपके पास भौतिक दुनिया के साथ एक अनूठा संबंध और दृढ़ता की क्षमता है जो आपकी सफलता सुनिश्चित करती है। आपका स्वभाव स्थिर, कामुक और एक ऐसे यथार्थवाद में निहित है जिसे कई लोग आरामदायक और प्रेरक मानते हैं।\n\nहालाँकि सुरक्षा की आपकी आवश्यकता आपकी ठोस नींव है, लेकिन आपकी चुनौती बदलाव को विकास के उपकरण के रूप में अपनाना सीखना है। जब आप न केवल भौतिक सुख-सुविधाओं बल्कि आध्यात्मिक मूल्य के निर्माण के लिए भी अपने दृढ़ संकल्प का उपयोग करते हैं, तो आप अपने आस-पास के सभी लोगों के लिए ताकत का स्तंभ बन जाते हैं।",
      loveStyle: "प्रेम में, आप वफादार पोषणकर्ता हैं। आप एक स्थिर और स्थायी रिश्ते की तलाश करते हैं जहाँ शारीरिक स्पर्श, आराम और साझा मूल्य प्राथमिकता हों। आप एक गहराई से कामुक और समर्पित साथी हैं जो रोजमर्रा के अनुष्ठानों की सुंदरता को महत्व देते हैं। आपके लिए, प्रेम एक ऐसा बगीचा है जिसे खिलने के लिए धैर्य, देखभाल और ठोस प्रतिबद्धता की आवश्यकता होती है।",
      careerStyle: "आप उन भूमिकाओं में उत्कृष्टता प्राप्त करते हैं जिनमें धैर्य, पूर्णता और गुणवत्ता के प्रति नज़र रखने की आवश्यकता होती है। बैंकिंग, रियल एस्टेट, इंटीरियर डिजाइन, पेटू खाना पकाने और कलात्मक शिल्प कौशल ऐसे क्षेत्र हैं जहाँ आपकी व्यावहारिक समझ और बेहतरीन चीजों के प्रति प्रशंसा प्रवाहित हो सकती है।",
      cosmicCounsel: "सच्ची प्रचुरता एक खुले हृदय से बहती है, न कि केवल भरे हुए हाथ से। विश्वास रखें कि जैसे-जैसे आप अपनी आंतरिक शांति पैदा करते हैं, ब्रह्मांड प्रदान करता है।",
      strengths: ["विश्वसनीय", "धैर्यवान", "व्यावहारिक", "समर्पित", "जिम्मेदार", "स्थिर", "कामुक", "दृढ़ इच्छाशक्ति"],
      challenges: ["जिद्दी", "अधिकार जताने वाले", "समझौता न करने वाले", "सुखवादी", "आलसी हो सकते हैं", "परिवर्तन का विरोध"],
    },
  },
  gemini: {
    en: {
      description: "Gemini is the sign of the versatile communicator and curiosity in motion. Ruled by Mercury, you possess an agile mind that bridges worlds through language, ideas, and connections. Your nature is dual, adaptable, and perpetually young, finding wonder in the infinite possibilities of the intellect.\n\nWhile your mental flexibility is your greatest gift, your challenge is learning that true depth is found in focus and consistency. When you use your curiosity to not just gather information but to express truth, you become a bridge of understanding between people. Your life is a celebration of diversity and the power of the word to transform reality.",
      loveStyle: "In love, you are the witty explorer. You seek a relationship that is first and foremost an intellectual partnership. You value communication, mental stimulation, and a partner who can keep you curious and engaged. For you, love is a constant dialogue and a shared journey of learning and discovery.",
      careerStyle: "You thrive in roles that involve communication, networking, media, sales, and writing. Journalism, marketing, teaching, and PR are fields where your verbal agility and quick thinking are your best assets. You need an environment that offers variety and allows you to wear many hats.",
      cosmicCounsel: "The silence between your thoughts is where the real knowledge resides. Listen as much as you speak, and you will find the wisdom you seek.",
      strengths: ["Adaptable", "Outgoing", "Witty", "Intellectual", "Curious", "Communicative", "Quick-learner", "Versatile"],
      challenges: ["Nervous", "Inconsistent", "Indecisive", "Two-faced at times", "Superficiality", "Lack of focus"],
    },
    pt: {
      description: "Gêmeos é o signo do comunicador versátil e da curiosidade em movimento. Regido por Mercúrio, você possui uma mente ágil que une mundos através da linguagem, ideias e conexões. Sua natureza é dual, adaptável e perpetuamente jovem, encontrando admiração nas infinitas possibilidades do intelecto.\n\nEmbora sua flexibilidade mental seja seu maior dom, seu desafio é aprender que a verdadeira profundidade é encontrada no foco e na consistência. Quando você usa sua curiosidade para expressar a verdade, torna-se uma ponte de entendimento entre as pessoas. Sua vida é uma celebração da diversidade e do poder da palavra.",
      loveStyle: "No amor, você é o explorador espirituoso. Você busca um relacionamento que seja, acima de tudo, uma parceria intelectual. Você valoriza a comunicação, o estímulo mental e um parceiro que o mantenha curioso e engajado. Para você, o amor é um diálogo constante.",
      careerStyle: "Você prospera em papéis que envolvem comunicação, networking, mídia, vendas e escrita. Jornalismo, marketing, ensino e relações públicas são campos onde sua agilidade verbal é seu melhor trunfo. Você precisa de um ambiente que ofereça variedade.",
      cosmicCounsel: "O silêncio entre seus pensamentos é onde reside o verdadeiro conhecimento. Ouça tanto quanto fala, e encontrará a sabedoria que busca.",
      strengths: ["Adaptável", "Sociável", "Espirituoso", "Intelectual", "Curioso", "Comunicativo", "Aprende rápido", "Versátil"],
      challenges: ["Nervoso", "Inconsistente", "Indeciso", "Pode ser superficial", "Falta de foco", "Inquieto"],
    },
    es: {
      description: "Géminis es el signo del comunicador versátil y la curiosidad en movimiento. Regido por Mercurio, posees una mente ágil que une mundos a través del lenguaje, las ideas y las conexiones. Tu naturaleza es dual, adaptable y perpetuamente joven, encontrando asombro en las infinitas posibilidades del intelecto.\n\nAunque tu flexibilidad mental es tu mayor don, tu desafío es aprender que la verdadera profundidad se encuentra en el enfoque y la consistencia. Cuando usas tu curiosidad no solo para recopilar información sino para expresar la verdad, te conviertes en un puente de entendimiento entre las personas.",
      loveStyle: "En el amor, eres el explorador ingenioso. Buscas una relación que sea, ante todo, una asociación intelectual. Valoras la comunicación, la estimulación mental y una pareja que pueda mantenerte curioso. Para ti, el amor es un diálogo constante y un viaje compartido de aprendizaje.",
      careerStyle: "Sobresales en roles que involucran comunicación, redes, medios, ventas y escritura. El periodismo, el marketing, la enseñanza y las relaciones públicas son campos donde tu agilidad verbal y tu pensamiento rápido son tus mejores activos.",
      cosmicCounsel: "El silencio entre tus pensamientos es donde reside el conocimiento real. Escucha tanto como hablas, y encontrarás la sabiduría que buscas.",
      strengths: ["Adaptable", "Extrovertido", "Ingenioso", "Intelectual", "Curioso", "Comunicativo", "Aprende rápido", "Versátil"],
      challenges: ["Nervioso", "Inconsistente", "Indeciso", "Superficialidad", "Falta de enfoque", "Tendencia al chisme"],
    },
    hi: {
      description: "मिथुन बहुमुखी संचारक और गति में जिज्ञासा की राशि है। बुध द्वारा शासित, आपके पास एक फुर्तीला दिमाग है जो भाषा, विचारों और संबंधों के माध्यम से दुनिया को जोड़ता है। आपका स्वभाव दोहरा, अनुकूलनीय और सदा युवा है, जो बुद्धि की अनंत संभावनाओं में आश्चर्य ढूंढता है।\n\nहालाँकि आपकी मानसिक लचीलापन आपका सबसे बड़ा उपहार है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक गहराई फोकस और निरंतरता में पाई जाती है। जब आप अपनी जिज्ञासा का उपयोग न केवल जानकारी एकत्र करने के लिए बल्कि सत्य को व्यक्त करने के लिए करते हैं, तो आप लोगों के बीच समझ का एक पुल बन जाते हैं। आपका जीवन विविधता और वास्तविकता को बदलने के लिए शब्द की शक्ति का उत्सव है।",
      loveStyle: "प्रेम में, आप मजाकिया खोजकर्ता हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो सबसे पहले और सबसे महत्वपूर्ण एक बौद्धिक साझेदारी हो। आप संचार, मानसिक उत्तेजना और एक ऐसे साथी को महत्व देते हैं जो आपको जिज्ञासु और व्यस्त रख सके। आपके लिए, प्रेम एक निरंतर संवाद और सीखने और खोजने की एक साझा यात्रा है।",
      careerStyle: "आप उन भूमिकाओं में पनपते हैं जिनमें संचार, नेटवर्किंग, मीडिया, बिक्री और लेखन शामिल है। पत्रकारिता, विपणन, शिक्षण और जनसंपर्क ऐसे क्षेत्र हैं जहाँ आपकी मौखिक चपलता और त्वरित सोच आपकी सबसे अच्छी संपत्ति हैं। आपको एक ऐसे वातावरण की आवश्यकता है जो विविधता प्रदान करे।",
      cosmicCounsel: "आपके विचारों के बीच का मौन वह जगह है जहाँ वास्तविक ज्ञान निवास करता है। जितना आप बोलते हैं उतना ही सुनें, और आप वह ज्ञान पाएंगे जिसकी आप तलाश कर रहे हैं।",
      strengths: ["अनुकूलनीय", "मिलनसार", "मजाकिया", "बौद्धिक", "जिज्ञासु", "मिलनसार", "जल्दी सीखने वाला", "बहुमुखी"],
      challenges: ["घबराया हुआ", "असंगत", "अनिश्चित", "अस्थिर", "सतह ही होना", "फोकस की कमी"],
    },
  },
  cancer: {
    en: {
      description: "Cancer is the sign of the cosmic guardian and emotional depth. Ruled by the Moon, you possess a sensitivity that captures the unspoken and a nurturing spirit that creates 'home' wherever you go. Your nature is protective, intuitive, and deeply connected to the cycles of life and memory.\n\nWhile your emotional armor is your protection, your challenge is learning that true vulnerability is a source of immense power. When you use your intuition to heal not just yourself but the world, you become a sanctuary for those in need. Your life is an invitation to experience the profound richness of the human heart and the strength found in softness.",
      loveStyle: "In love, you are the caring protector. You seek a relationship that is a safe harbor, valuing emotional security, loyalty, and deep intimacy. You are a highly devoted and intuitive partner who can sense your loved one's needs before they are even spoken. For you, love is a spiritual bond that builds a lasting sanctuary together.",
      careerStyle: "You excel in roles that involve caretaking, hospitality, history, psychology, and real estate. Nursing, social work, therapy, education, and interior design are fields where your empathy and organizational talent shine. You thrive in environments that feel like a community and allow you to protect what is precious.",
      cosmicCounsel: "Your sensitivity is not a weakness, but a superpower. The ocean is vast and deep, but it also reflects the entire sky. Trust your inner tide.",
      strengths: ["Tenacious", "Highly imaginative", "Loyal", "Emotional", "Sympathetic", "Persuasive", "Nurturing", "Intuitive"],
      challenges: ["Moody", "Pessimistic", "Suspicious", "Insecure", "Clinging", "Can be over-sensitive"],
    },
    pt: {
      description: "Câncer é o signo do guardião cósmico e da profundidade emocional. Regido pela Lua, você possui uma sensibilidade que capta o não dito e um espírito nutridor que cria um 'lar' por onde passa. Sua natureza é protetora, intuitiva e profundamente ligada aos ciclos da vida e da memória.\n\nEmbora sua armadura emocional seja sua proteção, seu desafio é aprender que a verdadeira vulnerabilidade é uma fonte de imenso poder. Quando você usa sua intuição para curar, torna-se um santuário para quem precisa. Sua vida é um convite para experimentar a riqueza profunda do coração humano.",
      loveStyle: "No amor, você é o protetor carinhoso. Você busca um relacionamento que seja um porto seguro, valorizando a segurança emocional, a lealdade e a intimidade profunda. Você é um parceiro altamente devotado e intuitivo que sente as necessidades do outro. Para você, o amor é um vínculo espiritual.",
      careerStyle: "Você se destaca em papéis que envolvem cuidado, hospitalidade, história, psicologia e imóveis. Enfermagem, serviço social, terapia, educação e design de interiores são campos onde sua empatia brilha. Você prospera em ambientes comunitários.",
      cosmicCounsel: "Sua sensibilidade não é uma fraqueza, mas um superpoder. O oceano é vasto e profundo, mas também reflete todo o céu. Confie na sua maré interior.",
      strengths: ["Tenaz", "Altamente imaginativo", "Leal", "Emocional", "Simpático", "Persuasivo", "Nutridor", "Intuitivo"],
      challenges: ["Temperamental", "Pessimista", "Suspeito", "Inseguro", "Apegado demais", "Pode ser hipersensível"],
    },
    es: {
      description: "Cáncer es el signo del guardián cósmico y la profundidad emocional. Regido por la Luna, posees una sensibilidad que captura lo no dicho y un espíritu nutritivo que crea un 'hogar' dondequiera que vayas. Tu naturaleza es protectora, intuitiva y está profundamente conectada con los ciclos de la vida y la memoria.\n\nAunque tu armadura emocional es tu protección, tu desafío es aprender que la verdadera vulnerabilidad es una fuente de inmenso poder. Cuando usas tu intuición para sanar no solo a ti mismo sino al mundo, te conviertes en un santuario.",
      loveStyle: "En el amor, eres el protector cariñoso. Buscas una relación que sea un puerto seguro, valorando la seguridad emocional, la lealtad y la intimidad profunda. Eres una pareja muy devota e intuitiva que puede sentir las necesidades de su ser querido. Para ti, el amor es un vínculo espiritual.",
      careerStyle: "Sobresales en roles que involucran cuidado, hospitalidad, historia, psicología y bienes raíces. La enfermería, el trabajo social, la terapia, la educación y el diseño de interiores son campos donde tu empatía brilla.",
      cosmicCounsel: "Tu sensibilidad no es una debilidad, sino un superpoder. El océano es vasto y profundo, pero también refleja todo el cielo. Confía en tu marea interior.",
      strengths: ["Tenaz", "Altamente imaginativo", "Leal", "Emocional", "Simpático", "Persuasivo", "Nutritivo", "Intuitivo"],
      challenges: ["Temperamental", "Pesimista", "Suspicaz", "Inseguro", "Apegado", "Puede ser hipersensible"],
    },
    hi: {
      description: "कर्क ब्रह्मांडीय संरक्षक और भावनात्मक गहराई की राशि है। चंद्रमा द्वारा शासित, आपके पास एक संवेदनशीलता है जो अनकहे को पकड़ती है और एक पोषण करने वाली भावना है जो आप जहाँ भी जाते हैं 'घर' बनाती है। आपका स्वभाव सुरक्षात्मक, सहज और जीवन और स्मृति के चक्रों से गहराई से जुड़ा हुआ है।\n\nहालाँकि आपका भावनात्मक कवच आपकी सुरक्षा है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक भेद्यता अत्यधिक शक्ति का स्रोत है। जब आप न केवल खुद को बल्कि दुनिया को ठीक करने के लिए अपने अंतर्ज्ञान का उपयोग करते हैं, तो आप उन लोगों के लिए एक अभयारण्य बन जाते हैं जिन्हें ज़रूरत है। आपका जीवन मानव हृदय की गहरी समृद्धि और कोमलता में पाई जाने वाली ताकत का अनुभव करने का निमंत्रण है।",
      loveStyle: "प्रेम में, आप देखभाल करने वाले रक्षक हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो एक सुरक्षित बंदरगाह हो, जो भावनात्मक सुरक्षा, वफादारी और गहरी अंतरंगता को महत्व देता हो। आप एक अत्यधिक समर्पित और सहज साथी हैं जो अपने प्रियजन की जरूरतों को बोलने से पहले ही महसूस कर सकते हैं। आपके लिए, प्रेम एक आध्यात्मिक बंधन है जो एक साथ मिलकर एक स्थायी अभयारण्य बनाता है।",
      careerStyle: "आप उन भूमिकाओं में उत्कृष्टता प्राप्त करते हैं जिनमें देखभाल, आतिथ्य, इतिहास, मनोविज्ञान और रियल एस्टेट शामिल हैं। नर्सिंग, सामाजिक कार्य, चिकित्सा, शिक्षा और इंटीरियर डिजाइन ऐसे क्षेत्र हैं जहाँ सहानुभूति और संगठनात्मक प्रतिभा चमकती है।",
      cosmicCounsel: "आपकी संवेदनशीलता कमजोरी नहीं, बल्कि महाशक्ति है। महासागर विशाल और गहरा है, लेकिन यह पूरे आकाश को भी दर्शाता है। अपने आंतरिक ज्वार पर भरोसा करें।",
      strengths: ["दृढ़", "अत्यधिक कल्पनाशील", "वफादार", "भावनात्मक", "सहानुभूतिपूर्ण", "प्रेरक", "पोषण करने वाला", "सहज ज्ञानी"],
      challenges: ["मिजाज में बदलाव", "निराशावादी", "संदिग्ध", "असुरक्षित", "चिपकू", "अति संवेदनशील हो सकते हैं"],
    },
  },
  leo: {
    en: {
      description: "Leo is the sign of the cosmic sovereign and the solar heart. Ruled by the Sun, you possess a natural charisma and a creative fire that illuminates everything around you. Your nature is generous, courageous, and filled with a nobility that stems from an authentic sense of self-worth and purpose.\n\nWhile your need for recognition is your fuel, your challenge is learning that true authority comes from the capacity to serve and empower others. When you align your heart with the collective good, you become a leader whose light doesn't just shine but warms and heals. Your life is a performance meant to inspire courage and celebrate the joy of existence.",
      loveStyle: "In love, you are the grand romantic. You seek a relationship that is as vibrant and loyal as you are, valuing grand gestures, passion, and mutual admiration. You are a deeply generous and protective partner who wants to share the center stage with your loved one. For you, love is a royal union and a constant celebration of life.",
      careerStyle: "You shine in roles that involve leadership, creative expression, performing arts, and management. Acting, teaching, public relations, executive leadership, and luxury industries are fields where your presence and vision have maximum impact. You need a role that allows you to be seen and where you can leave a distinct mark.",
      cosmicCounsel: "True royalty is a quality of the soul, not a crown on the head. Shine so that others can find their own light in your presence.",
      strengths: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful", "Humorous", "Magnanimous", "Noble"],
      challenges: ["Arrogant", "Stubborn", "Self-centered", "Lazy", "Inflexible", "Need for constant validation"],
    },
    pt: {
      description: "Leão é o signo do soberano cósmico e do coração solar. Regido pelo Sol, você possui um carisma natural e um fogo criativo que ilumina tudo ao seu redor. Sua natureza é generosa, corajosa e cheia de uma nobreza que nasce de um senso autêntico de valor próprio e propósito.\n\nEmbora sua necessidade de reconhecimento seja seu combustível, seu desafio é aprender que a verdadeira autoridade vem da capacidade de servir e fortalecer os outros. Quando você alinha seu coração com o bem comum, torna-se um líder cuja luz aquece e cura. Sua vida é uma celebração da alegria de existir.",
      loveStyle: "No amor, você é o grande romântico. Você busca um relacionamento que seja vibrante e leal, valorizando grandes gestos e admiração mútua. Você é um parceiro generoso que quer brilhar ao lado de quem ama. Para você, o amor é uma celebração constante.",
      careerStyle: "Você brilha em papéis que envolvem liderança, expressão criativa e gestão. Atuação, ensino, relações públicas e cargos de liderança executiva são campos onde sua presença tem impacto. Você precisa de uma função que permita deixar sua marca única.",
      cosmicCounsel: "A verdadeira realeza é uma qualidade da alma, não uma coroa na cabeça. Brilhe de forma que os outros encontrem sua própria luz em sua presença.",
      strengths: ["Criativo", "Apaixonado", "Generoso", "Cordial", "Alegre", "Humorado", "Magnânimo", "Nobre"],
      challenges: ["Arrogante", "Teimoso", "Egocêntrico", "Preguiçoso", "Inflexível", "Necessidade de validação"],
    },
    es: {
      description: "Leo es el signo del soberano cósmico y el corazón solar. Regido por el Sol, posees un carisma natural y un fuego creativo que ilumina todo a tu alrededor. Tu naturaleza es generosa, valiente y está llena de una nobleza que brota de un sentido auténtico de autoestima y propósito.\n\nAunque tu necesidad de reconocimiento es tu combustible, tu desafío es aprender que la verdadera autoridad proviene de la capacidad de servir y empoderar a los demás. Cuando alineas tu corazón con el bien colectivo, te conviertes en un líder cuya luz no solo brilla sino que calienta y sana.",
      loveStyle: "En el amor, eres el gran romántico. Buscas una relación que sea tan vibrante y leal como tú, valorando los grandes gestos, la pasión y la admiración mutua. Eres una pareja profundamente generosa y protectora que quiere compartir el escenario principal con su ser querido.",
      careerStyle: "Brillas en roles que involucran liderazgo, expresión creativa, artes escénicas y gestión. La actuación, la enseñanza, las relaciones públicas, el liderazgo ejecutivo y las industrias de lujo son campos donde tu presencia y visión tienen el máximo impacto.",
      cosmicCounsel: "La verdadera realeza es una cualidad del alma, no una corona en la cabeza. Brilla para que otros puedan encontrar su propia luz en tu presencia.",
      strengths: ["Creativo", "Apasionado", "Generoso", "De gran corazón", "Alegre", "Humorístico", "Magnánimo", "Noble"],
      challenges: ["Arrogante", "Obstinado", "Egocéntrico", "Perezoso", "Inflexible", "Necesidad de validación constante"],
    },
    hi: {
      description: "सिंह ब्रह्मांडीय संप्रभु और सौर हृदय की राशि है। सूर्य द्वारा शासित, आपके पास एक प्राकृतिक आकर्षण और एक रचनात्मक आग है जो आपके आस-पास की हर चीज़ को रोशन करती है। आपका स्वभाव उदार, साहसी और एक ऐसी कुलीनता से भरा है जो आत्म-सम्मान और उद्देश्य की प्रामाणिक भावना से उत्पन्न होती है।\n\nहालाँकि पहचान की आपकी आवश्यकता आपका ईंधन है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक अधिकार दूसरों की सेवा करने और उन्हें सशक्त बनाने की क्षमता से आता है। जब आप अपने हृदय को सामूहिक कल्याण के साथ संरेखित करते हैं, तो आप एक ऐसे नेता बन जाते हैं जिसकी रोशनी न केवल चमकती है बल्कि गर्म करती है और ठीक भी करती है। आपका जीवन साहस को प्रेरित करने और अस्तित्व के आनंद का जश्न मनाने के लिए एक प्रदर्शन है।",
      loveStyle: "प्रेम में, आप भव्य रोमांटिक हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो आपकी तरह ही जीवंत और वफादार हो, जो भव्य इशारों, जुनून और आपसी प्रशंसा को महत्व देता हो। आप एक अत्यधिक समर्पित और सहज साथी हैं जो अपने प्रियजन के साथ मुख्य मंच साझा करना चाहते हैं। आपके लिए, प्रेम एक शाही मिलन और जीवन का निरंतर उत्सव है।",
      careerStyle: "आप उन भूमिकाओं में चमकते हैं जिनमें नेतृत्व, रचनात्मक अभिव्यक्ति, प्रदर्शन कला और प्रबंधन शामिल हैं। अभिनय, शिक्षण, जनसंपर्क, कार्यकारी नेतृत्व और विलासिता उद्योग ऐसे क्षेत्र हैं जहाँ आपकी उपस्थिति और दृष्टि का अधिकतम प्रभाव पड़ता है।",
      cosmicCounsel: "असली रॉयल्टी आत्मा का एक गुण है, न कि सिर पर मुकुट। चमकें ताकि दूसरे आपकी उपस्थिति में अपनी रोशनी पा सकें।",
      strengths: ["रचनात्मक", "भावुक", "उदार", "सहृदय", "हंसमुख", "मजाकिया", "उदारमना", "कुलीन"],
      challenges: ["अहंकारी", "जिद्दी", "आत्मकेंद्रित", "आलसी", "कठोर", "निरंतर मान्यता की आवश्यकता"],
    },
  },
  virgo: {
    en: {
      description: "Virgo is the sign of the cosmic artisan and sacred discernment. Ruled by Mercury, you possess an analytical mind and a dedication to service that aims for excellence in every detail. Your nature is precise, helpful, and grounded in a deep desire to bring order, health, and efficiency to the world.\n\nWhile your perfectionism is your drive for improvement, your challenge is learning to see the beauty in imperfection and the grace in progress. When you align your critical skills with compassion and humility, you become a master of practical wisdom whose work heals and refines the environment. Your life is an invitation to celebrate the sacredness of work and the power of small acts to create great changes.",
      loveStyle: "In love, you are the devoted assistant of the heart. You seek a relationship built on practical support, intellectual compatibility, and a shared commitment to growth. You express your love through acts of service and attention to the small details that make life better for your partner. For you, love is a daily practice of care and refinement.",
      careerStyle: "You excel in roles that require precision, analysis, organization, and service. Healthcare, research, data analysis, editing, crafts, and wellness industries are fields where your attention to detail and efficiency are unmatched. You thrive in environments that value high standards and logical processes.",
      cosmicCounsel: "Order begins within. Peace is not just the absence of clutter, but the presence of purpose. Trust the process of life.",
      strengths: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical", "Meticulous", "Intelligent", "Reliable"],
      challenges: ["Shyness", "Worry", "Over-critical of self and others", "All work and no play", "Can be judgmental", "Struggle with messy situations"],
    },
    pt: {
      description: "Virgem é o signo do artesão cósmico e do discernimento sagrado. Regido por Mercúrio, você possui uma mente analítica e uma dedicação ao serviço que busca a excelência em cada detalhe. Sua natureza é precisa, prestativa e fundamentada em um profundo desejo de trazer ordem e eficiência ao mundo.\n\nEmbora seu perfeccionismo seja seu motor para a melhoria, seu desafio é aprender a ver a beleza na imperfeição. Quando você alinha suas habilidades críticas com compaixão e humildade, torna-se um mestre da sabedoria prática. Sua vida é um convite para celebrar o poder dos pequenos atos.",
      loveStyle: "No amor, você é o assistente devotado do coração. Você busca um relacionamento construído sobre apoio prático, compatibilidade intelectual e compromisso compartilhado com o crescimento. Você expressa seu amor através de atos de serviço e atenção aos detalhes. Para você, o amor é uma prática diária.",
      careerStyle: "Você se destaca em papéis que exigem precisão, análise e organização. Saúde, pesquisa, análise de dados, edição e bem-estar são campos onde sua atenção aos detalhes é inigualável. Você prospera em ambientes que valorizam altos padrões.",
      cosmicCounsel: "A ordem começa por dentro. A paz não é apenas a ausência de desordem, mas a presença de propósito. Confie no processo da vida.",
      strengths: ["Leal", "Analítico", "Gentil", "Trabalhador", "Prático", "Meticuloso", "Inteligente", "Confiável"],
      challenges: ["Timidez", "Preocupação excessiva", "Autocrítica severa", "Dificuldade em relaxar", "Pode ser julgador", "Dificuldade com o caos"],
    },
    es: {
      description: "Virgo es el signo del artesano cósmico y el discernimiento sagrado. Regido por Mercurio, posees una mente analítica y una dedicación al servicio que busca la excelencia en cada detalle. Tu naturaleza es precisa, servicial y se basa en un profundo deseo de traer orden, salud y eficiencia al mundo.\n\nAunque tu perfeccionismo es tu motor de mejora, tu desafío es aprender a ver la belleza en la imperfección y la gracia en el progreso. Cuando alineas tus habilidades críticas con la compasión y la humildad, te conviertes en un maestro de la sabiduría práctica.",
      loveStyle: "En el amor, eres el asistente devoto del corazón. Buscas una relación basada en el apoyo práctico, la compatibilidad intelectual y un compromiso compartido con el crecimiento. Expresas tu amor a través de actos de servicio y atención a los pequeños detalles. Para ti, el amor es una práctica diaria.",
      careerStyle: "Sobresales en roles que requieren precisión, análisis, organización y servicio. El cuidado de la salud, la investigación, el análisis de datos, la edición, las artesanías y las industrias del bienestar son campos donde tu atención al detalle es inigualable.",
      cosmicCounsel: "El orden comienza en el interior. La paz no es solo la ausencia de desorden, sino la presencia de propósito. Confía en el proceso de la vida.",
      strengths: ["Leal", "Analítico", "Amable", "Trabajador", "Práctico", "Meticuloso", "Inteligente", "Confiable"],
      challenges: ["Timidez", "Preocupación", "Excesivamente crítico", "Todo trabajo y nada de juego", "Puede ser juicioso", "Dificultad con el desorden"],
    },
    hi: {
      description: "कन्या ब्रह्मांडीय शिल्पकार और पवित्र विवेक की राशि है। बुध द्वारा शासित, आपके पास एक विश्लेषणात्मक दिमाग और सेवा के प्रति समर्पण है जिसका उद्देश्य हर विस्तार में उत्कृष्टता प्राप्त करना है। आपका स्वभाव सटीक, मददगार और दुनिया में व्यवस्था, स्वास्थ्य और दक्षता लाने की गहरी इच्छा में निहित है।\n\nहालाँकि आपका पूर्णतावाद सुधार के लिए आपका जुनून है, लेकिन आपकी चुनौती अपूर्णता में सुंदरता और प्रगति में अनुग्रह देखना सीखना है। जब आप अपने आलोचनात्मक कौशल को करुणा और विनम्रता के साथ संरेखित करते हैं, तो आप व्यावहारिक ज्ञान के स्वामी बन जाते हैं जिनका काम वातावरण को ठीक करता है और परिष्कृत करता है।",
      loveStyle: "प्रेम में, आप हृदय के समर्पित सहायक हैं। आप व्यावहारिक समर्थन, बौद्धिक अनुकूलता और विकास के प्रति साझा प्रतिबद्धता पर आधारित रिश्ते की तलाश करते हैं। आप अपने साथी के जीवन को बेहतर बनाने वाले छोटे विवरणों पर ध्यान देकर और सेवा के कार्यों के माध्यम से अपना प्रेम व्यक्त करते हैं। आपके लिए, प्रेम देखभाल और परिष्करण का एक दैनिक अभ्यास है।",
      careerStyle: "आप उन भूमिकाओं में उत्कृष्टता प्राप्त करते हैं जिनमें सटीकता, विश्लेषण, संगठन और सेवा की आवश्यकता होती है। स्वास्थ्य सेवा, अनुसंधान, डेटा विश्लेषण, संपादन, शिल्प और कल्याण उद्योग ऐसे क्षेत्र हैं जहाँ विस्तार और दक्षता पर आपका ध्यान बेजोड़ है।",
      cosmicCounsel: "व्यवस्था भीतर से शुरू होती है। शांति केवल अव्यवस्था की अनुपस्थिति नहीं है, बल्कि उद्देश्य की उपस्थिति है। जीवन की प्रक्रिया पर भरोसा रखें।",
      strengths: ["वफादार", "विश्लेषणात्मक", "दयालु", "मेहनती", "व्यावहारिक", "परिश्रमी", "बुद्धिमान", "विश्वसनीय"],
      challenges: ["शर्मीलापन", "चिंता", "स्वयं और दूसरों के प्रति अत्यधिक आलोचनात्मक", "केवल काम और कोई खेल नहीं", "आलोचनात्मक हो सकते हैं", "अव्यवस्थित स्थितियों से संघर्ष"],
    },
  },
  libra: {
    en: {
      description: "Libra is the sign of the cosmic diplomat and aesthetic balance. Ruled by Venus, you possess an innate sense of harmony and a longing for justice that leads you to build bridges between opposites. Your nature is social, refined, and deeply concerned with the quality of your interactions and the beauty of your surroundings.\n\nWhile your search for balance is your noble quest, your challenge is learning that true harmony sometimes requires the courage to face conflict and make difficult choices. When you find the equilibrium between your needs and those of others, you become a master of partnership and a visionary of peace. Your life is an invitation to celebrate the art of relationship and the power of grace.",
      loveStyle: "In love, you are the idealist of relationship. You seek a partnership that is a true meeting of equals, valuing harmony, romance, and intellectual companionship. You are a deeply charming and considerate partner who strives to create a life of beauty and shared balance. For you, love is an exquisite dance and a commitment to mutual understanding.",
      careerStyle: "You shine in roles that involve negotiation, mediation, legal systems, diplomacy, and the arts. Law, public relations, fashion, interior design, and counseling are fields where your sense of fairness and aesthetic eye are your best assets. You thrive in professional environments that are harmonious and value teamwork.",
      cosmicCounsel: "Balance is not a destination, but a way of moving. Find the center in your own heart, and you will never lose your way.",
      strengths: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social", "Refined", "Harmonious", "Idealistic"],
      challenges: ["Indecisive", "Avoids confrontations", "Will carry a grudge", "Self-pitying", "Can be superficial", "Struggle with taking a stand"],
    },
    pt: {
      description: "Libra é o signo do diplomata cósmico e do equilíbrio estético. Regido por Vênus, você possui um senso inato de harmonia e um anseio por justiça que o leva a construir pontes entre opostos. Sua natureza é social, refinada e profundamente preocupada com a qualidade de suas interações.\n\nEmbora sua busca por equilíbrio seja sua nobre missão, seu desafio é aprender que a verdadeira harmonia às vezes exige a coragem de enfrentar conflitos. Quando você encontra o equilíbrio entre suas necessidades e as dos outros, torna-se um mestre da parceria. Sua vida é um convite para celebrar a arte do relacionamento.",
      loveStyle: "No amor, você é o idealista do relacionamento. Você busca uma parceria de iguais, valorizando a harmonia e o romance. Você é um parceiro charmoso e atencioso que se esforça para criar uma vida de beleza e equilíbrio compartilhado. Para você, o amor é uma dança refinada e um compromisso com o entendimento mútuo.",
      careerStyle: "Você brilha em papéis que envolvem negociação, mediação, sistemas jurídicos e artes. Direito, relações públicas, moda e aconselhamento são campos onde seu senso de justiça e olho estético são seus melhores trunfos. Você prospera em ambientes harmoniosos.",
      cosmicCounsel: "O equilíbrio não é um destino, mas uma forma de se mover. Encontre o centro em seu próprio coração e nunca perderá o caminho.",
      strengths: ["Cooperativo", "Diplomático", "Gracioso", "Justo", "Social", "Refinado", "Harmonioso", "Idealista"],
      challenges: ["Indeciso", "Evita confrontos", "Pode guardar rancor", "Autopiedade", "Pode ser superficial", "Dificuldade em tomar partido"],
    },
    es: {
      description: "Libra es el signo del diplomático cósmico y el equilibrio estético. Regido por Venus, posees un sentido innato de la armonía y un anhelo de justicia que te lleva a construir puentes entre los opuestos. Tu naturaleza es social, refinada y está profundamente preocupada por la calidad de tus interacciones y la belleza de tu entorno.\n\nAunque tu búsqueda del equilibrio es tu noble misión, tu desafío es aprender que la verdadera armonía a veces requiere el coraje de enfrentar el conflicto y tomar decisiones difíciles. Cuando encuentras el equilibrio entre tus necesidades y las de los demás, te conviertes en un maestro de la asociación y un visionario de la paz.",
      loveStyle: "En el amor, eres el idealista de la relación. Buscas una asociación que sea un verdadero encuentro de iguales, valorando la armonía, el romance y el compañerismo intelectual. Eres una pareja profundamente encantadora y considerada que se esfuerza por crear una vida de belleza y equilibrio compartido.",
      careerStyle: "Brillas en roles que involucran negociación, mediación, sistemas legales, diplomacia y las artes. El derecho, las relaciones públicas, la moda, el diseño de interiores y la consejería son campos donde tu sentido de la justicia y tu ojo estético son tus mejores activos.",
      cosmicCounsel: "El equilibrio no es un destino, sino una forma de moverse. Encuentra el centro en tu propio corazón, y nunca perderás el camino.",
      strengths: ["Cooperativo", "Diplomático", "Gracioso", "Imparcial", "Social", "Refinado", "Armonioso", "Idealista"],
      challenges: ["Indeciso", "Evita confrontaciones", "Guardará rencor", "Autocompasivo", "Puede ser superficial", "Dificultad para tomar una posición"],
    },
    hi: {
      description: "तुला ब्रह्मांडीय राजनयिक और सौंदर्य संतुलन की राशि है। शुक्र द्वारा शासित, आपके पास सद्भाव की एक जन्मजात समझ और न्याय की लालसा है जो आपको विपरीत परिस्थितियों के बीच पुल बनाने के लिए प्रेरित करती है। आपका स्वभाव सामाजिक, परिष्कृत और आपकी बातचीत की गुणवत्ता और आपके परिवेश की सुंदरता के प्रति गहराई से चिंतित है।\n\nहालाँकि संतुलन की आपकी खोज आपकी नेक खोज है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक सद्भाव के लिए कभी-कभी संघर्ष का सामना करने और कठिन चुनाव करने के साहस की आवश्यकता होती है। जब आप अपनी जरूरतों और दूसरों की जरूरतों के बीच संतुलन पाते हैं, तो आप साझेदारी के स्वामी और शांति के दूरदर्शी बन जाते हैं। आपका जीवन रिश्ते की कला और अनुग्रह की शक्ति का जश्न मनाने का निमंत्रण है।",
      loveStyle: "प्रेम में, आप रिश्ते के आदर्शवादी हैं। आप ऐसी साझेदारी चाहते हैं जो समानता का सच्चा मिलन हो, जहाँ सौहार्द, प्रेम और बौद्धिक साथित्व को महत्व मिले। आप एक आकर्षक और विचारशील साथी हैं जो सुंदरता और साझा संतुलन की जीवन रचने का प्रयास करते हैं। आपके लिए प्रेम एक उत्कृष्ट नृत्य और पारस्परिक समझ की प्रतिबद्धता है।",
      careerStyle: "आप संवाद, मध्यस्थता, कानूनी व्यवस्था, कूटनीति और कला से जुड़े क्षेत्रों में उभरते हैं। कानून, लोक संबंध, फैशन, इंटीरियर डिज़ाइन और परामर्श ऐसे क्षेत्र हैं जहाँ न्याय की भावना और सौंदर्य दृष्टि आपके सर्वोत्तम गुण हैं। आप सौहार्दपूर्ण पेशेवर माहौल में पनपते हैं जो टीम कार्य को महत्व देते हैं।",
      cosmicCounsel: "संतुलन कोई गंतव्य नहीं, चलने का एक तरीका है। अपने हृदय में केंद्र खोजें, और आप कभी रास्ता नहीं खोएंगे।",
      strengths: ["सहयोगी", "राजनयिक", "सुशील", "न्यायप्रिय", "सामाजिक", "परिष्कृत", "सामंजस्यपूर्ण", "आदर्शवादी"],
      challenges: ["निर्णय में दुविधा", "टकराव से बचने वाले", "राजनयी पालेंगे", "आत्मदया", "सतही हो सकते हैं", "स्थिति लेने में कठिनाई"],
    },
  },
  scorpio: {
    en: {
      description: "Scorpio is the sign of the cosmic alchemist and psychological depth. Ruled by Pluto and Mars, you possess a transformative energy and an intensity that seeks the truth beneath every surface. Your nature is passionate, resilient, and intuitive, finding strength in the darkest and most complex mysteries of existence.\n\nWhile your intensity is your armor, your challenge is learning that true power resides in vulnerability and the capacity to forgive. When you use your depth to empower others instead of controlling them, you become a powerful force of healing and regeneration. Your life is an initiation into the mysteries of the soul and authentic transformation.",
      loveStyle: "In love, you are the deep soul seeker. You seek a relationship that is total, intense, and deeply transformative, valuing emotional honesty, trust, and absolute loyalty. You are a very passionate and protective partner who wants to know every part of your beloved's soul. For you, love is spiritual alchemy.",
      careerStyle: "You excel in roles that involve investigation, research, strategy, and deep transformation. Psychology, medicine, finance, crisis management, and investigative journalism are fields where your focus and intuitive perception are incomparable. You thrive in professional environments that require depth and allow you to uncover hidden truths.",
      cosmicCounsel: "Transformation begins when you release the need to control. Trust the fire of your own heart; it purifies and renews. Silence is your strength.",
      strengths: ["Resourceful", "Brave", "Passionate", "Stubborn", "A true friend", "Intuitive", "Resilient", "Strategic"],
      challenges: ["Distrusting", "Jealous", "Secretive", "Violent at times", "Will carry a grudge", "May be manipulative or controlling"],
    },
    pt: {
      description: "Escorpião é o signo do alquimista cósmico e da profundidade psicológica. Regido por Plutão e Marte, você possui uma energia transformadora e uma intensidade que busca a verdade sob cada superfície. Sua natureza é apaixonada, resiliente e intuitiva, encontrando força nos mistérios complexos da existência.\n\nEmbora sua intensidade seja sua armadura, seu desafio é aprender que o verdadeiro poder reside na vulnerabilidade e na capacidade de perdoar. Quando você usa sua profundidade para fortalecer os outros, torna-se uma força de cura e regeneração. Sua vida é uma iniciação nos mistérios da alma e da transformação autêntica.",
      loveStyle: "No amor, você é o buscador de almas profundo. Você busca um relacionamento total, intenso e transformador, valorizando a honestidade emocional e a lealdade absoluta. Você é um parceiro apaixonado que quer conhecer cada parte da alma do outro. Para você, o amor é uma alquimia espiritual.",
      careerStyle: "Você se destaca em papéis que envolvem investigação, pesquisa, estratégia e transformação profunda. Psicologia, medicina, finanças e gestão de crises são campos onde seu foco é incomparável. Você prospera em ambientes que exigem profundidade.",
      cosmicCounsel: "A transformação começa quando você libera a necessidade de controlar. Confie no fogo do seu próprio coração; ele purifica e renova. O silêncio é sua força.",
      strengths: ["Engenhoso", "Corajoso", "Apaixonado", "Obstinado", "Amigo fiel", "Intuitivo", "Resiliente", "Estratégico"],
      challenges: ["Desconfiado", "Ciumento", "Reservado", "Pode ser vingativo", "Guarda rancor", "Pode ser controlador"],
    },
    es: {
      description: "Escorpio es el signo del alquimista cósmico y la profundidad psicológica. Regido por Plutón y Marte, posees una energía transformadora y una intensidad que busca la verdad debajo de cada superficie. Tu naturaleza es apasionada, resistente y profundamente intuitiva, encontrando fuerza en los misterios más oscuros y complejos de la existencia.\n\nAunque tu intensidad es tu armadura, tu desafío es aprender que el verdadero poder reside en la vulnerabilidad y la capacidad de perdonar. Cuando usas tu profundidad para empoderar a los demás en lugar de controlarlos, te conviertes en una poderosa fuerza de sanación y regeneración.",
      loveStyle: "En el amor, eres el buscador de almas profundo. Buscas una relación que sea total, intensa y profundamente transformadora, valorando la honestidad emocional, la confianza y la lealtad absoluta. Eres una pareja muy apasionada y protectora que quiere conocer cada parte del alma de su ser querido.",
      careerStyle: "Sobresales en roles que involucran investigación, investigación, estrategia y transformación profunda. La psicología, la medicina, las finanzas, la gestión de crisis y el periodismo de investigación son campos donde tu enfoque y percepción intuitiva son incomparables.",
      cosmicCounsel: "La transformación comienza cuando liberas la necesidad de controlar. Confía en el fuego de tu propio corazón; purifica y renueva. El silencio es tu fuerza.",
      strengths: ["Ingenioso", "Valiente", "Apasionado", "Obstinado", "Un verdadero amigo", "Intuitivo", "Resistente", "Estratégico"],
      challenges: ["Desconfiado", "Celoso", "Reservado", "Violento a veces", "Guardará rencor", "Puede ser manipulador o controlador"],
    },
    hi: {
      description: "वृश्चिक ब्रह्मांडीय कीमियागर और मनोवैज्ञानिक गहराई की राशि है। प्लूटो और मंगल द्वारा शासित, आपके पास एक परिवर्तनकारी ऊर्जा और एक तीव्रता है जो हर सतह के नीचे की सच्चाई को खोजती है। आपका स्वभाव भावुक, लचीला और गहरा सहज ज्ञान युक्त है, जो अस्तित्व के गहरे और अधिक जटिल रहस्यों में ताकत पाता है।\n\nहालाँकि आपकी तीव्रता आपका कवच है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक शक्ति भेद्यता और क्षमा करने की क्षमता में निवास करती है। जब आप दूसरों को नियंत्रित करने के बजाय उन्हें सशक्त बनाने के लिए अपनी गहराई का उपयोग करते हैं, तो आप उपचार और उत्थान की एक शक्तिशाली शक्ति बन जाते हैं। आपका जीवन आत्मा के रहस्यों और प्रामाणिक परिवर्तन की शक्ति में एक दीक्षा है।",
      loveStyle: "प्रेम में, आप गहरे आत्म-खोजकर्ता हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो कुल, तीव्र और गहराई से परिवर्तनकारी हो, जो भावनात्मक ईमानदारी, विश्वास और पूर्ण वफादारी को महत्व देता हो। आप एक अत्यधिक भावुक और सुरक्षात्मक साथी हैं जो अपने प्रियजन की आत्मा के हर हिस्से को जानना चाहते हैं। आपके लिए, प्रेम एक आध्यात्मिक कीमिया है और एक ऐसी प्रतिबद्धता है जो कोई आधे-अधूरे उपाय नहीं जानती।",
      careerStyle: "आप उन भूमिकाओं में उत्कृष्टता प्राप्त करते हैं जिनमें जांच, अनुसंधान, रणनीति और गहरा बदलाव शामिल होता है। मनोविज्ञान, चिकित्सा, वित्त, संकट प्रबंधन और खोजी पत्रकारिता ऐसे क्षेत्र हैं जहाँ आपका ध्यान और सहज बोध अतुलनीय है।",
      cosmicCounsel: "बदलाव तब शुरू होता है जब आप नियंत्रित करने की आवश्यकता को छोड़ देते हैं। अपने हृदय की अग्नि पर भरोसा करें; यह शुद्ध और नवीनीकृत करती है। मौन आपकी शक्ति है।",
      strengths: ["संसाधन संपन्न", "बहादुर", "भावुक", "जिद्दी", "एक सच्चा दोस्त", "सहज ज्ञानी", "लचीला", "रणनीतिक"],
      challenges: ["अविश्वासी", "ईर्ष्यालु", "गुप्त", "कभी-कभी हिंसक", "नाराजगी पालेगा", "कभी-कभी हेरफेर करने वाले", "अधिकार जताने वाले", "प्रतिशोधी"],
    },
  },
  sagittarius: {
    en: {
      description: "Sagittarius is the sign of the eternal traveler and the seeker of truth. You possess an expansive spirit that yearns for horizons beyond the ordinary, whether through physical travel or intellectual exploration. Your optimism is a contagious force, and your honesty is a breath of fresh air in a world often clouded by pretense.\n\nWhile your quest for freedom is your driving force, your challenge is learning that true expansion also requires commitment and focus. When you integrate your high ideals with concrete action, you become a visionary who not only sees the future but helps to build it. Your life is an adventure meant to be shared through your wisdom and enthusiasm.",
      loveStyle: "In love, you are the adventurous companion. You seek a relationship that is a journey of mutual discovery and intellectual growth. You need a partner who values freedom and spontaneity as much as you do. For you, love is a shared quest for meaning and joy, where both partners encourage each other to explore the best of themselves.",
      careerStyle: "You shine in roles that involve travel, philosophy, higher education, or law. International business, teaching, and outdoor professions are fields where your expansive energy can thrive. You need a mission that is bigger than yourself and an environment that offers variety and growth.",
      cosmicCounsel: "Freedom is a state of mind. Seek the truth that sets you free, but remember that the greatest journey is the return to your own heart.",
      strengths: ["Optimistic", "Honest", "Adventurous", "Philosophical", "Independent", "Enthusiastic", "Visionary", "Direct"],
      challenges: ["Tactless", "Impatient", "Over-confident", "May avoid commitment", "Restless", "Blunt"],
    },
    pt: {
      description: "Sagitário é o signo do eterno viajante e do buscador da verdade. Você possui um espírito expansivo que anseia por horizontes além do comum, seja através de viagens físicas ou exploração intelectual. Seu otimismo é uma força contagiosa e sua honestidade é um sopro de ar fresco em um mundo frequentemente nublado por fingimento.\n\nEmbora sua busca por liberdade seja sua força motriz, seu desafio é aprender que a verdadeira expansão também exige compromisso e foco. Quando você integra seus ideais elevados com ação concreta, torna-se um visionário que não apenas vê o futuro, mas ajuda a construí-lo.",
      loveStyle: "No amor, você é o companheiro de aventura. Você busca um relacionamento que seja uma jornada de descoberta mútua e crescimento intelectual. Você precisa de um parceiro que valorize a liberdade e a espontaneidade tanto quanto você. Para você, o amor é uma busca compartilhada por significado.",
      careerStyle: "Você brilha em papéis que envolvem viagens, filosofia, ensino superior ou direito. Negócios internacionais, ensino e profissões ao ar livre são campos onde sua energia expansiva pode prosperar. Você precisa de uma missão maior que você mesmo.",
      cosmicCounsel: "A liberdade é um estado de espírito. Busque a verdade que te liberta, mas lembre-se que a maior jornada é o retorno ao seu próprio coração.",
      strengths: ["Otimista", "Honesto", "Aventureiro", "Filosófico", "Independente", "Entusiasta", "Visionário", "Direto"],
      challenges: ["Sem tato", "Impaciente", "Excesso de confiança", "Pode evitar compromisso", "Inquieto", "Ríspido"],
    },
    es: {
      description: "Sagitario es el signo del eterno viajero y el buscador de la verdad. Posees un espíritu expansivo que anhela horizontes más allá de lo común, ya sea a través de viajes físicos o exploración intelectual. Tu optimismo es una fuerza contagiosa y tu honestidad es un soplo de aire fresco en un mundo a menudo nublado por las pretensiones.\n\nAunque tu búsqueda de libertad es tu fuerza motriz, tu desafío es aprender que la verdadera expansión también requiere compromiso y enfoque. Cuando integras tus altos ideales con la acción concreta, te conviertes en un visionario que no solo ve el futuro, sino que ayuda a construirlo.",
      loveStyle: "En el amor, eres el compañero aventurero. Buscas una relación que sea un viaje de descubrimiento mutuo y crecimiento intelectual. Necesitas una pareja que valore la libertad y la espontaneidad tanto como tú. Para ti, el amor es una búsqueda compartida de significado y alegría.",
      careerStyle: "Brillas en roles que involucran viajes, filosofía, educación superior o derecho. Negocios internacionales, enseñanza y profesiones al aire libre son campos donde tu energía expansiva puede prosperar. Necesitas una misión que sea más grande que tú mismo.",
      cosmicCounsel: "La libertad es un estado mental. Busca la verdad que te hace libre, pero recuerda que el viaje más grande es el regreso a tu propio corazón.",
      strengths: ["Optimista", "Honesto", "Aventurero", "Filosófico", "Independiente", "Entusiasta", "Visionario", "Directo"],
      challenges: ["Falta de tacto", "Impaciente", "Exceso de confianza", "Puede evitar el compromiso", "Inquieto", "Brusco"],
    },
    hi: {
      description: "धनु शाश्वत यात्री और सत्य के साधक की राशि है। आपके पास एक विस्तृत आत्मा है जो भौतिक यात्रा या बौद्धिक अन्वेषण के माध्यम से सामान्य से परे क्षितिज के लिए तरसती है। आपका आशावाद एक संक्रामक शक्ति है, और आपकी ईमानदारी दिखावे से घिरी दुनिया में ताजी हवा के झोंके की तरह है।\n\nहालाँकि स्वतंत्रता की आपकी खोज आपकी प्रेरक शक्ति है, लेकिन आपकी चुनौती यह सीखना है कि वास्तविक विस्तार के लिए प्रतिबद्धता और फोकस की भी आवश्यकता होती है। जब आप अपने उच्च आदर्शों को ठोस कार्रवाई के साथ एकीकृत करते हैं, तो आप एक ऐसे दूरदर्शी बन जाते हैं जो न केवल भविष्य देखता है बल्कि उसे बनाने में भी मदद करता है।",
      loveStyle: "प्रेम में, आप साहसी साथी हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो आपसी खोज और बौद्धिक विकास की यात्रा हो। आपको एक ऐसे साथी की आवश्यकता है जो आपकी तरह ही स्वतंत्रता और सहजता को महत्व देता हो। आपके लिए, प्रेम अर्थ और आनंद की एक साझा खोज है।",
      careerStyle: "आप उन भूमिकाओं में चमकते हैं जिनमें यात्रा, दर्शन, उच्च शिक्षा या कानून शामिल हैं। अंतर्राष्ट्रीय व्यवसाय, शिक्षण और आउटडोर पेशे ऐसे क्षेत्र हैं जहाँ आपकी विस्तृत ऊर्जा पनप सकती है। आपको एक ऐसे मिशन की आवश्यकता है जो आपसे बड़ा हो और एक ऐसा वातावरण जो विविधता और विकास प्रदान करे।",
      cosmicCounsel: "स्वतंत्रता मन की एक अवस्था है। उस सत्य की खोज करें जो आपको मुक्त करता है, लेकिन याद रखें कि सबसे बड़ी यात्रा आपके अपने हृदय की ओर वापसी है।",
      strengths: ["आशावादी", "ईमानदार", "साहसी", "दार्शनिक", "स्वतंत्र", "उत्साही", "दूरदर्शी", "सीधे"],
      challenges: ["बेअदब", "अधीर", "अति-आत्मविश्वासी", "प्रतिबद्धता से बच सकते हैं", "बेचैन", "रूखे"],
    },
  },
  capricorn: {
    en: {
      description: "Capricorn is the sign of the master builder and disciplined ambition. You possess a unique vision of time and a resilience that allows you to climb any mountain, no matter how steep. Your integrity and sense of duty are the foundations upon which you build your life and your legacy.\n\nWhile your focus on structure and results is your greatest strength, your challenge is learning to celebrate the peaks and valleys of life without constant self-judgment. When you allow your spirit to be as flexible as your mind is disciplined, you achieve a level of wisdom that is both profound and practical. Your life is a testament to the power of persistence and well-deserved success.",
      loveStyle: "In love, you are the committed architect. You seek a partner who values stability, long-term goals, and mutual respect. You may be cautious at first, but once you commit, you are a deeply loyal and supportive partner who builds a legacy with your loved one. For you, love is a partnership of growth and shared responsibility.",
      careerStyle: "You are the natural CEO and strategist. Business management, law, politics, administration, and architecture are fields where your discipline and vision for the long term are unparalleled. You thrive in hierarchical environments where you can earn your way to the top through merit and hard work.",
      cosmicCounsel: "Success is the shadow of character. Build your life on the values that do not wither with time, and the world will respect your height.",
      strengths: ["Disciplined", "Responsible", "Ambitious", "Patient", "Practical", "Resilient", "Loyal", "Focused"],
      challenges: ["Pessimistic", "Can be cold", "Rigid", "Workaholic", "May judge others harshly", "Emotionally reserved"],
    },
    pt: {
      description: "Capricórnio é o signo do mestre construtor e da ambição disciplinada. Você possui uma visão única do tempo e uma resiliência que lhe permite escalar qualquer montanha, não importa quão íngreme seja. Sua integridade e senso de dever são os alicerces sobre os quais você constrói sua vida e seu legado.\n\nEmbora seu foco na estrutura e nos resultados seja sua maior força, seu desafio é aprender a celebrar os picos e vales da vida sem autojulgamento constante. Quando você permite que seu espírito seja tão flexível quanto sua mente é disciplinada, atinge um nível de sabedoria profundo e prático.",
      loveStyle: "No amor, você é o arquiteto comprometido. Você busca um parceiro que valorize a estabilidade, objetivos de longo prazo e respeito mútuo. Você pode ser cauteloso no início, mas uma vez que se compromete, é um parceiro profundamente leal que constrói um legado duradouro.",
      careerStyle: "Você é o CEO e estrategista natural. Gestão de negócios, direito, política e arquitetura são campos onde sua disciplina e visão de longo prazo são incomparáveis. Você prospera em ambientes onde pode crescer através do mérito e esforço constante.",
      cosmicCounsel: "O sucesso é a sombra do caráter. Construa sua vida sobre os valores que não murcham com o tempo, e o mundo respeitará sua altura.",
      strengths: ["Disciplinado", "Responsável", "Ambicioso", "Paciente", "Prático", "Resiliente", "Leal", "Focado"],
      challenges: ["Pessimista", "Pode ser frio", "Rígido", "Viciado em trabalho", "Pode julgar severamente", "Emocionalmente reservado"],
    },
    es: {
      description: "Capricornio es el signo del maestro constructor y la ambición disciplinada. Posees una visión única del tiempo y una resistencia que te permite escalar cualquier montaña, sin importar cuán empinada sea. Tu integridad y sentido del deber son los cimientos sobre los que construyes tu vida y tu legado.\n\nAunque tu enfoque en la estructura y los resultados es tu mayor fortaleza, tu desafío es aprender a celebrar las cimas y los valles de la vida sin un juicio constante sobre ti mismo. Cuando permites que tu espíritu sea tan flexible como tu mente es disciplinada, alcanzas un nivel de sabiduría que es profundo y práctico.",
      loveStyle: "En el amor, eres el arquitecto comprometido. Buscas una pareja que valore la estabilidad, las metas a largo plazo y el respeto mutuo. Una vez que te comprometes, eres una pareja profundamente leal que construye un legado con su ser querido.",
      careerStyle: "Eres el CEO y estratega natural. La gestión empresarial, el derecho, la política, la administración y la arquitectura son campos donde tu disciplina y visión a largo plazo son inigualables. Prosperas en entornos donde puedes ganarte el camino hacia la cima.",
      cosmicCounsel: "El éxito es la sombra del carácter. Construye tu vida sobre los valores que no se marchitan con el tiempo, y el mundo respetará tu altura.",
      strengths: ["Disciplinado", "Responsable", "Ambicioso", "Paciente", "Práctico", "Resiliente", "Leal", "Enfocado"],
      challenges: ["Pesimista", "Puede ser frío", "Rígido", "Adicto al trabajo", "Puede juzgar duramente", "Emocionalmente reservado"],
    },
    hi: {
      description: "मकर मास्टर बिल्डर और अनुशासित महत्वाकांक्षा की राशि है। आपके पास समय की एक अनूठी दृष्टि और एक लचीलापन है जो आपको किसी भी पहाड़ पर चढ़ने की अनुमति देता है, चाहे वह कितना भी खड़ा क्यों न हो। आपकी सत्यनिष्ठा और कर्तव्य की भावना वे नींव हैं जिन पर आप अपना जीवन और आपकी विरासत बनाते हैं।\n\nहालाँकि संरचना और परिणामों पर आपका ध्यान आपकी सबसे बड़ी ताकत है, आपकी चुनौती निरंतर आत्म-निर्णय के बिना जीवन के शिखरों और घाटियों का जश्न मनाना सीखना है। जब आप अपनी आत्मा को उतना ही लचीला होने देते हैं जितना कि आपका दिमाग अनुशासित है, तो आप ज्ञान का एक ऐसा स्तर प्राप्त करते हैं जो गहरा और व्यावहारिक दोनों है।",
      loveStyle: "प्रेम में, आप प्रतिबद्ध वास्तुकार हैं। आप एक ऐसे रिश्ते की तलाश करते हैं जो स्थिरता, दीर्घकालिक लक्ष्यों और आपसी सम्मान को महत्व देता हो। आप शुरुआत में सतर्क हो सकते हैं, लेकिन एक बार जब आप प्रतिबद्ध हो जाते हैं, तो आप एक गहराई से वफादार और सहायक साथी होते हैं जो अपने प्रियजन के साथ एक विरासत बनाते हैं।",
      careerStyle: "आप स्वाभाविक सीईओ और रणनीतिकार हैं। व्यवसाय प्रबंधन, कानून, राजनीति, प्रशासन और वास्तुकला ऐसे क्षेत्र हैं जहाँ आपका अनुशासन और दीर्घकालिक दृष्टि अद्वितीय है। आप पदानुक्रमित वातावरण में पनपते हैं जहाँ आप योग्यता और कड़ी मेहनत के माध्यम से शीर्ष पर अपना रास्ता बना सकते हैं।",
      cosmicCounsel: "सफलता चरित्र की छाया है। अपने जीवन को उन मूल्यों पर बनाएं जो समय के साथ मुरझाते नहीं हैं, और दुनिया आपकी ऊंचाई का सम्मान करेगी।",
      strengths: ["अनुशासित", "जिम्मेदार", "महत्वाकांक्षी", "धैर्यवान", "व्यावहारिक", "लचीला", "वफादार", "केंद्रित"],
      challenges: ["निराशावादी", "ठंडे हो सकते हैं", "कठोर", "कामकाजी", "दूसरों को कठोरता से आंक सकते हैं", "भावनात्मक रूप से आरक्षित"],
    },
  },
  aquarius: {
    en: {
      description: "Aquarius is the sign of the visionary revolutionary and collective progress. Ruled by the winds of innovation, you possess a mind that lives in the future and a spirit that refuses to be limited by old structures. Your originality is not just a trait, but a contribution to the evolution of society.\n\nWhile your detachment is your armor, your challenge is learning that true progress begins with authentic human connection. When you allow your high ideals to be touched by the warmth of the heart, you become an enlightened leader who not only dreams of a better world but actively unites people to create it. Your freedom is a beacon for all who seek their own uniqueness.",
      loveStyle: "In love, you are the idealistic non-conformist. You seek a relationship that is based on friendship, intellectual equality, and shared vision. You need a partner who respects your independence and isn't afraid to join you in challenging the status quo. For you, love is a project of mutual evolution and contribution to the collective good.",
      careerStyle: "You excel in roles that involve innovation, technology, social progress, and community building. Science, IT, humanitarian work, and creative media are fields where your unique vision and original thinking can shine. You thrive in unconventional environments where individual creativity is valued and where you can impact the future.",
      cosmicCounsel: "The future is build on what we share, not just what makes us different. Connect your genius to the heart of the world.",
      strengths: ["Original", "Independent", "Humanitarian", "Intellectual", "Visionary", "Progressive", "Loyal to ideals", "Innovative"],
      challenges: ["Detached", "Rebellious", "Unpredictable", "Stiff-necked", "Can be aloof", "May avoid deep emotions"],
    },
    pt: {
      description: "Aquário é o signo do revolucionário visionário e do progresso coletivo. Regido pelos ventos da inovação, você possui uma mente que vive no futuro e um espírito que recusa ser limitado por velhas estruturas. Sua originalidade é uma contribuição para a evolução da sociedade.\n\nEmbora seu desapego seja sua armadura, seu desafio é aprender que o verdadeiro progresso começa com a conexão humana autêntica. Quando você permite que seus ideais elevados sejam tocados pelo calor do coração, torna-se um líder iluminado.",
      loveStyle: "No amor, você é o inconformista idealista. Você busca um relacionamento baseado na amizade, igualdade intelectual e visão compartilhada. Você precisa de um parceiro que respeite sua independência.",
      careerStyle: "Você se destaca em papéis que envolvem inovação, tecnologia, progresso social e construção de comunidade. Ciência, TI, trabalho humanitário e mídia criativa são campos onde sua visão única brilha.",
      cosmicCounsel: "O futuro é construído sobre o que compartilhamos, não apenas sobre o que nos diferencia. Conecte sua genialidade ao coração do mundo.",
      strengths: ["Original", "Independante", "Humanitário", "Intelectual", "Visionário", "Progressista", "Leal aos ideais", "Inovador"],
      challenges: ["Desapegado", "Rebelde", "Imprevisível", "Obstinado", "Pode ser frio", "Pode evitar emoções profundas"],
    },
    es: {
      description: "Acuario es el signo del revolucionario visionario y del progreso colectivo. Regido por los vientos de la innovación, posees una mente que vive en el futuro y un espíritu que se niega a ser limitado por las viejas estructuras. Tu originalidad no es solo un rasgo, sino una contribución a la evolución de la sociedad.\n\nAunque tu desapego es tu armadura, tu desafío es aprender que el verdadero progreso comienza con la conexión humana auténtica. Cuando permites que tus altos ideales sean tocados por la calidez del corazón, te conviertes en un líder iluminado que no solo sueña con un mundo mejor, sino que une a las personas para crearlo.",
      loveStyle: "En el amor, eres el inconformista idealista. Buscas una relación basada en la amistad, la igualdad intelectual y la visión compartida. Necesitas una pareja que respete tu independencia y no tema unirse a ti para desafiar el status quo.",
      careerStyle: "Sobresales en roles que involucran innovación, tecnología, progreso social y construcción de comunidad. La ciencia, la informática, el trabajo humanitario y los medios creativos son campos donde tu visión única y pensamiento original pueden brillar.",
      cosmicCounsel: "El futuro se construye sobre lo que compartimos, no solo sobre lo que nos hace diferentes. Conecta tu genio con el corazón del mundo.",
      strengths: ["Original", "Independiente", "Humanitario", "Intelectual", "Visionario", "Progresista", "Leal a sus ideales", "Innovador"],
      challenges: ["Desapegado", "Rebelde", "Imprevisible", "Testarudo", "Puede ser distante", "Puede evitar emociones profundas"],
    },
    hi: {
      description: "कुंभ दूरदर्शी क्रांतिकारी और सामूहिक प्रगति की राशि है। नवाचार की हवाओं द्वारा शासित, आपके पास एक ऐसा दिमाग है जो भविष्य में रहता है और एक ऐसी आत्मा जो पुरानी संरचनाओं द्वारा सीमित होने से इनकार करती है। आपकी मौलिकता केवल एक गुण नहीं है, बल्कि समाज के विकास में एक योगदान है।\n\nहालाँकि आपका अलगाव आपका कवच है, आपकी चुनौती यह सीखना है कि वास्तविक प्रगति प्रामाणिक मानवीय संबंध से शुरू होती है। जब आप अपने उच्च आदर्शों को हृदय की गर्मजोशी से छूने देते हैं, तो आप एक प्रबुद्ध नेता बन जाते हैं जो न केवल एक बेहतर दुनिया का सपना देखता है बल्कि सक्रिय रूप से इसे बनाने के लिए लोगों को एकजुट करता है।",
      loveStyle: "प्रेम में, आप एक आदर्शवादी स्वतंत्रचारी हैं। आप मित्रता, बौद्धिक समानता और साझा दृष्टि पर आधारित संबंध चाहते हैं। आपको ऐसे साथी की आवश्यकता है जो आपकी स्वतंत्रता का सम्मान करे और स्थिति को चुनौती देने में आपके साथ जुड़ने से न घबराए।",
      careerStyle: "आप उन भूमिकाओं में उत्कृष्टता प्राप्त करते हैं जिनमें नवाचार, प्रौद्योगिकी, सामाजिक प्रगति और समुदाय निर्माण शामिल है। विज्ञान, आईटी, मानवीय कार्य और रचनात्मक मीडिया ऐसे क्षेत्र हैं जहाँ आपकी अनूठी दृष्टि और मौलिक सोच चमक सकती है।",
      cosmicCounsel: "भविष्य उस पर बना है जो हम साझा करते हैं, न कि केवल उस पर जो हमें अलग बनाता है। अपनी प्रतिभा को दुनिया के दिल से जोड़ें।",
      strengths: ["मौलिक", "स्वतंत्र", "मानवतावादी", "बौद्धिक", "दूरदर्शी", "प्रगतिशील", "आदर्शों के प्रति वफादार", "अभिनव"],
      challenges: ["अलग-थलग", "विद्रोही", "अप्रत्याशित", "जिद्दी", "रूखा हो सकते हैं", "गहरी भावनाओं से बच सकते हैं"],
    },
  },
  pisces: {
    en: {
      description: "Pisces is the sign of the cosmic dreamer and infinite compassion. As a citizen of all worlds, you possess a sensitivity that captures the subtle vibrations of existence and a wisdom that transcends words. Your presence is like a healing ocean, capable of dissolution and regeneration through love and imagination.\n\nWhile your fluidity is your gift, your challenge is learning to build healthy boundaries in a world of demands. When you use your intuition as a compass and your creativity as a bridge between heights and depths, you become an artist of life who brings a touch of magic to the everyday. Your soul is a mirror of the universe in its most poetic and profound form.",
      loveStyle: "In love, you are the soulful romantic. You seek a spiritual and emotional union that is total and unconditional. You love with a depth that is rare and beautiful, often putting your partner's needs before your own. You thrive when you find someone who values your sensitivity and protects the sacred space of your connection. For you, love is a spiritual journey of shared dreams.",
      careerStyle: "You excel in roles that involve creativity, healing, spirituality, and artistic expression. Art, music, therapy, spiritual guidance, and social work are fields where your compassion and imagination can flow freely. You thrive in environments that respect your need for silence and introspection and where you can express your unique vision.",
      cosmicCounsel: "The bridge between heaven and earth is built in your heart. Trust your silence; it speaks the language of truth.",
      strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Speaks from the soul", "Imaginative", "Wise", "Empathetic"],
      challenges: ["Escapist", "Oversensitive", "Can be lazy", "Idealistic to a fault", "May struggle with reality", "Victim mentality at times"],
    },
    pt: {
      description: "Peixes é o signo do sonhador cósmico e da compaixão infinita. Como um cidadão de todos os mundos, você possui uma sensibilidade que capta as vibrações sutis da existência e uma sabedoria que transcende as palavras. Sua presença é como um oceano curativo, capaz de dissolução e regeneração através do amor e da imaginação.\n\nEmbora sua fluidez seja seu dom, seu desafio é aprender a construir limites saudáveis. Quando você usa sua intuição como bússola e sua criatividade como ponte entre alturas e profundidades, torna-se um artista da vida. Sua alma é um espelho do universo em sua forma mais poética e profunda.",
      loveStyle: "No amor, você é o romântico de alma. Você busca uma união espiritual e emocional que seja total e incondicional. Você ama com uma profundidade rara e bela, muitas vezes colocando as necessidades do parceiro acima das suas. Você prospera quando encontra alguém que valorize sua sensibilidade e proteja o espaço sagrado de sua conexão.",
      careerStyle: "Você se destaca em papéis que envolvem criatividade, cura, espiritualidade e expressão artística. Arte, música, terapia, orientação espiritual e trabalho social são campos onde sua compaixão e imaginação podem fluir livremente. Você prospera em ambientes que respeitem sua necessidade de silêncio e introspecção.",
      cosmicCounsel: "A ponte entre o céu e a terra é construída no seu coração. Confie no seu silêncio; ele fala a linguagem da verdade.",
      strengths: ["Compassivo", "Artístico", "Intuitivo", "Gentil", "Fala com a alma", "Imaginativo", "Sábio", "Empático"],
      challenges: ["Escapista", "Hipersensível", "Pode ser preguiçoso", "Idealista demais", "Dificuldade com a realidade", "Pode se vitimizar"],
    },
    es: {
      description: "Piscis es el signo del soñador cósmico y la compasión infinita. Como ciudadano de todos los mundos, posees una sensibilidad que captura las vibraciones sutiles de la existencia y una sabiduría que trasciende las palabras. Tu presencia es como un océano sanador, capaz de disolución y regeneración a través del amor e imaginación.\n\nAunque tu fluidez es tu don, tu desafío es aprender a construir límites saludables en un mundo de exigencias. Cuando usas tu intuición como brújula y tu creatividad como puente entre las alturas y las profundidades, te conviertes en un artista de la vida que aporta un toque de magia a lo cotidiano. Tu alma es un espejo del universo en su forma más poética y profunda.",
      loveStyle: "En el amor, eres el romántico de alma. Buscas una unión espiritual y emocional que sea total e incondicional. Amas con una profundidad que es rara y hermosa, a menudo anteponiendo las necesidades de tu pareja a las tuyas. Prosperas cuando encuentras a alguien que valora tu sensibilidad.",
      careerStyle: "Sobresales en roles que involucran creatividad, sanación, espiritualidad y expresión artística. El arte, la música, la terapia, la guía espiritual y el trabajo social son campos donde tu compasión e imaginación pueden fluir libremente.",
      cosmicCounsel: "El puente entre el cielo y la tierra se construye en tu corazón. Confía en tu silencio; habla el lenguaje de la verdad.",
      strengths: ["Compasivo", "Artístico", "Intuitivo", "Amable", "Habla desde el alma", "Imaginativo", "Sabio", "Empático"],
      challenges: ["Escapista", "Hipersensible", "Puede ser perezoso", "Idealista al extremo", "Puede luchar con la realidad", "Mentalidad de víctima a veces"],
    },
    hi: {
      description: "मीन ब्रह्मांडीय सपने देखने वाले और अनंत करुणा की राशि है। सभी दुनियाओं के नागरिक के रूप में, आपके पास एक संवेदनशीलता है जो अस्तित्व के सूक्ष्म कंपन को पकड़ती है और एक ज्ञान जो शब्दों से परे है। आपकी उपस्थिति एक प्रेम और कल्पना के माध्यम से विघटन और उत्थान में सक्षम एक उपचार महासागर की तरह है।\n\nहालाँकि आपकी तरलता आपका उपहार है, आपकी चुनौती मांगों की दुनिया में स्वस्थ सीमाओं का निर्माण करना सीखना है। जब आप अपने अंतर्ज्ञान को दिशा-सूचक यंत्र के रूप में और अपनी रचनात्मकता को ऊंचाइयों और गहराइयों के बीच एक पुल के रूप में उपयोग करते हैं, तो आप जीवन के एक ऐसे कलाकार बन जाते हैं जो रोजमर्रा में जादू का स्पर्श लाता है। आपकी आत्मा ब्रह्मांड का उसके सबसे काव्य और गहन रूप में एक दर्पण है।",
      loveStyle: "प्रेम में, आप भावपूर्ण रोमांटिक हैं। आप एक आध्यात्मिक और भावनात्मक संघ की तलाश करते हैं जो कुल और बिना शर्त हो। आप एक ऐसी गहराई के साथ प्यार करते हैं जो दुर्लभ और सुंदर है, अक्सर अपने साथी की जरूरतों को अपने से पहले रखते हैं। आप तब पनपते हैं जब आपको कोई ऐसा व्यक्ति मिलता है जो आपकी संवेदनशीलता को महत्व देता है।",
      careerStyle: "आप उन भूमिकाओं में उत्कृष्टता प्राप्त करते हैं जिनमें रचनात्मकता, उपचार, आध्यात्मिकता और कलात्मक अभिव्यक्ति शामिल है। कला, संगीत, चिकित्सा, आध्यात्मिक मार्गदर्शन और सामाजिक कार्य ऐसे क्षेत्र हैं जहाँ आपकी करुणा और कल्पना स्वतंत्र रूप से प्रवाहित हो सकती है।",
      cosmicCounsel: "स्वर्ग और पृथ्वी के बीच का पुल आपके हृदय में निर्मित है। अपने मौन पर भरोसा करें; यह सत्य की भाषा बोलता है।",
      strengths: ["दयालु", "कलात्मक", "सहज ज्ञानी", "कोमल", "आत्मा से बोलने वाला", "कल्पनाशील", "ज्ञानी", "सहानुभूतिपूर्ण"],
      challenges: ["पलायनवादी", "अति संवेदनशील", "आलसी हो सकते हैं", "अत्यधिक आदर्शवादी", "वास्तविकता के साथ संघर्ष कर सकते हैं", "कभी-कभी पीड़ित मानसिकता"],
    },
  },
};

/**
 * Retorna uma afirmação diária personalizada para o signo
 */
export function getAffirmation(sign: string, lang: string = 'en'): string {
  const normalizedSign = sign.toLowerCase();
  const affirmations: Record<string, Record<string, string>> = {
    aries: {
      en: "I channel my inner fire into constructive and inspiring actions.",
      pt: "Eu canalizo meu fogo interior em ações construtivas e inspiradoras.",
      es: "Canalizo mi fuego interior en acciones constructivas e inspiradoras.",
      hi: "मैं अपनी आंतरिक अग्नि को रचनात्मक और प्रेरक कार्यों में प्रवाहित करता हूँ।"
    },
    taurus: {
      en: "I build my life on a solid foundation of patience and beauty.",
      pt: "Eu construo minha vida sobre uma base sólida de paciência e beleza.",
      es: "Construyo mi vida sobre una base sólida de paciencia y belleza.",
      hi: "मैं अपने जीवन को धैर्य और सुंदरता की ठोस नींव पर बनाता हूँ।"
    },
    gemini: {
      en: "My thoughts are clear, and my communication builds bridges of understanding.",
      pt: "Meus pensamentos são claros e minha comunicação constrói pontes de entendimento.",
      es: "Mis pensamientos son claros y mi comunicación construye puentes de entendimiento.",
      hi: "मेरे विचार स्पष्ट हैं, और मेरा संचार समझ के पुल बनाता है।"
    },
    cancer: {
      en: "I honor my emotions and create safe spaces for myself and others.",
      pt: "Eu honro minhas emoções e crio espaços seguros para mim e para os outros.",
      es: "Honro mis emociones e creo espacios seguros para mí y para los demás.",
      hi: "मैं अपनी भावनाओं का सम्मान करता हूँ और अपने तथा दूसरों के लिए सुरक्षित स्थान बनाता हूँ।"
    },
    leo: {
      en: "My light shines brightest when I use it to inspire and uplift others.",
      pt: "Minha luz brilha mais quando a uso para inspirar e elevar os outros.",
      es: "Mi luz brilla más cuando la uso para inspirar y elevar a los demás.",
      hi: "मेरी रोशनी तब सबसे तेज चमकती है जब मैं इसका उपयोग दूसरों को प्रेरित करने के लिए करता हूँ।"
    },
    virgo: {
      en: "I find peace in the present moment and value the progress over perfection.",
      pt: "Encontro paz no momento presente e valorizo o progresso sobre a perfeição.",
      es: "Encuentro paz en el momento presente y valoro el progreso sobre la perfección.",
      hi: "मैं वर्तमान क्षण में शांति पाता हूँ और पूर्णता के बजाय प्रगति को महत्व देता हूँ।"
    },
    libra: {
      en: "I bring balance and beauty to every interaction and decision.",
      pt: "Eu trago equilíbrio e beleza para cada interação e decisão.",
      es: "Traigo equilibrio y belleza a cada interacción y decisión.",
      hi: "मैं हर बातचीत और निर्णय में संतुलन और सुंदरता लाता हूँ।"
    },
    scorpio: {
      en: "I embrace transformation and find strength in my authentic depth.",
      pt: "Eu abraço a transformação e encontro força em minha profundidade autêntica.",
      es: "Alcanzo mi profundidad auténtica y encuentro fuerza en la transformación.",
      hi: "मैं परिवर्तन को गले लगाता हूँ और अपनी वास्तविक गहराई में शक्ति पाता हूँ।"
    },
    sagittarius: {
      en: "My spirit is free, and my journey is guided by truth and joy.",
      pt: "Meu espírito é livre e minha jornada é guiada pela verdade e pela alegria.",
      es: "Mi espíritu es libre y mi viaje está guiado por la verdad y la alegría.",
      hi: "मेरी आत्मा स्वतंत्र है, और मेरी यात्रा सत्य और आनंद द्वारा निर्देशित है।"
    },
    capricorn: {
      en: "I achieve my goals with integrity, persistence, and steady focus.",
      pt: "Eu alcanço meus objetivos com integridade, persistência e foco constante.",
      es: "Alcanzo mis objetivos con integridad, persistencia y enfoque constante.",
      hi: "मैं अखंडता, दृढ़ता और निरंतर फोकस के साथ अपने लक्ष्यों को प्राप्त करता हूँ।"
    },
    aquarius: {
      en: "My unique vision contributes to a brighter and more collective future.",
      pt: "Minha visão única contribui para um futuro mais brilhante e coletivo.",
      es: "Mi visión única contribuye a un futuro más brillante y colectivo.",
      hi: "मेरी अनूठी दृष्टि एक उज्ज्वल और अधिक सामूहिक भविष्य में योगदान देती है।"
    },
    pisces: {
      en: "My compassion is a healing force in the world, and my intuition is my guide.",
      pt: "Minha compaixão é uma força curativa no mundo e minha intuição é meu guia.",
      es: "Mi compasión es una fuerza sanadora en el mundo y mi intuición es mi guía.",
      hi: "मेरी करुणा दुनिया में एक उपचार शक्ति है, और मेरा अंतर्ज्ञान मेरा मार्गदर्शक है।"
    }
  };

  const signAffirmations = affirmations[normalizedSign] || affirmations.aries;
  return signAffirmations[lang] || signAffirmations.en;
}

/**
 * Gera uma explicação narrativa para a compatibilidade entre dois signos
 */
export function getCompatibilityExplanation(score: number, p1: string, p2: string, lang: string = 'en'): string {
  if (score >= 80) {
    return lang === 'pt' ? `A conexão entre ${p1} e ${p2} é marcada por uma harmonia cósmica excepcional. Há uma compreensão natural que transcende o óbvio e permite um crescimento mútuo fluido.` :
           lang === 'es' ? `La conexión entre ${p1} y ${p2} está marcada por una armonía cósmica excepcional. Hay un entendimiento natural que trasciende lo obvio.` :
           lang === 'hi' ? `${p1} और ${p2} के बीच का संबंध असाधारण ब्रह्मांडीय सद्भाव द्वारा चिह्नित है। एक प्राकृतिक समझ है जो स्पष्ट से परे है।` :
           `The connection between ${p1} and ${p2} is marked by exceptional cosmic harmony. There's a natural understanding between you that allows for fluid mutual growth.`;
  } else if (score >= 50) {
    return lang === 'pt' ? `Embora existam diferenças, ${p1} e ${p2} possuem uma base sólida para construir algo duradouro. O segredo está na comunicação aberta e no respeito às individualidades.` :
           lang === 'es' ? `Aunque existen diferencias, ${p1} y ${p2} tienen una base sólida para construir algo duradero. El secreto está en la comunicación abierta.` :
           lang === 'hi' ? `हालांकि मतभेद हैं, ${p1} और ${p2} के पास कुछ स्थायी बनाने के लिए एक ठोस आधार है। रहस्य खुले संचार में निहित है।` :
           `While differences exist, ${p1} and ${p2} have a solid foundation to build something lasting. The secret lies in open communication and respect for each other's individuality.`;
  } else {
    return lang === 'pt' ? `Esta relação exige paciência e aceitação profunda. O desafio é transformar o atrito em oportunidade de aprendizado e expansão mútua.` :
           lang === 'es' ? `Esta relación exige paciencia y aceptación profunda. El desafío es transformar la fricción en aprendizaje.` :
           lang === 'hi' ? `यह रिश्ता धैर्य और गहरी स्वीकृति की मांग करता है। चुनौती घर्षण को सीखने और विस्तार के अवसर में बदलने की है।` :
           `This relationship demands patience and deep acceptance. The challenge is turning friction into opportunities for learning and mutual expansion.`;
  }
}

/**
 * Função principal para gerar o conteúdo do PDF
 */
const MOON_INFLUENCE_LOC: Record<string, string> = {
  pt: "A Lua reflete seu mundo emocional e instintos básicos.",
  en: "The Moon reflects your emotional world and basic instincts.",
  es: "La Luna refleja tu mundo emocional y tus instintos básicos.",
  hi: "चंद्रमा आपकी भावनात्मक दुनिया और मूल वृत्तियों को दर्शाता है।",
};

const HEALTH_SUMMARY_LOC: Record<string, string> = {
  pt: "Mantenha o equilíbrio entre mente e corpo com consciência.",
  en: "Maintain the balance between mind and body with awareness.",
  es: "Mantén el equilibrio entre mente y cuerpo con conciencia.",
  hi: "सचेतनता के साथ मन और शरीर के बीच संतुलन बनाए रखें।",
};

export function generatePDFContent(planetData: PlanetData[], houseData: HouseData[] | null, lang: string = 'en'): PDFContent {
  const sun = planetData.find(p => p.name === 'Sun' || p.name === 'Sol');
  const moon = planetData.find(p => p.name === 'Moon' || p.name === 'Lua');
  
  const signKey = sun ? sun.sign.toLowerCase() : 'aries';
  const moonLon = moon ? moon.longitude : 0;
  const raw = (lang || 'en').toLowerCase();
  const loc = (['pt', 'en', 'es', 'hi'] as const).includes(raw as 'pt' | 'en' | 'es' | 'hi') ? raw : 'en';
  
  const profile = SIGN_PROFILES[signKey] || SIGN_PROFILES.aries;
  const langProfile = profile[loc] || profile.en;
  
  const moonPhaseName = getMoonPhaseName(moonLon, loc);
  const elementKey = SIGN_ELEMENTS[signKey as keyof typeof SIGN_ELEMENTS] || 'fire';
  
  // Análise de sorte e dados técnicos
  const luckyData = {
    colors: (LUCKY_COLORS[signKey as keyof typeof LUCKY_COLORS] || []) as string[],
    stones: (LUCKY_STONES[signKey as keyof typeof LUCKY_STONES] || []) as string[],
    numbers: (LUCKY_NUMBERS[signKey as keyof typeof LUCKY_NUMBERS] || []) as number[],
    favorableHours: (FAVORABLE_HOURS[signKey as keyof typeof FAVORABLE_HOURS] || []) as string[],
  };

  // Textos localizados para seções
  const sectionTitles: any = {
    pt: { love: "Amor & Emoção", career: "Plano Profissional", health: "Saúde & Vitalidade" },
    en: { love: "Love & Emotion", career: "Professional Path", health: "Health & Vitality" },
    es: { love: "Amor y Emoción", career: "Trayectoria profesional", health: "Salud y Vitalidad" },
    hi: { love: "प्रेम और भावना", career: "पेशेवर पथ", health: "स्वास्थ्य और जीवन शक्ति" },
  };
  
  const currentTitles = sectionTitles[loc] || sectionTitles.en;

  const trLoc = TRANSLATIONS[loc] || TRANSLATIONS.en;
  const rulerPlanetKey =
    SIGN_RULER_PLANET_KEY[signKey as keyof typeof SIGN_RULER_PLANET_KEY] ?? "sun";
  const rulerLabel = trLoc.planets[rulerPlanetKey] || rulerPlanetKey;

  return {
    signProfile: {
      name: trLoc.signs[signKey] || signKey.charAt(0).toUpperCase() + signKey.slice(1),
      elementKey: elementKey,
      element: trLoc.elements[elementKey] || elementKey,
      modality: trLoc.modalities[SIGN_MODALITIES[signKey as keyof typeof SIGN_MODALITIES]] || 'Cardinal',
      ruler: rulerLabel,
      description: langProfile.description,
      strengths: langProfile.strengths || [],
      challenges: langProfile.challenges || [],
      cosmicCounsel: langProfile.cosmicCounsel || "",
      loveStyle: langProfile.loveStyle || "",
    },
    moonPhase: {
      phase: moonPhaseName,
      influence: MOON_INFLUENCE_LOC[loc] || MOON_INFLUENCE_LOC.en,
    },
    luckyData,
    loveAnalysis: {
      title: currentTitles.love,
      summary: langProfile.loveStyle || "",
      tip: ACTIONS_LOC[loc][Math.floor(Math.random() * ACTIONS_LOC[loc].length)],
      highlights: (langProfile.strengths || []).slice(0, 2),
    },
    careerAnalysis: {
      title: currentTitles.career,
      summary: langProfile.careerStyle || "",
      tip: ACTIONS_LOC[loc][Math.floor(Math.random() * ACTIONS_LOC[loc].length)],
      highlights: (langProfile.strengths || []).slice(2, 4),
    },
    healthAnalysis: {
      title: currentTitles.health,
      summary: HEALTH_SUMMARY_LOC[loc] || HEALTH_SUMMARY_LOC.en,
      tip: WATCHOUTS_LOC[loc][Math.floor(Math.random() * WATCHOUTS_LOC[loc].length)],
    },
    dailyAdvice: {
      action: ACTIONS_LOC[loc][0],
      affirmation: getAffirmation(signKey, loc),
    },
    planetAnalyses: planetData.map(p => {
      const pLabel = trLoc.planets[p.name.toLowerCase()] || p.name;
      const sLabel = trLoc.signs[p.sign.toLowerCase()] || p.sign;
      let interpretation: string;
      if (loc === 'pt') {
        interpretation = `${pLabel} em ${sLabel} traz uma energia de ${p.retrograde ? 'reflexão' : 'ação'} e empoderamento.`;
      } else if (loc === 'es') {
        interpretation = `${pLabel} en ${sLabel} aporta una energía de ${p.retrograde ? 'reflexión' : 'acción'} y empoderamiento.`;
      } else if (loc === 'hi') {
        interpretation = `${sLabel} में ${pLabel} ${p.retrograde ? 'चिंतन' : 'कार्रवाई'} और सशक्तिकरण की ऊर्जा लाता है।`;
      } else {
        interpretation = `${pLabel} in ${sLabel} brings an energy of ${p.retrograde ? 'reflection' : 'action'} and empowerment.`;
      }
      return {
        planet: pLabel,
        sign: sLabel,
        house: p.house || 0,
        strength: "strong",
        interpretation,
      };
    }),
  };
}

export default { TRANSLATIONS, SIGN_PROFILES, generatePDFContent, getAffirmation, getCompatibilityExplanation };

