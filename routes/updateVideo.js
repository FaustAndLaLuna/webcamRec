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
    vidTable.getFromID(req.body.videoID).then(function(result){
        res.end(JSON.stringify(result));
        let videoID = req.body.videoID;
        let description = req.body.description;
        let title = req.body.title;
        let tags = req.body.tags;
        let timePublished = req.body.timePublished;
        let userID = req.body.userID;
        let objectID = req.body.objectID;

        vidTable.update(videoID, description, title, tags, timePublished, userID, objectID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
