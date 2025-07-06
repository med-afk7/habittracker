export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f8;
        padding: 20px;
        color: #333;
      }

      .container {
        max-width: 500px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 20px;
      }

      .header h1 {
        color: #4f46e5;
        margin: 0;
      }

      .content {
        margin-top: 20px;
        text-align: center;
      }

      .content p {
        font-size: 16px;
        margin-bottom: 25px;
      }

      .code-box {
        display: inline-block;
        background: #e0f2f1;
        color: #004d40;
        padding: 15px 30px;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 4px;
        border-radius: 8px;
        box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
      }

      .footer {
        margin-top: 40px;
        font-size: 13px;
        text-align: center;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Email Verification</h1>
      </div>

      <div class="content">
        <p>Hi there 👋</p>
        <p>Thanks for signing up! Please use the code below to verify your email address:</p>

        <div class="code-box">{verificationCode}</div>

        <p style="margin-top: 30px;">This code will expire in 24 hours. If you did not request this, you can safely ignore this email.</p>
      </div>

      <div class="footer">
        &copy; 2025 YourApp. All rights reserved.
      </div>
    </div>
  </body>
</html>

`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f4f7f9;
      margin: 0; padding: 0;
      color: #444;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(90deg, #34d399, #059669);
      padding: 30px 20px;
      text-align: center;
      color: #fff;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1.5px;
    }
    .content {
      padding: 30px 40px;
      font-size: 16px;
      line-height: 1.5;
      color: #555;
    }
    .content p {
      margin-top: 0;
      margin-bottom: 18px;
    }
    .checkmark-circle {
      width: 70px;
      height: 70px;
      background: #10b981;
      border-radius: 50%;
      margin: 30px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px #34d399aa;
    }
    .checkmark-circle svg {
      stroke: #fff;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      width: 32px;
      height: 32px;
    }
    ul {
      margin: 20px 0 30px 20px;
      color: #4b5563;
    }
    ul li {
      margin-bottom: 12px;
      font-size: 15px;
    }
    .footer {
      background: #f9fafb;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      padding: 18px 20px;
      border-top: 1px solid #e5e7eb;
      user-select: none;
    }
  </style>
</head>
<body>
  <div class="container" role="main">
    <header class="header">
      Password Reset Successful
    </header>
    <section class="content">
      <p>Hello,</p>
      <p>We're writing to confirm that your password has been successfully reset.</p>

      <div class="checkmark-circle" aria-label="Success">
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <p>If you did not initiate this password reset, please contact our support team immediately.</p>

      <p>For security reasons, we recommend that you:</p>
      <ul>
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication if available</li>
        <li>Avoid using the same password across multiple sites</li>
      </ul>

      <p>Thank you for helping us keep your account secure.</p>

      <p>Best regards,<br />Your App Team</p>
    </section>
    <footer class="footer">
      This is an automated message, please do not reply to this email.
    </footer>
  </div>
</body>
</html>

`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f4f7f9;
      margin: 0; padding: 0;
      color: #444;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      padding: 30px 20px;
      text-align: center;
      color: white;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1.5px;
    }
    .content {
      padding: 30px 40px;
      font-size: 16px;
      line-height: 1.5;
      color: #555;
    }
    .content p {
      margin-top: 0;
      margin-bottom: 18px;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .reset-button {
      background-color: #3b82f6;
      color: white !important;
      padding: 14px 28px;
      border-radius: 6px;
      font-weight: 700;
      text-decoration: none;
      font-size: 16px;
      box-shadow: 0 4px 14px rgba(59,130,246,0.4);
      transition: background-color 0.3s ease;
      display: inline-block;
      user-select: none;
    }
    .reset-button:hover {
      background-color: #2563eb;
    }
    .footer {
      background: #f9fafb;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      padding: 18px 20px;
      border-top: 1px solid #e5e7eb;
      user-select: none;
    }
  </style>
</head>
<body>
  <div class="container" role="main">
    <header class="header">
      Password Reset
    </header>
    <section class="content">
      <p>Hello,</p>
      <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
      <p>To reset your password, click the button below:</p>

      <div class="button-container">
        <a href="{resetURL}" class="reset-button" target="_blank" rel="noopener noreferrer">Reset Password</a>
      </div>

      <p>This link will expire in 1 hour for security reasons.</p>
      <p>Best regards,<br />Your App Team</p>
    </section>
    <footer class="footer">
      This is an automated message, please do not reply to this email.
    </footer>
  </div>
</body>
</html>

`;