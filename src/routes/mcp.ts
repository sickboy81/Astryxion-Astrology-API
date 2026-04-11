import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { errorBody } from "../lib/utils.js";
import { getResolvedInternalSecret } from "../lib/env-validation.js";

/**
 * MCP (Model Context Protocol) Handler
 * This allows AI agents to discover and use our API tools.
 */

const TOOLS = [
  {
    name: "get_natal_chart",
    description: "Calcula posições astrológicas ocidentais (mapa natal). Requer data, hora e coordenadas. Use para análises de personalidade e astrologia ocidental.",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "string", description: "Data (YYYY-MM-DD)" },
        timeUtc: { type: "string", description: "Hora UTC (HH:mm:ss)" },
        latitude: { type: "number" },
        longitude: { type: "number" }
      },
      required: ["date", "timeUtc", "latitude", "longitude"]
    }
  },
  {
    name: "get_vedic_horoscope",
    description: "Fornece previsões védicas baseadas em Nakshatras para Saúde, Carreira e Geral. Ideal para conselhos astrológicos práticos.",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "string", description: "Data (YYYY-MM-DD)" },
        timeUtc: { type: "string", description: "Hora UTC (HH:mm:ss)" },
        nakshatra: { type: "string", description: "Nome do Nakshatra (Ex: Ashwini, Bharani...)" }
      },
      required: ["date", "timeUtc", "nakshatra"]
    }
  },
  {
    name: "check_compatibility",
    description: "Avalia a sinastria/compatibilidade entre duas pessoas para avaliar harmonia em relacionamentos.",
    inputSchema: {
      type: "object",
      properties: {
        person1: {
          type: "object",
          properties: {
            fullName: { type: "string" },
            date: { type: "string" },
            timeUtc: { type: "string" }
          },
          required: ["date", "timeUtc"]
        },
        person2: {
          type: "object",
          properties: {
            fullName: { type: "string" },
            date: { type: "string" },
            timeUtc: { type: "string" }
          },
          required: ["date", "timeUtc"]
        }
      },
      required: ["person1", "person2"]
    }
  },
  {
    name: "draw_tarot",
    description: "Tira cartas de tarot (1 ou 3 cartas) para leitura de conselhos ou situações.",
    inputSchema: {
      type: "object",
      properties: {
        spread: { type: "string", enum: ["single", "3_card", "9_card", "celtic_cross"], default: "single" }
      },
      required: ["spread"]
    }
  },
  {
    name: "get_iching",
    description: "Sorteia um hexagrama do I-Ching para obter sabedoria oracular sobre uma questão.",
    inputSchema: {
      type: "object",
      properties: {
        question: { type: "string", description: "A pergunta para o oráculo" }
      }
    }
  }
];

export async function registerMCPRoutes(app: FastifyInstance) {
  // Discovery
  app.get("/api/mcp/list_tools", {
    schema: { hide: true }
  }, async () => {
    return { tools: TOOLS };
  });

  // Call
  app.post("/api/mcp/call_tool", {
    schema: { hide: true }
  }, async (req, reply) => {
    const { name, arguments: args } = req.body as any;
    const internalSecret = getResolvedInternalSecret();
    if (!internalSecret) {
      return reply.code(503).send({ error: "SERVICE_UNAVAILABLE", message: "INTERNAL_SECRET is not configured." });
    }

    try {
      let result;
      switch (name) {
        case "get_natal_chart":
          result = await app.inject({ 
            method: "POST", url: "/api/v1/natal-chart", 
            payload: args, headers: { "x-internal-secret": internalSecret }
          }).then(r => r.json());
          break;
        case "get_vedic_horoscope":
          result = await app.inject({ 
            method: "POST", url: "/api/v1/vedic/horoscope", 
            payload: args, headers: { "x-internal-secret": internalSecret }
          }).then(r => r.json());
          break;
        case "check_compatibility":
          result = await app.inject({ 
            method: "POST", url: "/api/v1/matchmaking/check", 
            payload: args, headers: { "x-internal-secret": internalSecret }
          }).then(r => r.json());
          break;
        case "draw_tarot":
          result = await app.inject({ 
            method: "POST", url: "/api/v1/tarot/draw", 
            payload: args, headers: { "x-internal-secret": internalSecret }
          }).then(r => r.json());
          break;
        case "get_iching":
          result = await app.inject({ 
            method: "POST", url: "/api/v1/iching/draw", 
            payload: args, headers: { "x-internal-secret": internalSecret }
          }).then(r => r.json());
          break;
        default:
          return reply.code(404).send({ error: "Tool not found" });
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (e: any) {
      return reply.code(500).send({ error: e.message });
    }
  });
}
