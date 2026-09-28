import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const EmailOtp = async(email, name, randomOtp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER, 
            to: email, 
            subject: "Hello", 
            text: "Hello world?", 
            html: `<b>Hello ${name} your Otp is ${randomOtp}</b>`, 
        });
        console.log("Message sent:%s", info.messageId)
    }
    catch (err) { console.log(err.message) }
}


export const ResendOtp = async(email, name, randomOtp) => {
    try {
        const info = await transporter.sendMail({
            from: '"Example Team" <team@example.com>', 
            to: email,
            subject: "Resent Otp",
            text: "Hello world?", 
            html: `<b>Hello ${name} your Otp is ${randomOtp}</b>`, 
        });
        console.log("Message sent:%s", info.messageId)
    }
    catch (err) { console.log(err.message) }
}
