var mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: String,
    RegistrationDate: {
        type: Date,
        default: Date.now
    },
    facebookId: String
});

// add into schema passport and username
userSchema.plugin(passportLocalMongoose);

// userSchema.statics.findOrCreate = function findOrCreate(profile, cb){
//     var userObj = new this();
//     console.log("i am in findOrcREATE FUNCTION ............... ________ PROFILE" + profile)
//     this.findOne({_id : profile.id},function(err,result){ 
//         if(!result){
//             userObj.username = profile.displayName;
//             userObj.name = profile.name;
//             userObj.email = profile.email;
//             userObj.facebookId = profile.id;
//             userObj.save(cb);
//         }else{
//             cb(err,result);
//         }
//     });
// };


module.exports = mongoose.model('user', userSchema)

