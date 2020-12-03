import re

class_abbr = ['AIP', 'AAS', 'AWP', 'ANES', 'ANBI', 'ANAR', 'ANTH', 'ANSC', 'AESE', 'AUD', 'BENG', 'BNFO', 'BIEB', 'BICD', 'BIPN',
 'BIBC', 'BGGN', 'BGJC', 'BGRD', 'BGSE', 'BILD', 'BIMM', 'BISP', 'BIOM', 'CMM', 'CENG', 'CHEM', 'CHIN', 'CLAS', 'CCS', 'CLIN',
  'CLRE', 'COGS', 'COMM', 'COMT', 'COGR', 'CSS', 'CSE', 'CGS', 'CAT', 'TDDM', 'TDHD', 'TDMV', 'TDTR', 'DSC', 'DSE', 'DERM', 'DSGN',
   'DOC', 'DDPM', 'ECON', 'EDS', 'ERC', 'ECE', 'EMED', 'ENG', 'ENVR', 'ESYS', 'ETIM', 'ETHN', 'EXPR', 'FMPH', 'FPM', 'FILM', 'GPCO',
    'GPEC', 'GPGN', 'GPIM', 'GPLA', 'GPPA', 'GPPS', 'GLBH', 'HITO', 'HIAF', 'HIEA', 'HIEU', 'HILA', 'HISC', 'HINE', 'HIUS', 'HIGR',
     'HILD', 'HDS', 'HUM', 'INTL', 'ICAM', 'JAPN', 'JWSP', 'LATI', 'LHCO', 'LISL', 'LIAB', 'LIDS', 'LIFR', 'LIGN', 'LIGM', 'LIHL',
      'LIIT', 'LIPO', 'LISP', 'LTAM', 'LTCH', 'LTCO', 'LTCS', 'LTEU', 'LTFR', 'LTGM', 'LTGK', 'LTIT', 'LTKO', 'LTLA', 'LTRU', 'LTSP',
       'LTTH', 'LTWR', 'LTEN', 'LTWL', 'LTEA', 'MMW', 'MBC', 'MATS', 'MATH', 'MSED', 'MAE', 'MED', 'MUIR', 'MCWP', 'MUS', 'NANO', 'NEU',
        'NEUG', 'OPTH', 'ORTH', 'PATH', 'PEDS', 'PHAR', 'SPPS', 'PHIL', 'PHYS', 'POLI', 'PSY', 'PSYC', 'RMAS', 'RAD', 'MGTF', 'MGT', 'MGTA', 
        'MGTP', 'RELI', 'RMED', 'REV', 'SOMI', 'SOMC', 'SIOC', 'SIOG', 'SIOB', 'SIO', 'SEV', 'SXTH', 'SOCG', 'SOCE', 'SOCI', 'SE', 'SURG', 'SYN',
         'TDAC', 'TDDE', 'TDDR', 'TDGE', 'TDGR', 'TDHT', 'TDPW', 'TDPR', 'TWS', 'TMC', 'USP', 'UROL', 'VIS', 'WARR', 'WCWP', 'WES']


def parseClassIgnoreOr(classInStr):
    lst = re.findall('TO|OR|[A-Z]+ \d+[A-Z]?|\d+[A-Z]?', classInStr)
    # print(lst)
    result = []
    course = ""
    isOr = False
    for i in range(len(lst)):
        ele = lst[i]
        if ele == "TO": # Different TO cases
            # If is of form CSE 100 to 194
            if lst[i-1][-1].isdigit():
                start = int(re.findall('\d+',lst[i-1])[0])
                end = int(re.findall('\d+',lst[i+1])[0])
                for j in range(start+1,end):
                    result.append(course + " " + str(j))
            # If is of form ECON 120A to 120C
            else:
                start = ord(lst[i-1][-1])
                end = ord(lst[i+1][-1])
                num = re.findall('\d+',lst[i-1])[0]
                for j in range(start+1,end):
                    result.append(course + " " + num + chr(j))
        # Ignore Or
        elif ele == "OR":
            continue
        # General case
        else:
            courseLst = re.findall('[A-Z]{3,}',ele)
            # If it has course title, update course var
            if courseLst != []:
                course = courseLst[0]
                result.append(ele)
            # If no course stated, pick the current course
            else:
                result.append(course + " " + ele)
    return result


