const mongoose = require("mongoose")

const url = "mongodb+srv://NadaFarook:nada19@neog-cluster.wbp3g.mongodb.net/quiz?retryWrites=true&w=majority"
async function  initializeDBConnection(){
  // Connecting to DB

  try{
    await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('Server starting...')
  }catch(error){
      console.log(error)
    }
}
module.exports = { initializeDBConnection }
