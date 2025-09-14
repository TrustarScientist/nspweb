VirtualSIM Backend API
This project is a backend API for a phone number generation, subscription, and SMS platform, built to demonstrate core backend development skills for international clients.

The API is built using Node.js and Express.js, with MongoDB as the database. It handles secure user authentication, token management, and is ready for integration with a professional email service for user verification.

🚀 Features
Secure User Authentication: Users can register and log in securely.

Flexible Login: Supports user login using either a username or email address.

Token-Based Authorization: Uses JSON Web Tokens (JWT) to protect API routes.

User Email Verification: Implements a complete email verification flow to ensure user data integrity.

Email Sending Service: Integrated with SendGrid for reliable email delivery.

Dynamic API Endpoints: Protected routes are now more descriptive and logically organized.

🛠️ Technology Stack
Node.js: Asynchronous JavaScript runtime.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for flexible data storage.

Mongoose: MongoDB object modeling for Node.js.

Bcrypt: Used for secure password hashing.

JSON Web Token (JWT): For token-based authentication.

SendGrid: For professional email delivery.

🔑 Environment Variables
To run the project, create a .env file in the root directory and add the following variables:

# MongoDB connection URI
MONGODB_URI=your_mongodb_connection_string

# A secret key for JWT token signing
JWT_SECRET=your_jwt_secret_key

# SendGrid API Key for email services
SENDGRID_API_KEY=your_sendgrid_api_key

# The verified sender email address from your SendGrid account
EMAIL_USER=your_verified_sender_email@example.com

# Allows all origins for local development. Use a specific URL in production.
CORS_ORIGIN=*

🗺️ API Endpoints
All API endpoints are prefixed with /api.

Authentication & User Management
Method

Endpoint

Description

POST

/api/register

Registers a new user.

POST

/api/login

Authenticates a user and returns a JWT. The response also includes the username.

GET

/api/verify-account/:token

Verifies a user's email address using a unique token.

Protected Routes (Requires JWT in Authorization header)
Method

Endpoint

Description

GET

/api/dashboard

A protected route that returns a welcome message to the authenticated user.

GET

/api/current_user

A protected route that returns the authenticated user's details.

🚀 Getting Started
Clone the repository: git clone <repository_url>

Install dependencies: npm install

Set up environment variables: Create and configure your .env file.

Run the server: npm start