def parseClassWithOr(classInStr):
    lst = re.findall('TO|OR|[A-Z]+ \d+[A-Z]?|\d+[A-Z]?', classInStr)
    print(lst)
    course = ""
    result = []
    isOr = False
    for i in range(len(lst)):
        ele = lst[i]
        if ele == "TO": # Different TO cases
            # If is of form CSE 100 to 194
            if lst[i-1][-1].isdigit():
                start = int(re.findall('\d+',lst[i-1])[0])
                end = int(re.findall('\d+',lst[i+1])[0])
                for j in range(start+1,end):
                    if isOr:
                        isOr = False
                        result[-1].append(course + " " + str(j))
                    else:
                        result.append([course + " " + str(j)])
            # If is of form ECON 120A to 120C
            else:
                start = ord(lst[i-1][-1])
                end = ord(lst[i+1][-1])
                for j in range(start+1,end):
                    if isOr:
                        isOr = False
                        result[-1].append(course + " " + str(j))
                    else:
                        result.append([course + " " + str(j)])
        # If is a OR
        elif ele == "OR":
            isOr = True
        else:
            courseLst = re.findall('[A-Z]{3,}',ele)
            if courseLst != []:
                course = courseLst[0]
                if isOr:
                    isOr = False
                    result[-1].append(ele)
                else:
                    result.append([ele])
            else:
                if isOr:
                    isOr = False
                    result[-1].append(course + " " + ele)
                else:
                    result.append([course + " " + ele])
    return result

# This is required classes so run with parseClassWithOr()
inp2 = "CSE 101,120 OR 123 OR 124,130 OR 132A,107 OR 127,150 OR 151 OR 152 OR 153 OR 158 OR 167"

# The following are electives so run with parseClassIgnoreOr()
inp3 = "AAS 10 ETHN 1, 2, 3, 20 HILD 7A, 7B, 7C, 11, 12, 14 LATI 10, 50 LTEN 27, 28, 29 LTCS 52 TWS 21, 22, 23, 24, 25, 26"
inp4 = "MUS 4, 5, 6 TO 16, 17, 18, 19, 20, 80 TDGE 1, 5, 10, 11, 12, 27 TDHT 21 TO 23 VIS 1 TO 3, 20 TO 22, 40, 84"

inp = [
   "CSE 100 TO 194,197,198,199 COGS 188 MGT 103,110,121A,164,166,172,174,181",
   "COG SCI: COGS 101A TO 101C,102A TO 102C,107A TO 107C,108A TO 108C,108D,108E,",
   "COGS 108F,109,118A,118B,120,121,130,131,132,141,150,153,170,180,181,182,185,",
   "COGS 187A,187B,188",
   "ECE: ECE 100 TO 194",
   "ECON: ECON 100A,100B,109,110A,110B,113,120B TO 120C,121,170A,170B,171,172A TO",
   "ECON 172C,178",
   "LING: LIGN 110,111,115,120,121,125,130,160,163,165,170,172,175",
   "ENGG: MAE 100 TO 194",
   "MATH: MATH 100 TO 194",
   "MUSIC: MUS 171,172,173",
   "PSYCH: PSYC 161",
   "COMMUNICATION: COMM 105G OR COCU 177 ECON 120A PHYS 105"
  ]

inp5 = ""
for ele in inp:
    inp5 += ele + " "

# Change inp4 to any of the above
print(parseClassWithOr(inp2))

import datetime as dt
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import pandas as pd
import numpy as np
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC

#open the first window
def start(link):
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get(link)
    driver_list = driver.window_handles

    time.sleep(0.2)
    return driver



def get_major(driver):
    # Given req_header list, get major info
    reqh = driver.find_elements_by_class_name('reqText')
    for idx in range(len(reqh)):
        if 'MAJOR' in reqh[idx].text and 'REQUIREMENTS' in reqh[idx].text:
            major = reqh[idx + 1].text
            break
    major_code = ''
    take = False
    major_text = ''
    major_text_take = False
    for c in major:
        if c == '(':
            take = True
            continue
        elif c == ')':
            take = False
        if take:
            major_code += c
        if take == False and c not in [' ', '(', ')']:
            major_text_take = True
        if major_text_take:
            major_text += c
    return major_code, major_text

