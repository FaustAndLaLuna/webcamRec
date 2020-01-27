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

router.post('/', function(req,res,next){
	var filename = uuidv4();
	var thumbURL = "/"+ filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/" + filename.slice(4) + ".";
	var filePath = path.resolve('./thumbs'+filename+".webm");
	mkdirp(path.dirname(filePath), function(err){
		if(err) console.log(err);
		var form = new formidable.IncomingForm();
		var fTypeCheck;
		form.on('fileBegin', function (name, file){
			fTypeCheck = file.type;
			if(fTypeCheck.match("^image/")){
				filePath += fTypeCheck.replace("image/", "");
			}
			file.path = filePath;
		}.bind({filePath:filePath, fTypeCheck:fTypeCheck}));
		
		form.on('error', function(err){
			console.log('An error has occurred uploading a file:\n ' + err);
		});
		
		form.parse(req, function(err, fields, files){
					console.log(fTypeCheck);
					if(!fTypeCheck.match("^image/")){
						fs.unlink(filePath, function(err){
							if(err){
								console.log(err);
							}
						});
						res.write("<h2>Tipo de archivo incorrecto!</h2> <br> <h1>Intenta subir una imagen!</h1>");
						res.end();
						return;
					}
					this.filePath = file.path;
					let filePath = this.filePath;
					objectsDB.create(fields.name, fields.offeringUserID, fields.isAuction == "true"? true: false, fields.description, fields.story, fields.endDate, filePath);
					res.write("Objeto puesto en venta exitosamente!");
					res.end();
				}.bind({filePath:filePath, fTypeCheck:fTypeCheck}));
		
	}.bind({filePath:filePath}));
});

module.exports = router;
