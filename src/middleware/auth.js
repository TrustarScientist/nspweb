// We import the necessary modules.
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken = async (req, res, next) => {
    // We get the token from the request header.
    const authHeader = req.headers['authorization'];
    // We get the token by splitting the Bearer token.
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token, we return a 401 Unauthorized status.
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    try {
        // We verify the token using the secret key.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // We find the user by ID and explicitly select the sensitive fields to be returned.
        const user = await User.findById(decoded.id).select('+username +email +phoneNumber +isVerified');

        // If the user is not found, we return a 404 Not Found status.
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // We attach the user object to the request.
        req.user = user;
        next();
    } catch (error) {
        // If the token is invalid or expired, we return a 403 Forbidden status.
        res.status(403).json({ message: 'Authentication failed. Invalid or expired token.' });
    }
};
