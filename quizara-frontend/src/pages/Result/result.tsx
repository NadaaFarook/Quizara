import React from "react";
import { useQuiz } from "../../context/QuizContext";
import { Questions } from "../../types/Quiz.types";
import "./result.css";
const Result = () => {
  const {
    state: {
      totalScore,
      quiz: { name, questions },
    },
  } = useQuiz();
  return (
    <div>
      <h1>Quiz : {name}</h1>
      <h2>TotalScore : {totalScore}</h2>

      {questions.map((question: Questions) => {
        return (
          <div>
            <p>{question.question}</p>
            {question.options.map((option) => {
              return (
                <button
                  className={` ${option.isCorrect && "green"} ${
                    option._id === question.selectedOption &&
                    !option.isCorrect &&
                    "red"
                  }`}
                >
                  {option.option}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Result;
