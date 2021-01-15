var mongoose = require('mongoose')
//const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    number: String,
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    course: String
});

// add into schema passport and username
// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)