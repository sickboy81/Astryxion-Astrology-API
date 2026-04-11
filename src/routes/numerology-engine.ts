import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";

// ─── Schema ──────────────────────────────────────────────────────────────────

const NumerologyEngineSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  comparisonName: z.string().optional().describe("Second name for compatibility analysis."),
  targetYear: z.number().int().min(2000).max(2099).optional().describe("Year to calculate the Personal Year number."),
});

// ─── Letter Maps ─────────────────────────────────────────────────────────────

const PYTHAGOREAN: Record<string, number> = {
  a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9,
  j:1, k:2, l:3, m:4, n:5, o:6, p:7, q:8, r:9,
  s:1, t:2, u:3, v:4, w:5, x:6, y:7, z:8
};

// Chaldean: A=1…H=5, I=1, J=1, K=2, L=3, M=4, N=5, O=7, P=8, Q=1,
// R=2, S=3, T=4, U=6, V=6, W=6, X=6, Y=1, Z=7  (no 9)
const CHALDEAN: Record<string, number> = {
  a:1, b:2, c:3, d:4, e:5, f:8, g:3, h:5,
  i:1, j:1, k:2, l:3, m:4, n:5, o:7, p:8,
  q:1, r:2, s:3, t:4, u:6, v:6, w:6, x:6,
  y:1, z:7
};

// Vedic (Sankhya Shastra): same letter progression as Pythagorean but 
// interpreted via planetary rulerships (1=Sun, 2=Moon, 3=Jupiter, 4=Rahu,
// 5=Mercury, 6=Venus, 7=Ketu, 8=Saturn, 9=Mars)
const VEDIC_PLANET: Record<number, string> = {
  1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu",
  5: "Mercury", 6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars"
};

// Kabbalah (Hebrew mapping adaptation)
const KABBALAH: Record<string, number> = {
  a:1, b:2, c:3, d:4, e:5, f:8, g:3, h:5,
  i:1, j:1, k:2, l:3, m:4, n:5, o:7, p:8,
  q:1, r:2, s:3, t:4, u:6, v:6, w:6, x:6,
  y:1, z:7,
  // accents
  á:1, à:1, â:1, ã:1, é:5, è:5, ê:5,
  í:1, ì:1, î:1, ó:7, ò:7, ô:7, õ:7,
  ú:6, ù:6, û:6, ç:3, ñ:5
};

const VOWELS = new Set(['a','e','i','o','u','y','á','à','â','ã','é','è','ê','í','ì','î','ó','ò','ô','õ','ú','ù','û']);

// ─── Meanings & Advice ────────────────────────────────────────────────────────

const NUMEROLOGY_MEANINGS: Record<number, string> = {
  1: "Independence, leadership, innovation, pioneering spirit.",
  2: "Cooperation, diplomacy, sensitivity, partnership.",
  3: "Self-expression, creativity, communication, joy.",
  4: "Stability, pragmatism, hard work, foundation.",
  5: "Freedom, change, adaptability, adventure.",
  6: "Responsibility, love for home, care, healing.",
  7: "Analysis, spirituality, wisdom, introspection.",
  8: "Power, material success, authority, karmic balance.",
  9: "Humanitarianism, conclusion, altruism, compassion.",
  11: "Supreme intuition, enlightenment, idealism (Master Number).",
  22: "The Master Builder, large-scale manifestation (Master Number).",
  33: "The Master Teacher, universal compassion (Master Number)."
};

const VEDIC_ADVICE: Record<number, string> = {
  1: "Sun: Leads with clarity and authority. Focus on building self-confidence.",
  2: "Moon: Governs emotions and intuition. Cultivate peace and emotional stability.",
  3: "Jupiter: Expands wisdom and wealth. Focus on learning and teaching others.",
  4: "Rahu: Brings innovation and sudden events. Focus on discipline and groundedness.",
  5: "Mercury: Powers communication and commerce. Use your wit for success.",
  6: "Venus: Attracts beauty and harmony. Focus on love and artistic endeavors.",
  7: "Ketu: Guides spiritual liberation. Focus on meditation and detachment.",
  8: "Saturn: Teaches through hardship and karma. Focus on persistence and ethics.",
  9: "Mars: Commands energy and aggression. Channel your power into constructive actions."
};

