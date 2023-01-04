var wordDict = {};
var stopwords = ['sé','a','día','días','dijiste','acuerdo','acuerdas','acordás','actualmente','adelante','además','afirmó','agregó','ahora','ahí','al','algo','alguna','algunas','alguno','algunos','algún','alrededor','ambos','ampleamos','ante','anterior','antes','apenas','aproximadamente','aquel','aquellas','aquellos','aqui','aquí','arriba','aseguró','así','atras','aunque','ayer','añadió','aún','bajo','bastante','bien','buen','buena','buenas','bueno','buenos','cada','casi','cerca','cierta','ciertas','cierto','ciertos','cinco','comentó','como','con','conocer','conseguimos','conseguir','considera','consideró','consigo','consigue','consiguen','consigues','contra','cosas','creo','cual','cuales','cualquier','cuando','cuanto','cuatro','cuenta','cómo','da','dado','dan','dar','de','debe','deben','debido','decir','dejó','del','demás','dentro','desde','después','dice','dicen','dicho','dieron','diferente','diferentes','dijeron','dijo','dio','donde','dos','durante','e','ejemplo','el','ella','ellas','ello','ellos','embargo','empleais','emplean','emplear','empleas','empleo','en','encima','encuentra','entonces','entre','era','erais','eramos','eran','eras','eres','es','esa','esas','ese','eso','esos','esta','estaba','estabais','estaban','estabas','estad','estada','estadas','estado','estados','estais','estamos','estan','estando','estar','estaremos','estará','estarán','estarás','estaré','estaréis','estaría','estaríais','estaríamos','estarían','estarías','estas','este','estemos','esto','estos','estoy','estuve','estuviera','estuvierais','estuvieran','estuvieras','estuvieron','estuviese','estuvieseis','estuviesen','estuvieses','estuvimos','estuviste','estuvisteis','estuviéramos','estuviésemos','estuvo','está','estábamos','estáis','están','estás','esté','estéis','estén','estés','ex','existe','existen','explicó','expresó','fin','fue','fuera','fuerais','fueran','fueras','fueron','fuese','fueseis','fuesen','fueses','fui','fuimos','fuiste','fuisteis','fuéramos','fuésemos','gran','grandes','gueno','ha','haber','habida','habidas','habido','habidos','habiendo','habremos','habrá','habrán','habrás','habré','habréis','habría','habríais','habríamos','habrían','habrías','habéis','había','habíais','habíamos','habían','habías','hace','haceis','hacemos','hacen','hacer','hacerlo','haces','hacia','haciendo','hago','han','has','hasta','hay','haya','hayamos','hayan','hayas','hayáis','he','hecho','hemos','hicieron','hizo','hoy','hube','hubiera','hubierais','hubieran','hubieras','hubieron','hubiese','hubieseis','hubiesen','hubieses','hubimos','hubiste','hubisteis','hubiéramos','hubiésemos','hubo','igual','incluso','indicó','informó','intenta','intentais','intentamos','intentan','intentar','intentas','intento','ir','junto','la','lado','largo','las','le','les','llegó','lleva','llevar','lo','los','luego','lugar','manera','manifestó','mayor','me','mediante','mejor','mencionó','menos','mi','mientras','mio','mis','misma','mismas','mismo','mismos','modo','momento','mucha','muchas','mucho','muchos','muy','más','mí','mía','mías','mío','míos','nada','nadie','ni','ninguna','ningunas','ninguno','ningunos','ningún','no','nos','nosotras','nosotros','nuestra','nuestras','nuestro','nuestros','nueva','nuevas','nuevo','nuevos','nunca','o','ocho','os','otra','otras','otro','otros','para','parece','parte','partir','pasada','pasado','pero','pesar','poca','pocas','poco','pocos','podeis','podemos','poder','podria','podriais','podriamos','podrian','podrias','podrá','podrán','podría','podrían','poner','por','por qué','porque','posible','primer','primera','primero','primeros','principalmente','propia','propias','propio','propios','próximo','próximos','pudo','pueda','puede','pueden','puedo','pues','que','quedó','queremos','quien','quienes','quiere','quién','qué','realizado','realizar','realizó','respecto','sabe','sabeis','sabemos','saben','saber','sabes','se','sea','seamos','sean','seas','segunda','segundo','según','seis','ser','seremos','será','serán','serás','seré','seréis','sería','seríais','seríamos','serían','serías','seáis','señaló','si','sido','siempre','siendo','siete','sigue','siguiente','sin','sino','sobre','sois','sola','solamente','solas','solo','solos','somos','son','soy','su','sus','suya','suyas','suyo','suyos','sí','sólo','tal','también','tampoco','tan','tanto','te','tendremos','tendrá','tendrán','tendrás','tendré','tendréis','tendría','tendríais','tendríamos','tendrían','tendrías','tened','teneis','tenemos','tener','tenga','tengamos','tengan','tengas','tengo','tengáis','tenida','tenidas','tenido','tenidos','teniendo','tenéis','tenía','teníais','teníamos','tenían','tenías','tercera','ti','tiempo','tiene','tienen','tienes','toda','todas','todavía','todo','todos','total','trabaja','trabajais','trabajamos','trabajan','trabajar','trabajas','trabajo','tras','trata','través','tres','tu','tus','tuve','tuviera','tuvierais','tuvieran','tuvieras','tuvieron','tuviese','tuvieseis','tuviesen','tuvieses','tuvimos','tuviste','tuvisteis','tuviéramos','tuviésemos','tuvo','tuya','tuyas','tuyo','tuyos','tú','ultimo','un','una','unas','uno','unos','usa','usais','usamos','usan','usar','usas','uso','usted','va','vais','valor','vamos','van','varias','varios','vaya','veces','ver','verdad','verdadera','verdadero','vez','vosotras','vosotros','voy','vuestra','vuestras','vuestro','vuestros','y','ya','yo','él','éramos','ésta','éstas','éste','éstos','última','últimas','último','últimos', 'vos', 'tipo'];
var transcriptions = [];

