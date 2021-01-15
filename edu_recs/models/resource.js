var mongoose = require('mongoose')

var resourceSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['book', 'article', 'application', 'report', 'studentWork', 'monographs']
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
    hashtags: [String],
    posts: [postSchema],
    likes: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('resource', resourceSchema)