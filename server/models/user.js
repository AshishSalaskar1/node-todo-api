let mongoose = require('mongoose');
let validator = require('validator');

let User = mongoose.model('User',{
    email: {
        type: String,
        required : true,
        minLength : 1 ,
        trim: true,
        unique: true,
        validate : {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens : [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = {
    User
 };