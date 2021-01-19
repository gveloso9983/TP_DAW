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