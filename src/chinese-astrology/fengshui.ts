import { LocalizedText, LocalizedList, type Language } from '../i18n.js';

export interface FengShuiData {
  year: number;
  flyingStar: number;
  favorableDirections: LocalizedList;
  unfavorableDirections: LocalizedList;
  luckyColors: LocalizedList;
  unluckyColors: LocalizedList;
  luckyNumbers: number[];
  unluckyNumbers: number[];
  elementOfYear: LocalizedText;
  recommendations: LocalizedList;
  roomTips: LocalizedList;
  officeTips: LocalizedList;
}

const FENG_SHUI_BY_YEAR: Record<number, FengShuiData> = {
  2024: {
    year: 2024, flyingStar: 3,
    favorableDirections: { pt: ["Norte", "Sul", "Sudeste"], en: ["North", "South", "Southeast"], es: ["Norte", "Sur", "Sureste"], hi: ["उत्तर", "दक्षिण", "दक्षिण पूर्व"] },
    unfavorableDirections: { pt: ["Centro", "Noroeste"], en: ["Center", "Northwest"], es: ["Centro", "Noroeste"], hi: ["केंद्र", "उत्तर पश्चिम"] },
    luckyColors: { pt: ["Verde", "Azul", "Preto"], en: ["Green", "Blue", "Black"], es: ["Verde", "Azul", "Negro"], hi: ["हरा", "नीला", "काला"] },
    unluckyColors: { pt: ["Branco", "Dourado", "Vermelho"], en: ["White", "Gold", "Red"], es: ["Blanco", "Dorado", "Rojo"], hi: ["सफेद", "सुनहरा", "लाल"] },
    luckyNumbers: [1, 3, 4], unluckyNumbers: [2, 5, 7],
    elementOfYear: { pt: "Madeira Yang", en: "Yang Wood", es: "Madera Yang", hi: "यांग लकड़ी" },
    recommendations: {
        pt: ["Ative o Norte com água", "Evite o Centro", "Cores verdes e azuis"],
        en: ["Activate North with water", "Avoid Center", "Green and blue colors"],
        es: ["Activa el Norte con agua", "Evita el Centro", "Colores verdes y azules"],
        hi: ["उत्तर को पानी से सक्रिय करें", "केंद्र से बचें", "हरे और नीले रंग"]
    },
    roomTips: {
        pt: ["Fonte no Norte", "Sem espelhos", "Sudeste limpo"],
        en: ["Fountain in North", "No mirrors", "Clean Southeast"],
        es: ["Fuente en el Norte", "Sin espejos", "Sudeste limpio"],
        hi: ["उत्तर में फव्वारा", "कोई दर्पण नहीं", "स्वच्छ दक्षिण पूर्व"]
    },
    officeTips: {
        pt: ["Mesa para a porta", "Planta no Sudeste", "Norte limpo"],
        en: ["Desk facing door", "Plant in Southeast", "Clean North"],
        es: ["Mesa hacia la puerta", "Planta en el Sudeste", "Norte limpio"],
        hi: ["दरवाजे के सामने की मेज", "दक्षिण पूर्व में पौधा", "स्वच्छ उत्तर"]
    }
  },
  2025: {
    year: 2025, flyingStar: 2,
    favorableDirections: { pt: ["Sudoeste", "Nordeste", "Oeste"], en: ["Southwest", "Northeast", "West"], es: ["Sudoeste", "Nordeste", "Oeste"], hi: ["दक्षिण पश्चिम", "उत्तर पूर्व", "पश्चिम"] },
    unfavorableDirections: { pt: ["Leste", "Sudeste"], en: ["East", "Southeast"], es: ["Este", "Sureste"], hi: ["पूर्व", "दक्षिण पूर्व"] },
    luckyColors: { pt: ["Amarelo", "Marrom", "Branco"], en: ["Yellow", "Brown", "White"], es: ["Amarillo", "Marrón", "Blanco"], hi: ["पीला", "भूरा", "सफेद"] },
    unluckyColors: { pt: ["Verde", "Azul"], en: ["Green", "Blue"], es: ["Verde", "Azul"], hi: ["हरा", "नीला"] },
    luckyNumbers: [2, 5, 8], unluckyNumbers: [3, 4, 9],
    elementOfYear: { pt: "Madeira Yin", en: "Yin Wood", es: "Madera Yin", hi: "यिन लकड़ी" },
    recommendations: {
        pt: ["Terra no Sudoeste", "Evite o Leste", "Tons terrosos"],
        en: ["Earth in Southwest", "Avoid East", "Earth tones"],
        es: ["Tierra en el Sudoeste", "Evita el Este", "Tonos tierra"],
        hi: ["दक्षिण-पश्चिम में पृथ्वी", "पूर्व से बचें", "पृथ्वी के रंग"]
    },
    roomTips: {
        pt: ["Tons terrosos", "Cristais no Noroeste", "Sudoeste limpo"],
        en: ["Earth tones", "Crystals in Northwest", "Clean Southwest"],
        es: ["Tonos tierra", "Cristales en Noroeste", "Sudoeste limpio"],
        hi: ["पृथ्वी के रंग", "उत्तर पश्चिम में क्रिस्टल", "स्वच्छ दक्षिण पश्चिम"]
    },
    officeTips: {
        pt: ["Mesa para Sudoeste", "Tons terrosos", "Sem plantas no Leste"],
        en: ["Desk facing Southwest", "Earth tones", "No plants in East"],
        es: ["Mesa hacia el Sudoeste", "Tonos tierra", "Sin plantas en el Este"],
        hi: ["दक्षिण-पश्चिम की ओर मेज", "पृथ्वी के रंग", "पूर्व में कोई पौधा नहीं"]
    }
  },
  2026: {
    year: 2026, flyingStar: 1,
    favorableDirections: { pt: ["Norte", "Leste", "Sudeste"], en: ["North", "East", "Southeast"], es: ["Norte", "Este", "Sureste"], hi: ["उत्तर", "पूर्व", "दक्षिण पूर्व"] },
    unfavorableDirections: { pt: ["Sudoeste", "Noroeste"], en: ["Southwest", "Northwest"], es: ["Sudoeste", "Noroeste"], hi: ["दक्षिण पश्चिम", "उत्तर पश्चिम"] },
    luckyColors: { pt: ["Azul", "Preto", "Verde"], en: ["Blue", "Black", "Green"], es: ["Azul", "Negro", "Verde"], hi: ["नीला", "काला", "हरा"] },
    unluckyColors: { pt: ["Amarelo", "Marrom"], en: ["Yellow", "Brown"], es: ["Amarillo", "Marrón"], hi: ["पीला", "भूरा"] },
    luckyNumbers: [1, 6, 8], unluckyNumbers: [2, 5, 9],
    elementOfYear: { pt: "Fogo Yang", en: "Yang Fire", es: "Fuego Yang", hi: "यांग आग" },
    recommendations: {
        pt: ["Água no Norte", "Evite fogo no Sudoeste", "Tons azuis e pretos"],
        en: ["Water in North", "Avoid fire in Southwest", "Blue and black tones"],
        es: ["Agua en el Norte", "Evita fuego en el Sudoeste", "Tonos azules y negros"],
        hi: ["उत्तर में पानी", "दक्षिण-पश्चिम में आग से बचें", "नीले और काले रंग"]
    },
    roomTips: {
        pt: ["Tons azuis", "Fonte no Norte", "Sem velas no Sudoeste"],
        en: ["Blue tones", "Fountain in North", "No candles in Southwest"],
        es: ["Tonos azules", "Fuente en el Norte", "Sin velas en el Sudoeste"],
        hi: ["नीले रंग", "उत्तर में फव्वारा", "दक्षिण-पश्चिम में मोमबत्तियां नहीं"]
    },
    officeTips: {
        pt: ["Mesa para o Norte", "Tons azuis", "Fonte no Norte"],
        en: ["Desk facing North", "Blue tones", "Fountain in North"],
        es: ["Mesa hacia el Norte", "Tonos azules", "Fuente en el Norte"],
        hi: ["उत्तर की ओर मेज", "नीले रंग", "उत्तर में फव्वारा"]
    }
  },
  2027: {
    year: 2027, flyingStar: 9,
    favorableDirections: { pt: ["Sul", "Leste", "Sudeste"], en: ["South", "East", "Southeast"], es: ["Sur", "Este", "Sureste"], hi: ["दक्षिण", "पूर्व", "दक्षिण पूर्व"] },
    unfavorableDirections: { pt: ["Norte", "Centro"], en: ["North", "Center"], es: ["Norte", "Centro"], hi: ["उत्तर", "केंद्र"] },
    luckyColors: { pt: ["Vermelho", "Roxo", "Verde"], en: ["Red", "Purple", "Green"], es: ["Rojo", "Púrpura", "Verde"], hi: ["लाल", "बैंगनी", "हरा"] },
    unluckyColors: { pt: ["Preto", "Azul"], en: ["Black", "Blue"], es: ["Negro", "Azul"], hi: ["काला", "नीला"] },
    luckyNumbers: [9, 3, 4], unluckyNumbers: [1, 5, 6],
    elementOfYear: { pt: "Fogo Yin", en: "Yin Fire", es: "Fuego Yin", hi: "यिन आग" },
    recommendations: {
        pt: ["Fogo no Sul", "Evite água no Norte", "Cores vermelhas e roxas"],
        en: ["Fire in South", "Avoid water in North", "Red and purple colors"],
        es: ["Fuego en el Sur", "Evita agua en el Norte", "Colores rojos y púrpuras"],
        hi: ["दक्षिण में आग", "उत्तर में पानी से बचें", "लाल और बैंगनी रंग"]
    },
    roomTips: {
        pt: ["Tons vermelhos", "Velas no Sul", "Sem água no Norte"],
        en: ["Red tones", "Candles in South", "No water in North"],
        es: ["Tonos rojos", "Velas en el Sur", "Sin agua en el Norte"],
        hi: ["लाल रंग", "दक्षिण में मोमबत्तियां", "उत्तर में पानी नहीं"]
    },
    officeTips: {
        pt: ["Mesa para o Sul", "Tons vermelhos", "Velas no Sul"],
        en: ["Desk facing South", "Red tones", "Candles in South"],
        es: ["Mesa hacia el Sur", "Tonos rojos", "Velas en el Sur"],
        hi: ["दक्षिण की ओर मेज", "लाल रंग", "दक्षिण में मोमबत्तियां"]
    }
  },
  2028: {
    year: 2028, flyingStar: 8,
    favorableDirections: { pt: ["Nordeste", "Sudoeste", "Oeste"], en: ["Northeast", "Southwest", "West"], es: ["Nordeste", "Sudoeste", "Oeste"], hi: ["उत्तर पूर्व", "दक्षिण पश्चिम", "पश्चिम"] },
    unfavorableDirections: { pt: ["Leste", "Sudeste"], en: ["East", "Southeast"], es: ["Este", "Sureste"], hi: ["पूर्व", "दक्षिण पूर्व"] },
    luckyColors: { pt: ["Amarelo", "Marrom", "Branco"], en: ["Yellow", "Brown", "White"], es: ["Amarillo", "Marrón", "Blanco"], hi: ["पीला", "भूरा", "सफेद"] },
    unluckyColors: { pt: ["Verde", "Azul"], en: ["Green", "Blue"], es: ["Verde", "Azul"], hi: ["हरा", "नीला"] },
    luckyNumbers: [8, 2, 5], unluckyNumbers: [3, 4, 9],
    elementOfYear: { pt: "Terra Yang", en: "Yang Earth", es: "Tierra Yang", hi: "यांग पृथ्वी" },
    recommendations: {
        pt: ["Terra no Nordeste", "Evite madeira no Leste", "Cristais no Nordeste"],
        en: ["Earth in Northeast", "Avoid wood in East", "Crystals in Northeast"],
        es: ["Tierra en el Nordeste", "Evita madera en el Este", "Cristales en el Nordeste"],
        hi: ["उत्तर-पूर्व में पृथ्वी", "पूर्व में लकड़ी से बचें", "उत्तर-पूर्व में क्रिस्टल"]
    },
    roomTips: {
        pt: ["Tons terrosos", "Cristais no Nordeste", "Sem plantas no Leste"],
        en: ["Earth tones", "Crystals in Northeast", "No plants in East"],
        es: ["Tonos tierra", "Cristales en el Nordeste", "Sin plantas en el Este"],
        hi: ["पृथ्वी के रंग", "उत्तर-पूर्व में क्रिस्टल", "पूर्व में कोई पौधा नहीं"]
    },
    officeTips: {
        pt: ["Mesa para o Nordeste", "Tons terrosos", "Cristais no Nordeste"],
        en: ["Desk facing Northeast", "Earth tones", "Crystals in Northeast"],
        es: ["Mesa hacia el Nordeste", "Tonos tierra", "Cristales en el Nordeste"],
        hi: ["उत्तर-पूर्व की ओर मेज", "पृथ्वी के रंग", "उत्तर-पूर्व में क्रिस्टल"]
    }
  },
  2029: {
    year: 2029, flyingStar: 7,
    favorableDirections: { pt: ["Oeste", "Noroeste", "Sudoeste"], en: ["West", "Northwest", "Southwest"], es: ["Oeste", "Noroeste", "Sudoeste"], hi: ["पश्चिम", "उत्तर पश्चिम", "दक्षिण पश्चिम"] },
    unfavorableDirections: { pt: ["Leste", "Sul"], en: ["East", "South"], es: ["Este", "Sur"], hi: ["पूर्व", "दक्षिण"] },
    luckyColors: { pt: ["Branco", "Dourado", "Prata"], en: ["White", "Gold", "Silver"], es: ["Blanco", "Dorado", "Plata"], hi: ["सफेद", "सुनहरा", "चांदी"] },
    unluckyColors: { pt: ["Vermelho", "Verde"], en: ["Red", "Green"], es: ["Rojo", "Verde"], hi: ["लाल", "हरा"] },
    luckyNumbers: [7, 6, 8], unluckyNumbers: [9, 3, 4],
    elementOfYear: { pt: "Terra Yin", en: "Yin Earth", es: "Tierra Yin", hi: "यिन पृथ्वी" },
    recommendations: {
        pt: ["Metal no Oeste", "Evite fogo no Sul", "Sinos de vento no Oeste"],
        en: ["Metal in West", "Avoid fire in South", "Wind chimes in West"],
        es: ["Metal en el Oeste", "Evita fuego en el Sur", "Campanillas en el Oeste"],
        hi: ["पश्चिम में धातु", "दक्षिण में आग से बचें", "पश्चिम में विंड चाइम"]
    },
    roomTips: {
        pt: ["Tons brancos", "Sinos no Oeste", "Sem velas no Sul"],
        en: ["White tones", "Chimes in West", "No candles in South"],
        es: ["Tonos blancos", "Campanillas en el Oeste", "Sin velas en el Sur"],
        hi: ["सफेद रंग", "पश्चिम में घंटियां", "दक्षिण में मोमबत्तियां नहीं"]
    },
    officeTips: {
        pt: ["Mesa para o Oeste", "Tons brancos", "Sinos no Oeste"],
        en: ["Desk facing West", "White tones", "Chimes in West"],
        es: ["Mesa hacia el Oeste", "Tonos blancos", "Campanillas en el Oeste"],
        hi: ["पश्चिम की ओर मेज", "सफेद रंग", "पश्चिम में घंटियां"]
    }
  },
  2030: {
    year: 2030, flyingStar: 6,
    favorableDirections: { pt: ["Noroeste", "Oeste", "Norte"], en: ["Northwest", "West", "North"], es: ["Noroeste", "Oeste", "Norte"], hi: ["उत्तर पश्चिम", "पश्चिम", "उत्तर"] },
    unfavorableDirections: { pt: ["Sul", "Sudeste"], en: ["South", "Southeast"], es: ["Sur", "Sureste"], hi: ["दक्षिण", "दक्षिण पूर्व"] },
    luckyColors: { pt: ["Branco", "Dourado", "Azul"], en: ["White", "Gold", "Blue"], es: ["Blanco", "Dorado", "Azul"], hi: ["सफेद", "सुनहरा", "नीला"] },
    unluckyColors: { pt: ["Vermelho", "Verde"], en: ["Red", "Green"], es: ["Rojo", "Verde"], hi: ["लाल", "हरा"] },
    luckyNumbers: [6, 7, 1], unluckyNumbers: [9, 3, 4],
    elementOfYear: { pt: "Metal Yang", en: "Yang Metal", es: "Metal Yang", hi: "यांग धातु" },
    recommendations: {
        pt: ["Metal no Noroeste", "Evite fogo no Sul", "Objetos metálicos no Noroeste"],
        en: ["Metal in Northwest", "Avoid fire in South", "Metal objects in Northwest"],
        es: ["Metal en el Noroeste", "Evita fuego en el Sur", "Objetos metálicos en Noroeste"],
        hi: ["उत्तर पश्चिम में धातु", "दक्षिण में आग से बचें", "उत्तर पश्चिम में धातु की वस्तुएं"]
    },
    roomTips: {
        pt: ["Tons metálicos", "Sem velas no Sul", "Norte limpo"],
        en: ["Metallic tones", "No candles in South", "Clean North"],
        es: ["Tonos metálicos", "Sin velas en el Sur", "Norte limpio"],
        hi: ["धातु के रंग", "दक्षिण में मोमबत्तियां नहीं", "स्वच्छ उत्तर"]
    },
    officeTips: {
        pt: ["Mesa para o Noroeste", "Objetos metálicos", "Sem velas no Sul"],
        en: ["Desk facing Northwest", "Metal objects", "No candles in South"],
        es: ["Mesa hacia el Noroeste", "Objetos metálicos", "Sin velas en el Sur"],
        hi: ["उत्तर पश्चिम की ओर मेज", "धातु की वस्तुएं", "दक्षिण में मोमबत्तियां नहीं"]
    }
  }
};

