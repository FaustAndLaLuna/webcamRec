//Routes for stuff
var path = require('path');
var indexRouter 	= require('./index.js');
var uploadRouter 	= require('./upload.js');
var recordRouter 	= require('./record.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');

module.exports = function(app){
	app.use('/upload', uploadRouter);
	// EDIT TO ADD USER DATA TO VID, ALSO ADD USER INFO 
	
	app.use('/record', recordRouter);
	// EDIT TO ADD USER INFO TO EJS, ALSO LINK TO UPLOAD
	/*
		ADD REST OF DATA TO BIOGRAFO.videos TABLE in conn/videosRepo.js and routes/upload
		ADD TRANSCRIPTION STUFF.
	*/
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});	
}




