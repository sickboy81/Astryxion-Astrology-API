import { getSignDegree, getSignDegreeMinutes } from "../astro-calculations.js";

type NatalChartResult = {
  input: {
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
    houseSystem: string;
  };
  jdEt: number;
  angles: {
    ascendant: number;
    midheaven: number;
    lunarNode: number | null;
    southNode: number | null;
    partOfFortune: number;
  };
  houses: { cusps: number[] };
  planets: Array<{
    name: string;
    longitude: number;
    sign: string;
    house: number;
    retrograde: boolean;
    speedLongitude?: number;
    degree?: number;
    minutes?: number;
  }>;
  aspects: Array<{
    a: string;
    b: string;
    type: string;
    orb: number;
    separation: number;
  }>;
  aspectPatterns?: Array<{ patternKey?: string; description?: string; planets?: string[] }>;
  lunarPhase?: { phase?: string; illumination?: number };
  isDayChart?: boolean;
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function degInSign(longitude: number) {
  const deg = Math.floor(getSignDegree(longitude));
  const min = getSignDegreeMinutes(longitude);
  return `${deg}°${min}'`;
}

/**
 * Compact XML context for LLM prompts (HTTP complement to MCP tools).
 */
export function buildNatalLlmContextXml(data: NatalChartResult, opts?: { maxAspects?: number }): string {
  const maxA = opts?.maxAspects ?? 40;
  const { input, jdEt, angles, houses, planets, aspects, aspectPatterns, lunarPhase, isDayChart } = data;

  const aspectsSorted = [...aspects].sort((x, y) => x.orb - y.orb).slice(0, maxA);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<natal_context schema="astryxion-natal-v1" tropical="true">\n`;
  xml += `  <input date="${escapeXml(input.date)}" timeUtc="${escapeXml(input.timeUtc)}" latitude="${input.latitude}" longitude="${input.longitude}" houseSystem="${escapeXml(input.houseSystem)}"/>\n`;
  xml += `  <ephemeris jdEt="${jdEt}"`;
  if (isDayChart !== undefined) xml += ` isDayChart="${isDayChart}"`;
  xml += `/>\n`;

  xml += `  <angles ascendantLongitude="${angles.ascendant}" midheavenLongitude="${angles.midheaven}"`;
  if (angles.lunarNode != null) xml += ` lunarNodeLongitude="${angles.lunarNode}"`;
  if (angles.southNode != null) xml += ` southNodeLongitude="${angles.southNode}"`;
  xml += ` partOfFortuneLongitude="${angles.partOfFortune}"/>\n`;

  if (lunarPhase) {
    xml += `  <lunar_phase name="${escapeXml(lunarPhase.phase ?? "")}" illumination="${lunarPhase.illumination ?? ""}"/>\n`;
  }

  xml += `  <houses>\n`;
  houses.cusps.slice(0, 12).forEach((c, i) => {
    xml += `    <cusp n="${i + 1}" longitude="${c}"/>\n`;
  });
  xml += `  </houses>\n`;

  xml += `  <planets>\n`;
  for (const p of planets) {
    const deg =
      p.degree != null && p.minutes != null ? `${p.degree}°${p.minutes}'` : degInSign(p.longitude);
    xml += `    <planet name="${escapeXml(p.name)}" sign="${escapeXml(String(p.sign))}" house="${p.house}" longitude="${p.longitude}" degree_in_sign="${escapeXml(deg)}" retrograde="${p.retrograde}"`;
    if (p.speedLongitude != null) xml += ` speedLongitude="${p.speedLongitude}"`;
    xml += `/>\n`;
  }
  xml += `  </planets>\n`;

  xml += `  <aspects>\n`;
  for (const a of aspectsSorted) {
    xml += `    <aspect from="${escapeXml(a.a)}" to="${escapeXml(a.b)}" type="${escapeXml(a.type)}" separation="${a.separation}" orb="${a.orb}"/>\n`;
  }
  xml += `  </aspects>\n`;

  if (aspectPatterns?.length) {
    xml += `  <aspect_patterns>\n`;
    for (const pat of aspectPatterns.slice(0, 12)) {
      const names = (pat.planets ?? []).map(escapeXml).join(",");
      xml += `    <pattern key="${escapeXml(pat.patternKey ?? "")}" planets="${names}">${escapeXml(pat.description ?? "")}</pattern>\n`;
    }
    xml += `  </aspect_patterns>\n`;
  }

  xml += `  <note>Western tropical natal summary for LLM use. Not medical or legal advice.</note>\n`;
  xml += `</natal_context>\n`;
  return xml;
}

export type { NatalChartResult };
