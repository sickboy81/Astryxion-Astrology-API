import { ZODIAC_SIGNS, SIGN_ELEMENTS, ELEMENT_COMPAT } from "../data/constants.js";
import { normalize360 } from "../astro-calculations.js";
import {
  applySwephEphePath,
  buildPlanetCalcFlags,
  resolveSwephEpheFlag,
  withSwephSiderealWork,
  type CoordinateModel,
  type ZodiacMode,
} from "../lib/sweph-zodiac.js";
import { DateTime } from "luxon";

/** Sol e Lua na mesma eclíptica (trópico ou Lahiri sideral) para panchang/yoga/karana coerentes. */
export async function getSunMoonLongitudes(
  jdUt: number,
  zodiacMode: ZodiacMode
): Promise<{ sunLon: number; moonLon: number; coordinateModel: CoordinateModel }> {
  const sweph = await import("sweph");
  applySwephEphePath(sweph);

  if (zodiacMode === "tropical") {
    const flags = buildPlanetCalcFlags(sweph, "tropical");
    const moonRes = sweph.calc_ut(jdUt, sweph.constants.SE_MOON, flags);
    const sunRes = sweph.calc_ut(jdUt, sweph.constants.SE_SUN, flags);
    const moonLon =
      moonRes.flag !== sweph.constants.ERR && !moonRes.error ? (moonRes.data[0] as number) : 0;
    const sunLon =
      sunRes.flag !== sweph.constants.ERR && !sunRes.error ? (sunRes.data[0] as number) : 0;
    return { sunLon, moonLon, coordinateModel: { zodiacMode: "tropical" } };
  }

  return withSwephSiderealWork(async () => {
    applySwephEphePath(sweph);
    sweph.set_sid_mode(sweph.constants.SE_SIDM_LAHIRI, 0, 0);
    const flags = buildPlanetCalcFlags(sweph, "sidereal_lahiri");
    const moonRes = sweph.calc_ut(jdUt, sweph.constants.SE_MOON, flags);
    const sunRes = sweph.calc_ut(jdUt, sweph.constants.SE_SUN, flags);
    const moonLon =
      moonRes.flag !== sweph.constants.ERR && !moonRes.error ? (moonRes.data[0] as number) : 0;
    const sunLon =
      sunRes.flag !== sweph.constants.ERR && !sunRes.error ? (sunRes.data[0] as number) : 0;
    const ephe = resolveSwephEpheFlag(sweph);
    const ayanRes = sweph.get_ayanamsa_ex_ut(jdUt, ephe);
    const ayan =
      ayanRes.flag === sweph.constants.OK && typeof ayanRes.data === "number"
        ? Math.round(ayanRes.data * 1e6) / 1e6
        : 0;
    return {
      sunLon,
      moonLon,
      coordinateModel: {
        zodiacMode: "sidereal_lahiri",
        ayanamsaName: "Lahiri",
        ayanamsaDegrees: ayan,
      },
    };
  });
}

export function getMoonPhaseName(jd: number, lang: string = "en"): string {
  const knownNewMoon = 2451550.1;
  const daysSinceNew = jd - knownNewMoon;
  const cyclePosition = ((daysSinceNew % 29.53059) + 29.53059) % 29.53059;
  const phase = cyclePosition / 29.53059;

  const phases: Record<string, string[]> = {
    pt: ["Lua Nova", "Lua Crescente", "Quarto Crescente", "Lua Crescente Gibosa", "Lua Cheia", "Lua Minguante Gibosa", "Quarto Minguante", "Lua Minguante"],
    en: ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Moon"],
    es: ["Luna Nueva", "Luna Creciente", "Cuarto Creciente", "Luna Creciente Gibosa", "Luna Llena", "Luna Menguante Gibosa", "Cuarto Menguante", "Luna Menguante"],
    hi: ["अमावस्या", "शुक्ल पक्ष प्रतिपदा", "शुक्ल पक्ष अष्टमी", "शुक्ल पक्ष एकादशी", "पूर्णिमा", "कृष्ण पक्ष प्रतिपदा", "कृष्ण पक्ष अष्टमी", "अमावस्या पूर्व"],
  };

  const lp = phases[lang] || phases.en;
  if (phase < 0.03 || phase >= 0.97) return lp[0];
  if (phase < 0.22) return lp[1];
  if (phase < 0.28) return lp[2];
  if (phase < 0.47) return lp[3];
  if (phase < 0.53) return lp[4];
  if (phase < 0.72) return lp[5];
  if (phase < 0.78) return lp[6];
  return lp[7];
}

