//create, show by id,
const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");

module.exports.createOrder = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
    const cartId = req.params.cartId; // Assuming the cart ID is passed as a route parameter

    // Find the user's cart
    const cart = await Cart.findOne({ _id: cartId, user: userId }).populate(
      "items.tshirt"
    );

    // Calculate the total amount of the order based on the items in the cart
    const total = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.tshirt.price;
    }, 0);

    // Create a new order object
    const newOrder = new Order({
      user: userId,
      total,
      paymentSuccess: true,
      items: cart.items.map((item) => {
        return {
          tshirt: item.tshirt._id,
          quantity: item.quantity,
        };
      }),
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Clear the user's cart after creating the order
    cart.items = [];
    await cart.save();

    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the order" });
  }
};

module.exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

    // Find all the orders associated with the user
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.tshirt");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the orders" });
  }
};
