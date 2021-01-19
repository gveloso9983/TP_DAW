var mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: String,
    RegistrationDate: {
        type: Date,
        default: Date.now
    },
});

// add into schema passport and username
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)