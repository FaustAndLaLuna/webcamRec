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
    vidTable.getObject(req.body.id).then(function(result){
        res.end(JSON.stringify(result));
        
        console.log(result);
        let id = req.body.id;
        let title = req.body.title;
        let isAuction = req.body.isAuction;
        let description = req.body.description;
        let history = req.body.history;
        let endDate = req.body.endDate;
        let createdAt = req.body.createdAt;
        let offeringUserID = req.body.offeringUserID;
        let soldUserID = req.body.soldUserID;
        let soldVideoID = req.body.soldVideoID;

        vidTable.update(id, title, isAuction, description, history, endDate, createdAt, offeringUserID, soldUserID, soldVideoID);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
