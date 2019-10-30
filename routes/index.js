var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../videosRepo')
const AppDAO = require('../dao')

const dao = new AppDAO('./database.sqlite3');
const vidTable = new videosRepo(dao);
vidTable.createTable();

// TODO Set Index
router.get('/', function(req, res, next) {
	resObj = {};
	resObj.title = "Todos los videos";
	vidTable.getAll().then((allVids) => {
		/*obj = allVids[0];
		console.log(obj.videoURL);
		*/
		resObj.allVids = allVids;
		res.render('index', resObj);
	});


	
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
