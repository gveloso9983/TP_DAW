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
//const Joi = require('joi');  // for validation to server site before mongo

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/TP_DAW';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
  console.log("Successful MongoDB connection ...")
});

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var resourceRouter = require('./routes/resource');

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
  resave: false,
  saveUninitialized: false,
  cookie:{secure: false, maxAge: 60000}
}))
app.use(flash());
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(user.authenticate()))

passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req,res,next)=>{
  console.log(req.session.returnTo)
  res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
 })

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/resource', resourceRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