export function getMoonIllumination(jd: number): number {
  const knownNewMoon = 2451550.1;
  const daysSinceNew = jd - knownNewMoon;
  const cyclePosition = ((daysSinceNew % 29.53059) + 29.53059) % 29.53059;
  const phase = cyclePosition / 29.53059;
  return Math.round((1 - Math.cos(2 * Math.PI * phase)) / 2 * 100);
}

export const TRANSIT_INFLUENCES: Record<string, Record<string, { love: string; health: string; career: string; finance: string }>> = {
  sun: {
    pt: {
      love: "o Sol ilumina sua vida afetiva com vitalidade",
      health: "energia vital em alta, aproveite para se exercitar",
      career: "visibilidade e reconhecimento profissional",
      finance: "oportunidades financeiras sob seu controle",
    },
    en: {
      love: "the Sun illuminates your love life with vitality",
      health: "high vital energy, take advantage of exercising",
      career: "visibility and professional recognition",
      finance: "financial opportunities under your control",
    },
    es: {
      love: "el Sol ilumina tu vida afectiva con vitalidad",
      health: "energía vital en alza, aprovecha para hacer ejercicio",
      career: "visibilidad y reconocimiento profesional",
      finance: "oportunidades financieras bajo tu control",
    },
    hi: {
      love: "सूर्य आपकी प्रेम जीवन को जीवन शक्ति से प्रकाशित करता है",
      health: "उच्च जीवन शक्ति, व्यायाम का लाभ उठाएं",
      career: "दृश्यता और व्यावसायिक पहचान",
      finance: "आपके नियंत्रण में वित्तीय अवसर",
    }
  },
  moon: {
    pt: {
      love: "a Lua traz sensibilidade e intuição aos relacionamentos",
      health: "corpo pede descanso e alimentação leve",
      career: "intuição guiando decisões profissionais",
      finance: "emoções podem influenciar gastos, atenção",
    },
    en: {
      love: "the Moon brings sensitivity and intuition to relationships",
      health: "body asks for rest and light food",
      career: "intuition guiding professional decisions",
      finance: "emotions can influence spending, pay attention",
    },
    es: {
      love: "la Luna aporta sensibilidad e intuición a las relaciones",
      health: "el cuerpo pide descanso y alimentación ligera",
      career: "intuición guiando decisiones profesionales",
      finance: "las emociones pueden influir en los gastos, atención",
    },
    hi: {
      love: "चंद्रमा संबंधों में संवेदनशीलता और अंतर्ज्ञान लाता है",
      health: "शरीर आराम और हल्का भोजन मांगता है",
      career: "व्यावसायिक निर्णयों का मार्गदर्शन करने वाला अंतर्ज्ञान",
      finance: "भावनाएं खर्च को प्रभावित कर सकती हैं, ध्यान दें",
    }
  },
  mercury: {
    pt: {
      love: "Mercúrio favorece diálogos e conversas importantes",
      health: "mente ativa, cuidado com ansiedade mental",
      career: "comunicação clara abre portas profissionais",
      finance: "bons momentos para negociar e revisar contratos",
    },
    en: {
      love: "Mercury favors important dialogues and conversations",
      health: "active mind, watch out for mental anxiety",
      career: "clear communication opens professional doors",
      finance: "good times to negotiate and review contracts",
    },
    es: {
      love: "Mercurio favorece diálogos y conversaciones importantes",
      health: "mente activa, cuidado con la ansiedad mental",
      career: "la comunicación clara abre puertas profesionales",
      finance: "buenos momentos para negociar y revisar contratos",
    },
    hi: {
      love: "बुध महत्वपूर्ण संवादों और बातचीत का पक्षधर है",
      health: "सक्रिय मन, मानसिक चिंता से सावधान रहें",
      career: "स्पष्ट संचार व्यावसायिक द्वार खोलता है",
      finance: "अनुबंधों पर बातचीत और समीक्षा के लिए अच्छा समय",
    }
  },
  venus: {
    pt: {
      love: "Vênus traz charme, atração e harmonia ao amor",
      health: "beleza e autocuidado em destaque",
      career: "diplomacia e networking favorecidos",
      finance: "gastos com prazer e estética, moderação",
    },
    en: {
      love: "Venus brings charm, attraction, and harmony to love",
      health: "beauty and self-care in focus",
      career: "diplomacy and networking favored",
      finance: "spending on pleasure and aesthetics, moderation",
    },
    es: {
      love: "Venus aporta encanto, atracción y armonía al amor",
      health: "belleza y autocuidado en primer plano",
      career: "diplomacia y redes sociales favorecidas",
      finance: "gastos en placer y estética, moderación",
    },
    hi: {
      love: "शुक्र प्रेम में आकर्षण, खिंचाव और सामंजस्य लाता है",
      health: "सौंदर्य और आत्म-देखभाल पर ध्यान",
      career: "कूटनीति और नेटवर्किंग का पक्षधर",
      finance: "भोग और सौंदर्य पर खर्च, संयम रखें",
    }
  },
  mars: {
    pt: {
      love: "Marte traz paixão e assertividade nos relacionamentos",
      health: "energia física em alta, canalize com exercício",
      career: "ação e competitividade profissional",
      finance: "impulsividade nas compras, controle-se",
    },
    en: {
      love: "Mars brings passion and assertiveness in relationships",
      health: "high physical energy, channel with exercise",
      career: "professional action and competitiveness",
      finance: "impulsivity in shopping, control yourself",
    },
    es: {
      love: "Marte aporta pasión y asertividad en las relaciones",
      health: "energía física en alza, canaliza con ejercicio",
      career: "acción y competitividad profesional",
      finance: "impulsividad en las compras, contrólate",
    },
    hi: {
      love: "मंगल संबंधों में जुनून और मुखरता लाता है",
      health: "उच्च शारीरिक ऊर्जा, व्यायाम के साथ चैनल करें",
      career: "व्यावसायिक कार्रवाई और प्रतिस्पर्धा",
      finance: "खरीदारी में आवेग, खुद पर नियंत्रण रखें",
    }
  },
  jupiter: {
    pt: {
      love: "Júpiter expande oportunidades amorosas",
      health: "otimismo e vitalidade, mas cuidado com excessos",
      career: "expansão profissional e sorte nos negócios",
      finance: "crescimento financeiro e boas oportunidades",
    },
    en: {
      love: "Jupiter expands romantic opportunities",
      health: "optimism and vitality, but watch out for excesses",
      career: "professional expansion and luck in business",
      finance: "financial growth and good opportunities",
    },
    es: {
      love: "Júpiter expande las oportunidades románticas",
      health: "optimismo y vitalidad, pero cuidado con los excesos",
      career: "expansión profesional y suerte en los negocios",
      finance: "crecimiento financiero y buenas oportunidades",
    },
    hi: {
      love: "बृहस्पति प्रेम के अवसरों का विस्तार करता है",
      health: "आशावाद और जीवन शक्ति, लेकिन अति से बचें",
      career: "व्यावसायिक विस्तार और व्यापार में भाग्य",
      finance: "वित्तीय विकास और अच्छे अवसर",
    }
  },
  saturn: {
    pt: {
      love: "Saturno pede maturidade e compromisso no amor",
      health: "disciplina e rotina são seus aliados",
      career: "responsabilidade e estrutura profissional",
      finance: "economia e planejamento de longo prazo",
    },
    en: {
      love: "Saturn calls for maturity and commitment in love",
      health: "discipline and routine are your allies",
      career: "professional responsibility and structure",
      finance: "savings and long-term planning",
    },
    es: {
      love: "Saturno pide madurez y compromiso en el amor",
      health: "la disciplina y la rutina son tus aliados",
      career: "responsabilidad y estructura profesional",
      finance: "ahorro y planificación a largo plazo",
    },
    hi: {
      love: "शनि प्रेम में परिपक्वता और प्रतिबद्धता की मांग करता है",
      health: "अनुशासन और दिनचर्या आपके सहयोगी हैं",
      career: "व्यावसायिक जिम्मेदारी और संरचना",
      finance: "बचत और दीर्घकालिक योजना",
    }
  },
};

