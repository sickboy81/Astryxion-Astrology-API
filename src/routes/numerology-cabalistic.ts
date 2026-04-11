import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";

const CabalisticParamsSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

// Cabalistic Table (Hebrew/Aramaic adaptation widely used in Brazil)
const cabalisticMap: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1, j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2, s: 3, t: 4, u: 6, v: 6, w: 6, x: 6, y: 1, z: 7,
  // Accents usually map to same base
  á: 1, à: 1, â: 1, ã: 1, é: 5, è: 5, ê: 5, í: 1, ì: 1, î: 1, ó: 7, ò: 7, ô: 7, õ: 7, ú: 6, ù: 6, û: 6, ç: 3, ñ: 5
};

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'á', 'à', 'â', 'ã', 'é', 'è', 'ê', 'í', 'ì', 'î', 'ó', 'ò', 'ô', 'õ', 'ú', 'ù', 'û'];

function reduceCabalistic(num: number): number {
  if (num === 11 || num === 22) return num; // Master numbers usually kept
  let sum = num;
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  }
  return sum;
}

function calculateCabalisticNumbers(name: string) {
  const cleanName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, '');
  const originalChars = name.toLowerCase().replace(/[^a-zà-úçñ]/g, '');
  
  let expressionSum = 0;
  let motivationSum = 0;
  let impressionSum = 0;
  let digitSequence: number[] = [];

  for (const char of originalChars) {
    const val = cabalisticMap[char] || 0;
    if (val === 0) continue;
    
    digitSequence.push(val);
    expressionSum += val;
    if (VOWELS.includes(char)) {
      motivationSum += val;
    } else {
      impressionSum += val;
    }
  }

  return {
    motivation: reduceCabalistic(motivationSum),
    impression: reduceCabalistic(impressionSum),
    expression: reduceCabalistic(expressionSum),
    digitSequence
  };
}

// Generate the "Inverted Triangle"
function generateTriangle(digits: number[]) {
  let pyramid: number[][] = [digits];
  let current = digits;

  while (current.length > 1) {
    let next: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
        let sum = current[i] + current[i + 1];
        next.push(sum > 9 ? sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0) : sum);
    }
    pyramid.push(next);
    current = next;
  }
  return pyramid;
}

export async function registerCabalisticRoutes(app: FastifyInstance) {
  app.post("/api/v1/numerology/cabalistic", {
    schema: {
      hide: true,
      tags: ["Esotericism"],
      summary: "Cabalistic Numerology",
      description: "Calculates Motivation, Impression, Expression, and the Inverted Pyramid map.",
      body: zodToJsonSchema(CabalisticParamsSchema),
    }
  }, async (req, reply) => {
    const parsed = CabalisticParamsSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos", parsed.error.flatten()));
    }

    const { fullName, dateOfBirth } = parsed.data;

    try {
      const results = calculateCabalisticNumbers(fullName);
      const triangle = generateTriangle(results.digitSequence);
      
      const birthSum = dateOfBirth.replace(/-/g, '').split('').reduce((a, b) => a + parseInt(b), 0);
      const destiny = reduceCabalistic(birthSum);

      return {
        generatedAtUtc: nowUtcIso(),
        numbers: {
          motivation: { value: results.motivation, label: "Motivação (Desejo da Alma)" },
          impression: { value: results.impression, label: "Impressão (Aparência)" },
          expression: { value: results.expression, label: "Expressão (Comportamento)" },
          destiny: { value: destiny, label: "Destino (Caminho)" }
        },
        triangle: triangle,
        note: "O triângulo invertido mostra a evolução vibracional do nome."
      };
    } catch (e: any) {
      req.log.error({ err: e }, "cabalistic error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao calcular numerologia cabalística."));
    }
  });
}
