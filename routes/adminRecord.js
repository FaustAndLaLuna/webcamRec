var express = require('express');
var router = express.Router();
var path = require('path');
const objectsRepo = require('../conn/objectsRepo.js');
const QandARepo = require('../conn/QandA.js');
var createError = require('http-errors');
const questionsDB = new QandARepo();
const objectsDB = new objectsRepo();

router.get('/', function(req,res,next){
	objectsDB.getAll().then( (objects) => {
		req.responseObj.objects = objects;
		res.render("recordadmincreateuser112355335425.ejs", req.responseObj);
	});	
});

module.exports = router;
