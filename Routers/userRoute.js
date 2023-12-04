const express = require("express");
const {
  register,
  login,
  editUser,
  getListCart,
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

route.get("/cart/:userId", getListCart);

module.exports = route;
