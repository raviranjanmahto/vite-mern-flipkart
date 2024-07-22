const NodeCache = require("node-cache");
const myCache = new NodeCache();

const Product = require("../model/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addProduct = catchAsync(async (req, res, next) => {
  const newProduct = new Product({ ...req.body, userId: req.user._id });
  await newProduct.save();

  // delete the cache entry for all products
  myCache.del("products");

  res.status(201).json({ status: "success", product: newProduct });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const cachedProd = myCache.get("products");
  if (cachedProd)
    return res.status(200).json({ status: "success", products: cachedProd });

  const products = await Product.find({}).populate({
    path: "userId", // Field in Product schema that references User
    select: "fName lName", // Fields from the User schema to include
  });

  // Convert Mongoose documents to plain objects
  const plainProducts = products.map(product => product.toObject());

  // cache the products
  myCache.set("products", plainProducts);

  res.status(200).json({ status: "success", products });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const cachedProduct = myCache.get(`product_${id}`);
  if (cachedProduct)
    return res.status(200).json({ status: "success", product: cachedProduct });

  const product = await Product.findById(id).populate({
    path: "userId",
    select: "fName lName",
  });
  if (!product) return next(new AppError("Product not found", 404));

  // Convert Mongoose document to plain object
  const plainProduct = product.toObject();

  // cache the product
  myCache.set(`product_${id}`, plainProduct);

  res.status(200).json({ status: "success", product });
});

exports.deleteProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return next(new AppError("Product not found", 404));

  // delete the cache entry for the product
  myCache.del(`product_${id}`);
  myCache.del("products"); // Invalidate the products list cache

  res.status(200).json({ status: "success", data: null });
});

exports.updateProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return next(new AppError("Product not found", 404));

  // Convert Mongoose document to plain object
  const plainProduct = product.toObject();

  // update the cache entry for the product
  myCache.set(`product_${id}`, plainProduct);
  myCache.del("products"); // Invalidate the products list cache

  res.status(200).json({ status: "success", product });
});
