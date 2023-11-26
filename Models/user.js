const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
      selectedColor: { type: String }, // Tambahkan properti pemilihan warna
      selectedSize: { type: String }, // Tambahkan properti pemilihan ukuran
    },
  ],
  country: { type: String },
  phone: { type: String },
  address: { type: String },
  kodePos: { type: String },
  email: { type: String },
  // tambahkan properti lain sesuai kebutuhan
});
const User = mongoose.model("User", userSchema);

module.exports = User;
