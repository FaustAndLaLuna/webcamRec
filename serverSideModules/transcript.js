var path = require('path');
var fs = require('fs');
var ffmpeg = require("fluent-ffmpeg");
const genThumbnail = require('simple-thumbnail');
const videosRepo = require('../conn/videosRepo');

const vidTable = new videosRepo();
const speech = require('@google-cloud/speech');
const client= new speech.SpeechClient({projectID: 'Biografo'});
const {Storage} = require('@google-cloud/storage');


const SIZE = '480x?';

async function transcription(videoID, URLtoVid){
	
	ISWORKING = true;
	console.log("Transcription started.")
	
	let filename = URLtoVid.replace(/\..*/, "");
	let filePath = path.resolve("./uploads"+URLtoVid);
	let convFilePath = path.resolve("./uploads" +filename+".mp3");
	
	ffmpeg(filePath)
	.output(convFilePath)
	.format('mp3')
	.noVideo()
	.audioCodec('libmp3lame')
	.audioFrequency(44100)
	.on('end', async () =>{
		const storage = new Storage({projectID: 'Biografo'});
		const bucketName = 'biografo';
		let srcFileName = convFilePath.slice(convFilePath.indexOf("uploads/") + "uploads/".length);
		// console.log(srcFileName)
		// console.log(convFilePath)
		// console.log(`gs://${bucketName}/${srcFileName}`)

		await storage
		.bucket(bucketName)
		.upload(convFilePath, {destination: srcFileName})
		.catch((error) => {console.log(error)})
		

		let audio = {uri: `gs://${bucketName}/${srcFileName}`};
		let config = {
						encoding: 'mp3', 
						sampleRateHertz:44100, 
						languageCode: 'es-AR', 
						alternativeLanguageCodes:['es-MX', 'es-ES', 'es-CL'],
						useEnhanced:true,
						enableWordTimeOffsets:true
					};
		let request = {audio:audio, config:config};
		console.log("waiting for google");
		let [operation] = await client.longRunningRecognize(request);
		let [response] = await operation.promise();

		console.log(response.totalBilledTime)
		let transcription = response.results
		console.log(transcription);

		let ans = [];
		for(let i = 0; i < transcription.length; i++){
			console.log(transcription[i].alternatives[0])
			console.log('--------------')
			console.log(transcription[i].alternatives[0].transcript)
			console.log('--------------')
			console.log(transcription[i].alternatives[0].words)
			console.log('--------------')
			console.log(transcription[i].alternatives[0].words.length)
			ans.push(... transcription[i].alternatives[0].words)
		}
		
		let transcriptionArray = JSON.stringify(ans);
		
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
