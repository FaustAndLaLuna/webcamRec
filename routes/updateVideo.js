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
        res.end(JSON.stringify(result));
        id = req.query.id;
        desc = req.query.desc;
        tit = req.query.tit;
        tag = req.query.tag;
        trans = req.query.trans;
        obid = req.query.obid;
        vidTable.update(id, desc, tit, tag, trans, obid);
    });
    res.end(JSON.stringify({'err':'err'}));
});

module.exports = router;
