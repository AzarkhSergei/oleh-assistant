import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function withCorsHeaders(body: string, status = 200, req?: Request) {
  return new Response(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": req?.headers.get("origin") ?? "*",
      "Vary": "Origin",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Content-Type": "application/json"
    }
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return withCorsHeaders("ok", 200, req);
  }

  try {
    const body = await req.json();
    const { email, successful, user_id, checkOnly } = body;
    const ip = req.headers.get("x-forwarded-for") ?? "0.0.0.0";

    if (!email) {
      return withCorsHeaders(JSON.stringify({ error: "Missing email" }), 400, req);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Проверка лимита попыток
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const { count, error: countError } = await supabase
      .from("login_attempts")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .eq("successful", false)
      .gte("attempted_at", fiveMinutesAgo.toISOString());

    if (countError) {
      console.error("Ошибка при подсчёте попыток:", countError.message);
      return withCorsHeaders(JSON.stringify({ error: "select error" }), 500, req);
    }

    if ((count ?? 0) >= 5) {
      return withCorsHeaders(JSON.stringify({ error: "Too many attempts" }), 429, req);
    }

    // Если только проверка — не записываем
    if (checkOnly) {
      return withCorsHeaders(JSON.stringify({ allowed: true }), 200, req);
    }

    if (typeof successful !== "boolean") {
      return withCorsHeaders(JSON.stringify({ error: "Missing 'successful' boolean" }), 400, req);
    }

    const { error: insertError } = await supabase.from("login_attempts").insert([
      {
        email,
        ip_address: ip,
        successful,
        user_id: user_id ?? null,
      },
    ]);

    if (insertError) {
      console.error("Ошибка вставки:", insertError.message);
      return withCorsHeaders(JSON.stringify({ error: "insert error" }), 500, req);
    }

    return withCorsHeaders(JSON.stringify({ success: true }), 200, req);
  } catch (err) {
    console.error("Ошибка выполнения функции:", err);
    return withCorsHeaders(JSON.stringify({ error: "server error" }), 500, req);
  }
});
