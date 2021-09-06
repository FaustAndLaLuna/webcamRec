//Routes for stuff
var path 				= require('path');
var indexRouter 		= require("./index.js");
var uploadRouter 		= require('./upload.js');
var uploadAltRouter 	= require('./uploadAlternative.js');
var videoRouter 		= require('./video.js');
var vidPlayerRouter 	= require('./vidPlayer.js');
var contactPostRouter 	= require('./contacto.js');
var objectRouter 		= require('./object.js');
var recuerdosRouter 	= require('./recuerdos.js');
var sell2 				= require('./sell2.js');
var biographyRouter 	= require('./biography.js');
var uploadRouter 		= require('./uploadAlt.js');
var getUserList			= require('./getUserList.js');
var adminRecord 		= require("./adminRecord.js");
var getAllObjects		= require('./getAllObjects.js');

module.exports = function(app, passport){
	app.use('/secretLiaUploadToDisk112355335425', uploadAltRouter);
	app.use('/secretLiaSellUpload112355335425', sell2);
	app.use('/secretGetUserList112355335425', getUserList);
	app.use('/getAllObjects', getAllObjects);

	app.use("/", indexRouter);
	app.use("/recordadmincreateuser112355335425.html", adminRecord);

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
		failureRedirect : '/login.html',
		failureFlash : true
	}), (req,res) => {
		res.redirect(req.session.returnTo || "/");
		delete req.session.returnTo;
	});
	app.get('/signup.html', function(req,res){
		req.responseObj.message = req.flash('signupMessage');
		res.render('signup.ejs', req.responseObj);
	});
	app.post('/signUp', passport.authenticate('local-signup',{
		failureRedirect : '/signup.html',
		failureFlash : true
	}), (req,res) => {
		res.redirect(req.session.returnTo || "/");
		delete req.session.returnTo;
	});
	/*
		ADD REST OF DATA TO BIOGRAFO.users TABLE in middleware/Passport.js
	*/
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect(req.session.returnTo || "/");
		delete req.session.returnTo;
	});	
}




