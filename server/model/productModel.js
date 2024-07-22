const mongoose = require("mongoose");
const User = require("./userModel");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    id: { type: String, required: true },
    url: { type: String, required: true },
    dataUrl: { type: String, required: true },
    title: {
      shortTitle: { type: String, required: true },
      longTitle: { type: String, required: true },
    },
    price: {
      mrp: { type: Number, required: true },
      cost: { type: Number, required: true },
      discount: { type: String, required: true },
    },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: String, required: true },
    tagline: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Only find active products
productSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Virtual to hide certain fields when converting to JSON
productSchema.methods.toJSON = function () {
  const productObject = this.toObject();
  delete productObject.active;
  delete productObject.__v;
  return productObject;
};

module.exports = mongoose.model("Product", productSchema);