const CHALDEAN_COMPOUNDS: Record<number, string> = {
  10: "Wheel of Fortune: Symbolizes honor, faith, and self-confidence.",
  11: "Lion Muzzled: Warns against hidden dangers or betrayals by others.",
  12: "The Sacrifice: Indicates suffering for education or ideals.",
  13: "Change/Regeneration: Not unlucky; indicates transition and power shift.",
  14: "The Scout: Success in communication and dealing with the public.",
  15: "Magic & Mystery: Indicates charm, eloquence, and occult power.",
  16: "The Shattered Citadel: Warns of unexpected collapses; spiritual lesson.",
  17: "The Star of the Magi: Symbolizes peace, love, and victory over trials.",
  18: "Spiritual vs Material: Indicates internal conflict or danger from nature.",
  19: "The Prince of Heaven: Victory, happiness, and personal success.",
  20: "The Awakening: Renewal, judgment, and a higher calling.",
  21: "The Crown of the Magi: Success in worldly affairs and recognition.",
  22: "The Blind Man: Warns of illusions and mistakes; move with caution.",
  23: "The Royal Star of the Lion: Promises success and protection.",
  24: "The Shepherd: Great success through high-placed friends.",
  25: "Discernment: Success through observing and previous experiences.",
  26: "The Partner: Success through partnerships, but watch for delays.",
  27: "The Scepter: Promise of authority, power, and command.",
  28: "The Trusted Friend: Success through cooperation and reliability.",
  29: "The Grace Under Pressure: Success after overcoming severe tests.",
  30: "The Loner: Success through solitude and independent effort.",
  31: "The Idealist: Focus on high principles; success through isolation.",
  32: "The Communication: Success through exchange of ideas and travel.",
  37: "The Royal Star of the Crown: Indicates fame and protection."
};


// ─── Reduction Helpers ────────────────────────────────────────────────────────

function reduce(num: number, masters: number[] = [11,22,33]): number {
  if (masters.includes(num)) return num;
  let s = num;
  while (s > 9 && !masters.includes(s)) {
    s = String(s).split('').reduce((a, c) => a + +c, 0);
  }
  return s;
}

// Chaldean compound: keeps the 2-digit compound before reducing
function reduceChaldean(num: number): { compound: number; final: number } {
  const compound = num; // keep raw before reduction
  const final = reduce(num, [11, 22]);
  return { compound, final };
}

// ─── Pythagorean Calculations ─────────────────────────────────────────────────

function pythagoreanEngine(name: string, dob: string, targetYear?: number) {
  const clean = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
  let expr = 0, soul = 0, personality = 0;
  for (const c of clean) {
    const v = PYTHAGOREAN[c] ?? 0;
    expr += v;
    if (VOWELS.has(c)) soul += v; else personality += v;
  }
  const [y, m, d] = dob.split('-').map(Number);
  const lifePath = reduce(reduce(y) + reduce(m) + reduce(d));
  const destinyDigits = dob.replace(/\D/g,'').split('').reduce((a,c) => a + +c, 0);
  const destinyVal = reduce(destinyDigits);
  const currentYear = targetYear ?? new Date().getFullYear();
  const personalYear = reduce(reduce(m) + reduce(d) + reduce(currentYear));

  const getEntry = (v: number) => ({ value: v, meaning: NUMEROLOGY_MEANINGS[v] || "Balance and Evolution." });

  return {
    lifePath: getEntry(lifePath),
    expression: getEntry(reduce(expr)),
    soulUrge: getEntry(reduce(soul)),
    personality: getEntry(reduce(personality)),
    destiny: getEntry(destinyVal),
    personalYear: getEntry(personalYear)
  };
}

// ─── Chaldean Calculations ────────────────────────────────────────────────────

