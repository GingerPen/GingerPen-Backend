const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = "ytsyuhdjkflsdfsdcsdcvd";
const userModel = require("../model/userModel");
const statusCodes = require('../utils/statusCodes');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const e = require('express');


module.exports.loginUser = async function loginUser(req, res) {
    try {
        let { data, password } = req.body;
        //let user = await userModel.findOne({ "username": data });
        let user = await userModel.findOne({
            $or: [{
                "username": data
            },
            {
                "email": data
            }]
        });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    user.password = undefined;
                    let uid = user['_id'];
                    let jwt_token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login_token', jwt_token, { http_only: true });
                    res.json({
                        message: "User signed in successfully",
                        data: user
                    });
                } else {
                    res.status(statusCodes.UNAUTHORIZED).json({
                        message: "password not matched"
                    })
                }
            })
        } else {
            res.status(statusCodes.NOT_FOUND).json({
                message: "User not found!"
            })
        }
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: `Error during login: ${err.message}`
            })
    }
};

module.exports.signup = async function signup(req, res) {
    try {
        let data = req.body;
        let user = await userModel.create(data);
        if (user) {
            user.password = undefined;
            res.json({
                message: "User Added successfully",
                userData: user
            })
        } else {
            res.json({
                message: "Error while sign up, please try again!"
            })
        }
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Server error: ${err.message}`
        })
    }
};

module.exports.forgotPassword = async function forgotPassword(req, res) {
    let { data } = req.body;
    try {
        let user = await userModel.findOne({
            $or: [{
                "username": data
            },
            {
                "email": data
            }]
        });
        if (user) {
            const resetToken = await user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            user.confirmPass = user.password;
            await user.save();
            sendMail(resetPasswordLink, req, res);
        } else {
            return res.status(statusCodes.NOT_FOUND).json({
                message: "Please signup"
            })
        }
    } catch (err) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Server error: ${err.message}`
        })
    }
}

module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPass } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        console.log("found a user:  " + user);
        if (user) {
            user.resetPasswordHandler(password, confirmPass);
            await user.save();
            res.json({
                message: "Changed success"
            });
        } else {
            res.status(statusCodes.NOT_FOUND).json({
                message: "User not found "
            })
        }
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Server error: ${err.message}`
        })
    }
}

module.exports.logOut = function logOut(req, res) {
    res.cookie('login_token', '', { maxAge: 1 })
    res.json({
        message: "Logout successfull"
    })
    // res.redirect('/auth/login');
}

function sendMail(resetPasswordLink, req, res) {

    isSent = false;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'devjunctionofficial@gmail.com',
            pass: 'pxnypwnqldtcqddz'
        }
    });

    var mailOptions = {
        from: 'devjunctionofficial@gmail.com',
        to: 'gopalsays108@gmail.com',
        subject: 'Reset Ginger-Pen password',
        text: `Click here to reset password: ${resetPasswordLink}`,
        //html: '<h1>Welcome</h1><p>Reseting passowrd made easy.!</p>',
      
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message)
            res.json({
                message: "failed sending mail"
            })
        }
        else {
            console.log('Email sent');
            res.json({
                message: "Mail sent successfully" + resetPasswordLink
            })
        }
    })
}

