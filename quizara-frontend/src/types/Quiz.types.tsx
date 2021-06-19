type Quizzes = {
  quizes: Quiz[];
};
type Quiz = {
  name?: string;
  questions?: Questions[];
};
type Questions = {
  _id: string;
  question: string;
  marks: number;
  options: Options[];
  negativeMarks: number;
  selectedOption?: "";
};
type Options = {
  _id: string;
  option: string;
  isCorrect: boolean;
};
type Action = {
  type: string;
  payload: {
    score: number;
    quiz: Quiz;
    [key: string]: any;
  };
};
type InitialState = {
  user: any;
  allQuiz?: Quiz[];
  currentQuestion: number;
  totalScore: number;
  quiz?: Quiz;
  isOptionsEnabled: boolean;
};
type Token = string | null
type Error = string | null
export const foo = "foo";
export type { Quizzes, Error , Token ,  Options, Quiz, Action, InitialState, Questions };
