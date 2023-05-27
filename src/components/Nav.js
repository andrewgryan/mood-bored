import van from "https://vanjs.org/code/van-0.11.10.min.js";
import Login from "./Login.js";
import sheet from "./Nav.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const { div, a, ul, li } = van.tags;

const Nav = () => {
  const links = [
    { href: "/", content: "Home" },
    { href: "/blog", content: "Blog" },
  ];
  return div(
    { class: "Nav" },
    ul(
      links.map(({ href, content }) =>
        li(a({ href, "data-navigo": true }, content))
      )
    ),
    Login()
  );
};

export default Nav;
