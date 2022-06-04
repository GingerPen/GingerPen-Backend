const express = require('express');
const authRouter = express.Router();
const app = express();
const { loginUser, signup, resetPassword, logOut, forgotPassword } = require('../controller/authController');

authRouter
    .route('/login')
    .post(loginUser);

authRouter
    .route('/signup')
    .post(signup);

authRouter
    .route('/logout')
    .get(logOut);

authRouter
    .route('/resetpassword/:token')
    .post(resetPassword);

authRouter.
    route('/forgotpassword')
    .post(forgotPassword);

module.exports = authRouter;