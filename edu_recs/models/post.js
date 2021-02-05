var mongoose = require('mongoose')
var comment = require('./comment')

var postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'}
    ],
    resources:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resource'}
    ]
});

//mongo midleware for deleting
postSchema.post('findByIdAndDelete', async function(post){
    if(post.comments.length){
        await comment.deleteMany({_id: {$in: post.comments}})
    }
})

module.exports  = mongoose.model('post', postSchema)