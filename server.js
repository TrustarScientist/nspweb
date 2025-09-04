// We'll start by importing all the necessary libraries.
// 'express' is our web framework for building the API.
// 'mongoose' is an Object Data Modeling (ODM) library for MongoDB, which makes it easier to interact with the database.
// 'cors' is a middleware that handles Cross-Origin Resource Sharing.
// 'dotenv' helps us load environment variables from a .env file.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// We'll import the routes now that they are in a separate file.
const authRoutes = require("./src/routes/auth");

// Initialize our Express application.
const app = express();

// --- Middleware Setup ---
// This middleware allows our API to parse JSON data from incoming requests.
app.use(express.json());

// This is the CORS middleware. We'll configure it to use our environment variable
// for the allowed origin, which is necessary for a deployed API.
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200 // For legacy browsers
};
app.use(cors(corsOptions));

// --- Database Connection ---
// This is where we'll connect to our MongoDB database.
// We'll use the MONGODB_URI from our .env file.
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes ---
// This line tells our app to use the auth routes we defined in another file.
// All routes inside `authRoutes` will be prefixed with `/api/auth`.
app.use("/api/auth", authRoutes);

// --- Protected route to test authentication ---
app.get('/api/auth/protected', (req, res) => {
    res.status(200).send({ message: 'You are here? That means the authentication system is working!' });
});

// --- Start the Server  ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
