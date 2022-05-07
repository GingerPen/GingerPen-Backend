const express = require('express');
const app = express();
const { execute } = require('../utils/execute');
const { generateFile } = require('../utils/generateFile');
const statusCodes = require('../utils/statusCodes');


module.exports.runCode = async function runCode(req, res) {
    try {
        const { language, code } = req.body;
        const filePath = await generateFile(language, code);
        console.log(`filepath: ` + filePath);
        const output = await execute(filePath);
        res.json({
            message: output
        });
    } catch (err) {
        res.json({
            message: "Server error: " + err.message
        })
    }
}

module.exports.checkCodeQuality = function checkCodeQuality(req, res, next) {
    const code = req.body;
    if (code.toString().trim() === '') {
        res.status(statusCodes.NO_CONTENT).json({
            message: "Empty code body"
        });
    }
    next();
}

