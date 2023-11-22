const Product = require("../Models/product");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();

      res.status(200).json({
        message: "Berhasil mendapatkan product",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal Melihat All Product",
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      res.status(200).json({  
        message: "Berhasil mendapatkan product by id",
        data: product,
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
      });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  },
  editProduct: async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            res.status(200).json({
                message: "Berhasil mengedit data product",
                data: product
              });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({
                message: "Berhasil menghapus data product by id",
                data: product
              });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  },
  deleteAllProduct: async (req, res) => {
    try {
        const product = await Product.deleteMany();
        if (product.deletedCount > 0) {
            res.status(200).json({
                message: "Berhasil menghapus semua data product",
                data: product
              });
        } else {
            res.status(404).json({ message: 'No products to delete' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  },
};
