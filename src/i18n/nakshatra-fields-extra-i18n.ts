/**
 * Metadados adicionais dos 27 nakshatras + rótulos de nome para listas de compatibilidade.
 */
import type { Language } from "../i18n.js";

type Quad<T> = Record<Language, T>;

function quad<T>(en: T, pt: T, es: T, hi: T): Quad<T> {
  return { en, pt, es, hi };
}

export type NakshatraExtraSlice = {
  animal: string;
  tree: string;
  direction: string;
  caste: string;
  gender: string;
  dosha: string;
};

/** Ordem canónica (índice = mesmo que NAKSHATRAS). */
export const NAKSHATRA_NAMES_EN: readonly string[] = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;

const NAKSHATRA_NAME_QUAD: Quad<string>[] = [
  quad("Ashwini", "Ashwini", "Ashwini", "अश्विनी"),
  quad("Bharani", "Bharani", "Bharani", "भरणी"),
  quad("Krittika", "Krittika", "Krittika", "कृत्तिका"),
  quad("Rohini", "Rohini", "Rohini", "रोहिणी"),
  quad("Mrigashira", "Mrigashira", "Mrigashira", "मृगशिरा"),
  quad("Ardra", "Ardra", "Ardra", "आर्द्रा"),
  quad("Punarvasu", "Punarvasu", "Punarvasu", "पुनर्वसु"),
  quad("Pushya", "Pushya", "Pushya", "पुष्य"),
  quad("Ashlesha", "Ashlesha", "Ashlesha", "आश्लेषा"),
  quad("Magha", "Magha", "Magha", "मघा"),
  quad("Purva Phalguni", "Purva Phalguni", "Purva Phalguni", "पूर्व फाल्गुनी"),
  quad("Uttara Phalguni", "Uttara Phalguni", "Uttara Phalguni", "उत्तर फाल्गुनी"),
  quad("Hasta", "Hasta", "Hasta", "हस्त"),
  quad("Chitra", "Chitra", "Chitra", "चित्रा"),
  quad("Swati", "Swati", "Swati", "स्वाति"),
  quad("Vishakha", "Vishakha", "Vishakha", "विशाखा"),
  quad("Anuradha", "Anuradha", "Anuradha", "अनुराधा"),
  quad("Jyeshtha", "Jyeshtha", "Jyeshtha", "ज्येष्ठा"),
  quad("Mula", "Mula", "Mula", "मूल"),
  quad("Purva Ashadha", "Purva Ashadha", "Purva Ashadha", "पूर्वाषाढ़ा"),
  quad("Uttara Ashadha", "Uttara Ashadha", "Uttara Ashadha", "उत्तराषाढ़ा"),
  quad("Shravana", "Shravana", "Shravana", "श्रवण"),
  quad("Dhanishta", "Dhanishta", "Dhanishta", "धनिष्ठा"),
  quad("Shatabhisha", "Shatabhisha", "Shatabhisha", "शतभिषा"),
  quad("Purva Bhadrapada", "Purva Bhadrapada", "Purva Bhadrapada", "पूर्व भाद्रपद"),
  quad("Uttara Bhadrapada", "Uttara Bhadrapada", "Uttara Bhadrapada", "उत्तर भाद्रपद"),
  quad("Revati", "Revati", "Revati", "रेवती"),
];

export function nakshatraDisplayName(index: number, lang: Language): string {
  const i = ((index % 27) + 27) % 27;
  const row = NAKSHATRA_NAME_QUAD[i];
  return row[lang] ?? row.en;
}

export function nakshatraIndexByEnglishName(name: string): number {
  return NAKSHATRA_NAMES_EN.indexOf(name);
}

/** Mapeia chaves inglesas de `compatibility` para rótulos no idioma pedido. */
export function localizeNakshatraCompatibility(names: string[], lang: Language): string[] {
  return names.map((name) => {
    const idx = nakshatraIndexByEnglishName(name);
    if (idx < 0) return name;
    return nakshatraDisplayName(idx, lang);
  });
}

