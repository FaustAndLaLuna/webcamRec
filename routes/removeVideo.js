var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

router.get('/', function(req,res,next){
    vidTable.getFromID(req.query.id).then(function(result){
        fs.unlink('.'+result.videoURL);
        res.end(JSON.stringify(result));
        vidTable.delete(req.query.id);
    });
});

module.exports = router;
