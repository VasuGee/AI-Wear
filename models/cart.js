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
        default: 0,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
