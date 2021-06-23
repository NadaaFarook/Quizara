const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Quiz } = require("../models/quiz.model.js");
const { verifyToken } = require("../utils/verifyToken.js");
router
  .route("/")
  .get(verifyToken, async (req, res) => {
    try {
      const quiz = await Quiz.find({});
      res.json({ success: true, quiz });
    } catch (err) {
      res.json({ success: false, error: "Error in fetching Quiz" });
    }
  })
  .post(async (req, res) => {
    try {
      const quizData = req.body;
      let quiz = new Quiz(quizData);
      quiz = await quiz.save();
      res.json({ success: true, quiz });
    } catch (err) {
      res.json({
        success: false,
        error: "Error in adding a new Quiz to the database",
        error: err.message,
      });
    }
  });

router.route("/:quizId").get(async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId);
    res.json({ success: true, quiz });
  } catch (err) {
    res.json({
      success: false,
      error: "Error in fetching quiz with id " + quizId,
    });
  }
});

module.exports = router;
