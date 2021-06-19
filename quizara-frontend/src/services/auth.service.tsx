import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Token } from "../types/Quiz.types";

type AuthProp = {
  name?: string | null;
  email: string | null;
  password: string | null;
};

const SignUp = async (user: AuthProp) => {
  try {
    const response = await axios.post(
      "https://quizara-backend.nadaafarook.repl.co/api/user/signup",

      user
    );
    if (!response.data.success) {
      toast(response.data.error);
    } else {
      toast("User signed up successfully");
    }
  } catch (err) {
    toast("Error in signing you up. Maybe report the dev to fix it.");
  }
};

const LogIn = async (user: AuthProp, token: Token, setToken: any) => {
  try {
    const response = await axios.post(
      "https://quizara-backend.nadaafarook.repl.co/api/user/login",

      user
    );
    if (!response.data.success) {
      toast(response.data.error);
    } else {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      toast("User logged up successfully");
    }
  } catch (err) {
    toast("Error in logging you up. Maybe report the dev to fix it.");
  }
};

export { SignUp, LogIn };
