import puppeteer, { Browser, Page } from "puppeteer";
import crypto from "node:crypto";
import Redis from "ioredis";
import { generatePDFContent } from "./pdf-content-generator.js";
import type { AnnualPrediction } from "../astrocartography.js";

// ============================================================================
// BROWSER POOL - Reutilização de instâncias para performance
// ============================================================================

interface BrowserPool {
  browser: Browser | null;
  maxPages: number;
  activePages: number;
  queue: Array<() => void>;
}

const browserPool: BrowserPool = {
  browser: null,
  maxPages: 5, // Limite de páginas simultâneas por browser
  activePages: 0,
  queue: [],
};

async function getBrowser(): Promise<Browser> {
  if (!browserPool.browser) {
    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim() || undefined;
    browserPool.browser = await puppeteer.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--disable-extensions",
      ],
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      if (browserPool.browser) {
        await browserPool.browser.close();
        process.exit(0);
      }
    });
  }
  return browserPool.browser;
}

async function acquirePage(): Promise<Page> {
  return new Promise(async (resolve) => {
    if (browserPool.activePages < browserPool.maxPages) {
      browserPool.activePages++;
      const browser = await getBrowser();
      const page = await browser.newPage();
      resolve(page);
    } else {
      // Adicionar à fila
      browserPool.queue.push(async () => {
        browserPool.activePages++;
        const browser = await getBrowser();
        const page = await browser.newPage();
        resolve(page);
      });
    }
  });
}

/**
 * Returns the current status of the browser pool
 */
export function getBrowserPoolStatus() {
  return {
    activePages: browserPool.activePages,
    maxPages: browserPool.maxPages,
    queueLength: browserPool.queue.length,
    isInitialized: !!browserPool.browser,
  };
}

/**
 * Closes the browser and resets the pool
 */
export async function resetBrowserPool() {
  if (browserPool.browser) {
    try {
      await browserPool.browser.close();
    } catch (e) {
      console.error("Error closing browser during reset:", e);
    }
  }
  browserPool.browser = null;
  browserPool.activePages = 0;
  browserPool.queue = [];
}

function releasePage(page: Page): void {
  page.close();
  browserPool.activePages--;

  // Processar próximo da fila
  if (browserPool.queue.length > 0) {
    const next = browserPool.queue.shift();
    if (next) next();
  }
}

// ============================================================================
// CACHE DE PDFs
// ============================================================================

interface PDFCacheEntry {
  buffer: string; // Base64
  generatedAt: string;
  hash: string;
}

function generateCacheKey(data: any, template: string, lang: string): string {
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ data, template, lang }))
    .digest("hex")
    .slice(0, 16);
  return `pdf:${template}:${hash}`;
}

async function getCachedPDF(
  redis: Redis | null,
  key: string
): Promise<Buffer | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get(key);
    if (cached) {
      const entry: PDFCacheEntry = JSON.parse(cached);
      return Buffer.from(entry.buffer, "base64");
    }
  } catch (err) {
    console.error("PDF Cache get error:", err);
  }
  return null;
}

async function setCachedPDF(
  redis: Redis | null,
  key: string,
  buffer: Buffer,
  ttlSeconds: number = 86400 // 24 horas
): Promise<void> {
  if (!redis) return;
  try {
    const entry: PDFCacheEntry = {
      buffer: buffer.toString("base64"),
      generatedAt: new Date().toISOString(),
      hash: crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16),
    };
    await redis.setex(key, ttlSeconds, JSON.stringify(entry));
  } catch (err) {
    console.error("PDF Cache set error:", err);
  }
}

// ============================================================================
// QR CODE GENERATOR (SVG inline para evitar dependências)
// ============================================================================

function generateQRCodeSVG(data: string, size: number = 100): string {
  // QR Code simplificado - em produção usar qrcode library
  const qrPattern = crypto.createHash("sha256").update(data).digest("hex").slice(0, 100);
  const cells = 25;
  const cellSize = size / cells;

  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${size}" height="${size}" fill="white"/>`;

  // Positions markers (cantos)
  const drawFinder = (x: number, y: number) => {
    svg += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${7 * cellSize}" height="${7 * cellSize}" fill="#000"/>`;
    svg += `<rect x="${(x + 1) * cellSize}" y="${(y + 1) * cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="#fff"/>`;
    svg += `<rect x="${(x + 2) * cellSize}" y="${(y + 2) * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#000"/>`;
  };

  drawFinder(0, 0);
  drawFinder(cells - 7, 0);
  drawFinder(0, cells - 7);

  // Dados pseudo-aleatórios baseados no hash
  for (let i = 0; i < qrPattern.length; i++) {
    const row = Math.floor(i / 10) + 8;
    const col = (i % 10) + 8;
    if (row < cells - 7 && col < cells - 7 && parseInt(qrPattern[i], 16) % 2 === 0) {
      svg += `<rect x="${col * cellSize}" y="${row * cellSize}" width="${cellSize}" height="${cellSize}" fill="#000"/>`;
    }
  }

  svg += "</svg>";
  return svg;
}

// ============================================================================
// SVG GRÁFICOS - Mapa Natal
// ============================================================================

export type ChartSvgTheme = "lavender" | "light" | "dark" | "minimal";

export type NatalChartSvgOptions = {
  /** Omit decorative fills (for embedding on custom backgrounds). */
  transparentBackground?: boolean;
  /** Visual palette for wheel strokes and fills. `light` is an alias of `lavender`. */
  theme?: ChartSvgTheme;
  /** When true, aspect lines between wheel planets are not drawn. */
  omitAspectLines?: boolean;
};

const CHART_SVG_THEMES: Record<Exclude<ChartSvgTheme, "light">, {
  bg: string;
  bgAccent: string;
  outerStroke: string;
  outerStrokeInner: string;
  innerFill: string;
  innerStroke: string;
  houseLine: string;
  houseNum: string;
  zodiacGlyph: string;
  planetDiscFill: string;
  planetDiscStroke: string;
  planetGlyph: string;
  centerOuter: string;
  centerInner: string;
  aspects: Record<string, string>;
}> = {
  lavender: {
    bg: "#f8f9ff",
    bgAccent: "#f8f5ff",
    outerStroke: "#8a4fff",
    outerStrokeInner: "#c4a0ff",
    innerFill: "#ffffff",
    innerStroke: "#8a4fff",
    houseLine: "#b8a0e0",
    houseNum: "#8a4fff",
    zodiacGlyph: "#6b3dd9",
    planetDiscFill: "#ffffff",
    planetDiscStroke: "#8a4fff",
    planetGlyph: "#333333",
    centerOuter: "#8a4fff",
    centerInner: "#ffffff",
    aspects: {
      conjunction: "#8a4fff",
      trine: "#22c55e",
      square: "#ef4444",
      opposition: "#f59e0b",
      sextile: "#3b82f6",
    },
  },
  dark: {
    bg: "#0f0a1a",
    bgAccent: "#1a1428",
    outerStroke: "#a78bfa",
    outerStrokeInner: "#6d28d9",
    innerFill: "#1e1b2e",
    innerStroke: "#a78bfa",
    houseLine: "#6b7280",
    houseNum: "#c4b5fd",
    zodiacGlyph: "#ddd6fe",
    planetDiscFill: "#1e1b2e",
    planetDiscStroke: "#a78bfa",
    planetGlyph: "#f3f4f6",
    centerOuter: "#a78bfa",
    centerInner: "#0f0a1a",
    aspects: {
      conjunction: "#c4b5fd",
      trine: "#34d399",
      square: "#f87171",
      opposition: "#fbbf24",
      sextile: "#60a5fa",
    },
  },
  minimal: {
    bg: "#fafafa",
    bgAccent: "#f5f5f5",
    outerStroke: "#171717",
    outerStrokeInner: "#a3a3a3",
    innerFill: "#ffffff",
    innerStroke: "#262626",
    houseLine: "#d4d4d4",
    houseNum: "#404040",
    zodiacGlyph: "#525252",
    planetDiscFill: "#ffffff",
    planetDiscStroke: "#404040",
    planetGlyph: "#171717",
    centerOuter: "#404040",
    centerInner: "#fafafa",
    aspects: {
      conjunction: "#525252",
      trine: "#15803d",
      square: "#b91c1c",
      opposition: "#a16207",
      sextile: "#1d4ed8",
    },
  },
};

function resolveChartSvgTheme(theme?: ChartSvgTheme): keyof typeof CHART_SVG_THEMES {
  const t = theme ?? "lavender";
  if (t === "light") return "lavender";
  return t;
}

export type ChartSvgPalette = (typeof CHART_SVG_THEMES)["lavender"];

/** Stroke/fill palette for wheel + matching tabular SVG exports. */
export function getChartSvgPalette(theme?: ChartSvgTheme): ChartSvgPalette {
  const key = resolveChartSvgTheme(theme);
  return CHART_SVG_THEMES[key];
}

