// We import the necessary Mongoose modules.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// We define the schema for the User model.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Prevents password from being returned in queries by default
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: null,
        select: false, // Security: only retrieve when explicitly requested
    },
}, { timestamps: true });

// Middleware to hash the password before saving the user document.
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare candidate password with the hashed password.
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// We create the User model from the schema.
const User = mongoose.model('User', userSchema);
module.exports = User;
