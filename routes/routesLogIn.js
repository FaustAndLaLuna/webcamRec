//Routes for stuff
var path = require('path');
var indexRouter 	= require('./index.js');
var uploadRouter 	= require('./upload.js');
var recordRouter 	= require('./record.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');

module.exports = function(app){
	app.use('/upload', uploadRouter);
	app.use('/record', recordRouter);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});	
}




