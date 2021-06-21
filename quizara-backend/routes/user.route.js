const express = require("express");
const router = express.Router();
const userSchema = require("../utils/joi.validate.js");
const { User } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {verifyToken} = require("../utils/verifyToken")

const env = {
  TOKEN_SECRET : 'abrakadabra'
}



router.route("/signup").post(async (req, res) => {
  const userDetails = req.body;

  const { error } = await userSchema.validate(userDetails);
  if (error)
    return res.json({ success: false, error: error.details[0].message });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.json({
      success: false,
      error: "Email already exist . Please try again",
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(userDetails.password, salt);
  console.log(salt, hashPassword);

  try {
    let user = await new User({ ...userDetails, password: hashPassword });
    user = await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: err.message,
      message:
        "Error in adding user to the database . Please try again after some time",
    });
  }
});

router.route("/login").post(async (req, res) => {
  const userDetails = req.body;

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.json({
      success: false,
      error: "Email doesn't exist  . Please signup",
    });

  const validate = await bcrypt.compare(userDetails.password, user.password);

  if (!validate)
    return res
      .status(401)
      .json({ success: false, message: "Wrong password.Please try again" });
const token = await jwt.sign({_id: user._id} , env.TOKEN_SECRET)
  res.status(200).json({ success: true, user: user._id , token});
  console.log(res, req , res.header)
});



router.route("/")
.get(verifyToken ,async (req , res) =>{
const { _id } = req.user;
try{
  const user = await User.find({_id})
  console.log(user)
res.json({success : true , user : {name: user[0].name , email : user[0].email}})
}catch{
  res.json({ err: err.message });
}
  
})

module.exports = router;

