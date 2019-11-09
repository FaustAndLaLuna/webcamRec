var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:first/:second/:third/:fourth/:filename', (req, res) => {
	resObj = {}
	resObj.videoURL = '/' + first + '/' + second + '/' + third +
					"/" + fourth + '/' + filename;
	resObj.title = 'Video';
	res.render('vid', resObj);
});

module.exports = router;