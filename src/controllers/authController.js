// We import the necessary modules.
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// --- Helper function to generate a JWT ---
// The token includes essential user data for authentication and personalization.
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, email: user.email, firstName: user.firstName },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Token expires in 7 days
    );
};

// --- 1. User Registration Controller ---
// Creates a new user and immediately logs them in.
register = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with that username or email already exists.' });
        }

        // 2. Create the new user (password is automatically hashed by Mongoose middleware)
        const newUser = new User({ username, firstName, lastName, email, password });
        await newUser.save();

        // 3. IMMEDIATE LOGIN: Generate a JWT for the newly registered user
        const token = generateToken(newUser);

        // 4. Return success response with token and essential user details
        res.status(201).json({
            message: 'Registration successful. User is now logged in.',
            token,
            userId: newUser._id,
            username: newUser.username,
            firstName: newUser.firstName,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// --- 2. User Login Controller ---
// Allows login using either username or email address.
login = async (req, res) => {
    try {
        const { loginIdentifier, password } = req.body;

        // 1. Find the user by username OR email, and explicitly select the password hash
        const user = await User.findOne({
            $or: [
                { username: loginIdentifier },
                { email: loginIdentifier }
            ]
        }).select('+password');

        // 2. Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 3. Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 4. Generate JWT
        const token = generateToken(user);

        // 5. Return success response with token and username
        res.status(200).json({
            message: 'Login successful.',
            token,
            userId: user._id,
            username: user.username,
            firstName: user.firstName,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

// --- (The verifyAccount function has been removed) ---

module.exports = {
    register,
    login,
    // verifyAccount is no longer exported
};
