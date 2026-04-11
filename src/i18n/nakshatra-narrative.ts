/**
 * Deidades e descrições curtas dos 27 nakshatras (pt / en / es / hi).
 * Ordem = mesma de `NAKSHATRAS` em `vedic-astrology.ts` (Ashwini … Revati).
 */
import type { Language } from "../i18n.js";
import type { NakshatraData } from "../vedic-astrology.js";
import { localizeVedicPlanetLabel } from "../lib/vedic-planet-labels.js";
import { nakshatraFieldsRow } from "./nakshatra-fields-i18n.js";
import { localizeNakshatraCompatibility } from "./nakshatra-fields-extra-i18n.js";

type Quad<T> = Record<Language, T>;

function quad<T>(en: T, pt: T, es: T, hi: T): Quad<T> {
  return { en, pt, es, hi };
}

export interface NakshatraNarrativeSlice {
  deity: string;
  description: string;
}

const ROWS: Quad<NakshatraNarrativeSlice>[] = [
  quad(
    { deity: "Ashvini Kumaras", description: "First lunar mansion: healing, speed, and new beginnings; celestial twin physicians." },
    { deity: "Kumaras Ashvini", description: "Primeiro nakshatra: cura, rapidez e novos começos; médicos celestes gêmeos." },
    { deity: "Kumaras Ashvini", description: "Primera mansión lunar: sanación, rapidez y nuevos inicios; médicos celestes gemelos." },
    { deity: "अश्विनी कुमार", description: "प्रथम नक्षत्र: चिकित्सा, वेग और नई शुरुआत; स्वर्गीय जुड़वां चिकित्सक।" }
  ),
  quad(
    { deity: "Yama", description: "Bearing and carrying: transformation, discipline, and the cycle of death and renewal." },
    { deity: "Yama", description: "Portar e sustentar: transformação, disciplina e o ciclo de morte e renovação." },
    { deity: "Yama", description: "Sostener: transformación, disciplina y el ciclo de muerte y renovación." },
    { deity: "यम", description: "धारण और परिवर्तन: अनुशासन तथा मृत्यु-पुनर्जन्म चक्र।" }
  ),
  quad(
    { deity: "Agni", description: "Pleiades cluster: purification, courage, and creative fire." },
    { deity: "Agni", description: "Aglomerado das Plêiades: purificação, coragem e fogo criador." },
    { deity: "Agni", description: "Pléyades: purificación, coraje y fuego creador." },
    { deity: "अग्नि", description: "कृत्तिका: शुद्धि, साहस और सृजनात्मक अग्नि।" }
  ),
  quad(
    { deity: "Brahma / Prajapati", description: "Moon’s exalted seat: fertility, growth, beauty, and material flowering." },
    { deity: "Brahmā / Prajāpati", description: "Exaltação da Lua: fertilidade, crescimento, beleza e florescimento material." },
    { deity: "Brahmā / Prajāpati", description: "Exaltación lunar: fertilidad, belleza y florecimiento material." },
    { deity: "ब्रह्मा / प्रजापति", description: "चंद्र की उच्चता: उर्वरता, वृद्धि और सौंदर्य।" }
  ),
  quad(
    { deity: "Soma (Moon)", description: "Deer’s head: curiosity, search, and gentle exploration." },
    { deity: "Soma (Lua)", description: "Cabeça do veado: curiosidade, busca e exploração suave." },
    { deity: "Soma (Luna)", description: "Cabeza del ciervo: curiosidad y búsqueda serena." },
    { deity: "सोम", description: "मृगशिरा: जिज्ञासा, खोज और कोमल अन्वेषण।" }
  ),
  quad(
    { deity: "Rudra", description: "The storm tear: intense change, purification through crisis." },
    { deity: "Rudra", description: "A lágrima da tempestade: mudança intensa, purificação pela crise." },
    { deity: "Rudra", description: "Lágrima de tormenta: cambio intenso y purificación." },
    { deity: "रुद्र", description: "आर्द्रा: तीव्र परिवर्तन और संकट से शुद्धि।" }
  ),
  quad(
    { deity: "Aditi", description: "Return of light: renewal after hardship, cosmic motherly space." },
    { deity: "Aditi", description: "Retorno da luz: renovação após dificuldades, espaço maternal cósmico." },
    { deity: "Aditi", description: "Regreso de la luz: renovación y amplitud maternal." },
    { deity: "अदिति", description: "पुनर्वसु: कष्ट के बाद नवजीवन, विशाल मातृ शक्ति।" }
  ),
  quad(
    { deity: "Brihaspati", description: "Most auspicious mansion for beginnings: nourishment and righteous expansion." },
    { deity: "Brihaspati", description: "Mansão muito auspiciosa para inícios: nutrição e expansão reta." },
    { deity: "Brihaspati", description: "Mansión muy auspiciosa: nutrición y expansión benéfica." },
    { deity: "बृहस्पति", description: "पुष्य: शुभारंभ, पोषण और धर्मिक विस्तार।" }
  ),
  quad(
    { deity: "Nagas", description: "Coiled serpent power: magnetism, depth, and hidden knowledge." },
    { deity: "Nagas", description: "Poder da serpente enroscada: magnetismo, profundidade e saber oculto." },
    { deity: "Nagas", description: "Serpiente enroscada: magnetismo y conocimiento oculto." },
    { deity: "नाग", description: "आश्लेषा: चुंबकत्व, गहराई और गुप्त ज्ञान।" }
  ),
  quad(
    { deity: "Pitris", description: "Throne of ancestors: lineage, authority, and inherited dignity." },
    { deity: "Pitris", description: "Trono dos ancestrais: linhagem, autoridade e dignidade herdada." },
    { deity: "Pitris", description: "Trono ancestral: linaje y autoridad heredada." },
    { deity: "पितृ", description: "मघा: वंश, अधिकार और पैतृक गौरव।" }
  ),
  quad(
    { deity: "Bhaga", description: "Pleasure and creative union: love, arts, and celebration." },
    { deity: "Bhaga", description: "Prazer e união criativa: amor, artes e celebração." },
    { deity: "Bhaga", description: "Placer y unión creativa: arte y celebración." },
    { deity: "भग", description: "पूर्व फाल्गुनी: प्रेम, कला और उत्सव।" }
  ),
  quad(
    { deity: "Aryaman", description: "Generosity and contracts: partnerships, hospitality, and duty." },
    { deity: "Aryaman", description: "Generosidade e contratos: parcerias, hospitalidade e dever." },
    { deity: "Aryaman", description: "Generosidad y contratos: alianzas y hospitalidad." },
    { deity: "अर्यमन्", description: "उत्तर फाल्गुनी: साझेदारी, अतिथ्य और कर्तव्य।" }
  ),
  quad(
    { deity: "Savitr", description: "The hand: skill, healing crafts, and practical manifestation." },
    { deity: "Savitr", description: "A mão: habilidade, ofícios de cura e manifestação prática." },
    { deity: "Savitr", description: "La mano: habilidad y manifestación práctica." },
    { deity: "सवितृ", description: "हस्त: दक्षता, चिकित्सा कौशल और व्यावहारिक सिद्धि।" }
  ),
  quad(
    { deity: "Vishvakarma", description: "Brilliant design: beauty, architecture, and shining craft." },
    { deity: "Vishvakarma", description: "Desenho brilhante: beleza, arquitetura e ofício radiante." },
    { deity: "Vishvakarma", description: "Diseño brillante: belleza y arquitectura." },
    { deity: "विश्वकर्मा", description: "चित्रा: सौंदर्य, वास्तु और कला।" }
  ),
  quad(
    { deity: "Vayu", description: "Wind and independence: trade, movement, and self-direction." },
    { deity: "Vayu", description: "Vento e independência: comércio, movimento e autodireção." },
    { deity: "Vayu", description: "Viento e independencia: comercio y movimiento." },
    { deity: "वायु", description: "स्वाति: वाणिज्य, गति और स्वतंत्रता।" }
  ),
  quad(
    { deity: "Indra-Agni", description: "Forked victory: ambition, perseverance, and sacred fire of purpose." },
    { deity: "Indra-Agni", description: "Vitória bifurcada: ambição, perseverança e fogo sagrado do propósito." },
    { deity: "Indra-Agni", description: "Victoria dividida: ambición y fuego del propósito." },
    { deity: "इंद्र-अग्नि", description: "विशाखा: महत्वाकांक्षा, दृढ़ता और पवित्र उद्देश्य।" }
  ),
  quad(
    { deity: "Mitra", description: "Devotion in friendship: loyalty, cooperation, and soft strength." },
    { deity: "Mitra", description: "Devoção na amizade: lealdade, cooperação e força suave." },
    { deity: "Mitra", description: "Amistad devota: lealtad y cooperación." },
    { deity: "मित्र", description: "अनुराधा: भक्ति, मित्रता और सहयोग।" }
  ),
  quad(
    { deity: "Indra", description: "Elder power: protection, seniority, and storm-king authority." },
    { deity: "Indra", description: "Poder do mais velho: proteção, senioridade e autoridade do rei das tempestades." },
    { deity: "Indra", description: "Poder del mayor: protección y autoridad." },
    { deity: "इंद्र", description: "ज्येष्ठा: रक्षा, वरिष्ठता और नेतृत्व।" }
  ),
  quad(
    { deity: "Nirriti", description: "The root: radical truth, stripping away what is false." },
    { deity: "Nirriti", description: "A raiz: verdade radical, remover o que é falso." },
    { deity: "Nirriti", description: "La raíz: verdad radical y disolución de lo falso." },
    { deity: "निरृति", description: "मूल: मूल सत्य और मिथ्या का अंत।" }
  ),
  quad(
    { deity: "Apas (waters)", description: "Invincible waters: vitality, purification, and flowing strength." },
    { deity: "Apas (águas)", description: "Águas invencíveis: vitalidade, purificação e força fluente." },
    { deity: "Apas (aguas)", description: "Aguas invencibles: vitalidad y purificación." },
    { deity: "अपः", description: "पूर्वाषाढ़ा: जल शक्ति, शुद्धि और जीवन ऊर्जा।" }
  ),
  quad(
    { deity: "Vishvadevas", description: "Universal virtues: just leadership and lasting victory." },
    { deity: "Vishvadevas", description: "Virtudes universais: liderança justa e vitória duradoura." },
    { deity: "Vishvadevas", description: "Virtudes universales: liderazgo justo." },
    { deity: "विश्वेदेव", description: "उत्तराषाढ़ा: न्यायपूर्ण नेतृत्व और स्थायी विजय।" }
  ),
  quad(
    { deity: "Vishnu", description: "The ear: learning, listening, and preserving sacred sound." },
    { deity: "Vishnu", description: "A orelha: aprender, escutar e preservar o som sagrado." },
    { deity: "Vishnu", description: "El oído: aprendizaje y tradición sonora." },
    { deity: "विष्णु", description: "श्रवण: श्रवण, शिक्षा और शास्त्र-संरक्षण।" }
  ),
  quad(
    { deity: "Vasus", description: "Drum and wealth: rhythm, prosperity, and shining gifts." },
    { deity: "Vasus", description: "Tambor e riqueza: ritmo, prosperidade e dádivas brilhantes." },
    { deity: "Vasus", description: "Tambor y riqueza: ritmo y prosperidad." },
    { deity: "वसु", description: "धनिष्ठा: संगीत, समृद्धि और प्रकाश।" }
  ),
  quad(
    { deity: "Varuna", description: "Hundred healers: deep medicine, solitude, and cosmic waters." },
    { deity: "Varuna", description: "Cem curadores: medicina profunda, solidão e águas cósmicas." },
    { deity: "Varuna", description: "Cien sanadores: medicina profunda y soledad." },
    { deity: "वरुण", description: "शतभिषा: गहन चिकित्सा, एकांत और जल तत्व।" }
  ),
  quad(
    { deity: "Aja Ekapada", description: "One-footed fire: fierce spirituality and inner transformation." },
    { deity: "Aja Ekapada", description: "Fogo de um pé: espiritualidade feroz e transformação interior." },
    { deity: "Aja Ekapada", description: "Fuego de un pie: espiritualidad intensa." },
    { deity: "अज एकपाद", description: "पूर्व भाद्रपद: तीव्र आध्यात्म और अंतरंग परिवर्तन।" }
  ),
  quad(
    { deity: "Ahir Budhnya", description: "Serpent of the deep: occult wisdom, steadiness, and protection." },
    { deity: "Ahir Budhnya", description: "Serpente das profundezas: sabedoria oculta, firmeza e proteção." },
    { deity: "Ahir Budhnya", description: "Serpiente de las profundidades: sabiduría oculta." },
    { deity: "अहिर्बुध्न्य", description: "उत्तर भाद्रपद: गूढ़ ज्ञान, स्थिरता और रक्षा।" }
  ),
  quad(
    { deity: "Pushan", description: "The nourisher: safe journeys, care, and gentle completion." },
    { deity: "Pushan", description: "O nutridor: viagens seguras, cuidado e conclusão suave." },
    { deity: "Pushan", description: "El nutridor: viajes seguros y cuidado." },
    { deity: "पूषन्", description: "रेवती: पोषण, सुरक्षित यात्रा और पूर्णता।" }
  ),
];

