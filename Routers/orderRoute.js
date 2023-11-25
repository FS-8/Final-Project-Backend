const express = require("express");
const {
  getAllOrders,
  getOrderById,
  gerOrderByUserId,
} = require("../Controllers/orderController");

const route = express.Router();

route.get("/", getAllOrders);
route.get("/:orderId", getOrderById);
route.get("/user/:userId", gerOrderByUserId);

module.exports = route;
