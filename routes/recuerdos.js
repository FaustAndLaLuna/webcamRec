var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

// TODO Set Index
router.get('/', function(req, res, next) {
	resObj = {};

	if(req.query.objectID){
		vidTable.getAllFromObject(req.query.objectID).then( allVids => {
			if(allVids.length != 0){
				req.responseObj.allVids = allVids;
				res.render('recuerdos.ejs', req.responseObj);
			}else{
				res.redirect('/recuerdos.html');
			}
			return;
		});
	}
	
	vidTable.getAll().then((allVids) => {
		req.responseObj.allVids = allVids;
		res.render('recuerdos.ejs', req.responseObj);
	});
	
	
	
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
