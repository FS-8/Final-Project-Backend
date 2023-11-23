const express = require("express");
const {
  getAllProduct,
  getProductById,
  createProduct,
  editProductById,
  deleteProductById,
  getProductsByCategory,
} = require("../Controllers/productController");

const route = express.Router();

route.get("/", getAllProduct);
route.get("/:productId", getProductById);
route.post("/", createProduct);
route.put("/:productId", editProductById);
route.delete("/category/:category", getProductsByCategory);
route.delete("/:productId", deleteProductById);

module.exports = route;
