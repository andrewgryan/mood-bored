import van from "https://vanjs.org/code/van-0.11.10.min.js";
import sheet from "./Nav.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const { div, a, ul, li } = van.tags;

const Nav = () => {
  const links = [
    { href: "/", content: "Home" },
    { href: "/blog", content: "Blog" },
    { href: "/editor", content: "Editor" },
  ];
  return div(
    { class: "Nav" },
    ul(
      links.map(({ href, content }) =>
        li(a({ href, "data-navigo": true }, content))
      )
    )
  );
};

export default Nav;
