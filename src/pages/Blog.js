import van from "https://vanjs.org/code/van-0.11.10.min.js";
import supabase from "../supabase.js";
import { inject } from "../markdown.js";
import Nav from "../components/Nav.js";
import sheet from "./Blog.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const { a, div, h1, main, ul, li, button } = van.tags;

export const Post = (id) => {
  const user = van.state(null);
  const author = van.state("");
  const content = van.state(div());

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") {
      user.val = session.user.id;
    }
    if (event == "SIGNED_OUT") {
      user.val = null;
    }
  });

  user.onnew((id) => {
    console.log(id);
  });

  supabase
    .from("posts")
    .select("post, id, author")
    .eq("id", id)
    .then(({ data, error }) => {
      if (data.length > 0) {
        author.val = data[0].author;
        content.val = inject(div(), data[0].post);
      }
    });

  return div(
    Nav(),
    van.bind(user, author, (user, author) => {
      if (user == author) {
        return button({ onclick: () => console.log("edit") }, "Edit");
      } else {
        return div();
      }
    }),
    content
  );
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
