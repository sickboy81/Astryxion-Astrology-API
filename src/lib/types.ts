export type Tier = "free" | "mercury" | "venus" | "saturn" | "admin";

export type ApiKeyRecord = {
  tier: Tier;
  status: "active" | "disabled";
  customerId?: string;
  authorizedDomains?: string[];
};

export interface TierConfig {
  id: Tier;
  displayName: string;
  requestsPerDay: number;
  price: string;
  features: string[];
  /** false = oculto na landing e no portal; omitido ou true = visível */
  enabled?: boolean;
}

export type CacheGetResult<T> = { hit: boolean; value: T | null };

export type HoroscopePeriod = "daily" | "weekly" | "monthly";

export type VedicHoroscopePeriod = "daily" | "weekly" | "monthly";
export type VedicHoroscopeCategory = "love" | "health" | "career" | "finance";
