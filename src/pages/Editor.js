import van from "https://vanjs.org/code/van-0.11.10.min.js";
import * as marked from "https://esm.run/marked";
import DOMPurify from "https://esm.run/dompurify";
import hljs from "https://esm.run/highlight.js";
import CountryPicker from "../CountryPicker.js";

const { button, div, textarea } = van.tags;

const addCountry = async (country) => {
  const { error } = await supabase.from("countries").insert({ name: country });
  console.log(country, { error });
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

const Editor = () => {
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

export default Editor;
