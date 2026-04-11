// ============================================================
// ASTROLOGIA VÉDICA AVANÇADA - NÍVEL PROFISSIONAL
// Shadbala, Ashtakavarga, Muhurta, Panchanga, etc.
// ============================================================

import { normalize360, angleDiff, getSignForLongitude, getSignDegree, ZODIAC_SIGNS, type ZodiacSign, type PlanetData } from "./astro-calculations.js";
import type { Language } from "./i18n.js";
import { fmt, vedMsgs } from "./i18n/vedic-api-messages.js";
import {
  PANCHANGA_YOGA_COUNT,
  panchangaKaranaRow,
  panchangaTithiRow,
  panchangaVaraRow,
  panchangaYogaRow,
} from "./i18n/panchanga-tables.js";
import { localizeVedicPlanetLabel, localizeZodiacSignLabel } from "./lib/vedic-planet-labels.js";
import { localizePanchangaDeity } from "./i18n/panchanga-deities.js";
import { getNakshatraForLongitude } from "./vedic-astrology.js";
import { nakshatraNarrativeRow, nakshatraNarrativeIndexFromLongitude } from "./i18n/nakshatra-narrative.js";

// ============================================================
// SHADBALA - 6 TIPOS DE FORÇA PLANETÁRIA
// ============================================================

export interface ShadbalaResult {
  planet: string;
  sthanaBala: number; // Força posicional
  digBala: number;    // Força direcional
  kalaBala: number;   // Força temporal
  chestaBala: number; // Força motional
  naisargikaBala: number; // Força natural
  drikBala: number;   // Força aspectual
  totalBala: number;
  requiredBala: number;
  ratio: number;      // totalBala / requiredBala
  isStrong: boolean;
  interpretation: string;
}

export interface ShadbalaAnalysis {
  results: ShadbalaResult[];
  strongestPlanet: string;
  weakestPlanet: string;
  overallChartStrength: number;
  interpretation: string;
}

// Valores de Shadbala necessários para cada planeta (em rupas)
const REQUIRED_BALA: Record<string, number> = {
  "Sol": 390, "Lua": 360, "Marte": 300, "Mercúrio": 300,
  "Júpiter": 390, "Vênus": 360, "Saturno": 300,
};

// Força natural dos planetas (em virupas)
const NAISARGIKA_BALA: Record<string, number> = {
  "Saturno": 8.5, "Júpiter": 7.0, "Marte": 5.0, "Sol": 5.0,
  "Vênus": 4.5, "Mercúrio": 3.5, "Lua": 3.0,
};

// Direções de exaltação (Dig Bala máxima)
const DIG_BALA_DIRECTIONS: Record<string, number> = {
  "Sol": 90,    // Sul
  "Lua": 0,     // Norte
  "Marte": 270, // Oeste
  "Mercúrio": 0, // Norte
  "Júpiter": 0, // Norte
  "Vênus": 270, // Oeste
  "Saturno": 180, // Leste
};

export function calculateShadbala(
  planets: PlanetData[],
  birthDate: Date,
  latitude: number,
  longitude: number,
  lang: Language = "en"
): ShadbalaAnalysis {
  const results: ShadbalaResult[] = [];
  
  for (const planet of planets) {
    if (!REQUIRED_BALA[planet.name]) continue;
    
    // 1. Sthana Bala (Força Posicional)
    const sthanaBala = calculateSthanaBala(planet);
    
    // 2. Dig Bala (Força Direcional)
    const digBala = calculateDigBala(planet);
    
    // 3. Kala Bala (Força Temporal)
    const kalaBala = calculateKalaBala(planet, birthDate);
    
    // 4. Chesta Bala (Força Motional)
    const chestaBala = calculateChestaBala(planet);
    
    // 5. Naisargika Bala (Força Natural)
    const naisargikaBala = NAISARGIKA_BALA[planet.name] || 0;
    
    // 6. Drik Bala (Força Aspectual)
    const drikBala = calculateDrikBala(planet, planets);
    
    const totalBala = sthanaBala + digBala + kalaBala + chestaBala + naisargikaBala + drikBala;
    const requiredBala = REQUIRED_BALA[planet.name];
    const ratio = totalBala / requiredBala;
    
    results.push({
      planet: planet.name,
      sthanaBala: Math.round(sthanaBala * 100) / 100,
      digBala: Math.round(digBala * 100) / 100,
      kalaBala: Math.round(kalaBala * 100) / 100,
      chestaBala: Math.round(chestaBala * 100) / 100,
      naisargikaBala: Math.round(naisargikaBala * 100) / 100,
      drikBala: Math.round(drikBala * 100) / 100,
      totalBala: Math.round(totalBala * 100) / 100,
      requiredBala,
      ratio: Math.round(ratio * 100) / 100,
      isStrong: ratio >= 1.0,
      interpretation: getShadbalaInterpretation(planet.name, ratio, lang),
    });
  }
  
  const strongest = results.reduce((a, b) => a.ratio > b.ratio ? a : b);
  const weakest = results.reduce((a, b) => a.ratio < b.ratio ? a : b);
  const overallStrength = results.reduce((sum, r) => sum + r.ratio, 0) / results.length;
  
  return {
    results,
    strongestPlanet: strongest.planet,
    weakestPlanet: weakest.planet,
    overallChartStrength: Math.round(overallStrength * 100) / 100,
    interpretation: getOverallShadbalaInterpretation(overallStrength, strongest.planet, weakest.planet, lang),
  };
}

function calculateSthanaBala(planet: PlanetData): number {
  let bala = 0;
  const degree = getSignDegree(planet.longitude);
  const signIndex = ZODIAC_SIGNS.indexOf(planet.sign);
  
  // Uchcha Bala (Força de Exaltação)
  const exaltationDegrees: Record<string, { sign: number; maxDegree: number }> = {
    "Sol": { sign: 0, maxDegree: 10 },       // Áries 10°
    "Lua": { sign: 1, maxDegree: 3 },        // Touro 3°
    "Marte": { sign: 9, maxDegree: 28 },     // Capricórnio 28°
    "Mercúrio": { sign: 5, maxDegree: 15 },  // Virgem 15°
    "Júpiter": { sign: 3, maxDegree: 5 },    // Câncer 5°
    "Vênus": { sign: 11, maxDegree: 27 },    // Peixes 27°
    "Saturno": { sign: 6, maxDegree: 20 },   // Libra 20°
  };
  
  const exalt = exaltationDegrees[planet.name];
  if (exalt) {
    if (signIndex === exalt.sign) {
      const distFromMax = Math.abs(degree - exalt.maxDegree);
      bala += Math.max(0, 60 - distFromMax); // Máximo 60 virupas
    } else if (signIndex === (exalt.sign + 6) % 12) {
      bala -= 30; // Debilitação
    }
  }
  
  // Saptavargaja Bala (Força nos 7 vargas principais)
  const signPositions = {
    "Moolatrikona": [4, 5, 10, 6, 8, 11, 7], // Signos de Moolatrikona
    "OwnSign": [3, 4, 0, 5, 9, 2, 11, 6, 10], // Signos próprios
  };
  
  // Hora Bala
  const horaSigns = [0, 2, 4, 6, 8, 10]; // Signos solares
  if (horaSigns.includes(signIndex) && planet.name === "Sol") bala += 15;
  if (!horaSigns.includes(signIndex) && planet.name === "Lua") bala += 15;
  
  // Paksha Bala (Força da fase lunar) - apenas para Lua
  if (planet.name === "Lua") {
    const sunPlanet = { longitude: 0 } as PlanetData; // Simplificado
    const moonSunDiff = angleDiff(planet.longitude, sunPlanet.longitude);
    bala += moonSunDiff / 3; // Máximo 60 virupas
  }
  
  // Tribhaga Bala
  const tribhagaRulers: Record<number, string> = {
    0: "Vênus", 1: "Mercúrio", 2: "Saturno", 3: "Júpiter",
    4: "Marte", 5: "Lua", 6: "Sol", 7: "Saturno", 8: "Júpiter",
  };
  const hora2 = Math.floor(degree / 3.33);
  if (tribhagaRulers[hora2] === planet.name) bala += 60;
  
  return Math.max(0, bala);
}

