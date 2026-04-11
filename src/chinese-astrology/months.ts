import { LocalizedText, LocalizedList } from '../i18n.js';

export interface ChineseMonth {
  name: string;
  displayName: LocalizedText;
  number: number;
  season: LocalizedText;
  element: LocalizedText;
  animal: LocalizedText;
  characteristics: LocalizedList;
  favorableActivities: LocalizedList;
  unfavorableActivities: LocalizedList;
  healthFocus: LocalizedList;
  luckyColors: LocalizedList;
  luckyDirections: LocalizedList;
}

export const CHINESE_MONTHS: ChineseMonth[] = [
  {
    name: "yin-yue",
    displayName: { pt: "Mês do Tigre", en: "Tiger Month", es: "Mes del Tigre", hi: "बाघ का महीना" },
    number: 1,
    season: { pt: "Primavera", en: "Spring", es: "Primavera", hi: "वसंत" },
    element: { pt: "Madeira Yang", en: "Yang Wood", es: "Madera Yang", hi: "यांग लकड़ी" },
    animal: { pt: "Tigre", en: "Tiger", es: "Tigre", hi: "बाघ" },
    characteristics: {
      pt: ["Início da primavera", "Energia crescente", "Novos começos", "Expansão"],
      en: ["Start of Spring", "Rising Energy", "New Beginnings", "Expansion"],
      es: ["Inicio de la Primavera", "Energía Creciente", "Nuevos Comienzos", "Expansión"],
      hi: ["वसंत की शुरुआत", "बढ़ती ऊर्जा", "नई शुरुआत", "विस्तार"]
    },
    favorableActivities: {
        pt: ["Iniciar projetos", "Plantar", "Viajar", "Fazer networking"],
        en: ["Start Projects", "Planting", "Traveling", "Networking"],
        es: ["Iniciar Proyectos", "Plantar", "Viajar", "Networking"],
        hi: ["परियोजनाएं शुरू करें", "वृक्षारोपण", "यात्रा", "नेटवर्किंग"]
    },
    unfavorableActivities: {
        pt: ["Ficar parado", "Evitar riscos", "Isolar-se"],
        en: ["Staying Still", "Avoiding Risks", "Isolation"],
        es: ["Quedarse Quieto", "Evitar Riesgos", "Aislamiento"],
        hi: ["स्थिर रहना", "जोखिम से बचना", "अलगाव"]
    },
    healthFocus: {
        pt: ["Fígado", "Vesícula biliar", "Olhos"],
        en: ["Liver", "Gallbladder", "Eyes"],
        es: ["Hígado", "Vesícula biliar", "Ojos"],
        hi: ["लीवर", "पित्ताशय", "आंखें"]
    },
    luckyColors: {
        pt: ["Verde", "Azul"], en: ["Green", "Blue"],
        es: ["Verde", "Azul"], hi: ["हरा", "नीला"]
    },
    luckyDirections: {
        pt: ["Leste", "Sudeste"], en: ["East", "Southeast"],
        es: ["Este", "Sureste"], hi: ["पूर्व", "दक्षिण पूर्व"]
    },
  },
  {
    name: "mao-yue",
    displayName: { pt: "Mês do Coelho", en: "Rabbit Month", es: "Mes del Conejo", hi: "खरगोश का महीना" },
    number: 2,
    season: { pt: "Primavera", en: "Spring", es: "Primavera", hi: "वसंत" },
    element: { pt: "Madeira Yin", en: "Yin Wood", es: "Madera Yin", hi: "यिन लकड़ी" },
    animal: { pt: "Coelho", en: "Rabbit", es: "Conejo", hi: "खरगोश" },
    characteristics: {
        pt: ["Primavera plena", "Crescimento suave", "Harmonia", "Beleza"],
        en: ["Full Spring", "Gentle Growth", "Harmony", "Beauty"],
        es: ["Primavera Plena", "Crecimiento Suave", "Armonía", "Belleza"],
        hi: ["पूर्ण वसंत", "कोमल विकास", "सद्भाव", "सुंदरता"]
    },
    favorableActivities: {
        pt: ["Romance", "Arte", "Decoração", "Mediação"],
        en: ["Romance", "Art", "Decoration", "Mediation"],
        es: ["Romance", "Arte", "Decoración", "Mediación"],
        hi: ["रोमांस", "कला", "सजावट", "मध्यस्थता"]
    },
    unfavorableActivities: {
        pt: ["Conflitos", "Decisões precipitadas", "Críticas"],
        en: ["Conflicts", "Hasty Decisions", "Criticism"],
        es: ["Conflictos", "Decisiones Apresuradas", "Crítica"],
        hi: ["संघर्ष", "जल्दबाजी के फैसले", "आलोचना"]
    },
    healthFocus: {
        pt: ["Fígado", "Tendões", "Unhas"],
        en: ["Liver", "Tendons", "Nails"],
        es: ["Hígado", "Tendones", "Uñas"],
        hi: ["लीवर", "टेंडन", "नाखून"]
    },
    luckyColors: {
        pt: ["Rosa", "Verde claro"], en: ["Pink", "Light Green"],
        es: ["Rosa", "Verde Claro"], hi: ["गुलाबी", "हल्का हरा"]
    },
    luckyDirections: {
        pt: ["Leste"], en: ["East"],
        es: ["Este"], hi: ["पूर्व"]
    },
  },
  {
    name: "chen-yue",
    displayName: { pt: "Mês do Dragão", en: "Dragon Month", es: "Mes del Dragón", hi: "ड्रैगन का महीना" },
    number: 3,
    season: { pt: "Transição Primavera-Verão", en: "Spring-Summer Transition", es: "Transición Primavera-Verano", hi: "वसंत-ग्रीष्मकालीन संक्रमण" },
    element: { pt: "Terra Yang", en: "Yang Earth", es: "Tierra Yang", hi: "यांग पृथ्वी" },
    animal: { pt: "Dragão", en: "Dragon", es: "Dragón", hi: "ड्रैगन" },
    characteristics: {
        pt: ["Transição de estações", "Energia poderosa", "Transformação", "Força"],
        en: ["Season Transition", "Powerful Energy", "Transformation", "Strength"],
        es: ["Transición de Estaciones", "Energía Poderosa", "Transformación", "Fuerza"],
        hi: ["ऋतु संक्रमण", "शक्तिशाली ऊर्जा", "परिवर्तन", "बल"]
    },
    favorableActivities: {
        pt: ["Liderança", "Investimentos", "Mudanças", "Construção"],
        en: ["Leadership", "Investments", "Changes", "Construction"],
        es: ["Liderazgo", "Inversiones", "Cambios", "Construcción"],
        hi: ["नेतृत्व", "निवेश", "परिवर्तन", "निर्माण"]
    },
    unfavorableActivities: {
        pt: ["Passividade", "Medo de mudar", "Hesitação"],
        en: ["Passivity", "Fear of Change", "Hesitation"],
        es: ["Pasividad", "Miedo al Cambio", "Hesitación"],
        hi: ["निष्क्रियता", "परिवर्तन का डर", "हिचकिचाहट"]
    },
    healthFocus: {
        pt: ["Estômago", "Baço", "Digestão"],
        en: ["Stomach", "Spleen", "Digestion"],
        es: ["Estómago", "Bazo", "Digestión"],
        hi: ["पेट", "प्लीहा", "पाचन"]
    },
    luckyColors: {
        pt: ["Amarelo", "Dourado"], en: ["Yellow", "Gold"],
        es: ["Amarillo", "Dorado"], hi: ["पीला", "सुनहरा"]
    },
    luckyDirections: {
        pt: ["Sudeste", "Centro"], en: ["Southeast", "Center"],
        es: ["Sureste", "Centro"], hi: ["दक्षिण पूर्व", "केंद्र"]
    },
  },
  {
    name: "si-yue",
    displayName: { pt: "Mês da Serpente", en: "Snake Month", es: "Mes de la Serpiente", hi: "साँप का महीना" },
    number: 4,
    season: { pt: "Verão", en: "Summer", es: "Verano", hi: "गर्मी" },
    element: { pt: "Fogo Yin", en: "Yin Fire", es: "Fuego Yin", hi: "यिन आग" },
    animal: { pt: "Serpente", en: "Snake", es: "Serpiente", hi: "साँप" },
    characteristics: {
        pt: ["Início do verão", "Sabedoria", "Introspecção", "Transformação"],
        en: ["Start of Summer", "Wisdom", "Introspection", "Transformation"],
        es: ["Inicio del Verano", "Sabiduría", "Introspección", "Transformación"],
        hi: ["गर्मी की शुरुआत", "बुद्धि", "आत्मनिरीक्षण", "परिवर्तन"]
    },
    favorableActivities: {
        pt: ["Estudo", "Meditação", "Planejamento", "Pesquisa"],
        en: ["Study", "Meditation", "Planning", "Research"],
        es: ["Estudio", "Meditación", "Planeación", "Investigación"],
        hi: ["अध्ययन", "ध्यान", "योजना", "अनुसंधान"]
    },
    unfavorableActivities: {
        pt: ["Impulsividade", "Superficialidade", "Gastos excessivos"],
        en: ["Impulsivity", "Superficiality", "Overspending"],
        es: ["Impulsividad", "Superficialidad", "Gastos Excesivos"],
        hi: ["आवेग", "सतहीपन", "अत्यधिक खर्च"]
    },
    healthFocus: {
        pt: ["Coração", "Intestino delgado", "Língua"],
        en: ["Heart", "Small Intestine", "Tongue"],
        es: ["Corazón", "Intestino delgado", "Lengua"],
        hi: ["हृदय", "छोटी आंत", "जीभ"]
    },
    luckyColors: {
        pt: ["Vermelho", "Roxo"], en: ["Red", "Purple"],
        es: ["Rojo", "Púrpura"], hi: ["लाल", "बैंगनी"]
    },
    luckyDirections: {
        pt: ["Sul"], en: ["South"],
        es: ["Sur"], hi: ["दक्षिण"]
    },
  },
  {
    name: "wu-yue",
    displayName: { pt: "Mês do Cavalo", en: "Horse Month", es: "Mes del Caballo", hi: "घोड़े का महीना" },
    number: 5,
    season: { pt: "Verão", en: "Summer", es: "Verano", hi: "गर्मी" },
    element: { pt: "Fogo Yang", en: "Yang Fire", es: "Fuego Yang", hi: "यांग आग" },
    animal: { pt: "Cavalo", en: "Horse", es: "Caballo", hi: "घोड़ा" },
    characteristics: {
        pt: ["Verão pleno", "Energia máxima", "Paixão", "Movimento"],
        en: ["Full Summer", "Max Energy", "Passion", "Movement"],
        es: ["Verano Pleno", "Energía Máxima", "Pasión", "Movimiento"],
        hi: ["पूर्ण गर्मी", "अधिकतम ऊर्जा", "जुनून", "आंदोलन"]
    },
    favorableActivities: {
        pt: ["Viagens", "Esportes", "Socialização", "Celebrações"],
        en: ["Travel", "Sports", "Socializing", "Celebrations"],
        es: ["Viajes", "Deportes", "Socializar", "Celebraciones"],
        hi: ["यात्रा", "खेल", "सामाजिक मेलजोल", "जश्न"]
    },
    unfavorableActivities: {
        pt: ["Ficar isolado", "Excesso de trabalho", "Impaciência"],
        en: ["Isolation", "Overwork", "Impatience"],
        es: ["Aislamiento", "Exceso de Trabajo", "Impaciencia"],
        hi: ["अलगाव", "अत्यधिक काम", "अधीरता"]
    },
    healthFocus: {
        pt: ["Coração", "Vasos sanguíneos", "Energia vital"],
        en: ["Heart", "Blood Vessels", "Vital Energy"],
        es: ["Corazón", "Vasos sanguíneos", "Energía Vital"],
        hi: ["हृदय", "रक्त वाहिकाएं", "महत्वपूर्ण ऊर्जा"]
    },
    luckyColors: {
        pt: ["Vermelho", "Laranja"], en: ["Red", "Orange"],
        es: ["Rojo", "Naranja"], hi: ["लाल", "नारंगी"]
    },
    luckyDirections: {
        pt: ["Sul"], en: ["South"],
        es: ["Sur"], hi: ["दक्षिण"]
    },
  },
  {
    name: "wei-yue",
    displayName: { pt: "Mês da Cabra", en: "Goat Month", es: "Mes de la Cabra", hi: "बकरी का महीना" },
    number: 6,
    season: { pt: "Transição Verão-Outono", en: "Summer-Autumn Transition", es: "Transición Verano-Otoño", hi: "ग्रीष्म-शरदकालीन संक्रमण" },
    element: { pt: "Terra Yin", en: "Yin Earth", es: "Tierra Yin", hi: "यिन पृथ्वी" },
    animal: { pt: "Cabra", en: "Goat", es: "Cabra", hi: "बकरी" },
    characteristics: {
        pt: ["Transição de estações", "Criatividade", "Sensibilidade", "Harmonia"],
        en: ["Season Transition", "Creativity", "Sensitivity", "Harmony"],
        es: ["Transición de Estaciones", "Creatividad", "Sensibilidad", "Armonía"],
        hi: ["ऋतु संक्रमण", "रचनात्मकता", "संवेदनशीलता", "सद्भाव"]
    },
    favorableActivities: {
        pt: ["Arte", "Design", "Cuidado familiar", "Decoração"],
        en: ["Art", "Design", "Family Care", "Decoration"],
        es: ["Arte", "Diseño", "Cuidado Familiar", "Decoración"],
        hi: ["कला", "डिजाइन", "पारिवारिक देखभाल", "सजावट"]
    },
    unfavorableActivities: {
        pt: ["Conflitos", "Decisões duras", "Críticas severas"],
        en: ["Conflicts", "Hard Decisions", "Severe Criticism"],
        es: ["Conflictos", "Decisiones Duras", "Crítica Severa"],
        hi: ["संघर्ष", "कठोर निर्णय", "कड़ी आलोचना"]
    },
    healthFocus: {
        pt: ["Baço", "Estômago", "Boca"],
        en: ["Spleen", "Stomach", "Mouth"],
        es: ["Bazo", "Estómago", "Boca"],
        hi: ["प्लीहा", "पेट", "मुंह"]
    },
    luckyColors: {
        pt: ["Amarelo", "Marrom"], en: ["Yellow", "Brown"],
        es: ["Amarillo", "Marrón"], hi: ["पीला", "भूरा"]
    },
    luckyDirections: {
        pt: ["Sudoeste", "Centro"], en: ["Southwest", "Center"],
        es: ["Suroeste", "Centro"], hi: ["दक्षिण पश्चिम", "केंद्र"]
    },
  },
  {
    name: "shen-yue",
    displayName: { pt: "Mês do Macaco", en: "Monkey Month", es: "Mes del Mono", hi: "बंदर का महीना" },
    number: 7,
    season: { pt: "Outono", en: "Autumn", es: "Otoño", hi: "शरद ऋतु" },
    element: { pt: "Metal Yang", en: "Yang Metal", es: "Metal Yang", hi: "यांग धातु" },
    animal: { pt: "Macaco", en: "Monkey", es: "Mono", hi: "बंदर" },
    characteristics: {
        pt: ["Início do outono", "Inteligência", "Adaptabilidade", "Inovação"],
        en: ["Start of Autumn", "Intelligence", "Adaptability", "Innovation"],
        es: ["Inicio del Otoño", "Inteligencia", "Adaptabilidad", "Innovación"],
        hi: ["शरद ऋतु की शुरुआत", "बुद्धि", "अनुकूलनशीलता", "नवाचार"]
    },
    favorableActivities: {
        pt: ["Negócios", "Inovação", "Aprendizado", "Comunicação"],
        en: ["Business", "Innovation", "Learning", "Communication"],
        es: ["Negocios", "Innovación", "Aprendizaje", "Comunicación"],
        hi: ["व्यापार", "नवाचार", "सीखना", "संचार"]
    },
    unfavorableActivities: {
        pt: ["Rotina", "Teimosia", "Falta de flexibilidade"],
        en: ["Routine", "Stubbornness", "Inflexibility"],
        es: ["Rutina", "Terquedad", "Inflexibilidad"],
        hi: ["दिनचर्या", "जिद्दीपन", "कठोरता"]
    },
    healthFocus: {
        pt: ["Pulmões", "Intestino grosso", "Pele"],
        en: ["Lungs", "Large Intestine", "Skin"],
        es: ["Pulmones", "Intestino grueso", "Piel"],
        hi: ["फेफड़े", "बड़ी आंत", "त्वचा"]
    },
    luckyColors: {
        pt: ["Branco", "Dourado"], en: ["White", "Gold"],
        es: ["Blanco", "Dorado"], hi: ["सफेद", "सुनहरा"]
    },
    luckyDirections: {
        pt: ["Oeste", "Noroeste"], en: ["West", "Northwest"],
        es: ["Oeste", "Noroeste"], hi: ["पश्चिम", "उत्तर पश्चिम"]
    },
  },
  {
    name: "you-yue",
    displayName: { pt: "Mês do Galo", en: "Rooster Month", es: "Mes del Gallo", hi: "मुर्गे का महीना" },
    number: 8,
    season: { pt: "Outono", en: "Autumn", es: "Otoño", hi: "शरद ऋतु" },
    element: { pt: "Metal Yin", en: "Yin Metal", es: "Metal Yin", hi: "यिन धातु" },
    animal: { pt: "Galo", en: "Rooster", es: "Gallo", hi: "मुर्गा" },
    characteristics: {
        pt: ["Outono pleno", "Precisão", "Organização", "Colheita"],
        en: ["Full Autumn", "Precision", "Organization", "Harvest"],
        es: ["Otoño Pleno", "Precisión", "Organización", "Cosecha"],
        hi: ["पूर्ण शरद ऋतु", "सटीकता", "संगठन", "कटाई"]
    },
    favorableActivities: {
        pt: ["Organização", "Revisão", "Planejamento", "Finalização"],
        en: ["Organization", "Review", "Planning", "Finishing"],
        es: ["Organización", "Revisión", "Planeación", "Finalización"],
        hi: ["संगठन", "समीक्षा", "योजना", "समापन"]
    },
    unfavorableActivities: {
        pt: ["Procrastinação", "Desorganização", "Perfeccionismo"],
        en: ["Procrastination", "Disorganization", "Perfectionism"],
        es: ["Procrastinación", "Desorganización", "Perfeccionismo"],
        hi: ["टालमटोल", "अव्यवस्था", "पूर्णतावाद"]
    },
    healthFocus: {
        pt: ["Pulmões", "Nariz", "Sistema respiratório"],
        en: ["Lungs", "Nose", "Respiratory System"],
        es: ["Pulmones", "Nariz", "Sistema respiratorio"],
        hi: ["फेफड़े", "नाक", "श्वसन तंत्र"]
    },
    luckyColors: {
        pt: ["Branco", "Prata"], en: ["White", "Silver"],
        es: ["Blanco", "Plata"], hi: ["सफेद", "चांदी"]
    },
    luckyDirections: {
        pt: ["Oeste"], en: ["West"],
        es: ["Este"], hi: ["पश्चिम"]
    },
  },
  {
    name: "xu-yue",
    displayName: { pt: "Mês do Cão", en: "Dog Month", es: "Mes del Perro", hi: "कुत्ते का महीना" },
    number: 9,
    season: { pt: "Transição Outono-Inverno", en: "Autumn-Winter Transition", es: "Transición Otoño-Invierno", hi: "शरद-शीतकालीन संक्रमण" },
    element: { pt: "Terra Yang", en: "Yang Earth", es: "Tierra Yang", hi: "यांग पृथ्वी" },
    animal: { pt: "Cão", en: "Dog", es: "Perro", hi: "कुत्ता" },
    characteristics: {
        pt: ["Transição de estações", "Lealdade", "Proteção", "Justiça"],
        en: ["Season Transition", "Loyalty", "Protection", "Justice"],
        es: ["Transición de Estaciones", "Lealtad", "Protección", "Justicia"],
        hi: ["ऋतु संक्रमण", "वफादारी", "सुरक्षा", "न्याय"]
    },
    favorableActivities: {
        pt: ["Proteção familiar", "Justiça", "Serviço", "Meditação"],
        en: ["Family Protection", "Justice", "Service", "Meditation"],
        es: ["Protección Familiar", "Justicia", "Servicio", "Meditación"],
        hi: ["पारिवारिक सुरक्षा", "न्याय", "सेवा", "ध्यान"]
    },
    unfavorableActivities: {
        pt: ["Injustiça", "Deslealdade", "Conflitos"],
        en: ["Injustice", "Disloyalty", "Conflicts"],
        es: ["Injusticia", "Deslealtad", "Conflictos"],
        hi: ["अन्याय", "विद्रोही", "संघर्ष"]
    },
    healthFocus: {
        pt: ["Estômago", "Músculos", "Sistema imunológico"],
        en: ["Stomach", "Muscles", "Immune System"],
        es: ["Estómago", "Músculos", "Sistema inmunológico"],
        hi: ["पेट", "मांसपेशियों", "प्रतिरक्षा प्रणाली"]
    },
    luckyColors: {
        pt: ["Amarelo", "Marrom"], en: ["Yellow", "Brown"],
        es: ["Amarillo", "Marrón"], hi: ["पीला", "भूरा"]
    },
    luckyDirections: {
        pt: ["Noroeste", "Centro"], en: ["Northwest", "Center"],
        es: ["Noroeste", "Centro"], hi: ["उत्तर पश्चिम", "केंद्र"]
    },
  },
  {
    name: "hai-yue",
    displayName: { pt: "Mês do Porco", en: "Pig Month", es: "Mes del Cerdo", hi: "सुअर का महीना" },
    number: 10,
    season: { pt: "Inverno", en: "Winter", es: "Invierno", hi: "सर्दियां" },
    element: { pt: "Água Yin", en: "Yin Water", es: "Agua Yin", hi: "यिन पानी" },
    animal: { pt: "Porco", en: "Pig", es: "Cerdo", hi: "सुअर" },
    characteristics: {
        pt: ["Início do inverno", "Abundância", "Generosidade", "Descanso"],
        en: ["Start of Winter", "Abundance", "Generosity", "Rest"],
        es: ["Inicio del Invierno", "Abundancia", "Generosidad", "Descanso"],
        hi: ["सर्दियों की शुरुआत", "प्रचुरता", "उदारता", "विश्राम"]
    },
    favorableActivities: {
        pt: ["Celebração", "Generosidade", "Descanso", "Planejamento"],
        en: ["Celebration", "Generosity", "Rest", "Planning"],
        es: ["Celebración", "Generosidad", "Descanso", "Planeación"],
        hi: ["जश्न", "उदारता", "विश्राम", "योजना"]
    },
    unfavorableActivities: {
        pt: ["Excesso", "Gastos desnecessários", "Preguiça"],
        en: ["Excess", "Unnecessary Spending", "Laziness"],
        es: ["Exceso", "Gastos Innecesarios", "Pereza"],
        hi: ["अत्यधिक", "अनावश्यक खर्च", "आलस्य"]
    },
    healthFocus: {
        pt: ["Rins", "Bexiga", "Ossos"],
        en: ["Kidneys", "Bladder", "Bones"],
        es: ["Riñones", "Vejiga", "Huesos"],
        hi: ["गुर्दे", "मूत्राशय", "हड्डियां"]
    },
    luckyColors: {
        pt: ["Preto", "Azul escuro"], en: ["Black", "Dark Blue"],
        es: ["Negro", "Azul Oscuro"], hi: ["काला", "गहरा नीला"]
    },
    luckyDirections: {
        pt: ["Norte"], en: ["North"],
        es: ["Norte"], hi: ["उत्तर"]
    },
  },
  {
    name: "zi-yue",
    displayName: { pt: "Mês do Rato", en: "Rat Month", es: "Mes de la Rata", hi: "चूहे का महीना" },
    number: 11,
    season: { pt: "Inverno", en: "Winter", es: "Invierno", hi: "सर्दियां" },
    element: { pt: "Água Yang", en: "Yang Water", es: "Agua Yang", hi: "यांग पानी" },
    animal: { pt: "Rato", en: "Rat", es: "Rata", hi: "चूहा" },
    characteristics: {
        pt: ["Inverno pleno", "Sabedoria", "Adaptabilidade", "Renovação"],
        en: ["Full Winter", "Wisdom", "Adaptability", "Renewal"],
        es: ["Invierno Pleno", "Sabiduría", "Adaptabilidad", "Renovación"],
        hi: ["पूर्ण सर्दी", "बुद्धि", "अनुकूलनशीलता", "नवीनीकरण"]
    },
    favorableActivities: {
        pt: ["Planejamento", "Estudo", "Networking", "Inovação"],
        en: ["Planning", "Study", "Networking", "Innovation"],
        es: ["Planeación", "Estudio", "Networking", "Innovación"],
        hi: ["योजना", "अध्ययन", "नेटवर्किंग", "नवाचार"]
    },
    unfavorableActivities: {
        pt: ["Oportunismo", "Ansiedade", "Excesso de preocupações"],
        en: ["Opportunism", "Anxiety", "Overworry"],
        es: ["Oportunismo", "Ansiedad", "Preocupación Excesiva"],
        hi: ["अवसरवाद", "चिंता", "अत्यधिक चिंता"]
    },
    healthFocus: {
        pt: ["Rins", "Ouvidos", "Sistema urinário"],
        en: ["Kidneys", "Ears", "Urinary System"],
        es: ["Riñones", "Oídos", "Sistema urinario"],
        hi: ["गुर्दे", "कान", "मूत्र प्रणाली"]
    },
    luckyColors: {
        pt: ["Azul", "Preto"], en: ["Blue", "Black"],
        es: ["Azul", "Negro"], hi: ["नीला", "काला"]
    },
    luckyDirections: {
        pt: ["Norte"], en: ["North"],
        es: ["Norte"], hi: ["उत्तर"]
    },
  },
  {
    name: "chou-yue",
    displayName: { pt: "Mês do Boi", en: "Ox Month", es: "Mes del Buey", hi: "बैल का महीना" },
    number: 12,
    season: { pt: "Transição Inverno-Primavera", en: "Winter-Spring Transition", es: "Transición Invierno-Primavera", hi: "शीत-वसंतकालीन संक्रमण" },
    element: { pt: "Terra Yin", en: "Yin Earth", es: "Tierra Yin", hi: "यिन पृथ्वी" },
    animal: { pt: "Boi", en: "Ox", es: "Buey", hi: "बैल" },
    characteristics: {
        pt: ["Fim do ciclo", "Preparação", "Disciplina", "Consolidação"],
        en: ["Cycle End", "Preparation", "Discipline", "Consolidation"],
        es: ["Fin del Ciclo", "Preparación", "Disciplina", "Consolidación"],
        hi: ["चक्र का अंत", "तैयारी", "अनुशासन", "समेकन"]
    },
    favorableActivities: {
        pt: ["Finalização", "Organização", "Planejamento", "Disciplina"],
        en: ["Finishing", "Organization", "Planning", "Discipline"],
        es: ["Finalización", "Organización", "Planeación", "Disciplina"],
        hi: ["समापन", "संगठन", "योजना", "अनुशासन"]
    },
    unfavorableActivities: {
        pt: ["Inícios precipitados", "Teimosia", "Impaciência"],
        en: ["Hasty Starts", "Stubbornness", "Impatience"],
        es: ["Inicios Apresurados", "Terquedad", "Impaciencia"],
        hi: ["जल्दबाजी की शुरुआत", "जिद्दीपन", "अधीरता"]
    },
    healthFocus: {
        pt: ["Baço", "Estômago", "Articulações"],
        en: ["Spleen", "Stomach", "Joints"],
        es: ["Bazo", "Estómago", "Articulaciones"],
        hi: ["प्लीहा", "पेट", "जोड़"]
    },
    luckyColors: {
        pt: ["Amarelo", "Marrom"], en: ["Yellow", "Brown"],
        es: ["Amarillo", "Marrón"], hi: ["पीला", "भूरा"]
    },
    luckyDirections: {
        pt: ["Nordeste", "Centro"], en: ["Northeast", "Center"],
        es: ["Nordeste", "Centro"], hi: ["उत्तर पूर्व", "केंद्र"]
    },
  },
];

export function getMonthByNumber(monthNumber: number): ChineseMonth | undefined {
  return CHINESE_MONTHS.find(m => m.number === monthNumber);
}

export function getMonthByName(name: string, lang: string = "en"): ChineseMonth | undefined {
  return CHINESE_MONTHS.find(
    m => m.name.toLowerCase() === name.toLowerCase() ||
         (m.displayName as any)[lang]?.toLowerCase().includes(name.toLowerCase()) ||
         m.displayName.pt.toLowerCase().includes(name.toLowerCase())
  );
}

export function getCurrentChineseMonth(): ChineseMonth | undefined {
  const now = new Date();
  const month = now.getMonth() + 1;
  const chineseMonthMap: Record<number, number> = {
    2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6,
    8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 1: 12,
  };
  return getMonthByNumber(chineseMonthMap[month] || 1);
}
