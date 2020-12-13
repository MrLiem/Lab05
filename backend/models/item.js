const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  brand: {
    type: String,
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  number: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = { Item };