export function getFengShuiForYear(year: number): FengShuiData {
  return FENG_SHUI_BY_YEAR[year] || FENG_SHUI_BY_YEAR[2024]!;
}

export function getCurrentFengShui(): FengShuiData {
  return getFengShuiForYear(new Date().getFullYear());
}

export interface LocalizedFengShuiResponse {
  year: number;
  flyingStar: number;
  elementOfYear: string;
  favorableDirections: string[];
  unfavorableDirections: string[];
  luckyColors: string[];
  unluckyColors: string[];
  luckyNumbers: number[];
  unluckyNumbers: number[];
  recommendations: string[];
  roomTips: string[];
  officeTips: string[];
}

export function localizeFengShui(data: FengShuiData, lang: Language): LocalizedFengShuiResponse {
  const T = (x: LocalizedText) => x[lang] || x.en || x.pt;
  const L = (x: LocalizedList) => x[lang] || x.en || x.pt;
  return {
    year: data.year,
    flyingStar: data.flyingStar,
    elementOfYear: T(data.elementOfYear),
    favorableDirections: L(data.favorableDirections),
    unfavorableDirections: L(data.unfavorableDirections),
    luckyColors: L(data.luckyColors),
    unluckyColors: L(data.unluckyColors),
    luckyNumbers: data.luckyNumbers,
    unluckyNumbers: data.unluckyNumbers,
    recommendations: L(data.recommendations),
    roomTips: L(data.roomTips),
    officeTips: L(data.officeTips),
  };
}

