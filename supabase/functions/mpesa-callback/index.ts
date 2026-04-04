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

    // Process callback - log result
    const stkCallback = body?.Body?.stkCallback;
    if (stkCallback) {
      const { ResultCode, ResultDesc, CheckoutRequestID } = stkCallback;
      console.log(`Payment ${ResultCode === 0 ? "SUCCESS" : "FAILED"}: ${ResultDesc} (${CheckoutRequestID})`);
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
