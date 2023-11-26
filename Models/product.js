const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
  },
  images: [],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  colors: {
    type: String,
    required: [true, "Please Enter Product color"],
  },
  sizes: {
    type: String,
    required: [true, "Please Enter Product size"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
