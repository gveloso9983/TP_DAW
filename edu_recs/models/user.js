var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    number: String,
    name: String,
    email: String,
    password: String,
    course: String
});

module.exports = mongoose.model('user', userSchema)