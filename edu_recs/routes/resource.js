var express = require('express');
var router = express.Router();

var Resource = require('../controllers/resource')

router.get('/', (req, res) => {
    Resource.list()
        .then(data => res.render('resources', { resources: data }, console.log(data)))
        .catch(err => res.render('error', { error: err }))
})

router.get('/new', (req,res)=>{
    res.render('addResource');
})

router.get('/:id', (req,res)=>{
    const {id} = req.params;
    Resource.lookUpById(id)
        .then(data => res.render('resource', { resource: data }, console.log(data)))
        .catch().catch(err => res.render('error', { error: err }))
})



module.exports = router;
