const express = require('express');
const userCodesModel = require('../model/userCodeModel');
const app = express();
const { execute } = require('../utils/execute');
const { generateFileJava,generateFilePy,deleteFileJava,deleteFilePy } = require('../utils/generateFile');
const statusCodes = require('../utils/statusCodes');


module.exports.runCode = async function runCode(req, res) {
    try {
        const { language, code } = req.body;
        var output = null;
        if(language=='java'){
            const filePath = await generateFileJava(language, code);
            output = await execute(filePath);
            deleteFileJava(filePath);
        }
        if(language=='py'){
            const filePath = await generateFilePy(language, code);
            output = await execute(filePath);
            deleteFilePy(filePath);
        }
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
    const { language, code } = req.body;
    if (code === '' || language === '') {
        res.json({
            success: false,
            message: "Either code body or language unspecified"
        });
        return;
    }
    next();
}

module.exports.saveCode = async function saveCode(req, res) {
    let isAuthorised = res.isAuthorised;
    if (isAuthorised) {
        let data = req.body;
        console.log(data.userId);
        let code = await userCodesModel.updateOne({ "userId": data.userId }, {
            $push: {
                codes: data.codes
            }
        }, { upsert: true });
        if (code) {
            res.json({
                success: true,
                message: "Code Added successfully",
            })
        } else {
            res.json({
                success: false,
                message: "Error while sign up, please try again!"
            })
        }
    } else {
        res.status(statusCodes.UNAUTHORIZED).json({
            success: false,
            message: "User not signed In"
        });
    }
}


module.exports.getCodeList = async function getCodeList(req, res) {
    let isAuthorised = res.isAuthorised;
    if (isAuthorised) {
        let emailId = req.params.email;
        console.log(emailId);
        var user = await userCodesModel.findOne({ email: emailId }, { codes: 1 });
        if (user) {
            res.json({
                success: true,
                codes: user.codes
            });
        } else {
            res.status(statusCodes.NOT_FOUND).json({
                success: true,
                codes: user.codes
            });
        }
    } else {
        res.status(statusCodes.UNAUTHORIZED).json({
            success: false,
            message: "User not signed In"
        });
    }
}

module.exports.updateCode = async function updateCode(req, res) {
    let isAuthorised = res.isAuthorised;
    if (isAuthorised) {
        const id = req.params.codeId;
        const data = req.body;
        console.log(data.code + " " + data.userId + " " + id);
        const isUpdated = await userCodesModel.updateOne({
            userId: data.userId,
            codes: {
                $elemMatch: {
                    "_id": id
                }
            }
        },
            {
                $set: {
                    "codes.$.code": data.code
                }
            });
        if (isUpdated.modifiedCount == 1) {
            res.json({
                success: true,
                message: "Updated successfully"
            });
        } else {
            res.status(statusCodes.NO_CONTENT).json({
                success: false,
                message: "Update failed"
            });
        }
    } else {
        res.status(statusCodes.UNAUTHORIZED).json({
            success: false,
            message: "User not signed In"
        });
    }
}

module.exports.deleteCode = async function deleteCode(req, res) {
    let isAuthorised = res.isAuthorised;
    if (isAuthorised) {
        try {
            const id = req.params.codeId;
            const data = req.body;

            const isDeleted = await userCodesModel.updateOne({
                userId: data.userId,
            },
                {
                    $pull: {
                        "codes": {
                            "_id": id
                        }
                    }
                });

            if (isDeleted.modifiedCount == 1) {
                console.log(isDeleted + "asd");
                res.json({
                    success: true,
                    message: "Deleted Successfully"
                });
            } else {
                console.log(isDeleted);
                res.status(statusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Deleted failed"
                });
            }
        } catch (err) {
            res.status(statusCodes.NOT_FOUND).json({
                success: false,
                message: "Deletion failed"
            });
        }
    } else {
        res.status(statusCodes.UNAUTHORIZED).json({
            success: false,
            message: "User not signed In"
        });
    }
}
