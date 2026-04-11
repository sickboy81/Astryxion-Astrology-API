import { TIERS_CONFIG } from "../data/constants.js";
import { jsonParseSafe } from "./utils.js";
import type { Tier, TierConfig } from "./types.js";

/** Ordem estável para marketing (landing) e portal. */
const PUBLIC_TIER_ORDER: readonly Tier[] = ["free", "mercury", "venus", "saturn"];

type RedisHash = { hgetall(key: string): Promise<Record<string, string>> };

function mergeTierConfig(base: TierConfig, stored: TierConfig): TierConfig {
  return {
    ...base,
    ...stored,
    id: base.id,
    features: stored.features !== undefined ? stored.features : base.features,
    tagline: stored.tagline !== undefined ? stored.tagline : base.tagline,
    enabled: stored.enabled === false ? false : stored.enabled === true ? true : base.enabled !== false,
  };
}

export function isTierPubliclyVisible(tier: TierConfig): boolean {
  return tier.enabled !== false;
}

export async function fetchMergedTiersConfig(redis: RedisHash | null | undefined): Promise<Record<string, TierConfig>> {
  const results: Record<string, TierConfig> = { ...TIERS_CONFIG };
  if (redis) {
    try {
      const raw = await redis.hgetall("config:tiers");
      for (const [id, json] of Object.entries(raw)) {
        const cfg = jsonParseSafe<TierConfig>(json);
        const base = results[id];
        if (cfg && base) results[id] = mergeTierConfig(base, cfg);
      }
    } catch {
      /* ignore */
    }
  }
  return results;
}

/** Planos visíveis (landing + portal), ordem fixa. */
export async function listPublicTiersOrdered(redis: RedisHash | null | undefined): Promise<TierConfig[]> {
  const map = await fetchMergedTiersConfig(redis);
  return PUBLIC_TIER_ORDER.map((id) => map[id])
    .filter((t): t is TierConfig => Boolean(t) && isTierPubliclyVisible(t));
}

/** Todos os planos editáveis (admin), incluindo desativados. */
export async function listAllTiersForAdmin(redis: RedisHash | null | undefined): Promise<TierConfig[]> {
  const map = await fetchMergedTiersConfig(redis);
  return PUBLIC_TIER_ORDER.map((id) => map[id]).filter(Boolean) as TierConfig[];
}
