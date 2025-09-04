// We import the necessary modules.
const jwt = require('jsonwebtoken');
require('dotenv').config();

// --- JWT Middleware to Protect Routes ---
// This is a special function that we'll use on routes that require authentication.
// It checks if the request has a valid JWT in its header.
exports.authenticateToken = (req, res, next) => {
  // Get the 'Authorization' header from the request. It should look like 'Bearer <token>'.
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // If there's no token, the user is unauthorized.
    return res.status(401).json({ message: 'Authorization token not found.' });
  }

  // Verify the token using the secret key.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If the token is invalid or expired, return a forbidden error.
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    // If the token is valid, we attach the user's information to the request object.
    req.user = user;
    next(); // Proceed to the next middleware or route handler.
  });
};
