const monngoose = require('mongoose');

const userSchema = new monngoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    userType: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
});

module.exports = monngoose.model('User', userSchema);