const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors')
const { initializeDBConnection } = require
('./db.connect.js')
const quiz = require('./routes/quiz.route.js')
const user = require('./routes/user.route.js')
const leaderboard = require('./routes/leaderboard.js')
const app = express();
app.use(bodyParser.json());
app.use(cors())

const PORT = 3000;

initializeDBConnection()
app.use('/api/quiz', quiz)
app.use('/api/user' , user)
app.use('/api/score' , leaderboard)
app.get('/', (req, res) => {
  res.status(200).json({success : true})
});

app.get('*' , (req , res) =>{
 res.status(404).json({success : false , error : 'No such route found'})
})

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});