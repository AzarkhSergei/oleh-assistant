import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { email, ip } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  const { count } = await supabase
    .from("login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("email", email)
    .gte("attempted_at", fiveMinutesAgo.toISOString());

  if ((count ?? 0) >= 5) {
    return new Response("Too many attempts", { status: 429 });
  }

  await supabase.from("login_attempts").insert([
    { email, ip_address: ip }
  ]);

  return new Response("OK", { status: 200 });
});
