import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import AxiosCall from "../../services/api-calls";
//import { LinearProgress } from "@material-ui/core";
import "./quiz.css";
//import { useEffect } from "react";
import { Options, Questions } from "../../types/Quiz.types";
const Quiz = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    user,
    state: {
      totalScore,
      currentQuestion,
      quiz: { name, questions },
      isOptionsEnabled,
    },
    dispatch,
  } = useQuiz();
  const onOptionsClick = (
    option: Options,
    questions: Questions[],
    currentQuestion: number
  ): void => {
    console.log(option , questions)
    dispatch({
      type: "SELECT_OPTION",
      payload: {
        optionId: option._id,
        currentQuestionId: questions[currentQuestion]._id,
      },
    });
    dispatch({ type: "TOGGLE_ISOPTIONSENABLED" });
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
        dispatch({ type: "TOGGLE_ISOPTIONSENABLED" });
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
        navigate("/quizzes/:quizId/result");
      }, 2000);
    }
  };
 // const progressValue = (100 / questions.length) * currentQuestion;
console.log(isOptionsEnabled)
  return (
    <div>
      {/* <LinearProgress value={progressValue} /> */}
      <h5>Score {totalScore}</h5>
      <h1>{name}</h1>
      <p>{questions[currentQuestion].question}</p>
      <div className="buttons">
      {questions[currentQuestion].options.map((option: any) => {
    
        return (
          <button
          className={` ${ isOptionsEnabled && option.isCorrect  && "green"} ${
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
      <button
        onClick={() => dispatch({ type: "NEXT", payload: { totalScore: 0 } })}
      >
        SKIP
      </button>
    </div>
  );
};
export default Quiz;
