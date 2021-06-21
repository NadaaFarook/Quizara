## Terrerium API

> For login and signup

6-05 
-adding the cart with new user
-adding products in cart 
-increasing quantity of product in cart

7 - Nothing

8 - 05
-decrementing cart items
- deleting product on quantity 0

9-05
-get() for cart items + populate 

## TODO

- setup address model and management

 
 ## just need to check all routes once

GET , /products
GET , /products/:productId

POST , /cart/:userId/:productId , (product added to cart or increase quantity)
DELETE   , /cart/:userId/:productId 
POST , /cart/:userId/:productId/decrement 


POST , /users/signup , req.body {name , email , password}
POST , /users/login , req.body {email , password}

 <!-- GET , /user/:userId/cart   (populate stuff)
 GET , /user/:userId/address  (populate stuff) -->
 GET , /user/:userId   (user detail page)


POST ,  /address/:userId ,  req.body {address credentials} 
DELETE , /address/:userId/:addressId 