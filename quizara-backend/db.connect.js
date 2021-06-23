const mongoose = require("mongoose");

async function initializeDBConnection() {
  // Connecting to DB

  try {
    await mongoose.connect(process.env.DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Server starting...");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { initializeDBConnection };
