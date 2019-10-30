var express = require('express');
var router = express.Router();
var path = require('path');

// TODO Set Index
router.get('/', function(req, res, next) {
	res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
