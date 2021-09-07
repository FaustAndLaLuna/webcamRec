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
        fs.unlink('uploads'+result[0].videoURL, (err) => {
            if(err) console.log(err);
        });
        res.send(JSON.stringify(result));
        vidTable.delete(req.query.id);
    });
    res.send(JSON.stringify({'err':'err'}));
});

module.exports = router;
