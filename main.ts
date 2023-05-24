import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

const CSS_ROUTE = new URLPattern({ pathname: "/style.css" });

serve(async (req: Request): Promise<Response> => {
  const match = CSS_ROUTE.exec(req.url);
  if (match) {
    const text = await Deno.readTextFile("style.css");
    return new Response(text, {
      status: 200,
      headers: { "content-type": "text/css; charset=utf-8" },
    });
  }

  const text = await Deno.readTextFile("index.html");
  return new Response(text, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
