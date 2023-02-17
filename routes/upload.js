var express = require('express');
var router = express.Router();
var path = require('path');
var uuidv4 = require('uuid/v4');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var videosRepo = require('../conn/videosRepo');

var vidTable = new videosRepo();

//<p><%= vid.title%><br><%= vid.description%><br><%= vid.tags%><br><%= vid.linkedObj%><br><%= vid.createdAt%></p>
router.post('/', function(req, res, next){
	//TODO: Add userID and objectID.
	let filename = uuidv4();
	let thumbFolder = "/"+ filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/";
	let thumbName = filename.slice(4) + ".png";
	filename = thumbFolder + filename.slice(4);
	let filePath = path.resolve('./uploads'+filename+".webm");
	let convFilePath = path.resolve('./uploads'+filename+".mp4");
	mkdirp(path.dirname(filePath), function (err){
		if (err){
			console.log(err);
			res.json({success:false, error: err})
		}
		mkdirp(path.dirname(filePath.replace("uploads", "public/thumbs")), function (err){
			if (err){
				console.log(err);
				res.json({success:false, error: err})
			}

			fs.writeFile(filePath, '', function (err){
				if (err){
					console.log(err);
					res.json({success:false, error: err})
				}
				fTypeCheck = "";

				var form = new formidable.IncomingForm();
				form.on('fileBegin', function (name, file){
					file.path = filePath;
					fTypeCheck = file.type;
				}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}));
				form.on('error', function(err){
					if (err){
						console.log(err);
						res.json({success:false, error: err})
					}
				});
				form.parse(req, function(err, fields, files){
					console.log(fTypeCheck);
					if(!fTypeCheck.match("^video/")){
						fs.unlink(filePath, function(err){
							if (err){
								console.log(err);
								res.json({success:false, error: err})
							}
						});
						res.write("<h2>Tipo de archivo incorrecto!</h2> <br> <h1>Intenta subir un video</h1>");
						res.end();
						return;
					}
					let filePath = this.filePath;
					vidTable.createAssociated("SIN URL", filePath, fields.uid, fields.objectID, fields.description, fields.title, fields.tags);
					res.json({success: true})
					res.end();
				}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}));
			}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );
		}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );	
	}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );
});






module.exports = router;