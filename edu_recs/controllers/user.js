// User controller

var User = require('../models/user')

// Returns student list
module.exports.list = () => {
    return User
        .find()
        .sort({name:1})
        .exec()
}

module.exports.lookUp = id  => {
    return User
        .findOne({number: id})
        .exec()
}

module.exports.register = user => {
    var newUser = new User
    ({
        number : user.number,
        name : user.name,
        course : user.course,
        password: user.password,
        email : user.email
    })
    return newUser.save()
}

module.exports.login = user => {
    const {email, password} = user
    return User
        .findOne({ email: email, password: password })
        .exec()
}
