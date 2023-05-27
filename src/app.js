import van from "https://vanjs.org/code/van-0.11.10.min.js";
import Navigo from "https://esm.run/navigo";
import Blog, { Post } from "./pages/Blog.js";
import Home from "./pages/Home.js";

// VanJS
const { div } = van.tags;

// Single-page application routing
const router = new Navigo("/");

const App = () => {
  const page = van.state(div(""));

  router.on("/", () => {
    page.val = Home();
  });

  router.on("/blog", () => {
    page.val = Blog({ router });
  });

  router.on("/blog/:id", (match) => {
    page.val = Post(match.data.id);
  });

  router.resolve();
  return page;
};

van.add(document.getElementById("app"), App());
