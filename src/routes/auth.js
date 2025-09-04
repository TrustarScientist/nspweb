// I want to import the necessary modules.
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// --- API Routes ---
// These routes will now use the controllers to handle their logic.
// This makes the code much cleaner and easier to read.

// 1. User Registration Route
// This route will handle new user signups.
router.post('/register', authController.register);

// 2. User Login Route
// This route will handle user logins.
router.post('/login', authController.login);

// 3. A Protected Route (for demonstration purposes)
// This endpoint can only be accessed by authenticated users.
// We're using our middleware to protect it.
router.get('/protected', authenticateToken, (req, res) => {
  // If the code reaches this point, the user is authenticated.
  res.status(200).json({
    message: 'Welcome to the protected route! You are authenticated.',
    userId: req.user.id,
  });
});

module.exports = router;
