/**
 * Campos de catálogo dos 27 nakshatras (símbolo, natureza, guna, elemento, animal, árvore, direção, casta, género, dosha, atividades) em pt/en/es/hi.
 * Metadados extra vêm de `nakshatra-fields-extra-i18n.ts`.
 * Ordem = `NAKSHATRAS` em `vedic-astrology.ts`.
 */
import type { Language } from "../i18n.js";
import { nakshatraExtraRow, type NakshatraExtraSlice } from "./nakshatra-fields-extra-i18n.js";

type Quad<T> = Record<Language, T>;

/** Campos vindos das linhas `qFields` (sem animal/árvore/etc.). */
export type NakshatraFieldsCoreSlice = {
  symbol: string;
  nature: string;
  guna: string;
  element: string;
  favorableActivities: string[];
  unfavorableActivities: string[];
};

export type NakshatraFieldsSlice = NakshatraFieldsCoreSlice & NakshatraExtraSlice;

export { localizeNakshatraCompatibility, nakshatraDisplayName } from "./nakshatra-fields-extra-i18n.js";

/** Tuplas (en, pt, es, hi) por posição. */
function qFields(
  symbol: [string, string, string, string],
  nature: [string, string, string, string],
  guna: [string, string, string, string],
  element: [string, string, string, string],
  favorable: [string[], string[], string[], string[]],
  unfavorable: [string[], string[], string[], string[]]
): Quad<NakshatraFieldsCoreSlice> {
  return {
    en: {
      symbol: symbol[0],
      nature: nature[0],
      guna: guna[0],
      element: element[0],
      favorableActivities: favorable[0],
      unfavorableActivities: unfavorable[0],
    },
    pt: {
      symbol: symbol[1],
      nature: nature[1],
      guna: guna[1],
      element: element[1],
      favorableActivities: favorable[1],
      unfavorableActivities: unfavorable[1],
    },
    es: {
      symbol: symbol[2],
      nature: nature[2],
      guna: guna[2],
      element: element[2],
      favorableActivities: favorable[2],
      unfavorableActivities: unfavorable[2],
    },
    hi: {
      symbol: symbol[3],
      nature: nature[3],
      guna: guna[3],
      element: element[3],
      favorableActivities: favorable[3],
      unfavorableActivities: unfavorable[3],
    },
  };
}