function calculateDigBala(planet: PlanetData): number {
  const direction = DIG_BALA_DIRECTIONS[planet.name];
  if (direction === undefined) return 0;
  
  const planetDirection = planet.longitude % 360;
  const diff = Math.abs(planetDirection - direction);
  const minDiff = Math.min(diff, 360 - diff);
  
  // Dig Bala é máximo quando o planeta está na direção exata
  return Math.max(0, 60 - minDiff * 0.67);
}

function calculateKalaBala(planet: PlanetData, birthDate: Date): number {
  let bala = 0;
  
  // Ahargana Bala (Força do dia)
  const dayOfWeek = birthDate.getDay();
  const dayRulers = ["Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno"];
  if (dayRulers[dayOfWeek] === planet.name) bala += 45;
  
  // Masa Bala (Força do mês)
  const month = birthDate.getMonth();
  const monthRulers = ["Lua", "Sol", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno", "Lua", "Sol", "Marte", "Mercúrio", "Júpiter"];
  if (monthRulers[month] === planet.name) bala += 30;
  
  // Varsha Bala (Força do ano)
  const yearRuler = ["Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno"][birthDate.getFullYear() % 7];
  if (yearRuler === planet.name) bala += 15;
  
  // Ayana Bala (Força do solstício)
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000);
  if (dayOfYear < 182) {
    // Uttarayana (Sol norte)
    if (["Sol", "Júpiter", "Vênus", "Marte", "Lua"].includes(planet.name)) bala += 30;
  } else {
    // Dakshinayana (Sol sul)
    if (["Saturno", "Mercúrio"].includes(planet.name)) bala += 30;
  }
  
  return bala;
}

function calculateChestaBala(planet: PlanetData): number {
  // Chesta Bala é baseado na velocidade do planeta
  // Para planetas retrógrados, a força é diferente
  if (planet.retrograde) {
    // Planetas retrógrados ganham Chesta Bala (exceto Sol e Lua)
    if (planet.name === "Sol" || planet.name === "Lua") return 0;
    return 60; // Máximo para retrógrados
  }
  
  // Para planetas diretos, baseado na velocidade
  const speed = Math.abs(planet.speedLongitude || 0);
  const maxSpeeds: Record<string, number> = {
    "Mercúrio": 2.0, "Vênus": 1.2, "Marte": 0.7, "Júpiter": 0.2, "Saturno": 0.1,
  };
  const maxSpeed = maxSpeeds[planet.name] || 1.0;
  return Math.min(60, (speed / maxSpeed) * 60);
}

function calculateDrikBala(planet: PlanetData, allPlanets: PlanetData[]): number {
  let bala = 0;
  
  // Aspectos védicos especiais
  for (const other of allPlanets) {
    if (other.name === planet.name) continue;
    
    const angle = angleDiff(planet.longitude, other.longitude);
    
    // Aspectos especiais de Marte, Júpiter e Saturno
    if (planet.name === "Marte") {
      if (Math.abs(angle - 180) < 8) bala += 25; // Oposição
      if (Math.abs(angle - 90) < 8) bala += 25;  // Quadratura
      if (Math.abs(angle - 225) < 8) bala += 25; // Aspecto especial 8ª casa
    }
    
    if (planet.name === "Júpiter") {
      if (Math.abs(angle - 120) < 8) bala += 25; // Trígono
      if (Math.abs(angle - 180) < 8) bala += 25; // Oposição
      if (Math.abs(angle - 60) < 8) bala += 25;  // Sextil
    }
    
    if (planet.name === "Saturno") {
      if (Math.abs(angle - 90) < 8) bala += 25;  // Quadratura
      if (Math.abs(angle - 180) < 8) bala += 25; // Oposição
      if (Math.abs(angle - 270) < 8) bala += 25; // Aspecto especial
    }
    
    // Aspectos benéficos aumentam Drik Bala
    if (["Júpiter", "Vênus", "Mercúrio", "Lua"].includes(other.name)) {
      if (angle < 60) bala += 15;
    }
    
    // Aspectos maléficos diminuem Drik Bala
    if (["Saturno", "Marte", "Rahu", "Ketu"].includes(other.name)) {
      if (angle < 60) bala -= 15;
    }
  }
  
  return Math.max(-60, Math.min(60, bala));
}

function getShadbalaInterpretation(planet: string, ratio: number, lang: Language): string {
  const m = vedMsgs(lang).shadbala;
  const pct = (ratio * 100).toFixed(0);
  const p = localizeVedicPlanetLabel(planet, lang);
  if (ratio >= 1.5) return fmt(m.planetExtreme, { planet: p, pct });
  if (ratio >= 1.0) return fmt(m.planetStrong, { planet: p, pct });
  if (ratio >= 0.75) return fmt(m.planetModerate, { planet: p, pct });
  if (ratio >= 0.5) return fmt(m.planetWeak, { planet: p, pct });
  return fmt(m.planetVeryWeak, { planet: p, pct });
}

function getOverallShadbalaInterpretation(overall: number, strongest: string, weakest: string, lang: Language): string {
  const m = vedMsgs(lang).shadbala;
  const pct = (overall * 100).toFixed(0);
  const s = localizeVedicPlanetLabel(strongest, lang);
  const w = localizeVedicPlanetLabel(weakest, lang);
  if (overall >= 1.2) return fmt(m.chartVeryStrong, { pct, strongest: s, weakest: w });
  if (overall >= 1.0) return fmt(m.chartStrong, { pct, strongest: s, weakest: w });
  if (overall >= 0.75) return fmt(m.chartModerate, { pct, strongest: s, weakest: w });
  return fmt(m.chartWeak, { pct, strongest: s, weakest: w });
}

// ============================================================
// ASHTAKAVARGA - SISTEMA DE BINDUS
// ============================================================

export interface AshtakavargaResult {
  planetWise: Record<string, number[]>; // 12 casas para cada planeta
  sarvashtakavarga: number[]; // Total de bindus por casa
  strongHouses: number[];
  weakHouses: number[];
  interpretation: string;
}

