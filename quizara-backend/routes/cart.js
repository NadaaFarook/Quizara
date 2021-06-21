const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require('../models/products.model.js');
const { User } = require('../models/users.model.js');
const { Cart } = require('../models/cart.model.js');
const {authUserAndProduct} = require('../controllers/cart.controller.js')
const { extend } = require('lodash');
//middleware to auth userId


router.use('/:userId/:productId', authUserAndProduct)
router.use('/:userId/:productId/decrement', authUserAndProduct)







const authUser = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    next()
  }
  catch {
    res.json({ success: false, error: "Invalid user id" })
  }
}

router.use('/:userId', authUser)

// router.use('/:userId/address' , authUser)
router.route('/:userId')
  .get(async (req, res) => {
    const { userId } = req.params
    try {
      const cart = await Cart.findOne({userId }).populate("products.productId")
      
      res.json({ success: true, cart })
    } catch (err) {
      res.json({ success: false, err: err.message })
    }
  })













router.route('/:userId/:productId')
  
  .post(async (req, res) => {
    try {
      const { productId, userId } = req.params
      const cart = await Cart.findOne({ userId })
      let cartproducts = cart.products
      console.log(cartproducts)
      if (cartproducts.some(( product ) => product.productId == productId)) {
        cartproducts = cartproducts.map(({ productId, _id, quantity }) => productId == req.params.productId ?
          { _id, productId, quantity: quantity + 1 } : { _id,productId, quantity })
      } else {
        cartproducts = [...cartproducts, { productId, quantity: 1 }]
      }
      console.log(cartproducts)
      let updatedCart = { ...cart, products: cartproducts }
      updatedCart = extend(cart, updatedCart)
      updatedCart = await updatedCart.save()
      res.json({ success :true , updatedCart })
    }
    catch (err) {
      res.json({success : false , err: err.message })
    }
  })
  .delete(async(req,res) => {
const { productId, userId } = req.params
try{
  const cart = await Cart.findOne({ userId })
      let cartproducts = cart.products
      cartproducts = cartproducts.filter(e=>e._id != productId)
      let updatedCart = { ...cart, products: cartproducts }
      updatedCart = extend(cart, updatedCart)
      updatedCart = await updatedCart.save()
      res.json({ success : true,updatedCart })
}catch(err){
  res.json({success : false , err: err.message })
}
  })

router.route('/:userId/:productId/decrement')
  .post(async (req, res) => {
    try {
      const { productId, userId } = req.params
      const cart = await Cart.findOne({ userId })
      let cartproducts = cart.products
      console.log(cartproducts, 'ff')
      if (cartproducts.some(({ productId }) => productId == productId)) {
        cartproducts = cartproducts.map(({ productId, _id, quantity }) => {
          if (productId == req.params.productId) {
            if (quantity == 1) {

            } else {
              return { _id, productId, quantity: quantity - 1 }
            }

          } else {
            return { _id, productId, quantity }
          }
        }
        )

      }

      cartproducts = cartproducts.filter(item => item != null)
      let updatedCart = { ...cart, products: cartproducts }
      updatedCart = extend(cart, updatedCart)
      updatedCart = await updatedCart.save()
      res.json({ success : true , updatedCart })
    }
    catch (err) {

      res.json({success : false , err: err.message })
    }
  })






module.exports = router