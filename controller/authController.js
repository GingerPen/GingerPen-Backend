const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = "ytsyuhdjkflsdfsdcsdcvd";
const userModel = require("../model/userModel"); 
const { use } = require('../routers/authRouter');

module.exports.loginUser = async function loginUser(req, res) {
    console.log("hitted");
};

module.exports.signup = async function signup(req, res) {
    try{
        let data = req.body;
        let user = await userModel.create(data);
        if(user){
            res.json({
                message: "User Added successfully",
                userData: user
            })
        }else{
            res.json({
                message:"Error while signing up, please try again!"
            })
        }
    }catch(err){
        res.status(500).json({
            message: `Server error: ${err.message}`
        })
    }
};

