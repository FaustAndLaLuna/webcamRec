var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../videosRepo')
const AppDAO = require('../dao')
const encodeMod = require('./encode')

const dao = new AppDAO('./database.sqlite3');
const vidTable = new videosRepo(dao);

// TODO Set Index
router.get('/', function(req, res, next) {
	resObj = {};
	resObj.title = "Todos los videos";
	
	console.log("Am I encoding? " + ISENCODING);
	if(!ISENCODING){
		vidTable.getNextEncodable().then((nextEncodableVideo) => {
			if(typeof nextEncodableVideo === 'undefined'){
				return;
			}
			console.log(nextEncodableVideo.tempURL);
			encodeMod.encode(nextEncodableVideo.tempURL);});
	}
	
	vidTable.getAll().then((allVids) => {
		resObj.allVids = allVids;
		res.render('index', resObj);
	});
	
	
	
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
