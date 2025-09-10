// We'll import mongoose to define our schema and model.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// --- User Schema and Model ---
// This is our blueprint for user documents in MongoDB.
// I've added email, phoneNumber, isVerified, and a verificationToken for later.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // A simple regex for email validation.
    match: /.+\@.+\..+/,
  },
  phoneNumber: {
    type: String,
    required: false, // I make this required later for SMS verification
    unique: true,
    sparse: true, // Allows for multiple documents to have a null value
  },
  password: {
    type: String,
    required: true,
    select: false, // Prevents password from being returned in queries by default
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
});

// A pre-save hook that runs before a document is saved.
// This is where we will hash the password to protect it.
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified or is new.
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt and hash the password.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// exporting the Mongoose model to make it visible for others.
const User = mongoose.model('User', userSchema);
module.exports = User;
