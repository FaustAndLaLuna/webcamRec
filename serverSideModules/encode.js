var path = require('path');
var fs = require('fs');
var ffmpeg = require("fluent-ffmpeg");
const genThumbnail = require('simple-thumbnail');
const videosRepo = require('../conn/videosRepo');

const vidTable = new videosRepo();

const SIZE = '480x?';

function encode(URLtoVid){
	
	ISWORKING = true;
	console.log("Encoding started.")
	
	filename = URLtoVid.replace(".webm", "");
	filePath = path.resolve(URLtoVid);
	convFilePath = path.resolve(filename+".mp4");
	filename = filename.slice(filename.indexOf("uploads") + "uploads".length)+".mp4";
	
	ffmpeg(filePath)
	.output(convFilePath)
	.format('mp4')
	.size(SIZE)
	.videoCodec('libx264')
	.on('end', () =>{
		vidTable.updateToEncoded(filename, URLtoVid)
		genThumbnail(convFilePath, 
			convFilePath.replace("mp4","png").replace("uploads", "public/thumbs"), SIZE)
		.catch(err => console.error(err))
		fs.unlink(filePath, (err) => {
			if(err){
				console.error(err);
			}
		});
		ISWORKING = false;
		console.log("Encoding ended.")
	})
	.run();	
}


function encodeCron(){
	console.log("Am I encoding? " + ISWORKING);
	if(!ISWORKING){
		vidTable.getNextEncodable().then((nextEncodableVideo) => {
			if(typeof nextEncodableVideo.length == 0){
				return;
			}
			encode(nextEncodableVideo[0].tempURL);});
	}
}



exports.encodeCron = encodeCron;
