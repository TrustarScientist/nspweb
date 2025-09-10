// I want to import the necessary modules.
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// --- API Routes ---

// 1. User Registration Route
router.post('/register', authController.register);

// 2. User Login Route
router.post('/login', authController.login);

// 3. New User Verification Route
router.get('/verify-account/:token', authController.verifyAccount);

// 4. A Protected Route (for demonstration purposes)
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated! Welcome to your Private Dashboard',
    userId: req.user.id,
  });
});

module.exports = router;
