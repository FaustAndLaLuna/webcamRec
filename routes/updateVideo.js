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
    vidTable.getFromID(req.body.id).then(function(result){
        console.log(req.body);
        res.end(JSON.stringify(result));
        let id = req.body.id;
        let description = req.body.description;
        let title = req.body.title;
        let tags = req.body.tags;
        let timePublished = req.body.timePublished;
        let userID = req.body.userID;
        let objectID = req.body.objectID;

        vidTable.update(id, description, title, tags, timePublished, userID, objectID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
