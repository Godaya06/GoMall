// Delivery fee calculator for Kenya (KES)
// Tiered by region with same-city discount for major hubs.

type Tier = "metro" | "nearby" | "regional" | "remote";

const COUNTY_TIER: Record<string, Tier> = {
  Nairobi: "metro",
  Kiambu: "nearby", Kajiado: "nearby", Machakos: "nearby", Murang'a: "nearby",
  Mombasa: "regional", Nakuru: "regional", Kisumu: "regional", Uasin Gishu: "regional",
  Nyeri: "regional", Meru: "regional", Embu: "regional", Kakamega: "regional",
  Kilifi: "regional", Kericho: "regional", Bungoma: "regional", Trans Nzoia: "regional",
  Kirinyaga: "regional", Nyandarua: "regional", Laikipia: "regional", Bomet: "regional",
  Nandi: "regional", Vihiga: "regional", Busia: "regional", Siaya: "regional",
  Homa Bay: "regional", Migori: "regional", Kisii: "regional", Nyamira: "regional",
  Narok: "regional", Baringo: "regional", Elgeyo-Marakwet: "regional", Kitui: "regional",
  Makueni: "regional", Tharaka-Nithi: "regional", Kwale: "regional", Taita-Taveta: "regional",
} as Record<string, Tier>;

const TIER_FEES: Record<Tier, number> = {
  metro: 200,
  nearby: 350,
  regional: 550,
  remote: 850,
};

// Major town discounts (same-city express depots)
const TOWN_BONUS_DEPOTS = [
  "westlands", "cbd", "nairobi cbd", "kilimani", "karen", "lavington", "ruaka",
  "thika", "nakuru town", "mombasa cbd", "nyali", "kisumu cbd", "eldoret cbd",
];

export function calculateDeliveryFee(county: string, town: string): number {
  if (!county) return 0;
  const tier = COUNTY_TIER[county] ?? "remote";
  let fee = TIER_FEES[tier];

  // Express depot discount for major towns within metro/regional hubs
  const townLc = town.trim().toLowerCase();
  if (townLc && TOWN_BONUS_DEPOTS.some((t) => townLc.includes(t))) {
    fee = Math.max(150, fee - 100);
  }
  return fee;
}

export function getDeliveryEstimate(county: string): string {
  const tier = COUNTY_TIER[county] ?? "remote";
  switch (tier) {
    case "metro": return "Same-day delivery";
    case "nearby": return "1–2 business days";
    case "regional": return "2–4 business days";
    case "remote": return "4–7 business days";
  }
}
