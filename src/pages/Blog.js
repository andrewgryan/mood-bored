import van from "https://vanjs.org/code/van-0.11.10.min.js";
import supabase from "../supabase.js";
import Nav from "../components/Nav.js";
import sheet from "./Blog.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const { a, div, h1, main, ul, li, pre } = van.tags;

export const Post = (id) => {
  const content = van.state("");

  supabase
    .from("posts")
    .select("post, id")
    .eq("id", id)
    .then(({ data, error }) => {
      if (data.length > 0) {
        content.val = data[0].post;
      }
    });

  return div(Nav(), pre(content));
};

const Blog = () => {
  const posts = van.state([]);

  posts.onnew(console.log);

  // Load data
  supabase
    .from("posts")
    .select()
    .then(({ data, error }) => {
      posts.val = data.map(({ title, id }) => {
        return { title, id };
      });
    });

  return div(
    Nav(),
    main(
      h1("Off the top of my head"),
      van.bind(posts, (posts) => {
        return ul(
          posts.map(({ title, id }) => li(a({ href: `/blog/${id}` }, title)))
        );
      })
    )
  );
};

export default Blog;