const NAKSHATRA_FIELDS_ROWS: Quad<NakshatraFieldsCoreSlice>[] = [
  qFields(
    ["Horse head", "Cabeça de cavalo", "Cabeza de caballo", "अश्व शिर"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Sattva", "Sattva", "Sattva", "सत्त्व"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Travel", "Starting new projects", "Medical treatments", "Sports"],
      ["Viagens", "Iniciar novos projetos", "Tratamentos médicos", "Esportes"],
      ["Viajes", "Iniciar nuevos proyectos", "Tratamientos médicos", "Deportes"],
      ["यात्रा", "नई परियोजनाएँ", "चिकित्सा", "खेल"],
    ],
    [
      ["Slow negotiations", "Deep meditation", "Secret activities"],
      ["Negociações lentas", "Meditação profunda", "Atividades secretas"],
      ["Negociaciones lentas", "Meditación profunda", "Actividades secretas"],
      ["धीमी बातचीत", "गहन ध्यान", "गुप्त कार्य"],
    ]
  ),
  qFields(
    ["Yoni (sacred feminine)", "Yoni (órgão feminino)", "Yoni (sagrado femenino)", "योनि (पवित्र स्त्रीत्व)"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Personal transformation", "Fire-related work", "Ancestral rites"],
      ["Transformação pessoal", "Trabalho com fogo", "Rituais ancestrais"],
      ["Transformación personal", "Trabajo con fuego", "Ritos ancestrales"],
      ["व्यक्तिगत परिवर्तन", "अग्नि-कार्य", "पितृ कर्म"],
    ],
    [
      ["Starting relationships", "Long journeys", "Risky investments"],
      ["Iniciar relacionamentos", "Viagens longas", "Investimentos arriscados"],
      ["Iniciar relaciones", "Viajes largos", "Inversiones arriesgadas"],
      ["संबंध आरंभ", "लंबी यात्रा", "जोखिम भरी निवेश"],
    ]
  ),
  qFields(
    ["Razor or spear", "Navalha ou lança", "Navaja o lanza", "छुरी या भाला"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Fire", "Fogo", "Fuego", "अग्नि"],
    [
      ["Cooking", "Metalwork", "Fire ceremonies", "Spiritual cleansing"],
      ["Cozinhar", "Trabalho com metais", "Cerimônias de fogo", "Limpeza espiritual"],
      ["Cocina", "Trabajo con metales", "Ceremonias de fuego", "Limpieza espiritual"],
      ["पाक", "धातु-कर्म", "हवन", "आध्यात्मिक शुद्धि"],
    ],
    [
      ["Water-heavy activities", "Diplomatic talks", "Complete rest"],
      ["Atividades aquáticas", "Negociações diplomáticas", "Descanso"],
      ["Actividades acuáticas", "Negociación diplomática", "Descanso"],
      ["जल कार्य", "कूटनीति", "पूर्ण विश्राम"],
    ]
  ),
  qFields(
    ["Chariot or temple", "Carro ou templo", "Carro o templo", "रथ या मंदिर"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Farming", "Arts", "Marriage", "Construction", "Investments"],
      ["Agricultura", "Artes", "Casamento", "Construção", "Investimentos"],
      ["Agricultura", "Artes", "Matrimonio", "Construcción", "Inversiones"],
      ["कृषि", "कला", "विवाह", "निर्माण", "निवेश"],
    ],
    [
      ["Destruction work", "Open conflict", "Dangerous travel"],
      ["Destruição", "Conflitos", "Viagens perigosas"],
      ["Destrucción", "Conflictos", "Viajes peligrosos"],
      ["विनाश", "संघर्ष", "खतरनाक यात्रा"],
    ]
  ),
  qFields(
    ["Deer’s head", "Cabeça de veado", "Cabeza de ciervo", "मृग शिर"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Research", "Exploration travel", "Study", "Field inquiry"],
      ["Pesquisa", "Viagens de exploração", "Estudo", "Caça"],
      ["Investigación", "Viajes de exploración", "Estudio", "Indagación"],
      ["अनुसंधान", "अन्वेषण यात्रा", "अध्ययन", "खोज"],
    ],
    [
      ["Rigid stability", "Monotonous routine", "Long binding vows"],
      ["Estabilidade", "Rotina", "Compromissos de longo prazo"],
      ["Estabilidad rígida", "Rutina", "Votos largos"],
      ["कठोर स्थिरता", "निरस्त दिनचर्या", "दीर्घ बंधन"],
    ]
  ),
  qFields(
    ["Teardrop or diamond", "Lágrima ou diamante", "Lágrima o diamante", "आँसू या हीरा"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Air", "Ar", "Aire", "वायु"],
    [
      ["Strategic endings", "Intense meditation", "Working with sharp tools"],
      ["Encerramentos estratégicos", "Meditação intensa", "Trabalho com instrumentos cortantes"],
      ["Finales estratégicos", "Meditación intensa", "Trabajo con herramientas afiladas"],
      ["रणनीतिक अंत", "तीव्र ध्यान", "तीक्ष्ण उपकरण"],
    ],
    [
      ["Auspicious beginnings", "Weddings", "Large celebrations"],
      ["Inícios auspiciosos", "Casamentos", "Celebrações"],
      ["Inicios auspiciosos", "Bodas", "Celebraciones"],
      ["शुभारंभ", "विवाह", "महोत्सव"],
    ]
  ),
  qFields(
    ["Bow and quiver", "Arco e flecha ou aljava", "Arco y carcaj", "धनुष और तरकश"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Air", "Ar", "Aire", "वायु"],
    [
      ["Financial recovery", "Returns & refunds", "Reconciliation", "Homeward travel"],
      ["Recuperação financeira", "Retornos", "Reconciliações", "Viagens de volta"],
      ["Recuperación financiera", "Devoluciones", "Reconciliación", "Viaje de regreso"],
      ["वित्तीय पुनर्प्राप्ति", "वापसी", "मेल-मिलाप", "घर लौटना"],
    ],
    [
      ["Forced losses", "Bitter separations", "Demolition"],
      ["Perdas", "Separações", "Destruição"],
      ["Pérdidas", "Separaciones", "Demolición"],
      ["हानि", "वियोग", "विनाश"],
    ]
  ),
  qFields(
    ["Lotus or circular arrow", "Flor de lótus ou flecha circular", "Loto o flecha circular", "कमल या वृत्त-बाण"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Auspicious beginnings", "Marriage", "Investments", "Education"],
      ["Todos os inícios auspiciosos", "Casamentos", "Investimentos", "Educação"],
      ["Inicios auspiciosos", "Matrimonio", "Inversiones", "Educación"],
      ["शुभारंभ", "विवाह", "निवेश", "शिक्षा"],
    ],
    [
      ["Generally none — highly auspicious for most undertakings"],
      ["Em geral nenhuma — universalmente auspicioso"],
      ["En general ninguna — muy auspicioso"],
      ["सामान्यतः कोई नहीं — अधिकांश के लिए अति शुभ"],
    ]
  ),
  qFields(
    ["Coiled serpent", "Serpente enrolada", "Serpiente enrollada", "कुंडलित सर्प"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Research poisons/toxins", "Hypnosis", "Occult study", "Secret investigations"],
      ["Trabalho com venenos", "Hipnose", "Magia", "Investigações secretas"],
      ["Investigación tóxica", "Hipnosis", "Ocultismo", "Investigación secreta"],
      ["विष अनुसंधान", "सम्मोहन", "गुप्त विद्या", "गुप्त जाँच"],
    ],
    [
      ["Blind trust", "Deals with strangers", "Overexposure in public"],
      ["Confiança cega", "Negócios com estranhos", "Atividades públicas"],
      ["Confianza ciega", "Negocios con desconocidos", "Exposición pública"],
      ["अंध विश्वास", "अजनबी से सौदा", "सार्वजनिक अति-प्रदर्शन"],
    ]
  ),
  qFields(
    ["Royal throne or palanquin", "Trono real ou palanquim", "Trono real o palanquín", "राज सिंहासन"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Fire", "Fogo", "Fuego", "अग्नि"],
    [
      ["Ancestral rites", "Property matters", "Leadership roles", "Traditional ceremony"],
      ["Rituais ancestrais", "Assuntos de propriedade", "Liderança", "Cerimônias tradicionais"],
      ["Ritos ancestrales", "Propiedad", "Liderazgo", "Ceremonia tradicional"],
      ["पितृ कर्म", "संपत्ति", "नेतृत्व", "परंपरागत अनुष्ठान"],
    ],
    [
      ["Radical innovation", "Rebellion against lineage", "Breaking tradition"],
      ["Inovação radical", "Rebelião", "Ruptura com tradições"],
      ["Innovación radical", "Rebelión", "Romper tradición"],
      ["क्रांतिकारी नवीनता", "विद्रोह", "परंपरा भंग"],
    ]
  ),
  qFields(
    ["Bed legs or fig tree", "Pernas de cama ou figueira", "Patas de cama o higuera", "शय्या-पाद या उडुम्बर"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Marriage", "Arts", "Entertainment", "Romance", "Festivals"],
      ["Casamentos", "Artes", "Entretenimento", "Romance", "Festas"],
      ["Matrimonio", "Artes", "Entretenimiento", "Romance", "Fiestas"],
      ["विवाह", "कला", "मनोरंजन", "प्रेम", "उत्सव"],
    ],
    [
      ["Heavy labor", "Strict austerity", "Isolation"],
      ["Trabalho árduo", "Austeridade", "Isolamento"],
      ["Trabajo duro", "Austeridad", "Aislamiento"],
      ["कठिन श्रम", "तप", "एकांत"],
    ]
  ),
  qFields(
    ["Four bed legs or fig", "Quatro pernas de cama ou figueira", "Cuatro patas de cama", "चतुःपाद शय्या"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Contracts", "Partnerships", "Charity", "Marriage", "Public service"],
      ["Contratos", "Parcerias", "Serviço social", "Caridade", "Casamentos"],
      ["Contratos", "Asociaciones", "Servicio social", "Caridad", "Matrimonio"],
      ["अनुबंध", "साझेदारी", "दान", "विवाह", "सेवा"],
    ],
    [
      ["Selfishness", "Isolation", "Broken promises"],
      ["Egoísmo", "Isolamento", "Quebra de promessas"],
      ["Egoísmo", "Aislamiento", "Romper promesas"],
      ["स्वार्थ", "एकांत", "वचन भंग"],
    ]
  ),
  qFields(
    ["Open hand", "Mão aberta", "Mano abierta", "खुला हाथ"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Rajas", "Rajas", "Rajas", "रजस्"],
    ["Fire", "Fogo", "Fuego", "अग्नि"],
    [
      ["Crafts", "Healing", "Farming", "Trade", "Teaching"],
      ["Artesanato", "Cura", "Agricultura", "Comércio", "Ensino"],
      ["Artesanía", "Sanación", "Agricultura", "Comercio", "Enseñanza"],
      ["शिल्प", "चिकित्सा", "कृषि", "व्यापार", "शिक्षण"],
    ],
    [
      ["Destruction", "Violence", "Illegal acts"],
      ["Destruição", "Violência", "Atividades ilegais"],
      ["Destrucción", "Violencia", "Actos ilegales"],
      ["विनाश", "हिंसा", "अवैध कार्य"],
    ]
  ),
  qFields(
    ["Bright pearl or lotus", "Pérola brilhante ou lótus", "Perla brillante o loto", "मणि या कमल"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Fire", "Fogo", "Fuego", "अग्नि"],
    [
      ["Design", "Architecture", "Visual arts", "Fashion", "Decor"],
      ["Design", "Arquitetura", "Artes visuais", "Moda", "Decoração"],
      ["Diseño", "Arquitectura", "Artes visuales", "Moda", "Decoración"],
      ["डिज़ाइन", "वास्तु", "चित्रकला", "फैशन", "सज्जा"],
    ],
    [
      ["Excessive plainness", "Neglecting presentation", "Dead routine"],
      ["Simplicidade excessiva", "Negligência com aparência", "Rotina"],
      ["Exceso de sencillez", "Descuidar imagen", "Rutina muerta"],
      ["अति सादगी", "रूप की उपेक्षा", "निरस्त दिनचर्या"],
    ]
  ),
  qFields(
    ["Coral shoot in wind", "Broto de coral ao vento", "Brote de coral al viento", "वायु में प्रवाल"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Air", "Ar", "Aire", "वायु"],
    [
      ["Commerce", "Travel", "Negotiation", "Diplomacy", "Relocation"],
      ["Comércio", "Viagens", "Negociações", "Diplomacia", "Mudanças"],
      ["Comercio", "Viajes", "Negociación", "Diplomacia", "Mudanza"],
      ["व्यापार", "यात्रा", "वार्ता", "कूटनीति", "स्थानांतरण"],
    ],
    [
      ["Stagnation", "Dependency", "Head-on clashes"],
      ["Estagnação", "Dependência", "Conflitos diretos"],
      ["Estancamiento", "Dependencia", "Choques frontales"],
      ["स्थिरता", "आश्रितता", "सीधा संघर्ष"],
    ]
  ),
  qFields(
    ["Triumphal arch or flower pot", "Arco triunfal ou vaso de flores", "Arco triunfal o jarrón", "विजय द्वार"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Competition", "Conquest", "Business", "Politics", "Leadership"],
      ["Competições", "Conquistas", "Negócios", "Política", "Liderança"],
      ["Competición", "Conquista", "Negocios", "Política", "Liderazgo"],
      ["प्रतिस्पर्धा", "विजय", "व्यापार", "राजनीति", "नेतृत्व"],
    ],
    [
      ["Giving up", "Passivity", "Fear of rivalry"],
      ["Desistência", "Passividade", "Medo de competir"],
      ["Rendirse", "Pasividad", "Miedo a competir"],
      ["हार मानना", "निष्क्रियता", "प्रतिस्पर्धा का भय"],
    ]
  ),
  qFields(
    ["Lotus or bow", "Flor de lótus ou arco", "Loto o arco", "कमल या धनुष"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Fire", "Fogo", "Fuego", "अग्नि"],
    [
      ["Partnerships", "Friendship", "Cooperation", "Pilgrimage", "Meditation"],
      ["Parcerias", "Amizades", "Cooperação", "Viagens espirituais", "Meditação"],
      ["Asociaciones", "Amistad", "Cooperación", "Peregrinación", "Meditación"],
      ["साझेदारी", "मित्रता", "सहयोग", "तीर्थ", "ध्यान"],
    ],
    [
      ["Isolation", "Open conflict", "Betrayal"],
      ["Isolamento", "Conflitos", "Traição"],
      ["Aislamiento", "Conflicto", "Traición"],
      ["एकांत", "संघर्ष", "विश्वासघात"],
    ]
  ),
  qFields(
    ["Circular amulet or umbrella", "Amuleto circular ou guarda-chuva", "Amuleto circular o paraguas", "वृत्ताकार ताबीज़"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Protection work", "Leadership", "Occult study", "Investigation", "Defense"],
      ["Proteção", "Liderança", "Ocultismo", "Investigações", "Defesa"],
      ["Protección", "Liderazgo", "Ocultismo", "Investigación", "Defensa"],
      ["रक्षा", "नेतृत्व", "गुप्त विद्या", "जाँच", "रक्षण"],
    ],
    [
      ["Submission", "Weakness", "Needless exposure"],
      ["Submissão", "Fraqueza", "Exposição desnecessária"],
      ["Sumisión", "Debilidad", "Exposición innecesaria"],
      ["आत्मसमर्पण", "दुर्बलता", "अनावश्यक प्रकाशन"],
    ]
  ),
  qFields(
    ["Tangled roots or lion", "Raízes entrelaçadas ou leão", "Raíces enredadas o león", "जड़ें या सिंह"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Deep research", "Strategic cuts", "Occult depth", "Investigation"],
      ["Pesquisa profunda", "Destruição de inimigos", "Ocultismo", "Investigações"],
      ["Investigación profunda", "Cortes estratégicos", "Ocultismo", "Investigación"],
      ["गहन अनुसंधान", "रणनीतिक कटौती", "गूढ़ विद्या", "जाँच"],
    ],
    [
      ["Construction starts", "Auspicious openings", "Grand celebrations"],
      ["Construção", "Inícios auspiciosos", "Celebracões"],
      ["Construcción", "Inicios auspiciosos", "Grandes fiestas"],
      ["निर्माण आरंभ", "शुभारंभ", "महोत्सव"],
    ]
  ),
  qFields(
    ["Winnowing basket or elephant tusk", "Peneira ou presa de elefante", "Criba o colmillo", "सूप या हाथी दांत"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Contests", "Competitive sport", "Purification rites", "Water journeys", "Meditation"],
      ["Competições", "Batalhas", "Purificação", "Viagens aquáticas", "Meditação"],
      ["Competición", "Batalla", "Purificación", "Viajes acuáticos", "Meditación"],
      ["प्रतियोगिता", "युद्धाभ्यास", "शुद्धि", "जल यात्रा", "ध्यान"],
    ],
    [
      ["Surrender", "Quitting", "Impurity neglect"],
      ["Derrota", "Desistência", "Impureza"],
      ["Derrota", "Rendirse", "Impureza"],
      ["पराजय", "त्याग", "अशुद्धि की उपेक्षा"],
    ]
  ),
  qFields(
    ["Elephant tusk or bed", "Presa de elefante ou cama", "Colmillo o cama", "हाथी दांत या शय्या"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Earth", "Terra", "Tierra", "पृथ्वी"],
    [
      ["Leadership", "Justice", "Government", "Administration", "Teaching"],
      ["Liderança", "Justiça", "Governo", "Administração", "Ensino"],
      ["Liderazgo", "Justicia", "Gobierno", "Administración", "Enseñanza"],
      ["नेतृत्व", "न्याय", "शासन", "प्रशासन", "शिक्षण"],
    ],
    [
      ["Injustice", "Corruption", "Abuse of power"],
      ["Injustiça", "Corrupção", "Abuso de poder"],
      ["Injusticia", "Corrupción", "Abuso de poder"],
      ["अन्याय", "भ्रष्टाचार", "शक्ति दुरुपयोग"],
    ]
  ),
  qFields(
    ["Ear or three footprints", "Orelha ou três pegadas", "Oreja o tres huellas", "कान या तीन पदचिह्न"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Rajas", "Rajas", "Rajas", "रजस्"],
    ["Air", "Ar", "Aire", "वायु"],
    [
      ["Study", "Teaching", "Music", "Listening practice", "Oral tradition"],
      ["Estudo", "Ensino", "Música", "Audições", "Transmissão de conhecimento"],
      ["Estudio", "Enseñanza", "Música", "Escucha", "Tradición oral"],
      ["अध्ययन", "शिक्षण", "संगीत", "श्रवण", "मौखिक परंपरा"],
    ],
    [
      ["Willful ignorance", "Refusing to learn", "Intellectual isolation"],
      ["Ignorância", "Recusa em aprender", "Isolamento intelectual"],
      ["Ignorancia", "Rechazar aprender", "Aislamiento intelectual"],
      ["जानबूझकर अज्ञान", "अध्ययन से इनकार", "बौद्धिक एकांत"],
    ]
  ),
  qFields(
    ["Drum or flute", "Tambor ou flauta", "Tambor o flauta", "ढोल या बांसुरी"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Ether (Ākāśa)", "Éter (Ākāśa)", "Éter (Ākāśa)", "आकाश"],
    [
      ["Music", "Dance", "Investments", "Construction", "Celebrations"],
      ["Música", "Dança", "Investimentos", "Construção", "Celebracões"],
      ["Música", "Baile", "Inversiones", "Construcción", "Celebraciones"],
      ["संगीत", "नृत्य", "निवेश", "निर्माण", "उत्सव"],
    ],
    [
      ["Poverty mindset", "Discord", "Loss of rhythm"],
      ["Pobreza", "Discórdia", "Falta de ritmo"],
      ["Pobreza", "Discordia", "Pérdida de ritmo"],
      ["दरिद्र मानसिकता", "कलह", "लय की हानि"],
    ]
  ),
  qFields(
    ["Empty circle or flower", "Círculo vazio ou flor", "Círculo vacío o flor", "रिक्त वृत्त या पुष्प"],
    ["Rakshasa (intense)", "Rakshasa (intenso)", "Rakshasa (intenso)", "राक्षस (तीव्र)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Air", "Ar", "Aire", "वायु"],
    [
      ["Healing", "Meditation", "Occult study", "Research", "Spiritual retreat"],
      ["Cura", "Meditação", "Ocultismo", "Pesquisa", "Isolamento espiritual"],
      ["Sanación", "Meditación", "Ocultismo", "Investigación", "Retiro espiritual"],
      ["चिकित्सा", "ध्यान", "गुप्त विद्या", "अनुसंधान", "आध्यात्मिक एकांत"],
    ],
    [
      ["Excess socializing", "Superficiality", "Health neglect"],
      ["Socialização excessiva", "Superficialidade", "Negligência com saúde"],
      ["Socialización excesiva", "Superficialidad", "Descuidar la salud"],
      ["अति मेलजोल", "सतहीपन", "स्वास्थ्य उपेक्षा"],
    ]
  ),
  qFields(
    ["Sword or two-faced figure", "Espada ou dois rostos", "Espada o dos rostros", "खड्ग या द्विमुख"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Fire", "Fogo", "Fuego", "अग्नि"],
    [
      ["Meditation", "Austerity", "Spiritual transformation", "Fire rituals"],
      ["Meditação", "Austeridade", "Transformação espiritual", "Rituais de fogo"],
      ["Meditación", "Austeridad", "Transformación espiritual", "Rituales de fuego"],
      ["ध्यान", "तप", "आध्यात्मिक परिवर्तन", "अग्नि-अनुष्ठान"],
    ],
    [
      ["Materialism", "Sensual excess", "Comfort seeking"],
      ["Materialismo", "Prazeres sensoriais", "Comodidade excessiva"],
      ["Materialismo", "Exceso sensorial", "Buscar comodidad"],
      ["भौतिकवाद", "इंद्रिय सुख", "सुख-लिप्सा"],
    ]
  ),
  qFields(
    ["Twins or sea serpent", "Gêmeos ou serpente marinha", "Gemelos o serpiente marina", "मिथुन या समुद्री सर्प"],
    ["Manushya (human)", "Manushya (humano)", "Manushya (humano)", "मनुष्य (मानव)"],
    ["Tamas", "Tamas", "Tamas", "तमस्"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Deep study", "Healing", "Protection", "Meditation", "Spiritual teaching"],
      ["Estudo profundo", "Cura", "Proteção", "Meditação", "Ensino espiritual"],
      ["Estudio profundo", "Sanación", "Protección", "Meditación", "Enseñanza espiritual"],
      ["गहन अध्ययन", "चिकित्सा", "रक्षा", "ध्यान", "आध्यात्मिक शिक्षा"],
    ],
    [
      ["Superficiality", "Ignorance", "Spiritual neglect"],
      ["Superficialidade", "Ignorância", "Negligência espiritual"],
      ["Superficialidad", "Ignorancia", "Descuido espiritual"],
      ["सतहीपन", "अज्ञान", "आध्यात्मिक उपेक्षा"],
    ]
  ),
  qFields(
    ["Fish or pair of fish", "Peixe ou par de peixes", "Pez o par de peces", "मछली या मछली युगल"],
    ["Deva (divine)", "Deva (divino)", "Deva (divino)", "देव (दिव्य)"],
    ["Sattva", "Sattva", "Sattva", "सत्त्व"],
    ["Water", "Água", "Agua", "जल"],
    [
      ["Caregiving", "Nourishment", "Safe travel", "Closure rites", "Protection"],
      ["Cuidado", "Nutrição", "Viagens seguras", "Conclusões", "Proteção"],
      ["Cuidado", "Nutrición", "Viaje seguro", "Cierres", "Protección"],
      ["देखभाल", "पोषण", "सुरक्षित यात्रा", "समापन", "रक्षा"],
    ],
    [
      ["Abandonment", "Neglect", "Hasty new starts"],
      ["Abandono", "Negligência", "Inícios precipitados"],
      ["Abandono", "Negligencia", "Inicios apresurados"],
      ["त्याग", "उपेक्षा", "जल्दबाज़ी में आरंभ"],
    ]
  ),
];

export function nakshatraFieldsRow(index: number, lang: Language): NakshatraFieldsSlice {
  const i = ((index % 27) + 27) % 27;
  const row = NAKSHATRA_FIELDS_ROWS[i];
  const base = row[lang] ?? row.en;
  const extra = nakshatraExtraRow(i, lang);
  return { ...base, ...extra };
}
