/**
 * Swiss Ephemeris house system codes (houses_ex2 hsys).
 * @see https://www.astro.com/swisseph/swephprg.htm
 */
import { z } from "zod";

export const HOUSE_SYSTEM_IDS = [
  "placidus",
  "koch",
  "equal",
  "whole_sign",
  "regiomontanus",
  "campanus",
  "porphyry",
  "alcabitius",
] as const;

export type HouseSystemId = (typeof HOUSE_SYSTEM_IDS)[number];

/** API slug → single char for sweph.houses_ex2 */
const TO_SWEPH: Record<HouseSystemId, string> = {
  placidus: "P",
  koch: "K",
  equal: "E",
  whole_sign: "W",
  regiomontanus: "R",
  campanus: "C",
  porphyry: "O",
  alcabitius: "B",
};

export const HouseSystemSchema = z.enum(HOUSE_SYSTEM_IDS);

export function toSwephHsys(id: HouseSystemId | string): string {
  const normalized = String(id).toLowerCase().replace(/-/g, "_") as HouseSystemId;
  if (normalized in TO_SWEPH) return TO_SWEPH[normalized as HouseSystemId];
  // Legacy fallbacks
  if (id === "placidus" || !id) return "P";
  if (id === "koch") return "K";
  if (id === "equal") return "E";
  return "P";
}

export function parseHouseSystem(raw: string | undefined): HouseSystemId {
  if (!raw) return "placidus";
  const n = raw.toLowerCase().replace(/-/g, "_");
  if ((HOUSE_SYSTEM_IDS as readonly string[]).includes(n)) return n as HouseSystemId;
  return "placidus";
}
