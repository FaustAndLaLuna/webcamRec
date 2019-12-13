var path = require('path');
const uuidv4 = require('uuid/v4');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var ffmpeg = require("fluent-ffmpeg");
const genThumbnail = require('simple-thumbnail');
const videosRepo = require('../videosRepo');
const AppDAO = require('../dao')

const dao = new AppDAO('./database.sqlite3');
const vidTable = new videosRepo(dao);

const SIZE = '480x?';

function encode(URLtoVid){
	
	ISENCODING = true;
	
	filename = URLtoVid.replace(".webm", "");
	filePath = path.resolve(URLtoVid);
	convFilePath = path.resolve(filename+".mp4");
	filename = filename.slice(filename.indexOf("uploads") + "uploads".length);
	
	
	console.log(filePath);
	console.log(convFilePath);
	
	
	ffmpeg(filePath)
	.output(convFilePath)
	.format('mp4')
	.size(SIZE)
	.videoCodec('libx264')
	.on('end', () =>{
		vidTable.updateToEncoded(convFilePath, URLtoVid)
		genThumbnail(convFilePath, 
			convFilePath.replace("mp4","png").replace("uploads", "public/thumbs"), SIZE)
		.catch(err => console.error(err))
		console.log("uploaded and converted to: " + filename+".mp4");
		fs.unlink(filePath, (err) => {
			if(err){
				console.error(err);
			}
		});
		ISENCODING = false;
	})
	.run();	
}






exports.encode = encode;
