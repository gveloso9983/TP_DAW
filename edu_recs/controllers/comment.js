// Comment controller

var Comment = require('../models/comment')

module.exports.newComment = (comment, user) => {
    var newComment = new Comment
    ({
        content: comment.content
    })
    newComment.user = user;
    return newComment.save()
}

module.exports.delete = id =>{
    return Comment
        .findByIdAndDelete(id)
        .exec()
}

module.exports.deleteAllFromUser = (userId) => {
    return Comment.find({'user': userId}).exec((err,comments)=>{
        comments.forEach((comment)=>{
            Comment.findByIdAndDelete(comment._id).exec()
        })
    })
}