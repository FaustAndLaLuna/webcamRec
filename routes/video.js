var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

router.get("/:first/:second/:third/:fourth/:filename", function(req, res){
	console.log("NANI");
	filename = "/" + first + "/" + second + "/" + third + "/" + fourth + "/" + filename;
	filepath = path.resolve('./uploads' + filename);
	console.log("filepath = " + filepath);
	console.log("filename = " + filename);
	fs.stat(filepath, function(err, stats){
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

		res.writeHead(206, {
			"Content-Range": "bytes" + start + "-" + end + "/" + total,
			"Accept=ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4"
		});

		var stream = fs.createReadStream(filepath, {start: start, end: end})
		.on("open", function(){
			stream.pipe(res);
		})
		.on("error", function(err){
			res.end(err);
		});
	});
});

module.exports = router;

