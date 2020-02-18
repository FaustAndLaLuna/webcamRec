var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:first/:second/:third/:fourth/:filename', (req, res) => {
	resObj = {}
	req.responseObj.videoURL = '/' + req.params.first + '/' + req.params.second + '/' + req.params.third +
					"/" + req.params.fourth + '/' + req.params.filename;
	req.responseObj.title = 'Video';
	res.render('vid', req.responseObj);
});

module.exports = router;