import React from "react";
import { useQuiz } from "../../context/QuizContext";
import { Questions } from "../../types/Quiz.types";
import "./result.css";
const Result = () => {
  const {
    state: {
      totalScore,
      quiz: {  questions },
    },
  } = useQuiz();
  return (
    <div className="Result">
      <h1>Result</h1>
      <h3>
        {totalScore < 5 ? `Maybe try again ? ${totalScore} ponts is too less` : `Supperb!! You scored ${totalScore} points`}
      </h3>

      {questions.map((question: Questions) => {
        return (
          <div>
            <h2>{question.question}</h2>
            <div className="buttons">
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
          </div>
        );
      })}
    </div>
  );
};
export default Result;
