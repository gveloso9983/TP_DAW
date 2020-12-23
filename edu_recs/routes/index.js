var express = require('express');
var router = express.Router();

var User = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/user/:id', function(req, res) {
  var reqId = req.params.id
  console.log(typeof reqId)
 
  // Data retrieve
  User.lookUp(reqId)
    .then(data => res.render('user', {user: data}, console.log(data)))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/registar', function(req, res){
  res.render('register')
})

//Registar
router.post('/registar', function(req, res) {
  var reqBody = req.body
  console.log(reqBody)
  
  // Data insert
  User.registar(reqBody)
    .then(data => res.render('register', {data:data, numero : req.body.numero, nome : req.body.nome ,curso: req.body.curso , password: req.body.password ,email : req.body.email}))
    .catch(err => res.render('error', {error: err}))
  ;
});
module.exports = router;
