const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendCookieToken = require("../utils/cookieToken");

exports.signup = catchAsync(async (req, res, next) => {
  const { email, fName, lName, password } = req.body;
  if (!email || !fName || !password)
    return next(new AppError("All fields are required!"));

  const exUser = await User.findOne({ email });
  if (exUser)
    return next(new AppError("Email already in use, Please login.", 400));
  const user = await User.create({ fName, lName, email, password });

  // Send JWT token with user info
  sendCookieToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("All fields are required!"));

  // Find user by email (assuming unique email)
  const user = await User.findOne({ email }).select("+password");

  // Check if user exists and password is correct
  if (!user || !(await user.comparePassword(password)))
    return next(new AppError("Invalid email or password!", 401));

  // Send JWT token with user info
  sendCookieToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ status: "success" });
});
