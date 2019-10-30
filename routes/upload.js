var express = require('express');
var router = express.Router();
var path = require('path');
const uuidv4 = require('uuid/v4');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
const videosRepo = require('../videosRepo')
const AppDAO = require('../dao')

const dao = new AppDAO('./database.sqlite3');
const vidTable = new videosRepo(dao);
vidTable.createTable();

router.post('/', function(req, res, next){

	filename = uuidv4();
	filename = "/"+filename.slice(0,1)+"/"+filename.slice(1,2)+"/"+filename.slice(2,3)+
				"/"+filename.slice(3,4)+"/"+filename.slice(4)+".webm";
	filePath = path.resolve('./uploads'+filename);
	console.log(filePath);
	
	mkdirp(path.dirname(filePath), function (err){
		console.log(err);
		fs.writeFile(filePath, '', function (err){
			if(err) throw err;
			var form = new formidable.IncomingForm();
			//form.enconding = 'binary';
			form.on('fileBegin', (name, file) => {
				file.path = filePath;
			});
			form.on('file', function(field, file){
				vidTable.create(filename, Date.now().toString());
			});
			form.on('error', function(err){
				console.log('An error has occurred uploading a file:\n ' + err);
			});
			form.on('end', function(){
				res.write('Video subido exitosamente!');
				res.end();
			});
			form.parse(req);
		});
	});
	console.log("pathmade");
});

module.exports = router;
