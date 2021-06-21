const express = require("express");
const router = express.Router();
const mongoose  = require("mongoose")
const {extend} = require("lodash")
const { Address } = require('../models/address.model.js')
const {User} = require('../models/users.model.js')


const authUser = async (req, res, next) => {
  const { productId, userId } = req.params
  try { 
    const user = await User.findById(userId) 
      next()
  }
  catch {
    res.json({success : false , error: "Invalid user id" })
  }
}

router.use('/:userId', authUser)
router.route("/:userId")
.post(async(req , res) =>{
   const { userId } = req.params
  const address = req.body
  try{
  
  const  Addresses = await Address.findOne({ userId })
  const addressArray = Addresses.addresses
  const updatedaddressArray = [...addressArray , address]

  let updatedAddress = extend(Addresses , {...Addresses , addresses : updatedaddressArray}) 
  console.log(updatedAddress)
  updatedAddress =  await updatedAddress.save()
 res.json({success : true ,updatedAddress})}
 catch(err){
   res.json({success : false,err : err.message})
 }
})


router.route("/:userId/:addressId")
.delete(async(req , res)=>{
const  {userId  , addressId} = req.params 
try{
const Addresses = await Address.findOne({ userId })
let updateAddress = Addresses.addresses.filter(e => e._id != addressId)

let updatedAddress ={...Addresses , addresses : updateAddress }
 updatedAddress = extend(Addresses  , updatedAddress)
 updatedAddress = await updatedAddress.save()
res.json({success : true , updatedAddress})
}
catch(err){
  res.json({success : false ,err : err.message})
}
})
// /add address
// /view all address 
// /delete an address

module.exports = router