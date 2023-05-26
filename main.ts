import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const app = new Application();
const router = new Router();

// 404 by supporting SPA routes explicitly
const supportedRoutes = ["/blog", "/blog/:id"];
supportedRoutes.map((pattern) =>
  router.get(pattern, async (ctx, next) => {
    try {
      await ctx.send({
        path: "/",
        root: "./src",
        index: "index.html",
      });
    } catch {
      await next();
    }
  })
);

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
