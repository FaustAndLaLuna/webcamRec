//Routes for stuff
var path = require('path');
var indexRouter 	= require('./index.js');
var uploadRouter 	= require('./upload.js');
var recordRouter 	= require('./record.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = function(app, passport){
	app.get('/', function(req, res, next) {
		res.render('index.ejs');
	});
	app.use('/upload', isLoggedIn, uploadRouter);
	app.use('/record', isLoggedIn, recordRouter);
	app.use('/uploads', videoRouter);
	app.use('/vid', vidPlayerRouter);
	
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	app.post('/login', function(req, res, next){
		passport.authenticate('local-login',{
			failureFlash : true
		},function(err, user, info){
			console.log("Pkachu face");
			if (err) {return next(err);}
			if(!user){return res.redirect('/login');}
			req.logIn(user, function(err){
				console.log(user);
				console.log("logged in!");
				if(err) {return next(err);}
				return res.redirect('/record');
			});
		});
	});
	app.get('/signup', function(req,res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	app.post('/signup', function(req, res, next){
		passport.authenticate('local-signup',{
			failureFlash : true
		},function(err, user, info){
			if (err) {return next(err);}
			if(!user){return res.redirect('/login');}
			req.logIn(user, function(err){
				if(err) {return next(err);}
				return res.redirect('/record');
			});
		});
	});
	
	app.get('/logout', function(req, res){
		req.logout();
		req.redirect('/');
	});
	
	
	
}




