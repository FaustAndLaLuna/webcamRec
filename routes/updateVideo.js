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
        let videoID = req.params.videoID;
        let description = req.params.description;
        let title = req.params.title;
        let tags = req.params.tags;
        let timePublished = req.params.timePublished;
        let userID = req.params.userID;
        let objectID = req.params.objectID;

        vidTable.update(videoID, description, title, tags, timePublished, userID, objectID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