export function calculateAshtakavarga(
  planets: PlanetData[],
  ascendantSign: ZodiacSign,
  lang: Language = "en"
): AshtakavargaResult {
  const ascIndex = ZODIAC_SIGNS.indexOf(ascendantSign);
  
  // Inicializar matriz de bindus (7 planetas + ASC = 8 fontes)
  const planetWise: Record<string, number[]> = {};
  const sources = ["Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno"];
  
  for (const source of sources) {
    planetWise[source] = new Array(12).fill(0);
  }
  
  // Calcular bindus para cada fonte
  for (const source of sources) {
    const sourcePlanet = planets.find(p => p.name === source);
    if (!sourcePlanet) continue;
    
    const sourceSignIndex = ZODIAC_SIGNS.indexOf(sourcePlanet.sign);
    
    for (const planet of planets) {
      if (!sources.includes(planet.name)) continue;
      
      const planetSignIndex = ZODIAC_SIGNS.indexOf(planet.sign);
      const houseFromSource = (planetSignIndex - sourceSignIndex + 12) % 12;
      
      // Regras de bindus baseadas em posições relativas
      let bindus = 0;
      
      // Casas favoráveis ganham bindus
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(houseFromSource)) {
        // Regras simplificadas de Ashtakavarga
        if (houseFromSource === 0) bindus = 4;   // 1ª casa da fonte
        if (houseFromSource === 1) bindus = 3;   // 2ª casa
        if (houseFromSource === 2) bindus = 5;   // 3ª casa
        if (houseFromSource === 3) bindus = 4;   // 4ª casa
        if (houseFromSource === 4) bindus = 5;   // 5ª casa
        if (houseFromSource === 5) bindus = 3;   // 6ª casa
        if (houseFromSource === 6) bindus = 4;   // 7ª casa
        if (houseFromSource === 7) bindus = 5;   // 8ª casa
        if (houseFromSource === 8) bindus = 3;   // 9ª casa
        if (houseFromSource === 9) bindus = 4;   // 10ª casa
        if (houseFromSource === 10) bindus = 5;  // 11ª casa
        if (houseFromSource === 11) bindus = 2;  // 12ª casa
      }
      
      // Ajustes baseados em dignidades
      if (planet.sign === sourcePlanet.sign) bindus += 2; // Mesmo signo
      if (["Júpiter", "Vênus"].includes(planet.name)) bindus += 1; // Benéficos
      if (["Saturno", "Marte"].includes(planet.name)) bindus -= 1; // Maléficos
      
      planetWise[source][houseFromSource] += Math.max(0, bindus);
    }
  }
  
  // Calcular Sarvashtakavarga (total por casa)
  const sarvashtakavarga = new Array(12).fill(0);
  for (let house = 0; house < 12; house++) {
    for (const source of sources) {
      sarvashtakavarga[house] += planetWise[source][house];
    }
  }
  
  // Identificar casas fortes e fracas
  const avgBindus = sarvashtakavarga.reduce((a, b) => a + b, 0) / 12;
  const strongHouses: number[] = [];
  const weakHouses: number[] = [];
  
  for (let i = 0; i < 12; i++) {
    if (sarvashtakavarga[i] >= avgBindus + 5) strongHouses.push(i + 1);
    if (sarvashtakavarga[i] <= avgBindus - 5) weakHouses.push(i + 1);
  }
  
  const m = vedMsgs(lang).ashtakavarga;
  return {
    planetWise,
    sarvashtakavarga,
    strongHouses,
    weakHouses,
    interpretation: fmt(m, {
      strong: strongHouses.join(", "),
      weak: weakHouses.join(", "),
      nStrong: strongHouses.length,
      avg: avgBindus.toFixed(1),
    }),
  };
}

// ============================================================
// PANCHANGA - ALMANAQUE VÉDICO DIÁRIO
// ============================================================

export interface PanchangaResult {
  tithi: TithiData;
  vara: VaraData;
  nakshatra: NakshatraPanchangaData;
  yoga: YogaPanchangaData;
  karana: KaranaData;
  sunRise: string;
  sunSet: string;
  moonRise: string;
  moonSet: string;
  rahukaal: string;
  yamaganda: string;
  gulika: string;
  abhijitMuhurta: string;
  auspiciousTimings: string[];
  inauspiciousTimings: string[];
  dayQuality: string;
  overallInterpretation: string;
}

export interface TithiData {
  name: string;
  sanskritName: string;
  number: number;
  paksha: "Shukla" | "Krishna";
  deity: string;
  nature: string;
  favorableFor: string[];
  unfavorableFor: string[];
  completion: number; // % completado
}

export interface VaraData {
  name: string;
  sanskritName: string;
  lord: string;
  deity: string;
  nature: string;
  favorableFor: string[];
}

export interface NakshatraPanchangaData {
  name: string;
  sanskritName: string;
  lord: string;
  deity: string;
  description: string;
  pada: number;
  completion: number;
}

export interface YogaPanchangaData {
  name: string;
  sanskritName: string;
  nature: string;
  interpretation: string;
}

export interface KaranaData {
  name: string;
  sanskritName: string;
  type: string;
  deity: string;
  favorableFor: string[];
  unfavorableFor?: string[];
}

/** Só identificadores estáveis; textos em `panchanga-tables.ts` por idioma. */
const TITHIS_BASE = [
  { name: "Pratipada", sanskritName: "प्रतिपदा", deity: "Brahma" },
  { name: "Dwitiya", sanskritName: "द्वितीया", deity: "Vidhatri" },
  { name: "Tritiya", sanskritName: "तृतीया", deity: "Vishnu" },
  { name: "Chaturthi", sanskritName: "चतुर्थी", deity: "Ganesha" },
  { name: "Panchami", sanskritName: "पंचमी", deity: "Nagas" },
  { name: "Shashthi", sanskritName: "षष्ठी", deity: "Kartikeya" },
  { name: "Saptami", sanskritName: "सप्तमी", deity: "Surya" },
  { name: "Ashtami", sanskritName: "अष्टमी", deity: "Rudra" },
  { name: "Navami", sanskritName: "नवमी", deity: "Durga" },
  { name: "Dashami", sanskritName: "दशमी", deity: "Dharma" },
  { name: "Ekadashi", sanskritName: "एकादशी", deity: "Vishnu" },
  { name: "Dwadashi", sanskritName: "द्वादशी", deity: "Vishvedevas" },
  { name: "Trayodashi", sanskritName: "त्रयोदशी", deity: "Kamadeva" },
  { name: "Chaturdashi", sanskritName: "चतुर्दशी", deity: "Shiva" },
  { name: "Purnima/Amavasya", sanskritName: "पूर्णिमा/अमावस्या", deity: "Chandra/Pitris" },
];

const VARAS_BASE = [
  { name: "Ravivara", sanskritName: "रविवार", lord: "Sol", deity: "Surya" },
  { name: "Somavara", sanskritName: "सोमवार", lord: "Lua", deity: "Chandra" },
  { name: "Mangalavara", sanskritName: "मंगलवार", lord: "Marte", deity: "Mangala" },
  { name: "Budhavara", sanskritName: "बुधवार", lord: "Mercúrio", deity: "Budha" },
  { name: "Guruvara", sanskritName: "गुरुवार", lord: "Júpiter", deity: "Brihaspati" },
  { name: "Shukravara", sanskritName: "शुक्रवार", lord: "Vênus", deity: "Shukra" },
  { name: "Shanivara", sanskritName: "शनिवार", lord: "Saturno", deity: "Shani" },
];

/** 27 yogas na ordem clássica do Pañcāṅga: índice = floor((λ☉+λ☽)/13°20′) mod 27. */
const YOGAS_BASE = [
  { name: "Vishkambha", sanskritName: "विष्कम्भ" },
  { name: "Priti", sanskritName: "प्रीति" },
  { name: "Ayushman", sanskritName: "आयुष्मान" },
  { name: "Saubhagya", sanskritName: "सौभाग्य" },
  { name: "Shobhana", sanskritName: "शोभन" },
  { name: "Atiganda", sanskritName: "अतिगण्ड" },
  { name: "Sukarma", sanskritName: "सुकर्म" },
  { name: "Dhriti", sanskritName: "धृति" },
  { name: "Shula", sanskritName: "शूल" },
  { name: "Ganda", sanskritName: "गण्ड" },
  { name: "Vriddhi", sanskritName: "वृद्धि" },
  { name: "Dhruva", sanskritName: "ध्रुव" },
  { name: "Vyaghata", sanskritName: "व्याघात" },
  { name: "Harshana", sanskritName: "हर्षण" },
  { name: "Vajra", sanskritName: "वज्र" },
  { name: "Siddhi", sanskritName: "सिद्धि" },
  { name: "Vyatipata", sanskritName: "व्यातीपात" },
  { name: "Variyana", sanskritName: "वरीयान" },
  { name: "Parigha", sanskritName: "परिघ" },
  { name: "Shiva", sanskritName: "शिव" },
  { name: "Siddha", sanskritName: "सिद्ध" },
  { name: "Sadhya", sanskritName: "साध्य" },
  { name: "Shubha", sanskritName: "शुभ" },
  { name: "Shukla", sanskritName: "शुक्ल" },
  { name: "Brahma", sanskritName: "ब्रह्म" },
  { name: "Indra", sanskritName: "इन्द्र" },
  { name: "Vaidhriti", sanskritName: "वैधृति" },
];

