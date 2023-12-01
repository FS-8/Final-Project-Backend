const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String }, // Tambahkan properti pemilihan warna
      quantity: { type: Number, default: 1 },
      price: { type: Number },
      selectedColor: { type: String }, // Tambahkan properti pemilihan warna
      selectedSize: { type: String }, // Tambahkan properti pemilihan ukuran
    },
  ],
  paymentMethod: { type: String }, // Tambahkan properti pemilihan ukuran
  // tambahkan properti lain sesuai kebutuhan
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
