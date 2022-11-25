var path = require('path');
var fs = require('fs');
var ffmpeg = require("fluent-ffmpeg");
const genThumbnail = require('simple-thumbnail');
const videosRepo = require('../conn/videosRepo');

const vidTable = new videosRepo();

const SIZE = '480x?';

function encode(videoID, URLtoVid){
	
	console.log("Encoding started.")
	
	let filename = URLtoVid.replace(/\..*/, "");
	let filePath = path.resolve(URLtoVid);
	let convFilePath = path.resolve(filename+".mp4");
	filename = filename.slice(filename.indexOf("uploads") + "uploads".length)+".mp4";
	
	ffmpeg(filePath)
	.output(convFilePath)
	.format('mp4')
	.size(SIZE)
	.videoCodec('libx264')
	.on('progress', (progress) => {
		console.log('Encoding Video: ' + progress.percent + '% done.')
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
		ISWORKING = false;
		console.log("Encoding ended.")
	})
	.on('error', function(err, stdout, stderr){
		console.log("Error: Corrupted video, aborting. Cause: " + err.message);
		fs.unlink(filePath, (err) => {
			console.error(err);
		});
		vidTable.delete(videoID);
		ISWORKING = false;
	})
	.run();	
}


async function encodeCron(){
	console.log("Am I encoding/transcribing? " + ISWORKING);
	if(!ISWORKING){
		vidTable.getNextEncodable().then((result) => {
			if(result.length == 0){
				return;
			}
			ISWORKING = true;
			encode(result[0].videoID, result[0].tempURL);
			}).catch(function(err){
				console.log(err);
			});
	}
}



exports.encodeCron = encodeCron;
