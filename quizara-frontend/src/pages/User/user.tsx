import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import AxiosCall from "../../services/api-calls";
import { Error } from "../../types/Quiz.types";
import "./user.css";
export default function User() {
  const { token } = useAuth();

  const [user, setUser] = useState<any>([]);
  const [error, setError] = useState<Error>(null);
  console.log(user);
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

  type GamePlayedType = {
    name: string;
    totalScore: number;
  };

  return (
    <div className="User">
      {error !== null ? (
        <p>{error}</p>
      ) : (
        user !== [] && (
          <>
            {" "}
            <h1>User Details</h1>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <button onClick={() => localStorage.removeItem("token")}>
              Logout
            </button>
           
           <br />
           <h2>Games Played</h2>
            <table>{
              user?.gamesPlayed?.map((game : GamePlayedType) =>{
                return(
                  <tbody>
                    <td>{game.name}</td>
                    <td>{game.totalScore} points</td>
                  </tbody>
                )
              })}</table>
          </>
        )
      )}
    </div>
  );
}
