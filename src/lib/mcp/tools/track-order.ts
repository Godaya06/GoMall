import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "track_order",
  title: "Track order",
  description:
    "Track a GoMall order status by order id. Requires the M-Pesa phone number used at checkout for verification.",
  inputSchema: {
    order_id: z.string().trim().min(1).describe("Order id from checkout confirmation."),
    phone: z.string().trim().min(9).describe("M-Pesa phone number used at checkout."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ order_id, phone }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    );
    const normalized = phone.replace(/\s+/g, "").replace(/^\+/, "").replace(/^0/, "254");
    const { data, error } = await supabase
      .from("orders")
      .select("id,status,total_amount,delivery_fee,county,town,mpesa_receipt,created_at,items")
      .eq("id", order_id)
      .eq("phone_number", normalized)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data)
      return {
        content: [{ type: "text", text: "No matching order for that id + phone." }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { order: data },
    };
  },
});
