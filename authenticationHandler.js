// Vefify

require('dotenv').config();
module.exports = sendVerificationEmail;


const nodemailer = require('nodemailer');

const jwt = require('./createJWT.js');
const emailSender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

function createMailOptions(toEmail, token) {
    const PORT = process.env.PORT || 5015;
    const HOST = process.env.HOST || 'localhost';
    return {
        from: process.env.EMAIL_ADDRESS,
        to: toEmail,
        subject: 'Verify Your Email Address',
        html: `Hello! You recently signed up for an account with our website. Please follow the link below to verify your email
        <a href="http://${HOST}:${PORT}/verify/${token}">http://${HOST}:${PORT}/verify/${token}</a>`
    }
}

function sendVerificationEmail(user) {
    const toEmail = user.Email;
    const token = jwt.createVerificationToken(user._id);
    emailSender.sendMail(createMailOptions(toEmail, token), function (error, info) {
        if (error) throw Error(error);
        console.log('Email Sent');
        console.log(info);
    });
}

/*
Testing Code
const mailOptions = {
    from: "senseijake24@gmail.com",
    to: "senseijake24@gmail.com",
    //to: toEmail,
    subject: 'Verify Your Email Address',
    html: `Hello! You recently signed up for an account with our website. Please follow the link below to verify your email
    <a href="http://localhost:5005/verify/${token}">http://localhost:5005/verify/${token}</a>`
};

user = {
    Email: "senseijake24@gmail.com"
}
sendVerificationEmail(user);



*/