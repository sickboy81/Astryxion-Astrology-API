import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";

const NumerologyParamsSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

// Pythagorean Number Values
const pythagoreanMap: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];

function reduceNumber(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num; // Master numbers
  let sum = num;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  }
  return sum;
}

function calculateNameNumbers(name: string) {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let expressionSum = 0;
  let soulSum = 0;
  let personalitySum = 0;

  for (const char of cleanName) {
    const val = pythagoreanMap[char] || 0;
    expressionSum += val;
    if (VOWELS.includes(char)) {
      soulSum += val;
    } else {
      personalitySum += val;
    }
  }

  return {
    expression: reduceNumber(expressionSum),
    soulUrge: reduceNumber(soulSum),
    personality: reduceNumber(personalitySum)
  };
}

function calculateDateNumbers(dateString: string) {
  const digits = dateString.replace(/[^0-9]/g, '');
  let sum = 0;
  for (const char of digits) {
    sum += parseInt(char);
  }
  // Simplified calculation for Life Path and Destiny (frequently the same in some systems, but Life Path separates parts)
  const [year, month, day] = dateString.split('-');
  const lifePath = reduceNumber(reduceNumber(parseInt(year)) + reduceNumber(parseInt(month)) + reduceNumber(parseInt(day)));
  
  return {
    lifePath: lifePath,
    destiny: reduceNumber(sum)
  };
}

const NUMEROLOGY_MEANINGS: Record<number, string> = {
  1: "Independência, liderança, inovação, pioneirismo.",
  2: "Cooperação, diplomacia, sensibilidade, parceria.",
  3: "Autoexpressão, criatividade, comunicação, alegria.",
  4: "Estabilidade, pragmatismo, trabalho duro, fundação.",
  5: "Liberdade, mudança, adaptabilidade, aventura.",
  6: "Responsabilidade, amor ao lar, cuidado, cura.",
  7: "Análise, espiritualidade, sabedoria, introspecção.",
  8: "Poder, sucesso material, autoridade, equilíbrio cármico.",
  9: "Humanitarismo, conclusão, altruísmo, compaixão.",
  11: "Intuição suprema, iluminação, idealismo (Número Mestre).",
  22: "O Construtor Mestre, manifestação em grande escala (Número Mestre).",
  33: "O Professor Mestre, compaixão universal (Número Mestre)."
};

export async function registerNumerologyRoutes(app: FastifyInstance) {
  app.post("/api/v1/numerology", {
    schema: {
      hide: true,
      tags: ["Esotericism"],
      summary: "Complete Numerology Analysis",
      description: "Calculates Life Path, Destiny, Expression, Soul Urge, and Personality numbers using the Pythagorean system.",
      body: zodToJsonSchema(NumerologyParamsSchema),
    }
  }, async (req, reply) => {
    const parsed = NumerologyParamsSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos", parsed.error.flatten()));
    }

    const { fullName, dateOfBirth } = parsed.data;

    try {
      const nameData = calculateNameNumbers(fullName);
      const dateData = calculateDateNumbers(dateOfBirth);

      const result = {
        generatedAtUtc: nowUtcIso(),
        input: { fullName, dateOfBirth },
        numbers: {
          lifePath: {
            value: dateData.lifePath,
            description: "Representa a lição principal que você aprenderá nesta vida.",
            interpretation: NUMEROLOGY_MEANINGS[dateData.lifePath] || "Indeterminado."
          },
          expression: {
            value: nameData.expression,
            description: "Revela seus talentos inatos e potencias ao longo da vida.",
            interpretation: NUMEROLOGY_MEANINGS[nameData.expression] || "Indeterminado."
          },
          soulUrge: {
            value: nameData.soulUrge,
            description: "Sua motivação interior secreta e o que sua alma mais deseja.",
            interpretation: NUMEROLOGY_MEANINGS[nameData.soulUrge] || "Indeterminado."
          },
          personality: {
            value: nameData.personality,
            description: "Como as outras pessoas te percebem ao primeiro encontro.",
            interpretation: NUMEROLOGY_MEANINGS[nameData.personality] || "Indeterminado."
          }
        }
      };

      return result;
    } catch (e: any) {
      req.log.error({ err: e }, "numerology error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular numerologia."));
    }
  });
}