export async function getCurrentTransits() {
  try {
    const sweph = await import("sweph");
    const ephePath = process.env.SWEPH_EPHE_PATH;
    if (ephePath) sweph.set_ephe_path(ephePath);

    const now = new Date();
    const jd = (now.getTime() / 86400000) + 2440587.5;
    const flags = sweph.constants.SEFLG_SWIEPH;

    const transitPlanets = [
      { id: sweph.constants.SE_SUN, name: "sun" },
      { id: sweph.constants.SE_MOON, name: "moon" },
      { id: sweph.constants.SE_MERCURY, name: "mercury" },
      { id: sweph.constants.SE_VENUS, name: "venus" },
      { id: sweph.constants.SE_MARS, name: "mars" },
      { id: sweph.constants.SE_JUPITER, name: "jupiter" },
      { id: sweph.constants.SE_SATURN, name: "saturn" },
    ];

    const transits: Record<string, { longitude: number; sign: string; degree: number; retrograde: boolean }> = {};
    for (const planet of transitPlanets) {
      const result = sweph.calc_ut(jd, planet.id, flags);
      if (result.flag === sweph.constants.OK) {
        const longitude = result.data[0] as number;
        const signIndex = Math.floor(longitude / 30);
        const degree = longitude % 30;
        transits[planet.name] = {
          longitude: Math.round(longitude * 100) / 100,
          sign: ZODIAC_SIGNS[signIndex] || "aries",
          degree: Math.round(degree * 100) / 100,
          retrograde: (result.data[3] as number) < 0,
        };
      }
    }
    return transits;
  } catch {
    return null;
  }
}

