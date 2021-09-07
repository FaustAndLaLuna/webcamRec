var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

router.get('/', function(req,res,next){
    vidTable.getAll().then(function(videos){
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(videos));
    });
});

module.exports = router;
