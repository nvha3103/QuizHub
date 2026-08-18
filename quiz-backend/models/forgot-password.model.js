const mongoose = require("mongoose")

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 0
        }
    }, {
    timestamps: true // tu dong tao ra 2 truong createdAt va updatedAt
}
)

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password")

module.exports = ForgotPassword;