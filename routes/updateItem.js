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
    console.log(req.body)
    vidTable.getObject(req.body.objectID).then(function(result){
        res.end(JSON.stringify(result));
        let id = req.body.objectID;
        let title = req.body.title;
        let isAuction = parseInt(req.body.isAuction) == 0;
        let description = req.body.description;
        let history = req.body.history;
        let endDate = req.body.endDate+' 00:00:00';
        let createdAt = req.body.createdAt+' 00:00:00';
        let offeringUserID = req.body.offeringUserID;
        let soldUserID = req.body.soldUserID;
        let soldVideoID = req.body.soldVideoID;

        vidTable.update(id, title, isAuction, description, history, endDate, createdAt, offeringUserID, soldUserID, soldVideoID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
