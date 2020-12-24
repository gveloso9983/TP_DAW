// User controller

var User = require('../models/user')

// Returns student list
module.exports.list = () => {
    return User
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id  => {
    return User
        .findOne({numero: id})
        .exec()
}

module.exports.registar = user => {
    var newUser = new User
    ({
        numero : user.numero,
        nome : user.nome,
        curso : user.curso,
        username: user.username,
        password: user.password,
        email : user.email
    })
    return newUser.save()
}
