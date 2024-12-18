// controllers/phoneVerification.js

const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send OTP
exports.sendOtp = async (req, res) => {
    const { phone } = req.body;

    try {
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

        await client.messages.create({
            body: `Your OTP code is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });

        // Store OTP temporarily or send OTP in response for testing (not for production)
        // For production: Store in Redis, DB, etc.
        res.status(200).json({ success: true, otp }); 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Verify OTP
exports.verifyOtp = (req, res) => {
    const { phone, otp, userOtp } = req.body;

    if (otp === userOtp) {
        res.status(200).json({ success: true, message: "Phone number verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
    }
};
