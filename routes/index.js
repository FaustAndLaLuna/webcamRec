var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../videosRepo')
const AppDAO = require('../dao')
const encodeMod = require('encode')

const dao = new AppDAO('./database.sqlite3');
const vidTable = new videosRepo(dao);
vidTable.createTable();

// TODO Set Index
router.get('/', function(req, res, next) {
	resObj = {};
	resObj.title = "Todos los videos";
	vidTable.getAll().then((allVids) => {
		resObj.allVids = allVids;
		res.render('index', resObj);
	});
	
	if(!ISENCODING){
		encodeMod.encode(vidTable.getNextEncodable());
	}
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
