const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "JWT_SECRET";

// var { SECRET } = require('../../conf/conf')
var jwt = require('jsonwebtoken');

//User schema
const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        maxlength: 35,
        default: ""
    },

    last_name: {
        type: String,
        maxlength: 35,
        default: ""
    },

    email: {
        type: String,
        maxlength: 65,
        unique: true,
    },
    phone_number: {
        type: String,
        default: 0

    },
    password: {
        type: String,
        default: ""
    },
    sex: {
        type: String,
        maxlength: 1,
        default: ""
    },

},
    { timestamps: true }
);

UserSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    });

});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, phone_number: this.phone_number }, SECRET_KEY);
    return token;
}
const User = mongoose.model('User', UserSchema, 'User');
exports.User = User;