const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Quiz } = require('../models/quiz.model.js');
const { Leaderboard } = require('../models/leaderboard.model.js');
const { verifyToken } = require('../utils/verifyToken.js');
const { User } = require('../models/user.model.js');
const { extend } = require('lodash')


router.route('/')
.post(verifyToken, async (req, res) => {
  console.log(req)
  const { _id } = req.user;
  const { name, totalScore } = req.body;
  console.log(name , totalScore)
  const user = await User.findOne({ _id });
  try {
    const isgamesPlayed = user.gamesPlayed.some(e => e.name == name)

    const updatedGameArray =
      isgamesPlayed ?
        user.gamesPlayed.map(e => e.name == name ? { _id: e._id, name: e.name, totalScore } : e) :
        [...user.gamesPlayed, { name, totalScore }]

    let updatedUser = await extend(user, { ...user, gamesPlayed: updatedGameArray })
    updatedUser = await updatedUser.save()

    res.json({ success: true, updatedUser });
  } catch (err) {
    res.json({ err: err.message });
  }
});


router.route('/leaderboard')
  .get(async (req, res) => {
    try {
      const leaderboard = await Leaderboard.find()
      res.json({ success: true, leaderboard })
    } catch (err) {
      res.json({ err: err.message });
    }
  })
  .post(async (req, res) => {
    const { name, quizname, score } = req.body;
    try {
      const leaderboard = await Leaderboard.find()

     
      // updatedLeaderboard = updatedLeaderboard.sort((a, b) => {
      //   return b.score - a.score;
      // }).slice(0, 3)
     
      const newLeaderboard = await new Leaderboard({name , quizname , score}).save()
 
      res.json({ success: true, newLeaderboard})
    }
    catch (err) {
      res.json({ err: err.message });
    }
  })
module.exports = router;
