const mongoose  = require("mongoose")
const  {Schema} = mongoose

const LeaderboardSchema = new mongoose.Schema({
      name:  String,
      quizname :String,
      score : Number,
      }
  ,
{timestamps:true} );


const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);


module.exports = { Leaderboard }