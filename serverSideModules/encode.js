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
	
	filename = URLtoVid.replace(/\..*/, "");
	filePath = path.resolve(URLtoVid);
	convFilePath = path.resolve(filename+".mp4");
	filename = filename.slice(filename.indexOf("uploads") + "uploads".length)+".mp4";
	var encoder;
	
	
	encoder = ffmpeg(filePath)
	.output(convFilePath)
	.format('mp4')
	.size(SIZE)
	.videoCodec('libx264')
	.timeout(420000)
	.on('start', () =>{
		cmd = setTimeout(function(){
			encoder.kill();
			ISWORKING = false;
			vidTable.delete(vidTable.getNextEncodable());
		},10000);
	})
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
		clearTimeout(cmd);
		ISWORKING = false;
		console.log("Encoding ended.")
	})
	.on('error', (err) => {
		console.log(err);
	})
	.run();	
}


async function encodeCron(){
	console.log("Am I encoding? " + ISWORKING);
	if(!ISWORKING){
		vidTable.getNextEncodable().then((result) => {
			if(result.length == 0){
				return;
			}
			encode(result[0].tempURL);
			}).catch(function(err){
				console.log(err);
			});
	}
}



exports.encodeCron = encodeCron;
