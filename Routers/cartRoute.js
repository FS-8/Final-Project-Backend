const express = require("express");
const {
  addToCart,
  getCartByUserId,
  removeCartByUserId,
  incrementDecrementQuantity,
  getTotalPriceByUserId,
} = require("../Controllers/cartController");
const route = express.Router();

route.post("/addCart", addToCart);
route.get("/:userId", getCartByUserId);
route.delete("/removeCart/:userId", removeCartByUserId);
route.patch("/update", incrementDecrementQuantity);
route.get("/total", getTotalPriceByUserId);

module.exports = route;
