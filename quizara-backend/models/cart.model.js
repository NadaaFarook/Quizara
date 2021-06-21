const mongoose = require("mongoose")
const { Schema } = mongoose

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
},
  { timestamps: true });


const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart }