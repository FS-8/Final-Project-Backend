const express = require("express");
const { getAllProduct, getProductById, createProduct, deleteProduct, deleteAllProduct, editProduct } = require("../controllers/productController");

const route = express.Router();

route.get("/", getAllProduct);
route.get("/:id", getProductById);
route.post("/", createProduct);
route.delete("/:id", deleteProduct);
route.delete("/", deleteAllProduct);
route.put("/:id", editProduct);

module.exports = route;
