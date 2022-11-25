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