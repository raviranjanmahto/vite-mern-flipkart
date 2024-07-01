const Product = require("../model/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  if (products?.length === 0)
    return next(new AppError("Products not found", 404));

  res.status(200).json({ status: "success", products });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) return next(new AppError("Product not found", 404));
  res.status(200).json({ status: "success", product });
});
