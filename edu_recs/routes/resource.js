var express = require('express');
var router = express.Router();

var Resource = require('../controllers/resource')

router.get('/', (req,res)=>{
  res.send('<h1>Resources</h1>')
})

module.exports = router;
