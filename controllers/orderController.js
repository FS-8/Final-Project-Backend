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
};