function chaldeanEngine(name: string, dob: string) {
  const clean = name.toLowerCase().replace(/[^a-zà-úçñ]/g, '');
  let exprSum = 0, soulSum = 0, perSum = 0;
  const seq: number[] = [];
  for (const c of clean) {
    const v = CHALDEAN[c] ?? 0;
    if (!v) continue;
    seq.push(v);
    exprSum += v;
    if (VOWELS.has(c)) soulSum += v; else perSum += v;
  }
  const compoundName = exprSum;
  const { final: nameNumber } = reduceChaldean(compoundName);
  const [y,m,d] = dob.split('-').map(Number);
  // Chaldean Psychic = DD reduced
  const psychicNumber = reduce(d, [11,22]);
  // Destiny = full date sum
  const destSum = dob.replace(/\D/g,'').split('').reduce((a,c) => a + +c, 0);
  const { compound: destCompound, final: destinyNumber } = reduceChaldean(destSum);
  // Name correction hint: optimal name vibration should end in 1,5,6,3 for business or 2,6,9 for personal
  const correctionHint = [1,3,5,6].includes(nameNumber) ? "Name vibration is favorable." : `Current name reduces to ${nameNumber}. Consider variations that shift towards 1, 5, or 6.`;
  
  const getCEntry = (v: number, comp: number) => ({ 
    value: v, 
    compound: comp, 
    compoundMeaning: CHALDEAN_COMPOUNDS[comp] || "Focus on personal evolution.",
    finalMeaning: NUMEROLOGY_MEANINGS[v] || "Vibrational balance."
  });

  return {
    psychicNumber: getCEntry(psychicNumber, d > 9 ? d : psychicNumber),
    destinyNumber: getCEntry(destinyNumber, destCompound),
    nameNumber: getCEntry(nameNumber, compoundName),
    correctionHint
  };
}

// ─── Vedic (Sankhya Shastra) Calculations ────────────────────────────────────

function vedicEngine(name: string, dob: string) {
  // Psychic = Birth day reduced
  const day = parseInt(dob.split('-')[2]);
  const psychic = reduce(day, []);
  const psychicPlanet = VEDIC_PLANET[psychic] ?? "Unknown";
  // Destiny = full date
  const destSum = dob.replace(/\D/g,'').split('').reduce((a, c) => a + +c, 0);
  const destiny = reduce(destSum, []);
  const destinyPlanet = VEDIC_PLANET[destiny] ?? "Unknown";
  // Name number (using Chaldean base as Vedic traditionally shares it)
  const clean = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
  let nameSum = 0;
  for (const c of clean) nameSum += CHALDEAN[c] ?? 0;
  const nameNumber = reduce(nameSum, []);
  const namePlanet = VEDIC_PLANET[nameNumber] ?? "Unknown";
  const harmonyScore = (psychic === destiny || psychic === nameNumber || destiny === nameNumber) ? "Harmonious" : "Neutral — some adjustment may be beneficial";
  
  return { 
    psychicNumber: { value: psychic, planet: psychicPlanet, advice: VEDIC_ADVICE[psychic] },
    destinyNumber: { value: destiny, planet: destinyPlanet, advice: VEDIC_ADVICE[destiny] },
    nameNumber: { value: nameNumber, planet: namePlanet, advice: VEDIC_ADVICE[nameNumber] },
    harmonyScore 
  };
}

// ─── Kabbalah Calculations ────────────────────────────────────────────────────

function generateInvertedTriangle(digits: number[]): number[][] {
  let pyramid: number[][] = [digits];
  let current = digits;
  while (current.length > 1) {
    const next: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      const s = current[i] + current[i+1];
      next.push(s > 9 ? String(s).split('').reduce((a, c) => a + +c, 0) : s);
    }
    pyramid.push(next);
    current = next;
  }
  return pyramid;
}

