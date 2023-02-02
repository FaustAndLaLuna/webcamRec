var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var router = express.Router();
var path = require('path');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

router.get('/', function(req,res,next){
    if(typeof req.query.id == 'undefined'){
        vidTable.getAll().then(function(videos){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(videos));
        });
    } else {
        vidTable.getFromID(req.query.id).then(function(objects){
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
        vidTable.getAll().then(function(videos){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(videos));
        });
    } else {
        vidTable.getFromID(req.query.id).then(function(objects){
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
