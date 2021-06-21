const mongoose  = require("mongoose")
const  {Schema} = mongoose

const QuizSchema = new mongoose.Schema({
      name:  String,
      totalScore : Number ,
      questions: [{
          question: String,
          marks: Number,
          negativeMarks : Number ,
          options: [{
              option: String,
              isCorrect: Boolean
            }]
        }]  
      }
  ,
{timestamps:true} );


const Quiz = mongoose.model("Quiz", QuizSchema);


module.exports = { Quiz }