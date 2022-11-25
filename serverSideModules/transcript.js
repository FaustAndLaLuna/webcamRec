var path = require('path');
var fs = require('fs');
var ffmpeg = require("fluent-ffmpeg");
const genThumbnail = require('simple-thumbnail');
const videosRepo = require('../conn/videosRepo');

const vidTable = new videosRepo();
const speech = require('@google-cloud/speech').v1p1beta1;
const client= new speech.SpeechClient();


const SIZE = '480x?';

async function transcription(videoID, URLtoVid){
	
	ISWORKING = true;
	console.log("Transcription started.")
	
	filename = URLtoVid.replace(/\..*/, "");
	filePath = path.resolve("./uploads"+URLtoVid);
	convFilePath = path.resolve("./uploads" +filename+".mp3");
	
	console.log(filePath);
	console.log(convFilePath);
	
	ffmpeg(filePath)
	.output(convFilePath)
	.format('mp3')
	.noVideo()
	.audioCodec('libmp3lame')
	.audioFrequency(44100)
	.on('end', async () =>{
		
		const file = fs.readFileSync(convFilePath);
		const audioBytes = file.toString('base64');
		
		const audio = {content: audioBytes};
		const config = {encoding: 'mp3', sampleRateHertz:44100, languageCode: 'es-mx'};
		const request = {audio:audio, config:config};
		console.log("waiting for google");
		const [response] = await client.recognize(request);
		console.log(response);
		const transcription = response.results
		ans = []
		for(let i = 0; i < transcription.length; i++){
			for(let j = 0; j < transcription[i]['alternatives'][0]['words'].length; j++){
				ans.push(transcription[i]['alternatives'][0]['words'][j]);
			}
		}
		
		transcriptionArray = JSON.stringify(ans);
		
		console.log(transcriptionArray);
		vidTable.updateToTranscripted(transcriptionArray, videoID);
		
		fs.unlink(convFilePath, (err) => {
			if(err){
				console.error(err);
			}
		});
		ISWORKING = false;
		console.log("Transcription ended.")
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


async function transcriptionCron(){
	if(!ISWORKING){
		vidTable.getNextTranscriptable().then((result) => {
			if(result.length == 0){
				return;
			}
			transcription(result[0].videoID, result[0].videoURL);
			}).catch(function(err){
				console.log(err);
			});
	}
}



exports.transcriptionCron = transcriptionCron;
