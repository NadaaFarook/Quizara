import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import AxiosCall from "../../services/api-calls";
import { LinearProgress } from "@material-ui/core";
import "./quiz.css";

import { Options, Questions } from "../../types/Quiz.types";
import { useState } from "react";
const Quiz = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    user,
    state: {
      totalScore,
      currentQuestion,
      quiz: { name, questions, _id },
      isOptionsEnabled,
    },
    dispatch,
  } = useQuiz();

  const [progress, setProgress] = useState<number>(
    (100 / questions.length) * (currentQuestion + 1)
  );
  const onOptionsClick = (
    option: Options,
    questions: Questions[],
    currentQuestion: number
  ): void => {
    console.log(option, questions);
    setProgress((100 / questions.length) * (currentQuestion + 1));
    dispatch({
      type: "SELECT_OPTION",
      payload: {
        optionId: option._id,
        currentQuestionId: questions[currentQuestion]._id,
      },
    });
    dispatch({ type: "TOGGLE_IS_OPTIONS_ENABLED" });
    dispatch({
      type: "SCORE",
      payload: {
        score: option.isCorrect
          ? questions[currentQuestion].marks
          : -questions[currentQuestion].negativeMarks,
      },
    });

    if (currentQuestion !== questions.length - 1) {
      setTimeout(() => {
        dispatch({ type: "NEXT" });
        setProgress((100 / questions.length) * (currentQuestion + 1));
        dispatch({ type: "TOGGLE_IS_OPTIONS_ENABLED" });
      }, 2000);
    } else {
      AxiosCall({
        type: "post",
        data: { name, totalScore },
        endpoint: "/api/score",
        token,
      });
      AxiosCall({
        type: "post",
        data: { name: user.name, quizname: name, score: totalScore },
        endpoint: "/api/score/leaderboard",
        token,
      });
      setTimeout(() => {
        navigate(`/quizzes/${_id}/result`);
      }, 2000);
    }
  };
  console.log(isOptionsEnabled);

  console.log(progress, questions.length, currentQuestion);
  return (
    <div className="Quiz">
      <LinearProgress
        className="progress"
        variant="determinate"
        value={progress}
      />

      <div className="quiz-header">
        <p>
          {currentQuestion + 1} / {questions.length}
        </p>{" "}
        <p>Score {totalScore}</p>
      </div>
      <h2>{questions[currentQuestion].question}</h2>
      <div className="buttons">
        {questions[currentQuestion].options.map((option: any) => {
          return (
            <button
              className={` ${isOptionsEnabled && option.isCorrect && "green"} ${
                option._id === questions[currentQuestion].selectedOption &&
                !option.isCorrect &&
                "red"
              }`}
              onClick={() => onOptionsClick(option, questions, currentQuestion)}
            >
              {option.option}
            </button>
          );
        })}
      </div>
      {/* <button
        onClick={() => dispatch({ type: "NEXT", payload: { totalScore: 0 } })}
      >
        SKIP
      </button> */}
    </div>
  );
};
export default Quiz;
