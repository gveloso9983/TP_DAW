// Category controller

var Categories = require('../models/category')

module.exports.getCategories = () =>{
    return Categories
        .find({})
        .exec()
}