var express = require('express');
var router = express.Router();
var path = require('path');
var uuidv4 = require('uuid/v4');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var videosRepo = require('../conn/videosRepo');
var userTable = require('../conn/userDB');

var vidTable = new videosRepo();
var userRepo = new userTable();

//<p><%= vid.title%><br><%= vid.description%><br><%= vid.tags%><br><%= vid.linkedObj%><br><%= vid.createdAt%></p>
router.post('/', function(req, res, next){
	//TODO: Add userID and objectID.
	filename = uuidv4();
	thumbFolder = "/"+ filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/";
	thumbName = filename.slice(4) + ".png";
	filename = thumbFolder + filename.slice(4);
	filePath = path.resolve('./uploads'+filename+".webm");
	convFilePath = path.resolve('./uploads'+filename+".mp4");
	mkdirp(path.dirname(filePath), function (err){
		if(err)
			console.log(err);
		mkdirp(path.dirname(filePath.replace("uploads", "public/thumbs")), function (err){
			if (err)
				console.log(err);

			fs.writeFile(filePath, '', function (err){
				if(err)  console.log(err);
				fTypeCheck = "";

				var form = new formidable.IncomingForm();
				form.on('fileBegin', function (name, file){
					file.path = filePath;
					fTypeCheck = file.type;
				}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}));
				form.on('error', function(err){
					console.log('An error has occurred uploading a file:\n ' + err);
				});
				form.parse(req, function(err, fields, files){
					console.log(fTypeCheck);
					// userRepo.createNew(fields.user, "passwordIsUseless", false);
					
					if(!fTypeCheck.match("^multipart/")){
						fs.unlink(filePath, function(err){
							if(err){
								console.log(err);
							}
						});
						res.write("<h2>Tipo de archivo incorrecto!</h2> <br> <h1>Intenta subir un video</h1>");
						res.end();
						return;
					}


					userRepo.usernameExists(fields.user).then((exists) => {
						if(!exists){
							userRepo.createNew(fields.user, "passwordIsUseless", false).then((etc) => {
								userRepo.getID(fields.user).then((userID) => {
									console.log(("SIN URL", filePath, userID, fields.objectID, fields.description, fields.title, fields.tags));
									vidTable.createAssociated("SIN URL", filePath, userID, fields.objectID, fields.description, fields.title, fields.tags);
								});
							});
						}
						else{
							userRepo.getID(fields.user).then((userID) => {
								console.log(("SIN URL", filePath, userID, fields.objectID, fields.description, fields.title, fields.tags));
								vidTable.createAssociated("SIN URL", filePath, userID, fields.objectID, fields.description, fields.title, fields.tags);
							});
						}
					});
					let filePath = this.filePath;
					
					res.redirect("/success.html");
					res.end();
					console.log(files);
					console.log(fields);
				}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}));
			}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );
		}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );	
	}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );
});






module.exports = router;