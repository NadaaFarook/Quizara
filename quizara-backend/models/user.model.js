const mongoose  = require("mongoose")
const  {Schema} = mongoose

const UserSchema = new mongoose.Schema({
      name : {
        type :String ,
        required : 'Name not provided' ,
      },
      email : {
         type :String ,
        required : 'Email not provided'
      },
      password : {
        type :String ,
        required : 'Name not provided' ,
      },
      gamesPlayed : [
        {
          name : String ,
          totalScore : Number ,
          
        }
      ]
}  
  ,
{timestamps:true} );


const User = mongoose.model("User", UserSchema);


module.exports = { User }