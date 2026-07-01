import { supabase } from "@/integrations/supabase/client";
import { phones as staticPhones } from "@/data/phones";
import { products as staticProducts } from "@/data/products";
import { marketplaceProducts as staticMarketplace } from "@/data/marketplace";
import { db, setMeta } from "./db";

const now = () => Date.now();

/**
 * Seed bundled static catalogs into Dexie so pages have offline data
 * even before the first server sync.
 */
export const seedStatic = async () => {
  const [phoneCount, careCount, mpCount] = await Promise.all([
    db.phones.count(),
    db.personalCare.count(),
    db.marketplace.count(),
  ]);

  if (phoneCount === 0) {
    await db.phones.bulkPut(
      staticPhones.map((p) => ({ id: p.id, payload: p, updated_at: now() }))
    );
  }
  if (careCount === 0) {
    await db.personalCare.bulkPut(
      staticProducts.map((p) => ({ id: p.id, payload: p, updated_at: now() }))
    );
  }
  if (mpCount === 0) {
    await db.marketplace.bulkPut(
      staticMarketplace.map((p) => ({ id: p.id, payload: p, updated_at: now() }))
    );
  }
};

/**
 * Server-wins sync: fetch marketplace overrides from Supabase and merge with
 * the bundled catalog. Remote rows overwrite local rows unconditionally.
 */
export const syncMarketplace = async () => {
  const { data, error } = await supabase.from("marketplace_products").select("*");
  if (error) throw error;

  const overrideMap = new Map<string, any>((data || []).map((o: any) => [o.id, o]));
  const merged: any[] = [];

  for (const p of staticMarketplace) {
    const ov = overrideMap.get(p.id);
    if (ov) {
      merged.push({
        ...p,
        name: ov.name ?? p.name,
        price: ov.price != null ? Number(ov.price) : p.price,
        originalPrice: ov.original_price != null ? Number(ov.original_price) : p.originalPrice,
        category: ov.category ?? p.category,
        description: ov.description ?? p.description,
        image: ov.image_url ?? p.image,
        details: Array.isArray(ov.details) ? ov.details : p.details,
        hidden: !!ov.hidden,
      });
    } else {
      merged.push({ ...p, hidden: false });
    }
  }

  // custom-only rows
  for (const ov of data || []) {
    if (!ov.is_custom) continue;
    if (staticMarketplace.some((p) => p.id === ov.id)) continue;
    merged.push({
      id: ov.id,
      name: ov.name || "Untitled",
      price: ov.price != null ? Number(ov.price) : 0,
      originalPrice: ov.original_price != null ? Number(ov.original_price) : undefined,
      category: ov.category || "Electronics",
      description: ov.description || "",
      image: ov.image_url || "/placeholder.svg",
      details: Array.isArray(ov.details) ? ov.details : [],
      hidden: !!ov.hidden,
    });
  }

  await db.marketplace.clear();
  await db.marketplace.bulkPut(
    merged.map((p) => ({ id: p.id, payload: p, updated_at: now() }))
  );
  await setMeta("marketplace:lastSyncAt", now());
};

export const syncAll = async () => {
  await seedStatic();
  if (typeof navigator !== "undefined" && navigator.onLine === false) return;
  try {
    await syncMarketplace();
  } catch (err) {
    // Offline / transient — silently fall back to cached data
    console.warn("[sync] marketplace sync failed", err);
  }
};

let started = false;
let intervalId: number | undefined;

export const startSyncEngine = () => {
  if (started || typeof window === "undefined") return;
  started = true;

  void syncAll();

  window.addEventListener("online", () => void syncAll());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void syncAll();
  });
  intervalId = window.setInterval(() => void syncAll(), 5 * 60 * 1000);
};

export const stopSyncEngine = () => {
  if (intervalId) window.clearInterval(intervalId);
  started = false;
};
