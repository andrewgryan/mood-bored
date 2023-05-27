import van from "https://vanjs.org/code/van-0.11.10.min.js";
import Nav from "../components/Nav.js";
import sheet from "./Home.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const { div, header, h1, main } = van.tags;

const Home = () => {
  return div({ class: "Home" }, Nav(), main(header(h1("Home page"))));
};

export default Home;