const KARANAS_BASE = [
  { name: "Bava", sanskritName: "बव", deity: "Indra" },
  { name: "Balava", sanskritName: "बालव", deity: "Brahma" },
  { name: "Kaulava", sanskritName: "कौलव", deity: "Mitra" },
  { name: "Taitila", sanskritName: "तैतिल", deity: "Aryaman" },
  { name: "Gara", sanskritName: "गर", deity: "Varuna" },
  { name: "Vanija", sanskritName: "वणिज", deity: "Vishvedevas" },
  { name: "Vishti", sanskritName: "विष्टि", deity: "Yama" },
  { name: "Shakuni", sanskritName: "शकुनि", deity: "Shakuni" },
  { name: "Chatushpada", sanskritName: "चतुष्पाद", deity: "Shiva" },
  { name: "Naga", sanskritName: "नाग", deity: "Nagas" },
  { name: "Kimstughna", sanskritName: "किंस्तुघ्न", deity: "Yama" },
];

export function calculatePanchanga(
  date: Date,
  sunLongitude: number,
  moonLongitude: number,
  latitude: number,
  longitude: number,
  lang: Language = "en"
): PanchangaResult {
  const pm = vedMsgs(lang).panchanga;
  // 1. TITHI - baseado na diferença Sol-Lua
  const moonSunDiff = normalize360(moonLongitude - sunLongitude);
  const tithiNumber = Math.floor(moonSunDiff / 12);
  const tithiProgress = (moonSunDiff % 12) / 12;
  const paksha: "Shukla" | "Krishna" = tithiNumber < 15 ? "Shukla" : "Krishna";
  const tithiIndex = paksha === "Shukla" ? tithiNumber : tithiNumber - 15;
  const ti = Math.min(tithiIndex, 14);
  const tithiBase = TITHIS_BASE[ti];
  const tithiLoc = panchangaTithiRow(ti, lang);

  // 2. VARA - dia da semana
  const varaBase = VARAS_BASE[date.getDay()];
  const varaLoc = panchangaVaraRow(date.getDay(), lang);
  
  // 3. NAKSHATRA — dados canónicos em `vedic-astrology`; deidade e descrição em `nakshatra-narrative`
  const normMoon = normalize360(moonLongitude);
  const nakFull = getNakshatraForLongitude(normMoon);
  const nakIdx = nakshatraNarrativeIndexFromLongitude(normMoon);
  const narr = nakshatraNarrativeRow(nakIdx, lang);
  const span = 360 / 27;
  const nakshatraProgress = (normMoon % span) / span;

  // 4. YOGA - baseado na soma Sol+Lua
  const sunMoonSum = normalize360(sunLongitude + moonLongitude);
  const yogaIdx = Math.floor(sunMoonSum / (360 / 27)) % PANCHANGA_YOGA_COUNT;
  const yogaBase = YOGAS_BASE[yogaIdx];
  const yogaLoc = panchangaYogaRow(yogaIdx, lang);
  const yogaData: YogaPanchangaData = {
    name: yogaBase.name,
    sanskritName: yogaBase.sanskritName,
    nature: yogaLoc.nature,
    interpretation: yogaLoc.interpretation,
  };

  // 5. KARANA - baseado no tithi
  const karanaIndex = tithiNumber % 11;
  const karanaBase = KARANAS_BASE[karanaIndex];
  const karanaLoc = panchangaKaranaRow(karanaIndex, lang);
  const karanaTypeLabel = karanaLoc.isChara ? pm.karanaChara : pm.karanaSthira;
  const karanaData: KaranaData = {
    name: karanaBase.name,
    sanskritName: karanaBase.sanskritName,
    type: karanaTypeLabel,
    deity: localizePanchangaDeity(karanaBase.deity, lang),
    favorableFor: karanaLoc.favorableFor,
    ...(karanaLoc.unfavorableFor?.length ? { unfavorableFor: karanaLoc.unfavorableFor } : {}),
  };
  
  // 6. Rahukaal, Yamaganda, Gulika
  const rahukaalTimes = ["06:00-07:30", "07:30-09:00", "10:30-12:00", "12:00-13:30", "13:30-15:00", "10:30-12:00", "09:00-10:30"];
  const yamagandaTimes = ["10:30-12:00", "09:00-10:30", "07:30-09:00", "06:00-07:30", "15:00-16:30", "13:30-15:00", "12:00-13:30"];
  const gulikaTimes = ["09:00-10:30", "07:30-09:00", "06:00-07:30", "15:00-16:30", "13:30-15:00", "12:00-13:30", "10:30-12:00"];
  
  const dayOfWeek = date.getDay();
  
  // 7. Abhijit Muhurta
  const abhijitStart = "11:45";
  const abhijitEnd = "12:33";
  
  // 8. Auspicious/Inauspicious timings
  const auspiciousTimings = [
    fmt(pm.abhijitLine, { start: abhijitStart, end: abhijitEnd }),
    pm.brahmaLine,
    pm.vijayaLine,
  ];

  const inauspiciousTimings = [
    fmt(pm.rahukaalLine, { window: rahukaalTimes[dayOfWeek] }),
    fmt(pm.yamagandaLine, { window: yamagandaTimes[dayOfWeek] }),
    fmt(pm.gulikaLine, { window: gulikaTimes[dayOfWeek] }),
    pm.durMuhurtaLine,
  ];

  // 9. Day quality (rótulos localizados)
  type DayQ = "vq" | "q" | "n" | "b" | "vb";
  let dayQ: DayQ = "n";
  const auspiciousYogas = ["Priti", "Ayushman", "Saubhagya", "Shobhana", "Sukarma", "Dhriti", "Vriddhi", "Dhruva", "Harshana", "Siddhi", "Siddha", "Shiva", "Shubha", "Brahma", "Indra"];
  const inauspiciousYogas = ["Vishkambha", "Atiganda", "Shula", "Ganda", "Vyaghata", "Vajra", "Parigha"];

  if (yogaData.name === "Siddhi" || yogaData.name === "Siddha" || yogaData.name === "Shubha" || yogaData.name === "Brahma") {
    dayQ = "vq";
  } else if (auspiciousYogas.includes(yogaData.name)) {
    dayQ = "q";
  } else if (yogaData.name === "Vyatipata" || yogaData.name === "Vaidhriti") {
    dayQ = "vb";
  } else if (inauspiciousYogas.includes(yogaData.name)) {
    dayQ = "b";
  }

  if (tithiBase.name === "Ekadashi" || tithiBase.name === "Purnima/Amavasya") {
    /* mantém dayQ */
  }

  const dayQualityMap: Record<DayQ, string> = {
    vq: pm.dayVeryAuspicious,
    q: pm.dayAuspicious,
    n: pm.dayNeutral,
    b: pm.dayInauspicious,
    vb: pm.dayVeryInauspicious,
  };
  const dayQuality = dayQualityMap[dayQ];
  
  return {
    tithi: {
      ...tithiBase,
      deity: localizePanchangaDeity(tithiBase.deity, lang),
      nature: tithiLoc.nature,
      favorableFor: tithiLoc.favorableFor,
      unfavorableFor: tithiLoc.unfavorableFor,
      number: tithiNumber,
      paksha,
      completion: Math.round(tithiProgress * 100),
    },
    vara: {
      ...varaBase,
      lord: localizeVedicPlanetLabel(varaBase.lord, lang),
      deity: localizePanchangaDeity(varaBase.deity, lang),
      nature: varaLoc.nature,
      favorableFor: varaLoc.favorableFor,
    },
    nakshatra: {
      name: nakFull.name,
      sanskritName: nakFull.sanskritName,
      lord: localizeVedicPlanetLabel(nakFull.lord, lang),
      deity: narr.deity,
      description: narr.description,
      pada: nakFull.pada,
      completion: Math.round(nakshatraProgress * 100),
    },
    yoga: yogaData,
    karana: karanaData,
    sunRise: "06:00",
    sunSet: "18:00",
    moonRise: "18:30",
    moonSet: "06:30",
    rahukaal: rahukaalTimes[dayOfWeek],
    yamaganda: yamagandaTimes[dayOfWeek],
    gulika: gulikaTimes[dayOfWeek],
    abhijitMuhurta: `${abhijitStart}-${abhijitEnd}`,
    auspiciousTimings,
    inauspiciousTimings,
    dayQuality,
    overallInterpretation: fmt(pm.overall, {
      quality: dayQuality,
      tithi: tithiBase.name,
      paksha: paksha === "Shukla" ? pm.pakshaShukla : pm.pakshaKrishna,
      nakshatra: nakFull.name,
      yoga: yogaData.name,
      karana: karanaData.name,
      yogaInterp: yogaData.interpretation,
    }),
  };
}

