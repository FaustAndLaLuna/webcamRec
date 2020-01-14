//Routes for stuff
var path = require('path');
var indexRouter 	= require('./index.js');
var uploadRouter 	= require('./upload.js');
var recordRouter 	= require('./record.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');

module.exports = function(app, passport){
	var responseObj = {isLoggedIn: false}
	app.use(function(req,res,next){
		if(req.isAuthenticated()){
			responseObj.user = req.user;
			responseObj.isLoggedIn = true;
		}
			next();
		else res.redirect('/login');
	});
	
	app.get('/', function(req, res, next) {
		res.render('index.ejs', responseObj);
		/*
			PROGRAM CAROUSEL AND CAROUSEL LINKS
			PROGRAM ALERT IF NO OBJECTS
		*/
	});
	app.get('/aboutUs.html', function(req, res, next) {
		res.render('aboutUs.ejs', responseObj);
	});
	app.get('/contacto.html', function(req, res, next) {
		res.render('contacto.ejs', responseObj);
	});
	
	app.use('/uploads', videoRouter);
	app.use('/vid', vidPlayerRouter);
	

	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	app.post('/login', passport.authenticate('local-login',
	{
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));
	app.get('/signup', function(req,res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});	
}




