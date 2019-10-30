
const https = require('https');
const fs = require('fs');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var recordRouter = require('./routes/record');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable("trust proxy");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {dotfiles: 'allow'}));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/record', recordRouter);

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


https.createServer({
	key:fs.readFileSync('/etc/letsencrypt/live/faustandlaluna.studio/privkey.pem'),
	cert:fs.readFileSync('/etc/letsencrypt/live/faustandlaluna.studio/cert.pem'),
	ca:fs.readFileSync('/etc/letsencrypt/live/faustandlaluna.studio/chain.pem')
},app).listen(443);

module.exports = app;
