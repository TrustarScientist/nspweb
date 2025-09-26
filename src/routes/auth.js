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


// 4. A Protected Route (for demonstration purposes)
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated! Welcome to your Private Dashboard',
    userId: req.user.id,
  });
});

router.get('/current_user', authenticateToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    phone: req.user.phoneNumber,
    verified: req.user.isVerified,
  });
});

// use POST for a state-changing action.
router.post('/logout', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
