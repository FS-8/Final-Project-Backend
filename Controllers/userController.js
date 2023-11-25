const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(200).json({
        message: "Berhasil membuat data user",
        data: user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign(
            { id: user._id, email: user.email },
            "domainExpansion"
          );
          res.status(200).json({
            message: "Login Successfully",
            name: user.name,
            userId: user._id,
            token,
          });
        } else {
          res.status(401).json({ error: "Password salah" });
        }
      } else {
        res.status(401).json({ error: "User Tidak Ditemukan" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  editUser: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const updateFields = { name, email };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      if (updatedUser) {
        res
          .status(200)
          .json({ message: "User updated successfully", data: updatedUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Menambah product ke keranjang
  addProductToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      // Validasi userId dan productId
      const user = await User.findById(userId);
      const product = await Product.findById(productId);

      if (!user || !product) {
        return res.status(404).json({ error: "User or product not found" });
      }

      // Tambah product ke keranjang atau update quantity jika sudah ada
      const existingProduct = user.cart.find((item) =>
        item.product.equals(productId)
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart.push({ product: productId, quantity });
      }

      await user.save();
      res
        .status(201)
        .json({ message: "Product added to cart successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Mendapatkan list keranjang
  getListCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate("cart.product");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user.cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Menghapus product dari keranjang
  deleteProductFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.cart = user.cart.filter((item) => !item.product.equals(productId));
      await user.save();

      res
        .status(200)
        .json({ message: "Product removed from cart successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // User Melakukan Checkout
  userCheckout: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate("cart.product");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Buat order baru
      const newOrder = new Order({
        user: userId,
        products: user.cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        address: user.address,
        postalCode: user.postalCode,
        email: user.email,
        paymentMethod: req.body.paymentMethod,
        // tambahkan properti lain sesuai kebutuhan
      });

      // Kosongkan keranjang setelah checkout
      user.cart = [];
      await Promise.all([newOrder.save(), user.save()]);

      res.status(201).json({ message: "Checkout successful", order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
