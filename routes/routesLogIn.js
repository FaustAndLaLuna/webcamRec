//Routes for stuff
var path = require('path');
var indexRouter 	= require('./index.js');
var uploadRouter 	= require('./upload.js');
var recordRouter 	= require('./record.js');
var videoRouter 	= require('./video.js');
var vidPlayerRouter = require('./vidPlayer.js');
var sell = require('./sell.js');
const QandARepo = require('../conn/QandA.js');
var createError = require('http-errors');
const objectsRepo = require('../conn/objectsRepo.js')
const questionsDB = new QandARepo();
const objectsDB = new objectsRepo();

module.exports = function(app){
	app.use('/upload', uploadRouter);
	// EDIT TO ADD USER DATA TO VID, ALSO ADD USER INFO 
	
	app.use('/record', recordRouter);
	app.use('/sell', sell);
	app.post('/hacerPregunta', function(req,res, next){
		if(req.query.objectID){
			objectsDB.getObject(req.query.objectID).then( (obj) => {
				if(obj.length != 0){
					req.responseObj.obj = obj[0];
					questionsDB.create(req.query.question, req.query.objectID);
				}
				else{
					  next(createError(404));
					  return
				}
			});
		}
		else{
			objectsDB.getAll().then(function(objects){
				req.responseObj.objects = objects;
				res.render("objetos.ejs", req.responseObj);
			});
		}
	});
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




