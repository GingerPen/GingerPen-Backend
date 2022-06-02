const express = require('express');
const codeRouter = express.Router();
const app = express();
const { runCode,checkCodeQuality } = require('../controller/codeController');

codeRouter
    .route('/runcode')
    .post(checkCodeQuality, runCode);

module.exports = codeRouter;