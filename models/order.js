const mongoose = require("mongoose");
const User = require("./user");
const Tshirt = require("./tshirt");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentSuccess: {
    type: Boolean,
    default: false,
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
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
