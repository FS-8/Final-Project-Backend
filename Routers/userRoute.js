const express = require("express");
const {
  register,
  login,
  editUser,
  addProductToCart,
  getListCart,
  deleteProductFromCart,
  userCheckout,
} = require("../Controllers/userController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/:userId", editUser);
route.post("/cart/", addProductToCart);
route.get("/cart/:userId", getListCart);
route.delete("/cart/:userid/:productId", deleteProductFromCart);
route.post("/checkout/:userId", userCheckout);

module.exports = route;
