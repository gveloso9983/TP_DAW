// Resource controller

var Resource = require('../models/resource')

// Returns student list
module.exports.list = () => {
    return Resource
        .find({})
        .exec()
}

module.exports.lookUpById = id => {
    return Resource
        .findById(id)
        .exec()
}

module.exports.newResource = resource => {
    var newResource = new Resource
    ({
        authorId: '5fff8db9c3f9de18a0d41c5b',
        type: resource.type,
        title: resource.title,
        subtitle: resource.subtitle,
        hashtags: resource.hashtags
    })
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
        .exec()
}