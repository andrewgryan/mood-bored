import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
  ctx.response.body = await Deno.readTextFile("index.html");
  ctx.response.headers.set("content-type", "text/html; charset=utf-8");
  ctx.response.status = 200;
});
router.get("/style.css", async (ctx) => {
  ctx.response.body = await Deno.readTextFile("style.css");
  ctx.response.headers.set("content-type", "text/css; charset=utf-8");
  ctx.response.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
console.log(`listening: http://localhost:${port}`);
await app.listen({ port });
