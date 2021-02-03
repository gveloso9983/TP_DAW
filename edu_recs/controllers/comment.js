// Comment controller

var Comment = require('../models/comment')
var Resource = require('../controllers/resource')

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