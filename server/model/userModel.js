const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: [true, "Please tell us your first name!"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    lName: {
      type: String,
      trim: true,
      default: "N/A",
    },
    email: {
      type: String,
      required: [true, "Please tell us your email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: [true, "Password is required!"],
      select: false,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, "Confirm Password is required"],
    //   validate: {
    //     // This only works on CREATE and SAVE!!!
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: "Passwords are not the same!",
    //   },
    // },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 11
  this.password = await bcrypt.hash(this.password, 11);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual to hide certain fields when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
