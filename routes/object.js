var express = require('express');
var router = express.Router();
var path = require('path');
const objectsRepo = require('../conn/objectsRepo.js')

const objectsDB = new objectsRepo();

router.get('/', function(req,res,next){
	if(req.objectID){
			obj = objectsDB.getObject(req.objectID);
			if(obj){
				req.responseObj.obj = obj;
				if(req.responseObj.user){
					res.render(req.responseObj.user.id == obj.offeringUserID? "objetoVendedor.ejs":"objetoComprador.ejs", req.responseObj);
				}
				else{
					res.render("objetoComprador.ejs", req.responseObj);
				}
				return;
			}
			else{
				  next(createError(404));
				  return
			}
		}
		else{
			objectsDB.getAll().then(function(objects){
				req.responseObj.objects = objects;
				res.render("objetos.ejs", req.responseObj);
			});
		}
	});

module.exports = router;
