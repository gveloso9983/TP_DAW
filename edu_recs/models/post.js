var mongoose = require('mongoose')
var commentSchema = require('./comment')

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
    comments: [commentSchema],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentSchema'}
    ],
});


module.exports = Post = mongoose.model('post', postSchema)