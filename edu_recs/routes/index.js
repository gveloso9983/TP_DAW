var express = require('express');
//var passport = require("passport")
var router = express.Router();

var User = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', (req,res)=>{
  res.render('login');
})

router.get('/users', (req,res)=>{
  let users = User.list()
    .then(data => res.render('users', {users: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
})

router.get('/user/:id', function(req, res) {
  var reqId = req.params.id
  console.log(typeof reqId)
 
  // Data retrieve
  User.lookUp(reqId)
    .then(data => res.render('user', {user: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/register', function(req, res){
  res.render('register')
})

router.post('/login', async (req,res )=> {
  var reqBody = req.body
  const user = await User.login(reqBody)
  if (user){
    res.render('user', {user}, console.log(user))
  }else{
    res.render('login', {m: 'Incorect email or password'});
  }
})


//Registar
router.post('/register', function(req, res) {
  var reqBody = req.body
  console.log(reqBody)
  
  // Data insert
  User.register(reqBody)
    .then(data => res.render('index', {data:data, number : req.body.number, name : req.body.name ,course: req.body.course , password: req.body.password ,email : req.body.email}))
    .catch(err => res.render('error', {error: err}))
  ;
});
module.exports = router;
