require("dotenv").config();
const User = require("../Models/user");
const Product = require("../Models/product");
const Order = require("../Models/order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, country, phone, city, address, kodePos } =
        req.body;

      // Hash password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Buat objek user baru dengan password yang sudah di-hash
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        country,
        phone,
        city,
        address,
        kodePos,
      });

      // Simpan user ke database
      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
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
            process.env.JWT_KEY
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
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).json({
        message: "Berhasil mendapatkan user",
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal Melihat All User",
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.userId;
      const user = await User.findById(id);
      res.status(200).json({
        message: "Berhasil mendapatkan user by id",
        user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  editUser: async (req, res) => {
    try {
      const userId = req.params.userId; // Ambil ID user dari parameter URL
      const updatedUserData = req.body;

      // Hash password jika ada perubahan password
      if (updatedUserData.password) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
      }

      // Temukan dan update user berdasarkan ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
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
};
