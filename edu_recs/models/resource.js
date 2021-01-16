var mongoose = require('mongoose')
var postSchema = require('./post')

var resourceSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['book', 'article', 'application', 'report', 'studentwork', 'monographs']
    },
    title: {
        type: String,
        required: true,
        maxlength: 20
    },
    subtitle: String,
    creationDate: {
        type: Date,
        default: Date.now
    },
    RegistrationDate: {
        type: Date,
        default: Date.now
    },
    visibility: String,
    hashtags: {
        type: [String],
        lowercase: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postSchema'
    }],
    likes: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('resource', resourceSchema)