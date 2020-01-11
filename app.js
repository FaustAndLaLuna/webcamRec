const https = require('https');
const fs = require('fs');

global.ISWORKING = false;
global.ISDEV = false;
ISDEV = true;
//ISDEV is currently NOT used


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser 		= require('cookie-parser');
var logger 				= require('morgan');
const encodeMod 		= require('./serverSideModules/encode');
var CronJob 			= require('cron').CronJob;
var mysql 				= require('mysql');
//const job = CronJob('* * * * * *', encodeMod.encodeCron);
const job = new CronJob('*/30 * * * * *', encodeMod.encodeCron);
job.start();
var passport 			= require('passport');
var flash 				= require('connect-flash');
var session 			= require('express-session');
var cookieParser 		= require('cookie-parser');


var app = express();

require('./middleware/passport.js')(passport);
//IMPORTANT LINE;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable("trust proxy");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public'), {dotfiles: 'allow'}));
app.use('/thumbs', express.static(path.join(__dirname, './public/thumbs')));

app.use(flash());
app.use(cookieParser());
app.use(session({
	secret: "genericnonrandomstring",
	saveUninitialized: true,
	resave: true,
	cookie: {secure: true, httpOnly: false, path: '/', maxAge: 259200000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	console.log("Is user authenticated? "+ req.isAuthenticated());
	if(req.session){
		if(req.session.passport){
			if(req.session.passport.user){
				console.log(req.session.passport.user);
			}
		}
	}
	console.log(req.session);
	next();
});

require('./routes/routes.js')(app, passport);
//IMPORTANT LINE;

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
