const express = require("express");
const {
  getAllOrders,
  getOrderById,
  gerOrderByUserId,
  createOrder,
} = require("../Controllers/orderController");

const route = express.Router();

route.get("/", getAllOrders);
route.get("/:orderId", getOrderById);
route.get("/user/:userId", gerOrderByUserId);
route.post("/order", createOrder);

module.exports = route;
