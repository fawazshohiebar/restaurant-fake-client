const mongoose = require("mongoose");



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Connected: ${conn.connection.host}`.underline.blue.bold);
  } catch (error) {
    console.log("error ",error);
    process.exit(1);
  }
};

module.exports= connectDB;
