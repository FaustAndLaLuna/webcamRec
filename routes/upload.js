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

const SIZE = '640x480'


vidTable.createTable();

router.post('/', function(req, res, next){

	filename = uuidv4();
	thumbFolder = "/"+filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/";
	thumbName = filename.slice(4) + ".png";
	filename = thumbFolder + filename.slice(4);
	filePath = path.resolve('./uploads'+filename+".webm");
	convFilePath = path.resolve('./uploads'+filename+".mp4");
	mkdirp(path.dirname(filePath), function (err){
		if(err)
			console.log(err);
		fs.writeFile(filePath, '', function (err){
			if(err)  console.log(err);
			fTypeCheck = "";
			var form = new formidable.IncomingForm();
			//form.enconding = 'binary';
			form.on('fileBegin', (name, file) => {
				file.path = filePath;
				fTypeCheck = file.type;
			});
			form.on('file', function(field, file){
			});
			form.on('error', function(err){
				console.log('An error has occurred uploading a file:\n ' + err);
			});
			form.on('end', function(file){
				console.log(fTypeCheck);
				if(!fTypeCheck.match("^video/")){
					fs.unlink(filePath, (err) =>{
						if(err){
							console.log(err);
						}
					});
					res.write("<h2>Tipo de archivo incorrecto!</h2> <br> <h1>Intenta subir un video</h1>");
					res.end();
					return;
				}
				thumbnailOptions = {
					size=SIZE,
					folder = thumbFolder,
					filename = thumbName,
					count = 1,
				};
				var command = ffmpeg(filePath)
					.output(convFilePath)
					.format('mp4')
					.size(SIZE)
					.videoCodec('libx264')
					.screenshots(thumbnailOptions)
					.on('end', () =>{
						vidTable.create(filename+".mp4", Date.now().toString());
						console.log("uploaded and converted to: " + filename+".mp4");
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
