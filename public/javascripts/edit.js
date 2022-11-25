wordDict = {};
jQuery.getJSON('/edicion', (data) => {
	for(let i = 0; i < data.length; i++){
		for(let j = 0; j < data[i].transcription.length; j++){
			toAdd = {	videoURL: data[i].videoURL,
						endTime: data[i].transcription[j].endTime,
						startTime: data[i].transcription[j].startTime,
					}
			if(data[i].transcription[j].word in wordDict){
				wordDict[data[i].transcription[j].word].push(toAdd);
			} else {
				wordDict[data[i].transcription[j].word] = [toAdd];
			}
		}
	}
})
function wordsNotInDict(phrase){
	phrase = phrase.toLowerCase();
	splitPhrase = phrase.split(' ');
	wordsNotFound = [];
	for(let i = 0; i < splitPhrase.length; i++){
		if(splitPhrase[i] in wordDict){
		} else {
			wordsNotFound.push(splitPhrase[i])
		}
	}
	return wordsNotFound;
}
function getPhraseVideoObject(phrase){
	phrase = phrase.toLowerCase();
	splitPhrase = phrase.split(' ');
	wordsNotFound = wordsNotInDict(phrase);
	ans = [];
	if(wordsNotFound.length > 0){
		console.log('No se puede generar esta frase, faltan las palabras:');
		console.log(wordsNotFound);
		return;
	} else {
		for(let i = 0; i < splitPhrase.length; i++){
			let choose = Math.floor(Math.random() * wordDict[splitPhrase[i]].length);
			ans.push(wordDict[splitPhrase[i]][choose]);
		}
		return ans;
	}
}

function destroyVideoElement(element){
	element.remove();
}

function createVideoElement(source){
	let startTime = source.startTime;
	let delta = ((source.endTime - source.startTime) * 1000);
	let video = document.createElement('video');
	video.src = 'uploads'+source.videoURL;
	video.autoplay = true;
	video.controls = false;
	video.muted = false;
	video.addEventListener('loadedmetadata', function() {
		this.currentTime = startTime;
		this.play();
	  }, false);
	let container = document.getElementById('videoContainer');
	container.appendChild(video);
	setTimeout(destroyVideoElement, delta, video);
}

function createVideoSequence(videoObj){
	let delta = 0;
	for(let i = 0; i < videoObj.length; i++){
		setTimeout(createVideoElement, delta, videoObj[i]);
		delta += ((videoObj[i].endTime - videoObj[i].startTime) * 1000);
	}
}

function createEditFromPhrase(phrase){
	videoObject = getPhraseVideoObject(phrase);
	createVideoSequence(videoObject);
}