/**
 * Annual 9-palace flying stars (順飞 from center star).
 * Grid rows top→bottom ≈ North→South; cols left→right ≈ West→East (see Luo Shu mapping).
 */
export function buildAnnualFlyingStarGrid(centerStar: number): number[][] {
  const VALUE_TO_RC: Record<number, [number, number]> = {
    5: [1, 1], 6: [2, 2], 7: [2, 1], 8: [0, 1], 9: [0, 2],
    1: [2, 0], 2: [0, 0], 3: [1, 0], 4: [1, 2],
  };
  const visitOrder = [5, 6, 7, 8, 9, 1, 2, 3, 4] as const;
  const wrap9 = (n: number) => ((((n - 1) % 9) + 9) % 9) + 1;
  const grid: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 9; i++) {
    const v = visitOrder[i]!;
    const [r, c] = VALUE_TO_RC[v]!;
    grid[r]![c] = wrap9(centerStar + i);
  }
  return grid;
}

export interface FlyingStarMonthMeta {
  month: number;
  /** Dominant annual star in center for the year; monthly flying overlay is a simplified +month step on the grid (approximation). */
  note: LocalizedText;
}

export function getFlyingStarMonthlyNote(): LocalizedText {
  return {
    pt: "Sobreposição mensal aproximada: use a grelha anual como base; estrelas mensais avançam no padrão Luo Shu (consulte um mestre para setores exatos).",
    en: "Monthly overlay is approximate: use the annual grid as the base; month stars advance in the Luo Shu path (consult a practitioner for exact sectors).",
    es: "Superposición mensual aproximada: usa la cuadrícula anual como base; las estrellas mensuales avanzan en el camino Luo Shu (consulta a un experto para sectores exactos).",
    hi: "मासिक परत अनुमानित है: वार्षिक ग्रिड को आधार बनाएं; मासिक तारे लुओ शु पथ में आगे बढ़ते हैं (सटीक क्षेत्रों के लिए विशेषज्ञ से परामर्श करें)।",
  };
}

