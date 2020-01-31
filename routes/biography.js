var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

// TODO Set Index
router.get('/', function(req, res, next) {
	vidTable.getAll().then((allVids) => {
		req.responseObj.allVids = allVids;
		res.render('biografia.ejs', req.responseObj);
	});
	
	
	
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
