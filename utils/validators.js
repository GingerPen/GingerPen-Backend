module.exports.userNameValidator = function userNameValidator(username){
    const NO_SPEICAL_CHARACTER = /^[a-zA-Z0-9]{4,10}$/
    return NO_SPEICAL_CHARACTER.test(username);
}

module.exports.emailValidator = function emailValidator(email){
    const EMAIL_VALIDATOR = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return EMAIL_VALIDATOR.test(email);
}