export interface KuaNumber {
  number: number;
  group: "east" | "west";
  favorableDirections: { direction: string; meaning: string }[];
  unfavorableDirections: { direction: string; meaning: string }[];
  luckyColors: string[];
  luckyNumbers: number[];
}

export function calculateKuaNumber(birthYear: number, gender: "male" | "female", lang: string = "en"): KuaNumber {
  const yearStr = birthYear.toString();
  const sum = yearStr.split("").reduce((acc, d) => acc + parseInt(d), 0);
  let reduced = sum;
  while (reduced > 9) {
    reduced = reduced.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
  }

  let kua: number;
  if (gender === "male") {
    kua = 11 - reduced;
  } else {
    kua = 4 + reduced;
  }
  while (kua > 9) {
    kua = kua.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
  }
  if (kua === 5) {
    kua = gender === "male" ? 2 : 8;
  }

  const directionsMap: Record<string, LocalizedText> = {
    "North": { pt: "Norte", en: "North", es: "Norte", hi: "उत्तर" },
    "South": { pt: "Sul", en: "South", es: "Sur", hi: "दक्षिण" },
    "East": { pt: "Leste", en: "East", es: "Este", hi: "पूर्व" },
    "West": { pt: "Oeste", en: "West", es: "Oeste", hi: "पश्चिम" },
    "Northeast": { pt: "Nordeste", en: "Northeast", es: "Nordeste", hi: "उत्तर पूर्व" },
    "Northwest": { pt: "Noroeste", en: "Northwest", es: "Noroeste", hi: "उत्तर पश्चिम" },
    "Southeast": { pt: "Sudeste", en: "Southeast", es: "Sureste", hi: "दक्षिण पूर्व" },
    "Southwest": { pt: "Sudoeste", en: "Southwest", es: "Suroeste", hi: "दक्षिण पश्चिम" }
  };

  const meaningsMap: Record<string, LocalizedText> = {
    "Prosperity": { pt: "Sheng Qi - Prosperidade", en: "Sheng Qi - Prosperity", es: "Sheng Qi - Prosperidad", hi: "शेंग क्यूई - समृद्धि" },
    "Health": { pt: "Tian Yi - Saúde", en: "Tian Yi - Health", es: "Tian Yi - Salud", hi: "तयान यी - स्वास्थ्य" },
    "Relationships": { pt: "Yan Nian - Relacionamentos", en: "Yan Nian - Relationships", es: "Yan Nian - Relaciones", hi: "यान नियान - रिश्ते" },
    "Stability": { pt: "Fu Wei - Estabilidade", en: "Fu Wei - Stability", es: "Fu Wei - Estabilidad", hi: "फू वेई - स्थिरता" },
    "Total Loss": { pt: "Jue Ming - Perda Total", en: "Jue Ming - Total Loss", es: "Jue Ming - Pérdida Total", hi: "जू मिंग - कुल हानि" },
    "Five Ghosts": { pt: "Wu Gui - Cinco Fantasmas", en: "Wu Gui - Five Ghosts", es: "Wu Gui - Cinco Fantasmas", hi: "वू गुई - पांच भूत" },
    "Accidents": { pt: "Huo Hai - Acidentes", en: "Huo Hai - Accidents", es: "Huo Hai - Accidentes", hi: "हुओ हाई - दुर्घटनाएं" },
    "Six Deaths": { pt: "Liu Sha - Seis Mortes", en: "Liu Sha - Six Deaths", es: "Liu Sha - Seis Muertes", hi: "लियू शा - छह मौतें" }
  };

  const colorsMap: Record<string, LocalizedText> = {
    "Blue": { pt: "Azul", en: "Blue", es: "Azul", hi: "नीला" },
    "Black": { pt: "Preto", en: "Black", es: "Negro", hi: "काला" },
    "White": { pt: "Branco", en: "White", es: "Blanco", hi: "सफेद" },
    "Gold": { pt: "Dourado", en: "Gold", es: "Dorado", hi: "सुनहरा" },
    "Yellow": { pt: "Amarelo", en: "Yellow", es: "Amarillo", hi: "पीला" },
    "Brown": { pt: "Marrom", en: "Brown", es: "Marrón", hi: "भूरा" },
    "Red": { pt: "Vermelho", en: "Red", es: "Rojo", hi: "लाल" },
    "Green": { pt: "Verde", en: "Green", es: "Verde", hi: "हरा" },
    "Purple": { pt: "Roxo", en: "Purple", es: "Púrpura", hi: "बैंगनी" },
    "Silver": { pt: "Prata", en: "Silver", es: "Plata", hi: "चांदी" }
  };

  const getL = (obj: LocalizedText) => (obj as any)[lang] || obj.pt;

  const fav: Record<number, { d: string; m: string }[]> = {
    1: [{ d: "Southeast", m: "Prosperity" }, { d: "East", m: "Health" }, { d: "South", m: "Relationships" }, { d: "North", m: "Stability" }],
    2: [{ d: "Northeast", m: "Prosperity" }, { d: "West", m: "Health" }, { d: "Northwest", m: "Relationships" }, { d: "Southwest", m: "Stability" }],
    3: [{ d: "South", m: "Prosperity" }, { d: "North", m: "Health" }, { d: "Southeast", m: "Relationships" }, { d: "East", m: "Stability" }],
    4: [{ d: "North", m: "Prosperity" }, { d: "South", m: "Health" }, { d: "East", m: "Relationships" }, { d: "Southeast", m: "Stability" }],
    6: [{ d: "West", m: "Prosperity" }, { d: "Northeast", m: "Health" }, { d: "Southwest", m: "Relationships" }, { d: "Northwest", m: "Stability" }],
    7: [{ d: "Northwest", m: "Prosperity" }, { d: "Southwest", m: "Health" }, { d: "Northeast", m: "Relationships" }, { d: "West", m: "Stability" }],
    8: [{ d: "Southwest", m: "Prosperity" }, { d: "Northwest", m: "Health" }, { d: "West", m: "Relationships" }, { d: "Northeast", m: "Stability" }],
    9: [{ d: "East", m: "Prosperity" }, { d: "Southeast", m: "Health" }, { d: "North", m: "Relationships" }, { d: "South", m: "Stability" }],
  };

  const unfav: Record<number, { d: string; m: string }[]> = {
    1: [{ d: "Southwest", m: "Total Loss" }, { d: "Northwest", m: "Five Ghosts" }, { d: "Northeast", m: "Accidents" }, { d: "West", m: "Six Deaths" }],
    2: [{ d: "North", m: "Total Loss" }, { d: "Southeast", m: "Five Ghosts" }, { d: "South", m: "Accidents" }, { d: "East", m: "Six Deaths" }],
    3: [{ d: "West", m: "Total Loss" }, { d: "Northwest", m: "Five Ghosts" }, { d: "Southwest", m: "Accidents" }, { d: "Northeast", m: "Six Deaths" }],
    4: [{ d: "Southwest", m: "Total Loss" }, { d: "West", m: "Five Ghosts" }, { d: "Northwest", m: "Accidents" }, { d: "Northeast", m: "Six Deaths" }],
    6: [{ d: "East", m: "Total Loss" }, { d: "South", m: "Five Ghosts" }, { d: "North", m: "Accidents" }, { d: "Southeast", m: "Six Deaths" }],
    7: [{ d: "East", m: "Total Loss" }, { d: "South", m: "Five Ghosts" }, { d: "Southeast", m: "Accidents" }, { d: "North", m: "Six Deaths" }],
    8: [{ d: "Southeast", m: "Total Loss" }, { d: "North", m: "Five Ghosts" }, { d: "East", m: "Accidents" }, { d: "South", m: "Six Deaths" }],
    9: [{ d: "Northwest", m: "Total Loss" }, { d: "West", m: "Five Ghosts" }, { d: "Southwest", m: "Accidents" }, { d: "Northeast", m: "Six Deaths" }],
  };

  const luckyColorsByKua: Record<number, string[]> = {
    1: ["Blue", "Black", "White"], 2: ["Yellow", "Brown", "Red"], 3: ["Green", "Blue", "Black"], 4: ["Green", "Blue", "Black"],
    6: ["White", "Gold", "Yellow"], 7: ["White", "Gold", "Yellow"], 8: ["Yellow", "Brown", "Red"], 9: ["Red", "Purple", "Green"],
  };

  const eastGroup = [1, 3, 4, 9];
  const group = eastGroup.includes(kua) ? "east" : "west";

  return {
    number: kua,
    group,
    favorableDirections: (fav[kua] || []).map(item => ({ direction: getL(directionsMap[item.d]), meaning: getL(meaningsMap[item.m]) })),
    unfavorableDirections: (unfav[kua] || []).map(item => ({ direction: getL(directionsMap[item.d]), meaning: getL(meaningsMap[item.m]) })),
    luckyColors: (luckyColorsByKua[kua] || []).map(c => getL(colorsMap[c])),
    luckyNumbers: { 1: [1, 6], 2: [2, 5, 8], 3: [3, 4], 4: [3, 4], 6: [6, 7], 7: [6, 7], 8: [2, 5, 8], 9: [9] }[kua] || [],
  };
}
