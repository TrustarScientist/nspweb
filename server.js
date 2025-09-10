// We'll start by importing all the necessary libraries.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// We'll import the routes now that they are in a separate file.
const authRoutes = require("./src/routes/auth");

// Initialize our Express application.
const app = express();

// --- Middleware Setup ---
app.use(express.json());

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200 // For legacy browsers
};
app.use(cors(corsOptions));

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes ---
app.use("/api/auth", authRoutes);

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
