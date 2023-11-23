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
      quantity: { type: Number, default: 1 },
    },
  ],
  address: { type: String },
  postalCode: { type: String },
  email: { type: String },
  paymentMethod: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
