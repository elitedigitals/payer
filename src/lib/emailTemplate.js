export const otpVerificationTemplate = ({ userName, otpCode, expiryTime }) => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f4f6f9; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px;">
          <tr>
            <td align="center">
              <h2 style="color:#1a73e8;">VaultPay Verification Code</h2>
              <p style="font-size:16px; color:#444;">Hi ${userName},</p>
              <p style="font-size:16px; color:#444;">Use the code below to complete your registration:</p>
              <h1 style="font-size:32px; font-weight:bold; color:#1a73e8; letter-spacing:8px;">${otpCode}</h1>
              <p style="font-size:14px; color:#777;">This code expires in ${expiryTime} minutes.</p>
              <p style="font-size:14px; color:#aaa;">— VaultPay Security Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
