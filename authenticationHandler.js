// Verify Email

require('dotenv').config();
module.exports = {
    sendVerificationEmail,
    sendPassRec,
    sendPassConfirmation
};


const nodemailer = require('nodemailer');

const jwt = require('./createJWT.js');
const emailSender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});


const Path = require('./frontend/src/components/Path');

function verifyEmail(toEmail, token) {
    const PORT = process.env.PORT || 5015;
    const HOST = process.env.HOST || 'localhost';
    const path = Path.buildPath(`verify/${token}`);
    return {
        from: "senseijake24@gmail.com",
        to: toEmail,
        subject: 'Verify Your Email Address',
        html: `Hello! You recently signed up for an account with our website. Please follow the link below to verify your email
        <a href="${path}">${path}</a>`
    }
}


function sendVerificationEmail(user) {
    const toEmail = user.Email;
    const token = jwt.createVerificationToken(user._id);
    emailSender.sendMail(verifyEmail(toEmail, token), function (error, info) {
        if (error) throw Error(error);
        console.log('Verification Email Sent');
        //console.log(info);
    });
}

//Password (requesting change)
function psEmail(toEmail, token) {
    const PORT = process.env.PORT || 5015;
    const HOST = process.env.HOST || 'localhost';
    const path = Path.buildPath(`verify/${token}`);
    return {
        from: "senseijake24@gmail.com",
        to: toEmail,
        subject: 'Password Recovery',
        html: `Hello! It seems like you have forgotten your password. Click the link below to reset your password
        <a href="${path}">${path}</a>`
    }
}

function sendPassRec(user) {
    const toEmail = user.Email;
    const token = jwt.createVerificationToken(user._id);
    emailSender.sendMail(psEmail(toEmail, token), function (error, info) {
        if (error) throw Error(error);
        console.log('Password Recovery Email Sent');
        //console.log(info);
    });
}

//Password (Successful change)
function psConfirmEmail(toEmail, token) {
    const PORT = process.env.PORT || 5015;
    const HOST = process.env.HOST || 'localhost';
    const path = Path.buildPath(`verify/${token}`);
    return {
        from: "senseijake24@gmail.com",
        to: toEmail,
        subject: 'Password Changed',
        html: `Your password was successfully changed. If this was not you, please email us at senseisupport@gmail.com. 
        (Exclaimer: this email doesn't actually exist, so please don't email us)`
    }
}

function sendPassConfirmation(user) {
    const toEmail = user.Email;
    const token = jwt.createVerificationToken(user._id);
    emailSender.sendMail(psConfirmEmail(toEmail, token), function (error, info) {
        if (error) throw Error(error);
        console.log('Change Confirmed Email Sent');
        //console.log(info);
    });
}

/*
function createMailOptions(toEmail, token) {
    const path = Path.buildPath(`verify/${token}`);
    return {
        from: process.env.EMAIL_ADDRESS,
        to: toEmail,
        subject: 'Verify Your Email Address',
        html: `Hello! You recently signed up for an account with our website. Please follow the link below to verify your email
        <a href="${path}">${path}</a>`
    }
}


function sendVerificationEmail(user) {
    const toEmail = user.Email;
    const token = jwt.createVerificationToken(user._id);
    emailSender.sendMail(createMailOptions(toEmail, token), function (error, info) {
        if (error) throw Error(error);
        //console.log('Email Sent');
        //console.log(info);
    });
}
*/