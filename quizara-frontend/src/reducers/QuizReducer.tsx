import { InitialState, Action, Quiz } from "../types/Quiz.types";


const initialState: InitialState = {
  user: null,
  allQuiz: [],
  currentQuestion: 0,
  totalScore: 0,
  quiz: {} as Quiz,
  isOptionsEnabled: false,
};

const Quizreducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "QUIZ_QUESTIONS":
      return {
        ...state,
        quiz: action.payload.quiz,
      };
    case "SELECT_OPTION":
      const { optionId, currentQuestionId } = action.payload;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: state.quiz?.questions?.map((question) =>
            question._id === currentQuestionId
              ? { ...question, selectedOption: optionId }
              : question
          ),
        },
      };


      // width: 70%;
      // padding: 1rem;
      // margin: 0.5rem;


    case "TOGGLE_ISOPTIONSENABLED":
      return {
        ...state,
        isOptionsEnabled: !state.isOptionsEnabled,
      };
    case "NEXT":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };

    case "SCORE":
      return {
        ...state,
        totalScore: state.totalScore + action.payload.score,
      };
  }
};

//const [state, dispatch] = useReducer(Quizreducer, initialState);
export { Quizreducer, initialState };
