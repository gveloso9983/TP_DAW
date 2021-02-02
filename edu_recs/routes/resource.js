var express = require('express');
var router = express.Router({ mergeParams: true});
var fs = require('fs');
//used for upload purposes
var multer  = require('multer')
///
var uploadFolder = __dirname + '/../uploads/';
const Resource = require('../controllers/resource')
const User = require('../controllers/user')
const Post = require('../controllers/post');
const e = require('express');

let categories = ['book', 'article', 'application', 'report', 'studentwork', 'monographs'];

//middleware require login
var requireLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be logged in first!')
        return res.redirect('/login')
    }
    next();
}

var isAuthor = async (req,res,next) => {
    const { id } = req.params;
    const resource = await Resource.lookUpById(id)
    if (!resource.user.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!')
        res.redirect(`/resource/${id}`)
    }
    next();
}

var isPostAuthor = async (req,res,next) => {
    const { id, postId } = req.params;
    const post = await Post.lookUpById(postId)
    if (!post.user.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!')
        res.redirect(`/resource/${id}`)
    }
    next();
}
//upload middleware
function endsWithAny(suffixes, string) {
    for (let suffix of suffixes) {
        if(string.endsWith(suffix))
            return true;
    }
    return false;
}

var upload = multer({ 
    dest: 'uploads/',
    limits:{
        fileSize:10000000,
    },
    fileFilter(req, file, cb){
        console.log(file.originalname)
           if(!endsWithAny(['.TXT','.PNG','.JPG','.PDF','.txt','.png','.jpg','.pdf'], file.originalname)){
                console.log('Nope')
                cb(new Error('File Format is incorrect'));
           }
           else{
                cb(undefined, true);
           }
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})
//
router.get('/', (req, res) => {
    Resource.list()
        .then(data => res.render('resources', { resources: data, categories, category: 'all' }, console.log('Data: ' + data)))
        .catch(err => res.render('error', { error: err }))
})

router.get('/new', requireLogin, (req, res) => {
    res.render('addResource', {categories});
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Resource.lookUpById(id)
        .then(data => res.render('resource', { resource: data, id}, console.log(data)))
        .catch(()=> {
            req.flash('error','Cannot find that resource')
            res.redirect('/resource')
        })
        //.catch(err => res.render('error', { error: err }))
})

router.get('/:id/edit', requireLogin, isAuthor, (req, res) => {
    const { id } = req.params;
    Resource.lookUpById(id)
        .then(data => res.render('editResource', { resource: data, categories }, console.log(data)))
        .catch(err => res.render('error', { error: err }))
})

router.get('/download/:filename', (req, res)=>{
    // console.log( 'req : ')
    // console.log( req)
    try {
        res.download(uploadFolder + req.params.filename);
    }
    catch(err){
        console.log(err)
        console.log(req.params)
    }
    
})

// router.post('/upload', upload.single('upload'), async(req, res)=>{
//     res.send();
// },(err, req, res, next) =>res.status(404).send({error:err.message}))

router.post('/', requireLogin, upload.single('file'), async (req, res) => {
    var reqBody = req.body;
    var reqFile = req.file;
    // var reqParams = req.params;
    // console.log(JSON.stringify('reqParams : ' + reqParams.file))
    // console.log(JSON.stringify('req.user : ' + req.user))
    //find user
    const user = await User.lookUpById(req.user)
    console.log(user)
    //Data insert
    console.log(JSON.stringify('fileName : ' + reqFile.filename))
    console.log(JSON.stringify('originalName : ' + reqFile.originalname))
    console.log(JSON.stringify('reqFile : ' + reqFile.params))
    Resource.newResource(reqBody,reqFile ,user)
        .then(data => {
            console.log('IM HERE ADDING A NEW RESOURCE')
            //res.send(file);
            req.flash('success', 'Successfully created a new resource')
            res.redirect(`/resource/${data._id}`)
        })
        .catch(err => res.render('error', { error: err }))
})

router.post('/category', (req,res)=>{
   const {type} = req.body
   if (type=='all') res.redirect('/resource')
   Resource.lookUpByCategory(type)
     .then(data => res.render('resources', { resources: data, categories , category: type }, console.log(data)))
     .catch(err => res.render('error', { error: err }))
})

router.post('/:id/post', requireLogin, (req, res)=>{
    const { id } = req.params;

    User.lookUpById(req.user)
        .then(user=>{
            Post.newPost(req.body, user)
                .then(post=>{
                   Resource.lookUpById(id)
                    .then(r=>{
                        r.posts.push(post)
                        post.resources.push(r)
                        post.save()
                        r.save()
                            .then(()=>{
                                req.flash('success', 'Successfully made a new post')
                                console.log('IM PASSING HERE')
                                res.redirect(`/resource/${id}`)
                        })
                    })
                })
        })
        .catch(err => res.render('error', { error: err }))
})

router.delete('/:id', requireLogin, isAuthor, (req,res)=>{
    const { id } = req.params;
    Resource.delete(id)
        .then(() => {
            req.flash('success', 'Successfully deleted resource')
            res.redirect('/resource')
        })
        .catch(err => res.render('error', { error: err }))
})

router.delete('/:id/post/:postId', isPostAuthor, (req,res)=>{
    const {id, postId} = req.params

    Resource.deletePostFromResource(id, postId)
        .then(()=>{
            Post.delete(postId)
                .then(()=> {
                    req.flash('success', 'Successfully deleted post')
                    res.redirect(`/resource/${id}`)
            })
        })
        .catch(err => res.render('error', { error: err }))
})

router.put('/:id', requireLogin, isAuthor, (req,res)=>{
    const { id } = req.params;
    Resource.findAndUpdate(id, req.body)
        .then(data => {
            req.flash('success', 'Successfully updated resource')
            res.redirect(`/resource/${data._id}`)
        })
        .catch(err => res.render('error', { error: err }))
})

module.exports = router;
