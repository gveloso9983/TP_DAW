const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require('./models/user')
var User = require('./models/user');
const Category = require('./controllers/category');
const configAuth = require('./config')
const pdfjs = require("pdfjs-dist")
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//const Joi = require('joi');  // for validation to server site before mongo

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/TP_DAW';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
  console.log("Successful MongoDB connection ...")
 });

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var resourceRouter = require('./routes/resource');
const { TooManyRequests } = require('http-errors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//to do not get deprecation warning
app.use(session({
  secret: 'notagoodsecret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 6000000 }
}))
app.use(flash());
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(user.authenticate()))

passport.use(new FacebookStrategy({
  clientID: "741673739820853",
  clientSecret: '0a8d3fa12ea5a05a23ffd4f6542eed06',
  callbackURL: "http://localhost:7100/authenticate/facebook/callback",
  profileFields: ['id', 'name','email']
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    User.findOne({'facebookId': profile.id}, function(err, user){
      if(err){
        return done(err);}
      if(user){
        return done(null, user);}
      else {
        console.log("..............creatiiiinggg newww user ...................")
        var newUser = new User();
        newUser.username = profile.displayName;
        newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.email = profile.emails[0].value;
        newUser.facebookId = profile.id;
        newUser.registrationDate = Date.now;

        newUser.save(function(err){
          if(err)
            throw err;
          return done(null, newUser);
        })
        console.log(profile);
      }
    });
  });
}
));


passport.use(new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOne({'googleId': profile.id}, function(err, user){
        if(err)
          return done(err);
        if(user)
          return done(null, user);
        else {
          var newUser = new User();

          newUser.username = profile.displayName;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.googleId = profile.id;
          newUser.registrationDate = Date.now;

          newUser.save(function(err){
            if(err)
              throw err;
            return done(null, newUser);
          })
          console.log(profile);
        }
      });
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

app.use((req, res, next) => {
  console.log(req.session.returnTo)
  res.locals.currentUser = req.user;
  if(req.user && req.user.level === 'admin')
    res.locals.admin = true;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/resource', resourceRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
