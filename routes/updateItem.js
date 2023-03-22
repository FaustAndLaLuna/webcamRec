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
    console.log(req.body);
    vidTable.getObject(req.params.objectID).then(function(result){
        res.end(JSON.stringify(result));
        
        let objectID = req.params.objectID;
        let title = req.params.title;
        let isAuction = req.params.isAuction;
        let description = req.params.description;
        let history = req.params.history;
        let endDate = req.params.endDate;
        let createdAt = req.params.createdAt;
        let offeringUserID = req.params.offeringUserID;
        let soldUserID = req.params.soldUserID;
        let soldVideoID = req.params.soldVideoID;

        vidTable.update(objectID, title, isAuction, description, history, endDate, createdAt, offeringUserID, soldUserID, soldVideoID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
