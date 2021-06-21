const { User } = require('../models/users.model.js');

const { Product } = require('../models/products.model.js');
const authUserAndProduct = async (req, res, next) => {
  const {userId ,productId } = req.params
  try { 
    const user = await User.findById(userId) 
    try {
      const product = await Product.findById(productId)
      next()
    }
    catch{
      res.json({error : "Invalid product id"})
    }

  }
  catch(err) {
    res.json({ error: "Invalid user id"  , message : err.message})
  }


}

module.exports = {authUserAndProduct}