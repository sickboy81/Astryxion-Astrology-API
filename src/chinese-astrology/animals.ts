import { LocalizedText, LocalizedList } from '../i18n.js';

export interface ChineseAnimal {
  name: string;
  displayName: LocalizedText;
  years: number[];
  element: string;
  yinYang: 'yin' | 'yang';
  personality: LocalizedText;
  strengths: LocalizedList;
  weaknesses: LocalizedList;
  compatibleWith: string[];
  incompatibleWith: string[];
  luckyNumbers: number[];
  luckyColors: LocalizedList;
  luckyFlowers: LocalizedList;
  bestDirection: LocalizedText;
  careerStrengths: LocalizedList;
  healthTips: LocalizedList;
}

export const CHINESE_ANIMALS: ChineseAnimal[] = [
  {
    name: 'rat',
    displayName: { pt: 'Rato', en: 'Rat', es: 'Rata', hi: 'चूहा' },
    years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032, 2044],
    element: 'water',
    yinYang: 'yang',
    personality: {
      pt: "Inteligente, versátil e charmoso. O Rato é conhecido por sua adaptabilidade e capacidade de encontrar oportunidades onde outros não veem.",
      en: "Intelligent, versatile and charming. The Rat is known for its adaptability and ability to find opportunities where others do not see them.",
      es: "Inteligente, versátil y encantador. La Rata es conocida por su adaptabilidad y capacidad para encontrar oportunidades donde otros no las ven.",
      hi: "बुद्धिमान, बहुमुखी और आकर्षक। चूहा अपनी अनुकूलन क्षमता और उन अवसरों को खोजने की क्षमता के लिए जाना जाता है जिन्हें दूसरे नहीं देख पाते हैं।"
    },
    strengths: {
      pt: ['Inteligente', 'Adaptável', 'Charmoso', 'Engenhoso', 'Sociável'],
      en: ['Intelligent', 'Adaptable', 'Charming', 'Ingenious', 'Sociable'],
      es: ['Inteligente', 'Adaptable', 'Encantador', 'Ingenioso', 'Sociable'],
      hi: ['बुद्धिमान', 'अनुकूलनशील', 'आकर्षक', 'सरल', 'मिलनसार'],
    },
    weaknesses: {
      pt: ['Oportunista', 'Teimoso', 'Crítico', 'Ansioso'],
      en: ['Opportunistic', 'Stubborn', 'Critical', 'Anxious'],
      es: ['Oportunista', 'Terco', 'Crítico', 'Ansioso'],
      hi: ['अवसरवादी', 'जिद्दी', 'आलोचनात्मक', 'चिंतित'],
    },
    luckyColors: {
      pt: ['dourado', 'azul', 'verde'],
      en: ['gold', 'blue', 'green'],
      es: ['dorado', 'azul', 'verde'],
      hi: ['सुनहरा', 'नीला', 'हरा'],
    },
    luckyFlowers: {
      pt: ['lírio', 'violeta'],
      en: ['lily', 'violet'],
      es: ['lirio', 'violeta'],
      hi: ['लिली', 'बनफशा'],
    },
    careerStrengths: {
      pt: ['Negócios', 'Escrita', 'Entretenimento', 'Finanças'],
      en: ['Business', 'Writing', 'Entertainment', 'Finance'],
      es: ['Negocios', 'Escritura', 'Entretenimiento', 'Finanzas'],
      hi: ['व्यवसाय', 'लेखन', 'मनोरंजन', 'वित्त'],
    },
    healthTips: {
      pt: ['Cuide do sistema digestivo', 'Evite excesso de preocupações', 'Pratique exercícios regulares'],
      en: ['Take care of the digestive system', 'Avoid excessive worrying', 'Practice regular exercise'],
      es: ['Cuida el sistema digestivo', 'Evita el exceso de preocupaciones', 'Practica ejercicio regular'],
      hi: ['पाचन तंत्र का ध्यान रखें', 'अत्यधिक चिंता से बचें', 'नियमित व्यायाम करें'],
    },
    compatibleWith: ['dragon', 'monkey', 'ox'],
    incompatibleWith: ['horse', 'goat', 'rabbit'],
    luckyNumbers: [2, 3],
    bestDirection: {
      pt: 'Oeste', en: 'West', es: 'Oeste', hi: 'पश्चिम'
    },
  },
  {
    name: 'ox',
    displayName: { pt: 'Boi', en: 'Ox', es: 'Buey', hi: 'बैल' },
    years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033, 2045],
    element: 'earth',
    yinYang: 'yin',
    personality: {
      pt: "Diligente, confiável e forte. O Boi é conhecido por sua determinação inabalável e capacidade de trabalho incansável.",
      en: "Diligent, reliable and strong. The Ox is known for its unshakeable determination and tireless work capacity.",
      es: "Diligente, confiable y fuerte. El Buey es conocido por su determinación inquebrantable y su capacidad de trabajo incansable.",
      hi: "परिश्रमी, विश्वसनीय और मजबूत। बैल अपने अडिग संकल्प और अथक कार्य क्षमता के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Diligente', 'Confiável', 'Forte', 'Paciente', 'Metódico'],
      en: ['Diligent', 'Reliable', 'Strong', 'Patient', 'Methodical'],
      es: ['Diligente', 'Confiable', 'Fuerte', 'Paciente', 'Metódico'],
      hi: ['परिश्रमी', 'विश्वसनीय', 'मजबूत', 'धैर्यवान', 'व्यवस्थित'],
    },
    weaknesses: {
      pt: ['Teimoso', 'Convencional', 'Pouco comunicativo'],
      en: ['Stubborn', 'Conventional', 'Uncommunicative'],
      es: ['Terco', 'Convencional', 'Poco comunicativo'],
      hi: ['जिद्दी', 'पारंपरिक', 'अल्पभाषी'],
    },
    luckyColors: {
      pt: ['branco', 'amarelo', 'verde'],
      en: ['white', 'yellow', 'green'],
      es: ['blanco', 'amarillo', 'verde'],
      hi: ['सफेद', 'पीला', 'हरा'],
    },
    luckyFlowers: {
      pt: ['tulipa', 'pêssego'],
      en: ['tulip', 'peach blossom'],
      es: ['tulipán', 'flor de durazno'],
      hi: ['ट्यूलिप', 'आड़ू के फूल'],
    },
    careerStrengths: {
      pt: ['Agricultura', 'Engenharia', 'Medicina', 'Militar'],
      en: ['Agriculture', 'Engineering', 'Medicine', 'Military'],
      es: ['Agricultura', 'Ingeniería', 'Medicina', 'Militar'],
      hi: ['कृषि', 'इंजीनियरिंग', 'चिकित्सा', 'सैन्य'],
    },
    healthTips: {
      pt: ['Cuide das articulações', 'Mantenha rotina de exercícios', 'Evite trabalho excessivo'],
      en: ['Take care of joints', 'Maintain an exercise routine', 'Avoid excessive work'],
      es: ['Cuida las articulaciones', 'Mantén una rutina de ejercicios', 'Evita el trabajo excesivo'],
      hi: ['जोड़ों का ध्यान रखें', 'व्यायाम की दिनचर्या बनाए रखें', 'अत्यधिक काम से बचें'],
    },
    compatibleWith: ['rat', 'snake', 'rooster'],
    incompatibleWith: ['tiger', 'dragon', 'horse', 'goat'],
    luckyNumbers: [1, 4],
    bestDirection: {
      pt: 'Sudeste', en: 'Southeast', es: 'Sureste', hi: 'दक्षिण पूर्व'
    },
  },
  {
    name: 'tiger',
    displayName: { pt: 'Tigre', en: 'Tiger', es: 'Tigre', hi: 'बाघ' },
    years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034, 2046],
    element: 'wood',
    yinYang: 'yang',
    personality: {
      pt: "Corajoso, competitivo e imprevisível. O Tigre é um líder natural com carisma magnético e energia contagiante.",
      en: "Brave, competitive and unpredictable. The Tiger is a natural leader with magnetic charisma and contagious energy.",
      es: "Valiente, competitivo e impredecible. El Tigre es un líder natural con un carisma magnético y una energía contagiosa.",
      hi: "साहसी, प्रतिस्पर्धी और अप्रत्याशित। बाघ चुंबकीय करिश्मा और संक्रामक ऊर्जा वाला एक स्वाभाविक नेता है।"
    },
    strengths: {
      pt: ['Corajoso', 'Carismático', 'Líder nato', 'Confidente', 'Aventureiro'],
      en: ['Brave', 'Charismatic', 'Natural born leader', 'Confident', 'Adventurous'],
      es: ['Valiente', 'Carismático', 'Líder nato', 'Confidente', 'Aventurero'],
      hi: ['साहसी', 'करिश्माई', 'जन्मजात नेता', 'आत्मविश्वासी', 'साहसी'],
    },
    weaknesses: {
      pt: ['Impulsivo', 'Impaciente', 'Arrogante', 'Rebelde'],
      en: ['Impulsive', 'Impatient', 'Arrogant', 'Rebellious'],
      es: ['Impulsivo', 'Impaciente', 'Arrogante', 'Rebelde'],
      hi: ['आवेगी', 'अधीर', 'अभिमानी', 'विद्रोही'],
    },
    luckyColors: {
      pt: ['azul', 'cinza', 'laranja'],
      en: ['blue', 'grey', 'orange'],
      es: ['azul', 'gris', 'naranja'],
      hi: ['नीला', 'धूसर', 'नारंगी'],
    },
    luckyFlowers: {
      pt: ['cinerária', 'flor de ameixa'],
      en: ['cineraria', 'plum blossom'],
      es: ['cineraria', 'flor de ciruelo'],
      hi: ['सिनेरिया', 'बेर के फूल'],
    },
    careerStrengths: {
      pt: ['Política', 'Gestão', 'Exploração', 'Artes'],
      en: ['Politics', 'Management', 'Exploration', 'Arts'],
      es: ['Política', 'Gestión', 'Exploración', 'Artes'],
      hi: ['राजनीति', 'प्रबंधन', 'अन्वेषण', 'कला'],
    },
    healthTips: {
      pt: ['Cuide do fígado', 'Controle a raiva', 'Pratique meditação'],
      en: ['Take care of the liver', 'Control anger', 'Practice meditation'],
      es: ['Cuida el hígado', 'Controla la ira', 'Practica meditación'],
      hi: ['लीवर का ध्यान रखें', 'क्रोध पर नियंत्रण रखें', 'ध्यान का अभ्यास करें'],
    },
    compatibleWith: ['horse', 'dog', 'pig'],
    incompatibleWith: ['ox', 'tiger', 'snake', 'monkey'],
    luckyNumbers: [1, 3, 4],
    bestDirection: {
      pt: 'Leste', en: 'East', es: 'Este', hi: 'पूर्व'
    },
  },
  {
    name: 'rabbit',
    displayName: { pt: 'Coelho', en: 'Rabbit', es: 'Conejo', hi: 'खरगोश' },
    years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035, 2047],
    element: 'wood',
    yinYang: 'yin',
    personality: {
      pt: "Elegante, gentil e compassivo. O Coelho é conhecido por sua sensibilidade artística e natureza pacífica.",
      en: "Elegant, gentle and compassionate. The Rabbit is known for its artistic sensitivity and peaceful nature.",
      es: "Elegante, gentil y compasivo. El Conejo es conocido por su sensibilidad artística y su naturaleza pacífica.",
      hi: "सुरुचिपूर्ण, सौम्य और दयालु। खरगोश अपनी कलात्मक संवेदनशीलता और शांतिपूर्ण प्रकृति के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Elegante', 'Gentil', 'Compassivo', 'Artístico', 'Diplomático'],
      en: ['Elegant', 'Gentle', 'Compassionate', 'Artistic', 'Diplomatic'],
      es: ['Elegante', 'Gentil', 'Compasivo', 'Artístico', 'Diplomático'],
      hi: ['सुरुचिपूर्ण', 'सौम्य', 'दयालु', 'कलात्मक', 'राजनयिक'],
    },
    weaknesses: {
      pt: ['Tímido', 'Indeciso', 'Superficial', 'Conservador'],
      en: ['Shy', 'Indecisive', 'Superficial', 'Conservative'],
      es: ['Tímido', 'Indeciso', 'Superficial', 'Conservador'],
      hi: ['शर्मीला', 'अनिर्णायक', 'सतही', 'रूढ़िवादी'],
    },
    luckyColors: {
      pt: ['vermelho', 'rosa', 'roxo'],
      en: ['red', 'pink', 'purple'],
      es: ['rojo', 'rosa', 'púrpura'],
      hi: ['लाल', 'गुलाबी', 'बैंगनी'],
    },
    luckyFlowers: {
      pt: ['jasmim', 'orquídea'],
      en: ['jasmine', 'plantain lily'],
      es: ['jazmín', 'lirio de los valles'],
      hi: ['चमेली', 'लिली'],
    },
    careerStrengths: {
      pt: ['Arte', 'Design', 'Diplomacia', 'Educação'],
      en: ['Art', 'Design', 'Diplomacy', 'Education'],
      es: ['Arte', 'Diseño', 'Diplomacia', 'Educación'],
      hi: ['कला', 'डिजाइन', 'कूटनीति', 'शिक्षा'],
    },
    healthTips: {
      pt: ['Cuide do sistema nervoso', 'Evite estresse', 'Pratique yoga'],
      en: ['Take care of the nervous system', 'Avoid stress', 'Practice yoga'],
      es: ['Cuida el sistema nervioso', 'Evita el estrés', 'Practica yoga'],
      hi: ['तंत्रिका तंत्र का ध्यान रखें', 'तनाव से बचें', 'योग का अभ्यास करें'],
    },
    compatibleWith: ['goat', 'monkey', 'dog', 'pig'],
    incompatibleWith: ['rat', 'tiger', 'dragon', 'rooster'],
    luckyNumbers: [3, 4, 6],
    bestDirection: {
      pt: 'Sudoeste', en: 'Southwest', es: 'Suroeste', hi: 'दक्षिण पश्चिम'
    },
  },
  {
    name: 'dragon',
    displayName: { pt: 'Dragão', en: 'Dragon', es: 'Dragón', hi: 'ड्रैगन' },
    years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036, 2048],
    element: 'earth',
    yinYang: 'yang',
    personality: {
      pt: "Poderoso, entusiasta e ambicioso. O Dragão é o signo mais auspicioso do zodíaco chinês, simbolizando poder e boa fortuna.",
      en: "Powerful, enthusiastic and ambitious. The Dragon is the most auspicious sign of the Chinese zodiac, symbolizing power and good fortune.",
      es: "Poderoso, entusiasta y ambicioso. El Dragón es el signo más auspicioso del zodiaco chino, simbolizando el poder y la buena fortuna.",
      hi: "शक्तिशाली, उत्साही और महत्वाकांक्षी। ड्रैगन चीनी राशि का सबसे शुभ चिन्ह है, जो शक्ति और सौभाग्य का प्रतीक है।"
    },
    strengths: {
      pt: ['Poderoso', 'Entusiasta', 'Ambicioso', 'Carismático', 'Sortudo'],
      en: ['Powerful', 'Enthusiastic', 'Ambitious', 'Charismatic', 'Lucky'],
      es: ['Poderoso', 'Entusiasta', 'Ambicioso', 'Carismático', 'Afortunado'],
      hi: ['शक्तिशाली', 'उत्साही', 'महत्वाकांक्षी', 'करिश्माई', 'भाग्यशाली'],
    },
    weaknesses: {
      pt: ['Arrogante', 'Impaciente', 'Exigente', 'Inflexível'],
      en: ['Arrogant', 'Impatient', 'Demanding', 'Inflexible'],
      es: ['Arrogante', 'Impaciente', 'Exigente', 'Inflexible'],
      hi: ['अभिमानी', 'अधीर', 'मांग करने वाला', 'अनम्य'],
    },
    luckyColors: {
      pt: ['dourado', 'prata', 'branco'],
      en: ['gold', 'silver', 'white'],
      es: ['dorado', 'plata', 'blanco'],
      hi: ['सुनहरा', 'चांदी', 'सफेद'],
    },
    luckyFlowers: {
      pt: ['dragão', 'bleeding heart'],
      en: ['snapdragon', 'bleeding heart'],
      es: ['boca de dragón', 'corazón sangriento'],
      hi: ['स्नैपड्रैगन', 'ब्लीडिंग हार्ट'],
    },
    careerStrengths: {
      pt: ['Política', 'Negócios', 'Entretenimento', 'Liderança'],
      en: ['Politics', 'Business', 'Entertainment', 'Leadership'],
      es: ['Política', 'Negocios', 'Entretenimiento', 'Liderazgo'],
      hi: ['राजनीति', 'व्यवसाय', 'मनोरंजन', 'नेतृत्व'],
    },
    healthTips: {
      pt: ['Cuide do coração', 'Controle a pressão arterial', 'Evite excessos'],
      en: ['Take care of the heart', 'Control blood pressure', 'Avoid excesses'],
      es: ['Cuida el corazón', 'Controla la presión arterial', 'Evita excesos'],
      hi: ['हृदय का ध्यान रखें', 'रक्तचाप नियंत्रित करें', 'अति से बचें'],
    },
    compatibleWith: ['rat', 'monkey', 'rooster'],
    incompatibleWith: ['ox', 'tiger', 'rabbit', 'dog'],
    luckyNumbers: [1, 6, 7],
    bestDirection: {
      pt: 'Leste', en: 'East', es: 'Este', hi: 'पूर्व'
    },
  },
  {
    name: 'snake',
    displayName: { pt: 'Serpente', en: 'Snake', es: 'Serpiente', hi: 'साँप' },
    years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037, 2049],
    element: 'fire',
    yinYang: 'yin',
    personality: {
      pt: "Sábio, intuitivo e misterioso. A Serpente é conhecida por sua profundidade intelectual e capacidade de transformação.",
      en: "Wise, intuitive and mysterious. The Snake is known for its intellectual depth and capacity for transformation.",
      es: "Sabio, intuitivo y misterioso. La Serpiente es conocida por su profundidad intelectual y capacidad de transformación.",
      hi: "बुद्धिमान, सहज और रहस्यमय। साँप अपनी बौद्धिक गहराई और परिवर्तन की क्षमता के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Sábio', 'Intuitivo', 'Misterioso', 'Elegante', 'Determinado'],
      en: ['Wise', 'Intuitive', 'Mysterious', 'Elegant', 'Determined'],
      es: ['Sabio', 'Intuitivo', 'Misterioso', 'Elegante', 'Determinado'],
      hi: ['बुद्धिमान', 'सहज', 'रहस्यमय', 'सुरुचिपूर्ण', 'दृढ़ संकल्पित'],
    },
    weaknesses: {
      pt: ['Ciumento', 'Desconfiado', 'Vingativo', 'Possessivo'],
      en: ['Jealous', 'Distrustful', 'Vengeful', 'Possessive'],
      es: ['Celoso', 'Desconfiado', 'Vengativo', 'Posesivo'],
      hi: ['ईर्ष्यालु', 'अविश्वासी', 'प्रतिशोधी', 'स्वामित्व वाला'],
    },
    luckyColors: {
      pt: ['vermelho', 'amarelo', 'preto'],
      en: ['red', 'yellow', 'black'],
      es: ['rojo', 'amarillo', 'negro'],
      hi: ['लाल', 'पीला', 'काला'],
    },
    luckyFlowers: {
      pt: ['orquídea', 'cacto'],
      en: ['orchid', 'cactus'],
      es: ['orquídea', 'cactus'],
      hi: ['ऑर्किड', 'कैक्टस'],
    },
    careerStrengths: {
      pt: ['Filosofia', 'Ciência', 'Arte', 'Investigação'],
      en: ['Philosophy', 'Science', 'Art', 'Investigation'],
      es: ['Filosofía', 'Ciencia', 'Arte', 'Investigación'],
      hi: ['दर्शन', 'विज्ञान', 'कला', 'जांच'],
    },
    healthTips: {
      pt: ['Cuide da pele', 'Evite estresse emocional', 'Pratique relaxamento'],
      en: ['Take care of the skin', 'Avoid emotional stress', 'Practice relaxation'],
      es: ['Cuida la piel', 'Evita el estrés emocional', 'Practica la relajación'],
      hi: ['त्वचा का ध्यान रखें', 'भावनात्मक तनाव से बचें', 'विश्राम का अभ्यास करें'],
    },
    compatibleWith: ['dragon', 'rooster', 'ox'],
    incompatibleWith: ['tiger', 'rabbit', 'snake', 'goat', 'pig'],
    luckyNumbers: [2, 8, 9],
    bestDirection: {
      pt: 'Sul', en: 'South', es: 'Sur', hi: 'दक्षिण'
    },
  },
  {
    name: 'horse',
    displayName: { pt: 'Cavalo', en: 'Horse', es: 'Caballo', hi: 'घोड़ा' },
    years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038, 2050],
    element: 'fire',
    yinYang: 'yang',
    personality: {
      pt: "Ativo, energético e livre. O Cavalo é conhecido por seu espírito aventureiro e capacidade de inspirar outros.",
      en: "Active, energetic and free. The Horse is known for its adventurous spirit and ability to inspire others.",
      es: "Activo, energético y libre. El Caballo es conocido por su espíritu aventurero y su capacidad de inspirar a otros.",
      hi: "सक्रिय, ऊर्जावान और स्वतंत्र। घोड़ा अपने साहसी स्वभाव और दूसरों को प्रेरित करने की क्षमता के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Ativo', 'Energético', 'Livre', 'Popular', 'Aventureiro'],
      en: ['Active', 'Energetic', 'Free', 'Popular', 'Adventurous'],
      es: ['Activo', 'Energético', 'Libre', 'Popular', 'Aventurero'],
      hi: ['सक्रिय', 'ऊर्जावान', 'स्वतंत्र', 'लोकप्रिय', 'साहसी'],
    },
    weaknesses: {
      pt: ['Impaciente', 'Impulsivo', 'Teimoso', 'Superficial'],
      en: ['Impatient', 'Impulsive', 'Stubborn', 'Superficial'],
      es: ['Impaciente', 'Impulsivo', 'Terco', 'Superficial'],
      hi: ['अधीर', 'आवेगी', 'जिद्दी', 'सतही'],
    },
    luckyColors: {
      pt: ['amarelo', 'verde', 'vermelho'],
      en: ['yellow', 'green', 'red'],
      es: ['amarillo', 'verde', 'rojo'],
      hi: ['पीला', 'हरा', 'लाल'],
    },
    luckyFlowers: {
      pt: ['girassol', 'íris'],
      en: ['sunflower', 'marigold'],
      es: ['girasol', 'caléndula'],
      hi: ['सूरजमुखी', 'गेंदा'],
    },
    careerStrengths: {
      pt: ['Viagens', 'Comunicação', 'Vendas', 'Esportes'],
      en: ['Travel', 'Communication', 'Sales', 'Sports'],
      es: ['Viajes', 'Comunicación', 'Ventas', 'Deportes'],
      hi: ['यात्रा', 'संचार', 'बिक्री', 'खेल'],
    },
    healthTips: {
      pt: ['Cuide dos músculos', 'Evite acidentes', 'Mantenha rotina de exercícios'],
      en: ['Take care of muscles', 'Avoid accidents', 'Maintain an exercise routine'],
      es: ['Cuida los músculos', 'Evita accidentes', 'Mantén una rutina de ejercicios'],
      hi: ['मांसपेशियों का ध्यान रखें', 'दुर्घटनाओं से बचें', 'व्यायाम की दिनचर्या बनाए रखें'],
    },
    compatibleWith: ['tiger', 'goat', 'dog'],
    incompatibleWith: ['rat', 'ox', 'rabbit', 'horse'],
    luckyNumbers: [2, 3, 7],
    bestDirection: {
      pt: 'Norte', en: 'North', es: 'Norte', hi: 'उत्तर'
    },
  },
  {
    name: 'goat',
    displayName: { pt: 'Cabra', en: 'Goat', es: 'Cabra', hi: 'बकरी' },
    years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039, 2051],
    element: 'earth',
    yinYang: 'yin',
    personality: {
      pt: "Criativa, gentil e compassiva. A Cabra é conhecida por sua sensibilidade artística e natureza pacífica.",
      en: "Creative, gentle and compassionate. The Goat is known for its artistic sensitivity and peaceful nature.",
      es: "Creativa, gentil y compasiva. La Cabra es conocida por su sensibilidad artística y su naturaleza pacífica.",
      hi: "रचनात्मक, सौम्य और दयालु। बकरी अपनी कलात्मक संवेदनशीलता और शांतिपूर्ण प्रकृति के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Criativa', 'Gentil', 'Compassiva', 'Artística', 'Elegante'],
      en: ['Creative', 'Gentle', 'Compassionate', 'Artistic', 'Elegant'],
      es: ['Creativa', 'Gentil', 'Compasiva', 'Artística', 'Elegante'],
      hi: ['रचनात्मक', 'सौम्य', 'दयालु', 'कलात्मक', 'सुरुचिपूर्ण'],
    },
    weaknesses: {
      pt: ['Indecisa', 'Tímida', 'Pessimista', 'Dependente'],
      en: ['Indecisive', 'Shy', 'Pessimistic', 'Dependent'],
      es: ['Indecisa', 'Tímida', 'Pesimista', 'Dependiente'],
      hi: ['अनिर्णायक', 'शर्मीला', 'निराशावादी', 'निर्भर'],
    },
    luckyColors: {
      pt: ['verde', 'vermelho', 'roxo'],
      en: ['green', 'red', 'purple'],
      es: ['verde', 'rojo', 'púrpura'],
      hi: ['हरा', 'लाल', 'बैंगनी'],
    },
    luckyFlowers: {
      pt: ['prímula', 'margarida'],
      en: ['carnation', 'primrose'],
      es: ['clavel', 'prímula'],
      hi: ['कार्नेशन', 'प्रिमरोज़'],
    },
    careerStrengths: {
      pt: ['Arte', 'Design', 'Educação', 'Cuidado'],
      en: ['Art', 'Design', 'Education', 'Caregiving'],
      es: ['Arte', 'Diseño', 'Educación', 'Cuidado'],
      hi: ['कला', 'डिजाइन', 'शिक्षा', 'देखभाल'],
    },
    healthTips: {
      pt: ['Cuide do sistema digestivo', 'Evite preocupações excessivas', 'Pratique meditação'],
      en: ['Take care of the digestive system', 'Avoid excessive worry', 'Practice meditation'],
      es: ['Cuida el sistema digestivo', 'Evita las preocupaciones excesivas', 'Practica meditación'],
      hi: ['पाचन तंत्र का ध्यान रखें', 'अत्यधिक चिंता से बचें', 'ध्यान का अभ्यास करें'],
    },
    compatibleWith: ['rabbit', 'horse', 'pig'],
    incompatibleWith: ['ox', 'tiger', 'dog'],
    luckyNumbers: [2, 7],
    bestDirection: {
      pt: 'Sudoeste', en: 'Southwest', es: 'Suroeste', hi: 'दक्षिण पश्चिम'
    },
  },
  {
    name: 'monkey',
    displayName: { pt: 'Macaco', en: 'Monkey', es: 'Mono', hi: 'बंदर' },
    years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040, 2052],
    element: 'metal',
    yinYang: 'yang',
    personality: {
      pt: "Inteligente, engenhoso e versátil. O Macaco é conhecido por sua mente ágil e capacidade de resolver problemas complexos.",
      en: "Intelligent, ingenious and versatile. The Monkey is known for its agile mind and ability to solve complex problems.",
      es: "Inteligente, ingenioso y versátil. El Mono es conocido por su mente ágil y su capacidad para resolver problemas complejos.",
      hi: "बुद्धिमान, सरल और बहुमुखी। बंदर अपने फुर्तीले दिमाग और जटिल समस्याओं को हल करने की क्षमता के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Inteligente', 'Engenhoso', 'Versátil', 'Curioso', 'Divertido'],
      en: ['Intelligent', 'Ingenious', 'Versatile', 'Curious', 'Funny'],
      es: ['Inteligente', 'Ingenioso', 'Versátil', 'Curioso', 'Divertido'],
      hi: ['बुद्धिमान', 'सरल', 'बहुमुखी', 'जिज्ञासु', 'मज़ेदार'],
    },
    weaknesses: {
      pt: ['Arrogante', 'Astuto', 'Desonesto', 'Inconstante'],
      en: ['Arrogant', 'Shrewd', 'Dishonest', 'Inconsistent'],
      es: ['Arrogante', 'Astuto', 'Deshonesto', 'Inconstante'],
      hi: ['अभिमानी', 'चतुर', 'बेईमान', 'असंगत'],
    },
    luckyColors: {
      pt: ['branco', 'azul', 'dourado'],
      en: ['white', 'blue', 'gold'],
      es: ['blanco', 'azul', 'dorado'],
      hi: ['सफेद', 'नीला', 'सुनहरा'],
    },
    luckyFlowers: {
      pt: ['crisântemo', 'allium'],
      en: ['chrysanthemum', 'allium'],
      es: ['crisantemo', 'allium'],
      hi: ['गुलदाउदी', 'एलियम'],
    },
    careerStrengths: {
      pt: ['Ciência', 'Engenharia', 'Negócios', 'Entretenimento'],
      en: ['Science', 'Engineering', 'Business', 'Entertainment'],
      es: ['Ciencia', 'Ingeniería', 'Negocios', 'Entretenimiento'],
      hi: ['विज्ञान', 'इंजीनियरिंग', 'व्यवसाय', 'मनोरंजन'],
    },
    healthTips: {
      pt: ['Cuide do sistema nervoso', 'Evite excessos', 'Mantenha rotina de sono'],
      en: ['Take care of the nervous system', 'Avoid excesses', 'Maintain a sleep routine'],
      es: ['Cuida el sistema nervoso', 'Evita excesos', 'Mantén una rutina de sueño'],
      hi: ['तंत्रिका तंत्र का ध्यान रखें', 'अति से बचें', 'नींद की दिनचर्या बनाए रखें'],
    },
    compatibleWith: ['rat', 'dragon'],
    incompatibleWith: ['tiger', 'pig'],
    luckyNumbers: [4, 9],
    bestDirection: {
      pt: 'Noroeste', en: 'Northwest', es: 'Noroeste', hi: 'उत्तर पश्चिम'
    },
  },
  {
    name: 'rooster',
    displayName: { pt: 'Galo', en: 'Rooster', es: 'Gallo', hi: 'मुर्गा' },
    years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041, 2053],
    element: 'metal',
    yinYang: 'yin',
    personality: {
      pt: "Observador, trabalhador e corajoso. O Galo é conhecido por sua atenção aos detalhes e natureza perfeccionista.",
      en: "Observant, hardworking and brave. The Rooster is known for its attention to detail and perfectionist nature.",
      es: "Observador, trabajador y valiente. El Gallo es conocido por su atención al detalle y su naturaleza perfeccionista.",
      hi: "प्रेक्षक, मेहनती और साहसी। मुर्गा विस्तार पर अपने ध्यान और पूर्णतावादी स्वभाव के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Observador', 'Trabalhador', 'Corajoso', 'Diligente', 'Organizado'],
      en: ['Observant', 'Hardworking', 'Brave', 'Diligent', 'Organized'],
      es: ['Observador', 'Trabalhador', 'Valiente', 'Diligente', 'Organizado'],
      hi: ['प्रेक्षक', 'मेहनती', 'साहसी', 'परिश्रमी', 'व्यवस्थित'],
    },
    weaknesses: {
      pt: ['Arrogante', 'Vaidoso', 'Crítico', 'Perfeccionista'],
      en: ['Arrogant', 'Vain', 'Critical', 'Perfectionist'],
      es: ['Arrogante', 'Vanidoso', 'Crítico', 'Perfeccionista'],
      hi: ['अभिमानी', 'घमंडी', 'आलोচনাत्मक', 'पूर्णतावादी'],
    },
    luckyColors: {
      pt: ['dourado', 'marrom', 'amarelo'],
      en: ['gold', 'brown', 'yellow'],
      es: ['dorado', 'marrón', 'amarillo'],
      hi: ['सुनहरा', 'भूरा', 'पीला'],
    },
    luckyFlowers: {
      pt: ['gladíolo', 'ave-do-paraíso'],
      en: ['gladiola', 'cockscomb'],
      es: ['gladiolo', 'cresta de gallo'],
      hi: ['ग्लेडियोला', 'कॉक्सकॉम्ब'],
    },
    careerStrengths: {
      pt: ['Administração', 'Finanças', 'Militar', 'Ciência'],
      en: ['Administration', 'Finance', 'Military', 'Science'],
      es: ['Administración', 'Finanzas', 'Militar', 'Ciencia'],
      hi: ['प्रशासन', 'वित्त', 'सैन्य', 'विज्ञान'],
    },
    healthTips: {
      pt: ['Cuide do sistema respiratório', 'Evite estresse', 'Pratique exercícios regulares'],
      en: ['Take care of the respiratory system', 'Avoid stress', 'Practice regular exercise'],
      es: ['Cuida el sistema respiratorio', 'Evita el estrés', 'Practica ejercicio regular'],
      hi: ['श्वसन प्रणाली का ध्यान रखें', 'तनाव से बचें', 'नियमित व्यायाम करें'],
    },
    compatibleWith: ['ox', 'dragon', 'snake'],
    incompatibleWith: ['rat', 'rabbit', 'horse', 'goat', 'rooster'],
    luckyNumbers: [5, 7, 8],
    bestDirection: {
      pt: 'Sudeste', en: 'Southeast', es: 'Sureste', hi: 'दक्षिण पूर्व'
    },
  },
  {
    name: 'dog',
    displayName: { pt: 'Cão', en: 'Dog', es: 'Perro', hi: 'कुत्ता' },
    years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042, 2054],
    element: 'earth',
    yinYang: 'yang',
    personality: {
      pt: "Leal, honesto e amável. O Cão é conhecido por sua lealdade inabalável e senso de justiça.",
      en: "Loyal, honest and kind. The Dog is known for its unshakeable loyalty and sense of justice.",
      es: "Leal, honesto y amable. El Perro es conocido por su lealtad inquebrantable y su sentido de la justicia.",
      hi: "वफादार, ईमानदार और दयालु। कुत्ता अपनी अडिग वफादारी और न्याय की भावना के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Leal', 'Honesto', 'Amável', 'Justo', 'Protetor'],
      en: ['Loyal', 'Honest', 'Kind', 'Just', 'Protective'],
      es: ['Leal', 'Honesto', 'Amable', 'Justo', 'Protector'],
      hi: ['वफादार', 'ईमानदार', 'दयालु', 'न्यायप्रिय', 'सुरक्षात्मक'],
    },
    weaknesses: {
      pt: ['Teimoso', 'Ansioso', 'Pessimista', 'Defensivo'],
      en: ['Stubborn', 'Anxious', 'Pessimistic', 'Defensive'],
      es: ['Terco', 'Ansioso', 'Pesimista', 'Defensivo'],
      hi: ['जिद्दी', 'चिंतित', 'निराशावादी', 'रक्षात्मक'],
    },
    luckyColors: {
      pt: ['verde', 'vermelho', 'roxo'],
      en: ['green', 'red', 'purple'],
      es: ['verde', 'rojo', 'púrpura'],
      hi: ['हरा', 'लाल', 'बैंगनी'],
    },
    luckyFlowers: {
      pt: ['rosa', 'oncidium'],
      en: ['rose', 'oncidium orchid'],
      es: ['rosa', 'orquídea oncidium'],
      hi: ['गुलाब', 'ऑन्सीडियम'],
    },
    careerStrengths: {
      pt: ['Polícia', 'Ensino', 'Justiça', 'Cuidado'],
      en: ['Police', 'Teaching', 'Justice', 'Caregiving'],
      es: ['Policía', 'Enseñanza', 'Justicia', 'Cuidado'],
      hi: ['पुलिस', 'शिक्षण', 'न्याय', 'देखभाल'],
    },
    healthTips: {
      pt: ['Cuide do sistema imunológico', 'Evite ansiedade', 'Pratique atividades ao ar livre'],
      en: ['Take care of the immune system', 'Avoid anxiety', 'Practice outdoor activities'],
      es: ['Cuida el sistema inmunológico', 'Evita la ansiedad', 'Practica actividades al aire libre'],
      hi: ['प्रतिरक्षा प्रणाली का ध्यान रखें', 'चिंता से बचें', 'बाहरी गतिविधियों का अभ्यास करें'],
    },
    compatibleWith: ['tiger', 'rabbit', 'horse'],
    incompatibleWith: ['dragon', 'goat', 'rooster'],
    luckyNumbers: [3, 4, 9],
    bestDirection: {
      pt: 'Leste', en: 'East', es: 'Este', hi: 'पूर्व'
    },
  },
  {
    name: 'pig',
    displayName: { pt: 'Porco', en: 'Pig', es: 'Cerdo', hi: 'सुअर' },
    years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043, 2055],
    element: 'water',
    yinYang: 'yin',
    personality: {
      pt: "Generoso, compassivo e sincero. O Porco é conhecido por sua natureza generosa e capacidade de aproveitar a vida.",
      en: "Generous, compassionate and sincere. The Pig is known for its generous nature and ability to enjoy life.",
      es: "Generoso, compasivo y sincero. El Cerdo es conocido por su naturaleza generosa y su capacidad para disfrutar de la vida.",
      hi: "उदार, दयालु और ईमानदार। सुअर अपने उदार स्वभाव और जीवन का आनंद लेने की क्षमता के लिए जाना जाता है।"
    },
    strengths: {
      pt: ['Generoso', 'Compassivo', 'Sincero', 'Tolerante', 'Diligente'],
      en: ['Generous', 'Compassionate', 'Sincere', 'Tolerant', 'Diligent'],
      es: ['Generoso', 'Compasivo', 'Sincero', 'Tolerante', 'Diligente'],
      hi: ['उदार', 'दयालु', 'ईमानदार', 'सहनशील', 'परिश्रमी'],
    },
    weaknesses: {
      pt: ['Ingênuo', 'Materialista', 'Indulgente', 'Teimoso'],
      en: ['Naive', 'Materialistic', 'Indulgent', 'Stubborn'],
      es: ['Ingenuo', 'Materialista', 'Indulgente', 'Terco'],
      hi: ['भोला', 'भौतिकवादी', 'भोगवादी', 'जिद्दी'],
    },
    luckyColors: {
      pt: ['amarelo', 'cinza', 'marrom'],
      en: ['yellow', 'grey', 'brown'],
      es: ['amarillo', 'gris', 'marrón'],
      hi: ['पीला', 'धूसर', 'भूरा'],
    },
    luckyFlowers: {
      pt: ['hortênsia', 'margarida'],
      en: ['hydrangea', 'daisy'],
      es: ['hortensia', 'margarita'],
      hi: ['हाइड्रेंजिया', 'डेज़ी'],
    },
    careerStrengths: {
      pt: ['Gastronomia', 'Entretenimento', 'Cuidado', 'Negócios'],
      en: ['Gastronomy', 'Entertainment', 'Caregiving', 'Business'],
      es: ['Gastronomía', 'Entretenimiento', 'Cuidado', 'Negocios'],
      hi: ['भोजन', 'मनोरंजन', 'देखभाल', 'व्यवसाय'],
    },
    healthTips: {
      pt: ['Cuide do sistema digestivo', 'Evite excessos alimentares', 'Mantenha rotina de exercícios'],
      en: ['Take care of the digestive system', 'Avoid excessive eating', 'Maintain an exercise routine'],
      es: ['Cuida el sistema digestivo', 'Evita comer en exceso', 'Mantén una rutina de ejercicios'],
      hi: ['पाचन तंत्र का ध्यान रखें', 'अधिक खाने से बचें', 'व्यायाम की दिनचर्या बनाए रखें'],
    },
    compatibleWith: ['tiger', 'rabbit', 'goat'],
    incompatibleWith: ['snake', 'monkey'],
    luckyNumbers: [2, 5, 8],
    bestDirection: {
      pt: 'Norte', en: 'North', es: 'Norte', hi: 'उत्तर'
    },
  },
];

export function getAnimalByName(name: string): ChineseAnimal | undefined {
  return CHINESE_ANIMALS.find(
    (a) =>
      a.name.toLowerCase() === name.toLowerCase() ||
      a.displayName.pt.toLowerCase() === name.toLowerCase() ||
      a.displayName.en.toLowerCase() === name.toLowerCase() ||
      a.displayName.es.toLowerCase() === name.toLowerCase()
  );
}

export function getAnimalByYear(year: number): ChineseAnimal | undefined {
  return CHINESE_ANIMALS.find((a) => a.years.includes(year));
}

export function getAnimalNameLocalized(animal: ChineseAnimal, lang: string): string {
  switch (lang) {
    case 'en':
      return animal.displayName.en;
    case 'es':
      return animal.displayName.es;
    case 'hi':
      return animal.displayName.hi;
    default:
      return animal.displayName.pt;
  }
}