export function getTransitInfluence(transits: Record<string, any> | null, sign: string, lang: string = "en"): string[] {
  if (!transits) return [];
  const influences: string[] = [];
  const signIndex = ZODIAC_SIGNS.indexOf(sign as any);
  if (signIndex === -1) return influences;

  const element = SIGN_ELEMENTS[sign];
  const compatibleElements = ELEMENT_COMPAT[element] || [];

  const connectors: Record<string, string> = {
    pt: " em ",
    en: " in ",
    es: " en ",
    hi: " में ",
  };
  const conn = connectors[lang] || connectors.en;

  for (const [planetName, transit] of Object.entries(transits)) {
    const transitSign = (transit as any).sign as string;
    const transitElement = SIGN_ELEMENTS[transitSign];
    if (compatibleElements.includes(transitElement || "")) {
      const influence = TRANSIT_INFLUENCES[planetName]?.[lang] || TRANSIT_INFLUENCES[planetName]?.en;
      if (influence) {
        const planetDisplay = planetName.charAt(0).toUpperCase() + planetName.slice(1);
        influences.push(`${planetDisplay}${conn}${transitSign}: ${influence.love}`);
      }
    }
  }

  return influences.slice(0, 3);
}


export function getVedicTithi(jd: number): { name: string; number: number } {
  const knownNewMoon = 2451550.1;
  const daysSinceNew = jd - knownNewMoon;
  const cyclePosition = ((daysSinceNew % 29.53059) + 29.53059) % 29.53059;
  const tithiNumber = Math.floor(cyclePosition / (29.53059 / 30)) + 1;
  const tithiNames = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya",
  ];
  return { name: tithiNames[(tithiNumber - 1) % 30] || "Pratipada", number: tithiNumber };
}

