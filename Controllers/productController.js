const User = require("../Models/user");
const Product = require("../Models/product");
const Order = require("../Models/order");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      let products = await Product.find();
      res.status(200).json({
        message: "Berhasil mendapatkan product",
        products,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal Melihat All Product",
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.productId;
      const data = await Product.findById(id);
      res.status(200).json({
        message: "Berhasil mendapatkan product by id",
        data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      let data = req.body;
      await Product.create(data);
      res.status(200).json({
        message: "Berhasil membuat data product",
        data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  editProductById: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          new: true,
        }
      );
      if (product) {
        res.status(200).json({
          message: "Berhasil mengedit data product",
          data: product,
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteProductById: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.productId);
      if (product) {
        res.status(200).json({
          message: "Berhasil menghapus data product by id",
          product,
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProductsByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const products = await Product.find({ category });

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
