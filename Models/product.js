const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    harga: {
      type: Number,
      required: [true, "Please Enter product Price"]
    },
    images: [
      {
        img1: {
          type: String,
          required: true,
        },
        img2: {
          type: String,
          required: true,
        },
        img3: {
          type: String,
          required: true,
        }
      },
    ],
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });
  
  module.exports = mongoose.model("Product", productSchema);