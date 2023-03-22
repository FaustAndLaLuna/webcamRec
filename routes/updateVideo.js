var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const videosRepo = require('../conn/videosRepo')

const vidTable = new videosRepo();

router.post('/', function(req,res,next){
    vidTable.getFromID(req.params.videoID).then(function(result){
        res.end(JSON.stringify(result));
        videoID = req.params.videoID;
        description = req.params.description;
        title = req.params.title;
        tags = req.params.tags;
        timePublished = req.params.timePublished;
        userID = req.params.userID;
        objectID = req.params.objectID;

        vidTable.update(videoID, description, title, tags, timePublished, userID, objectID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
