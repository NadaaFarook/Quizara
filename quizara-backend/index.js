const express = require("express");
const cors = require("cors");
const { initializeDBConnection } = require("./db.connect.js");
const quiz = require("./routes/quiz.route.js");
const user = require("./routes/user.route.js");
const leaderboard = require("./routes/leaderboard.js");
const app = express();
express.json();
app.use(cors());
require("dotenv").config();

const PORT = 3000;

initializeDBConnection();
app.use("/api/quiz", quiz);
app.use("/api/user", user);
app.use("/api/score", leaderboard);
app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, error: "No such route found" });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
