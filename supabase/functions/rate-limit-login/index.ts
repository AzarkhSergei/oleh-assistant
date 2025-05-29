import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function withCorsHeaders(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "https://oleh-assistant.netlify.app",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Content-Type": "application/json",
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return withCorsHeaders("ok");
  }

  try {
    const { email, ip, successful } = await req.json();

    if (!email || typeof successful !== "boolean") {
      return withCorsHeaders(JSON.stringify({ error: "Missing required fields" }), 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (!successful) {
      // Проверка количества неудачных попыток за последние 5 минут
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      const { count, error: selectError } = await supabase
        .from("login_attempts")
        .select("*", { count: "exact", head: true })
        .eq("email", email)
        .eq("successful", false)
        .gte("attempted_at", fiveMinutesAgo.toISOString());

      if (selectError) {
        console.error("Ошибка при подсчёте попыток:", selectError.message);
        return withCorsHeaders(JSON.stringify({ error: "select error" }), 500);
      }

      if ((count ?? 0) >= 5) {
        return withCorsHeaders(JSON.stringify({ error: "Too many attempts" }), 429);
      }
    }

    // Вставка новой попытки (успешной или нет)
    const { error: insertError } = await supabase.from("login_attempts").insert([
      {
        email,
        ip_address: ip ?? null,
        successful,
      },
    ]);

    if (insertError) {
      console.error("Ошибка вставки:", insertError.message);
      return withCorsHeaders(JSON.stringify({ error: "insert error" }), 500);
    }

    return withCorsHeaders(JSON.stringify({ success: true }), 200);
  } catch (err) {
    console.error("Ошибка выполнения функции:", err);
    return withCorsHeaders(JSON.stringify({ error: "server error" }), 500);
  }
});
