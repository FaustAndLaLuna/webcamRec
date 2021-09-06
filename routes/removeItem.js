var express = require('express');
var router = express.Router();
var path = require('path');
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const videosRepo = require('../conn/objectsRepo.js')

const vidTable = new videosRepo();

router.get('/', function(req,res,next){
    vidTable.getObject(req.query.id).then(function(result){
        result = result[0];
        result.images = JSON.parse(result.images);
        for(let i = 0; i < result.images.length; i++){
            fs.unlink(result.images[i].substr(1), (err) => {
                if(err) console.log(err);
            });
        }

        res.end(JSON.stringify(result));
        vidTable.delete(req.query.id);
    });
});

module.exports = router;
