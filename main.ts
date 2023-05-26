import { Application, Router } from "oak";

const app = new Application();
const router = new Router();

router.get("/blog/:id", async (ctx) => {
  await ctx.send({ path: "/", root: "./src", index: "index.html" });
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
