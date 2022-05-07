const express = require('express');
const homeRouter = express.Router();
const app = express();
const { testing } = require("../controller/homeController")

homeRouter
    .route('')
    .get(testing);

module.exports = homeRouter;