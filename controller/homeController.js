module.exports.testing = function testing(req,res){
    res.user.password = undefined;
    res.user.__v = undefined;
    
    res.json({
        success: true,
        message: "Home user is signed in",
        data: res.user
    });
}