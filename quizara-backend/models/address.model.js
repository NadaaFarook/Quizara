const mongoose = require("mongoose")
const { Schema } = mongoose

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  addresses: [
    {
      name:{
                type:String,
                required:true,
            },
            number:{
                type:Number,
                required:true
            },
            address:{
                type:String,
            },
            city:{
                type:String,
            },
            state:{
                type:String,
                required:true,
            },
            pincode:{
                type:Number,
                required:true,
            }
    }
  ]
},
  { timestamps: true });


const Address = mongoose.model("Address", AddressSchema);
module.exports = { Address }