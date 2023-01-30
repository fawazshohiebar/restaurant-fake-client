const mongoose = require("mongoose");
const itemschema = new mongoose.Schema({
  cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  item_name: {
    type: String,
    require: true,
  },
  item_description: {
    type: String,
    require: true,
  },

  item_price: {
    type: Number,
    require: true,
  },

  item_tags: Array,
});

module.exports = mongoose.model("Items", itemschema);
