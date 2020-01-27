var express = require('express');
var router = express.Router();
var path = require('path');
const contact = require('../conn/contactDB.js')

const contactDB = new contact();

// TODO Set Index
router.get('/contacto.html', function(req,res,next){
		res.render('contacto.ejs', req.responseObj);
	});
router.post('/', function(req, res, next) {
	contactDB.create(req.body.message, req.body.name, req.body.email );
	//res.sendFile(path.resolve('./public/record.html'));
});


module.exports = router;
