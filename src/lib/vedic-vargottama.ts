import type { PlanetData } from "./astro/types.js";
import { calculateVargaAnalysis } from "../vedic-astrology.js";

const SKIP_VARGOTTAMA = new Set([
  "Rahu",
  "Ketu",
  "North Node",
  "South Node",
  "Nodo Norte",
  "Nodo Sul",
  "Nódo Norte",
  "Nódo Sul",
]);

/**
 * Vargottama (same sign in D1 and D9) using this engine’s divisional chart model
 * (`calculateDivisionalChart`: longitude scaled by division). Matches the D9 signs
 * already exposed in `vargaAnalysis.charts`.
 */
export function computeVargottamaAnalysis(planets: PlanetData[], ascendantLongitude: number) {
  const { charts } = calculateVargaAnalysis(planets, ascendantLongitude);
  const d1 = charts.find((c) => c.division === 1);
  const d9 = charts.find((c) => c.division === 9);
  if (!d1 || !d9) {
    return {
      planets: [] as Array<{
        planet: string;
        rashiSign: string;
        navamsaSign: string;
        vargottama: boolean;
      }>,
      vargottamaPlanets: [] as string[],
      methodology:
        "D1 vs D9 sign equality using internal divisional scaling (see varga-analysis). Not a substitute for hand-verified Parashari navamsa pada rules.",
    };
  }

  const rows: Array<{
    planet: string;
    rashiSign: string;
    navamsaSign: string;
    vargottama: boolean;
  }> = [];

  for (const p of planets) {
    if (SKIP_VARGOTTAMA.has(p.name)) continue;
    const p1 = d1.planets.find((x) => x.name === p.name);
    const p9 = d9.planets.find((x) => x.name === p.name);
    if (!p1 || !p9) continue;
    rows.push({
      planet: p.name,
      rashiSign: p1.sign,
      navamsaSign: p9.sign,
      vargottama: p1.sign === p9.sign,
    });
  }

  return {
    planets: rows,
    vargottamaPlanets: rows.filter((r) => r.vargottama).map((r) => r.planet),
    methodology:
      "D1 vs D9 sign equality using internal divisional scaling (same as POST /api/v1/varga-analysis).",
  };
}
