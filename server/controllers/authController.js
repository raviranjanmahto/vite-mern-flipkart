const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendCookieToken = require("../utils/cookieToken");
const Email = require("../utils/sendEmail");

exports.signup = catchAsync(async (req, res, next) => {
  const { email, fName, lName, password } = req.body;
  if (!email || !fName || !password)
    return next(new AppError("All fields are required!"));

  const exUser = await User.findOne({ email });
  if (exUser)
    return next(new AppError("Email already in use, Please login.", 400));
  const user = await User.create({ fName, lName, email, password });

  // Generate email verification token
  const resetToken = user.createToken("emailVerification");
  await user.save({ validateBeforeSave: false });

  // Generate email verification URL (assuming you have a token)
  const verificationURL = `${req.protocol}://${req.get(
    "host"
  )}/verify-email/${resetToken}`;

  // Send a welcome email
  try {
    await new Email(user, verificationURL).sendWelcome();
  } catch (error) {
    // Clean up the created user if email sending fails
    await User.findByIdAndDelete(user._id);

    return next(
      new AppError("Error sending welcome email. Please try again later.", 500)
    );
  }

  // Send JWT token with user info
  sendCookieToken(user, 201, res);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  // Verify token
  const user = await User.findOne({
    emailVerificationToken: req.params.token,
    emailVerificationExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  // Set new password
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();
  res.status(200).json({ status: "success", message: "Email verified!" });
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

exports.delete = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false });
  if (!user) return next(new AppError("User not found!", 404));
  res.status(200).json({ status: "success", data: null });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { fName, lName, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { fName, lName, email },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: "success", data: user });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ status: "success", user });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Please provide an email!", 400));
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("No user found with that email!", 404));

  // Generate a password reset token
  const resetToken = user.createToken("passwordReset");
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  // Send email with reset URL
  try {
    // Create instance of Email class and send password reset email
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Hash the token to match with the hashed token stored in DB
  const { newPassword, newPasswordConfirm } = req.body;
  if (!newPassword || !newPasswordConfirm)
    return next(new AppError("Please provide all fields", 400));
  if (newPassword !== newPasswordConfirm)
    return next(new AppError("Password mismatch", 400));

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Token must be valid
  });

  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  // Set new password
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully!",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  // Validate input
  if (!currentPassword || !newPassword)
    return next(new AppError("All fields are required!", 400));

  // Check if the new password and its confirmation match
  if (newPassword !== newPasswordConfirm) {
    return next(new AppError("New passwords do not match!", 400));
  }

  // Get user from the collection
  const user = await User.findById(req.user._id).select("+password");

  // Check if the current password is correct
  if (!(await user.comparePassword(currentPassword)))
    return next(new AppError("Your current password is incorrect!", 401));

  // Update password
  user.password = newPassword;
  await user.save();

  // Send JWT token with updated user info
  sendCookieToken(user, 200, res);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) return next(new AppError("You are not logged in!", 401));

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError("User no longer exists!", 401));

  // Grant access to protected route
  req.user = currentUser;
  next();
});

exports.protectRoles = (...allowedRoles) => {
  return catchAsync(async (req, res, next) => {
    if (!allowedRoles.includes(req.user.role))
      return next(new AppError("Unauthorized to access this route!", 403));
    next();
  });
};