var STARTMIN = 30;
var STARTMAX = 60;
var SENTENCELENGTH = 10;

var currentlyPlaying = false;
var currPlayInterval = 0;

var startWords = [];

var currAns = {};
var lastWord = false;
var seed;
var prng;

jQuery.getJSON('/edicion', (data) => {
	
	transcriptions = data;
	for(let i = 0; i < data.length; i++){
		for(let j = 0; j < data[i].transcription.length; j++){
			videoURL = data[i].videoURL;
			let word = data[i].transcription[j].word.toLowerCase();
			toAdd = {	endTime: data[i].transcription[j].endTime,
						startTime: data[i].transcription[j].startTime,
						word: word,
						videoURL: videoURL
					}
			if(word in wordDict){
				if(videoURL in wordDict[word]){
					wordDict[word][videoURL].push(toAdd);
				} else {
					wordDict[word][videoURL] = [toAdd];
				}
			} else {
				wordDict[word] = {};
				wordDict[word][videoURL] = [toAdd];
			}
		}
	}
	for(let i = 0; i < stopwords.length; i++){
		if(startWords.includes(stopwords[i])){
			startWords.splice(arr.indexOf(stopwords[i]), 1);
		}
		delete wordDict[stopwords[i]];
	};
	for(word in wordDict){
		if(Object.keys(wordDict[word]).length < 4){
			if(startWords.includes(word)){
				startWords.splice(arr.indexOf(word), 1);
			}
			delete wordDict[word];
		}
	}
	for(letword in wordDict){
		count = 0;
		for(videoURL in wordDict[word]){
			count += 1;
		}
		if(count > 16 || count < 4){
			delete wordDict[word];
		} else{
			if(Object.keys(wordDict[word]).length < 4){
				delete wordDict[word];
			}
		}
	}

	for(let word in wordDict){
		for(let source in wordDict[word]){
			if((wordDict[word][source][0].startTime > STARTMIN) && (wordDict[word][source][0].startTime < STARTMAX)) startWords.push(wordDict[word][source][0]);
		}
	}
})

function startEdit(){
	if(!seed){
		seed = `${stopwords[Math.floor(Math.random() * stopwords.length)]}${stopwords[Math.floor(Math.random() * stopwords.length)]}${stopwords[Math.floor(Math.random() * stopwords.length)]}.`;
		seed = seed.replace('á','a');
		seed = seed.replace('é','e');
		seed = seed.replace('í','i');
		seed = seed.replace('ó','o');
		seed = seed.replace('ú','u');
		seed = seed.replace('ñ','n');
		seed = seed.replace('ü','u');
		console.log(`Seed: ${seed}`)
	}

	prng = new Math.seedrandom(seed);

	let ans = startWords[Math.floor(prng() * startWords.length)];
	currAns = ans;

	source = {startTime: 0, endTime: ans.endTime + 1, videoURL: ans.videoURL};
	createStarterVideoElement(source);
	document.getElementById('startButton').style = 'display:none';
	document.getElementById('videoContainer').style = 'visibility:visible';
}

function transcriptionToSentences(transcription){
	transcription = transcription.transcription;
	sentences = [];
	phrase = "";
	phraseStart = 0;
	lastEnd = 0;
	for(let i = 0; i < transcription.length; i++){
		transcription[i].word = transcription[i].word.toLowerCase();
		if(((transcription[i].endTime - lastEnd) > SENTENCELENGTH) || (i == (transcription.length - 1))){
			lastEnd = transcription[i].endTime;
			sentences.push({phrase: phrase, phraseStart: phraseStart, phraseEnd: lastEnd});
			phrase = "";
			phraseStart = transcription[i].startTime
		}
		if(transcription[i].word.toLowerCase() == currAns.word && (transcription[i].startTime > (currAns.endTime - 3)) && (transcription[i].startTime < (currAns.endTime + 3))){
			phrase += `<span>${transcription[i].word}</span> `;
		} else if (transcription[i].word.toLowerCase() == lastWord && (transcription[i].startTime > (currAns.startTime - 3)) && (transcription[i].startTime < (currAns.startTime + 3))){
			phrase += `<span class='lastWord'>${transcription[i].word}</span> `;
		} else {
			phrase += `${transcription[i].word} `;
		}

	}
	sentences.push({phrase: phrase, phraseStart: phraseStart, phraseEnd: lastEnd});
	return sentences;
}

