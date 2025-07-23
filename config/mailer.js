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
        <p> We noticed an attempt to create an account using your email address: <strong>${cleanUser.email}</strong>. </p>                         <p> If you initiated this sign-up, feel free to ignore this message. But if you did not, rest assured — no account has been cre      ated, and your email address remains secure in our system. </p>
        <p> If you have any questions or suspect unauthorized use of your email, please contact our support team immediately. </p>
                                                                                                                                                  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
         <p style="font-size: 13px; color: #888;"> This message was sent to notify you of activity involving your email. You are not sub      scribed to any mailing list. </p>
   
          <p style="font-size: 14px;">
            — <br>
            <strong>Your Company Name</strong><br>
            <a href="mailto:support@yourcompany.com" style="color: #0052cc;">support@yourcompany.com</a>
          </p>
        </div>
   `
    try {
        await mailer.sendMail({
            from: `"Security Updates" < ${process.env.USER}> `,
            to: cleanUser.email,
            subject: "🚨 Alert: A Sign-Up Attempt Was Made Using Your Email",
            html: emailContent
        })

        logger.info("Email sent")
    } catch (err) {
        logger.error("Send Mail Error:", err, { depth: null })
    }
}


export default mailer;
