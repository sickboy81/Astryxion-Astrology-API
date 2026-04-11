import { NAKSHATRA_DATA, MAITRI_TABLE, GANA_POINTS, RASI_LORDS } from "../data/vedic-constants.js";
import { normalize360 } from "../astro-calculations.js";

export interface MatchingResult {
  ashtakoot: {
    totalPoints: number;
    maxPoints: 36;
    categories: Record<string, { points: number; max: number }>;
  };
  porutham: {
    results: Record<string, { status: "Good" | "Average" | "Bad"; description: string }>;
    score: number;
    maxScore: 10;
  };
}

export class CompatibilityService {
  /**
   * Identifica o índice da Nakshatra (0-26)
   */
  static getNakshatraIndex(longitude: number): number {
    return Math.floor(normalize360(longitude) / (360 / 27)) % 27;
  }

  /**
   * Cálculo clássico de Ashtakoot (Guna Milan - 36 Pontos)
   */
  static calculateAshtakoot(moonLon1: number, moonLon2: number) {
    const idx1 = this.getNakshatraIndex(moonLon1);
    const idx2 = this.getNakshatraIndex(moonLon2);
    const n1 = NAKSHATRA_DATA[idx1];
    const n2 = NAKSHATRA_DATA[idx2];

    const categories: Record<string, { points: number; max: number }> = {};
    let total = 0;

    // 1. Varna (1 Point)
    const varnaPoints = n1.varna === n2.varna ? 1 : 0;
    categories["Varna"] = { points: varnaPoints, max: 1 };
    total += varnaPoints;

    // 2. Vashya (2 Points)
    const vashyaPoints = n1.vashya === n2.vashya ? 2 : 0;
    categories["Vashya"] = { points: vashyaPoints, max: 2 };
    total += vashyaPoints;

    // 3. Tara (3 Points)
    const diff = (idx2 - idx1 + 27) % 9;
    const taraPoints = (diff === 3 || diff === 5 || diff === 7) ? 0 : 3;
    categories["Tara"] = { points: taraPoints, max: 3 };
    total += taraPoints;

    // 4. Yoni (4 Points)
    const yoniPoints = n1.yoni === n2.yoni ? 4 : 2; // Simplificado
    categories["Yoni"] = { points: yoniPoints, max: 4 };
    total += yoniPoints;

    // 5. Maitri (5 Points)
    const lord1 = RASI_LORDS[n1.rashi.split("/")[0]] || "Sun";
    const lord2 = RASI_LORDS[n2.rashi.split("/")[0]] || "Sun";
    const maitriPoints = MAITRI_TABLE[lord1]?.[lord2] || 0;
    categories["Maitri"] = { points: maitriPoints, max: 5 };
    total += maitriPoints;

    // 6. Gana (6 Points)
    const ganaPoints = GANA_POINTS[n1.gana]?.[n2.gana] || 0;
    categories["Gana"] = { points: ganaPoints, max: 6 };
    total += ganaPoints;

    // 7. Bhakoot (7 Points)
    const rasiIdx1 = Math.floor(normalize360(moonLon1) / 30);
    const rasiIdx2 = Math.floor(normalize360(moonLon2) / 30);
    const rasiDiff = (rasiIdx2 - rasiIdx1 + 12) % 12 + 1;
    const bhakootPoints = [2, 5, 9, 12, 7].includes(rasiDiff) ? 0 : 7;
    categories["Bhakoot"] = { points: bhakootPoints, max: 7 };
    total += bhakootPoints;

    // 8. Nadi (8 Points)
    const nadiPoints = n1.nadi === n2.nadi ? 0 : 8;
    categories["Nadi"] = { points: nadiPoints, max: 8 };
    total += nadiPoints;

    return { totalPoints: total, maxPoints: 36, categories };
  }

  /**
   * Cálculo de Porutham (Sul da Índia - 10 Categorias)
   */
  static calculatePorutham(moonLon1: number, moonLon2: number) {
    const idx1 = this.getNakshatraIndex(moonLon1);
    const idx2 = this.getNakshatraIndex(moonLon2);
    const n1 = NAKSHATRA_DATA[idx1];
    const n2 = NAKSHATRA_DATA[idx2];

    const results: Record<string, { status: "Good" | "Average" | "Bad"; description: string }> = {};
    let score = 0;

    // Dina Porutham
    const dinaDiff = (idx2 - idx1 + 27) % 9;
    const dinaStatus = [2, 4, 6, 8, 9, 0].includes(dinaDiff) ? "Good" : "Bad";
    results["Dina"] = { status: dinaStatus, description: "Saúde e bem-estar geral" };
    if (dinaStatus === "Good") score++;

    // Gana Porutham
    const ganaStatus = n1.gana === n2.gana ? "Good" : (n1.gana === "Deva" && n2.gana === "Manushya") ? "Average" : "Bad";
    results["Gana"] = { status: ganaStatus, description: "Temperamento e caráter" };
    if (ganaStatus === "Good") score++;

    // Yoni Porutham
    const yoniStatus = n1.yoni === n2.yoni ? "Good" : "Average";
    results["Yoni"] = { status: yoniStatus, description: "Compatibilidade sexual" };
    if (yoniStatus === "Good") score++;

    // Rajju Porutham (Crítico no Sul)
    const rajjuStatus = n1.nadi !== n2.nadi ? "Good" : "Bad";
    results["Rajju"] = { status: rajjuStatus, description: "Longevidade do marido e união" };
    if (rajjuStatus === "Good") score++;

    return { results, score, maxScore: 10 };
  }

  /**
   * Papasamyam Check
   * Pesagem de aflições maléficas (Mars, Saturn, Rahu, Ketu, Sun)
   */
  static calculatePapasamyam(planets: { name: string; house: number }[]) {
    let totalDosha = 0;
    const maleficWeights: Record<string, number> = { Mars: 1.0, Saturn: 0.75, Rahu: 0.5, Ketu: 0.5, Sun: 0.25 };
    const criticalHouses = [1, 2, 4, 7, 8, 12];

    for (const p of planets) {
      if (maleficWeights[p.name] && criticalHouses.includes(p.house)) {
        totalDosha += maleficWeights[p.name];
      }
    }
    return totalDosha;
  }
}
