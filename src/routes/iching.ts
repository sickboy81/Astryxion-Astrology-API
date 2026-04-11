import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";
import { ICHING_DECK } from "../data/iching.js";

const IChingConsultSchema = z.object({
  question: z.string().optional(),
});

function tossCoins() {
  const c1 = Math.random() > 0.5 ? 3 : 2;
  const c2 = Math.random() > 0.5 ? 3 : 2;
  const c3 = Math.random() > 0.5 ? 3 : 2;
  return c1 + c2 + c3;
}

export async function registerIChingRoutes(app: FastifyInstance) {
  app.post("/api/v1/iching/consult", {
    schema: {
      tags: ["Esotericism"],
      summary: "I Ching Consultation",
      description: "Simulates drawing 3 coins to generate a Hexagram and its Changing Lines.",
      body: zodToJsonSchema(IChingConsultSchema, { target: "openApi3" }),
    }
  }, async (req, reply) => {
    try {
      const parsed = IChingConsultSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos", parsed.error.flatten()));
      }
      const lines: number[] = [];
      for (let i = 0; i < 6; i++) {
        lines.push(tossCoins());
      }

      // Base Hexagram (Primary)
      // 6 -> 0, 7 -> 1, 8 -> 0, 9 -> 1
      const primaryBinary = lines.map(v => (v === 7 || v === 9 ? "1" : "0")).join('');
      
      // Future Hexagram (After changes)
      // 6 changes from Yin to Yang (0 -> 1)
      // 9 changes from Yang to Yin (1 -> 0)
      // 7 and 8 remain the same
      const futureBinary = lines.map(v => {
        if (v === 6) return "1";
        if (v === 9) return "0";
        return (v === 7 ? "1" : "0");
      }).join('');

      const primaryHex = ICHING_DECK.find(h => h.binary === primaryBinary);
      const futureHex = ICHING_DECK.find(h => h.binary === futureBinary);
      
      const changingLines = lines
        .map((v, i) => (v === 6 || v === 9 ? i + 1 : null))
        .filter(v => v !== null);

      return {
        generatedAtUtc: nowUtcIso(),
        question: parsed.data.question || "Nenhuma pergunta fornecida",
        results: {
          primary: primaryHex,
          future: primaryBinary !== futureBinary ? futureHex : null,
          changingLines: changingLines,
          linesDrawn: lines
        },
        metadata: {
          method: "3_coins_traditional",
          note: "Linhas são contadas de baixo para cima (1 a 6)."
        }
      };
    } catch (e: any) {
      req.log.error({ err: e }, "iching consultation error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao consultar o I Ching: " + e.message));
    }
  });
}
