from urllib.request import urlopen
import html2text
import numpy as np
import argparse
import json
from collections import defaultdict
from nltk import word_tokenize

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


def _iscourse(st):
    if '_' not in st:
        return False
    id = st.split('_')[0]
    num = st.split('_')[1]
    if id.upper() not in class_abbr:
        return False
    if not any(c.isdigit() for c in num):
        return False
    return True


def _divide_or(st):
    if ',' not in st:       # case: a or b or c or d case
        return st.split('or')
    else:
        if ',or' in st:     # case: a,b,c,d,e,f,or g
            st = st.replace(',or', ',')
            return st.split(',')
        else:               # case: , is equivalent to and
            st_ = st.split(',')
            for i in range(len(st_)):
                st_[i] = _divide_or(st_[i])
            return st_[i]


def _parse_prereq(pre):
    # special case handling
    pre_ = pre.split(';')[0].split('.')[0].split('concurrent')[0]
    pre_ = pre_.replace('or consent of instructor', '')
    pre_ = pre_.replace('any course from the following: ', '')
    pre_ = pre_.replace('or equivalent', '')
    proc = word_tokenize(pre_)
    # concatenate courses
    i = 0
    while i < len(proc):
        if proc[i] in class_abbr and i != len(proc)-1:
            proc[i] = '_'.join([proc[i], proc[i+1]])
            proc.remove(proc[i+1])
        i += 1

    i = 0
    while i < len(proc):
        if len(proc[i]) == 1 and not proc[i].isalpha() and not proc[i].isnumeric() and proc[i] != ',':
            proc.remove(proc[i])
        else:
            i+=1

    # remove redundant operator
    while proc[-1] in ['and', ',', 'or']:
        proc.remove(proc[-1])
    
    res = ''.join(proc).split('and')
    for i in range(len(res)):
        res[i] = _divide_or(res[i])
    return res


def _if_with_abbr(st):
    tokens = word_tokenize(st)
    for s in class_abbr:
        if s in tokens:
            return True
    return False


def _expand_lis(lis):
    fin = []
    for tp in lis:
        fin += list(tp)
    return fin


def get_html_text(url_addr):
    f = urlopen(url_addr)
    html = str(f.read().decode('utf-8'))
    return html2text.html2text(html)
    

def get_course_raw_from_text(html_text):
    if 'Lower Division' in html_text and '## Graduate' in html_text:
        raw = html_text.split('Lower Division')[1].split('## Graduate')[0].split('\n\n')[1:-1]
    else:
        #TODO Deal with those catalog without 'Lower Division' or 'Graduate'...
        raw = html_text

    redu = ["## Upper Division", "", "## Graduate", '_']
    for w in redu:
        while w in raw:
            raw.remove(w)

    # create course_raw
    course_raw = []
    for i in np.arange(0, len(raw), 2):
        d = {}
        title = raw[i].replace('\n', ' ')
        des = raw[i+1].replace('\n', ' ')
        try:
            d['num'] = title.split('.')[0].replace(' ', '_')
            d['name'] = title.split('. ')[1].split(' (')[0]
            d['unit'] = title.split('(')[1].split(')')[0]
            d['des'] = des.split('**')[0]
        
            if "**" not in des:
                d['pre'] = 'None'
            else:
                d['pre'] = des.split('**')[2]
        except:
            print(raw[i], title, des)
        course_raw.append(d)
    return course_raw


def parse_into_course(course_raw):
    for line in course_raw:
        pre = line['pre'].upper()
        if _if_with_abbr(pre):
            formated = _parse_prereq(line['pre'])
            if not any(not _iscourse(c) for c in _expand_lis(formated)):
                line['formatted_pre'] = formated
            else:
                line['formatted_pre'] = []
        else:
            line['formatted_pre'] = []
    return course_raw


# Now only stable for CSE catalog.
def get_info_from_catalog(url_addr):
    htmltext = get_html_text(url_addr)
    course_raw = get_course_raw_from_text(htmltext)
    course_raw = parse_into_course(course_raw)
    return course_raw
    

def export_json_format(course_raw, addr):
    with open(addr, "w") as outfile:  
        json.dump(course_raw, outfile, indent=1) 


# Only for test use
if __name__ == "__main__":
    course_raw = get_info_from_catalog("https://www.ucsd.edu/catalog/courses/CSE.html")
    export_json_format(course_raw, 'cse.json')
    