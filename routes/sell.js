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

//<p><%= vid.title%><br><%= vid.description%><br><%= vid.tags%><br><%= vid.linkedObj%><br><%= vid.createdAt%></p>
router.post('/', function(req, res, next){
	filePath = uuidv4();
	filePath = "/" + filePath.slice(0,1) + "/" + filePath.slice(1,2) + "/" + filePath.slice(2,3) + "/" + filePath.slice(3,4) + "/";
	thumbFilePath = "./public/objects/thumbs" + filePath;
	mkdirp.sync(thumbFilePath);
	formObject = {uploadDir: thumbFilePath, keepExtensions: true};
	var form = new formidable.IncomingForm(formObject);
	form.on('error', function(err){
		console.log("Couldn't upload file because of: \n" + err);
		res.json({success: false, error: err})
		// next(createError(500));
	});
	/*form.onPart(function(part){
		if((!part.filename) || part.filename.match("^video/")){
			form.handlePart(part);
		} else {
			res.write("<h1>ERROR, el archivo es del tipo incorrecto.</h1>");
			return;
		}
	});*/
	form.parse(req, function(err, fields, files){
		if(err){
			console.log(err);
			res.json({success: false})
		}
		imgArray = [];
		for(var key in files){
			file = files[key];
			if(! file.type.match("^image/")){
				fs.unlink(file.path, function(err){
					if(err){
						res.json({success: false, error: err})
						console.log(err);
					}
				});
			}
			else{
				imgArray.push(file.path.replace("public",""));
			}
		}
		if(imgArray.length == 0){
			res.write("<h1> No subiste ninguna imagen, intenta de nuevo </h1>");
			return;
		}
			//create(title, userID, isAuction, description, history, endDate, images){
		console.log({name: fields.name, offeringUserID: fields.uid, isAuction: fields.isAuction, description: fields.description, story:fields.story, endDate:fields.endDate, imgArray:JSON.stringify(imgArray)});
		objectsDB.create(fields.name, fields.uid, fields.isAuction == "true", fields.description, fields.story, fields.endDate, JSON.stringify(imgArray));
		res.json({success: true})
	});
});






module.exports = router;