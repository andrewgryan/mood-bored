import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const app = new Application();
const router = new Router();

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