// ============================================================
// MUHURTA - ASTROLOGIA ELETIVA
// ============================================================

export interface MuhurtaResult {
  date: string;
  time: string;
  panchanga: PanchangaResult;
  suitability: number; // 0-100
  purpose: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface MuhurtaAnalysis {
  bestTimes: MuhurtaResult[];
  worstTimes: MuhurtaResult[];
  overallRecommendation: string;
}

export function evaluateMuhurta(
  date: Date,
  purpose: string,
  sunLongitude: number,
  moonLongitude: number,
  ascendantLongitude: number,
  lang: Language = "en"
): MuhurtaResult {
  const panchanga = calculatePanchanga(date, sunLongitude, moonLongitude, 0, 0, lang);
  const mm = vedMsgs(lang).muhurta;
  
  let suitability = 50; // Base
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Avaliar baseado no propósito
  const purposeWeights: Record<string, { tithi: string[]; nakshatra: string[]; vara: string[]; yoga: string[] }> = {
    "casamento": {
      tithi: ["Dwitiya", "Tritiya", "Panchami", "Saptami", "Dashami", "Ekadashi", "Trayodashi"],
      nakshatra: ["Rohini", "Mrigashira", "Magha", "Uttara Phalguni", "Hasta", "Swati", "Anuradha", "Uttara Ashadha", "Uttara Bhadrapada", "Revati"],
      vara: ["Somavara", "Guruvara", "Shukravara"],
      yoga: ["Priti", "Saubhagya", "Shobhana", "Sukarma", "Dhriti", "Vriddhi", "Dhruva", "Siddhi", "Siddha", "Shiva", "Shubha"],
    },
    "negócios": {
      tithi: ["Dwitiya", "Tritiya", "Panchami", "Dashami", "Ekadashi"],
      nakshatra: ["Rohini", "Mrigashira", "Pushya", "Hasta", "Shravana", "Dhanishta"],
      vara: ["Budhavara", "Guruvara", "Shukravara"],
      yoga: ["Saubhagya", "Sukarma", "Vriddhi", "Dhruva", "Siddhi", "Siddha", "Shubha"],
    },
    "viagem": {
      tithi: ["Dwitiya", "Tritiya", "Panchami", "Saptami", "Dashami"],
      nakshatra: ["Ashwini", "Pushya", "Swati", "Shravana", "Dhanishta", "Shatabhisha"],
      vara: ["Somavara", "Budhavara", "Guruvara"],
      yoga: ["Priti", "Ayushman", "Sukarma", "Vriddhi", "Dhruva"],
    },
    "educação": {
      tithi: ["Dwitiya", "Tritiya", "Panchami", "Saptami", "Ekadashi"],
      nakshatra: ["Rohini", "Pushya", "Hasta", "Shravana", "Dhanishta", "Uttara Bhadrapada"],
      vara: ["Budhavara", "Guruvara"],
      yoga: ["Ayushman", "Sukarma", "Dhriti", "Vriddhi", "Siddhi", "Siddha"],
    },
    "saúde": {
      tithi: ["Panchami", "Saptami", "Dashami", "Ekadashi"],
      nakshatra: ["Ashwini", "Pushya", "Hasta", "Shravana", "Shatabhisha"],
      vara: ["Somavara", "Guruvara"],
      yoga: ["Ayushman", "Sukarma", "Dhriti", "Siddhi", "Siddha", "Shiva"],
    },
    "espiritualidade": {
      tithi: ["Ekadashi", "Purnima/Amavasya", "Chaturdashi"],
      nakshatra: ["Pushya", "Magha", "Mula", "Shatabhisha", "Uttara Bhadrapada", "Revati"],
      vara: ["Somavara", "Guruvara", "Shanivara"],
      yoga: ["Siddhi", "Siddha", "Shiva", "Brahma", "Shubha"],
    },
  };
  
  const weights = purposeWeights[purpose] || purposeWeights["negócios"];
  
  // Avaliar Tithi
  if (weights.tithi.includes(panchanga.tithi.name)) {
    suitability += 15;
    strengths.push(fmt(mm.tithiFav, { name: panchanga.tithi.name, purpose }));
  } else {
    suitability -= 10;
    weaknesses.push(fmt(mm.tithiWeak, { name: panchanga.tithi.name, purpose }));
  }

  // Avaliar Nakshatra
  if (weights.nakshatra.includes(panchanga.nakshatra.name)) {
    suitability += 20;
    strengths.push(fmt(mm.nakFav, { name: panchanga.nakshatra.name, purpose }));
  } else {
    suitability -= 10;
    weaknesses.push(fmt(mm.nakWeak, { name: panchanga.nakshatra.name, purpose }));
  }

  // Avaliar Vara
  if (weights.vara.includes(panchanga.vara.name)) {
    suitability += 10;
    strengths.push(fmt(mm.varaFav, { name: panchanga.vara.name }));
  } else {
    suitability -= 5;
    weaknesses.push(fmt(mm.varaWeak, { name: panchanga.vara.name }));
  }

  // Avaliar Yoga
  if (weights.yoga.includes(panchanga.yoga.name)) {
    suitability += 15;
    strengths.push(fmt(mm.yogaFav, { name: panchanga.yoga.name }));
  } else if (["Vyatipata", "Vaidhriti", "Shula", "Ganda"].includes(panchanga.yoga.name)) {
    suitability -= 20;
    weaknesses.push(fmt(mm.yogaBad, { name: panchanga.yoga.name }));
  }

  // Verificar Rahukaal
  const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  if (panchanga.inauspiciousTimings.some(t => t.includes(timeStr))) {
    suitability -= 15;
    weaknesses.push(mm.badWindow);
  }

  // Verificar Abhijit Muhurta
  if (timeStr >= "11:45" && timeStr <= "12:33") {
    suitability += 10;
    strengths.push(mm.abhijitBonus);
  }

  suitability = Math.max(0, Math.min(100, suitability));

  let recommendation = "";
  if (suitability >= 80) recommendation = fmt(mm.recExcellent, { purpose });
  else if (suitability >= 60) recommendation = fmt(mm.recGood, { purpose });
  else if (suitability >= 40) recommendation = fmt(mm.recFair, { purpose });
  else recommendation = fmt(mm.recPoor, { purpose });
  
  return {
    date: date.toISOString().split("T")[0],
    time: `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`,
    panchanga,
    suitability,
    purpose,
    strengths,
    weaknesses,
    recommendation,
  };
}

// ============================================================
// GRAHA YUDDHA - GUERRA PLANETÁRIA
// ============================================================

export interface GrahaYuddhaResult {
  planet1: string;
  planet2: string;
  longitude1: number;
  longitude2: number;
  winner: string;
  loser: string;
  margin: number;
  interpretation: string;
  effects: string[];
}

export function calculateGrahaYuddha(planets: PlanetData[], lang: Language = "en"): GrahaYuddhaResult[] {
  const gm = vedMsgs(lang).grahaYuddha;
  const results: GrahaYuddhaResult[] = [];
  const combatants = ["Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno"];
  
  for (let i = 0; i < combatants.length; i++) {
    for (let j = i + 1; j < combatants.length; j++) {
      const p1 = planets.find(p => p.name === combatants[i]);
      const p2 = planets.find(p => p.name === combatants[j]);
      
      if (!p1 || !p2) continue;
      
      const diff = angleDiff(p1.longitude, p2.longitude);
      
      // Guerra planetária ocorre quando estão dentro de 1 grau
      if (diff < 1) {
        // Vencedor é determinado por:
        // 1. Planeta mais ao norte (maior latitude)
        // 2. Se mesma latitude, planeta mais brilhante
        const brightness: Record<string, number> = {
          "Sol": 10, "Lua": 9, "Vênus": 8, "Júpiter": 7, "Marte": 6, "Mercúrio": 5, "Saturno": 4,
        };
        
        const lat1 = Math.abs(p1.latitude || 0);
        const lat2 = Math.abs(p2.latitude || 0);
        
        let winner, loser;
        if (lat1 > lat2) {
          winner = p1.name;
          loser = p2.name;
        } else if (lat2 > lat1) {
          winner = p2.name;
          loser = p1.name;
        } else {
          winner = brightness[p1.name] > brightness[p2.name] ? p1.name : p2.name;
          loser = winner === p1.name ? p2.name : p1.name;
        }
        
        const wL = localizeVedicPlanetLabel(winner, lang);
        const lL = localizeVedicPlanetLabel(loser, lang);
        results.push({
          planet1: p1.name,
          planet2: p2.name,
          longitude1: p1.longitude,
          longitude2: p2.longitude,
          winner,
          loser,
          margin: Math.round(diff * 60 * 100) / 100, // em minutos de arco
          interpretation: fmt(gm.interpretation, { winner: wL, loser: lL }),
          effects: [
            fmt(gm.effect1, { winner: wL }),
            fmt(gm.effect2, { loser: lL }),
            fmt(gm.effect3, { loser: lL }),
          ],
        });
      }
    }
  }
  
  return results;
}

// ============================================================
// AVASTHAS - ESTADOS PLANETÁRIOS
// ============================================================

export interface AvasthaResult {
  planet: string;
  sign: ZodiacSign;
  degree: number;
  balaAvastha: string; // Estado de força
  jagrataAvastha: string; // Estado de consciência
  deeptaAvastha: string; // Estado de brilho
  interpretation: string;
}

export function calculateAvasthas(planets: PlanetData[], lang: Language = "en"): AvasthaResult[] {
  const am = vedMsgs(lang).avastha;
  const results: AvasthaResult[] = [];
  
  for (const planet of planets) {
    const degree = getSignDegree(planet.longitude);
    const signIndex = ZODIAC_SIGNS.indexOf(planet.sign);
    
    // 1. Bala Avasthas (Estados de Força)
    let balaIdx = 0;
    if (degree >= 0 && degree < 6) balaIdx = 0;
    else if (degree >= 6 && degree < 12) balaIdx = 1;
    else if (degree >= 12 && degree < 18) balaIdx = 2;
    else if (degree >= 18 && degree < 24) balaIdx = 3;
    else if (degree >= 24 && degree <= 30) balaIdx = 4;
    const balaAvastha = am.bala[balaIdx] ?? am.bala[0];

    // 2. Jagrata Avasthas (Estados de Consciência)
    const jagrataSigns = [0, 1, 2, 6, 7, 8];
    const jagrataAvastha = jagrataSigns.includes(signIndex) ? am.jagrat : am.swapna;

    // 3. Deepta Avasthas (Estados de Brilho)
    const deeptaSigns = [0, 3, 9];
    const muditaSigns = [1, 4, 10];
    const kshuditaSigns = [2, 5, 11];
    const trishitaSigns = [6, 7, 8];
    let deeptaIdx = 0;
    if (deeptaSigns.includes(signIndex)) deeptaIdx = 0;
    else if (muditaSigns.includes(signIndex)) deeptaIdx = 1;
    else if (kshuditaSigns.includes(signIndex)) deeptaIdx = 2;
    else if (trishitaSigns.includes(signIndex)) deeptaIdx = 3;
    const deeptaAvastha = am.deepta[deeptaIdx] ?? am.deepta[0];

    const pL = localizeVedicPlanetLabel(planet.name, lang);
    const sL = localizeZodiacSignLabel(planet.sign, lang);
    results.push({
      planet: planet.name,
      sign: planet.sign,
      degree: Math.round(degree * 100) / 100,
      balaAvastha,
      jagrataAvastha,
      deeptaAvastha,
      interpretation: fmt(am.interp, {
        planet: pL,
        sign: sL,
        deg: degree.toFixed(1),
        bala: balaAvastha,
        jagra: jagrataAvastha,
        deepta: deeptaAvastha,
      }),
    });
  }
  
  return results;
}

// ============================================================
// TARA BALA - COMPATIBILIDADE NAKSHATRA
// ============================================================

export interface TaraBalaResult {
  nakshatra1: string;
  nakshatra2: string;
  taraNumber: number;
  taraName: string;
  nature: string;
  interpretation: string;
  compatibility: number; // 0-100
}

export function calculateTaraBala(nakshatra1Index: number, nakshatra2Index: number, lang: Language = "en"): TaraBalaResult {
  const tm = vedMsgs(lang).tara;
  const diff = (nakshatra2Index - nakshatra1Index + 27) % 27;
  const taraNumber = (diff % 9) + 1;
  const taraName = tm.names[taraNumber - 1] ?? tm.names[0];

  let nature: string;
  let compatibility: number;

  if ([2, 4, 6, 8, 9].includes(taraNumber)) {
    nature = tm.auspicious;
    compatibility = 80 + (taraNumber === 9 ? 20 : 0);
  } else if ([3, 5, 7].includes(taraNumber)) {
    nature = tm.inauspicious;
    compatibility = 20;
  } else {
    nature = tm.neutral;
    compatibility = 50;
  }

  return {
    nakshatra1: NAKSHATRA_NAMES[nakshatra1Index % 27],
    nakshatra2: NAKSHATRA_NAMES[nakshatra2Index % 27],
    taraNumber,
    taraName,
    nature,
    compatibility,
    interpretation: fmt(tm.interp, { n: taraNumber, name: taraName, nature, pct: compatibility }),
  };
}

const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
  "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
  "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati"
];

