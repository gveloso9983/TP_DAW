var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('post', postSchema)