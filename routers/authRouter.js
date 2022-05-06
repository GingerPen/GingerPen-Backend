const express = require('express');
const authRouter = express.Router();
const app = express();
const { loginUser, signup } = require('../controller/authController');

authRouter
    .route('/login')
    .post(loginUser);

authRouter
    .route('/signup')
    .post(signup);


module.exports = authRouter;