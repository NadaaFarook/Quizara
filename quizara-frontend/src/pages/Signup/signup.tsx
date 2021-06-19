import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SignUp } from "../../services/auth.service";

export default function Signup() {
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null,
  });
  const SignUpSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    SignUp(user);
  };

  const SignupDataHandler = ({ value, id }: { value: any; id: any }) => {
    setUser({ ...user, [id]: value });
  };
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          placeholder="Enter your Name"
          id="name"
          variant="outlined"
          onChange={(e) => SignupDataHandler(e.target)}
        />
        <br />
        <TextField
          placeholder="Enter your Email"
          id="email"
          variant="outlined"
          onChange={(e) => SignupDataHandler(e.target)}
        />
        <br />
        <TextField
          placeholder="Enter your Password"
          id="password"
          variant="outlined"
          onChange={(e) => SignupDataHandler(e.target)}
        />
        <br />
        <button onClick={SignUpSubmit}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
