import { sendEmail } from "../config/nodemailerConfig.js";
import { otpVerificationTemplate } from "../lib/emailTemplate.js";


export const sendOTPEmail = async (to, userName, otpCode, expiryTime) => {
    const subject = "Your VaultPay Verification Code";
    const htmlContent = otpVerificationTemplate({ userName, 
        otpCode, 
        expiryTime: Math.floor((expiryTime - Date.now()) / 60000) });
        
    await sendEmail(to, subject, htmlContent);
}

