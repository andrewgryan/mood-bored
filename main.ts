import { createClient } from "supabase";
import { Application, Router } from "oak";

const app = new Application();
const router = new Router();

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_KEY")
);

router.get("/api", async (ctx) => {
  const { data, error } = await supabase.from("countries").select();
  ctx.response.body = JSON.stringify({ data, error });
  ctx.response.headers.set("content-type", "application/json; charset=utf-8");
  ctx.response.status = 200;
});

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: "./src",
      index: "index.html",
    });
  } catch {
    await next();
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
console.log(`listening: http://localhost:${port}`);
await app.listen({ port });
