import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description: "List distinct visible product categories in the GoMall marketplace.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    );
    const { data, error } = await supabase
      .from("marketplace_products")
      .select("category")
      .eq("hidden", false);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const categories = Array.from(
      new Set((data ?? []).map((r: any) => r.category).filter(Boolean)),
    ).sort();
    return {
      content: [{ type: "text", text: JSON.stringify(categories) }],
      structuredContent: { categories },
    };
  },
});
