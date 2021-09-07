var express = require('express');
var router = express.Router();
var path = require('path');
const objectsRepo = require('../conn/objectsRepo.js');
const QandARepo = require('../conn/QandA.js');
var createError = require('http-errors');
const questionsDB = new QandARepo();
const objectsDB = new objectsRepo();

router.get('/', function(req,res,next){
    objectsDB.getAll().then(function(objects){
        res.setHeader('Content-type', 'application/json');
        res.send(JSON.stringify(objects));
    });
});

module.exports = router;
