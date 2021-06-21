const mongoose = require("mongoose")


async function  initializeDBConnection(){
  // Connecting to DB

  try{
    await mongoose.connect("mongodb+srv://NadaFarook:nada19@neog-cluster.wbp3g.mongodb.net/inventory?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('Server starting...')
  }catch(error){
      console.log(error)
    }
}
module.exports = { initializeDBConnection }
