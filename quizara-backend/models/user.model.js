const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name not provided",
    },
    email: {
      type: String,
      required: "Email not provided",
    },
    password: {
      type: String,
      required: "Name not provided",
    },
    gamesPlayed: [
      {
        name: String,
        totalScore: Number,
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = { User };
