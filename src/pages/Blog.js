import van from "https://vanjs.org/code/van-0.11.10.min.js";
import Nav from "../components/Nav.js";
import sheet from "./Blog.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const { div, h1, main } = van.tags;

export const Post = (id) => {
  return div(Nav(), div("Blog " + id));
};

const Blog = () => {
  return div(Nav(), main(h1("Off the top of my head")));
};

export default Blog;
