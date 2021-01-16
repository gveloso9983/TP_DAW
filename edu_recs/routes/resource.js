var express = require('express');
var router = express.Router();

var Resource = require('../controllers/resource')

//middleware require login
var requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        //req.flash('error','You must be login first!')
        return res.redirect('/login')
    }
    next();
}

router.get('/', (req, res) => {
    Resource.list()
        .then(data => res.render('resources', { resources: data }, console.log(data)))
        .catch(err => res.render('error', { error: err }))
})

router.get('/new', requireLogin, (req, res) => {
    res.render('addResource');
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Resource.lookUpById(id)
        .then(data => res.render('resource', { resource: data }, console.log(data)))
        .catch().catch(err => res.render('error', { error: err }))
})

router.get('/:id/edit', requireLogin, (req, res) => {
    const { id } = req.params;
    Resource.lookUpById(id)
        .then(data => res.render('editResource', { resource: data }, console.log(data)))
        .catch().catch(err => res.render('error', { error: err }))
})

router.post('/', (req, res) => {
    var reqBody = req.body
    console.log(reqBody)

    //Data insert
    Resource.newResource(reqBody)
        .then(data => res.redirect(`/resource/${data._id}`))
        .catch(err => res.render('error', { error: err }))
})

router.put('/:id', (req,res)=>{
    const { id } = req.params;
    Resource.findAndUpdate(id, req.body)
        .then(data => res.redirect(`/resource/${data._id}`))
        .catch(err => res.render('error', { error: err }))
})

module.exports = router;
