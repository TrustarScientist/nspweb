// We import the User model and other necessary modules.
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- Controller Functions ---
// These functions contain the core logic for our authentication routes.

// 1. User Registration
exports.register = async (req, res) => {
  try {
    const { username, password, email, phoneNumber } = req.body;

    // Check if a user with this username or email already exists.
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Create a new user instance and save it to the database.
    const newUser = new User({ username, password, email, phoneNumber });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// 2. User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by their username.
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // If the passwords match, create a JWT.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};
