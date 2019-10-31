var express = require('express');
var router = express.Router();
var path = require('path');
const uuidv4 = require('uuid/v4');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var ffmpeg = require("fluent-ffmpeg");

const videosRepo = require('../videosRepo')
const AppDAO = require('../dao')

const dao = new AppDAO('./database.sqlite3');
const vidTable = new videosRepo(dao);
vidTable.createTable();

router.post('/', function(req, res, next){

	filename = uuidv4();
	filename = "/"+filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/"+filename.slice(4);
	filePath = path.resolve('./uploads'+filename+".webm");
	convFilePath = path.resolve('./uploads'+filename+".mp4");
	mkdirp(path.dirname(filePath), function (err){
		if(err)
			console.log(err);
		fs.writeFile(filePath, '', function (err){
			if(err) throw err;
			var form = new formidable.IncomingForm();
			//form.enconding = 'binary';
			form.on('fileBegin', (name, file) => {
				file.path = filePath;
			});
			form.on('file', function(field, file){
			});
			form.on('error', function(err){
				console.log('An error has occurred uploading a file:\n ' + err);
			});
			form.on('end', function(){
				var command = ffmpeg(filePath)
					.output(convFilePath)
					.format('mp4')
					.videoCodec('libx264')
					.on('end', () =>{
						vidTable.create(filename+".mp4", Date.now().toString());
						console.log("uploaded and converted to: "filename+".mp4");
						fs.unlink(filePath, (err) => {
							if(err){
								console.error(err);
							}
						});
					})
					.run();
			res.write("Video subido exitosamente!");
			res.end();
			});
			form.parse(req);
		});
	});
});

module.exports = router;
