const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // O usa un altro servizio SMTP
    auth: {
        user: process.env.EMAIL_USER, // Definisci questi valori nel file .env
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
