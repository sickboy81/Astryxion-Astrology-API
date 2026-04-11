import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";
import { TAROT_DECK, TarotCard } from "../data/tarot.js";

const TarotDrawSchema = z.object({
  spread: z.enum(["single", "3_card", "9_card", "celtic_cross"]).default("single"),
  context: z.enum(["general", "love", "career", "spiritual"]).default("general"),
});

// Definitions for Spreads
const SPREADS: Record<string, string[]> = {
  "single": ["The Answer"],
  "3_card": ["Past", "Present", "Future"],
  "9_card": [
    "Past Foundation", "Present State", "Future Potential",
    "Underlying Influences", "Conscious Thoughts", "Hidden Emotions",
    "Advice", "External Environment", "Ultimate Outcome"
  ],
  "celtic_cross": [
    "The Present", "The Challenge", "The Past", "The Future", 
    "Conscious Mind (Above)", "Subconscious Mind (Below)", 
    "The Self", "The Environment", "Hopes & Fears", "Outcome"
  ]
};



export async function registerTarotRoutes(app: FastifyInstance) {
  app.post("/api/v1/tarot/draw", {
    schema: {
      tags: ["Esotericism"],
      summary: "Tarot Draw",
      description: "Complete Tarot Engine. Supports Virtual card draws, contextual AI interpretations (Love, Career, Spiritual), and advanced spreads like Celtic Cross.",
      body: zodToJsonSchema(TarotDrawSchema, { target: "openApi3" }),
    }
  }, async (req, reply) => {
    try {
      const parsed = TarotDrawSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos", parsed.error.flatten()));
      }

      const { spread, context } = parsed.data;
      const positions = SPREADS[spread];
      
      const drawnIndices = new Set<number>();
      const resultCards: any[] = [];
      
      let elementCounts = { Wands: 0, Cups: 0, Swords: 0, Pentacles: 0, Major: 0 };

      for (let i = 0; i < positions.length; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * TAROT_DECK.length);
        } while (drawnIndices.has(index));
        
        drawnIndices.add(index);
        const card = TAROT_DECK[index];
        const isReversed = Math.random() > 0.5;

        // Elements tracking
        if (card.arcana === "Major") elementCounts.Major++;
        else if (card.suit) elementCounts[card.suit]++;

        resultCards.push({
          positionName: positions[i],
          positionId: i + 1,
          card: {
            id: card.id,
            name: card.name.en, // Or handle i18n
            arcana: card.arcana,
            suit: card.suit || null,
          },
          isReversed,
          meaning: isReversed ? card.meaningReversed : card.meaningUpright
        });
      }

      // Synthesis
      const total = positions.length;
      let dominant = "Balanced";
      if (elementCounts.Major > total * 0.4) dominant = "Major Arcana (Destined / Highly Significant phase)";
      else if (elementCounts.Cups > total * 0.4) dominant = "Cups (Emotions, Relationships, Intuition)";
      else if (elementCounts.Wands > total * 0.4) dominant = "Wands (Action, Passion, Inspiration)";
      else if (elementCounts.Swords > total * 0.4) dominant = "Swords (Intellect, Conflict, Truth)";
      else if (elementCounts.Pentacles > total * 0.4) dominant = "Pentacles (Material world, Finance, Stability)";

      return {
        generatedAtUtc: nowUtcIso(),
        spread: spread,
        context: context,
        cards: resultCards,
        synthesis: {
          elementalPreponderance: elementCounts,
          dominantEnergy: dominant,
          overview: `A ${spread} reading focused on ${context}. The dominant energy leans towards ${dominant}.`
        }
      };
    } catch (e: any) {
      req.log.error({ err: e }, "tarot draw error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao fazer a tiragem de tarot: " + e.message));
    }
  });
}
