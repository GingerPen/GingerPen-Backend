const mongoose = require('mongoose');
const { userNameValidator, emailValidator } = require("../utils/validators");
const bcrypt = require('bcrypt');
const crypto = require('crypto');


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
    resetToken: String,
    profileImage: {
        type: String,
        default: 'GingerPen-Backend\\public\\images\\default_dp.png'
    }
});

userSchema.pre('save', function () {
    this.confirmPass = undefined;
});

userSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt();
    let hashString = await bcrypt.hash(this.password, salt);
    this.password = hashString;
})

userSchema.methods.createResetToken = async function () {
    return await new Promise((resolve, reject) => {
        crypto.randomBytes(48, (err, buffer) => {
          if (err) {
            reject(-1);
          }
          let token =  buffer.toString('hex');
          this.resetToken = token;
          resolve(token);
        });
      });
}

userSchema.methods.resetPasswordHandler = function (password, confirmPass) {
    this.password = password;
    this.confirmPass = confirmPass;
    this.resetToken = undefined;

}

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;