// ============================================================
// VIMSOPAKA BALA - FORÇA NOS VARGAS
// ============================================================

export interface VimsopakaBalaResult {
  planet: string;
  d1Score: number;
  d9Score: number;
  d10Score: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

export function calculateVimsopakaBala(
  planets: PlanetData[],
  d1Planets: PlanetData[],
  d9Planets: PlanetData[],
  d10Planets: PlanetData[],
  lang: Language = "en"
): VimsopakaBalaResult[] {
  const vm = vedMsgs(lang).vimsopaka;
  const results: VimsopakaBalaResult[] = [];
  
  for (const planet of planets) {
    const d1Planet = d1Planets.find(p => p.name === planet.name);
    const d9Planet = d9Planets.find(p => p.name === planet.name);
    const d10Planet = d10Planets.find(p => p.name === planet.name);
    
    if (!d1Planet || !d9Planet || !d10Planet) continue;
    
    // Pesos: D1=6, D9=5, D10=4 (total 15)
    const d1Score = calculateVargaScore(d1Planet);
    const d9Score = calculateVargaScore(d9Planet);
    const d10Score = calculateVargaScore(d10Planet);
    
    const totalScore = d1Score * 6 + d9Score * 5 + d10Score * 4;
    const maxScore = 10 * 15; // Máximo 10 por varga
    const percentage = (totalScore / maxScore) * 100;
    
    const level = percentage > 70 ? vm.strong : percentage > 40 ? vm.moderate : vm.weak;
    results.push({
      planet: planet.name,
      d1Score,
      d9Score,
      d10Score,
      totalScore,
      maxScore,
      percentage: Math.round(percentage * 100) / 100,
      interpretation: fmt(vm.interp, {
        planet: localizeVedicPlanetLabel(planet.name, lang),
        pct: percentage.toFixed(1),
        level,
      }),
    });
  }
  
  return results;
}

function calculateVargaScore(planet: PlanetData): number {
  let score = 5; // Base
  
  // Exaltação
  const exaltationSigns: Record<string, string> = {
    "Sol": "Áries", "Lua": "Touro", "Marte": "Capricórnio", "Mercúrio": "Virgem",
    "Júpiter": "Câncer", "Vênus": "Peixes", "Saturno": "Libra",
  };
  
  if (planet.sign === exaltationSigns[planet.name]) score += 5;
  
  // Signo próprio
  const ownSigns: Record<string, string[]> = {
    "Sol": ["Leão"], "Lua": ["Câncer"], "Marte": ["Áries", "Escorpião"],
    "Mercúrio": ["Gêmeos", "Virgem"], "Júpiter": ["Sagitário", "Peixes"],
    "Vênus": ["Touro", "Libra"], "Saturno": ["Capricórnio", "Aquário"],
  };
  
  if (ownSigns[planet.name]?.includes(planet.sign)) score += 3;
  
  // Casa
  if ([1, 5, 9].includes(planet.house)) score += 2; // Trikona
  if ([1, 4, 7, 10].includes(planet.house)) score += 1; // Kendra
  
  return Math.min(10, Math.max(0, score));
}

// ============================================================
// GOCHARA - TRÂNSITOS VÉDICOS AVANÇADOS
// ============================================================

export interface GocharaResult {
  planet: string;
  currentSign: ZodiacSign;
  natalSign: ZodiacSign;
  houseFromMoon: number;
  houseFromAscendant: number;
  isFavorable: boolean;
  interpretation: string;
  effects: string[];
  duration: string;
}

function gocharaSpecificLine(lang: Language, planetName: string, house: number): string | undefined {
  const g = vedMsgs(lang).gochara;
  if (planetName === "Júpiter") return g.jupiter[house];
  if (planetName === "Saturno") return g.saturn[house];
  if (planetName === "Rahu") return g.rahu[house];
  return undefined;
}

export function calculateGochara(
  currentPlanets: PlanetData[],
  natalPlanets: PlanetData[],
  natalMoonSign: ZodiacSign,
  natalAscendant: ZodiacSign,
  lang: Language = "en"
): GocharaResult[] {
  const g = vedMsgs(lang).gochara;
  const results: GocharaResult[] = [];
  const moonIndex = ZODIAC_SIGNS.indexOf(natalMoonSign);
  const ascIndex = ZODIAC_SIGNS.indexOf(natalAscendant);
  
  for (const current of currentPlanets) {
    if (!["Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno", "Rahu", "Ketu"].includes(current.name)) continue;
    
    const natal = natalPlanets.find(p => p.name === current.name);
    if (!natal) continue;
    
    const currentSignIndex = ZODIAC_SIGNS.indexOf(current.sign);
    const houseFromMoon = (currentSignIndex - moonIndex + 12) % 12 + 1;
    const houseFromAscendant = (currentSignIndex - ascIndex + 12) % 12 + 1;
    
    // Avaliar favorabilidade baseado na casa da Lua
    let isFavorable = false;
    const favorableHousesFromMoon: Record<string, number[]> = {
      "Sol": [3, 6, 10, 11],
      "Lua": [1, 3, 6, 7, 10, 11],
      "Marte": [3, 6, 11],
      "Mercúrio": [1, 2, 4, 6, 8, 10, 11],
      "Júpiter": [1, 2, 4, 5, 7, 9, 10, 11],
      "Vênus": [1, 2, 3, 4, 5, 7, 9, 10, 11],
      "Saturno": [3, 6, 11],
      "Rahu": [1, 3, 6, 10, 11],
      "Ketu": [1, 3, 6, 10, 11],
    };
    
    isFavorable = favorableHousesFromMoon[current.name]?.includes(houseFromMoon) || false;
    
    const specific = gocharaSpecificLine(lang, current.name, houseFromMoon);
    const pL = localizeVedicPlanetLabel(current.name, lang);
    const interpretation =
      specific ??
      fmt(g.default, {
        planet: pL,
        hm: houseFromMoon,
        ha: houseFromAscendant,
        end: isFavorable ? g.fav : g.unfav,
      });

    results.push({
      planet: current.name,
      currentSign: current.sign,
      natalSign: natal.sign,
      houseFromMoon,
      houseFromAscendant,
      isFavorable,
      interpretation,
      effects: isFavorable ? [g.effectGood1, g.effectGood2] : [g.effectBad1, g.effectBad2],
      duration: fmt(g.duration, { sign: localizeZodiacSignLabel(current.sign, lang) }),
    });
  }
  
  return results;
}

// ============================================================
// PRASNA - ASTROLOGIA HORÁRIA
// ============================================================

export interface PrasnaResult {
  question: string;
  chart: {
    ascendant: { sign: ZodiacSign; degree: number; lord: string };
    houses: { house: number; sign: ZodiacSign; lord: string }[];
    planets: PlanetData[];
  };
  answer: string;
  confidence: number; // 0-100
  factors: string[];
  timing: string;
  recommendation: string;
}

function prasnaTopicLabel(category: string, lang: Language): string {
  const p = vedMsgs(lang).prasna;
  const map: Record<string, string> = {
    geral: p.categoryGeral,
    amor: p.categoryAmor,
    casamento: p.categoryCasamento,
    dinheiro: p.categoryDinheiro,
    carreira: p.categoryCarreira,
    "saúde": p.categorySaude,
    viagem: p.categoryViagem,
    "educação": p.categoryEducacao,
    filhos: p.categoryFilhos,
    "imóvel": p.categoryImovel,
    "justiça": p.categoryJustica,
  };
  return map[category] ?? p.categoryGeral;
}

export function calculatePrasna(
  question: string,
  questionTime: Date,
  latitude: number,
  longitude: number,
  planets: PlanetData[],
  ascendant: { longitude: number; sign: ZodiacSign; degree: number },
  lang: Language = "en"
): PrasnaResult {
  const p = vedMsgs(lang).prasna;
  // Usar o momento da pergunta como mapa
  const ascIndex = ZODIAC_SIGNS.indexOf(ascendant.sign);
  
  // Determinar o regente da pergunta baseado no dia/hora
  const dayRulers = ["Sol", "Lua", "Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno"];
  const horaRuler = dayRulers[(questionTime.getHours() + questionTime.getDay()) % 7];
  
  // Analisar casas relevantes baseado no tipo de pergunta
  const questionCategories: Record<string, number[]> = {
    "amor": [1, 5, 7],
    "casamento": [1, 7],
    "dinheiro": [2, 11],
    "carreira": [10, 11],
    "saúde": [1, 6, 8],
    "viagem": [3, 9, 12],
    "educação": [4, 5, 9],
    "filhos": [5, 9],
    "imóvel": [4],
    "justiça": [6, 7],
  };
  
  const category = Object.keys(questionCategories).find(k => 
    question.toLowerCase().includes(k)
  ) || "geral";
  
  const relevantHouses = questionCategories[category] || [1];
  
  // Analisar planetas nas casas relevantes
  const factors: string[] = [];
  let confidence = 50;
  
  for (const house of relevantHouses) {
    const houseLord = getSignLord(ZODIAC_SIGNS[(ascIndex + house - 1) % 12]);
    const lordPlanet = planets.find(p => p.name === houseLord);
    
    if (lordPlanet) {
      const lordL = localizeVedicPlanetLabel(houseLord, lang);
      if (lordPlanet.house >= 1 && lordPlanet.house <= 6) {
        factors.push(fmt(p.houseLordFav, { house: String(house), lord: lordL }));
        confidence += 10;
      } else {
        factors.push(fmt(p.houseLordCh, { house: String(house), lord: lordL }));
        confidence -= 10;
      }
    }
  }

  // Verificar regente da hora
  const horaPlanet = planets.find((pl) => pl.name === horaRuler);
  if (horaPlanet && horaPlanet.house >= 1 && horaPlanet.house <= 6) {
    factors.push(fmt(p.horaFav, { lord: localizeVedicPlanetLabel(horaRuler, lang) }));
    confidence += 15;
  }

  confidence = Math.max(0, Math.min(100, confidence));

  const topic = prasnaTopicLabel(category, lang);
  let answer = "";
  if (confidence >= 70) answer = fmt(p.answerHigh, { topic });
  else if (confidence >= 40) answer = fmt(p.answerMid, { topic });
  else answer = fmt(p.answerLow, { topic });

  return {
    question,
    chart: {
      ascendant: { sign: ascendant.sign, degree: ascendant.degree, lord: getSignLord(ascendant.sign, lang) },
      houses: Array.from({ length: 12 }, (_, i) => ({
        house: i + 1,
        sign: ZODIAC_SIGNS[(ascIndex + i) % 12],
        lord: getSignLord(ZODIAC_SIGNS[(ascIndex + i) % 12], lang),
      })),
      planets,
    },
    answer,
    confidence,
    factors,
    timing: fmt(p.timing, { months: Math.ceil(confidence / 10) }),
    recommendation: confidence >= 70 ? p.recHigh : confidence >= 40 ? p.recMid : p.recLow,
  };
}

function getSignLord(sign: ZodiacSign, lang: Language = "en"): string {
  const lords: Record<string, string> = {
    "Áries": "Marte", "Touro": "Vênus", "Gêmeos": "Mercúrio", "Câncer": "Lua",
    "Leão": "Sol", "Virgem": "Mercúrio", "Libra": "Vênus", "Escorpião": "Marte",
    "Sagitário": "Júpiter", "Capricórnio": "Saturno", "Aquário": "Saturno", "Peixes": "Júpiter",
  };
  return lords[sign] || vedMsgs(lang).prasna.unknownLord;
}

// ============================================================
// DASHA SANDHI - PERÍODOS DE JUNÇÃO
// ============================================================

export interface DashaSandhiResult {
  isSandhi: boolean;
  sandhiType: string;
  sandhiPeriod: { start: string; end: string; days: number } | null;
  interpretation: string;
  recommendation: string;
}

export function calculateDashaSandhi(
  currentMahadasha: { endDate: string },
  currentAntardasha: { endDate: string },
  lang: Language = "en"
): DashaSandhiResult {
  const dm = vedMsgs(lang).dashaSandhi;
  const now = new Date();
  const mahadashaEnd = new Date(currentMahadasha.endDate);
  const antardashaEnd = new Date(currentAntardasha.endDate);
  
  // Sandhi = últimos 10% do período
  const mahadashaDuration = mahadashaEnd.getTime() - now.getTime();
  const antardashaDuration = antardashaEnd.getTime() - now.getTime();
  
  const mahadashaSandhi = mahadashaDuration < (mahadashaEnd.getTime() - now.getTime()) * 0.1;
  const antardashaSandhi = antardashaDuration < (antardashaEnd.getTime() - now.getTime()) * 0.1;
  
  if (mahadashaSandhi) {
    const sandhiDays = Math.ceil(mahadashaDuration / (1000 * 60 * 60 * 24));
    return {
      isSandhi: true,
      sandhiType: dm.typeMaha,
      sandhiPeriod: {
        start: now.toISOString().split("T")[0],
        end: currentMahadasha.endDate,
        days: sandhiDays,
      },
      interpretation: fmt(dm.mahaInterp, { days: sandhiDays }),
      recommendation: dm.mahaRec,
    };
  }

  if (antardashaSandhi) {
    const sandhiDays = Math.ceil(antardashaDuration / (1000 * 60 * 60 * 24));
    return {
      isSandhi: true,
      sandhiType: dm.typeAnt,
      sandhiPeriod: {
        start: now.toISOString().split("T")[0],
        end: currentAntardasha.endDate,
        days: sandhiDays,
      },
      interpretation: fmt(dm.antInterp, { days: sandhiDays }),
      recommendation: dm.antRec,
    };
  }

  return {
    isSandhi: false,
    sandhiType: dm.typeNone,
    sandhiPeriod: null,
    interpretation: dm.noneInterp,
    recommendation: dm.noneRec,
  };
}

// ============================================================
// ARGALA E DRISHTI - ASPECTOS VÉDICOS
// ============================================================

export interface ArgalaResult {
  house: number;
  argalas: { planet: string; type: string; strength: string }[];
  virodhArgalas: { planet: string; type: string; strength: string }[];
  interpretation: string;
}

export interface DrishtiResult {
  planet: string;
  aspects: { targetHouse: number; aspectType: string; strength: number; interpretation: string }[];
  totalDrishtiBala: number;
}

export function calculateArgala(planets: PlanetData[], house: number, lang: Language = "en"): ArgalaResult {
  const am = vedMsgs(lang).argala;
  const argalas: { planet: string; type: string; strength: string }[] = [];
  const virodhArgalas: { planet: string; type: string; strength: string }[] = [];
  
  // Argala: 2ª, 4ª, 11ª casas da casa analisada
  const argalaHouses = [
    (house + 1) % 12 + 1,  // 2ª
    (house + 3) % 12 + 1,  // 4ª
    (house + 10) % 12 + 1, // 11ª
  ];
  
  // Virodh Argala: 12ª, 10ª, 2ª casas (opostas)
  const virodhHouses = [
    (house + 11) % 12 + 1, // 12ª
    (house + 9) % 12 + 1,  // 10ª
    (house + 1) % 12 + 1,  // 2ª
  ];
  
  for (const planet of planets) {
    if (argalaHouses.includes(planet.house)) {
      argalas.push({
        planet: planet.name,
        type: am.typeArgala,
        strength: ["Júpiter", "Vênus", "Mercúrio"].includes(planet.name) ? am.strong : am.medium,
      });
    }

    if (virodhHouses.includes(planet.house)) {
      virodhArgalas.push({
        planet: planet.name,
        type: am.typeVirodh,
        strength: ["Saturno", "Marte", "Rahu"].includes(planet.name) ? am.strong : am.medium,
      });
    }
  }

  const interp =
    argalas.length > virodhArgalas.length
      ? fmt(am.interpDomArgala, { house, nArg: argalas.length, nVir: virodhArgalas.length })
      : fmt(am.interpDomVirodh, { house, nArg: argalas.length, nVir: virodhArgalas.length });

  return {
    house,
    argalas,
    virodhArgalas,
    interpretation: interp,
  };
}

export function calculateDrishti(planet: PlanetData, allPlanets: PlanetData[], lang: Language = "en"): DrishtiResult {
  const dm = vedMsgs(lang).drishti;
  const aspects: { targetHouse: number; aspectType: string; strength: number; interpretation: string }[] = [];
  
  // Aspectos védicos especiais
  const specialAspects: Record<string, number[]> = {
    "Marte": [4, 7, 8], // 4ª, 7ª, 8ª
    "Júpiter": [5, 7, 9], // 5ª, 7ª, 9ª
    "Saturno": [3, 7, 10], // 3ª, 7ª, 10ª
  };
  
  const normalAspects = [7]; // Todos os planetas aspectam a 7ª casa
  
  const aspectHouses = [...(specialAspects[planet.name] || []), ...normalAspects];
  
  for (const aspectHouse of aspectHouses) {
    const targetHouse = (planet.house + aspectHouse - 1) % 12 + 1;
    const strength = specialAspects[planet.name]?.includes(aspectHouse) ? 1.0 : 0.75;
    
    const isSpecial = specialAspects[planet.name]?.includes(aspectHouse);
    const aspectType = isSpecial ? fmt(dm.specialAsp, { n: aspectHouse }) : dm.asp7;
    const pL = localizeVedicPlanetLabel(planet.name, lang);
    aspects.push({
      targetHouse,
      aspectType,
      strength,
      interpretation: fmt(dm.interp, { planet: pL, house: targetHouse, pct: (strength * 100).toFixed(0) }),
    });
  }
  
  const totalDrishtiBala = aspects.reduce((sum, a) => sum + a.strength, 0);
  
  return {
    planet: planet.name,
    aspects,
    totalDrishtiBala: Math.round(totalDrishtiBala * 100) / 100,
  };
}
