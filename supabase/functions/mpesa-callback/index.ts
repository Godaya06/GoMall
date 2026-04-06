import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("M-Pesa Callback:", JSON.stringify(body, null, 2));

    const stkCallback = body?.Body?.stkCallback;
    if (stkCallback) {
      const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;
      console.log(`Payment ${ResultCode === 0 ? "SUCCESS" : "FAILED"}: ${ResultDesc} (${CheckoutRequestID})`);

      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      let mpesaReceipt: string | null = null;
      if (ResultCode === 0 && CallbackMetadata?.Item) {
        const receiptItem = CallbackMetadata.Item.find((i: any) => i.Name === "MpesaReceiptNumber");
        mpesaReceipt = receiptItem?.Value || null;
      }

      await supabaseAdmin
        .from("orders")
        .update({
          status: ResultCode === 0 ? "completed" : "failed",
          mpesa_receipt: mpesaReceipt,
        })
        .eq("checkout_request_id", CheckoutRequestID);
    }

    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Callback error:", error.message);
    return new Response(JSON.stringify({ ResultCode: 1, ResultDesc: "Error" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
