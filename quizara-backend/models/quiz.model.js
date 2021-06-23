const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuizSchema = new Schema(
  {
    name: { type: String, required: true },
    totalScore: { type: Number, required: true },
    questions: [
      {
        question: { type: String, required: true },
        marks: { type: Number, required: true },
        negativeMarks: { type: Number, required: true },
        options: [
          {
            option: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Quiz = model("Quiz", QuizSchema);

module.exports = { Quiz };
