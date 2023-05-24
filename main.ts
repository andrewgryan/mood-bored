import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve(async (_req) => {
  const text = await Deno.readTextFile("index.html");
  return new Response(text, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
