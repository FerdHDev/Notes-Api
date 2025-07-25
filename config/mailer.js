import dotenv from "dotenv";
dotenv.config()
import nodemailer from "nodemailer";
import logger from "../utilis/loggers.js"

const mailer = await nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})

export const sendSecurityNotice = async (cleanUser) => {
    const emailContent = `                                                                                                                   <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">                <h2 style="color: #0052cc;">Security Alert: Sign-Up Attempt Using Your Email</h2>
                                                                                                                                                 <p>Hi <strong>${cleanUser.fullname}</strong>,</p>
        <p> We noticed an attempt to create an account using your email address: <strong>${cleanUser.email}</strong>. </p>                         <p> If you initiated this sign-up, feel free to ignore this message. But if you did not, rest assured — no account has been created, and your email address remains secure in our system. </p>
        <p> If you have any questions or suspect unauthorized use of your email, please contact our support team immediately. </p>
                                                                                                                            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
         <p style="font-size: 13px; color: #888;"> This message was sent to notify you of activity involving your email. You are not subscribed to any mailing list. </p>
   
          <p style="font-size: 14px;">
            — <br>
            <strong>FerdHDev</strong><br>
            <a href="mailto:support@yourcompany.com" style="color: #0052cc;">support@yourcompany.com</a>
          </p>
        </div>
   `
    try {
        await mailer.sendMail({
            from: `"Security Updates" < ${process.env.USER} > `,
            to: cleanUser.email,
            subject: "🚨 Alert: A Sign-Up Attempt Was Made Using Your Email",
            html: emailContent
        })
    } catch (err) {
        logger.error("Send Mail Error:", err, { depth: null })
    }
}

export const sendLoginAlert = async (cleanUser, loginDetails) => {
    const emailContent = `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; max-width: 600px; margin: auto; padding: 20px;">
  <h2 style="color: #d93025;">⚠️ Suspicious Login Detected</h2>

  <p>Hi <strong>${cleanUser.userName}</strong>,</p>

  <p>
    We detected a login to your account from an unfamiliar location or device. If this wasn't you, please take immediate action to secure your account.
  </p>

  <p><strong>Login Details:</strong></p>
  <ul style="list-style: none; padding-left: 0;">
    <li><strong>📍 Location:</strong> ${loginDetails.location}</li>
    <li><strong>🌐 IP Address:</strong> ${loginDetails.ipAddress}</li>
    <li><strong>🕒 Time:</strong> ${cleanUser.createdAt.toLocaleDateString()}</li>
  </ul>

  <p><strong>Previous Login IP:</strong> ${cleanUser.lastKnownIp}</p>

  <p style="margin-top: 20px;">
    If this login was <strong>not</strong> made by you, we strongly recommend:
  </p>

  <ul>
    <li>🔒 Changing your password immediately</li>
    <li>📨 Reviewing your account activity</li>
    <li>📞 Contacting support if you notice anything suspicious</li>
  </ul>

  <p>
    <a href="{{resetPasswordLink}}" style="display: inline-block; background-color: #d93025; color: #fff; padding: 10px 16px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
      Reset Password
    </a>
  </p>

  <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">

  <p style="font-size: 13px; color: #888;">
    This email was automatically sent to notify you of suspicious activity on your account. You are not subscribed to marketing emails.
  </p>

  <p style="font-size: 14px;">
    —<br>
    <strong>FerdHDev</strong><br>
    <a href="mailto:support@yourcompany.com" style="color: #0052cc;">support@yourcompany.com</a>
  </p>
</div>
    `

    try {
        await mailer.sendMail({
            from: `"Security Updates" < ${process.env.USER} >`,
            to: cleanUser.email,
            subject: "🚨 Alert: A Sign-Up Attempt Was made using a device that is not recognized",
            html: emailContent
        })
    } catch (err) {
        logger.error("Error sending login mail:", err)
    }
}

export default mailer;
