// We import the User model and other necessary modules.
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../services/emailService'); // Our new email service

// --- Controller Functions ---

// 1. User Registration (Updated)
exports.register = async (req, res) => {
  try {
    const { username, password, email, phoneNumber } = req.body;

    // Check if a user with this username or email already exists.
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Create a unique token and set its expiration
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Create a new user instance with the verification token and expiration
    const newUser = new User({
      username,
      password, // Your schema's pre-save hook will handle the hashing
      email,
      phoneNumber,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });
    await newUser.save();

    // Send the verification email to the user.
    const verificationLink = `http://${req.headers.host}/api/auth/verify-account/${verificationToken}`;
    await emailService.sendVerificationEmail(newUser.email, verificationLink);

    res.status(201).json({ message: 'User registered successfully! Please check your email to verify your account.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// 2. User Login (Updated to check for verification)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by their username and select the password field.
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check if the account is verified.
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email address before logging in.' });
    }

    // Compare the provided password with the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // If the passwords match, create a JWT.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username : user.username , message: 'Login successful!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// 3. User Account Verification (New)
exports.verifyAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification link.' });
    }

    // Mark the account as verified and clear the token fields.
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Account verified successfully! You can now log in.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during account verification.' });
  }
};
