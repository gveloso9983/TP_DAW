// Post controller

var Post = require('../models/post')
var Resource = require('../controllers/resource')

module.exports.newPost = (post, user) => {
    var newPost = new Post
    ({
        content: post.content
    })
    newPost.user = user;
    return newPost.save()
}

module.exports.delete = id =>{
    return Post
        .findByIdAndDelete(id)
        .exec()
}

module.exports.lookUpById = id => {
    return Post
        .findById(id)
        .exec()
}

module.exports.deleteCommentFromPost = (id, commentId) => {
    return Post
        .findByIdAndUpdate(id, { $pull: { comments: commentId } })
        .exec()
}

module.exports.deleteAllFromUser = (userId) => {
    return Post.find({'user': userId}).exec((err,posts)=>{
        posts.forEach((post)=>{
            Post.findByIdAndDelete(post._id).exec()
        })
    })
}