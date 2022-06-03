const userCodesModel = require("../model/userCodeModel");
const statusCodes = require("../utils/statusCodes");

module.exports.testing = function testing(req, res) {

    let isAuthorised = res.isAuthorised;
    if (isAuthorised) {
        res.user.password = undefined;
        res.user.__v = undefined;
        res.json({
            success: true,
            message: "Home user is signed in",
            data: res.user
        });
    } else {
        res.status(statusCodes.UNAUTHORIZED).json({
            success: false,
            message: "User not signed In"
        });
    }
}
