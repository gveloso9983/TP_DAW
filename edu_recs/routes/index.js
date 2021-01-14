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

/* GET home page. */
router.get('/', function(req, res) {
  console.log(res.locals.currentUserId)
  res.render('index');
});

router.get('/login', (req,res)=>{
  res.render('login');
})

router.get('/users', requireLogin, (req,res)=>{
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
    res.locals.currentUserId = req.session.user_id;
    req.session.user_id = user._id
    res.render('user', {user}, console.log(user))
  }else{
    res.render('login', {m: 'Incorect email or password'});
  }
})

router.get('/logout', (req,res)=>{
  //req.session.user_id = null;
  req.session.destroy();
  res.redirect('/')
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
