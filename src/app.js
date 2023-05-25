import * as marked from "https://esm.run/marked";
import DOMPurify from "https://esm.run/dompurify";
import hljs from "https://esm.run/highlight.js";
import van from "https://vanjs.org/code/van-0.11.10.min.js";

const { div, textarea } = van.tags;
van.add(
  document.getElementById("app"),
  div({ id: "content" }),
  textarea({ id: "text" })
);

const updateContentArea = (markdown) => {
  document.getElementById("content").innerHTML = DOMPurify.sanitize(
    marked.parse(markdown, { headerIds: false, mangle: false })
  );
};

document.getElementById("text").addEventListener("input", (ev) => {
  const markdown = ev.currentTarget.value;

  // Update content innerHTML
  updateContentArea(markdown);

  // Syntax-highlight code blocks
  hljs.highlightAll();

  // Save to localStorage
  localStorage.setItem("markdown", markdown);
});

// On page load
const markdown = localStorage.getItem("markdown");
if (markdown) {
  document.getElementById("text").value = markdown;
  updateContentArea(markdown);
  hljs.highlightAll();
}

// Support click outside close
document.addEventListener("click", (ev) => {
  const editor = document.getElementById("text");
  if (!editor.contains(ev.target)) {
    editor.style.display = "none";
  }
});
