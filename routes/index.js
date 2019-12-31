var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

// TODO Set Index
router.get('/', function(req, res, next) {
	resObj = {};
	resObj.title = "Todos los videos";
	
	vidTable.getAll().then((allVids) => {
		resObj.allVids = allVids;
		res.render('index', resObj);
	});
	
	
	
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
