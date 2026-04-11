import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";
import { RUNES_DECK } from "../data/runes.js";

const RunesDrawSchema = z.object({
  spread: z.enum(["single", "three_norns"]).default("single"),
});

function getRandomRune() {
  const index = Math.floor(Math.random() * RUNES_DECK.length);
  const isMerkstave = Math.random() > 0.7; // Runes are harder to 'invert' than cards, usually 30% chance in many systems
  const rune = RUNES_DECK[index];
  
  // Some runes don't have a reversed state (symmetrical symbols)
  const canInvert = !["ᚷ", "ᚺ", "ᛁ", "ᛊ", "ᛇ", "ᛜ", "ᛞ"].includes(rune.symbol);
  const finalInverted = canInvert && isMerkstave;

  return {
    rune: rune,
    isMerkstave: finalInverted,
    meaning: finalInverted ? rune.meaningMerkstave : rune.meaningUpright
  };
}

export async function registerRunesRoutes(app: FastifyInstance) {
  app.post("/api/v1/runes/draw", {
    schema: {
      tags: ["Esotericism"],
      summary: "Runes Draw",
      description: "Draws runes from the Elder Futhark deck.",
      body: zodToJsonSchema(RunesDrawSchema, { target: "openApi3" }),
    }
  }, async (req, reply) => {
    try {
      const parsed = RunesDrawSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos", parsed.error.flatten()));
      }

      const { spread } = parsed.data;
      let resultRunes: any[] = [];

      if (spread === "single") {
        const draw = getRandomRune();
        resultRunes.push({ position: "Conselho Único", ...draw });
      } else if (spread === "three_norns") {
        const drawnIndices = new Set();
        const positions = ["Urðr (Passado)", "Verðandi (Presente)", "Skuld (Futuro)"];
        
        while (resultRunes.length < 3) {
          const index = Math.floor(Math.random() * RUNES_DECK.length);
          if (!drawnIndices.has(index)) {
            drawnIndices.add(index);
            const draw = getRandomRune(); // Logic handles inversion
            // Overwrite card if it was the random one
            draw.rune = RUNES_DECK[index]; 
            
            resultRunes.push({
              position: positions[resultRunes.length],
              ...draw
            });
          }
        }
      }

      return {
        generatedAtUtc: nowUtcIso(),
        spreadType: spread,
        runes: resultRunes
      };
    } catch (e: any) {
      req.log.error({ err: e }, "runes draw error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao sortear runas: " + e.message));
    }
  });
}
