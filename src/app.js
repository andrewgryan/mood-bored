import van from "https://vanjs.org/code/van-0.11.10.min.js";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Navigo from "https://esm.run/navigo";
import Blog, { Post } from "./pages/Blog.js";
import Home from "./pages/Home.js";

// VanJS
const { div } = van.tags;

// // Supabase
// const supabase = createClient(
//   "https://hfpveiuswfubfyhormqh.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmcHZlaXVzd2Z1YmZ5aG9ybXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMDM5NDIsImV4cCI6MjAwMDY3OTk0Mn0.b17qlodnbhIcZ8SzC_oUkWmJUL8tFUn6alZOnLWf7MM"
// );
// const { data, error } = await supabase.auth.getSession();
// if (data.session) {
//   console.log("currently logged in");
//   console.log(data);
// } else {
//   console.log("currently logged out");
//   supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: { redirectTo: "http://localhost:8000" },
//   });
// }

// Single-page application routing
const router = new Navigo("/");

const App = () => {
  const page = van.state(div(""));

  router.on("/", () => {
    page.val = Home();
  });

  router.on("/blog", () => {
    page.val = Blog({ router });
  });

  router.on("/blog/:id", (match) => {
    page.val = Post(match.data.id);
  });

  router.resolve();
  return page;
};

van.add(document.getElementById("app"), App());
