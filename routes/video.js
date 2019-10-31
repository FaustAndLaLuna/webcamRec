var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

router.get("/:first/:second/:third/:fourth/:filename", function(req, res){
	filename = "/" + req.params.first + "/" + req.params.second + "/" + req.params.third + "/" + req.params.fourth + "/" + req.params.filename;
	filepath = path.resolve('./uploads' + filename);
	//src = fs.createReadStream(filepath);
	//src.pipe(res);
	res.sendFile(filepath);
	/*fs.stat(filepath, function(err, stats){
		if(err){
			if(err.code === 'ENOENT'){
				return res.sendStatus(404);
			}
			res.end(err);
		}
		var range = req.headers.range;
		if(!range){
			return res.sendStatus(416);
		}
		var positions = range.replace(/bytes=/, "").split("-");
		var start = parseInt(positions[0],10);
		var total = stats.size;
		var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
		var chunksize = (end - start) + 1;
		headobj = {
			"Content-Range": "bytes" + start + "-" + end + "/" + total,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4"
		}
		console.log(headobj["Content-Range"]);
		res.writeHead(206, headobj);

		var stream = fs.createReadStream(filepath, {autoClose: true, start: start, end: end})
		.on("open", function(){
			stream.pipe(res);
		})
		.on("error", function(err){
			res.end(err);
		});
	});*/
});

module.exports = router;