const NAKSHATRA_EXTRA_ROWS: Quad<NakshatraExtraSlice>[] = [
  quad(
    { animal: "Male horse", tree: "Strychnine tree (Strychnos)", direction: "South", caste: "Vaishya", gender: "Male", dosha: "Kapha" },
    { animal: "Cavalo macho", tree: "Nux-vômica (Strychnos)", direction: "Sul", caste: "Vaishya", gender: "Macho", dosha: "Kapha" },
    { animal: "Caballo macho", tree: "Estricnina (Strychnos)", direction: "Sur", caste: "Vaishya", gender: "Macho", dosha: "Kapha" },
    { animal: "नर अश्व", tree: "कुचला (strychnos)", direction: "दक्षिण", caste: "वैश्य", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Elephant", tree: "Indian gooseberry (Amla)", direction: "South", caste: "Brahmin", gender: "Female", dosha: "Kapha" },
    { animal: "Elefante", tree: "Amla", direction: "Sul", caste: "Brâmane", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Elefante", tree: "Amla", direction: "Sur", caste: "Bráhmano", gender: "Hembra", dosha: "Kapha" },
    { animal: "हाथी", tree: "आंवला", direction: "दक्षिण", caste: "ब्राह्मण", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Goat", tree: "Banyan", direction: "Southeast", caste: "Kshatriya", gender: "Female", dosha: "Pitta" },
    { animal: "Cabra", tree: "Banyan (figueira-de-pagode)", direction: "Sudeste", caste: "Kshatriya", gender: "Fêmea", dosha: "Pitta" },
    { animal: "Cabra", tree: "Baniano", direction: "Sureste", caste: "Kshatriya", gender: "Hembra", dosha: "Pitta" },
    { animal: "बकरी", tree: "बरगद", direction: "आग्नेय कोण", caste: "क्षत्रिय", gender: "स्त्री", dosha: "पित्त" }
  ),
  quad(
    { animal: "Serpent", tree: "Java plum (Jamun)", direction: "East", caste: "Shudra", gender: "Female", dosha: "Kapha" },
    { animal: "Serpente", tree: "Jamun (jamelão)", direction: "Leste", caste: "Shudra", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Serpiente", tree: "Jamún", direction: "Este", caste: "Shudra", gender: "Hembra", dosha: "Kapha" },
    { animal: "सर्प", tree: "जामुन", direction: "पूर्व", caste: "शूद्र", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Female serpent", tree: "Khadira (Acacia)", direction: "South", caste: "Shudra", gender: "Neutral", dosha: "Kapha" },
    { animal: "Serpente fêmea", tree: "Khadira (acácia)", direction: "Sul", caste: "Shudra", gender: "Neutro", dosha: "Kapha" },
    { animal: "Serpiente hembra", tree: "Khadira (acacia)", direction: "Sur", caste: "Shudra", gender: "Neutro", dosha: "Kapha" },
    { animal: "मादा सर्प", tree: "खदिर", direction: "दक्षिण", caste: "शूद्र", gender: "तटस्थ", dosha: "कफ" }
  ),
  quad(
    { animal: "Female dog", tree: "Salmali (silk cotton)", direction: "North", caste: "Kshatriya", gender: "Female", dosha: "Kapha" },
    { animal: "Cadelo fêmea", tree: "Salmali (paineira)", direction: "Norte", caste: "Kshatriya", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Perra", tree: "Salmali (kapok)", direction: "Norte", caste: "Kshatriya", gender: "Hembra", dosha: "Kapha" },
    { animal: "मादा कुत्ता", tree: "शाल्मली", direction: "उत्तर", caste: "क्षत्रिय", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Female tiger", tree: "Bamboo", direction: "Northeast", caste: "Vaishya", gender: "Female", dosha: "Kapha" },
    { animal: "Tigre fêmea", tree: "Bambu", direction: "Nordeste", caste: "Vaishya", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Tigresa", tree: "Bambú", direction: "Noreste", caste: "Vaishya", gender: "Hembra", dosha: "Kapha" },
    { animal: "मादा बाघ", tree: "बाँस", direction: "ईशान कोण", caste: "वैश्य", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Ram", tree: "Peepal (sacred fig)", direction: "North", caste: "Kshatriya", gender: "Male", dosha: "Kapha" },
    { animal: "Carneiro", tree: "Peepal (figueira sagrada)", direction: "Norte", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "Carnero", tree: "Peepal (higuera sagrada)", direction: "Norte", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "मेष", tree: "पीपल", direction: "उत्तर", caste: "क्षत्रिय", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Cat", tree: "Jambu (rose apple)", direction: "South", caste: "Kshatriya", gender: "Female", dosha: "Kapha" },
    { animal: "Gato", tree: "Jambu (jambo)", direction: "Sul", caste: "Kshatriya", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Gato", tree: "Jambu", direction: "Sur", caste: "Kshatriya", gender: "Hembra", dosha: "Kapha" },
    { animal: "बिल्ली", tree: "जामुन वृक्ष", direction: "दक्षिण", caste: "क्षत्रिय", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Female rat", tree: "Mango", direction: "Southwest", caste: "Shudra", gender: "Female", dosha: "Kapha" },
    { animal: "Rato fêmea", tree: "Mangueira", direction: "Sudoeste", caste: "Shudra", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Rata", tree: "Mango", direction: "Suroeste", caste: "Shudra", gender: "Hembra", dosha: "Kapha" },
    { animal: "मादा चूहा", tree: "आम", direction: "नैऋत्य", caste: "शूद्र", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Male rat", tree: "Palasha (flame of the forest)", direction: "West", caste: "Brahmin", gender: "Female", dosha: "Kapha" },
    { animal: "Rato macho", tree: "Palasha (chama-da-floresta)", direction: "Oeste", caste: "Brâmane", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Rata macho", tree: "Palasha", direction: "Oeste", caste: "Bráhmano", gender: "Hembra", dosha: "Kapha" },
    { animal: "नर चूहा", tree: "पलाश", direction: "पश्चिम", caste: "ब्राह्मण", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Cow", tree: "Apamarga (chaff-flower)", direction: "North", caste: "Kshatriya", gender: "Male", dosha: "Kapha" },
    { animal: "Vaca", tree: "Apamarga", direction: "Norte", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "Vaca", tree: "Apamarga", direction: "Norte", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "गाय", tree: "अपामार्ग", direction: "उत्तर", caste: "क्षत्रिय", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Female buffalo", tree: "Black catechu (Acacia catechu)", direction: "North", caste: "Vaishya", gender: "Female", dosha: "Kapha" },
    { animal: "Búfalo fêmea", tree: "Catechu preto", direction: "Norte", caste: "Vaishya", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Búfala", tree: "Catecu negro", direction: "Norte", caste: "Vaishya", gender: "Hembra", dosha: "Kapha" },
    { animal: "मादा भैंस", tree: "खैर", direction: "उत्तर", caste: "वैश्य", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Female tiger", tree: "Saptaparna (Alstonia)", direction: "South", caste: "Vaishya", gender: "Female", dosha: "Pitta" },
    { animal: "Tigre fêmea", tree: "Saptaparna (Alstonia)", direction: "Sul", caste: "Vaishya", gender: "Fêmea", dosha: "Pitta" },
    { animal: "Tigresa", tree: "Saptaparna", direction: "Sur", caste: "Vaishya", gender: "Hembra", dosha: "Pitta" },
    { animal: "मादा बाघ", tree: "सप्तपर्ण", direction: "दक्षिण", caste: "वैश्य", gender: "स्त्री", dosha: "पित्त" }
  ),
  quad(
    { animal: "Male buffalo", tree: "Kadamba", direction: "North", caste: "Vaishya", gender: "Male", dosha: "Vata" },
    { animal: "Búfalo macho", tree: "Kadamba", direction: "Norte", caste: "Vaishya", gender: "Macho", dosha: "Vata" },
    { animal: "Búfalo macho", tree: "Kadamba", direction: "Norte", caste: "Vaishya", gender: "Macho", dosha: "Vata" },
    { animal: "नर भैंस", tree: "कदंब", direction: "उत्तर", caste: "वैश्य", gender: "पुरुष", dosha: "वात" }
  ),
  quad(
    { animal: "Male tiger", tree: "Wood apple (Bael)", direction: "North", caste: "Vaishya", gender: "Female", dosha: "Kapha" },
    { animal: "Tigre macho", tree: "Wood apple (Bael)", direction: "Norte", caste: "Vaishya", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Tigre macho", tree: "Manzana de madera (Bael)", direction: "Norte", caste: "Vaishya", gender: "Hembra", dosha: "Kapha" },
    { animal: "नर बाघ", tree: "बिल्व", direction: "उत्तर", caste: "वैश्य", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Female deer", tree: "Lotus", direction: "North", caste: "Shudra", gender: "Female", dosha: "Kapha" },
    { animal: "Cervo fêmea", tree: "Lótus", direction: "Norte", caste: "Shudra", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Cierva", tree: "Loto", direction: "Norte", caste: "Shudra", gender: "Hembra", dosha: "Kapha" },
    { animal: "मादा हिरण", tree: "कमल", direction: "उत्तर", caste: "शूद्र", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Male deer", tree: "Banyan (Vata)", direction: "North", caste: "Brahmin", gender: "Male", dosha: "Kapha" },
    { animal: "Cervo macho", tree: "Vata (banyan)", direction: "Norte", caste: "Brâmane", gender: "Macho", dosha: "Kapha" },
    { animal: "Ciervo macho", tree: "Vata (baniano)", direction: "Norte", caste: "Bráhmano", gender: "Macho", dosha: "Kapha" },
    { animal: "नर हिरण", tree: "वट वृक्ष", direction: "उत्तर", caste: "ब्राह्मण", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Male dog", tree: "Salmali (silk cotton)", direction: "Southwest", caste: "Shudra", gender: "Female", dosha: "Kapha" },
    { animal: "Cão macho", tree: "Salmali (paineira)", direction: "Sudoeste", caste: "Shudra", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Perro macho", tree: "Salmali", direction: "Suroeste", caste: "Shudra", gender: "Hembra", dosha: "Kapha" },
    { animal: "नर कुत्ता", tree: "शाल्मली", direction: "नैऋत्य", caste: "शूद्र", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Male monkey", tree: "Banyan", direction: "South", caste: "Brahmin", gender: "Female", dosha: "Kapha" },
    { animal: "Macaco macho", tree: "Banyan", direction: "Sul", caste: "Brâmane", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Mono macho", tree: "Baniano", direction: "Sur", caste: "Bráhmano", gender: "Hembra", dosha: "Kapha" },
    { animal: "नर बंदर", tree: "बरगद", direction: "दक्षिण", caste: "ब्राह्मण", gender: "स्त्री", dosha: "कफ" }
  ),
  quad(
    { animal: "Male mongoose", tree: "Arabian jasmine (Mallika)", direction: "East", caste: "Kshatriya", gender: "Male", dosha: "Kapha" },
    { animal: "Mangusto macho", tree: "Jasmim-mallika", direction: "Leste", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "Mangosta macho", tree: "Jazmín Mallika", direction: "Este", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "नर नेवला", tree: "मल्लिका", direction: "पूर्व", caste: "क्षत्रिय", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Female monkey", tree: "Fig", direction: "North", caste: "Kshatriya", gender: "Male", dosha: "Kapha" },
    { animal: "Macaco fêmea", tree: "Figueira", direction: "Norte", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "Mona", tree: "Higuera", direction: "Norte", caste: "Kshatriya", gender: "Macho", dosha: "Kapha" },
    { animal: "मादा बंदर", tree: "अंजीर", direction: "उत्तर", caste: "क्षत्रिय", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Female lion", tree: "Sandalwood", direction: "South", caste: "Shudra", gender: "Female", dosha: "Vata" },
    { animal: "Leão fêmea", tree: "Sândalo", direction: "Sul", caste: "Shudra", gender: "Fêmea", dosha: "Vata" },
    { animal: "Leona", tree: "Sándalo", direction: "Sur", caste: "Shudra", gender: "Hembra", dosha: "Vata" },
    { animal: "मादा सिंह", tree: "चंदन", direction: "दक्षिण", caste: "शूद्र", gender: "स्त्री", dosha: "वात" }
  ),
  quad(
    { animal: "Female horse", tree: "Khadira (Acacia)", direction: "West", caste: "Vaishya", gender: "Neutral", dosha: "Kapha" },
    { animal: "Cavalo fêmea", tree: "Khadira", direction: "Oeste", caste: "Vaishya", gender: "Neutro", dosha: "Kapha" },
    { animal: "Yegua", tree: "Khadira", direction: "Oeste", caste: "Vaishya", gender: "Neutro", dosha: "Kapha" },
    { animal: "मादा घोड़ा", tree: "खदिर", direction: "पश्चिम", caste: "वैश्य", gender: "तटस्थ", dosha: "कफ" }
  ),
  quad(
    { animal: "Male lion", tree: "Salmali (silk cotton)", direction: "Northeast", caste: "Brahmin", gender: "Male", dosha: "Kapha" },
    { animal: "Leão macho", tree: "Salmali", direction: "Nordeste", caste: "Brâmane", gender: "Macho", dosha: "Kapha" },
    { animal: "León macho", tree: "Salmali", direction: "Noreste", caste: "Bráhmano", gender: "Macho", dosha: "Kapha" },
    { animal: "नर सिंह", tree: "शाल्मली", direction: "ईशान कोण", caste: "ब्राह्मण", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Male cow", tree: "Neem", direction: "Northwest", caste: "Brahmin", gender: "Male", dosha: "Kapha" },
    { animal: "Vaca macho (boi)", tree: "Neem (nim)", direction: "Noroeste", caste: "Brâmane", gender: "Macho", dosha: "Kapha" },
    { animal: "Toro", tree: "Neem", direction: "Noroeste", caste: "Bráhmano", gender: "Macho", dosha: "Kapha" },
    { animal: "नर गौ", tree: "नीम", direction: "वायव्य कोण", caste: "ब्राह्मण", gender: "पुरुष", dosha: "कफ" }
  ),
  quad(
    { animal: "Female elephant", tree: "Palasha (flame of the forest)", direction: "North", caste: "Shudra", gender: "Female", dosha: "Kapha" },
    { animal: "Elefante fêmea", tree: "Palasha", direction: "Norte", caste: "Shudra", gender: "Fêmea", dosha: "Kapha" },
    { animal: "Elefanta", tree: "Palasha", direction: "Norte", caste: "Shudra", gender: "Hembra", dosha: "Kapha" },
    { animal: "मादा हाथी", tree: "पलाश", direction: "उत्तर", caste: "शूद्र", gender: "स्त्री", dosha: "कफ" }
  ),
];

export function nakshatraExtraRow(index: number, lang: Language): NakshatraExtraSlice {
  const i = ((index % 27) + 27) % 27;
  const row = NAKSHATRA_EXTRA_ROWS[i];
  return row[lang] ?? row.en;
}
