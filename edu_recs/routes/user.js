var express = require('express');
var router = express.Router();

var User = require('../controllers/user')

//middleware require login
var requireLogin = (req, res, next) =>{
  if (!req.session.user_id){
    //req.flash('error','You must be login first!')
    return res.redirect('/login')
  }
  next();
}

router.get('/', (req,res)=>{
  User.list()
    .then(data => res.render('users', {users: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
})

router.get('/:id', requireLogin, function(req, res) {
  var reqId = req.params.id
  console.log(typeof reqId)
 
  // Data retrieve
  User.lookUp(reqId)
    .then(data => res.render('user', {user: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
  ;
});

module.exports = router;
