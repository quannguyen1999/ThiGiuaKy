//add file upload 

//add view engine setup

//add require class api and file updload

// add file enable file upload

//add router

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fileUpload = require('express-fileupload');


//class api
var indexRouter = require('./routes/index');
var classesRouter = require('./routes/class');
var studentRouter = require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// enable file upload
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 1000 * 1024 * 1024 }
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use('/', classesRouter);
app.use('/', indexRouter);
app.use('/', studentRouter);


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
  res.json({
    message: err.message,
    error: err
  });

  // res.render('error');
});

module.exports = app;
