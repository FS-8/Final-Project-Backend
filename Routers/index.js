const express = require("express");
const route = express.Router();

const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");

// route default
route.get("/", (req, res) => {
  res.json("ini dari express mongoose default");
});

route.use("/users", userRoute);
route.use("/products", productRoute);
route.use("/orders", orderRoute);
route.use("/carts", cartRoute);

module.exports = route;
