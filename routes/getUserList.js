var express = require('express');
var router = express.Router();
var path = require('path');

const userDB = require('../conn/userDB.js');
var createError = require('http-errors');
const userDB = require('../conn/userDB.js');

const userDB = new userDB();

router.get('/', function(req,res,next){
        userDB.getAllUsers().then(function(response){
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(response));
        });
	});

module.exports = router;
