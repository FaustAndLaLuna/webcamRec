wordDict = {};
stopwords = ['a','actualmente','adelante','además','afirmó','agregó','ahora','ahí','al','algo','alguna','algunas','alguno','algunos','algún','alrededor','ambos','ampleamos','ante','anterior','antes','apenas','aproximadamente','aquel','aquellas','aquellos','aqui','aquí','arriba','aseguró','así','atras','aunque','ayer','añadió','aún','bajo','bastante','bien','buen','buena','buenas','bueno','buenos','cada','casi','cerca','cierta','ciertas','cierto','ciertos','cinco','comentó','como','con','conocer','conseguimos','conseguir','considera','consideró','consigo','consigue','consiguen','consigues','contra','cosas','creo','cual','cuales','cualquier','cuando','cuanto','cuatro','cuenta','cómo','da','dado','dan','dar','de','debe','deben','debido','decir','dejó','del','demás','dentro','desde','después','dice','dicen','dicho','dieron','diferente','diferentes','dijeron','dijo','dio','donde','dos','durante','e','ejemplo','el','ella','ellas','ello','ellos','embargo','empleais','emplean','emplear','empleas','empleo','en','encima','encuentra','entonces','entre','era','erais','eramos','eran','eras','eres','es','esa','esas','ese','eso','esos','esta','estaba','estabais','estaban','estabas','estad','estada','estadas','estado','estados','estais','estamos','estan','estando','estar','estaremos','estará','estarán','estarás','estaré','estaréis','estaría','estaríais','estaríamos','estarían','estarías','estas','este','estemos','esto','estos','estoy','estuve','estuviera','estuvierais','estuvieran','estuvieras','estuvieron','estuviese','estuvieseis','estuviesen','estuvieses','estuvimos','estuviste','estuvisteis','estuviéramos','estuviésemos','estuvo','está','estábamos','estáis','están','estás','esté','estéis','estén','estés','ex','existe','existen','explicó','expresó','fin','fue','fuera','fuerais','fueran','fueras','fueron','fuese','fueseis','fuesen','fueses','fui','fuimos','fuiste','fuisteis','fuéramos','fuésemos','gran','grandes','gueno','ha','haber','habida','habidas','habido','habidos','habiendo','habremos','habrá','habrán','habrás','habré','habréis','habría','habríais','habríamos','habrían','habrías','habéis','había','habíais','habíamos','habían','habías','hace','haceis','hacemos','hacen','hacer','hacerlo','haces','hacia','haciendo','hago','han','has','hasta','hay','haya','hayamos','hayan','hayas','hayáis','he','hecho','hemos','hicieron','hizo','hoy','hube','hubiera','hubierais','hubieran','hubieras','hubieron','hubiese','hubieseis','hubiesen','hubieses','hubimos','hubiste','hubisteis','hubiéramos','hubiésemos','hubo','igual','incluso','indicó','informó','intenta','intentais','intentamos','intentan','intentar','intentas','intento','ir','junto','la','lado','largo','las','le','les','llegó','lleva','llevar','lo','los','luego','lugar','manera','manifestó','mayor','me','mediante','mejor','mencionó','menos','mi','mientras','mio','mis','misma','mismas','mismo','mismos','modo','momento','mucha','muchas','mucho','muchos','muy','más','mí','mía','mías','mío','míos','nada','nadie','ni','ninguna','ningunas','ninguno','ningunos','ningún','no','nos','nosotras','nosotros','nuestra','nuestras','nuestro','nuestros','nueva','nuevas','nuevo','nuevos','nunca','o','ocho','os','otra','otras','otro','otros','para','parece','parte','partir','pasada','pasado','pero','pesar','poca','pocas','poco','pocos','podeis','podemos','poder','podria','podriais','podriamos','podrian','podrias','podrá','podrán','podría','podrían','poner','por','por qué','porque','posible','primer','primera','primero','primeros','principalmente','propia','propias','propio','propios','próximo','próximos','pudo','pueda','puede','pueden','puedo','pues','que','quedó','queremos','quien','quienes','quiere','quién','qué','realizado','realizar','realizó','respecto','sabe','sabeis','sabemos','saben','saber','sabes','se','sea','seamos','sean','seas','segunda','segundo','según','seis','ser','seremos','será','serán','serás','seré','seréis','sería','seríais','seríamos','serían','serías','seáis','señaló','si','sido','siempre','siendo','siete','sigue','siguiente','sin','sino','sobre','sois','sola','solamente','solas','solo','solos','somos','son','soy','su','sus','suya','suyas','suyo','suyos','sí','sólo','tal','también','tampoco','tan','tanto','te','tendremos','tendrá','tendrán','tendrás','tendré','tendréis','tendría','tendríais','tendríamos','tendrían','tendrías','tened','teneis','tenemos','tener','tenga','tengamos','tengan','tengas','tengo','tengáis','tenida','tenidas','tenido','tenidos','teniendo','tenéis','tenía','teníais','teníamos','tenían','tenías','tercera','ti','tiempo','tiene','tienen','tienes','toda','todas','todavía','todo','todos','total','trabaja','trabajais','trabajamos','trabajan','trabajar','trabajas','trabajo','tras','trata','través','tres','tu','tus','tuve','tuviera','tuvierais','tuvieran','tuvieras','tuvieron','tuviese','tuvieseis','tuviesen','tuvieses','tuvimos','tuviste','tuvisteis','tuviéramos','tuviésemos','tuvo','tuya','tuyas','tuyo','tuyos','tú','ultimo','un','una','unas','uno','unos','usa','usais','usamos','usan','usar','usas','uso','usted','va','vais','valor','vamos','van','varias','varios','vaya','veces','ver','verdad','verdadera','verdadero','vez','vosotras','vosotros','voy','vuestra','vuestras','vuestro','vuestros','y','ya','yo','él','éramos','ésta','éstas','éste','éstos','última','últimas','último','últimos'];

jQuery.getJSON('/edicion', (data) => {
	for(let i = 0; i < data.length; i++){
		for(let j = 0; j < data[i].transcription.length; j++){
			toAdd = {	videoURL: data[i].videoURL,
						endTime: data[i].transcription[j].endTime,
						startTime: data[i].transcription[j].startTime,
					}
			if(data[i].transcription[j].word.toLowerCase() in wordDict){
				wordDict[data[i].transcription[j].word.toLowerCase()].push(toAdd);
			} else {
				wordDict[data[i].transcription[j].word.toLowerCase()] = [toAdd];
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
	element.pause();
	element.muted = true;
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
		setTimeout(destroyVideoElement, delta, video);
	  }, false);
	let container = document.getElementById('videoContainer');
	container.appendChild(video);
}

function createVideoSequence(videoObj){
	let delta = 0;
	for(let i = 0; i < videoObj.length; i++){
		setTimeout(createVideoElement, delta, videoObj[i]);
		delta += ((videoObj[i].endTime - videoObj[i].startTime) * 1000)+100;
	}
}

function createEditFromPhrase(phrase){
	videoObject = getPhraseVideoObject(phrase);
	createVideoSequence(videoObject);
}