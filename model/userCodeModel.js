const mongoose = require('mongoose');

const collaboratorsSubSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    }
});

const codeSubSchema = mongoose.Schema({
    format: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    collaborators: [collaboratorsSubSchema]
});

const userCodesScheme = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
   codes:[codeSubSchema]
});

const userCodesModel = mongoose.model('userCodesModel', userCodesScheme);

module.exports = userCodesModel;