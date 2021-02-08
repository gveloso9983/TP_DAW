var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    categories: [String]
});

module.exports = mongoose.model('category', categorySchema)