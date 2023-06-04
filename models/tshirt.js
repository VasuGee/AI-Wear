const mongoose = require("mongoose");
const User = require("./user");

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

const tshirtSchema = new mongoose.Schema({
  api_Id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  image: ImageSchema,
  description: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Tshirt = mongoose.model("Tshirt", tshirtSchema);

module.exports = Tshirt;
