import * as marked from "https://esm.run/marked";
import DOMPurify from "https://esm.run/dompurify";
import hljs from "https://esm.run/highlight.js";

export const inject = (domElement, markdown) => {
  domElement.innerHTML = DOMPurify.sanitize(
    marked.parse(markdown, { headerIds: false, mangle: false })
  );

  // Apply syntax highlights
  domElement.querySelectorAll("pre code").forEach((el) => {
    try {
      hljs.highlightElement(el);
    } catch (e) {
      console.log(e);
    }
  });

  return domElement;
};
