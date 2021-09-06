//Routes for stuff
var path = require('path');
var indexRouter 	= require("./index.js");
var uploadRouter 	= require('./upload.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');
var contactPostRouter = require('./contacto.js');
var objectRouter = require('./object.js');
var recuerdosRouter = require('./recuerdos.js');
var sell2 = require('./sell2.js');
var biographyRouter = require('./biography.js');
var uploadRouter 	= require('./uploadAlt.js');
var getUserList = require('./getUserList.js');


module.exports = function(app, passport){
	app.use('/secretLiaUploadToDisk112355335425', uploadRouter);
	app.use('/secretLiaSellUpload112355335425', sell2);
	app.use('/secretGetUserList', getUserList);
	
	app.use("/", indexRouter);
	app.use("/index.html", function(req,res,next){
		res.redirect('/');
	});
	app.use("/recuerdos.html", recuerdosRouter);
	app.get('/aboutUs.html', function(req, res, next) {
		res.render('aboutUs.ejs', req.responseObj);
	});
	app.use('/biografia.html', biographyRouter);
	app.use('/contacto.html', contactPostRouter);
	app.get('/objetos.html', function(req, res, next){
		res.redirect("/object");
	});
	

	
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




