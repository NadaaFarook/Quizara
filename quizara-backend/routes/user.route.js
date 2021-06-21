const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { User } = require('../models/users.model.js')
const {Product } = require('../models/products.model.js')

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
      const user = await User.findOne({ _id: userId }).populate("cart").populate('address')
      
      res.json({ success: true, user })
    } catch (err) {
      res.json({ success: false, err: err.message })
    }
  })


//   router.route('/:userId/address')
//   .get(async(req,res)=>{
//     const {userId} = req.params
// try{
// const user = await User.findOne({_id : userId}).populate('address')

// res.json({success : true , user})
// }catch(err){
//   res.json({err : err.message})
// }
// })




module.exports = router