#coding=UTF-8
from nltk import tokenize
import pyphen, re, random, csv, unidecode
pyphen.language_fallback('es')
#cess_esp

vocals = ['a', 'e', 'i', 'o', 'u', 'y', 'w']

def generate_poem(sentence_map:map, poem_type:str, poem_length:int) -> str: 
	char_map = {}
	taken_vowels = [""]
	poem = ''
	for char in poem_type:
		if char in char_map or char == 'x':
			continue
		temp = ""
		while temp in taken_vowels:
			temp = vocals[random.randrange(0, 5)]
		char_map[char] = temp
		taken_vowels+= temp
	taken_vowels = taken_vowels[1:]

	for char in poem_type:
		search_delta = 0
		is_found = False
		if char == 'x':
			vocal = vocals[random.randrange(0, 5)]
			while vocal in taken_vowels:
				vocal = vocals[random.randrange(0, 5)]
		else:
			vocal = char_map[char]
		ans = ''
		while not is_found:
			if (poem_length + search_delta) in sentence_map:
				if vocal in sentence_map[poem_length + search_delta]:
					for j in range(0, len(sentence_map[poem_length + search_delta][vocal])):
						i = random.randrange(0,len(sentence_map[poem_length + search_delta][vocal]))
						if not sentence_map[poem_length + search_delta][vocal][i] in poem:
							ans = '\n' + sentence_map[poem_length + search_delta][vocal][i]
							is_found = True
							break
			if (poem_length - search_delta) in sentence_map:
				if vocal in sentence_map[poem_length - search_delta]:
					for j in range(0, len(sentence_map[poem_length - search_delta][vocal])):
						i = random.randrange(0,len(sentence_map[poem_length - search_delta][vocal]))
						if not sentence_map[poem_length - search_delta][vocal][i] in poem:
							ans = '\n' + sentence_map[poem_length - search_delta][vocal][i]
							is_found = True
							break
			search_delta += 1
			if search_delta > 2:
				return None
		poem += ans
	return poem[1:]

if __name__ == '__main__':
	f = open('poems.csv', encoding='utf-8')
	file = csv.DictReader(f)
	sentences = []
	for f in file:
		sentences += tokenize.sent_tokenize(f['content'])
	dic = pyphen.Pyphen(lang='es')

	sentence_map = {}
	for sentence in sentences:
		if '1' in sentence or '2' in sentence or '3' in sentence or '4' in sentence or '5' in sentence or '6' in sentence or '7' in sentence or '8' in sentence or '9' in sentence or '0' in sentence:
			continue
		sntnc = sentence.replace('\n', ' ').split(',')
		for sentence in sntnc:
			if len(sentence) == 0:
				continue
			if sentence[0] == ' ':
				sentence = sentence[1:]
			syllable_count = 0
			without_punct = re.sub(r'[^\w\s]', '', sentence)
			words = without_punct.split(' ')
			for word in words:
				syllable_count += len(dic.positions(word)) + 1
			if syllable_count > 20 or syllable_count < 3:
				continue
			temp_sentence_vocal = unidecode.unidecode(sentence).lower()
			for i in range(len(temp_sentence_vocal)-1, -1, -1):
				if temp_sentence_vocal[i] in vocals:
					if not syllable_count in sentence_map:
						sentence_map[syllable_count] = {temp_sentence_vocal[i] : [sentence]}
					else:
						if not temp_sentence_vocal[i] in sentence_map[syllable_count]:
							sentence_map[syllable_count][temp_sentence_vocal[i]] = [sentence]
						else:
							sentence_map[syllable_count][temp_sentence_vocal[i]] += [sentence]
					break
	# print(sentence_map[12])
	poem_types = [	{'structure':'xaxa', 'syllables':11}, 		#canciones
					{'structure':'axa', 'syllables':11},		#terceto
					# {'structure':'abba', 'syllables':11},		#cuarteto
					{'structure':'axa', 'syllables':8},			#tercetillo
					# {'structure':'abba', 'syllables':8},		#redondilla
					# {'structure':'abab', 'syllables':11},		#serventesio
					# {'structure':'abab', 'syllables':8},		#cuarteto
					{'structure':'aaaa', 'syllables':14},		#cuaderna via
					# {'structure':'aabcb', 'syllables':8},		#quintilla
					# {'structure':'abbab', 'syllables':8},		#quintilla
					# {'structure':'abababcc', 'syllables':11},	#Octava Real
					# {'structure':'abbaaccaa', 'syllables':12},	#Copla de Arte Mayor
					# {'structure':'xaabxccb', 'syllables':11},	#Octava Italiana
					]	

	for i in range(0, 20):
		j = random.randrange(0, len(poem_types))
		ans = None
		while not ans:
			for count in range(0,5):
				ans = generate_poem(sentence_map, poem_types[j]['structure'], poem_types[j]['syllables'])
				if ans:
					poem_type = poem_types[j]
					break
			j = random.randrange(0, len(poem_types))
		print()
		print(poem_type)
		print(ans)	
