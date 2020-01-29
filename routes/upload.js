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
	filePath = uuidv4();
	filePath = "/" + filePath.slice(0,1) + "/" + filePath.slice(1,2) + "/" + filePath.slice(2,3) + "/" + filePath.slice(3,4) + "/" + filePath.slice(4);
	videoFilePath = "./uploads" + filePath;
	thumbFilePath = "./thumbs" + filePath;
	mkdirp.sync(videoFilePath);
	mkdirp.sync(thumbFilePath);
	formObject = {uploadDir: filePath, keepExtensions: true};
	var form = new formidable.IncomingForm(formObject);
	form.on('error', function(err){
		console.log("Couldn't upload file because of: \n" + err);
		next(createError(500));
	});
	form.parse(req, function(err, fields, files){
		console.log("fields "+fields);
		console.log("files "+files);
	});
});






module.exports = router;