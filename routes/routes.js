//Routes for stuff
var path = require('path');
var indexRouter 	= require("./index.js");
var uploadRouter 	= require('./upload.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');
var contactPostRouter = require('./contacto.js');
var objectRouter = require('./object.js');
var sell = require('./sell.js');

module.exports = function(app, passport){
	
	app.use("/", indexRouter);
	app.get('/aboutUs.html', function(req, res, next) {
		res.render('aboutUs.ejs', req.responseObj);
	});
	app.use('/contacto.html', contactPostRouter);
	app.get('/objetos.html', function(req, res, next){
		res.redirect("/object");
	});
	
	app.use('/sell', sell);
	
	app.use('/uploads', videoRouter);
	app.use('/vid', vidPlayerRouter);
	
	app.use('/object', objectRouter);
	
	app.get('/quees.html', function(req, res){
		res.render('quees.ejs', req.responseObj);
	});
	
	app.get('/login.html', function(req, res){
		req.responseObj.message = req.flash('loginMessage');
		res.render('login.ejs', req.responseObj);
	});
	
	app.post('/login', passport.authenticate('local-login',
	{
		successRedirect : '/',
		failureRedirect : '/login.html',
		failureFlash : true
	}));
	app.get('/signup.html', function(req,res){
		req.responseObj.message = req.flash('signupMessage');
		res.render('signup.ejs', req.responseObj);
	});
	app.post('/signUp', passport.authenticate('local-signup',{
		successRedirect : '/',
		failureRedirect : '/signup.html',
		failureFlash : true
	}));
	/*
		ADD REST OF DATA TO BIOGRAFO.users TABLE in middleware/Passport.js
	*/
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});	
}




