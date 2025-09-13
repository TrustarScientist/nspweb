// This file contains the logic for sending verification emails using the official SendGrid library.

const sgMail = require('@sendgrid/mail');
require("dotenv").config();

// Set the API key directly on the SendGrid Mailer object.
// The API key is retrieved from your environment variables.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// --- Function to Send Verification Email ---
exports.sendVerificationEmail = async (email, link) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Replace with the email address you verified with SendGrid
      to: email, // The recipient's email address
      subject: 'Ksharer Account Verification',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Welcome to Ksharer!</h2>
          <p>Please click the button below to verify your account and get started.</p>
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Verify Your Account
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p><a href="${link}">${link}</a></p>
          <p>If you did not register for this account, you can safely ignore this email.</p>
          <p>Best regards,<br>The Ksharer Team</p>
        </div>
      `,
    };

    // Send the email using the official library.
    await sgMail.send(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error.response.body);
  }
};
