const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: String,
    url: String,
    dataUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
