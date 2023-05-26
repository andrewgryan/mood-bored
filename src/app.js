import * as marked from "https://esm.run/marked";
import DOMPurify from "https://esm.run/dompurify";
import hljs from "https://esm.run/highlight.js";
import van from "https://vanjs.org/code/van-0.11.10.min.js";

const { div, textarea } = van.tags;

const toHTML = (markdown) => {
  let div = document.createElement("div");
  div.id = "content";
  div.innerHTML = DOMPurify.sanitize(
    marked.parse(markdown, { headerIds: false, mangle: false })
  );

  // Apply syntax highlights
  div.querySelectorAll("code").forEach((el) => {
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

const App = () => {
  const text = van.state(localStorage.getItem("markdown") || "");
  return div(
    van.bind(text, toHTML),
    textarea({
      id: "text",
      value: text,
      oninput: (ev) => (text.val = ev.target.value),
    })
  );
};

van.add(document.getElementById("app"), App());

// Support click outside close
document.addEventListener("click", (ev) => {
  const editor = document.getElementById("text");
  if (!editor.contains(ev.target)) {
    editor.style.display = "none";
  }
});
