var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

module.exports = mongoose.model('comment', commentSchema)