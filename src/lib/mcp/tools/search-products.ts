import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search visible GoMall marketplace products by name/category, optionally filtered by price range. Returns up to 25 matches.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text search over product name/category."),
    category: z.string().trim().optional().describe("Filter by category (exact match)."),
    max_price: z.number().positive().optional().describe("Maximum price in KES."),
    min_price: z.number().nonnegative().optional().describe("Minimum price in KES."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 25)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, category, max_price, min_price, limit }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    );
    let q = supabase
      .from("marketplace_products")
      .select("id,name,category,price,original_price,image_url,description")
      .eq("hidden", false)
      .limit(limit ?? 25);
    if (query) q = q.or(`name.ilike.%${query}%,category.ilike.%${query}%`);
    if (category) q = q.eq("category", category);
    if (typeof max_price === "number") q = q.lte("price", max_price);
    if (typeof min_price === "number") q = q.gte("price", min_price);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { products: data ?? [] },
    };
  },
});
