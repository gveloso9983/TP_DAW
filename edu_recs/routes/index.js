var express = require('express');
var router = express.Router();

var User = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/registar', function(req, res){
  res.render('registar')
})

//Registar
router.post('/registar', function(req, res) {
  var reqBody = req.body
  console.log(reqBody)
  
  // Data retrieve
  User.registar(reqBody)
    .then(data => res.render('registar', {data:data, numero : req.body.numero, nome : req.body.nome ,curso: req.body.curso , password: req.body.password ,email : req.body.email}))
    .catch(err => res.render('error', {error: err}))
  ;
});
module.exports = router;
