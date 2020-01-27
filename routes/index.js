var express = require('express');
var router = express.Router();
var path = require('path');
const objectsRepo = require('../conn/objectsRepo')

const objectsTable = new objectsRepo();

router.get('/', function(req, res, next) {
	
	objectsTable.getRandomLimited(5).then(function(objects){
		req.responseObj.objects = objects;
		res.render('index.ejs', req.responseObj);
	});
});


module.exports = router;
