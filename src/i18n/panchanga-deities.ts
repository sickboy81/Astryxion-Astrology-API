/**
 * Rótulos localizados das deidades citadas em tithi, vara e karana do Pañcāṅga.
 * Chaves devem coincidir com os campos `deity` em `TITHIS_BASE`, `VARAS_BASE`, `KARANAS_BASE`.
 */
import type { Language } from "../i18n.js";

type Quad = Record<Language, string>;

function q(en: string, pt: string, es: string, hi: string): Quad {
  return { en, pt, es, hi };
}

const DEITY_QUADS: Record<string, Quad> = {
  Brahma: q("Brahma", "Brahmā", "Brahmā", "ब्रह्मा"),
  Vidhatri: q("Vidhatri (arranger)", "Vidhatri (ordenadora)", "Vidhatri (ordenadora)", "विधात्री"),
  Vishnu: q("Vishnu", "Vishnu", "Vishnu", "विष्णु"),
  Ganesha: q("Ganesha", "Ganesha", "Ganesha", "गणेश"),
  Nagas: q("Nagas (serpent powers)", "Nagas (poderes serpentinos)", "Nagas (poderes serpentinos)", "नाग"),
  Kartikeya: q("Kartikeya", "Kartikeya", "Kartikeya", "कार्तिकेय"),
  Surya: q("Surya (Sun)", "Surya (Sol)", "Surya (Sol)", "सूर्य"),
  Rudra: q("Rudra", "Rudra", "Rudra", "रुद्र"),
  Durga: q("Durga", "Durga", "Durga", "दुर्गा"),
  Dharma: q("Dharma", "Dharma", "Dharma", "धर्म"),
  Vishvedevas: q("Vishvedevas", "Vishvedevas", "Vishvedevas", "विश्वेदेव"),
  Kamadeva: q("Kamadeva", "Kamadeva", "Kamadeva", "कामदेव"),
  Shiva: q("Shiva", "Shiva", "Shiva", "शिव"),
  "Chandra/Pitris": q(
    "Chandra (full moon) / Pitris (new moon)",
    "Chandra (lua cheia) / Pitris (lua nova)",
    "Chandra (luna llena) / Pitris (luna nueva)",
    "चंद्र (पूर्णिमा) / पितृ (अमावस्या)"
  ),
  Chandra: q("Chandra (Moon)", "Chandra (Lua)", "Chandra (Luna)", "चंद्र"),
  Mangala: q("Mangala (Mars)", "Mangala (Marte)", "Mangala (Marte)", "मंगल"),
  Budha: q("Budha (Mercury)", "Budha (Mercúrio)", "Budha (Mercurio)", "बुध"),
  Brihaspati: q("Brihaspati (Jupiter)", "Brihaspati (Júpiter)", "Brihaspati (Júpiter)", "बृहस्पति"),
  Shukra: q("Shukra (Venus)", "Shukra (Vênus)", "Shukra (Venus)", "शुक्र"),
  Shani: q("Shani (Saturn)", "Shani (Saturno)", "Shani (Saturno)", "शनि"),
  Indra: q("Indra", "Indra", "Indra", "इंद्र"),
  Mitra: q("Mitra", "Mitra", "Mitra", "मित्र"),
  Aryaman: q("Aryaman", "Aryaman", "Aryaman", "अर्यमन्"),
  Varuna: q("Varuna", "Varuna", "Varuna", "वरुण"),
  Yama: q("Yama", "Yama", "Yama", "यम"),
  Shakuni: q("Shakuni", "Shakuni", "Shakuni", "शकुनि"),
};

export function localizePanchangaDeity(deityKey: string, lang: Language): string {
  const row = DEITY_QUADS[deityKey];
  if (!row) return deityKey;
  return row[lang] ?? row.en;
}
