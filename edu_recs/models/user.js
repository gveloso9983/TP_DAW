var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    email: String,
    password: String,
    curso: String
});

module.exports = mongoose.model('user', userSchema)