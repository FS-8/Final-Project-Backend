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
      const { user, products, paymentMethod } = req.body;

      // Validasi input
      if (!user || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Invalid request body" });
      }

      // Validasi setiap produk dalam array
      for (const product of products) {
        if (!product.product || !product.quantity || !product.price) {
          return res
            .status(400)
            .json({ message: "Invalid product details in the request body" });
        }
      }

      // Buat objek order baru
      const newOrder = new Order({
        user,
        products,
        paymentMethod,
        // tambahkan properti lain sesuai kebutuhan
      });

      // Simpan order ke database
      await newOrder.save();

      res.status(201).json({ message: "Order created successfully", newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
