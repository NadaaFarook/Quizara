import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SignUp } from "../../services/auth.service";
import {Link} from 'react-router-dom'
import './signup.css'
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
    <div className="Signup">
      <h1>Signup</h1>
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
      <p>Already signed up ! <Link to="/login">Login</Link></p>
      <ToastContainer />
    </div>
  );
}
