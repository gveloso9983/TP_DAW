// Resource controller

var Resource = require('../models/resource')

// Returns student list
module.exports.list = () => {
    return Resource
        .find({})
        .populate('user')
        .exec()
}

module.exports.lookUpById = id => {
    return Resource
        .findById(id)
        .populate('user')
        .populate({
            path: 'posts',
            populate: {
                path: 'user'
            }
        })
        .exec()
}

module.exports.newResource = (resource, user) => {
    var newResource = new Resource
    ({
        type: resource.type,
        title: resource.title,
        subtitle: resource.subtitle,
        hashtags: resource.hashtags,
        creationDate: resource.creationDate,
        file: resource.file
    })
    newResource.user = user;
    return newResource.save()
}

module.exports.findAndUpdate = (id,resource) => {
    return Resource
        .findByIdAndUpdate(id, resource, {runValidators: true, new: true})
        .exec()
}

module.exports.delete = id =>{
    return Resource
        .findByIdAndDelete(id)
        .exec()
}

module.exports.lookUpByCategory = category => {
    return Resource
        .find({type: category})
        .populate('user')
        .exec()
}

module.exports.deletePostFromResource = (id, postId) =>{
    return Resource
        .findByIdAndUpdate(id, {$pull: {posts: postId}})
        .exec()
}