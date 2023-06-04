//add to cart. remove, show cart
// req.params are the parameters that are passed in the URL (e.g. /users/:id)
//req.body are the parameters that are passed in the request body (e.g. when using a form)
const Cart = require("../models/cart"); // Replace with the actual path to your Cart model

module.exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
    const tshirtId = req.body.tshirtId; // Assuming the tshirt ID is passed in the request body
    const quantity = req.body.quantity || 1; // Default quantity is set to 1 if not provided in the request body

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) =>
      item.tshirt.equals(tshirtId)
    );

    if (existingItem) {
      // If the item already exists, update the quantity
      existingItem.quantity = quantity;
    } else {
      // If the item doesn't exist, add it to the cart with the specified quantity
      cart.items.push({ tshirt: tshirtId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

module.exports.deleteItemFromCart = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
    const itemId = req.params.itemId; // Assuming the item ID is passed as a route parameter

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex((item) => item._id.equals(itemId));

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item from cart" });
  }
};
