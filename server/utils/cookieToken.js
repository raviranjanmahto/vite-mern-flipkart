const jwt = require("jsonwebtoken");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d", // default to 90 days if not set
  });
};

const cookieToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000 // default to 90 days if not set
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false, // Ensure secure flag is used only in production
    sameSite: "strict", // Prevent CSRF attacks
  };

  res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({ status: "success", token, user });
};

module.exports = cookieToken;
