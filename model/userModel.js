const mongoose = require('mongoose');
const { userNameValidator, emailValidator } = require("../utils/validators");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return userNameValidator(this.username)
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator(this.email)
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    confirmPass: {
        type: String,
        required: true,
        minLength: 5,
        validate: function () {
            return this.password == this.confirmPass;
        }
    },
});

userSchema.pre('save', function () {
    this.confirmPass = undefined;
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;