def get_college(driver):
    # Given req_header list, get major info
    reqh = driver.find_elements_by_class_name('reqText')
    for idx in range(len(reqh)):
        if 'GENERAL' in reqh[idx].text and 'EDUCATION' in reqh[idx].text:
            ge = reqh[idx].text
            break
    college = ge
    college = college.replace(' ', '')
    college = college.replace('GENERALEDUCATION', '')
    return college

if __name__ == "__main__":
    driver = start("file:///../../benson_dq.html")
    sub_req = {}
    start = False
    for i in range(len(reqh)):
        if 'MAJOR REQUIREMENTS' in reqh[i].text:
            start = True
            continue
        if 'WORK IN PROGRESS' in reqh[i].text:
            start = False
        if start:
            sub_text = reqh[i].find_element_by_css_selector('div.reqTitle').text.split('\n')[0]
            if 'WARREN' in sub_text:
                sub_text = reqh[i].find_element_by_css_selector('div.reqTitle').text.replace('\n', '')
                
                num = int(float(reqb[i].text.split(' ')[1]))
                unit = (reqb[i].text.split(' ')[2])
                sub_req[sub_text] = {}
                sub_req[sub_text]['needs'] = {unit: int(num)}
                continue
            if '48 Upper' in sub_text or '>>' in sub_text or 'Area' in sub_text:
                continue
            if sub_text == '':
                continue
            sub_req[sub_text] = {}
            
            # print(sub_text)
            # print(i)
            # print(reqh[i].find_element_by_css_selector('div.reqTitle').text)
            # try:
            subs = reqb[i].find_elements_by_css_selector('div.subreqBody')
            for sub in subs:
                cate = ['subreqTitle srTitle_substatusOK', 'subreqTitle srTitle_substatusNO']
                s = sub.find_elements_by_tag_name('span')
                # print(s_ok[0].text)
                try:
                    subreq_text = s[0].text
                    if '\n' in subreq_text:
                        subreq_text = subreq_text.split('\n')[0]
                except:
                    print("NO Span")
                    print(sub_text)
                if subreq_text not in sub_req[sub_text]:
                    sub_req[sub_text][subreq_text] = {}


                trs = sub.find_elements_by_class_name('takenCourse')

                ret_list = []
                # Process Taken Classes
                for tr in trs:
                    tds = tr.find_elements_by_css_selector('td')
                    ret = {}
                    for td in tds:
                    
                        cname = td.get_attribute('class')
                        # print(cname)
                        if cname not in ['term', 'course', 'credit', 'grade']:
                            continue
                        else:
                            if cname == 'grade':
                                ret[cname] = td.text.replace(' ', '')
                            ret[cname] = td.text
                    # print(ret)
                    ret_list.append(ret)
                sub_req[sub_text][subreq_text]['taken'] = ret_list
                if sub_req[sub_text][subreq_text]:
                    #try:
                    # special case for warren
                    try:
                        need_table = sub.find_element_by_css_selector('table.subreqNeeds')
                        trs = need_table.find_elements_by_tag_name('td')
                        sub_req[sub_text][subreq_text]['needs'] = {trs[2].text: int(trs[1].text)}
                        td = sub.find_element_by_css_selector('td.fromcourselist')
                        if 'Elective' not in subreq_text:
                            sub_req[sub_text][subreq_text]['course_needs'] = parseClassWithOr(td.text)
                        else:
                            sub_req[sub_text][subreq_text]['course_needs'] = parseClassIgnoreOr(td.text)
                    except:
                        sub_req[sub_text][subreq_text]['needs'] = {}
                    # print(sub_text)
                        # print(subreq_text)
                        # print('N/A')
                        pass
    import json
    ret = {'major': get_major(driver), 'college': get_college(driver), 'req': sub_req}

    with open ('benson_da.json', 'w') as file:
        json.dump(ret, file)