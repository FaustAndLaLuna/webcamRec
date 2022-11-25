var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

router.get('/', function(req, res, next) {
	resObj = {};
	
	vidTable.getAllTranscripted().then((allVids) => {
		for(let i = 0; i < allVids.length; i++){
			allVids[i].transcription = JSON.parse(allVids[i].transcription);
		}
		res.json(allVids);
	});
	
	
	
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
