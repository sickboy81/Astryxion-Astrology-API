import { PlanetData } from "../lib/astro/types.js";
import { normalize360 } from "../astro-calculations.js";

export interface DoshaResult {
  hasDosha: boolean;
  intensity: "Low" | "Medium" | "High";
  description: string;
}

export class DoshaService {
  /**
   * Verifica Mangal Dosha (Kuja Dosha)
   * Marte nas casas: 1, 2, 4, 7, 8, 12 do Ascendente, Lua ou Vênus.
   */
  static checkMangalDosha(planets: PlanetData[]): DoshaResult {
    const mars = planets.find(p => p.name === "Mars");
    if (!mars) return { hasDosha: false, intensity: "Low", description: "Marte não encontrado no mapa" };

    const criticalHouses = [1, 2, 4, 7, 8, 12];
    if (criticalHouses.includes(mars.house)) {
      // Simplificado: Intensidade baseada na casa
      const intensity = [7, 8].includes(mars.house) ? "High" : "Medium";
      return {
        hasDosha: true,
        intensity: intensity as any,
        description: `Mangal Dosha detectado devido a Marte na casa ${mars.house}`
      };
    }

    return { hasDosha: false, intensity: "Low", description: "Sem Mangal Dosha" };
  }

  /**
   * Verifica Sade-Sati
   * Trânsito de Saturno nas casas 12, 1 e 2 em relação à Lua natal.
   */
  static checkSadeSati(birthMoonLon: number, currentSaturnLon: number): DoshaResult {
    const diff = normalize360(currentSaturnLon - birthMoonLon);
    
    // 355 to 360 or 0 to 45 degrees (around the moon)
    if (diff >= 315 || diff <= 45) {
      const phase = diff >= 315 ? "Rising (12th House)" : diff <= 15 ? "Peak (1st House)" : "Setting (2nd House)";
      return {
        hasDosha: true,
        intensity: diff <= 15 ? "High" : "Medium",
        description: `Sade-Sati ativo na fase: ${phase}`
      };
    }

    return { hasDosha: false, intensity: "Low", description: "Fora do período de Sade-Sati" };
  }

  /**
   * Verifica Kaalsarp Dosha
   * Todos os planetas entre Rahu e Ketu.
   */
  static checkKaalsarpDosha(planets: PlanetData[], rahuLon: number, ketuLon: number): DoshaResult {
    // Ordenar Rahu e Ketu
    const start = Math.min(rahuLon, ketuLon);
    const end = Math.max(rahuLon, ketuLon);
    
    const planetsBetween = planets.filter(p => {
      if (p.name === "Rahu" || p.name === "Ketu") return false;
      return p.longitude >= start && p.longitude <= end;
    });

    const isKaalsarp = planetsBetween.length === 0 || planetsBetween.length === planets.length - 2;
    
    return {
      hasDosha: isKaalsarp,
      intensity: isKaalsarp ? "High" : "Low",
      description: isKaalsarp ? "Kaalsarp Dosha detectado" : "Sem Kaalsarp Dosha"
    };
  }
}
