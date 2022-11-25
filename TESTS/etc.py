#coding=UTF-8

import csv

f = open('poems.csv', encoding='utf-8')
file = csv.DictReader(f)
for f in file:
	print(f.keys())