export async function getMoonLongitude(jd: number): Promise<number> {
  try {
    const sweph = await import("sweph");
    const flags = sweph.constants.SEFLG_SWIEPH;
    const result = sweph.calc_ut(jd, sweph.constants.SE_MOON, flags);
    if (result.flag === sweph.constants.OK) {
      return result.data[0] as number;
    }
  } catch {}
  return 0;
}

export async function getSunLongitude(jd: number): Promise<number> {
  try {
    const sweph = await import("sweph");
    const flags = sweph.constants.SEFLG_SWIEPH;
    const result = sweph.calc_ut(jd, sweph.constants.SE_SUN, flags);
    if (result.flag === sweph.constants.OK) {
      return result.data[0] as number;
    }
  } catch {}
  return 0;
}

export async function getVedicYoga(jd: number, zodiacMode: ZodiacMode = "tropical"): Promise<string> {
  const { sunLon, moonLon } = await getSunMoonLongitudes(jd, zodiacMode);
  const sunMoonSum = sunLon + moonLon;
  const yogaIndex = Math.floor(normalize360(sunMoonSum) / (360 / 27));
  const yogas = ["Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"];
  return yogas[yogaIndex % 27] || "Vishkambha";
}

export async function getVedicKarana(jd: number, zodiacMode: ZodiacMode = "tropical"): Promise<string> {
  const { sunLon, moonLon } = await getSunMoonLongitudes(jd, zodiacMode);
  const sunMoonDiff = moonLon - sunLon;
  const karanaIndex = Math.floor(normalize360(sunMoonDiff) / (360 / 60));
  const karanas = ["Kinstughna", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga"];
  return karanas[karanaIndex % 60] || "Bava";
}

export async function getSunriseAndSet(jd: number, lat: number, lon: number) {
  try {
    const sweph = await import("sweph");
    const flags = sweph.constants.SE_CALC_RISE | sweph.constants.SE_BIT_DISC_CENTER;
    
    // Sunrise
    const rise = (sweph as any).rise_trans(jd, sweph.constants.SE_SUN, "", sweph.constants.SEFLG_SWIEPH, flags, [lon, lat, 0], 0, 0);
    // Sunset
    const set = (sweph as any).rise_trans(jd, sweph.constants.SE_SUN, "", sweph.constants.SEFLG_SWIEPH, sweph.constants.SE_CALC_SET | sweph.constants.SE_BIT_DISC_CENTER, [lon, lat, 0], 0, 0);
    
    return {
      sunrise: (rise as any).data,
      sunset: (set as any).data
    };
  } catch {
    return null;
  }
}

export function getPanchangPeriods(sunriseJd: number, sunsetJd: number, weekday: number) {
  const dayDuration = sunsetJd - sunriseJd;
  const segment = dayDuration / 8;
  
  // Rahu Kalam, Yama Gandam, Gulika Kalam parts (1-8)
  const rahuParts = [8, 2, 7, 5, 6, 4, 3]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  const yamaParts = [5, 4, 3, 2, 1, 7, 6];
  const gulikaParts = [7, 6, 5, 4, 3, 2, 1];

  const getRange = (part: number) => ({
    start: sunriseJd + (part - 1) * segment,
    end: sunriseJd + part * segment
  });

  return {
    rahuKalam: getRange(rahuParts[weekday] || 1),
    yamaGandam: getRange(yamaParts[weekday] || 1),
    gulikaKalam: getRange(gulikaParts[weekday] || 1)
  };
}