export function nakshatraNarrativeRow(index: number, lang: Language): NakshatraNarrativeSlice {
  const i = ((index % 27) + 27) % 27;
  const row = ROWS[i];
  return row[lang] ?? row.en;
}

export function nakshatraNarrativeIndexFromLongitude(longitude: number): number {
  const x = ((longitude % 360) + 360) % 360;
  return Math.floor(x / (360 / 27)) % 27;
}

/** Mescla dados canónicos de `getNakshatraForLongitude` com deidade/descrição e regente localizados. */
export function localizeNakshatraForApi(n: NakshatraData, lang: Language): NakshatraData {
  const idx = nakshatraNarrativeIndexFromLongitude(n.longitudeStart);
  const slice = nakshatraNarrativeRow(idx, lang);
  const fields = nakshatraFieldsRow(idx, lang);
  return {
    ...n,
    lord: localizeVedicPlanetLabel(n.lord, lang),
    deity: slice.deity,
    description: slice.description,
    symbol: fields.symbol,
    nature: fields.nature,
    guna: fields.guna,
    element: fields.element,
    animal: fields.animal,
    tree: fields.tree,
    direction: fields.direction,
    caste: fields.caste,
    gender: fields.gender,
    dosha: fields.dosha,
    favorableActivities: fields.favorableActivities,
    unfavorableActivities: fields.unfavorableActivities,
    compatibility: localizeNakshatraCompatibility(n.compatibility, lang),
  };
}
