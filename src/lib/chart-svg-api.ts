import { getSignDegree, getSignDegreeMinutes, getSignForLongitude } from "../astro-calculations.js";
import {
  generateNatalChartSVG,
  getChartSvgPalette,
  type ChartSvgTheme,
  type NatalChartSvgOptions,
} from "./pdf-engine.js";

export type { ChartSvgTheme, NatalChartSvgOptions };

/** Bodies drawn on the public wheel SVG (avoids crowding from many asteroids). */
const DEFAULT_WHEEL_NAMES = new Set([
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "Chiron",
  "Lilith",
  "North Node",
  "South Node",
]);

export type NatalCalculationLike = {
  planets: Array<{ name: string; sign: string; longitude: number; house?: number; retrograde?: boolean }>;
  houses: { cusps: number[] };
  angles: { lunarNode: number | null; southNode: number | null };
};

export function buildHousesArrayFromCusps(cusps: number[]) {
  return cusps.map((c, i) => ({
    number: i + 1,
    sign: "",
    longitude: c,
  }));
}

export function buildPlanetsForWheel(data: NatalCalculationLike, includeAllBodies: boolean) {
  let list = includeAllBodies
    ? data.planets.map((p) => ({
        name: p.name,
        sign: p.sign,
        longitude: p.longitude,
        house: p.house,
      }))
    : data.planets
        .filter((p) => DEFAULT_WHEEL_NAMES.has(p.name))
        .map((p) => ({
          name: p.name,
          sign: p.sign,
          longitude: p.longitude,
          house: p.house,
        }));

  const hasNode = list.some((p) => p.name === "North Node");
  if (!hasNode && data.angles.lunarNode !== null && data.angles.lunarNode !== undefined) {
    const lon = data.angles.lunarNode;
    list = [
      ...list,
      {
        name: "North Node",
        sign: getSignForLongitude(lon),
        longitude: lon,
        house: undefined,
      },
    ];
  }
  const hasSouth = list.some((p) => p.name === "South Node");
  if (!hasSouth && data.angles.southNode !== null && data.angles.southNode !== undefined) {
    const lon = data.angles.southNode;
    list.push({
      name: "South Node",
      sign: getSignForLongitude(lon),
      longitude: lon,
      house: undefined,
    });
  }

  return list;
}

export function renderNatalWheelSvg(
  data: NatalCalculationLike,
  options: { size?: number; svgOptions?: NatalChartSvgOptions; includeAllBodies?: boolean }
): string {
  const cusps = data.houses?.cusps;
  const housesArray = Array.isArray(cusps) && cusps.length >= 12 ? buildHousesArrayFromCusps(cusps as number[]) : undefined;
  const planets = buildPlanetsForWheel(data, Boolean(options.includeAllBodies));
  const size = options.size ?? 400;
  return generateNatalChartSVG(planets, housesArray, size, options.svgOptions);
}

export type GridSvgOptions = {
  width?: number;
  rowHeight?: number;
  theme?: ChartSvgTheme;
  transparentBackground?: boolean;
  title?: string;
};

/** Tabular SVG of planet longitudes (complements the wheel). */
export function generateNatalPositionsGridSvg(
  planets: Array<{ name: string; sign: string; longitude: number; house?: number; retrograde?: boolean }>,
  options?: GridSvgOptions
): string {
  const w = options?.width ?? 420;
  const rowH = options?.rowHeight ?? 22;
  const transparent = Boolean(options?.transparentBackground);
  const pal = getChartSvgPalette(options?.theme);
  const headerH = 28;
  const pad = 12;
  const rows = planets.length;
  const h = pad * 2 + headerH + rows * rowH + 8;
  const title = options?.title ?? "Posições";

  const col = { body: pad + 8, sign: 140, deg: 240, house: 320, rx: 380 };
  const bg = transparent ? "none" : pal.bg;
  const text = pal.planetGlyph;
  const muted = pal.zodiacGlyph;

  let svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${w}" height="${h}" fill="${bg}" stroke="${pal.outerStroke}" stroke-width="1"/>`;
  svg += `<text x="${pad}" y="${pad + 18}" font-size="14" font-weight="600" fill="${text}">${escapeSvgText(title)}</text>`;

  const y0 = pad + headerH;
  svg += `<line x1="${pad}" y1="${y0 - 6}" x2="${w - pad}" y2="${y0 - 6}" stroke="${pal.houseLine}" stroke-width="1"/>`;
  const hf = 11;
  svg += `<text x="${col.body}" y="${y0}" font-size="${hf}" font-weight="600" fill="${muted}">Corpo</text>`;
  svg += `<text x="${col.sign}" y="${y0}" font-size="${hf}" font-weight="600" fill="${muted}">Signo</text>`;
  svg += `<text x="${col.deg}" y="${y0}" font-size="${hf}" font-weight="600" fill="${muted}">Grau</text>`;
  svg += `<text x="${col.house}" y="${y0}" font-size="${hf}" font-weight="600" fill="${muted}">Casa</text>`;
  svg += `<text x="${col.rx}" y="${y0}" font-size="${hf}" font-weight="600" fill="${muted}">Rx</text>`;

  planets.forEach((p, i) => {
    const y = y0 + 14 + i * rowH;
    const deg = `${Math.floor(getSignDegree(p.longitude))}° ${String(getSignDegreeMinutes(p.longitude)).padStart(2, "0")}'`;
    const rx = p.retrograde ? "R" : "";
    const house = p.house != null ? String(p.house) : "—";
    svg += `<text x="${col.body}" y="${y}" font-size="12" fill="${text}">${escapeSvgText(p.name)}</text>`;
    svg += `<text x="${col.sign}" y="${y}" font-size="12" fill="${text}">${escapeSvgText(p.sign)}</text>`;
    svg += `<text x="${col.deg}" y="${y}" font-size="12" fill="${text}">${escapeSvgText(deg)}</text>`;
    svg += `<text x="${col.house}" y="${y}" font-size="12" fill="${text}">${house}</text>`;
    svg += `<text x="${col.rx}" y="${y}" font-size="12" fill="${text}">${rx}</text>`;
  });

  svg += "</svg>";
  return svg;
}

function escapeSvgText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function renderNatalWheelAndGrid(data: NatalCalculationLike, options: {
  size?: number;
  gridWidth?: number;
  svgOptions?: NatalChartSvgOptions;
  includeAllBodies?: boolean;
  gridTitle?: string;
}): { wheel: string; grid: string } {
  const planets = buildPlanetsForWheel(data, Boolean(options.includeAllBodies));
  const cusps = data.houses?.cusps;
  const housesArray = Array.isArray(cusps) && cusps.length >= 12 ? buildHousesArrayFromCusps(cusps as number[]) : undefined;
  const size = options.size ?? 400;
  const wheel = generateNatalChartSVG(planets, housesArray, size, options.svgOptions);
  const grid = generateNatalPositionsGridSvg(
    planets.map((p) => ({
      name: p.name,
      sign: p.sign,
      longitude: p.longitude,
      house: p.house,
      retrograde: data.planets.find((x) => x.name === p.name)?.retrograde,
    })),
    {
      width: options.gridWidth ?? 420,
      theme: options.svgOptions?.theme,
      transparentBackground: options.svgOptions?.transparentBackground,
      title: options.gridTitle ?? "Posições (tropical)",
    }
  );
  return { wheel, grid };
}
