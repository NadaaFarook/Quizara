const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { User } = require('../models/users.model.js')
const {Cart } = require('../models/cart.model.js')
const {Address} = require('../models/address.model')
router.route("/signup")
  .post(async (req, res) => {
    const user = req.body
    try {

      
      let newuser = await new User(user).save()
      let newuseraddress = await new Address({userId : newuser._id , addresses : []}).save()
      let newusercart = await new Cart({userId : newuser._id , products : []}).save()
      Newuser = await User.findOneAndUpdate(
   { _id: newuser._id }, 
   { 
             cart : newusercart._id,
             address : newuseraddress._id
           
   })
   console.log(Newuser)
      res.json({ success: true, Newuser })
    } catch (err) {
      res.json({ success: false, err : err.message , error: 'Email already signed Up . Maybe try logging in.' })
    }
  })
router.route("/login")
  .post(async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (user) {
        if (password == user.password) {
          res.json({success: true, user })
        } else {
          res.json({ success : false ,message: "Password does not match" })
        }
      } else {
        return res.json({ success : false ,message: 'Email is not registered' })
      }
    }
    catch (err) {
      res.json({ success : false , error: err.message })
    }
  })

module.exports = router