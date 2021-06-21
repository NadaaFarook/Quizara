import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AxiosCall from "../../services/api-calls";
import { Error } from "../../types/Quiz.types";
import "./user.css";
export default function User() {
  const { token } = useAuth();

  const [user, setUser] = useState<any>([]);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    (async () => {
      const response = await AxiosCall({
        type: "get",
        endpoint: "/api/user",
        token,
      });

      if (response.success === true) {
        setUser(response.user);
      } else {
        setError(response.error);
      }
    })();
  }, [token]);

  console.log(user, error);

  return (
    <div className="User">
      {error !== null ? (
        <p>{error}</p>
      ) : (
        user !== [] && (
          <>
            {" "}
            <h2>Name : {user.name}</h2>
            <h3>Email : {user.email}</h3>
            <button onClick={() => localStorage.removeItem("token")}>
              Logout
            </button>
            <div className="links">
              <Link to="/login">Login</Link>
              <br />
              <Link to="/signup">Signup</Link>
            </div>
          </>
        )
      )}
    </div>
  );
}
