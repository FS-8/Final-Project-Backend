const express = require("express");

const route = express.Router();
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");

route.get("/", (req, res) => {
  res.json("ini dari express mongoose");
});
route.use("/users", userRoute);
route.use("/products", productRoute);

module.exports = route;
