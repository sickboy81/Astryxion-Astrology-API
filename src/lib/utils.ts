import crypto from "node:crypto";

export function nowUtcIso() {
  return new Date().toISOString();
}

export function errorBody(code: string, message: string, details?: unknown) {
  return { error: { code, message, details: details ?? null } };
}

export function sha256Base64Url(input: string) {
  return crypto.createHash("sha256").update(input).digest("base64url");
}

export function hmacSha256Base64Url(secret: string, input: string) {
  return crypto.createHmac("sha256", secret).update(input).digest("base64url");
}

export function endOfDayUtcSeconds(now = new Date()) {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));
  return Math.max(1, Math.floor((end.getTime() - now.getTime()) / 1000));
}

export function ensureEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function jsonParseSafe<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function seededPick(seed: string, options: string[]) {
  const hash = crypto.createHash("sha256").update(seed).digest();
  const idx = hash.readUInt32BE(0) % options.length;
  return options[idx]!;
}

export function seededPickNumber(seed: string, options: number[]) {
  const hash = crypto.createHash("sha256").update(seed).digest();
  const idx = hash.readUInt32BE(0) % options.length;
  return options[idx]!;
}

export function parseBearer(header: string | null) {
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.substring(7);
}

export function getCompatibleSigns(sign: string): string[] {
  const elements: Record<string, string[]> = {
    fire: ["Áries", "Leão", "Sagitário"],
    earth: ["Touro", "Virgem", "Capricórnio"],
    air: ["Gêmeos", "Libra", "Aquário"],
    water: ["Câncer", "Escorpião", "Peixes"],
  };
  const signToElement: Record<string, string> = {
    aries: "fire", leo: "fire", sagittarius: "fire",
    taurus: "earth", virgo: "earth", capricorn: "earth",
    gemini: "air", libra: "air", aquarius: "air",
    cancer: "water", scorpio: "water", pisces: "water"
  };
  const element = signToElement[sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] || "fire";
  const compatibleElements: Record<string, string[]> = {
    fire: ["fire", "air"],
    air: ["air", "fire"],
    earth: ["earth", "water"],
    water: ["water", "earth"]
  };
  const result: string[] = [];
  compatibleElements[element]?.forEach(e => result.push(...elements[e]!));
  return result.filter(s => s.toLowerCase() !== sign.toLowerCase());
}
