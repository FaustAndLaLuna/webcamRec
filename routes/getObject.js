var express = require('express');
var router = express.Router();
var path = require('path');
const objectsRepo = require('../conn/objectsRepo.js');
const QandARepo = require('../conn/QandA.js');
var createError = require('http-errors');
const questionsDB = new QandARepo();
const objectsDB = new objectsRepo();

router.get('/', function(req,res,next){
    if(typeof req.query.id == 'undefined'){
        objectsDB.getAll().then(function(objects){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(objects));
        });
    } else {
        objectsDB.getFromID(req.query.id).then(function(objects){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(objects));}
            ).catch((err) => {
                res.setHeader('Content-type', 'application/json');
                ans = {error: err};
                res.end(JSON.stringify(ans));}
            )
    }
});

router.post('/', function(req,res,next){
    if(typeof req.query.id == 'undefined'){
        objectsDB.getAll().then(function(objects){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(objects));
        });
    } else {
        objectsDB.getFromID(req.query.id).then(function(objects){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(objects));}
            ).catch((err) => {
                res.setHeader('Content-type', 'application/json');
                ans = {error: err};
                res.end(JSON.stringify(ans));}
            )
    }
});

module.exports = router;
