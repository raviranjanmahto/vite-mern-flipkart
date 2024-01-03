const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { email, fName, lName, password } = req.body;
  const exUser = await User.findOne({ email });
  if (!email || !fName || !password)
    return next(new AppError("All fields are required!"));

  if (exUser)
    return next(new AppError("Email already in use, Please login.", 400));
  const user = await User.create({ fName, lName, email, password });
  user.password = undefined;
  res.status(201).json({ status: "success", user });
});
