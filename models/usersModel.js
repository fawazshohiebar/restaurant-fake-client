const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"please add a username "]
  },
  password: {
    type: String,
    required: [true,"please add your password"]
  },
  role: {
    type: String,
    required: [true,"please add a role "]
  },
});

module.exports = mongoose.model("Users", userschema);
