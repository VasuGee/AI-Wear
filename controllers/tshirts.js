const User = require("../models/user");
const Tshirt = require("../models/tshirt");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwjdp1gmz",
  api_key: "535678378758232",
  api_secret: "r6ND7KJyb79eF9goN98dH9kkcGU",
});

//find by created by
module.exports.index = async (req, res) => {
  const tshirts = await Tshirt.find({}).populate("created_by");
  res.json(tshirts);
};

// Controller function to find and provide all T-shirts created by a specific user
module.exports.getTshirtsByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

    const tshirts = await Tshirt.find({ created_by: userId });

    if (tshirts.length === 0) {
      return res.status(404).json({ error: "No T-shirts found for the user" });
    }

    res.json(tshirts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch T-shirts" });
  }
};

module.exports.showTshirt = async (req, res) => {
  try {
    const tshirtId = req.params.id; // Assuming the T-shirt ID is passed as a route parameter
    const tshirt = await Tshirt.findById(tshirtId).populate("created_by");
    if (!tshirt) {
      return res.status(404).json({ error: "T-shirt not found" });
    }

    res.json(tshirt);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch T-shirt" });
  }
};
//url to cloudinary save
module.exports.createTshirt = async (req, res) => {
  try {
    const { name, price, size, description } = req.body;
    const imageUrl = req.body.imageUrl;
    //const fileStr = req.body.image;
    // Assuming the image file is sent as a base64 string

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "tshirt-images", // Specify the folder where you want to store the images
    });

    // Create a new T-shirt object
    const newTshirt = new Tshirt({
      api_Id,
      name,
      price,
      size,
      image: {
        url: uploadResponse.secure_url,
        filename: uploadResponse.original_filename, //if it doesnt work, just try filename
      },
      description,
      created_by: req.user._id, // Assuming you have user authentication and the user ID is available in the request
    });

    // Save the new T-shirt to the database
    const savedTshirt = await newTshirt.save();

    res.json(savedTshirt);
  } catch (error) {
    res.json({ error: "Failed to create and save the T-shirt" });
  }
};
