Node.js Authentication API
Description
This project is a simple, yet robust, API for user authentication built with Node.js, Express, and MongoDB. It provides a foundational system for user management, including secure registration and login with JSON Web Tokens (JWTs).

The project is structured in a modular and scalable way, making it easy to add new features like email verification, SMS, and other business logic in the future.

Features
User Registration: Securely create new user accounts with a username, email, and password.

User Login: Authenticate users and issue a JSON Web Token (JWT) for subsequent requests.

Password Security: Passwords are automatically hashed and salted using bcrypt before being stored in the database.

Token-Based Authentication: Uses JWTs for stateless and secure authentication.

Cross-Origin Resource Sharing (CORS): Configured to allow requests from any frontend domain.

Modular Structure: Code is organized into dedicated folders for routes, controllers, models, and middleware, following a common Node.js pattern.

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js: A JavaScript runtime environment.

npm: The Node.js package manager (comes with Node.js).

MongoDB: A running MongoDB instance, either locally or a cloud service like MongoDB Atlas.

Getting Started
Clone the project files:
If you're starting from scratch, set up the project files as we have discussed.

Install dependencies:
Navigate to your project folder in the terminal and install the required packages.

npm install

Configure environment variables:
Create a file named .env in the root of your project and add the following:

MONGODB_URI=mongodb://localhost:27017/node-auth-db
JWT_SECRET=your_super_secret_key_here

Note: Replace your_super_secret_key_here with a long, random string. This is crucial for security.

Run the server:
Start the server from your terminal.

node server.js

The server will start on port 5000 by default.

API Endpoints
You can test these endpoints using a tool like Postman or cURL.

POST /api/auth/register
Register a new user.

Request Body:

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

Success Response: Status: 201 Created

{
  "message": "User registered successfully!"
}

POST /api/auth/login
Log in an existing user and receive a JWT.

Request Body:

{
  "username": "testuser",
  "password": "password123"
}

Success Response: Status: 200 OK

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful!"
}

GET /api/auth/protected
Access a protected route. Requires an Authorization header.

Request Headers:

Authorization: Bearer <your_jwt_token>

Success Response: Status: 200 OK

{
  "message": "Welcome to the protected route! You are authenticated.",
  "userId": "60e9c8f0f0e0d1e5c4a5b6c7"
}