export function generateNatalChartSVG(
  planets: Array<{ name: string; sign: string; longitude: number; house?: number }>,
  houses?: Array<{ number: number; sign: string; longitude: number }>,
  size: number = 400,
  opts?: NatalChartSvgOptions
): string {
  const transparent = Boolean(opts?.transparentBackground);
  const paletteKey = resolveChartSvgTheme(opts?.theme);
  const pal = CHART_SVG_THEMES[paletteKey];
  const omitAspects = Boolean(opts?.omitAspectLines);
  const center = size / 2;
  const outerRadius = size * 0.45;
  const innerRadius = size * 0.18;
  const planetRadius = size * 0.32;

  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

  // Background
  if (!transparent) {
    svg += `<rect width="${size}" height="${size}" fill="${pal.bg}"/>`;
    svg += `<circle cx="${center}" cy="${center}" r="${outerRadius + 10}" fill="${pal.bgAccent}"/>`;
  } else {
    svg += `<rect width="${size}" height="${size}" fill="none"/>`;
  }

  // Outer zodiac circle
  svg += `<circle cx="${center}" cy="${center}" r="${outerRadius}" fill="none" stroke="${pal.outerStroke}" stroke-width="3"/>`;
  svg += `<circle cx="${center}" cy="${center}" r="${outerRadius - 6}" fill="none" stroke="${pal.outerStrokeInner}" stroke-width="1"/>`;

  // Inner house circle
  const innerFill = transparent ? "none" : pal.innerFill;
  svg += `<circle cx="${center}" cy="${center}" r="${innerRadius}" fill="${innerFill}" stroke="${pal.innerStroke}" stroke-width="2"/>`;

  // House lines - THINNER now (1px)
  const houseLineColor = pal.houseLine;
  
  if (houses && houses.length > 0) {
    houses.forEach((house) => {
      const angle = ((house.longitude - 90) * Math.PI) / 180;
      const x2 = center + outerRadius * Math.cos(angle);
      const y2 = center + outerRadius * Math.sin(angle);
      const x1 = center + (innerRadius + 2) * Math.cos(angle);
      const y1 = center + (innerRadius + 2) * Math.sin(angle);
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${houseLineColor}" stroke-width="1"/>`;
      
      const xNum = center + (innerRadius - 8) * Math.cos(angle);
      const yNum = center + (innerRadius - 8) * Math.sin(angle);
      svg += `<text x="${xNum}" y="${yNum}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="${pal.houseNum}" font-weight="bold">${house.number}</text>`;
    });
  } else {
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x2 = center + outerRadius * Math.cos(angle);
      const y2 = center + outerRadius * Math.sin(angle);
      const x1 = center + (innerRadius + 2) * Math.cos(angle);
      const y1 = center + (innerRadius + 2) * Math.sin(angle);
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${houseLineColor}" stroke-width="1"/>`;
      
      const xNum = center + (innerRadius - 8) * Math.cos(angle);
      const yNum = center + (innerRadius - 8) * Math.sin(angle);
      svg += `<text x="${xNum}" y="${yNum}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="${pal.houseNum}" font-weight="bold">${i + 1}</text>`;
    }
  }

  // Zodiac sign symbols
  const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
  zodiacSigns.forEach((sign, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = center + (outerRadius - 18) * Math.cos(angle);
    const y = center + (outerRadius - 18) * Math.sin(angle);
    svg += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="${pal.zodiacGlyph}" font-weight="600">${sign}</text>`;
  });

  // Planet symbols
  const planetSymbols: Record<string, string> = {
    Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂",
    Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇",
    "North Node": "☊", "South Node": "☋", Chiron: "⚷",
  };

  // Calculate planet positions first
  const planetPositions: Array<{ name: string; x: number; y: number; longitude: number }> = planets.map(planet => {
    const angle = ((planet.longitude - 90) * Math.PI) / 180;
    return {
      name: planet.name,
      x: center + planetRadius * Math.cos(angle),
      y: center + planetRadius * Math.sin(angle),
      longitude: planet.longitude,
    };
  });

  // Draw ASPECT LINES between planets (colored lines connecting them)
  // Conjunction (0°), Trine (120°), Square (90°), Opposition (180°), Sextile (60°)
  const aspectColors = pal.aspects;

  if (!omitAspects) {
    for (let i = 0; i < planetPositions.length; i++) {
      for (let j = i + 1; j < planetPositions.length; j++) {
        const p1 = planetPositions[i];
        const p2 = planetPositions[j];

        let diff = Math.abs(p1.longitude - p2.longitude);
        if (diff > 180) diff = 360 - diff;

        let aspectType: string | null = null;
        const orb = 8;

        if (diff <= orb) aspectType = "conjunction";
        else if (Math.abs(diff - 60) <= orb) aspectType = "sextile";
        else if (Math.abs(diff - 90) <= orb) aspectType = "square";
        else if (Math.abs(diff - 120) <= orb) aspectType = "trine";
        else if (Math.abs(diff - 180) <= orb) aspectType = "opposition";

        if (aspectType) {
          const color = aspectColors[aspectType as keyof typeof aspectColors];
          svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="2" opacity="0.8"/>`;
        }
      }
    }
  }

  const discFill = transparent ? "none" : pal.planetDiscFill;
  planetPositions.forEach((pos) => {
    const symbol = planetSymbols[pos.name] || "●";
    svg += `<circle cx="${pos.x}" cy="${pos.y}" r="13" fill="${discFill}" stroke="${pal.planetDiscStroke}" stroke-width="2"/>`;
    svg += `<text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="middle" font-size="13" fill="${pal.planetGlyph}">${symbol}</text>`;
  });

  svg += `<circle cx="${center}" cy="${center}" r="6" fill="${pal.centerOuter}"/>`;
  svg += `<circle cx="${center}" cy="${center}" r="3" fill="${pal.centerInner}"/>`;

  svg += "</svg>";
  return svg;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS: Record<string, any> = {
  en: {
    mini: "Daily Cosmic Snapshot",
    basic: "Natal Base Logic",
    pro: "Astryxion Natal Monograph",
    matchmaking: "Relationship Resonance Profile",
    natal: "Astryxion Natal Monograph",
    natal_subtitle: "Professional Birth Analytics & Soul Map",
    quick_snapshot: "Daily Astrological Highlights",
    relationship_analysis: "In-depth Relationship Compatibility",
    name: "Consultant Name",
    date: "Birth Date",
    time: "Local Birth Time",
    coords: "Coordinates",
    planet: "Planet",
    sign: "Zodiac Sign",
    degree: "Exact Degree",
    house: "House",
    status: "Planetary State",
    retrograde: "Retrograde",
    direct: "Direct",
    partner1: "Partner 1",
    partner2: "Partner 2",
    score: "Compatibility Index",
    disclaimer: "Professional ASTRYXION Network Transmission. High-Precision Astrological Data.",
    verify: "Verify Authenticity",
    page: "Page",
    of: "of",
    pdf_brand_header: "Astryxion API • Professional Astrology",
    natal_element_balance: "Element Balance",
    natal_life_spheres: "Life Spheres Analysis",
    natal_page_indicator: "Page {n} of {total}",
    chart_map: "Natal Chart Map",
    // New translations for rich content
    love: "Love & Relationships",
    career: "Career & Purpose",
    health: "Health & Wellness",
    finance: "Finance & Resources",
    strong: "Strong",
    weak: "Weak",
    neutral: "Neutral",
    compatible: "Most Compatible",
    challenging: "Growth Opportunities",
    lucky: "Lucky Elements",
    advice: "Daily Guidance",
    today: "Today's Transits",
    moon: "Current Moon Phase",
    interpretation: "Interpretation",
    highlights: "Highlights",
    caution: "Caution",
    tip: "Practical Tip",
    // Matchmaking specific
    loveStyle: "Love Style",
    relationshipOverview: "Relationship Overview",
    strengths: "Relationship Strengths",
    growthAreas: "Areas for Growth",
    elementalCompat: "Elemental Compatibility",
    relationshipGuidance: "Relationship Guidance",
    coupleLucky: "Lucky Elements for the Couple",
    todayAdvice: "Advice for Today",
    forPartner: "For",
    favoriteColors: "Favorite Colors",
    luckyNumbers: "Lucky Numbers",
    overview: "Overview",
    elementalCompatibility: "Elemental Compatibility",
    guidanceForRelationship: "Guidance for the Relationship",
    luckyForCouple: "Lucky Elements for the Couple",
    dailyAdviceForCouple: "Daily Advice for the Couple",
    // Natal specific
    strengthsLabel: "Strengths",
    challengesLabel: "Challenges",
    element: "Element",
    modality: "Modality",
    ruler: "Ruler",
    profile: "Profile",
    planetaryPositions: "Planetary Positions",
    stones: "Stones",
    favorableHours: "Favorable Hours",
    action: "Action",
    cosmicCounsel: "Cosmic Counsel",
    planetaryPositionsIntro: "The exact position of the stars at the moment of your birth defines the tones of your journey.",
    authenticityGuaranteed: "Authenticity guaranteed via Astryxion Blockchain",
    individualLoveProfiles: "Individual Love Profiles",
    unionStrengths: "Strengths of the Union",
    elementalSymphony: "Elemental Symphony",
    coupleCounsel: "Counsel for the Couple",
    matchmaking_between: "Relationship resonance between",
    lucky_label_color: "Color",
    lucky_label_stone: "Stone",
    lucky_label_numbers: "Numbers",
    default_consultant_name: "Consultant",
    qr_badge_title: "ASTRYXION ACCREDITED",
    qr_love_engine: "ASTRYXION LOVE ENGINE",
    verify_id: "ID:",
    annual_forecast_title: "Annual Forecast",
    annual_forecast_subtitle: "Year-ahead themes and symbolic timing",
    annual_year_theme: "Year theme",
    annual_key_transits: "Key transits",
    annual_monthly: "Monthly outlook",
    annual_retrogrades: "Retrograde periods",
    annual_final_advice: "Guidance",
    annual_energy: "Energy",
    annual_col_month: "Month",
    annual_col_guidance: "Guidance",
    annual_retro_col_start: "Start",
    annual_retro_col_end: "End",
  },
  pt: {
    mini: "Instantâneo Cósmico Diário",
    basic: "Lógica Natal Base",
    pro: "Monografia Natal Astryxion",
    matchmaking: "Perfil de Ressonância em Relacionamentos",
    natal: "Monografia Natal Astryxion",
    natal_subtitle: "Análise Profissional do Nascimento e Mapa da Alma",
    quick_snapshot: "Destaques Astrológicos Diários",
    relationship_analysis: "Compatibilidade Profunda de Relacionamento",
    name: "Nome do Consultante",
    date: "Data de Nascimento",
    time: "Hora Local do Nascimento",
    coords: "Coordenadas",
    planet: "Planeta",
    sign: "Signo Zodiacal",
    degree: "Grau Exato",
    house: "Casa",
    status: "Estado Planetário",
    retrograde: "Retrógrado",
    direct: "Direto",
    partner1: "Parceiro 1",
    partner2: "Parceiro 2",
    score: "Índice de Compatibilidade",
    disclaimer: "Relatório Profissional Astryxion. Dados Astrológicos de Alta Precisão.",
    verify: "Verificar Autenticidade",
    page: "Página",
    of: "de",
    pdf_brand_header: "Astryxion API • Astrologia profissional",
    natal_element_balance: "Equilíbrio dos Elementos",
    natal_life_spheres: "Análise das Esferas da Vida",
    natal_page_indicator: "Página {n} de {total}",
    chart_map: "Mapa do Carta Natal",
    // New translations for rich content
    love: "Amor & Relacionamentos",
    career: "Carreira & Propósito",
    health: "Saúde & Bem-estar",
    finance: "Finanças & Recursos",
    strong: "Forte",
    weak: "Fraco",
    neutral: "Neutro",
    compatible: "Mais Compatível",
    challenging: "Oportunidades de Crescimento",
    lucky: "Elementos da Sorte",
    advice: "Orientação Diária",
    today: "Trânsitos de Hoje",
    moon: "Fase Lunar Atual",
    interpretation: "Interpretação",
    highlights: "Destaques",
    caution: "Atenção",
    tip: "Dica Prática",
    // Matchmaking specific
    loveStyle: "Estilo no Amor",
    relationshipOverview: "Visão Geral da Relação",
    strengths: "Pontos Fortes do Relacionamento",
    growthAreas: "Áreas de Crescimento",
    elementalCompat: "Compatibilidade Elemental",
    relationshipGuidance: "Orientação para a Relação",
    coupleLucky: "Elementos da Sorte para o Casal",
    todayAdvice: "Conselho para Hoje",
    forPartner: "Para",
    favoriteColors: "Cores Favoritas",
    luckyNumbers: "Números da Sorte",
    overview: "Visão Geral",
    elementalCompatibility: "Compatibilidade Elemental",
    guidanceForRelationship: "Orientação para a Relação",
    luckyForCouple: "Elementos da Sorte para o Casal",
    dailyAdviceForCouple: "Conselho Diário para o Casal",
    // Natal specific
    strengthsLabel: "Forças",
    challengesLabel: "Desafios",
    element: "Elemento",
    modality: "Modalidade",
    ruler: "Regente",
    profile: "Perfil",
    planetaryPositions: "Posições Planetárias",
    stones: "Pedras",
    favorableHours: "Horas Favoráveis",
    action: "Ação",
    cosmicCounsel: "Conselho Cósmico",
    planetaryPositionsIntro: "A posição exata dos astros no momento do seu nascimento define os tons da sua jornada.",
    authenticityGuaranteed: "Autenticidade garantida via Blockchain Astryxion",
    individualLoveProfiles: "Perfis Individuais no Amor",
    unionStrengths: "Forças da União",
    elementalSymphony: "Sinfonia Elemental",
    coupleCounsel: "Conselho para o Casal",
    matchmaking_between: "Relatório de ressonância entre",
    lucky_label_color: "Cor",
    lucky_label_stone: "Pedra",
    lucky_label_numbers: "Números",
    default_consultant_name: "Consultante",
    qr_badge_title: "ASTRYXION CREDENCIADO",
    qr_love_engine: "ASTRYXION — MOTOR DE AMOR",
    verify_id: "ID:",
    annual_forecast_title: "Previsão Anual",
    annual_forecast_subtitle: "Temas do ano e ritmo simbólico",
    annual_year_theme: "Tema do ano",
    annual_key_transits: "Trânsitos-chave",
    annual_monthly: "Panorama mensal",
    annual_retrogrades: "Períodos retrógrados",
    annual_final_advice: "Orientação",
    annual_energy: "Energia",
    annual_col_month: "Mês",
    annual_col_guidance: "Orientação",
    annual_retro_col_start: "Início",
    annual_retro_col_end: "Fim",
  },
  es: {
    mini: "Instantánea Cósmica Diaria",
    basic: "Lógica Natal Base",
    pro: "Monografía Natal Astryxion",
    matchmaking: "Perfil de Resonancia en Relaciones",
    natal: "Monografía Natal Astryxion",
    natal_subtitle: "Análisis Profesional del Nacimiento y Mapa del Alma",
    quick_snapshot: "Resúmenes Astrológicos Diarios",
    relationship_analysis: "Compatibilidad Detallada de Relaciones",
    name: "Nombre del Consultante",
    date: "Fecha de Nacimiento",
    time: "Hora del Nacimiento",
    coords: "Coordenadas",
    planet: "Planeta",
    sign: "Signo Zodiacal",
    degree: "Grado Exacto",
    house: "Casa",
    status: "Estado Planetario",
    retrograde: "Retrógrado",
    direct: "Directo",
    partner1: "Socio 1",
    partner2: "Socio 2",
    score: "Índice de Compatibilidad",
    disclaimer: "Informe Profesional Astryxion. Datos Astrológicos de Alta Precisión.",
    verify: "Verificar Autenticidad",
    page: "Página",
    of: "de",
    pdf_brand_header: "Astryxion API • Astrología profesional",
    natal_element_balance: "Equilibrio de los Elementos",
    natal_life_spheres: "Análisis de las Esferas de la Vida",
    natal_page_indicator: "Página {n} de {total}",
    chart_map: "Mapa del Carta Natal",
    // New translations for rich content
    love: "Amor & Relaciones",
    career: "Carrera & Propósito",
    health: "Salud & Bienestar",
    finance: "Finanzas & Recursos",
    strong: "Fuerte",
    weak: "Débil",
    neutral: "Neutral",
    compatible: "Más Compatible",
    challenging: "Oportunidades de Crecimiento",
    lucky: "Elementos de la Suerte",
    advice: "Orientación Diaria",
    today: "Tránsitos de Hoy",
    moon: "Fase Lunar Actual",
    interpretation: "Interpretación",
    highlights: "Destacados",
    caution: "Atención",
    tip: "Consejo Práctico",
    // Matchmaking specific
    loveStyle: "Estilo en el Amor",
    relationshipOverview: "Visión General de la Relación",
    strengths: "Puntos Fuertes de la Relación",
    growthAreas: "Áreas de Crecimiento",
    elementalCompat: "Compatibilidad Elemental",
    relationshipGuidance: "Orientación para la Relación",
    coupleLucky: "Elementos de la Suerte para la Pareja",
    todayAdvice: "Consejo para Hoy",
    forPartner: "Para",
    favoriteColors: "Colores Favoritos",
    luckyNumbers: "Números de la Suerte",
    overview: "Visión General",
    elementalCompatibility: "Compatibilidad Elemental",
    guidanceForRelationship: "Orientación para la Relación",
    luckyForCouple: "Elementos de la Suerte para la Pareja",
    dailyAdviceForCouple: "Consejo Diario para la Pareja",
    // Natal specific
    strengthsLabel: "Fortalezas",
    challengesLabel: "Desafíos",
    element: "Elemento",
    modality: "Modalidad",
    ruler: "Regente",
    profile: "Perfil",
    planetaryPositions: "Posiciones Planetarias",
    stones: "Piedras",
    favorableHours: "Horas Favorables",
    action: "Acción",
    cosmicCounsel: "Consejo Cósmico",
    planetaryPositionsIntro: "La posición exacta de las estrellas en el momento de tu nacimiento define los tonos de tu viaje.",
    authenticityGuaranteed: "Autenticidad garantizada a través de Astryxion Blockchain",
    individualLoveProfiles: "Perfiles Individuales de Amor",
    unionStrengths: "Fortalezas de la Unión",
    elementalSymphony: "Sinfonía Elemental",
    coupleCounsel: "Consejo para la Pareja",
    matchmaking_between: "Informe de resonancia entre",
    lucky_label_color: "Color",
    lucky_label_stone: "Piedra",
    lucky_label_numbers: "Números",
    default_consultant_name: "Consultante",
    qr_badge_title: "ASTRYXION ACREDITADO",
    qr_love_engine: "ASTRYXION — MOTOR DE AMOR",
    verify_id: "ID:",
    annual_forecast_title: "Pronóstico Anual",
    annual_forecast_subtitle: "Temas del año y ritmo simbólico",
    annual_year_theme: "Tema del año",
    annual_key_transits: "Tránsitos clave",
    annual_monthly: "Panorama mensual",
    annual_retrogrades: "Períodos retrógrados",
    annual_final_advice: "Orientación",
    annual_energy: "Energía",
    annual_col_month: "Mes",
    annual_col_guidance: "Orientación",
    annual_retro_col_start: "Inicio",
    annual_retro_col_end: "Fin",
  },
  hi: {
    mini: "दैनिक कॉस्मिक स्नैपशॉट",
    basic: "जन्म कुंडली आधार",
    pro: "एस्ट्रीक्सियन जन्म कुंडली मोनोग्राफ",
    matchmaking: "संबंध अनुनाद प्रोफाइल",
    natal: "एस्ट्रीक्सियन जन्म कुंडली मोनोग्राफ",
    natal_subtitle: "व्यावसायिक जन्म विश्लेषण और आत्मा मानचित्र",
    quick_snapshot: "दैनिक ज्योतिषीय मुख्य विशेषताएं",
    relationship_analysis: "गहन संबंध अनुकूलता विश्लेषण",
    name: "परामर्शदाता का नाम",
    date: "जन्म तिथि",
    time: "स्थानीय जन्म समय",
    coords: "निर्देशांक",
    planet: "ग्रह",
    sign: "राशि",
    degree: "सटीक डिग्री",
    house: "भाव",
    status: "ग्रहों की स्थिति",
    retrograde: "वक्री",
    direct: "मार्गी",
    partner1: "साथी 1",
    partner2: "साथी 2",
    score: "अनुकूलता सूचकांक",
    disclaimer: "पेशेवर एस्ट्रीक्सियन नेटवर्क रिपोर्ट। उच्च-परिशुद्धता ज्योतिषीय डेटा।",
    verify: "प्रमाणिकता सत्यापित करें",
    page: "पृष्ठ",
    of: "का",
    pdf_brand_header: "एस्ट्रिक्सियन API • व्यावसायिक ज्योतिष",
    natal_element_balance: "तत्वों का संतुलन",
    natal_life_spheres: "जीवन के क्षेत्रों का विश्लेषण",
    natal_page_indicator: "पृष्ठ {n} / {total}",
    pdf_footer_before: "पृष्ठ ",
    pdf_footer_mid: " / ",
    chart_map: "जन्म कुंडली मानचित्र",
    // New translations for rich content
    love: "प्रेम & संबंध",
    career: "करियर & उद्देश्य",
    health: "स्वास्थ्य & कल्याण",
    finance: "वित्त & संसाधन",
    strong: "बलवान",
    weak: "कमजोर",
    neutral: "तटस्थ",
    compatible: "सबसे अनुकूल",
    challenging: "विकास के अवसर",
    lucky: "भाग्यशाली तत्व",
    advice: "दैनिक मार्गदर्शन",
    today: "आज के गोचर",
    moon: "चंद्रमा की वर्तमान कला",
    interpretation: "व्याख्या",
    highlights: "मुख्य विशेषताएं",
    caution: "सावधानी",
    tip: "व्यावहारिक सुझाव",
    // Matchmaking specific
    loveStyle: "प्रेम शैली",
    relationshipOverview: "संबंध का अवलोकन",
    strengths: "संबंध की ताकत",
    growthAreas: "विकास के क्षेत्र",
    elementalCompat: "तत्व अनुकूलता",
    relationshipGuidance: "संबंध मार्गदर्शन",
    coupleLucky: "जोड़ी के लिए भाग्यशाली तत्व",
    todayAdvice: "आज की सलाह",
    forPartner: "के लिए",
    favoriteColors: "पसंदीदा रंग",
    luckyNumbers: "भाग्यशाली नंबर",
    overview: "अवलोकन",
    elementalCompatibility: "तत्व अनुकूलता",
    guidanceForRelationship: "संबंध के लिए मार्गदर्शन",
    luckyForCouple: "जोड़ी के लिए भाग्यशाली तत्व",
    dailyAdviceForCouple: "जोड़ी के लिए दैनिक सलाह",
    // Natal specific
    strengthsLabel: "ताकत",
    challengesLabel: "चुनौतियां",
    element: "तत्व",
    modality: "गुण",
    ruler: "शासक",
    profile: "प्रोफाइल",
    planetaryPositions: "ग्रह स्थितियां",
    stones: "पत्थर",
    favorableHours: "अनुकूल घंटे",
    action: "कार्रवाई",
    cosmicCounsel: "कॉस्मिक सलाह",
    planetaryPositionsIntro: "आपके जन्म के समय सितारों की सटीक स्थिति आपकी यात्रा के स्वर निर्धारित करती है।",
    authenticityGuaranteed: "एस्ट्रिक्सियन ब्लॉकचेन के माध्यम से प्रामाणिकता की गारंटी",
    individualLoveProfiles: "व्यक्तिगत प्रेम प्रोफाइल",
    unionStrengths: "मिलन की ताकत",
    elementalSymphony: "तात्विक सिम्फनी",
    coupleCounsel: "जोड़े के लिए सलाह",
    matchmaking_between: "अनुनाद रिपोर्ट —",
    lucky_label_color: "रंग",
    lucky_label_stone: "रत्न",
    lucky_label_numbers: "अंक",
    default_consultant_name: "परामर्शदाता",
    qr_badge_title: "एस्ट्रिक्सियन प्रमाणित",
    qr_love_engine: "एस्ट्रिक्सियन लव इंजन",
    verify_id: "आईडी:",
    annual_forecast_title: "वार्षिक पूर्वानुमान",
    annual_forecast_subtitle: "वर्ष के विषय और प्रतीकात्मक समय",
    annual_year_theme: "वर्ष का विषय",
    annual_key_transits: "मुख्य गोचर",
    annual_monthly: "मासिक दृष्टिकोण",
    annual_retrogrades: "वक्री अवधि",
    annual_final_advice: "मार्गदर्शन",
    annual_energy: "ऊर्जा",
    annual_col_month: "माह",
    annual_col_guidance: "मार्गदर्शन",
    annual_retro_col_start: "आरंभ",
    annual_retro_col_end: "समाप्ति",
  },
};

