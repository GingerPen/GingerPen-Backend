const express = require('express');
const { isLogedIn } = require('../controller/authController');
const homeRouter = express.Router();
const app = express();
const { testing } = require("../controller/homeController")


homeRouter
    .route('')
    .get(isLogedIn, testing);

module.exports = homeRouter;