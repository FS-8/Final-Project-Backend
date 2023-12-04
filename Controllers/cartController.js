const Cart = require("../Models/cart");

module.exports = {
  // Menampilkan semua orders
  addToCart: async (req, res) => {
    try {
      const {
        userId,
        productId,
        quantity,
        price,
        selectedColor,
        selectedSize,
      } = req.body;

      // Cek apakah keranjang sudah ada untuk user ini
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        // Jika belum ada, buat keranjang baru
        cart = await Cart.create({ user: userId, products: [] });
      }

      // Cek apakah produk sudah ada di keranjang
      const existingProduct = cart.products.find(
        (product) => product.product.toString() === productId
      );

      if (existingProduct) {
        // Produk sudah ada, tinggal update kuantitas
        existingProduct.quantity += quantity;
      } else {
        // Produk belum ada, tambahkan ke dalam keranjang
        cart.products.push({
          product: productId,
          quantity,
          price,
          selectedColor,
          selectedSize,
        });
      }

      // Simpan perubahan
      await cart.save();

      return res
        .status(201)
        .json({ message: "Produk ditambahkan ke keranjang" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
  // Menampilkan order berdasarkan ID
  getCartByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ user: userId }).populate(
        "products.product"
      );

      if (!cart) {
        return res.status(404).json({ message: "Keranjang tidak ditemukan" });
      }

      return res.json(cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
  // Menampilkan order berdasarkan user ID
  removeCartByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOneAndRemove({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Keranjang tidak ditemukan" });
      }

      return res.json({ message: "Keranjang berhasil dihapus" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
  incrementDecrementQuantity: async (req, res) => {
    try {
      const { userId, productId, quantityChange } = req.body;
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Keranjang tidak ditemukan" });
      }

      // Cari produk dalam keranjang
      const product = cart.products.find(
        (product) => product.product.toString() === productId
      );

      if (!product) {
        return res
          .status(404)
          .json({ message: "Produk tidak ditemukan dalam keranjang" });
      }

      // Mengubah kuantitas
      product.quantity += quantityChange;

      // Jika kuantitas menjadi 0, hapus produk dari keranjang
      if (product.quantity <= 0) {
        cart.products = cart.products.filter(
          (p) => p.product.toString() !== productId
        );
      }

      // Simpan perubahan
      await cart.save();

      return res.json({ message: "Kuantitas produk diperbarui" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
  getTotalPriceByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ user: userId }).populate(
        "products.product"
      );

      if (!cart) {
        return res.status(404).json({ message: "Keranjang tidak ditemukan" });
      }

      // Menghitung total harga
      const totalPrice = cart.products.reduce((total, product) => {
        return total + product.quantity * product.price;
      }, 0);

      return res.json({ totalPrice });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
};
