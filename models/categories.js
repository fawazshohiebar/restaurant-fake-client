const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema({
  resto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  category_name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("categories", categoriesSchema);
