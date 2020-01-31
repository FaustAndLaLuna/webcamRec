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
	var cmd;
	ffmpeg(filePath)
	.output(convFilePath)
	.format('mp3')
	.noVideo()
	.audioCodec('libmp3lame')
	.audioFrequency(22050)
	.on('start', () =>{
		cmd = setInterval(()=>{console.log("TRANSCRIBING")},5000);
	})
	.on('end', async () =>{
		clearInterval(cmd);
		const file = fs.readFileSync(convFilePath);
		const audioBytes = file.toString('base64');
		
		const audio = {content: audioBytes};
		const config = {encoding: 'mp3', sampleRateHertz:22050, languageCode: 'es-ar'};
		const request = {audio:audio, config:config};
		
		const [response] = await client.recognize(request);
		console.log(response);
		const transcription = response.results
		.map(result => result.alternatives[0].transcript)
		.join('\n');
		transcriptionArray = JSON.stringify(transcription.split('\n'));
		
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
	.on('error', (err) => {if err console.log(err);})
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
