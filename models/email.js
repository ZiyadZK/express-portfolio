const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

let sendEmail = (from, to, subject, text, html) => {
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.error('Sending Email error : ', error);
            return error;
        }
        return 'Message sent! MessageID: ', info.messageId;
    });
}

module.exports = sendEmail;