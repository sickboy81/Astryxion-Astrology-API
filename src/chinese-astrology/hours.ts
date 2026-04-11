import { LocalizedText, LocalizedList } from '../i18n.js';

export interface ChineseHour {
  name: string;
  displayName: LocalizedText;
  timeRange: string;
  startHour: number;
  endHour: number;
  animal: LocalizedText;
  element: LocalizedText;
  characteristics: LocalizedList;
  favorableActivities: LocalizedList;
  healthFocus: LocalizedList;
  energy: LocalizedText;
}

export const CHINESE_HOURS: ChineseHour[] = [
  {
    name: "zi-shi",
    displayName: { pt: "Hora do Rato", en: "Rat Hour", es: "Hora de la Rata", hi: "चूहे का घंटा" },
    timeRange: "23:00 - 01:00",
    startHour: 23,
    endHour: 1,
    animal: { pt: "Rato", en: "Rat", es: "Rata", hi: "चूहा" },
    element: { pt: "Água Yang", en: "Yang Water", es: "Agua Yang", hi: "यांग पानी" },
    characteristics: {
      pt: ["Renovação", "Sabedoria noturna", "Intuição", "Descanso profundo"],
      en: ["Renewal", "Nightly Wisdom", "Intuition", "Deep Rest"],
      es: ["Renovación", "Sabiduría Nocturna", "Intuición", "Descanso Profundo"],
      hi: ["नवीनीकरण", "रात्रिकालीन ज्ञान", "अंतर्ज्ञान", "गहरी नींद"]
    },
    favorableActivities: {
        pt: ["Dormir", "Meditar", "Planejar", "Refletir"],
        en: ["Sleep", "Meditate", "Plan", "Reflect"],
        es: ["Dormir", "Meditar", "Planear", "Reflexionar"],
        hi: ["सोना", "ध्यान", "योजना", "चिंतन"]
    },
    healthFocus: {
        pt: ["Vesícula biliar", "Renovação celular"],
        en: ["Gallbladder", "Cellular Renewal"],
        es: ["Vesícula biliar", "Renovación celular"],
        hi: ["पित्ताशय", "कोशिका नवीनीकरण"]
    },
    energy: { pt: "Yin máximo - renovação", en: "Max Yin - Renewal", es: "Día máximo - Renovación", hi: "अधिकतम यिन - नवीनीकरण" },
  },
  {
    name: "chou-shi",
    displayName: { pt: "Hora do Boi", en: "Ox Hour", es: "Hora del Buey", hi: "बैल का घंटा" },
    timeRange: "01:00 - 03:00",
    startHour: 1,
    endHour: 3,
    animal: { pt: "Boi", en: "Ox", es: "Buey", hi: "बैल" },
    element: { pt: "Terra Yin", en: "Yin Earth", es: "Tierra Yin", hi: "यिन पृथ्वी" },
    characteristics: {
        pt: ["Descanso profundo", "Recuperação", "Silêncio", "Paz"],
        en: ["Deep Rest", "Recovery", "Silence", "Peace"],
        es: ["Descanso Profundo", "Recuperación", "Silencio", "Paz"],
        hi: ["गहरी नींद", "पुनर्प्राप्ति", "मौन", "शांति"]
    },
    favorableActivities: {
        pt: ["Dormir", "Descansar", "Recuperar energias"],
        en: ["Sleep", "Rest", "Recover Energy"],
        es: ["Dormir", "Descansar", "Recuperar Energía"],
        hi: ["सोना", "आराम", "ऊर्जा पुनर्प्राप्ति"]
    },
    healthFocus: {
        pt: ["Fígado", "Desintoxicação"],
        en: ["Liver", "Detoxification"],
        es: ["Hígado", "Desintoxicación"],
        hi: ["लीवर", "विषाक्तता निवारण"]
    },
    energy: { pt: "Yin profundo - recuperação", en: "Deep Yin - Recovery", es: "Día profundo - Recuperación", hi: "गहरा यिन - पुनर्प्राप्ति" },
  },
  {
    name: "yin-shi",
    displayName: { pt: "Hora do Tigre", en: "Tiger Hour", es: "Hora del Tigre", hi: "बाघ का घंटा" },
    timeRange: "03:00 - 05:00",
    startHour: 3,
    endHour: 5,
    animal: { pt: "Tigre", en: "Tiger", es: "Tigre", hi: "बाघ" },
    element: { pt: "Madeira Yang", en: "Yang Wood", es: "Madera Yang", hi: "यांग लकड़ी" },
    characteristics: {
        pt: ["Despertar", "Energia crescente", "Novo dia", "Vitalidade"],
        en: ["Awakening", "Rising Energy", "New Day", "Vitality"],
        es: ["Despertar", "Energía Creciente", "Nuevo Día", "Vitalidad"],
        hi: ["जागृति", "बढ़ती ऊर्जा", "नया दिन", "जीवन शक्ति"]
    },
    favorableActivities: {
        pt: ["Acordar cedo", "Meditar", "Exercícios leves", "Planejar o dia"],
        en: ["Wake early", "Meditate", "Light Exercise", "Plan the Day"],
        es: ["Despertar temprano", "Meditar", "Ejercicio ligero", "Planear el día"],
        hi: ["जल्दी जागना", "ध्यान", "हल्का व्यायाम", "दिन की योजना"]
    },
    healthFocus: {
        pt: ["Pulmões", "Respiração"],
        en: ["Lungs", "Breathing"],
        es: ["Pulmones", "Respiración"],
        hi: ["फेफड़े", "सांस लेना"]
    },
    energy: { pt: "Yang nascendo - despertar", en: "Rising Yang - Awakening", es: "Yang naciente - Despertar", hi: "बढ़ता यांग - जागृति" },
  },
  {
    name: "mao-shi",
    displayName: { pt: "Hora do Coelho", en: "Rabbit Hour", es: "Hora del Conejo", hi: "खरगोश का घंटा" },
    timeRange: "05:00 - 07:00",
    startHour: 5,
    endHour: 7,
    animal: { pt: "Coelho", en: "Rabbit", es: "Conejo", hi: "खरगोश" },
    element: { pt: "Madeira Yin", en: "Yin Wood", es: "Madera Yin", hi: "यिन लकड़ी" },
    characteristics: {
        pt: ["Amanhecer", "Suavidade", "Beleza", "Harmonia"],
        en: ["Dawn", "Gentleness", "Beauty", "Harmony"],
        es: ["Amanecer", "Suavidad", "Belleza", "Armonía"],
        hi: ["भोर", "सौम्यता", "सुंदरता", "सद्भाव"]
    },
    favorableActivities: {
        pt: ["Exercícios matinais", "Café da manhã", "Leitura", "Preparação"],
        en: ["Morning Exercise", "Breakfast", "Reading", "Preparation"],
        es: ["Ejercicio Matutino", "Desayuno", "Lectura", "Preparación"],
        hi: ["सुबह का व्यायाम", "नाश्ता", "पढ़ना", "तैयारी"]
    },
    healthFocus: {
        pt: ["Intestino grosso", "Eliminação"],
        en: ["Large Intestine", "Elimination"],
        es: ["Intestino grueso", "Eliminación"],
        hi: ["बड़ी आंत", "उन्मूलन"]
    },
    energy: { pt: "Yang crescendo - suavidade", en: "Growing Yang - Gentleness", es: "Yang creciente - Suavidad", hi: "बढ़ता यांग - सौम्यता" },
  },
  {
    name: "chen-shi",
    displayName: { pt: "Hora do Dragão", en: "Dragon Hour", es: "Hora del Dragón", hi: "ड्रैगन का घंटा" },
    timeRange: "07:00 - 09:00",
    startHour: 7,
    endHour: 9,
    animal: { pt: "Dragão", en: "Dragon", es: "Dragón", hi: "ड्रैगन" },
    element: { pt: "Terra Yang", en: "Yang Earth", es: "Tierra Yang", hi: "यांग पृथ्वी" },
    characteristics: {
        pt: ["Energia alta", "Poder", "Início do trabalho", "Força"],
        en: ["High Energy", "Power", "Work Start", "Strength"],
        es: ["Energía Alta", "Poder", "Inicio del Trabajo", "Fuerza"],
        hi: ["उच्च ऊर्जा", "शक्ति", "काम की शुरुआत", "बल"]
    },
    favorableActivities: {
        pt: ["Trabalhar", "Reuniões importantes", "Decisões", "Exercícios intensos"],
        en: ["Work", "Important Meetings", "Decisions", "Intense Exercise"],
        es: ["Trabajar", "Reuniones Importantes", "Decisiones", "Ejercicio Intenso"],
        hi: ["काम", "महत्वपूर्ण बैठकें", "निर्णय", "गहन व्यायाम"]
    },
    healthFocus: {
        pt: ["Estômago", "Digestão do café"],
        en: ["Stomach", "Digestion"],
        es: ["Estómago", "Digestión"],
        hi: ["पेट", "पाचन"]
    },
    energy: { pt: "Yang forte - ação", en: "Strong Yang - Action", es: "Yang fuerte - Acción", hi: "मजबूत यांग - क्रिया" },
  },
  {
    name: "si-shi",
    displayName: { pt: "Hora da Serpente", en: "Snake Hour", es: "Hora de la Serpiente", hi: "साँप का घंटा" },
    timeRange: "09:00 - 11:00",
    startHour: 9,
    endHour: 11,
    animal: { pt: "Serpente", en: "Snake", es: "Serpiente", hi: "साँप" },
    element: { pt: "Fogo Yin", en: "Yin Fire", es: "Fuego Yin", hi: "यिन आग" },
    characteristics: {
        pt: ["Foco", "Concentração", "Sabedoria", "Análise"],
        en: ["Focus", "Concentration", "Wisdom", "Analysis"],
        es: ["Enfoque", "Concentración", "Sabiduría", "Análisis"],
        hi: ["फोकस", "एकाग्रता", "बुद्धि", "विश्लेषण"]
    },
    favorableActivities: {
        pt: ["Trabalho intelectual", "Estudo", "Análise", "Planejamento estratégico"],
        en: ["Intellectual Work", "Study", "Analysis", "Strategy"],
        es: ["Trabajo Intelectual", "Estudio", "Análisis", "Estrategia"],
        hi: ["बौद्धिक कार्य", "अध्ययन", "विश्लेषण", "रणनीति"]
    },
    healthFocus: {
        pt: ["Baço", "Processamento mental"],
        en: ["Spleen", "Mental Processing"],
        es: ["Bazo", "Procesamiento Mental"],
        hi: ["प्लीहा", "मानसिक प्रसंस्करण"]
    },
    energy: { pt: "Yang estável - foco", en: "Stable Yang - Focus", es: "Yang estable - Enfoque", hi: "स्थिर यांग - फोकस" },
  },
  {
    name: "wu-shi",
    displayName: { pt: "Hora do Cavalo", en: "Horse Hour", es: "Hora del Caballo", hi: "घोड़े का घंटा" },
    timeRange: "11:00 - 13:00",
    startHour: 11,
    endHour: 13,
    animal: { pt: "Cavalo", en: "Horse", es: "Caballo", hi: "घोड़ा" },
    element: { pt: "Fogo Yang", en: "Yang Fire", es: "Fuego Yang", hi: "यांग आग" },
    characteristics: {
        pt: ["Energia máxima", "Sol a pino", "Paixão", "Movimento"],
        en: ["Max Energy", "High Noon", "Passion", "Movement"],
        es: ["Energía Máxima", "Mediodía", "Pasión", "Movimiento"],
        hi: ["अधिकतम ऊर्जा", "दोपहर", "जुनून", "आंदोलन"]
    },
    favorableActivities: {
        pt: ["Almoço", "Socialização", "Atividades ao ar livre", "Exercícios"],
        en: ["Lunch", "Socializing", "Outdoor Activities", "Exercise"],
        es: ["Almuerzo", "Socializar", "Actividades al aire libre", "Ejercicio"],
        hi: ["लंच", "सामाजिक मेलजोल", "बाहरी गतिविधियां", "व्यायाम"]
    },
    healthFocus: {
        pt: ["Coração", "Circulação"],
        en: ["Heart", "Circulation"],
        es: ["Corazón", "Circulación"],
        hi: ["हृदय", "परिसंचरण"]
    },
    energy: { pt: "Yang máximo - pico", en: "Max Yang - Peak", es: "Yang máximo - Pico", hi: "अधिकतम यांग - शिखर" },
  },
  {
    name: "wei-shi",
    displayName: { pt: "Hora da Cabra", en: "Goat Hour", es: "Hora de la Cabra", hi: "बकरी का घंटा" },
    timeRange: "13:00 - 15:00",
    startHour: 13,
    endHour: 15,
    animal: { pt: "Cabra", en: "Goat", es: "Cabra", hi: "बकरी" },
    element: { pt: "Terra Yin", en: "Yin Earth", es: "Tierra Yin", hi: "यिन पृथ्वी" },
    characteristics: {
        pt: ["Digestão", "Descanso", "Criatividade", "Suavidade"],
        en: ["Digestion", "Rest", "Creativity", "Gentleness"],
        es: ["Digestión", "Descanso", "Creatividad", "Suavidad"],
        hi: ["पाचन", "विश्राम", "रचनात्मकता", "सौम्यता"]
    },
    favorableActivities: {
        pt: ["Descanso pós-almoço", "Trabalho criativo", "Arte", "Meditação"],
        en: ["Post-lunch Rest", "Creative Work", "Art", "Meditation"],
        es: ["Descanso Post-almuerzo", "Trabajo Creativo", "Arte", "Meditación"],
        hi: ["लंच के बाद आराम", "रचनात्मक कार्य", "कला", "ध्यान"]
    },
    healthFocus: {
        pt: ["Intestino delgado", "Absorção de nutrientes"],
        en: ["Small Intestine", "Nutrient Absorption"],
        es: ["Intestino delgado", "Absorción de Nutrientes"],
        hi: ["छोटी आंत", "पोषक तत्वों का अवशोषण"]
    },
    energy: { pt: "Yang declinando - digestão", en: "Declining Yang - Digestion", es: "Yang declinante - Digestión", hi: "यांग का पतन - पाचन" },
  },
  {
    name: "shen-shi",
    displayName: { pt: "Hora do Macaco", en: "Monkey Hour", es: "Hora del Mono", hi: "बंदर का घंटा" },
    timeRange: "15:00 - 17:00",
    startHour: 15,
    endHour: 17,
    animal: { pt: "Macaco", en: "Monkey", es: "Mono", hi: "बंदर" },
    element: { pt: "Metal Yang", en: "Yang Metal", es: "Metal Yang", hi: "यांग धातु" },
    characteristics: {
        pt: ["Inteligência", "Comunicação", "Adaptabilidade", "Energia renovada"],
        en: ["Intelligence", "Communication", "Adaptability", "Renewed Energy"],
        es: ["Inteligencia", "Comunicación", "Adaptabilidad", "Energía Renovada"],
        hi: ["बुद्धि", "संचार", "अनुकूलनशीलता", "नवीनीकृत ऊर्जा"]
    },
    favorableActivities: {
        pt: ["Reuniões", "Networking", "Resolução de problemas", "Aprendizado"],
        en: ["Meetings", "Networking", "Problem Solving", "Learning"],
        es: ["Reuniones", "Networking", "Resolución de Problemas", "Aprendizaje"],
        hi: ["बैठकें", "नेटवर्किंग", "समस्या समाधान", "सीखना"]
    },
    healthFocus: {
        pt: ["Bexiga", "Hidratação"],
        en: ["Bladder", "Hydration"],
        es: ["Vejiga", "Hidratación"],
        hi: ["मूत्राशय", "जलयोजन"]
    },
    energy: { pt: "Yang estável - comunicação", en: "Stable Yang - Communication", es: "Yang estable - Comunicación", hi: "स्थिर यांग - संचार" },
  },
  {
    name: "you-shi",
    displayName: { pt: "Hora do Galo", en: "Rooster Hour", es: "Hora del Gallo", hi: "मुर्गे का घंटा" },
    timeRange: "17:00 - 19:00",
    startHour: 17,
    endHour: 19,
    animal: { pt: "Galo", en: "Rooster", es: "Gallo", hi: "मुर्गा" },
    element: { pt: "Metal Yin", en: "Yin Metal", es: "Metal Yin", hi: "यिन धातु" },
    characteristics: {
        pt: ["Finalização", "Organização", "Precisão", "Colheita"],
        en: ["Wrapping up", "Organization", "Precision", "Harvest"],
        es: ["Finalización", "Organización", "Precisión", "Cosecha"],
        hi: ["समापन", "संगठन", "सटीकता", "कटाई"]
    },
    favorableActivities: {
        pt: ["Finalizar tarefas", "Organizar", "Jantar", "Revisão do dia"],
        en: ["Finish Tasks", "Organize", "Dinner", "Day Review"],
        es: ["Terminar Tareas", "Organizar", "Cena", "Revisión del Día"],
        hi: ["कार्य समाप्त करें", "व्यवस्थित करें", "रात का खाना", "दिन की समीक्षा"]
    },
    healthFocus: {
        pt: ["Rins", "Preparação para descanso"],
        en: ["Kidneys", "Rest Prep"],
        es: ["Riñones", "Preparación para el Descanso"],
        hi: ["गुर्दे", "विश्राम की तैयारी"]
    },
    energy: { pt: "Yin crescendo - finalização", en: "Growing Yin - Finalization", es: "Yin creciente - Finalización", hi: "बढ़ता यिन - समापन" },
  },
  {
    name: "xu-shi",
    displayName: { pt: "Hora do Cão", en: "Dog Hour", es: "Hora del Perro", hi: "कुत्ते का घंटा" },
    timeRange: "19:00 - 21:00",
    startHour: 19,
    endHour: 21,
    animal: { pt: "Cão", en: "Dog", es: "Perro", hi: "कुत्ता" },
    element: { pt: "Terra Yang", en: "Yang Earth", es: "Tierra Yang", hi: "यांग पृथ्वी" },
    characteristics: {
        pt: ["Proteção", "Família", "Lealdade", "Tranquilidade"],
        en: ["Protection", "Family", "Loyalty", "Tranquility"],
        es: ["Protección", "Familia", "Lealtad", "Tranquilidad"],
        hi: ["सुरक्षा", "परिवार", "वफादारी", "शांति"]
    },
    favorableActivities: {
        pt: ["Tempo em família", "Relaxamento", "Leitura", "Preparação para dormir"],
        en: ["Family Time", "Relaxation", "Reading", "Sleep Prep"],
        es: ["Tiempo en Familia", "Relajación", "Lectura", "Preparación para Dormir"],
        hi: ["पारिवारिक समय", "विश्राम", "पढ़ना", "सोने की तैयारी"]
    },
    healthFocus: {
        pt: ["Pericárdio", "Relaxamento"],
        en: ["Pericardium", "Relaxation"],
        es: ["Pericardio", "Relajación"],
        hi: ["पेरिकार्डियम", "विश्राम"]
    },
    energy: { pt: "Yin forte - tranquilidade", en: "Strong Yin - Tranquility", es: "Yin fuerte - Tranquilidad", hi: "मजबूत यिन - शांति" },
  },
  {
    name: "hai-shi",
    displayName: { pt: "Hora do Porco", en: "Pig Hour", es: "Hora del Cerdo", hi: "सुअर का घंटा" },
    timeRange: "21:00 - 23:00",
    startHour: 21,
    endHour: 23,
    animal: { pt: "Porco", en: "Pig", es: "Cerdo", hi: "सुअर" },
    element: { pt: "Água Yin", en: "Yin Water", es: "Agua Yin", hi: "यिन पानी" },
    characteristics: {
        pt: ["Descanso", "Abundância", "Paz", "Preparação para dormir"],
        en: ["Rest", "Abundance", "Peace", "Sleep Prep"],
        es: ["Descanso", "Abundancia", "Paz", "Preparación para Dormir"],
        hi: ["विश्राम", "प्रचुरता", "शांति", "सोने की तैयारी"]
    },
    favorableActivities: {
        pt: ["Relaxamento", "Meditação", "Preparação para dormir", "Gratidão"],
        en: ["Relaxation", "Meditation", "Sleep Prep", "Gratitude"],
        es: ["Relajación", "Meditación", "Preparación para Dormir", "Gratitud"],
        hi: ["विश्राम", "ध्यान", "सोने की तैयारी", "कृतज्ञता"]
    },
    healthFocus: {
        pt: ["Triplo aquecedor", "Equilíbrio energético"],
        en: ["Triple Burner", "Energy Balance"],
        es: ["Triple Calentador", "Equilibrio Energético"],
        hi: ["ट्रिपल बर्नर", "ऊर्जा संतुलन"]
    },
    energy: { pt: "Yin máximo - descanso", en: "Max Yin - Rest", es: "Yin máximo - Descanso", hi: "अधिकतम यिन - विश्राम" },
  },
];

export function getHourByTime(hour: number): ChineseHour | undefined {
  return CHINESE_HOURS.find(h => {
    if (h.startHour > h.endHour) {
      return hour >= h.startHour || hour < h.endHour;
    }
    return hour >= h.startHour && hour < h.endHour;
  });
}

export function getCurrentChineseHour(): ChineseHour | undefined {
  const now = new Date();
  return getHourByTime(now.getHours());
}

export function getHourByName(name: string, lang: string = "en"): ChineseHour | undefined {
  return CHINESE_HOURS.find(
    h => h.name.toLowerCase() === name.toLowerCase() ||
         (h.displayName as any)[lang]?.toLowerCase().includes(name.toLowerCase()) ||
         h.displayName.pt.toLowerCase().includes(name.toLowerCase())
  );
}
