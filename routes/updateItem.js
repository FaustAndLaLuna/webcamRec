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

router.post('/', function(req,res,next){
    console.log(req.params);
    vidTable.getObject(req.params.objectID).then(function(result){
        res.end(JSON.stringify(result));
        
        objectID = req.params.objectID;
        title = req.params.title;
        isAuction = req.params.isAuction;
        description = req.params.description;
        history = req.params.history;
        endDate = req.params.endDate;
        createdAt = req.params.createdAt;
        offeringUserID = req.params.offeringUserID;
        soldUserID = req.params.soldUserID;
        soldVideoID = req.params.soldVideoID;

        vidTable.update(objectID, title, isAuction, description, history, endDate, createdAt, offeringUserID, soldUserID, soldVideoID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
