const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LeaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    quizname: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

const Leaderboard = model("Leaderboard", LeaderboardSchema);

module.exports = { Leaderboard };
