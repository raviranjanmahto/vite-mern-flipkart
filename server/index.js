const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log(`Database connected successful🥰💚🥰`))
  .catch(err =>
    console.log(`Error connecting database 🎇💣💣💣🎇=>`, err.message)
  );

const port = process.env.PORT || 7007;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
