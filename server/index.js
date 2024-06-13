const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/userRoute");
const errorGlobalMiddleware = require("./middlewares/errorMiddleware");
const AppError = require("./utils/appError");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Serving static file
app.use(express.static(path.join(__dirname, "dist")));

if (!process.env.DATABASE_URI)
  return console.log("Please provide Database Env");
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log(`Database connected successful🥰💚🥰`))
  .catch(() => console.log(`Error connecting database 🎇💣💣💣🎇`));

app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorGlobalMiddleware);

const port = process.env.PORT || 7007;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
