/**
 * Textos localizados das tabelas do Panchanga (tithi, vara, yoga, karana).
 * Nomes próprios (tithi, yoga, deidades) mantêm forma romanizada; prosa e listas seguem o idioma.
 */
import type { Language } from "../i18n.js";

type Quad<T> = Record<Language, T>;

function quad<T>(en: T, pt: T, es: T, hi: T): Quad<T> {
  return { en, pt, es, hi };
}

export interface TithiI18n {
  nature: string;
  favorableFor: string[];
  unfavorableFor: string[];
}

export interface VaraI18n {
  nature: string;
  favorableFor: string[];
}

export interface YogaI18n {
  nature: string;
  interpretation: string;
}

export interface KaranaI18n {
  isChara: boolean;
  favorableFor: string[];
  unfavorableFor?: string[];
}

const TITHI_ROWS: Quad<TithiI18n>[] = [
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Beginnings", "Construction"], unfavorableFor: ["Marriage"] },
    { nature: "Ugra", favorableFor: ["Inícios", "Construção"], unfavorableFor: ["Casamentos"] },
    { nature: "Ugra (fiero)", favorableFor: ["Inicios", "Construcción"], unfavorableFor: ["Matrimonio"] },
    { nature: "उग्र (Ugra)", favorableFor: ["शुरुआत", "निर्माण"], unfavorableFor: ["विवाह"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Commerce", "Travel"], unfavorableFor: ["Destruction"] },
    { nature: "Mridu", favorableFor: ["Comércio", "Viagens"], unfavorableFor: ["Destruição"] },
    { nature: "Mridu (suave)", favorableFor: ["Comercio", "Viajes"], unfavorableFor: ["Destrucción"] },
    { nature: "मृदु (Mridu)", favorableFor: ["व्यापार", "यात्रा"], unfavorableFor: ["विनाश"] }
  ),
  quad(
    { nature: "Light (Laghu)", favorableFor: ["Haircut", "Shaving"], unfavorableFor: ["Planting"] },
    { nature: "Laghu", favorableFor: ["Corte de cabelo", "Barbear"], unfavorableFor: ["Plantio"] },
    { nature: "Laghu (ligero)", favorableFor: ["Corte de pelo", "Afeitado"], unfavorableFor: ["Siembra"] },
    { nature: "लघु (Laghu)", favorableFor: ["बाल कटवाना", "दाढ़ी"], unfavorableFor: ["रोपण"] }
  ),
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Overcoming enemies"], unfavorableFor: ["Marriage"] },
    { nature: "Ugra", favorableFor: ["Destruição de inimigos"], unfavorableFor: ["Casamentos"] },
    { nature: "Ugra (fiero)", favorableFor: ["Vencer enemigos"], unfavorableFor: ["Matrimonio"] },
    { nature: "उग्र", favorableFor: ["शत्रुओं पर विजय"], unfavorableFor: ["विवाह"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Medicine", "Beginnings"], unfavorableFor: ["Long journeys"] },
    { nature: "Mridu", favorableFor: ["Medicamentos", "Inícios"], unfavorableFor: ["Viagens longas"] },
    { nature: "Mridu", favorableFor: ["Medicina", "Inicios"], unfavorableFor: ["Viajes largos"] },
    { nature: "मृदु", favorableFor: ["औषधि", "शुरुआत"], unfavorableFor: ["लंबी यात्रा"] }
  ),
  quad(
    { nature: "Light (Laghu)", favorableFor: ["Entertainment", "Travel"], unfavorableFor: ["Planting"] },
    { nature: "Laghu", favorableFor: ["Entretenimento", "Viagens"], unfavorableFor: ["Plantio"] },
    { nature: "Laghu", favorableFor: ["Entretenimiento", "Viajes"], unfavorableFor: ["Siembra"] },
    { nature: "लघु", favorableFor: ["मनोरंजन", "यात्रा"], unfavorableFor: ["रोपण"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Marriage", "Travel"], unfavorableFor: ["Destruction"] },
    { nature: "Mridu", favorableFor: ["Casamentos", "Viagens"], unfavorableFor: ["Destruição"] },
    { nature: "Mridu", favorableFor: ["Matrimonio", "Viajes"], unfavorableFor: ["Destrucción"] },
    { nature: "मृदु", favorableFor: ["विवाह", "यात्रा"], unfavorableFor: ["विनाश"] }
  ),
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Overcoming enemies"], unfavorableFor: ["Marriage"] },
    { nature: "Ugra", favorableFor: ["Destruição de inimigos"], unfavorableFor: ["Casamentos"] },
    { nature: "Ugra", favorableFor: ["Vencer enemigos"], unfavorableFor: ["Matrimonio"] },
    { nature: "उग्र", favorableFor: ["शत्रुओं पर विजय"], unfavorableFor: ["विवाह"] }
  ),
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Destruction", "Conflict"], unfavorableFor: ["Auspicious starts"] },
    { nature: "Ugra", favorableFor: ["Destruição", "Luta"], unfavorableFor: ["Inícios auspiciosos"] },
    { nature: "Ugra", favorableFor: ["Destrucción", "Conflicto"], unfavorableFor: ["Inicios auspiciosos"] },
    { nature: "उग्र", favorableFor: ["विनाश", "संघर्ष"], unfavorableFor: ["शुभ आरंभ"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Marriage", "Travel"], unfavorableFor: ["Destruction"] },
    { nature: "Mridu", favorableFor: ["Casamentos", "Viagens"], unfavorableFor: ["Destruição"] },
    { nature: "Mridu", favorableFor: ["Matrimonio", "Viajes"], unfavorableFor: ["Destrucción"] },
    { nature: "मृदु", favorableFor: ["विवाह", "यात्रा"], unfavorableFor: ["विनाश"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Fasting", "Meditation"], unfavorableFor: ["Material pursuits"] },
    { nature: "Mridu", favorableFor: ["Jejum", "Meditação"], unfavorableFor: ["Atividades materiais"] },
    { nature: "Mridu", favorableFor: ["Ayuno", "Meditación"], unfavorableFor: ["Asuntos materiales"] },
    { nature: "मृदु", favorableFor: ["उपवास", "ध्यान"], unfavorableFor: ["भौतिक कार्य"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Charity", "Rituals"], unfavorableFor: ["Travel"] },
    { nature: "Mridu", favorableFor: ["Caridade", "Rituais"], unfavorableFor: ["Viagens"] },
    { nature: "Mridu", favorableFor: ["Caridad", "Rituales"], unfavorableFor: ["Viajes"] },
    { nature: "मृदु", favorableFor: ["दान", "अनुष्ठान"], unfavorableFor: ["यात्रा"] }
  ),
  quad(
    { nature: "Light (Laghu)", favorableFor: ["Entertainment", "Romance"], unfavorableFor: ["Fasting"] },
    { nature: "Laghu", favorableFor: ["Entretenimento", "Romance"], unfavorableFor: ["Jejum"] },
    { nature: "Laghu", favorableFor: ["Entretenimiento", "Romance"], unfavorableFor: ["Ayuno"] },
    { nature: "लघु", favorableFor: ["मनोरंजन", "प्रेम"], unfavorableFor: ["उपवास"] }
  ),
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Overcoming enemies"], unfavorableFor: ["Marriage"] },
    { nature: "Ugra", favorableFor: ["Destruição de inimigos"], unfavorableFor: ["Casamentos"] },
    { nature: "Ugra", favorableFor: ["Vencer enemigos"], unfavorableFor: ["Matrimonio"] },
    { nature: "उग्र", favorableFor: ["शत्रुओं पर विजय"], unfavorableFor: ["विवाह"] }
  ),
  quad(
    { nature: "Mixed (Mridu/Ugra)", favorableFor: ["Ancestral rites", "Meditation"], unfavorableFor: ["Material beginnings"] },
    { nature: "Mridu/Ugra", favorableFor: ["Rituais ancestrais", "Meditação"], unfavorableFor: ["Inícios materiais"] },
    { nature: "Mridu/Ugra", favorableFor: ["Ritos ancestrales", "Meditación"], unfavorableFor: ["Inicios materiales"] },
    { nature: "मृदु/उग्र", favorableFor: ["पितृ कर्म", "ध्यान"], unfavorableFor: ["भौतिक आरंभ"] }
  ),
];

const VARA_ROWS: Quad<VaraI18n>[] = [
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Government affairs", "Leadership"] },
    { nature: "Ugra", favorableFor: ["Assuntos governamentais", "Liderança"] },
    { nature: "Ugra", favorableFor: ["Asuntos de gobierno", "Liderazgo"] },
    { nature: "उग्र", favorableFor: ["शासन के कार्य", "नेतृत्व"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Romance", "Water travel"] },
    { nature: "Mridu", favorableFor: ["Romance", "Viagens aquáticas"] },
    { nature: "Mridu", favorableFor: ["Romance", "Viajes por agua"] },
    { nature: "मृदु", favorableFor: ["प्रेम", "जल यात्रा"] }
  ),
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Sports", "Competition"] },
    { nature: "Ugra", favorableFor: ["Esportes", "Competições"] },
    { nature: "Ugra", favorableFor: ["Deportes", "Competición"] },
    { nature: "उग्र", favorableFor: ["खेल", "प्रतिस्पर्धा"] }
  ),
  quad(
    { nature: "Light (Laghu)", favorableFor: ["Commerce", "Education"] },
    { nature: "Laghu", favorableFor: ["Comércio", "Educação"] },
    { nature: "Laghu", favorableFor: ["Comercio", "Educación"] },
    { nature: "लघु", favorableFor: ["व्यापार", "शिक्षा"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Education", "Marriage"] },
    { nature: "Mridu", favorableFor: ["Educação", "Casamentos"] },
    { nature: "Mridu", favorableFor: ["Educación", "Matrimonio"] },
    { nature: "मृदु", favorableFor: ["शिक्षा", "विवाह"] }
  ),
  quad(
    { nature: "Soft (Mridu)", favorableFor: ["Romance", "Arts"] },
    { nature: "Mridu", favorableFor: ["Romance", "Artes"] },
    { nature: "Mridu", favorableFor: ["Romance", "Artes"] },
    { nature: "मृदु", favorableFor: ["प्रेम", "कला"] }
  ),
  quad(
    { nature: "Fierce (Ugra)", favorableFor: ["Hard work", "Discipline"] },
    { nature: "Ugra", favorableFor: ["Trabalho árduo", "Disciplina"] },
    { nature: "Ugra", favorableFor: ["Trabajo duro", "Disciplina"] },
    { nature: "उग्र", favorableFor: ["कठिन परिश्रम", "अनुशासन"] }
  ),
];

/** 27 linhas: mesma ordem que `YOGAS_BASE` em `vedic-advanced.ts` (yoga = soma eclíptica Sol+Lua). */
const YOGA_ROWS: Quad<YogaI18n>[] = [
  quad(
    { nature: "Inauspicious", interpretation: "Obstacles and delays. Avoid major beginnings." },
    { nature: "Inauspicioso", interpretation: "Obstáculos e atrasos. Evitar inícios importantes." },
    { nature: "Inauspicioso", interpretation: "Obstáculos y retrasos. Evitar inicios importantes." },
    { nature: "अशुभ", interpretation: "बाधाएँ और विलंब। बड़ी शुरुआतें टालें।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Love and harmony. Good for relationships." },
    { nature: "Auspicioso", interpretation: "Amor e harmonia. Bom para relacionamentos." },
    { nature: "Auspicioso", interpretation: "Amor y armonía. Bueno para relaciones." },
    { nature: "शुभ", interpretation: "प्रेम और सामंजस्य। संबंधों के लिए अच्छा।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Longevity and vitality. Excellent for health." },
    { nature: "Auspicioso", interpretation: "Longevidade e vitalidade. Excelente para saúde." },
    { nature: "Auspicioso", interpretation: "Longevidad y vitalidad. Excelente para la salud." },
    { nature: "शुभ", interpretation: "दीर्घायु और जीवन शक्ति। स्वास्थ्य के लिए उत्तम।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Good fortune and prosperity." },
    { nature: "Auspicioso", interpretation: "Boa fortuna e prosperidade." },
    { nature: "Auspicioso", interpretation: "Buena fortuna y prosperidad." },
    { nature: "शुभ", interpretation: "सौभाग्य और समृद्धि।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Beauty and success. Good for the arts." },
    { nature: "Auspicioso", interpretation: "Beleza e sucesso. Bom para artes." },
    { nature: "Auspicioso", interpretation: "Belleza y éxito. Bueno para las artes." },
    { nature: "शुभ", interpretation: "सौंदर्य और सफलता। कलाओं के लिए अच्छा।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Dangers and obstacles. Avoid travel." },
    { nature: "Inauspicioso", interpretation: "Perigos e obstáculos. Evitar viagens." },
    { nature: "Inauspicioso", interpretation: "Peligros y obstáculos. Evitar viajes." },
    { nature: "अशुभ", interpretation: "खतरे और बाधाएँ। यात्रा टालें।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Good deeds and positive outcomes." },
    { nature: "Auspicioso", interpretation: "Boas ações e resultados positivos." },
    { nature: "Auspicioso", interpretation: "Buenas acciones y resultados positivos." },
    { nature: "शुभ", interpretation: "शुभ कर्म और सकारात्मक परिणाम।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Stability and perseverance." },
    { nature: "Auspicioso", interpretation: "Estabilidade e perseverança." },
    { nature: "Auspicioso", interpretation: "Estabilidad y perseverancia." },
    { nature: "शुभ", interpretation: "स्थिरता और दृढ़ता।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Pain and hardship. Avoid beginnings." },
    { nature: "Inauspicioso", interpretation: "Dor e sofrimento. Evitar inícios." },
    { nature: "Inauspicioso", interpretation: "Dolor y sufrimiento. Evitar inicios." },
    { nature: "अशुभ", interpretation: "पीड़ा और कष्ट। आरंभ टालें।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Dangers and challenges. Exercise caution." },
    { nature: "Inauspicioso", interpretation: "Perigos e desafios. Cautela necessária." },
    { nature: "Inauspicioso", interpretation: "Peligros y desafíos. Precaución." },
    { nature: "अशुभ", interpretation: "खतरे और चुनौतियाँ। सावधानी।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Growth and expansion. Excellent for business." },
    { nature: "Auspicioso", interpretation: "Crescimento e expansão. Excelente para negócios." },
    { nature: "Auspicioso", interpretation: "Crecimiento y expansión. Excelente para negocios." },
    { nature: "शुभ", interpretation: "वृद्धि और विस्तार। व्यापार के लिए उत्तम।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Stability and permanence. Good for building." },
    { nature: "Auspicioso", interpretation: "Estabilidade e permanência. Bom para construções." },
    { nature: "Auspicioso", interpretation: "Estabilidad y permanencia. Bueno para construir." },
    { nature: "शुभ", interpretation: "स्थिरता और स्थायित्व। निर्माण के लिए अच्छा।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Obstacles and interruptions." },
    { nature: "Inauspicioso", interpretation: "Obstáculos e interrupções." },
    { nature: "Inauspicioso", interpretation: "Obstáculos e interrupciones." },
    { nature: "अशुभ", interpretation: "बाधाएँ और व्यवधान।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Joy and happiness. Good for celebrations." },
    { nature: "Auspicioso", interpretation: "Alegria e felicidade. Bom para celebrações." },
    { nature: "Auspicioso", interpretation: "Alegría y felicidad. Bueno para celebraciones." },
    { nature: "शुभ", interpretation: "आनंद और प्रसन्नता। उत्सवों के लिए अच्छा।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Sudden harshness and conflict, like lightning. Avoid marriage, oaths, and major travel." },
    { nature: "Inauspicioso", interpretation: "Rudeza súbita e conflito, como um raio. Evitar casamento, juramentos e viagens importantes." },
    { nature: "Inauspicioso", interpretation: "Dureza y conflicto repentinos, como un rayo. Evitar matrimonio, juramentos y viajes importantes." },
    { nature: "अशुभ", interpretation: "अचानक कठोरता और संघर्ष, विद्युत-समान। विवाह, शपथ और बड़ी यात्रा टालें।" }
  ),
  quad(
    { nature: "Very auspicious", interpretation: "Accomplishment and success. Excellent for most things." },
    { nature: "Muito Auspicioso", interpretation: "Realização e sucesso. Excelente para tudo." },
    { nature: "Muy auspicioso", interpretation: "Logro y éxito. Excelente para casi todo." },
    { nature: "अत्यंत शुभ", interpretation: "सिद्धि और सफलता। अधिकांश कार्यों के लिए उत्तम।" }
  ),
  quad(
    { nature: "Very inauspicious", interpretation: "Calamity and loss. Avoid important actions." },
    { nature: "Muito Inauspicioso", interpretation: "Calamidades e perdas. Evitar tudo." },
    { nature: "Muy inauspicioso", interpretation: "Calamidad y pérdida. Evitar acciones importantes." },
    { nature: "अत्यंत अशुभ", interpretation: "आपदा और हानि। महत्वपूर्ण कार्य टालें।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Prosperity and well-being." },
    { nature: "Auspicioso", interpretation: "Prosperidade e bem-estar." },
    { nature: "Auspicioso", interpretation: "Prosperidad y bienestar." },
    { nature: "शुभ", interpretation: "समृद्धि और कल्याण।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Obstacles and barriers." },
    { nature: "Inauspicioso", interpretation: "Obstáculos e barreiras." },
    { nature: "Inauspicioso", interpretation: "Obstáculos y barreras." },
    { nature: "अशुभ", interpretation: "बाधाएँ और रुकावटें।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Auspiciousness and divine blessings." },
    { nature: "Auspicioso", interpretation: "Auspiciosidade e bênçãos divinas." },
    { nature: "Auspicioso", interpretation: "Propiciosidad y bendiciones divinas." },
    { nature: "शुभ", interpretation: "शुभता और दैवी कृपा।" }
  ),
  quad(
    { nature: "Very auspicious", interpretation: "Full accomplishment. Excellent for most things." },
    { nature: "Muito Auspicioso", interpretation: "Realização completa. Excelente para tudo." },
    { nature: "Muy auspicioso", interpretation: "Logro pleno. Excelente para casi todo." },
    { nature: "अत्यंत शुभ", interpretation: "पूर्ण सिद्धि। अधिकांश के लिए उत्तम।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Achievable and attainable goals." },
    { nature: "Auspicioso", interpretation: "Realizável e alcançável." },
    { nature: "Auspicioso", interpretation: "Realizable y alcanzable." },
    { nature: "शुभ", interpretation: "साध्य और प्राप्य लक्ष्य।" }
  ),
  quad(
    { nature: "Very auspicious", interpretation: "Auspicious and beneficial. Excellent for beginnings." },
    { nature: "Muito Auspicioso", interpretation: "Auspicioso e benéfico. Excelente para inícios." },
    { nature: "Muy auspicioso", interpretation: "Propicio y benéfico. Excelente para inicios." },
    { nature: "अत्यंत शुभ", interpretation: "शुभ और हितकारी। आरंभ के लिए उत्तम।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Bright and pure. Good for most activities." },
    { nature: "Auspicioso", interpretation: "Brilhante e puro. Bom para tudo." },
    { nature: "Auspicioso", interpretation: "Brillante y puro. Bueno para la mayoría." },
    { nature: "शुभ", interpretation: "तेजस्वी और शुद्ध। अधिकांश के लिए अच्छा।" }
  ),
  quad(
    { nature: "Very auspicious", interpretation: "Divine and creative. Excellent for spirituality." },
    { nature: "Muito Auspicioso", interpretation: "Divino e criativo. Excelente para espiritualidade." },
    { nature: "Muy auspicioso", interpretation: "Divino y creativo. Excelente para espiritualidad." },
    { nature: "अत्यंत शुभ", interpretation: "दिव्य और सृजनशील। आध्यात्मिकता के लिए उत्तम।" }
  ),
  quad(
    { nature: "Auspicious", interpretation: "Power and authority. Good for leadership." },
    { nature: "Auspicioso", interpretation: "Poder e autoridade. Bom para liderança." },
    { nature: "Auspicioso", interpretation: "Poder y autoridad. Bueno para liderazgo." },
    { nature: "शुभ", interpretation: "शक्ति और अधिकार। नेतृत्व के लिए अच्छा।" }
  ),
  quad(
    { nature: "Inauspicious", interpretation: "Instability and loss. Avoid beginnings." },
    { nature: "Inauspicioso", interpretation: "Instabilidade e perdas. Evitar inícios." },
    { nature: "Inauspicioso", interpretation: "Inestabilidad y pérdida. Evitar inicios." },
    { nature: "अशुभ", interpretation: "अस्थिरता और हानि। आरंभ टालें।" }
  ),
];

const KARANA_ROWS: Quad<KaranaI18n>[] = [
  quad(
    { isChara: true, favorableFor: ["Beginnings", "Travel"] },
    { isChara: true, favorableFor: ["Inícios", "Viagens"] },
    { isChara: true, favorableFor: ["Inicios", "Viajes"] },
    { isChara: true, favorableFor: ["शुरुआत", "यात्रा"] }
  ),
  quad(
    { isChara: true, favorableFor: ["Construction", "Agriculture"] },
    { isChara: true, favorableFor: ["Construção", "Agricultura"] },
    { isChara: true, favorableFor: ["Construcción", "Agricultura"] },
    { isChara: true, favorableFor: ["निर्माण", "कृषि"] }
  ),
  quad(
    { isChara: true, favorableFor: ["Friendship", "Partnerships"] },
    { isChara: true, favorableFor: ["Amizades", "Parcerias"] },
    { isChara: true, favorableFor: ["Amistad", "Asociaciones"] },
    { isChara: true, favorableFor: ["मित्रता", "साझेदारी"] }
  ),
  quad(
    { isChara: true, favorableFor: ["Travel", "Commerce"] },
    { isChara: true, favorableFor: ["Viagens", "Comércio"] },
    { isChara: true, favorableFor: ["Viajes", "Comercio"] },
    { isChara: true, favorableFor: ["यात्रा", "व्यापार"] }
  ),
  quad(
    { isChara: true, favorableFor: ["Medicine", "Healing"] },
    { isChara: true, favorableFor: ["Medicamentos", "Cura"] },
    { isChara: true, favorableFor: ["Medicina", "Sanación"] },
    { isChara: true, favorableFor: ["चिकित्सा", "उपचार"] }
  ),
  quad(
    { isChara: true, favorableFor: ["Business", "Commerce"] },
    { isChara: true, favorableFor: ["Negócios", "Comércio"] },
    { isChara: true, favorableFor: ["Negocios", "Comercio"] },
    { isChara: true, favorableFor: ["व्यवसाय", "व्यापार"] }
  ),
  quad(
    { isChara: true, favorableFor: ["Overcoming enemies"], unfavorableFor: ["Auspicious beginnings"] },
    { isChara: true, favorableFor: ["Destruição de inimigos"], unfavorableFor: ["Inícios auspiciosos"] },
    { isChara: true, favorableFor: ["Vencer enemigos"], unfavorableFor: ["Inicios auspiciosos"] },
    { isChara: true, favorableFor: ["शत्रु पर विजय"], unfavorableFor: ["शुभ आरंभ"] }
  ),
  quad(
    { isChara: false, favorableFor: ["Occult studies", "Magic"] },
    { isChara: false, favorableFor: ["Ocultismo", "Magia"] },
    { isChara: false, favorableFor: ["Ocultismo", "Magia"] },
    { isChara: false, favorableFor: ["गुप्त विद्या", "जादू"] }
  ),
  quad(
    { isChara: false, favorableFor: ["Destruction", "Conflict"] },
    { isChara: false, favorableFor: ["Destruição", "Luta"] },
    { isChara: false, favorableFor: ["Destrucción", "Conflicto"] },
    { isChara: false, favorableFor: ["विनाश", "संघर्ष"] }
  ),
  quad(
    { isChara: false, favorableFor: ["Poison", "Occult"] },
    { isChara: false, favorableFor: ["Veneno", "Ocultismo"] },
    { isChara: false, favorableFor: ["Veneno", "Ocultismo"] },
    { isChara: false, favorableFor: ["विष", "गुप्त"] }
  ),
  quad(
    { isChara: false, favorableFor: ["Destruction"], unfavorableFor: ["Everything else"] },
    { isChara: false, favorableFor: ["Destruição"], unfavorableFor: ["Tudo mais"] },
    { isChara: false, favorableFor: ["Destrucción"], unfavorableFor: ["Todo lo demás"] },
    { isChara: false, favorableFor: ["विनाश"], unfavorableFor: ["अन्य सब"] }
  ),
];

export const PANCHANGA_YOGA_COUNT = YOGA_ROWS.length;

export function panchangaTithiRow(index: number, lang: Language): TithiI18n {
  const row = TITHI_ROWS[Math.min(Math.max(0, index), TITHI_ROWS.length - 1)];
  return row[lang] ?? row.en;
}

export function panchangaVaraRow(dayIndex: number, lang: Language): VaraI18n {
  const i = Math.min(Math.max(0, dayIndex), VARA_ROWS.length - 1);
  const row = VARA_ROWS[i];
  return row[lang] ?? row.en;
}

export function panchangaYogaRow(yogaIndex: number, lang: Language): YogaI18n {
  const i = ((yogaIndex % YOGA_ROWS.length) + YOGA_ROWS.length) % YOGA_ROWS.length;
  const row = YOGA_ROWS[i];
  return row[lang] ?? row.en;
}

export function panchangaKaranaRow(karanaIndex: number, lang: Language): KaranaI18n {
  const i = ((karanaIndex % KARANA_ROWS.length) + KARANA_ROWS.length) % KARANA_ROWS.length;
  const row = KARANA_ROWS[i];
  return row[lang] ?? row.en;
}
