import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GeoService } from "../services/geo.service.js";
import { GeoSearchSchema, TimezoneDstSchema } from "../lib/schemas.js";
import { errorBody } from "../lib/utils.js";

export async function registerGeoRoutes(app: FastifyInstance) {
  /**
   * GET: Busca cidades por query string (use by dashboard).
   */
  app.get("/api/v1/geo/search", async (req, reply) => {
    const query = (req.query as any).q;
    if (!query || typeof query !== "string") {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Query parameter 'q' is required."));
    }
    try {
      const results = GeoService.searchCity(query);
      return results;
    } catch (e: any) {
      req.log.error(e);
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao buscar dados geográficos locais."));
    }
  });

  /**
   * Busca cidades por nome no banco de dados local.
   * Não requer conexão com internet.
   */
  app.post("/api/v1/geo/search", {
    schema: {
      tags: ["Location"],
      summary: "Search location to get coordinates and timezone (Offline)",
      body: zodToJsonSchema(GeoSearchSchema),
    },
  }, async (req, reply) => {
    const parsed = GeoSearchSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    }

    try {
      const results = GeoService.searchCity(parsed.data.location);
      return { results };
    } catch (e: any) {
      req.log.error(e);
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao buscar dados geográficos locais."));
    }
  });

  /**
   * Calcula o offset exato do fuso horário e DST para uma data e hora específicas.
   * Totalmente local usando o banco de dados IANA.
   */
  app.post("/api/v1/geo/timezone", {
    schema: {
      tags: ["Location"],
      summary: "Get timezone offset and DST for a specific date (Offline)",
      body: zodToJsonSchema(TimezoneDstSchema),
    },
  }, async (req, reply) => {
    const parsed = TimezoneDstSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Payload inválido.", parsed.error.flatten()));
    }

    try {
      const result = GeoService.getTimezoneDetails(parsed.data);
      return {
        timezone: result.timezone,
        offset_minutes: result.offset_minutes,
        offset_hours: result.offset_hours,
        offset_str: result.offset_str,
        is_dst: result.is_dst,
      };
    } catch (e: any) {
      req.log.error(e);
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular timezone local. " + e.message));
    }
  });
}
