import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AxiosCall from "../../services/api-calls";
import { Error } from "../../types/Quiz.types";
import "./leaderboard.css";
export default function Leaderboard() {
  const { token } = useAuth();

  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    (async () => {
      const response = await AxiosCall({
        type: "get",
        endpoint: "/api/score/leaderboard",
        token,
      });

      if (response.success === true) {
        setLeaderboard(response.leaderboard);
      } else {
        setError(response.error);
      }
    })();
  }, [token]);

  console.log(leaderboard, error);

  const sortedLeaderboard = leaderboard
    .sort((a: { score: number }, b: { score: number }) => {
      return b.score - a.score;
    })
    .slice(0, 5);

  return (
    <div className="Leaderboard">
      {error !== null ? (
        <p>{error}</p>
      ) : (
        leaderboard !== [] && (
          <>
          <h2>Leaderboard
            <br /><span>(Top 5 players)</span></h2>
          <table>
            <thead>
              <td>Name</td>
              <td>Quiz Name</td>
              <td>Score</td>
            </thead>
            {sortedLeaderboard.map((item: any) => {
              return (
                <tbody>
                  <td>{item.name}</td>
                  <td>{item.quizname}</td>
                  <td>{item.score}</td>
                </tbody>
              );
            })}
          </table>
          </>
        )
      )}
    </div>
  );
}
