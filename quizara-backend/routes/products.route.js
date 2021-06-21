const express = require("express");
const router = express.Router();
const mongoose  = require("mongoose")
const { Product } = require('../models/products.model.js')

router.route("/")
.get(async(req,res)=>{
  try
 {
   const products = await Product.find({})
 res.json({success : true , products})
 }
 catch(err)
 {res.json({success : false , error: 'Error in fetching products' ,errorMessage : err.message})}
})
// .post(async(req,res)=>{
//   try{
//      const products = req.body
//     const NewProducts = products.map(async(product) => {
//       const NewProduct = new Product(product)
//       const saveee =  await NewProduct.save()
//     })
//     res.json({success : true , NewProducts})
//   }
//   catch(err){
//     res.json({success : false , error : 'Error in adding a new Product to the database' , error : err.message})
//   }
// })
// .delete((req,res)=>{
  
// })


router.route("/:productId")
.get(async(req , res) =>{
  try{
  const  {productId} = req.params
  const product = await Product.findById(productId)
  res.json({success : true , product})
  }
  catch(err){
    res.json({success : false ,error : err.message})
  }
})

// router.route("/:productId/cart")
module.exports = router