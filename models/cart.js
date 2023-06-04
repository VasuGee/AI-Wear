const mongoose = require("mongoose");
const User = require("./user");
const Tshirt = require("./tshirt");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      tshirt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tshirt",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
