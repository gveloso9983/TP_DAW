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