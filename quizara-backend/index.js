const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const products = require('./routes/products.route.js')
const cart = require('./routes/cart.js')
const address = require('./routes/addresses.route.js')
const users = require('./routes/users.route.js')
const user = require('./routes/user.route.js')
const mongoose = require("mongoose")
const { User } = require('./models/users.model.js')
const { initializeDBConnection } = require('./db/db.connect.js')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

initializeDBConnection()

app.use('/cart', cart)
app.use('/products', products)
app.use('/users', users)
app.use('/user' , user)
app.use('/address' , address)
app.get('/', (req, res) => {
  res.json({ response: 'Hello World' })
})



/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found on server, please check" })
})





const PORT = 3000
app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});
