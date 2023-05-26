import van from "https://vanjs.org/code/van-0.11.10.min.js";
import Nav from "../components/Nav.js";

const { div, h1, button } = van.tags;

export const Post = (id) => {
  return div(Nav(), div("Blog " + id));
};

const Blog = ({ router }) => {
  return div(
    Nav(),
    h1("Blog menu!"),
    button({ onclick: () => router.navigate("/") }, "Home"),
    button({ onclick: () => router.navigate("/blog/1") }, "Blog 1")
  );
};

export default Blog;
