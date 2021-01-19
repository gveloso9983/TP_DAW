var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
const passport = require('passport');

var User = require('../controllers/user')


/* GET home page. */
router.get('/', function(req, res) {
  console.log(res.locals.currentUserId)
  res.render('index');
});

router.get('/login', (req,res)=>{
  res.render('login' );
})

router.get('/register', function(req, res){
  res.render('register')
})

router.get('/logout', (req,res)=>{
  //req.session.user_id = null;
  //req.session.destroy();
  req.logOut()
  req.flash('success', "Logout. Goodbye!")
  res.redirect('/')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req,res )=> {
  //req.session.user_id = user._id
  req.flash('success', 'Welcome back!')
  const redirectUrl = req.session.returnTo || '/resource';
  delete req.session.returnTo;
  res.redirect(redirectUrl)
})

//Registar
router.post('/register', function(req, res) {
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
