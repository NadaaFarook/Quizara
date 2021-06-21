const mongoose  = require("mongoose")
const  {Schema} = mongoose

const ProductSchema = new mongoose.Schema({
 
   name: {
     type : String,
     required : [true , 'Product Name is not given.']
   },
   price : {
     type : Number , 
     required : [true , 'Product Price is not given.']
   },
   includeOutOfStock : {
     type : Boolean ,
     required : [true , 'Product Stock Info is not given.']
   },
   recommended : {
     type : Boolean ,
     required : [true , 'Product Recommendation is not given.']
   },
   rating : {
     type : Number , 
     required : true,
   } ,
   description : {
     type : String ,
     min : [30 , 'Description is less than 30 characters'],max : [100 , 'Description is more than 100 characters'] , 
     required : [true , 'Product Description is not given']
   },
   image : {
     type:String
   } ,
   discount : {
     type : Number
   }

   
},
{timestamps:true} );


const Product = mongoose.model("Product", ProductSchema);


module.exports = { Product }