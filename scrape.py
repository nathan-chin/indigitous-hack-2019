import os
import urllib3
import requests
import random
from bs4 import BeautifulSoup
import string

BOOKS = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
'1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC',
'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC',
'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT',
'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI',
'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV']

BOOKS_2 = ['MAT', 'MRK', 'LUK', 'JHN', 'ACT',
'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI',
'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV']

print(len(BOOKS))
def create_dir(name, path=''):
    try:
        os.mkdir(path + name)
    except OSError:
        print ("Creation of the directory %s failed")

VERSION = 'NIV'

http = urllib3.PoolManager()
BASE_URL = 'https://www.bible.com/bible/111/'

create_dir('Bible')
count = 1
count2 = 40
for b in BOOKS_2:
    create_dir(b, 'Bible/' + str(count2) + '_')
    chap = 1
    #print(str(BASE_URL + b + '.' + str(chap) + '.' + VERSION))
    page = http.request('GET', str(BASE_URL + b + '.' + str(chap) + '.' + VERSION))
    page = BeautifulSoup(page.data.decode('utf-8'), 'lxml')
    links = page.find_all('a', attrs={'class':'nav-right'})
    #print(links[0]['title'][-1:])
    flag = 0
    while True:
        f = open('Bible/' + str(count2) + '_' + b + '/' + str(chap) + '.txt', 'w+', encoding="utf-8")
        page = http.request('GET', str(BASE_URL + b + '.' + str(chap) + '.' + VERSION))
        page = BeautifulSoup(page.data.decode('utf-8'), 'lxml')
        links = page.find_all('a', attrs={'class':'nav-right'})
        if len(links) == 0 or links[0]['title'].split()[-1] == 'Intro':
            flag = 1
        print("Working on " + b + " " + str(chap))
        page = http.request('GET', str(BASE_URL + b + '.' + str(chap) + '.' + VERSION))
        page = BeautifulSoup(page.data.decode('utf-8'), 'lxml')
        chText = page.find('div', attrs={'class':'chapter'})
        verses = chText.find_all('span', attrs={'heading', 'wj', 'content', 'label'})
        verses = [v for v in verses if v.text != ' ' and v.text != '#']
        #print(verses)
        verseNum = 1
        allData = []
        red = 0
        for v in verses:
            line = (v.text.lstrip().rstrip() + '\n').replace('—', '--').replace('“', '"').replace('”', '"')
            if v['class'][0] == 'heading':
                if line.lstrip().rstrip().lower() == 'lord':
                    allData[-1] += ' ' + line.rstrip()
                else:
                    if len(allData) > 0:
                        allData[-1] += '\n'
                    allData.append(line[:-1])
            elif v['class'][0] == 'label':
                if red == 1:
                    allData[-1] = allData[-1][:-1]
                    allData.append('(r] ')
                    red = 0
                if len(allData) > 0:
                    allData[-1] += '\n'
                allData.append(line[:-1] + ": ")
            elif v['class'][0] == 'wj':
                if red == 0:
                    red = 1
                    allData.append('[r) ')
            else:
                if line.lstrip().rstrip().lower() == 'lord':
                    allData.append(line.lstrip().rstrip() + ' ')
                else:
                    if line[0] in string.punctuation:
                        allData[-1] = allData[-1][:-1]
                    allData.append(line[:-1] + ' ')
                if red == 1:
                    allData[-1] = allData[-1][:-1]
                    allData.append('(r] ')
                    red = 0
        for j in allData:
            f.write(j)
        f.close()
        if flag == 1:
            flag = 0
            break
        chap += 1
    count2 += 1
    #f.close()