//Routes for stuff
var path = require('path');
var uploadRouter 	= require('./upload.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');
var 

module.exports = function(app, passport){
	
	app.get('/', function(req, res, next) {
		res.render('index.ejs', req.responseObj);
		/*
			PROGRAM CAROUSEL AND CAROUSEL LINKS
			PROGRAM ALERT IF NO OBJECTS
		*/
	});
	app.get('/aboutUs.html', function(req, res, next) {
		res.render('aboutUs.ejs', req.responseObj);
	});
	app.get('/contacto.html', function(req, res, next) {
		res.render('contacto.ejs', req.responseObj);
	});
	
	app.use('/uploads', videoRouter);
	app.use('/vid', vidPlayerRouter);
	
	app.get('/objetoComprador.html', function(req, res){
		res.render('objetoComrpador.ejs', req.responseObj);
		/*
			PROGRAM RETRIEVAL FROM DATABASE.
			PROGRAM EJS.
			*/
	});
	
	app.get('/objetos.html', function(req, res){
		res.render('objetos.ejs', req.responseObj);
		/*
			PROGRAM RETRIEVAL FROM DATABASE.
			PROGRAM EJS.
		*/
	});
	
	app.get('/objetoVendedor.html', function(req, res){
		res.render('objetoVendedor.ejs', req.responseObj);
		/*
			PROGRAM RETRIEVAL FROM DATABASE.
			PROGRAM EJS.
		*/
	});
	
	app.get('/quees.html', function(req, res){
		res.render('quees.ejs', req.responseObj);
	});
	
	app.get('/logIn.html', function(req, res){
		req.responseObj.message = req.flash('loginMessage');
		res.render('logIn.ejs', req.responseObj);
	});
	
	app.post('/login', passport.authenticate('local-login',
	{
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));
	app.get('/signUp.html', function(req,res){
		res.render('signUp.ejs', {message: req.flash('signupMessage')});
	});
	app.post('/signUp', passport.authenticate('local-signup',{
		successRedirect : '/',
		failureRedirect : '/signup',
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




