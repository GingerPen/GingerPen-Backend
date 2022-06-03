const express = require('express');
const { isLogedIn } = require('../controller/authController');
const codeRouter = express.Router();
const app = express();
const { runCode, checkCodeQuality, getCodeList, saveCode, updateCode, deleteCode } = require('../controller/codeController');

codeRouter
    .route('/runcode')
    .post(checkCodeQuality, runCode);

codeRouter
    .route('/savecode')
    .post(isLogedIn, saveCode);

codeRouter
    .route('/updatecode/:codeId')
    .patch(isLogedIn, updateCode);

codeRouter
    .route('/deletecode/:codeId')
    .delete(isLogedIn, deleteCode);

codeRouter
    .route('/getcodelist/:email')
    .get(isLogedIn, getCodeList);

module.exports = codeRouter;