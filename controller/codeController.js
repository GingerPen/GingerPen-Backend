const express = require('express');
const app = express();
const { execute } = require('../utils/execute');
const { generateFile } = require('../utils/generateFile');
const statusCodes = require('../utils/statusCodes');


module.exports.runCode = async function runCode(req, res) {
    try {
        const { language, code } = req.body;
        const filePath = await generateFile(language, code);
        const output = await execute(filePath);
        res.json({
            success: true,
            message: output
        });
    } catch (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server error: " + err.message
        })
    }
}

module.exports.checkCodeQuality = function checkCodeQuality(req, res, next) {
    const {language,code} = req.body;
    if (code === '' || language === '') {
        res.json({
            success: false,
            message: "Either code body or language unspecified"
        });
        return;
    }
    next();
}

