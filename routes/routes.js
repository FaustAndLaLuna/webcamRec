//Routes for stuff
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

modules.export = function(app, passport){
	app.get('/', function(req, res, next) {
		res.sendFile(path.resolve('./public/index.html'));
		//res.render('index.ejs');
	});
	app.use('/upload', isLoggedIn, uploadRouter);
	app.use('/record', isLoggedIn, recordRouter);
	app.use('/uploads', videoRouter);
	app.use('/vid', vidPlayerRouter);
	
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	app.post('/login', passport.authenticate(
	{
		successRedirect : '/record',
		failureRedirect : '/login',
		failureFlash : true
	}
	)});
	app.get('/signup', function(req,res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/record',
		failureRedirect : '/signup',
		failureFlash : true
	}));
	app.get('/logout', function(req, res){
		req.logout();
		req.redirect('/');
	});
	
	
	
}



