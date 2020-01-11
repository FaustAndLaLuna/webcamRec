var express = require('express');
var router = express.Router();
var path = require('path');

// TODO Set Index
router.get('/', function(req, res, next) {
	userAgent = req.get('User-Agent');
	if(!!userAgent.match("/iPad|iPhone|iPod/")){
		res.sendFile(path.resolve('./public/recordiOS.html'));
	} else {
		res.sendFile(path.resolve('./public/record.html'));
	}
});


module.exports = router;
