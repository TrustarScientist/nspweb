// We import the necessary modules from the official SendGrid library.
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Set the API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// --- Function to Send Verification Email ---
exports.sendVerificationEmail = async (email, link) => {
    try {
        console.log(`Attempting to send verification email to: ${email}`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'VirtualSIM Account Verification',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">Verify Your VirtualSIM Account</h2>
                    <p>Hello,</p>
                    <p>Thank you for registering with VirtualSIM. Please click the link below to verify your account and get started:</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; margin-top: 15px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Verify My Account</a>
                    <p style="margin-top: 25px;">If you did not sign up for an account, please ignore this email.</p>
                    <p>Best regards,<br/>The VirtualSIM Team</p>
                </div>
            `,
        };

        await sgMail.send(mailOptions);
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error.response.body);
    }
};
