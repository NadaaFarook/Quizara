import React, { useState } from "react";
import "./login.css";
import { TextField } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";

import { LogIn } from "../../services/auth.service";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const { token, setToken } = useAuth();
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const LogInSubmit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    LogIn(user, token, setToken);
  };

  const LogInDataHandler = ({ value, id }: { value: any; id: any }) => {
    setUser({ ...user, [id]: value });
  };

  return (
    <div className="Login">
      <form noValidate autoComplete="off">
        <TextField
          placeholder="Enter your Email"
          id="email"
          variant="outlined"
          onChange={(e) => LogInDataHandler(e.target)}
        />
        <br />
        <TextField
          placeholder="Enter your Password"
          id="password"
          variant="outlined"
          onChange={(e) => LogInDataHandler(e.target)}
        />
        <br />
        <button onClick={(e)=>LogInSubmit(e)}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