/** Normaliza código de idioma para chaves de TRANSLATIONS (PDF). */
function resolvePdfLang(lang: string | undefined): "en" | "pt" | "es" | "hi" {
  const raw = (lang ?? "en").toLowerCase().trim();
  if (raw === "pt" || raw === "es" || raw === "hi") return raw;
  return "en";
}

/** Rodapé de página no HTML do relatório natal (placeholders {n} e {total}). */
function expandNatalPageIndicator(t: Record<string, any>, n: number, total: number): string {
  const pat = t.natal_page_indicator as string | undefined;
  if (pat) {
    return pat.replace(/\{n\}/g, String(n)).replace(/\{total\}/g, String(total));
  }
  return `${t.page} ${n} ${t.of} ${total}`;
}

// ============================================================================
// STYLES COM MELHORIAS VISUAIS
// ============================================================================

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');

  body {
    font-family: 'Inter', 'Noto Sans Devanagari', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    background: #fff;
  }

  .pdf-page {
    position: relative;
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    box-sizing: border-box;
    page-break-after: always;
    overflow: hidden;
    background: linear-gradient(135deg, #ffffff 0%, #fdfbff 100%);
  }

  /* Watermark / Decoration */
  .pdf-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 10% 10%, rgba(138, 79, 255, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 90% 90%, rgba(138, 79, 255, 0.02) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  h1, h2, h3, .serif {
    font-family: 'Playfair Display', serif;
  }

  .header {
    text-align: center;
    border-bottom: 2px solid #8a4fff;
    padding-bottom: 20px;
    margin-bottom: 30px;
    position: relative;
    z-index: 1;
  }

  .title {
    color: #8a4fff;
    font-size: 32px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 16px;
    color: #555;
    margin-top: 5px;
    font-style: italic;
    font-family: 'Playfair Display', serif;
  }

  .section {
    margin-bottom: 30px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 20px;
    color: #8a4fff;
    border-left: 5px solid #8a4fff;
    padding-left: 15px;
    margin-bottom: 15px;
    background: linear-gradient(90deg, rgba(138, 79, 255, 0.08) 0%, transparent 100%);
    padding-top: 8px;
    padding-bottom: 8px;
    font-weight: 600;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  th {
    text-align: left;
    background: linear-gradient(135deg, #f8f9ff 0%, #e8e8ff 100%);
    padding: 12px;
    font-size: 13px;
    color: #444;
    border-bottom: 2px solid #8a4fff;
    font-weight: 600;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    font-size: 13px;
  }

  tr:nth-child(even) {
    background-color: rgba(138, 79, 255, 0.02);
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 35px;
    background: linear-gradient(135deg, #fafafa 0%, #f5f5ff 100%);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e8e8ff;
    box-shadow: 0 2px 12px rgba(138, 79, 255, 0.08);
  }

  .details-item {
    font-size: 13px;
  }

  .details-label {
    font-weight: 600;
    color: #666;
    margin-right: 5px;
  }

  .badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 11px;
    background: linear-gradient(135deg, #8a4fff 0%, #6b3dd9 100%);
    color: white;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(138, 79, 255, 0.3);
  }

  .badge-retrograde {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
  }

  .cosmic-counsel {
    background: linear-gradient(135deg, #1a0b2e 0%, #2e1b6d 100%);
    color: #fff;
    padding: 25px;
    border-radius: 16px;
    margin: 30px 0;
    box-shadow: 0 12px 30px rgba(26, 11, 46, 0.3);
    border: 1px solid rgba(138, 79, 255, 0.3);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(5px);
    page-break-inside: avoid;
  }

  .cosmic-counsel::after {
    content: '✨';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 40px;
    opacity: 0.15;
  }

  .cosmic-counsel h3 {
    margin-top: 0;
    color: #ffd700;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
    padding-bottom: 10px;
    margin-bottom: 15px;
  }

  .cosmic-counsel p {
    font-style: italic;
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
    color: #e0e0ff;
  }

  .advice-box {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    background: white;
    margin-bottom: 15px;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 10px;
    color: #888;
    padding: 20px;
    background: linear-gradient(90deg, transparent 0%, rgba(138, 79, 255, 0.05) 50%, transparent 100%);
    border-top: 1px solid #e8e8ff;
  }

  .score-container {
    text-align: center;
    margin: 30px 0;
    padding: 30px;
    background: linear-gradient(135deg, #fdfaff 0%, #f8f5ff 100%);
    border: 2px dashed #8a4fff;
    border-radius: 16px;
  }

  .score-value {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(135deg, #8a4fff 0%, #6b3dd9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(138, 79, 255, 0.2);
  }

  .score-label {
    font-size: 16px;
    color: #666;
    margin-top: 10px;
  }

  .chart-container {
    text-align: center;
    margin: 30px 0;
    padding: 25px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    page-break-inside: avoid;
  }

  .chart-title {
    font-size: 18px;
    color: #8a4fff;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .qr-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
    border-radius: 12px;
    border: 1px solid #e8e8ff;
  }

  .qr-info {
    text-align: left;
  }

  .qr-info h4 {
    margin: 0 0 5px 0;
    color: #8a4fff;
    font-size: 14px;
  }

  .qr-info p {
    margin: 0;
    font-size: 11px;
    color: #666;
  }

  .watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 72px;
    color: rgba(138, 79, 255, 0.03);
    font-weight: 700;
    pointer-events: none;
    z-index: -1;
    white-space: nowrap;
  }

  @media print {
    .section { page-break-inside: avoid; }
    .chart-container { page-break-inside: avoid; }
  }
`;

// ============================================================================
// FUNÇÃO PRINCIPAL DE GERAÇÃO DE PDF
// ============================================================================

export interface PDFGenerationOptions {
  cacheKey?: string;
  redis?: Redis | null;
  useCache?: boolean;
  cacheTTL?: number;
  /** Idioma do cabeçalho/rodapé Puppeteer (en | pt | es | hi). */
  lang?: string;
}

export async function generatePDF(
  htmlContent: string,
  options: PDFGenerationOptions = {}
): Promise<{ buffer: Buffer; fromCache: boolean; generationTime: number }> {
  const startTime = Date.now();
  const { cacheKey, redis, useCache = true, cacheTTL = 86400, lang } = options;
  const pdfLoc = resolvePdfLang(lang);
  const pdfT = TRANSLATIONS[pdfLoc] || TRANSLATIONS.en;
  const headerLine = pdfT.pdf_brand_header ?? "Astryxion API • Professional Astrology";
  const footerBefore =
    typeof pdfT.pdf_footer_before === "string" ? pdfT.pdf_footer_before : `${pdfT.page} `;
  const footerMid =
    typeof pdfT.pdf_footer_mid === "string" ? pdfT.pdf_footer_mid : ` ${pdfT.of} `;
  const footerLine = `${footerBefore}<span class="pageNumber"></span>${footerMid}<span class="totalPages"></span>`;

  // Verificar cache
  if (useCache && cacheKey && redis) {
    const cached = await getCachedPDF(redis, cacheKey);
    if (cached) {
      return {
        buffer: cached,
        fromCache: true,
        generationTime: Date.now() - startTime,
      };
    }
  }

  const page = await acquirePage();

  try {
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.setViewport({ width: 800, height: 1100 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", right: "10mm", bottom: "20mm", left: "10mm" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="width: 100%; font-size: 8px; color: #999; text-align: center; padding-top: 10px;">${headerLine}</div>`,
      footerTemplate: `<div style="width: 100%; font-size: 8px; color: #999; text-align: center; padding-bottom: 10px;">${footerLine}</div>`,
    });

    const buffer = Buffer.from(pdfBuffer);

    // Salvar no cache
    if (useCache && cacheKey && redis) {
      await setCachedPDF(redis, cacheKey, buffer, cacheTTL);
    }

    return {
      buffer,
      fromCache: false,
      generationTime: Date.now() - startTime,
    };
  } finally {
    releasePage(page);
  }
}

// ============================================================================
// HTML GENERATORS ATUALIZADOS
// ============================================================================

export function createMiniReportHTML(
  data: any,
  serviceName: string,
  lang = "en"
): string {
  const loc = resolvePdfLang(lang);
  const t = TRANSLATIONS[loc] || TRANSLATIONS.en;
  const { input, planets } = data;
  const verificationId = crypto.randomUUID().slice(0, 8).toUpperCase();
  const qrSvg = generateQRCodeSVG(`https://astryxion.com/verify/${verificationId}`, 80);

  const planetData = planets.map((p: any) => ({
    name: p.name,
    sign: p.sign,
    longitude: p.longitude,
    house: p.house,
    retrograde: p.retrograde,
  }));

  const content = generatePDFContent(planetData, null, loc);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>${SHARED_STYLES}${RICH_CONTENT_STYLES}</style>
</head>
<body>
  <div class="pdf-page">
    <div class="header">
      <h1 class="title serif">${t.mini}</h1>
      <p class="subtitle">${t.quick_snapshot}</p>
    </div>

    <div class="details-grid">
      <div class="details-item"><span class="details-label">${t.name}:</span> ${input.fullName || t.default_consultant_name}</div>
      <div class="details-item"><span class="details-label">${t.date}:</span> ${input.date}</div>
      <div class="details-item"><span class="details-label">${t.time}:</span> ${input.time || "12:00:00"}</div>
    </div>

    <!-- SIGN PROFILE -->
    <div class="content-section">
      <div class="profile-card">
        <h2 class="profile-name serif" style="font-size: 26px;">${content.signProfile.name}</h2>
        <div class="profile-details">
          <span class="profile-tag">✨ ${content.signProfile.element}</span>
          <span class="profile-tag">✦ ${content.signProfile.modality}</span>
        </div>
        <p class="profile-description serif" style="font-size: 14px;">${content.signProfile.description}</p>
      </div>
    </div>

    <!-- TODAY'S GUIDANCE -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
      <div class="analysis-card love">
        <h3 class="analysis-title serif">💝 ${t.love}</h3>
        <p class="analysis-summary" style="font-size: 12px; margin-bottom: 5px;">${content.loveAnalysis.summary}</p>
        <div class="highlight-tag">${content.loveAnalysis.highlights[0]}</div>
      </div>
      <div class="analysis-card career">
        <h3 class="analysis-title serif">💼 ${t.career}</h3>
        <p class="analysis-summary" style="font-size: 12px; margin-bottom: 5px;">${content.careerAnalysis.summary}</p>
        <div class="highlight-tag">${content.careerAnalysis.highlights[0]}</div>
      </div>
    </div>

    <div class="cosmic-counsel">
      <h3 class="serif">${t.cosmicCounsel}</h3>
      <p>${content.signProfile.cosmicCounsel}</p>
    </div>

    <div class="lucky-grid" style="padding: 15px; gap: 10px; margin-bottom: 20px;">
      <div class="lucky-item">
        <div class="lucky-label">${t.lucky_label_color}</div>
        <div class="lucky-values">${content.luckyData.colors[0]}</div>
      </div>
      <div class="lucky-item">
        <div class="lucky-label">${t.lucky_label_stone}</div>
        <div class="lucky-values">${content.luckyData.stones[0]}</div>
      </div>
      <div class="lucky-item">
        <div class="lucky-label">${t.lucky_label_numbers}</div>
        <div class="lucky-values">${content.luckyData.numbers.slice(0, 3).join(', ')}</div>
      </div>
    </div>

    <div class="qr-section" style="margin-top: auto; border-top: 1px solid #eee; padding-top: 15px;">
      ${qrSvg}
      <div class="qr-info">
        <h4 class="serif" style="font-size: 14px;">${t.qr_badge_title}</h4>
        <p style="font-size: 10px;">${t.verify_id} ${verificationId}</p>
      </div>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} ${serviceName}.
    </div>
  </div>
</body>
</html>`;
}

function escAnnualPdf(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function createAnnualForecastPDFHTML(
  predictions: AnnualPrediction,
  serviceName: string,
  lang = "en"
): string {
  const loc = resolvePdfLang(lang);
  const t = TRANSLATIONS[loc] || TRANSLATIONS.en;
  const o = predictions.overview;
  const monthRows = predictions.months
    .map(
      (m) =>
        `<tr><td>${escAnnualPdf(m.monthName)}</td><td>${escAnnualPdf(m.advice)}</td><td>${m.energy}/10</td></tr>`
    )
    .join("");
  const retroRows = predictions.retrogradePeriods
    .map(
      (r) =>
        `<tr><td>${escAnnualPdf(r.planet)}</td><td>${escAnnualPdf(r.start)}</td><td>${escAnnualPdf(r.end)}</td><td>${escAnnualPdf(r.sign)}</td><td>${escAnnualPdf(r.advice)}</td></tr>`
    )
    .join("");
  const keyLi = o.keyTransits.map((k) => `<li>${escAnnualPdf(k)}</li>`).join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>${SHARED_STYLES}</style>
</head>
<body>
  <div class="pdf-page">
    <div class="header">
      <h1 class="title serif">${t.annual_forecast_title}</h1>
      <p class="subtitle">${t.annual_forecast_subtitle} · ${predictions.year}</p>
    </div>
    <div class="details-grid">
      <div class="details-item"><span class="details-label">${t.date}:</span> ${predictions.input.date}</div>
      <div class="details-item"><span class="details-label">${t.time}:</span> ${predictions.input.timeUtc}</div>
      <div class="details-item"><span class="details-label">${t.coords}:</span> ${predictions.input.latitude}, ${predictions.input.longitude}</div>
    </div>
    <div class="section">
      <h2 class="section-title">${t.annual_year_theme}</h2>
      <p>${escAnnualPdf(o.theme)}</p>
      <p><strong>${t.overview}:</strong> ${escAnnualPdf(o.summary)}</p>
      <p><strong>${t.annual_key_transits}</strong></p>
      <ul style="margin:8px 0 0 18px;">${keyLi}</ul>
    </div>
    <div class="section">
      <h2 class="section-title">${t.annual_monthly}</h2>
      <table>
        <thead><tr><th>${t.annual_col_month}</th><th>${t.annual_col_guidance}</th><th>${t.annual_energy}</th></tr></thead>
        <tbody>${monthRows}</tbody>
      </table>
    </div>
    <div class="section">
      <h2 class="section-title">${t.annual_retrogrades}</h2>
      <table>
        <thead><tr><th>${t.planet}</th><th>${t.annual_retro_col_start}</th><th>${t.annual_retro_col_end}</th><th>${t.sign}</th><th>${t.advice}</th></tr></thead>
        <tbody>${retroRows}</tbody>
      </table>
    </div>
    <div class="cosmic-counsel">
      <h3 class="serif">${t.annual_final_advice}</h3>
      <p>${escAnnualPdf(predictions.yearlyAdvice)}</p>
      <p style="margin-top:10px;opacity:0.9;">${escAnnualPdf(predictions.solarReturnHighlight)}</p>
      <p style="opacity:0.9;">${escAnnualPdf(predictions.eclipsesImpact)}</p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} ${escAnnualPdf(serviceName)}.</div>
  </div>
</body>
</html>`;
}

export function createMatchmakingReportHTML(
  data: any,
  serviceName: string,
  lang = "en"
): string {
  const loc = resolvePdfLang(lang);
  const t = TRANSLATIONS[loc] || TRANSLATIONS.en;
  const { personA, personB, score, analysis, planetsA, planetsB } = data;
  const verificationId = crypto.randomUUID().slice(0, 8).toUpperCase();
  const qrSvg = generateQRCodeSVG(`https://astryxion.com/verify/${verificationId}`, 80);

  const scoreTexts: Record<string, any> = {
    en: {
      excellent: { text: "Exceptional Harmony", desc: "You have an exceptional connection! There's a natural harmony between you that facilitates mutual understanding and growth together." },
      good: { text: "Good Compatibility", desc: "Your connection is strong and promises stability. Commitment and open communication will be the keys to further strengthening your relationship." },
      moderate: { text: "Moderate Connection", desc: "There's potential for growth together, but mutual understanding and adaptations will be necessary. Focus on communication and respect for differences." },
      challenging: { text: "Growth Opportunity", desc: "The relationship presents challenges that can turn into development opportunities. Patience and tolerance will be essential." },
    },
    pt: {
      excellent: { text: "Harmonia Excepcional", desc: "Vocês têm uma conexão excepcional! Há uma sintonia natural entre vocês que facilita o entendimento mútuo e o crescimento conjunto." },
      good: { text: "Boa Compatibilidade", desc: "Sua conexão é forte e promete estabilidade. Compromisso e comunicação aberta serão as chaves para fortalecer ainda mais sua relação." },
      moderate: { text: "Conexão Moderada", desc: "Há potencial para crescimento juntos, mas serão necessárias compreensão mútua e adaptações. Foque na comunicação e respeito às diferenças." },
      challenging: { text: "Oportunidade de Crescimento", desc: "A relação apresenta desafios que podem se transformar em oportunidades de desenvolvimento. Paciência e tolerância serão essenciais." },
    },
    es: {
      excellent: { text: "Armonía excepcional", desc: "¡Tienen una conexión excepcional! Hay una sintonía natural entre ustedes que facilita la comprensión mutua y el crecimiento juntos." },
      good: { text: "Buena compatibilidad", desc: "Su conexión es fuerte y promete estabilidad. El compromiso y la comunicación abierta serán claves para fortalecer aún más la relación." },
      moderate: { text: "Conexión moderada", desc: "Hay potencial de crecer juntos, pero harán falta comprensión mutua y adaptación. Enfóquense en la comunicación y el respeto a las diferencias." },
      challenging: { text: "Oportunidad de crecimiento", desc: "La relación presenta retos que pueden volverse oportunidades de desarrollo. La paciencia y la tolerancia serán esenciales." },
    },
    hi: {
      excellent: { text: "असाधारण सामंजस्य", desc: "आपका संबंध असाधारण है! आपके बीच प्राकृतिक तालमेल है जो आपसी समझ और साथ मिलकर विकास को आसान बनाता है।" },
      good: { text: "अच्छी अनुकूलता", desc: "आपका संबंध मजबूत है और स्थिरता का वादा करता है। प्रतिबद्धता और खुला संवाद संबंध को और मजबूत करने की कुंजी होंगे।" },
      moderate: { text: "मध्यम संबंध", desc: "साथ में विकास की संभावना है, लेकिन आपसी समझ और अनुकूलन आवश्यक होंगे। संचार और भेदों के प्रति सम्मान पर ध्यान दें।" },
      challenging: { text: "विकास का अवसर", desc: "संबंध में चुनौतियाँ हैं जो विकास के अवसर बन सकती हैं। धैर्य और सहिष्णुता आवश्यक होंगे।" },
    },
  };

  const langScores = scoreTexts[loc] || scoreTexts.en;
  
  let scoreColor = "#8a4fff";
  let scoreText = "";
  let scoreDescription = "";
  
  if (score >= 80) {
    scoreColor = "#22c55e";
    scoreText = langScores.excellent.text;
    scoreDescription = langScores.excellent.desc;
  } else if (score >= 60) {
    scoreColor = "#8a4fff";
    scoreText = langScores.good.text;
    scoreDescription = langScores.good.desc;
  } else if (score >= 40) {
    scoreColor = "#f59e0b";
    scoreText = langScores.moderate.text;
    scoreDescription = langScores.moderate.desc;
  } else {
    scoreColor = "#ef4444";
    scoreText = langScores.challenging.text;
    scoreDescription = langScores.challenging.desc;
  }

  const contentA = generatePDFContent(
    planetsA?.map((p: any) => ({
      name: p.name, sign: p.sign, longitude: p.longitude, house: p.house, retrograde: p.retrograde
    })) || [],
    null, loc
  );

  const contentB = generatePDFContent(
    planetsB?.map((p: any) => ({
      name: p.name, sign: p.sign, longitude: p.longitude, house: p.house, retrograde: p.retrograde
    })) || [],
    null, loc
  );

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>${SHARED_STYLES}${RICH_CONTENT_STYLES}
  .score-value { color: ${scoreColor} !important; font-family: 'Playfair Display', serif; }
  .score-text { font-size: 22px; color: ${scoreColor}; font-weight: 600; margin-top: 10px; font-family: 'Playfair Display', serif; }
</style>
</head>
<body>
  <!-- PAGE 1: RESONANCE OVERVIEW -->
  <div class="pdf-page">
    <div class="header">
      <h1 class="title serif">${t.matchmaking}</h1>
      <p class="subtitle">${t.matchmaking_between} ${personA.fullName} & ${personB.fullName}</p>
    </div>

    <div class="score-container" style="margin-top: 10px; border-style: solid;">
      <div class="score-value" style="font-size: 72px;">${score}%</div>
      <div class="score-label">${t.score}</div>
      <div class="score-text">${scoreText}</div>
      <p style="font-size: 14px; color: #555; max-width: 500px; margin: 20px auto 0; line-height: 1.6; font-style: italic;" class="serif">${scoreDescription}</p>
    </div>

    <div class="content-section">
      <h2 class="section-title serif">${t.elementalSymphony}</h2>
      <div class="lucky-grid">
        <div class="lucky-item">
          <div class="lucky-label">${personA.fullName}</div>
          <div class="lucky-values">${contentA.signProfile.element} (${contentA.signProfile.name})</div>
        </div>
        <div class="lucky-item">
          <div class="lucky-label">${personB.fullName}</div>
          <div class="lucky-values">${contentB.signProfile.element} (${contentB.signProfile.name})</div>
        </div>
      </div>
      <p style="font-size: 13px; color: #666; margin-top: 15px; text-align: center; border: 1px dashed #ccc; padding: 10px; border-radius: 8px;">
        ${getElementalCompatibilityText(contentA.signProfile.elementKey, contentB.signProfile.elementKey, loc)}
      </p>
    </div>

    <div class="cosmic-counsel">
      <h3 class="serif">${t.coupleCounsel}</h3>
      <p>${getRelationshipAnalysisText(loc)}</p>
    </div>
  </div>

  <!-- PAGE 2: INDIVIDUAL PERSPECTIVES -->
  <div class="pdf-page">
    <h2 class="section-title serif">${t.individualLoveProfiles}</h2>
    
    <div class="profile-card" style="margin-bottom: 25px;">
      <h2 class="profile-name serif">${personA.fullName}</h2>
      <p class="profile-description serif" style="font-size: 14px; margin-top: 10px;">${contentA.signProfile.loveStyle}</p>
      <div class="analysis-tip" style="margin-top: 10px;">💡 ${contentA.loveAnalysis.tip}</div>
    </div>

    <div class="profile-card">
      <h2 class="profile-name serif">${personB.fullName}</h2>
      <p class="profile-description serif" style="font-size: 14px; margin-top: 10px;">${contentB.signProfile.loveStyle}</p>
      <div class="analysis-tip" style="margin-top: 10px;">💡 ${contentB.loveAnalysis.tip}</div>
    </div>

    <div class="content-section" style="margin-top: 30px;">
      <h2 class="section-title serif">${t.unionStrengths}</h2>
      <div class="analysis-card" style="border-left-color: #22c55e; background: #f0fff4;">
        <h3 class="analysis-title serif">✨ ${t.highlights}</h3>
        <div class="analysis-highlights">
          <span class="highlight-tag">${getTranslation('openCommunication', loc)}</span>
          <span class="highlight-tag">${getTranslation('mutualRespect', loc)}</span>
          <span class="highlight-tag">${getTranslation('growthTogether', loc)}</span>
        </div>
      </div>
    </div>

    <div class="qr-section" style="margin-top: auto; border-top: 1px solid #eee; padding-top: 20px;">
      ${qrSvg}
      <div class="qr-info">
        <h4 class="serif">${t.verify}</h4>
        <p style="font-size: 10px;">${t.verify_id} ${verificationId}<br>${t.qr_love_engine}</p>
      </div>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} ${serviceName}.
    </div>
  </div>
</body>
</html>`;
}

// Helper function for elemental compatibility (multilingual)
function getElementalCompatibilityText(elementA: string, elementB: string, lang: string): string {
  const loc = resolvePdfLang(lang);
  const texts: Record<string, any> = {
    en: {
      fire: {
        fire: "🔥🔥 Fire + Fire: Intense and passionate connection! Both are energetic and animated, creating a vibrant relationship.",
        air: "🔥💨 Fire + Air: Dynamic combination! Air feeds the flame of fire, creating enthusiasm and stimulating communication.",
        earth: "🔥🌍 Fire + Earth: Interesting challenge! Fire can burn earth, but with mutual respect, balance can be achieved.",
        water: "🔥💧 Fire + Water: Natural tension between passion and emotion. Requires understanding of emotional differences.",
      },
      earth: {
        fire: "🌍🔥 Earth + Fire: Interesting challenge! Fire can burn earth, but with mutual respect, balance can be achieved.",
        air: "🌍💨 Earth + Air: Significant differences! Earth seeks stability while air seeks freedom. Communication is key.",
        earth: "🌍🌍 Earth + Earth: Extremely stable and secure relationship. Both value commitments and lasting achievements.",
        water: "🌍💧 Earth + Water: Excellent compatibility! Water nourishes earth, creating a relationship of mutual care.",
      },
      air: {
        fire: "💨🔥 Air + Fire: Dynamic combination! Air feeds the flame of fire, creating enthusiasm and stimulating communication.",
        air: "💨💨 Air + Air: Intellectual and communicative relationship. Both appreciate freedom and new ideas.",
        earth: "💨🌍 Air + Earth: Significant differences! Earth seeks stability while air seeks freedom. Communication is key.",
        water: "💨💧 Air + Water: Emotional challenge! Air is logical and water is emotional. Conscious effort to understand is needed.",
      },
      water: {
        fire: "💧🔥 Water + Fire: Natural tension between passion and emotion. Requires understanding of emotional differences.",
        earth: "💧🌍 Water + Earth: Excellent compatibility! Water nourishes earth, creating a relationship of mutual care.",
        air: "💧💨 Water + Air: Emotional challenge! Air is logical and water is emotional. Conscious effort to understand is needed.",
        water: "💧💧 Water + Water: Deeply emotional and intuitive relationship. Strong connection but watch for excessive merging.",
      },
    },
    pt: {
      fire: {
        fire: "🔥🔥 Fogo + Fogo: Conexão intensa e apaixonada! Ambos são energéticos e animados, criando uma relação vibrante.",
        air: "🔥💨 Fogo + Ar: Combinação dinâmica! O ar alimenta a chama do fogo, criando entusiasmo e estimulando a comunicação.",
        earth: "🔥🌍 Fogo + Terra: Desafio interessante! O fogo pode queimar a terra, mas com respeito mútuo, pode haver equilíbrio.",
        water: "🔥💧 Fogo + Água: Tensão natural entre paixão e emoção. Requer compreensão das diferenças emocionais.",
      },
      earth: {
        fire: "🌍🔥 Terra + Fogo: Desafio interessante! O fogo pode queimar a terra, mas com respeito mútuo, pode haver equilíbrio.",
        air: "🌍💨 Terra + Ar: Diferenças significativas! A terra busca estabilidade enquanto o ar busca liberdade. A comunicação é essencial.",
        earth: "🌍🌍 Terra + Terra: Relação extremamente estável e segura. Ambos valorizam compromissos e construções duradouras.",
        water: "🌍💧 Terra + Água: Excelente compatibilidade! A água nutre a terra, criando uma relação de cuidado mútuo.",
      },
      air: {
        fire: "💨🔥 Ar + Fogo: Combinação dinâmica! O ar alimenta a chama do fogo, criando entusiasmo e estimulando a comunicação.",
        air: "💨💨 Ar + Ar: Relação intelectual e comunicativa. Ambos apreciam liberdade e novas ideias.",
        earth: "💨🌍 Ar + Terra: Diferenças significativas! A terra busca estabilidade enquanto o ar busca liberdade. A comunicação é essencial.",
        water: "💨💧 Ar + Água: Desafio emocional! O ar é lógico e a água é emocional. Esforço consciente para entender é necessário.",
      },
      water: {
        fire: "💧🔥 Água + Fogo: Tensão natural entre paixão e emoção. Requer compreensão das diferenças emocionais.",
        earth: "💧🌍 Água + Terra: Excelente compatibilidade! A água nutre a terra, criando uma relação de cuidado mútuo.",
        air: "💧💨 Água + Ar: Desafio emocional! O ar é lógico e a água é emocional. Esforço consciente para entender é necessário.",
        water: "💧💧 Água + Água: Relação profundamente emocional e intuitiva. Forte conexão, mas cuidado com fusão excessiva.",
      },
    },
    es: {
      fire: {
        fire: "🔥🔥 Fuego + Fuego: ¡Conexión intensa y apasionada! Ambos son enérgicos y animados, creando una relación vibrante.",
        air: "🔥💨 Fuego + Aire: ¡Combinación dinámica! El aire alimenta la llama del fuego, creando entusiasmo y estimulando la comunicación.",
        earth: "🔥🌍 Fuego + Tierra: ¡Desafío interesante! El fuego puede quemar la tierra, pero con respeto mutuo, se puede lograr equilibrio.",
        water: "🔥💧 Fuego + Agua: Tensión natural entre pasión y emoción. Requiere comprensión de las diferencias emocionales.",
      },
      earth: {
        fire: "🌍🔥 Tierra + Fuego: ¡Desafío interesante! El fuego puede quemar la tierra, pero con respeto mutuo, se puede lograr equilibrio.",
        air: "🌍💨 Tierra + Aire: ¡Diferencias significativas! La tierra busca estabilidad mientras el aire busca libertad. La comunicación es clave.",
        earth: "🌍🌍 Tierra + Tierra: Relación extremadamente estable y segura. Ambos valoran los compromisos y las construcciones duraderas.",
        water: "🌍💧 Tierra + Agua: ¡Excelente compatibilidad! El agua nutre la tierra, creando una relación de cuidado mutuo.",
      },
      air: {
        fire: "💨🔥 Aire + Fuego: ¡Combinación dinámica! El aire alimenta la llama del fuego, creando entusiasmo y estimulando la comunicación.",
        air: "💨💨 Aire + Aire: Relación intelectual y comunicativa. Ambos aprecian la libertad y las nuevas ideas.",
        earth: "💨🌍 Aire + Tierra: ¡Diferencias significativas! La tierra busca estabilidad mientras el aire busca libertad. La comunicación es clave.",
        water: "💨💧 Aire + Agua: ¡Desafío emocional! El aire es lógico y el agua es emocional. Se requiere esfuerzo consciente para entender.",
      },
      water: {
        fire: "💧🔥 Agua + Fuego: Tensión natural entre pasión y emoción. Requiere comprensión de las diferencias emocionales.",
        earth: "💧🌍 Agua + Tierra: ¡Excelente compatibilidad! El agua nutre la tierra, creando una relación de cuidado mutuo.",
        air: "💧💨 Agua + Aire: ¡Desafío emocional! El aire es lógico y el agua es emocional. Se requiere esfuerzo consciente para entender.",
        water: "💧💧 Agua + Agua: Relación profundamente emocional e intuitiva. Fuerte conexión, pero cuidado con la fusión excesiva.",
      },
    },
    hi: {
      fire: {
        fire: "🔥🔥 अग्नि + अग्नि: गहन और जुनूनी संबंध! दोनों ऊर्जावान और उत्साही हैं, एक जीवंत संबंध बनाते हैं।",
        air: "🔥💨 अग्नि + वायु: गतिशील संयोजन! वायु अग्नि की लपट को खिलाती है, उत्साह और संवाद को प्रोत्साहित करती है।",
        earth: "🔥🌍 अग्नि + पृथ्वी: दिलचस्प चुनौती! अग्नि पृथ्वी को जला सकती है, लेकिन पारस्परिक सम्मान से संतुलन बनाया जा सकता है।",
        water: "🔥💧 अग्नि + जल: जुनून और भावना के बीच प्राकृतिक तनाव। भावनात्मक भेदों को समझने की आवश्यकता है।",
      },
      earth: {
        fire: "🌍🔥 पृथ्वी + अग्नि: दिलचस्प चुनौती! अग्नि पृथ्वी को जला सकती है, लेकिन पारस्परिक सम्मान से संतुलन बनाया जा सकता है।",
        air: "🌍💨 पृथ्वी + वायु: महत्वपूर्ण अंतर! पृथ्वी स्थिरता चाहती है जबकि वायु स्वतंत्रता चाहती है। संवाद महत्वपूर्ण है।",
        earth: "🌍🌍 पृथ्वी + पृथ्वी: अत्यंत स्थिर और सुरक्षित संबंध। दोनों प्रतिबद्धताओं और स्थायी उपलब्धियों को महत्व देते हैं।",
        water: "🌍💧 पृथ्वी + जल: उत्कृष्ट अनुकूलता! जल पृथ्वी को पोषित करता है, पारस्परिक देखभाल का संबंध बनाता है।",
      },
      air: {
        fire: "💨🔥 वायु + अग्नि: गतिशील संयोजन! वायु अग्नि की लपट को खिलाती है, उत्साह और संवाद को प्रोत्साहित करती है।",
        air: "💨💨 वायु + वायु: बौद्धिक और संवादात्मक संबंध। दोनों स्वतंत्रता और नए विचारों की सराहना करते हैं।",
        earth: "💨🌍 वायु + पृथ्वी: महत्वपूर्ण अंतर! पृथ्वी स्थिरता चाहती है जबकि वायु स्वतंत्रता चाहती है। संवाद महत्वपूर्ण है।",
        water: "💨💧 वायु + जल: भावनात्मक चुनौती! वायु तार्किक है और जल भावनात्मक है। समझने के लिए सचेत प्रयास की आवश्यकता है।",
      },
      water: {
        fire: "💧🔥 जल + अग्नि: जुनून और भावना के बीच प्राकृतिक तनाव। भावनात्मक भेदों को समझने की आवश्यकता है।",
        earth: "💧🌍 जल + पृथ्वी: उत्कृष्ट अनुकूलता! जल पृथ्वी को पोषित करता है, पारस्परिक देखभाल का संबंध बनाता है।",
        air: "💧💨 जल + वायु: भावनात्मक चुनौती! वायु तार्किक है और जल भावनात्मक है। समझने के लिए सचेत प्रयास की आवश्यकता है।",
        water: "💧💧 जल + जल: गहरा भावनात्मक और सहज संबंध। मजबूत जुड़ाव लेकिन अत्यधिक विलय से सावधान।",
      },
    },
  };

  const langTexts = texts[loc] || texts.en;
  return langTexts[elementA.toLowerCase()]?.[elementB.toLowerCase()] || 
    getTranslation('elementalGeneric', loc);
}

// Helper function for relationship analysis text
function getRelationshipAnalysisText(lang: string): string {
  const loc = resolvePdfLang(lang);
  const texts: Record<string, string> = {
    en: "The complete analysis considers the interaction between the signs, ruling planets, and elements of both partners.",
    pt: "A análise completa considera a interação entre os signos, planetas regentes e elementos de ambos os parceiros.",
    es: "El análisis completo considera la interacción entre los signos, planetas regentes y elementos de ambos socios.",
    hi: "पूर्ण विश्लेषण दोनों साथियों की राशियों, शासक ग्रहों और तत्वों के बीच की अंतःक्रिया पर विचार करता है।",
  };
  return texts[loc] || texts.en;
}

// Helper function for translations
function getTranslation(key: string, lang: string): string {
  const loc = resolvePdfLang(lang);
  const translations: Record<string, Record<string, string>> = {
    en: {
      openCommunication: "Open communication",
      mutualRespect: "Mutual respect",
      growthTogether: "Growth together",
      companionship: "Companionship",
      patienceDifferences: "Patience with differences",
      assertiveCommunication: "Assertive communication",
      individualSpace: "Individual space",
      elementalGeneric: "Compatibility depends on many factors beyond elements. Mutual respect is always essential.",
    },
    pt: {
      openCommunication: "Comunicação aberta",
      mutualRespect: "Respeito mútuo",
      growthTogether: "Crescimento conjunto",
      companionship: "Companheirismo",
      patienceDifferences: "Paciência com diferenças",
      assertiveCommunication: "Comunicação assertiva",
      individualSpace: "Espaço individual",
      elementalGeneric: "A compatibilidade depende de muitos fatores além dos elementos. O respeito mútuo é sempre fundamental.",
    },
    es: {
      openCommunication: "Comunicación abierta",
      mutualRespect: "Respeto mutuo",
      growthTogether: "Crecimiento juntos",
      companionship: "Compañerismo",
      patienceDifferences: "Paciencia con las diferencias",
      assertiveCommunication: "Comunicación asertiva",
      individualSpace: "Espacio individual",
      elementalGeneric: "La compatibilidad depende de muchos factores además de los elementos. El respeto mutuo es siempre fundamental.",
    },
    hi: {
      openCommunication: "खुला संवाद",
      mutualRespect: "पारस्परिक सम्मान",
      growthTogether: "साथ मिलकर विकास",
      companionship: "साथित्व",
      patienceDifferences: "भेदों के प्रति धैर्य",
      assertiveCommunication: "दृढ़ संवाद",
      individualSpace: "व्यक्तिगत स्थान",
      elementalGeneric: "अनुकूलता तत्वों से परे कई कारकों पर निर्भर करती है। पारस्परिक सम्मान हमेशा आवश्यक है।",
    },
  };
  return translations[loc]?.[key] || translations.en[key] || key;
}

// Helper function for moon emoji
function getMoonEmoji(phase: string): string {
  if (phase.includes('Cheia') || phase.includes('Full') || phase.includes('Llena') || phase.includes('पूर्णिमा')) return '🌕';
  if (phase.includes('Nova') || phase.includes('New') || phase.includes('Nueva') || phase.includes('अमावस्या')) return '🌑';
  if (phase.includes('Crescente') || phase.includes('Crescent') || phase.includes('Creciente')) return '🌓';
  if (phase.includes('Minguante') || phase.includes('Waning') || phase.includes('Menguante')) return '🌗';
  return '🌙';
}

// Extended styles for rich content
const RICH_CONTENT_STYLES = `
  .content-section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .section-icon {
    font-size: 24px;
  }

  .section-title-rich {
    font-size: 18px;
    color: #8a4fff;
    margin: 0;
    font-weight: 600;
  }

  .profile-card {
    background: linear-gradient(135deg, #f8f5ff 0%, #fff 100%);
    border: 1px solid #e8e8ff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .profile-name {
    font-size: 24px;
    color: #8a4fff;
    margin: 0 0 5px 0;
    font-weight: 700;
  }

  .profile-details {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .profile-tag {
    background: rgba(138, 79, 255, 0.1);
    color: #8a4fff;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }

  .profile-description {
    font-size: 14px;
    color: #444;
    line-height: 1.8;
    margin-top: 15px;
    text-align: justify;
  }

  .strengths-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 15px;
  }

  .strength-item, .challenge-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: #444;
  }

  .strength-item::before {
    content: "✨";
    font-size: 14px;
  }

  .challenge-item::before {
    content: "💡";
    font-size: 14px;
  }

  .analysis-card {
    background: #fff;
    border-radius: 12px;
    padding: 18px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #8a4fff;
  }

  .analysis-card.love { border-left-color: #e91e63; }
  .analysis-card.career { border-left-color: #2196f3; }
  .analysis-card.health { border-left-color: #4caf50; }
  .analysis-card.finance { border-left-color: #ff9800; }

  .analysis-title {
    font-size: 15px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .analysis-summary {
    font-size: 13px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .analysis-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .highlight-tag {
    background: rgba(138, 79, 255, 0.08);
    color: #6b3dd9;
    padding: 3px 10px;
    border-radius: 15px;
    font-size: 11px;
  }

  .analysis-caution {
    font-size: 12px;
    color: #e65100;
    padding: 8px 12px;
    background:fff3e0;
    border-radius: 8px;
    margin-top: 8px;
  }

  .analysis-tip {
    font-size: 12px;
    color: #2e7d32;
    padding: 8px 12px;
    background: #e8f5e9;
    border-radius: 8px;
    margin-top: 8px;
  }

  .lucky-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    background: linear-gradient(135deg, #fff9ff 0%, #f8f5ff 100%);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e8e8ff;
  }

  .lucky-item {
    text-align: center;
  }

  .lucky-label {
    font-size: 11px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }

  .lucky-values {
    font-size: 14px;
    color: #8a4fff;
    font-weight: 500;
  }

  .moon-card {
    background: linear-gradient(135deg, #f5f5ff 0%, #e8e8ff 100%);
    border-radius: 12px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
  }

  .moon-icon {
    font-size: 36px;
  }

  .moon-info h4 {
    margin: 0;
    font-size: 14px;
    color: #8a4fff;
  }

  .moon-info p {
    margin: 5px 0 0 0;
    font-size: 12px;
    color: #555;
  }

  .transit-list {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
  }

  .transit-item {
    font-size: 12px;
    color: #555;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .transit-item:last-child {
    border-bottom: none;
  }

  .transit-icon {
    font-size: 14px;
  }

  .compatibility-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 15px;
  }

  .compat-section {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
  }

  .compat-title {
    font-size: 13px;
    color: #888;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .compat-signs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .compat-sign {
    background: rgba(138, 79, 255, 0.1);
    color: #6b3dd9;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }

  .compat-sign.challenging {
    background: rgba(255, 152, 0, 0.1);
    color: #e65100;
  }

  .advice-card {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-radius: 12px;
    padding: 20px;
    margin-top: 15px;
  }

  .advice-title {
    font-size: 14px;
    color: #2e7d32;
    margin: 0 0 12px 0;
    font-weight: 600;
  }

  .advice-item {
    font-size: 12px;
    color: #555;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .advice-icon {
    font-size: 14px;
  }

  .affirmation {
    font-style: italic;
    color: #388e3c;
    margin-top: 12px;
    font-size: 13px;
  }

  .planet-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .planet-item {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    border: 1px solid #f0f0f0;
    page-break-inside: avoid;
  }

  .planet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .planet-name {
    font-size: 13px;
    font-weight: 600;
    color: #333;
  }

  .planet-strength {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 10px;
  }

  .planet-strength.strong {
    background: #c8e6c9;
    color: #2e7d32;
  }

  .planet-strength.weak {
    background: #ffcdd2;
    color: #c62828;
  }

  .planet-strength.neutral {
    background: #e0e0e0;
    color: #616161;
  }

  .planet-sign {
    font-size: 11px;
    color: #8a4fff;
    margin-bottom: 4px;
  }

  .planet-interpretation {
    font-size: 11px;
    color: #666;
    line-height: 1.5;
  }
`;

export function createNatalReportHTML(
  data: any,
  serviceName: string,
  lang = "en"
): string {
  const loc = resolvePdfLang(lang);
  const t = TRANSLATIONS[loc] || TRANSLATIONS.en;
  const { input, planets, houses } = data;
  const verificationId = crypto.randomUUID().slice(0, 8).toUpperCase();
  const qrSvg = generateQRCodeSVG(`https://astryxion.com/verify/${verificationId}`, 80);

  const housesArray = houses?.cusps 
    ? (houses.cusps as number[]).map((c, i) => ({ number: i + 1, sign: "", longitude: c }))
    : undefined;

  const planetData = planets.map((p: any) => ({
    name: p.name,
    sign: p.sign,
    longitude: p.longitude,
    house: p.house,
    retrograde: p.retrograde,
  }));

  const content = generatePDFContent(planetData, housesArray ?? null, loc);
  const chartSvg = generateNatalChartSVG(planets, housesArray, 360);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>
  ${SHARED_STYLES}
  ${RICH_CONTENT_STYLES}
  
  .page-number {
    position: absolute;
    bottom: 20mm;
    right: 20mm;
    font-size: 10px;
    color: #888;
  }
  
  .chart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding: 20px;
    background: radial-gradient(circle at center, rgba(138, 79, 255, 0.03) 0%, transparent 70%);
    border-radius: 50%;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #8a4fff, transparent);
    margin: 40px 0;
    opacity: 0.3;
  }
</style>
</head>
<body>
  <!-- PAGE 1: COVER & PROFILE -->
  <div class="pdf-page">
    <div class="header">
      <h1 class="title">${t.pro}</h1>
      <p class="subtitle">${t.natal_subtitle}</p>
    </div>

    <div class="details-grid">
      <div class="details-item"><span class="details-label">${t.name}:</span> ${input.fullName || t.default_consultant_name}</div>
      <div class="details-item"><span class="details-label">${t.date}:</span> ${input.date}</div>
      <div class="details-item"><span class="details-label">${t.time}:</span> ${input.time || "12:00:00"}</div>
      <div class="details-item"><span class="details-label">${t.coords}:</span> ${input.latitude?.toFixed(4)}, ${input.longitude?.toFixed(4)}</div>
    </div>

    <div class="content-section">
      <div class="profile-card">
        <h2 class="profile-name serif">${content.signProfile.name}</h2>
        <div class="profile-details">
          <span class="profile-tag">${content.signProfile.element}</span>
          <span class="profile-tag">${content.signProfile.modality}</span>
          <span class="profile-tag">${t.ruler || 'Ruler'}: ${content.signProfile.ruler}</span>
        </div>
        <p class="profile-description serif" style="font-size: 15px; font-style: italic;">${content.signProfile.description}</p>
        
        <div class="strengths-grid">
          <div>
            <strong style="font-size: 12px; color: #8a4fff; text-transform: uppercase; letter-spacing: 1px;">${t.strengthsLabel || 'Strengths'}</strong>
            ${content.signProfile.strengths.map(s => `<div class="strength-item">${s}</div>`).join('')}
          </div>
          <div>
            <strong style="font-size: 12px; color: #e65100; text-transform: uppercase; letter-spacing: 1px;">${t.challengesLabel || 'Challenges'}</strong>
            ${content.signProfile.challenges.map(c => `<div class="challenge-item">${c}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- COSMIC COUNSEL SECTOR -->
    <div class="cosmic-counsel">
      <h3 class="serif">${t.cosmicCounsel}</h3>
      <p>${content.signProfile.cosmicCounsel}</p>
    </div>

    <div class="page-number">${expandNatalPageIndicator(t, 1, 4)}</div>
  </div>

  <!-- PAGE 2: CELESTIAL ALIGNMENT -->
  <div class="pdf-page">
    <h2 class="section-title serif">${t.chart_map}</h2>
    
    <div class="chart-wrapper">
      ${chartSvg}
    </div>

    <div class="content-section">
      <div class="moon-card">
        <div class="moon-icon">${getMoonEmoji(content.moonPhase.phase)}</div>
        <div class="moon-info">
          <h4 class="serif" style="font-size: 16px;">${t.moon}: ${content.moonPhase.phase}</h4>
          <p>${content.moonPhase.influence}</p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title serif">${t.natal_element_balance}</h2>
      <div class="lucky-grid">
        <div class="lucky-item">
          <div class="lucky-label">${t.favoriteColors || 'Colors'}</div>
          <div class="lucky-values">${content.luckyData.colors.join(', ')}</div>
        </div>
        <div class="lucky-item">
          <div class="lucky-label">${t.stones || 'Stones'}</div>
          <div class="lucky-values">${content.luckyData.stones.join(', ')}</div>
        </div>
        <div class="lucky-item">
          <div class="lucky-label">${t.luckyNumbers || 'Numbers'}</div>
          <div class="lucky-values">${content.luckyData.numbers.join(', ')}</div>
        </div>
        <div class="lucky-item">
          <div class="lucky-label">${t.favorableHours || 'Favorable Hours'}</div>
          <div class="lucky-values">${content.luckyData.favorableHours.join(', ')}</div>
        </div>
      </div>
    </div>

    <div class="page-number">${expandNatalPageIndicator(t, 2, 4)}</div>
  </div>

  <!-- PAGE 3: LIFE PATH ANALYSIS -->
  <div class="pdf-page">
    <h2 class="section-title serif">${t.natal_life_spheres}</h2>

    <div class="content-section">
      <div class="analysis-card love">
        <h3 class="analysis-title serif" style="font-size: 18px;">💝 ${content.loveAnalysis.title}</h3>
        <p class="analysis-summary">${content.loveAnalysis.summary}</p>
        <div class="analysis-tip">💡 <strong>${t.tip}:</strong> ${content.loveAnalysis.tip}</div>
      </div>
    </div>

    <div class="content-section">
      <div class="analysis-card career">
        <h3 class="analysis-title serif" style="font-size: 18px;">💼 ${content.careerAnalysis.title}</h3>
        <p class="analysis-summary">${content.careerAnalysis.summary}</p>
        <div class="analysis-tip">💡 <strong>${t.tip}:</strong> ${content.careerAnalysis.tip}</div>
      </div>
    </div>

    <div class="content-section">
      <div class="analysis-card health">
        <h3 class="analysis-title serif" style="font-size: 18px;">🏥 ${content.healthAnalysis.title}</h3>
        <p class="analysis-summary">${content.healthAnalysis.summary}</p>
        <div class="analysis-tip">💡 <strong>${t.tip}:</strong> ${content.healthAnalysis.tip}</div>
      </div>
    </div>

    <div class="content-section" style="margin-bottom: 0;">
      <div class="advice-card">
        <h3 class="advice-title serif" style="font-size: 16px;">🎯 ${t.advice}</h3>
        <div class="advice-item">
          <span class="advice-icon">✅</span>
          <span><strong>${t.action || 'Action'}:</strong> ${content.dailyAdvice.action}</span>
        </div>
        <p class="affirmation serif" style="font-size: 15px; margin-top: 15px;">"${content.dailyAdvice.affirmation}"</p>
      </div>
    </div>

    <div class="page-number">${expandNatalPageIndicator(t, 3, 4)}</div>
  </div>

  <!-- PAGE 4: PLANETARY POSITIONS -->
  <div class="pdf-page">
    <h2 class="section-title serif">${t.planetaryPositions || 'Planetary Positions'}</h2>
    <p style="font-size: 12px; color: #666; margin-bottom: 20px;">${t.planetaryPositionsIntro}</p>
    
    <div class="planet-grid">
      ${content.planetAnalyses.map(p => `
        <div class="planet-item">
          <div class="planet-header">
            <span class="planet-name serif">${p.planet}</span>
            <span class="planet-strength ${p.strength}">${t[p.strength]}</span>
          </div>
          <div class="planet-sign" style="font-weight: 600;">${p.sign}${p.house ? ` • ${t.house} ${p.house}` : ''}</div>
          <div class="planet-interpretation" style="font-size: 11px; line-height: 1.4;">${p.interpretation}</div>
        </div>
      `).join('')}
    </div>

    <div class="qr-section" style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
      ${qrSvg}
      <div class="qr-info">
        <h4 class="serif">${t.verify}</h4>
        <p style="font-size: 10px;">${t.authenticityGuaranteed}<br>${t.verify_id} ${verificationId}</p>
      </div>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} ${serviceName}. ${t.disclaimer}
    </div>
    <div class="page-number">${expandNatalPageIndicator(t, 4, 4)}</div>
  </div>
</body>
</html>`;
}
