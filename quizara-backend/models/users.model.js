const mongoose  = require("mongoose")
const  {Schema} = mongoose

const UserSchema = new mongoose.Schema({
 
   name: {
     type : String,
     required : [true , 'User Name is not given.']
   },
   email : {
     type : String ,
     required : [true , 'Give Email'],
     unique : "This email is already registered. Maybe try to login "
   },
   password: {
     type : String,
     required : [true , "Enter Password"]
   } , 
   cart : {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Cart"
   },
   address : {
     type : mongoose.Schema.Types.ObjectId,
     ref:"Address"
   },
   

},
{timestamps:true} );


const User = mongoose.model("User", UserSchema);


module.exports = { User }