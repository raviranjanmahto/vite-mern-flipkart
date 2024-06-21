const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const authRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoutes");
const errorGlobalMiddleware = require("./middlewares/errorMiddleware");
const AppError = require("./utils/appError");
const dbConnect = require("./config/dbConnect");

const port = process.env.PORT || 7007;

const app = express();

// Allow requests from specific origins (replace with your Netlify domain)
const corsOptions = {
  origin: "https://raviranjan-flipkart.vercel.app",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Serving static file
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// Development APIs logging middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Database connection
dbConnect(process.env.DATABASE_URI);

// health check
app.get("/api/v1/ping", (req, res) => {
  res.status(200).json({ status: "success", message: "pong" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);

// Serve frontend for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// 404 error handler for all other routes
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

// Global error handler
app.use(errorGlobalMiddleware);

// Server listening
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
