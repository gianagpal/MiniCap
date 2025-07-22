import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
<<<<<<< HEAD
        pass: process.env.SMTP_PASS
=======
        pass: process.env.SMTP_PASS,
>>>>>>> f313dcd (Initial commit from VS Code terminal)
    } 
});

export default transporter;
