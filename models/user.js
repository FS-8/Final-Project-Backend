const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  address: { type: String },
  phone: { type: String },
  kodePos: { type: String },
  email: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
