const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = "ytsyuhdjkflsdfsdcsdcvd";
const userModel = require("../model/userModel");
const statusCodes = require('../utils/statusCodes');
const bcrypt = require('bcrypt');
const { use } = require('../routers/authRouter');


module.exports.loginUser = async function loginUser(req, res) {
    try {
        let { data, password } = req.body;
        let user = await userModel.findOne({ "username": data });
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
                    res.json({
                        message: "password not matched"
                    })
                }
            })
        } else {
            res.json({
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
        res.status(500).json({
            message: `Server error: ${err.message}`
        })
    }
};