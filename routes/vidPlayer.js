var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:first/:second/:third/:fourth/:filename', (req, res) => {
	resObj = {}
	resObj.videoURL = '/' + req.params.first + '/' + req.params.second + '/' + req.params.third +
					"/" + req.params.fourth + '/' + req.params.filename;
	resObj.title = 'Video';
	res.render('vid', resObj);
});

module.exports = router;