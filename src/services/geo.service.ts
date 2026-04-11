import cities from "all-the-cities";
import tzlookup from "tz-lookup";
import { DateTime } from "luxon";

export interface LocalGeoResult {
  location_name: string;
  longitude: number;
  latitude: number;
  timezone: string;
  country: string;
  administrative_zone_1: string; // State/Province/AdminCode
}

export interface LocalTimezoneResult {
  timezone: string;
  offset_minutes: number;
  offset_hours: number;
  offset_str: string;
  is_dst: boolean;
}

export class GeoService {
  /**
   * Busca cidades por nome ou parte do nome usando a base de dados expandida (~138k cidades).
   * Prioriza resultados por população.
   */
  static searchCity(query: string): LocalGeoResult[] {
    if (!query || query.length < 2) return [];

    // Drop accents (e.g. "São Paulo" -> "Sao Paulo") before searching
    const normalizedQuery = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Filter and sort by population
    const results = (cities as any[])
      .filter((city) => {
        const cityName = city.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return cityName.includes(normalizedQuery);
      })
      .sort((a, b) => b.population - a.population)
      .slice(0, 25);

    // Map to our interface and resolve timezone
    return results.map((city) => {
      const lat = city.loc.coordinates[1];
      const lng = city.loc.coordinates[0];
      
      // tz-lookup returns the IANA timezone string
      const timezone = tzlookup(lat, lng);

      return {
        location_name: city.name,
        longitude: lng,
        latitude: lat,
        timezone: timezone,
        country: city.country,
        administrative_zone_1: city.adminCode || "",
      };
    });
  }

  /**
   * Calcula o offset (com DST) para um fuso horário e data/hora específicos.
   * Totalmente local usando o banco de dados IANA do sistema (via luxon).
   */
  static getTimezoneDetails(params: {
    timezone: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  }): LocalTimezoneResult {
    const { timezone, year, month, day, hour, minute } = params;

    // Criar um objeto DateTime no timezone alvo
    const dt = DateTime.fromObject(
      { year, month, day, hour, minute },
      { zone: timezone }
    );

    if (!dt.isValid) {
      throw new Error(`Invalid Date or Timezone: ${dt.invalidReason}`);
    }

    return {
      timezone: dt.zoneName!,
      offset_minutes: dt.offset,
      offset_hours: dt.offset / 60,
      offset_str: dt.toFormat("ZZ"),
      is_dst: dt.isInDST,
    };
  }
}
