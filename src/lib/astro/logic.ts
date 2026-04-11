import { ZODIAC_SIGNS, PLANETARY_DIGNITIES, PLANET_NAMES_PT } from "./constants.js";
import { normalize360 } from "./math.js";
import type { ZodiacSign, PlanetData, DignityData } from "./types.js";

export function getSignForLongitude(longitude: number): ZodiacSign {
  const normalized = normalize360(longitude);
  const signIndex = Math.floor(normalized / 30);
  return ZODIAC_SIGNS[signIndex % 12];
}

export function getSignDegree(longitude: number): number {
  return normalize360(longitude) % 30;
}

export function getSignDegreeMinutes(longitude: number): number {
  const degrees = getSignDegree(longitude);
  return Math.round((degrees - Math.floor(degrees)) * 60);
}

export function calculateDignities(planets: PlanetData[]): DignityData[] {
  return planets.map(planet => {
    const dignity = PLANETARY_DIGNITIES[PLANET_NAMES_PT[planet.name] || planet.name];
    if (!dignity) {
      return { planet: planet.name, sign: planet.sign, domicile: false, exaltation: false, fall: false, detriment: false };
    }
    return {
      planet: planet.name,
      sign: planet.sign,
      domicile: planet.sign === dignity.domicile,
      exaltation: planet.sign === dignity.exaltation,
      fall: planet.sign === dignity.fall,
      detriment: planet.sign === dignity.detriment,
    };
  });
}
