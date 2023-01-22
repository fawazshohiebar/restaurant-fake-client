const mongoose = require("mongoose");
const restaurantschema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  restaurant_name: {
    type: String,
    require: true,
  },
  is_disabled: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("resto", restaurantschema);
