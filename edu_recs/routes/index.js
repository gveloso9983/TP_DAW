var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
const passport = require('passport');
var User = require('../models/user')

var User = require('../controllers/user')

//middleware require login
var requireLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
      if(req.method=="GET")
          req.session.returnTo = req.originalUrl
      req.flash('error', 'You must login first!')
      return res.redirect('/login')
  }
  next();
}

var verifyAdmin = (req, res, next) => {
  if(req.isAuthenticated()){
    if(req.user.level == "admin"){
      next()
    }else{
      req.flash('error', "You don't have permission to enter this area!")
      return res.redirect('/resource')
    }
  }else{
    req.flash('error', 'You must login first!')
      return res.redirect('/login')
  }
}

router.get('/user',verifyAdmin, function (req,res) {
  User.list()
    .then(data => res.render('users', {users: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/register', function (req, res) {
  res.render('register')
})

router.get('/logout', (req, res) => {
  //req.session.user_id = null;
  //req.session.destroy();
  req.logOut()
  req.flash('success', "Logout. Goodbye!")
  res.redirect('/')
})

router.get('/authenticate/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/authenticate/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.get('/authenticate/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/authenticate/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  router.get('/profile', requireLogin, (req, res) => {
    //find user
    User.lookUpById(req.user)
        .then(user => res.render('user', { user }))
        .catch(err => res.render('error', { error: err }))
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  //req.session.user_id = user._id
  req.flash('success', 'Welcome back!')
  const redirectUrl = req.session.returnTo || '/resource';
  delete req.session.returnTo;
  res.redirect(redirectUrl)
})

//Registar
router.post('/register', function (req, res) {
  var reqBody = req.body

  // Data insert
  User.register(reqBody)
    .then(user => {
      req.login(user, err => {
        if (err) return next(err)
        req.flash('success', `Welcome to Platform, ${user.name}`)
        //console.log(data)
        res.redirect('/')
      })
    })
    .catch(err => {
      req.flash('error', err.message)
      res.redirect('/register')
    })
});

module.exports = router;
