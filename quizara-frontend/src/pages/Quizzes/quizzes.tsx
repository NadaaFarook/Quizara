import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import AxiosCall from "../../services/api-calls";
import './quizzes.css'
const Quizzes = () => {
  const { token } = useAuth();
  const { dispatch } = useQuiz();
  const [quizzes, setQuizzes] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await AxiosCall({
        type: "get",
        endpoint: "/api/quiz",
        token,
      });

      if (response.success === true) {
        setQuizzes(response.quiz);
      } else {
        setError(response.error);
      }
    })();
  }, [token]);
  return (
    <div>
      <h1>Quizzes</h1>
      {error !== null ? (
        <p>{error}</p>
      ) : (
        quizzes !== null &&
        quizzes.map((quiz: any) => {
          return (
            <div className="quiz-wrapper">
              <Link
                to="/quizzes/1234"
                onClick={() =>
                  dispatch({ type: "QUIZ_QUESTIONS", payload: { quiz } })
                }
              >
                <h1>{quiz.name}</h1>

                <p>Total Score : {quiz.totalScore}</p>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Quizzes;
