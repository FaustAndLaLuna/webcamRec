var express = require('express');
var router = express.Router();
var path = require('path');
const objectsRepo = require('../conn/objectsRepo.js')
const QandARepo = require('../conn/QandA.js');
const questionsDB = new QandARepo();
const objectsDB = new objectsRepo();

router.get('/', function(req,res,next){
	if(req.query.objectID){
			objectsDB.getObject(req.query.objectID).then( (obj) => {
				if(obj){
					req.responseObj.obj = obj;
					questionsDB.getAllFromObject(req.query.objectID).then((questions) =>{
						req.responseObj.questions = questions;
						if(req.responseObj.user){
							res.render(req.responseObj.user.id == obj.offeringUserID? "objetoVendedor.ejs":"objetoComprador.ejs", req.responseObj);
						}
						else{
							res.render("objetoComprador.ejs", req.responseObj);
						}
						return;
					});
					
				}
				else{
					  next(createError(404));
					  return
				}
			});
		}
		else{
			objectsDB.getAll().then(function(objects){
				req.responseObj.objects = objects;
				res.render("objetos.ejs", req.responseObj);
			});
		}
	});

module.exports = router;
