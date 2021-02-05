// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// require('dotenv').config();
// var User = require('../models/user')
// var express = require('express');
// var router = express.Router();

// router.get('/facebook',
//   passport.authenticate('facebook', { authType: 'reauthenticate', scope: ['email'] }));

// router.get('/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


// module.exports = router;




// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// require('dotenv').config();
// const User = require('../controllers/user')
// var express = require('express');
// var router = express.Router();

// // Configure Passport authenticated session persistence.
// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });


// // Configure the Facebook strategy for use by Passport.
// passport.use(new FacebookStrategy({
//     clientID: "741673739820853",
//     clientSecret: '0a8d3fa12ea5a05a23ffd4f6542eed06',
//     callbackURL: 'http://localhost:7100/authenticate/facebook/callback',
//     profile: ['id', 'displayName', 'email']
// },
//     function (accessToken, refreshToken, profile, done) {
//         //Check the DB to find a User with the profile.id
//         User.findOne({ facebook_id: profile.id }, function (err, user) {
//             if (err) {
//                 console.log(err);  // handle errors!
//             }

//             if (user) {
//                 done(null, user); //Login if User already exists
//             }
//             else { //else create a new User
//                 User.registerFB( profile)
//                     .then(user => {
//                         req.login(user, err => {
//                             if (err) return next(err)
//                             req.flash('success', `Welcome to Platform, ${user.name}`)
//                             //console.log(data)
//                             done(null, user);
//                             res.redirect('/')
//                         })
//                     })
//                     .catch(err => {
//                         req.flash('error', err.message)
//                         res.redirect('/register')
//                     })
//             }
//         });
//     }
// )
// );

// // Initialize Passport and restore authentication state, if any, from the
// // session.
// router.use(passport.initialize());
// router.use(passport.session());

// router.get('/facebook', passport.authenticate('facebook', {
//     scope: ['public_profile', 'email']
// }));

// router.get('/facebook/callback', passport.authenticate('facebook', {
//     failureRedirect: '/login'
// }),
//     (req, res) => {
//         res.redirect('/');
//     });



// module.exports = router;
