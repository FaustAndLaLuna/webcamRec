//Routes for stuff
var path 				= require('path');
var indexRouter 		= require("./index.js");
var uploadRouter 		= require('./upload.js');
var videoRouter 		= require('./video.js');
var vidPlayerRouter 	= require('./vidPlayer.js');
var contactPostRouter 	= require('./contacto.js');
var objectRouter 		= require('./object.js');
var recuerdosRouter 	= require('./recuerdos.js');
var biographyRouter 	= require('./biography.js');
var adminRecord 		= require("./adminRecord.js");
var uploadRouter 		= require('./uploadAlt.js');
var removeVideo			= require('./removeVideo.js');
var removeItem			= require('./removeItem.js');
var updateVideo			= require('./updateVideo.js');
var updateItem			= require('./updateItem.js');
var edicionRouter		= require('./edicion.js');
var getObject			= require('./getObject.js');
var getVideo			= require('./getVideos.js');


module.exports = function(app, passport){
	app.use("/secretLiaRemoveVideo112355335425", removeVideo);
	app.use("/secretLiaRemoveItem112355335425", removeItem);

	app.use("/secretLiaUpdateVideo112355335425", updateVideo);
	app.use("/secretLiaUpdateItem112355335425", updateItem);

	app.get('/isLoggedIn', (req, res) => {
		let ans = {isLoggedIn : false}
		if(req.responseObj.isLoggedIn){
			ans = {isLoggedIn : true}
		}
		res.setHeader('Content-type', 'application/json');
		res.end(JSON.stringify(ans));
	})

	app.use("/", indexRouter);
	app.use("/recordadmincreateuser112355335425.html", adminRecord);

	app.use("/index.html", function(req,res,next){
		res.redirect('/');
	});
	app.use("/edicion", edicionRouter);
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
	app.use('/getObjects', getObject);
	app.use('/getVideos', getVideo);
	
	app.use('/object', objectRouter);
	
	app.get('/quees.html', function(req, res){
		res.render('quees.ejs', req.responseObj);
	});
	
	app.get('/login.html', function(req, res){
		req.responseObj.message = req.flash('loginMessage');
		res.render('login.ejs', req.responseObj);
	});
	
	app.post('/login', passport.authenticate('local-login'), (req,res) => {
		let ans = {success : false}
		if(req.user){
			ans = {success : true}
		}
		console.log(req.user);
		res.setHeader('Content-type', 'application/json');
		res.end(JSON.stringify(ans));
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
		req.logout((err) => {
			if(err) logResponse = {success: false, error: err};
			else {
				logResponse = {success: true}
			}
			res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(logResponse));
			delete req.session.returnTo;
		});
	});	
}




