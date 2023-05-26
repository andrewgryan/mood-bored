import * as marked from "https://esm.run/marked";
import DOMPurify from "https://esm.run/dompurify";
import hljs from "https://esm.run/highlight.js";
import van from "https://vanjs.org/code/van-0.11.10.min.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Navigo from "https://esm.run/navigo";
import Nav from "./Nav.js";
import CountryPicker from "./CountryPicker.js";

// VanJS
const { h1, button, div, textarea } = van.tags;

const toHTML = (markdown) => {
  let div = document.createElement("div");
  div.innerHTML = DOMPurify.sanitize(
    marked.parse(markdown, { headerIds: false, mangle: false })
  );

  // Apply syntax highlights
  div.querySelectorAll("pre code").forEach((el) => {
    try {
      hljs.highlightElement(el);
    } catch (e) {
      console.log(e);
    }
  });

  // Persist markdown changes
  localStorage.setItem("markdown", markdown);
  return div;
};

const Tab = (left, right) => {
  const index = van.state(0);
  return div(
    { class: "tab" },
    div(
      { class: "tab__row" },
      button({ onclick: () => (index.val = 0) }, "Preview"),
      button({ onclick: () => (index.val = 1) }, "Code")
    ),
    van.bind(index, (index) => left(index == 0)),
    van.bind(index, (index) => right(index == 1))
  );
};

// Supabase
const supabase = createClient(
  "https://hfpveiuswfubfyhormqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmcHZlaXVzd2Z1YmZ5aG9ybXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMDM5NDIsImV4cCI6MjAwMDY3OTk0Mn0.b17qlodnbhIcZ8SzC_oUkWmJUL8tFUn6alZOnLWf7MM"
);
const { data, error } = await supabase.auth.getSession();
if (data.session) {
  console.log("currently logged in");
  console.log(data);
} else {
  console.log("currently logged out");
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://localhost:8000" },
  });
}

const addCountry = async (country) => {
  const { error } = await supabase.from("countries").insert({ name: country });
  console.log(country, { error });
};

const Home = () => {
  const text = van.state(localStorage.getItem("markdown") || "");
  const cls = (flag) => (flag ? "" : "hidden");
  return div(
    Nav(),
    CountryPicker({ oncountry: addCountry }),
    Tab(
      (visible) => div({ class: cls(visible) }, van.bind(text, toHTML)),
      (visible) =>
        textarea({
          class: cls(visible),
          value: text,
          oninput: (ev) => (text.val = ev.target.value),
        })
    )
  );
};

// Single-page application routing
const router = new Navigo("/");

const Blog = () => {
  return div(
    Nav(),
    h1("Blog menu!"),
    button({ onclick: () => router.navigate("/") }, "Home"),
    button({ onclick: () => router.navigate("/blog/1") }, "Blog 1")
  );
};

const Post = (id) => {
  return div(Nav(), div("Blog " + id));
};

const App = () => {
  const page = van.state(div(""));

  router.on("/", () => {
    page.val = Home();
  });

  router.on("/blog", () => {
    page.val = Blog();
  });

  router.on("/blog/:id", (match) => {
    page.val = Post(match.data.id);
  });

  router.resolve();
  return page;
};

van.add(document.getElementById("app"), App());
