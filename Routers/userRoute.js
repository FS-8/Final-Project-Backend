const express = require("express");
const {
  register,
  login,
  editUser,
  addProductToCart,
  getListCart,
  deleteProductFromCart,
  userCheckout,
  getAllUser,
  getUserById,
} = require("../Controllers/userController");
const verifyToken = require("../Middleware/jwtToken");
const route = express.Router();

route.get("/", getAllUser);
route.get("/:userId", getUserById);

route.post("/register", register);
route.post("/login", login);

route.put("/:userId", editUser);

route.post("/cart", verifyToken, addProductToCart);
route.get("/cart/:userId", getListCart);
route.delete("/cart/:userid/:productId", deleteProductFromCart);

route.post("/checkout/:userId", userCheckout);

module.exports = route;