function kabbalahEngine(name: string, dob: string) {
  const originalChars = name.toLowerCase().replace(/[^a-zà-úçñ]/g, '');
  let exprSum = 0, motivSum = 0, imprSum = 0;
  const seq: number[] = [];
  for (const c of originalChars) {
    const v = KABBALAH[c] ?? 0;
    if (!v) continue;
    seq.push(v);
    exprSum += v;
    if (VOWELS.has(c)) motivSum += v; else imprSum += v;
  }
  const birthSum = dob.replace(/\D/g,'').split('').reduce((a, c) => a + +c, 0);
  const destiny = reduce(birthSum, [11,22]);
  const triangle = generateInvertedTriangle(seq);
  
  const getKEntry = (v: number) => ({ value: v, label: NUMEROLOGY_MEANINGS[v] || "Spiritual Flow." });

  return {
    motivation: getKEntry(reduce(motivSum,[11,22])),
    impression: getKEntry(reduce(imprSum,[11,22])),
    expression: getKEntry(reduce(exprSum,[11,22])),
    destinyNumber: getKEntry(destiny),
    invertedTriangle: triangle
  };
}

// ─── Lo Shu Grid ──────────────────────────────────────────────────────────────

function loShuGrid(dob: string) {
  // Extract digits appearing in date
  const digits = dob.replace(/\D/g,'').split('').map(Number);
  const presence: Record<number, number> = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
  for (const d of digits) { if (d > 0) presence[d] = (presence[d] || 0) + 1; }
  const missing = Object.keys(presence).map(Number).filter(k => presence[k] === 0);
  // Lo Shu grid positions: top row [4,9,2], middle [3,5,7], bottom [8,1,6]
  const count = (n: number) => presence[n] ?? 0;
  const grid = [
    [count(4), count(9), count(2)],
    [count(3), count(5), count(7)],
    [count(8), count(1), count(6)]
  ];
  const planes = {
    mental: count(1)+count(2)+count(3),
    physical: count(4)+count(5)+count(6),
    emotional: count(7)+count(8)+count(9),
  };
  return { grid, presence, missing, planes };
}

// ─── Compatibility ────────────────────────────────────────────────────────────

function compatibilityScore(name1: string, name2: string): { score: number; rating: string } {
  const clean = (n: string) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
  const sum1 = clean(name1).split('').reduce((a,c) => a + (PYTHAGOREAN[c]??0), 0);
  const sum2 = clean(name2).split('').reduce((a,c) => a + (PYTHAGOREAN[c]??0), 0);
  const n1 = reduce(sum1), n2 = reduce(sum2);
  const diff = Math.abs(n1 - n2);
  const score = Math.max(0, 100 - diff * 10);
  const rating = score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Moderate" : "Challenging";
  return { score, rating };
}

// ─── Route Registration ───────────────────────────────────────────────────────

export async function registerNumerologyEngineRoutes(app: FastifyInstance) {
  app.post("/api/v1/numerology/complete", {
    schema: {
      tags: ["Esotericism"],
      summary: "Universal Numerology Engine",
      description: "Four Numerology Traditions. One Integration. Calculates Life Path, Expression, Soul Urge, Destiny, Personal Year, Lo Shu Grid, Name Correction, and Compatibility Numbers across Pythagorean, Chaldean, Vedic, and Kabbalah systems.",
      body: zodToJsonSchema(NumerologyEngineSchema, { target: "openApi3" }),
    }
  }, async (req, reply) => {
    const parsed = NumerologyEngineSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send(errorBody("VALIDATION_ERROR", "Invalid parameters.", parsed.error.flatten()));
    }
    const { fullName, dateOfBirth, comparisonName, targetYear } = parsed.data;
    try {
      const pythagorean = pythagoreanEngine(fullName, dateOfBirth, targetYear);
      const chaldean = chaldeanEngine(fullName, dateOfBirth);
      const vedic = vedicEngine(fullName, dateOfBirth);
      const kabbalah = kabbalahEngine(fullName, dateOfBirth);
      const loShu = loShuGrid(dateOfBirth);
      const compatibility = comparisonName ? compatibilityScore(fullName, comparisonName) : null;

      return {
        generatedAtUtc: nowUtcIso(),
        input: { fullName, dateOfBirth, comparisonName: comparisonName ?? null, targetYear: targetYear ?? new Date().getFullYear() },
        pythagorean,
        chaldean,
        vedic,
        kabbalah,
        loShuGrid: loShu,
        compatibility
      };
    } catch (e: any) {
      req.log.error({ err: e }, "numerology engine error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Error computing numerology."));
    }
  });
}
