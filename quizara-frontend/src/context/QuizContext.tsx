import React, { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useState } from "react";
import { Quizreducer, initialState } from "../reducers/QuizReducer";
import AxiosCall from "../services/api-calls";
import { useAuth } from "./AuthContext";

export const QuizContext = createContext<any>({});

export const QuizProvider: FC = ({ children }): JSX.Element => {
  const { token } = useAuth();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function fetch() {
      const res = await AxiosCall({
        type: "get",
        endpoint: "/api/user",
        token,
      });
      setUser(res.user);
    }

    fetch();
  }, [token]);
  console.log(user, token);
  const [state, dispatch] = useReducer<any>(Quizreducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        user,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export function useQuiz() {
  return useContext(QuizContext);
}
