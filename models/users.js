var mongoose = require('mongoose');

const user = mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    email: String,
    gender: String,
    mobile: String,
    isOnline: Boolean,
    birthDate: String,
    type: String,
    token: String,
    cars: [{
        title: String,
        lastVisit: String,
        yearModel: String,
        company: String
    }]
});

module.exports = mongoose.model('User', user);