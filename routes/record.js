var express = require('express');
var router = express.Router();
var path = require('path');

const objectsRepo = require('../conn/objectsRepo.js');
var createError = require('http-errors');
const objectsDB = new objectsRepo();

// TODO Set Index
router.get('/', function(req, res, next) {
	objectsDB.getObject(req.query.objectID).then(
		function(obj){
			req.responseObj.obj = obj[0];
			userAgent = req.get('User-Agent');
			if(!!userAgent.match("/iPad|iPhone|iPod/")){
				res.render('recordiOS.ejs', req.responseObj);
			} else {
				res.render('record.ejs', req.responseObj);
			}
		}
	);
	
});


module.exports = router;
