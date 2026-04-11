import { z } from "zod";

/** Zodiac for Vedic server-side ephemeris (Swiss Ephemeris). Western natal stays tropical only. */
export const ZodiacModeSchema = z.enum(["tropical", "sidereal_lahiri"]);
export type ZodiacMode = z.infer<typeof ZodiacModeSchema>;

export type CoordinateModel =
  | { zodiacMode: "tropical" }
  | { zodiacMode: "sidereal_lahiri"; ayanamsaName: "Lahiri"; ayanamsaDegrees: number };

/**
 * Swiss Ephemeris `set_sid_mode` is process-global. Serialize all work that touches it
 * (sidereal calc + ayanamsa) so concurrent requests do not interleave modes.
 */
let swephGlobalChain: Promise<unknown> = Promise.resolve();

export function withSwephSiderealWork<T>(fn: () => Promise<T>): Promise<T> {
  const p = swephGlobalChain.then(() => fn());
  swephGlobalChain = p.then(
    () => undefined,
    () => undefined
  );
  return p as Promise<T>;
}

type SwephModule = typeof import("sweph");

export function applySwephEphePath(sweph: SwephModule): void {
  const p = process.env.SWEPH_EPHE_PATH?.trim();
  if (p) sweph.set_ephe_path(p);
}

/** Ephemeris file flag: prefer Swiss files when path is configured. */
export function resolveSwephEpheFlag(sweph: SwephModule): number {
  return process.env.SWEPH_EPHE_PATH?.trim()
    ? sweph.constants.SEFLG_SWIEPH
    : sweph.constants.SEFLG_MOSEPH;
}

/** Flags for `calc_ut` / `get_ayanamsa_ex_ut`. Tropical matches legacy `calculatePlanets` (MOSEPH only). */
export function buildPlanetCalcFlags(sweph: SwephModule, mode: ZodiacMode): number {
  if (mode === "tropical") {
    return sweph.constants.SEFLG_MOSEPH;
  }
  const ephe = resolveSwephEpheFlag(sweph);
  return ephe | sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SIDEREAL;
}

/** Second argument to `houses_ex2` (iflag). */
export function buildHousesIflag(sweph: SwephModule, mode: ZodiacMode): number {
  if (mode === "tropical") return 0;
  return sweph.constants.SEFLG_SIDEREAL;
}
