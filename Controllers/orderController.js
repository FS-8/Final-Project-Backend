const Order = require("../Models/order");

module.exports = {
  // Menampilkan semua orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Menampilkan order berdasarkan ID
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Menampilkan order berdasarkan user ID
  gerOrderByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId });

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createOrder: async (req, res) => {
    try {
      const { userId, products } = req.body;

      // Pastikan userId dan products tersedia dalam request body
      if (!userId || !products || products.length === 0) {
        return res.status(400).json({ message: "Invalid request body" });
      }

      // Buat objek order baru
      const newOrder = new Order({
        user: userId,
        products,
      });

      // Simpan order ke database
      await newOrder.save();

      return res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
