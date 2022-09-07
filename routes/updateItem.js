var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const videosRepo = require('../conn/objectsRepo.js');
const { title } = require('process');

const vidTable = new videosRepo();

router.get('/', function(req,res,next){
    vidTable.getObject(req.query.id).then(function(result){
        res.end(JSON.stringify(result));
        id = req.query.id;
        tit = req.query.tit;
        desc = req.query.desc;
        hist = req.query.hist;
        vidTable.update(objectID, tit, desc, hist);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
