import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  marketplaceProducts as staticProducts,
  marketplaceCategories as staticCategories,
  type MarketplaceProduct,
} from "@/data/marketplace";

export interface MarketplaceOverrideRow {
  id: string;
  name: string | null;
  price: number | null;
  original_price: number | null;
  category: string | null;
  description: string | null;
  image_url: string | null;
  details: any;
  hidden: boolean;
  is_custom: boolean;
}

export const useMarketplace = (includeHidden = false) => {
  const [overrides, setOverrides] = useState<MarketplaceOverrideRow[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const { data } = await supabase.from("marketplace_products").select("*");
    setOverrides((data as MarketplaceOverrideRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, []);

  const overrideMap = new Map(overrides.map((o) => [o.id, o]));

  const merged: (MarketplaceProduct & { hidden?: boolean; isCustom?: boolean })[] = [];

  // static + overrides
  for (const p of staticProducts) {
    const ov = overrideMap.get(p.id);
    if (ov) {
      if (ov.hidden && !includeHidden) continue;
      merged.push({
        ...p,
        name: ov.name ?? p.name,
        price: ov.price != null ? Number(ov.price) : p.price,
        originalPrice: ov.original_price != null ? Number(ov.original_price) : p.originalPrice,
        category: ov.category ?? p.category,
        description: ov.description ?? p.description,
        image: ov.image_url ?? p.image,
        details: Array.isArray(ov.details) ? ov.details : p.details,
        hidden: ov.hidden,
        isCustom: false,
      });
    } else {
      merged.push({ ...p, hidden: false, isCustom: false });
    }
  }

  // custom-only rows
  for (const ov of overrides) {
    if (!ov.is_custom) continue;
    if (ov.hidden && !includeHidden) continue;
    if (staticProducts.some((p) => p.id === ov.id)) continue;
    merged.push({
      id: ov.id,
      name: ov.name || "Untitled",
      price: ov.price != null ? Number(ov.price) : 0,
      originalPrice: ov.original_price != null ? Number(ov.original_price) : undefined,
      category: ov.category || "Electronics",
      description: ov.description || "",
      image: ov.image_url || "/placeholder.svg",
      details: Array.isArray(ov.details) ? ov.details : [],
      hidden: ov.hidden,
      isCustom: true,
    });
  }

  const categories = Array.from(
    new Set<string>(["All", ...staticCategories.filter((c) => c !== "All"), ...merged.map((p) => p.category)])
  );

  return { products: merged, categories, loading, reload, overrides };
};
