var express = require('express');
var router = express.Router();
var path = require('path');
var uuidv4 = require('uuid/v4');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
const objectsRepo = require('../conn/objectsRepo.js')
const objectsDB = new objectsRepo();

router.get('/', function(req,res,next){
	res.render('vender.ejs', req.responseObj);
	});

router.post('/', function(req, res, next){
	//TODO: Add userID and objectID.
	filename = uuidv4();
	thumbFolder = "/"+ filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/";
	thumbName = filename.slice(4) + ".";
	filename = thumbFolder + filename.slice(4);
	filePath = path.resolve('./thumbs'+filename+".");
	convFilePath = path.resolve('./thumbs'+filename+".");
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
					if(!fTypeCheck.match("^video/")){
						fs.unlink(filePath, function(err){
							if(err){
								console.log(err);
							}
						});
						res.write("<h2>Tipo de archivo incorrecto!</h2> <br> <h1>Intenta subir un video</h1>");
						res.end();
						return;
					}
					let filePath = this.filePath;
					vidTable.createAssociated("SIN URL", filePath, fields.user.id, fields.obj.objectID, fields.description, fields.title, fields.tags);
					res.write("Video subido exitosamente!");
					res.end();
				}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}));
			}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );
		}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );	
	}.bind({filename:filename, thumbFolder:thumbFolder, filePath:filePath, convFilePath:convFilePath}) );
});






module.exports = router;