import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CONSUMER_KEY = Deno.env.get("MPESA_CONSUMER_KEY")!;
const CONSUMER_SECRET = Deno.env.get("MPESA_CONSUMER_SECRET")!;
const TILL_NUMBER = "174379";
const BUSINESS_SHORT_CODE = "174379";
const PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const BASE_URL = "https://sandbox.safaricom.co.ke";
const TRANSACTION_TYPE = "CustomerPayBillOnline";

function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function formatPhone(phone: string): string {
  phone = phone.replace(/\s+/g, "").replace(/^0/, "254").replace(/^\+/, "");
  if (!phone.startsWith("254")) phone = "254" + phone;
  return phone;
}

async function getAccessToken(): Promise<string> {
  const credentials = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phone, amount, items, county, town, delivery_address } = await req.json();

    if (!phone || !amount) {
      return new Response(JSON.stringify({ error: "Phone and amount are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = await getAccessToken();
    const timestamp = getTimestamp();
    const password = btoa(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`);
    const formattedPhone = formatPhone(phone);

    const stkPayload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: TRANSACTION_TYPE,
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: TILL_NUMBER,
      PhoneNumber: formattedPhone,
      CallBackURL: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mpesa-callback`,
      AccountReference: "GoMall",
      TransactionDesc: "Pay to GoMall",
    };

    const stkRes = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stkPayload),
    });

    const stkData = await stkRes.json();

    if (stkData.ResponseCode === "0") {
      // Save order to database
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const { data: order, error: dbError } = await supabaseAdmin
        .from("orders")
        .insert({
          phone_number: formattedPhone,
          total_amount: Math.round(amount),
          status: "pending",
          checkout_request_id: stkData.CheckoutRequestID,
          items: items || [],
          county: county || null,
          town: town || null,
          delivery_address: delivery_address || null,
        })
        .select("id")
        .single();

      if (dbError) console.error("Order save error:", dbError);

      return new Response(JSON.stringify({
        success: true,
        message: "STK Push sent. Check your phone.",
        checkoutRequestId: stkData.CheckoutRequestID,
        orderId: order?.id,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      success: false,
      message: stkData.errorMessage || stkData.ResponseDescription || "STK Push failed",
      details: stkData,
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