function setSentence(sentences){
	if(! currentlyPlaying){
		document.querySelector('#textContainer > p').textContent = "";
		return;
	}
	currentTime = document.getElementById('playingVideo').currentTime;
	for(let i = 0; i < sentences.length; i++){
		if(currentTime < sentences[i].phraseEnd){
			sentence = sentences[i].phrase;
			break;
		}
	}
	document.querySelector('#textContainer > p').innerHTML = sentence;
}

function destroyVideoElement(element){
	element.pause();
	element.muted = true;
	element.remove();
	clearInterval(currPlayInterval);
	currentlyPlaying = false;
	document.querySelector('#textContainer > p').textContent = "";
	lastWord = currAns.word;

	if(currAns.word == false){
		let ans = startWords[Math.floor(prng() * startWords.length)];
		currAns = ans;

		let source = {startTime: 0, endTime: ans.endTime + 1, videoURL: ans.videoURL};
		
		createStarterVideoElement(source);
		return;
	}

	let tmpSrcs = Object.keys(wordDict[currAns.word]);
	let words = Object.keys(wordDict);
	let ansArr = [];
	let endTime, currSrc, ans, tmpSrc;

	do{
		tmpSrc = tmpSrcs[Math.floor(prng() * tmpSrcs.length)];
	}while(tmpSrc == currAns.videoURL);

	currSrc = tmpSrc;
	let startTime = wordDict[currAns.word][currSrc][Math.floor(prng() * wordDict[currAns.word][currSrc].length)].startTime - 2;

	if(startTime < 0){
		startTime = 0;
	}


	for(let i = 0; i < words.length; i++){
		if(currAns.word == wordDict[words[i]]) continue;
		let srcs = Object.keys(wordDict[words[i]]);
		for(let j = 0; j < srcs.length; j++){
			if(srcs[j] == currSrc){  
				for(let k = 0; k < wordDict[words[i]][currSrc].length; k++){
					if(   (wordDict[words[i]][currSrc][k].startTime > (startTime + STARTMIN)) 
					&& ((wordDict[words[i]][currSrc][k].startTime < (startTime + STARTMAX)))   ){
						ansArr.push(wordDict[words[i]][currSrc][k]);
						// console.log(`${wordDict[words[i]][currSrc][k].word} is a valid instance!`)
						// console.log(wordDict[words[i]][currSrc][k]);
						break;
					}
				}
				break;
			}
		}
	}
	if(ansArr.length == 0) {
		endTime = false;
		ans = {word: false, endTime: false, startTime: startTime, videoURL: currSrc};
	}else{
		ans = ansArr[Math.floor(prng() * ansArr.length)];
		 endTime = 0;
		endTime = ans.endTime + 1;
	}
	currAns = {word: ans.word, endTime: endTime, startTime: startTime, videoURL: currSrc};
	console.log(`StartTime: ${startTime}, EndTime: ${endTime}`)
	let source = {startTime: startTime, endTime: endTime, videoURL: ans.videoURL};
	// console.log(currAns);
	// console.log(source);

	createStarterVideoElement(source);
}

function createStarterVideoElement(source){
	if(currentlyPlaying){
		clearInterval(currPlayInterval);
	}

	let video = document.createElement('video');
	video.src = 'uploads'+source.videoURL;
	video.autoplay = false;
	video.controls = false;
	video.muted = false;
	video.id = 'playingVideo';
	video.addEventListener('loadedmetadata', function() {
		let sentences = [];
	
		for(let i = 0; i < transcriptions.length; i++){
			if(transcriptions[i].videoURL === source.videoURL){
				sentences = transcriptionToSentences(transcriptions[i]);
				// console.log(sentences);
				break;
			}
		}

		if (source.endTime == false){
			source.endTime = video.duration + 1;
		}

		let delta = ((source.endTime - source.startTime) * 1000);

		console.log(`Starting video with url: ${source.videoURL} at time ${source.startTime}, ending at time ${source.endTime}. Endword = ${currAns.word}`);

		video.currentTime = source.startTime;
		video.play();

		setTimeout(destroyVideoElement, delta, video);
		currPlayInterval = setInterval(setSentence, 100, sentences);
		currentlyPlaying = true;
	  }, false);
	let container = document.getElementById('videoContainer');
	container.appendChild(video);
	// console.log(currAns);

}
