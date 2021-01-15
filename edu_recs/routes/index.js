var express = require('express');
var router = express.Router();

var User = require('../controllers/user')


/* GET home page. */
router.get('/', function(req, res) {
  console.log(res.locals.currentUserId)
  res.render('index');
});

router.get('/login', (req,res)=>{
  res.render('login');
})

router.get('/register', function(req, res){
  res.render('register')
})

router.post('/login', async (req,res )=> {
  var reqBody = req.body
  const user = await User.login(reqBody)
  if (user){
    //res.locals.currentUserId = req.session.user_id;
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
