import van from "https://vanjs.org/code/van-0.11.10.min.js";
import supabase from "../supabase.js";

const { button } = van.tags;

const Login = () => {
  const signedIn = van.state(false);

  supabase.auth.getSession().then(({ data, error }) => {
    if (data.session) {
      signedIn.val = true;
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_OUT") {
      signedIn.val = false;
    }
    if (event == "SIGNED_IN") {
      console.log(session);
      signedIn.val = true;
    }
  });

  return van.bind(signedIn, (flag) => {
    if (flag) {
      return SignOut({
        onclick: async () => {
          const { error } = await supabase.auth.signOut();
          console.log(error);
        },
      });
    } else {
      return SignIn({
        onclick: async () => {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: window.location.origin },
          });
          console.log(error);
        },
      });
    }
  });
};

const SignIn = (props) => button(props, "Sign in");

const SignOut = (props) => button(props, "Sign out");

export default Login;
