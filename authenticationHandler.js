// Vefify

require('dotenv').config();
module.exports = sendVerificationEmail;

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const emailSender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "senseijake24@gmail.com",
        pass: "khje resk vqfn zrze"
    }
});

function createMailOptions(toEmail, token) {
    return {
        from: "senseijake24@gmail.com",
        to: toEmail,
        subject: 'Verify Your Email Address',
        html: `Hello! You recently signed up for an account with our website. Please follow the link below to verify your email
        <a href="http://localhost:5005/verify/${token}">http://localhost:5005/verify/${token}</a>`
    }
}

function sendVerificationEmail(user) {
    const toEmail = user.Email;
    const token = createVerificationToken(user.Id);
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