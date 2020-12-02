from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, login_user, logout_user, current_user

import datetime as dt
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
# import pandas as pd
import numpy as np
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

from ..utils.catalog_process.combine import main

degree_audit_api_bp = Blueprint('degree_audit_api', __name__)
CORS(degree_audit_api_bp, supports_credentials=True)

def _get_driver(link):
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    driver.get(link)

    time.sleep(0.2)
    return driver

@degree_audit_api_bp.route('/request_degree_audit', methods=['GET'])
def request_degree_audit():
    user_name = request.args.get('user_name')
    pwd = request.args.get('pwd')

    driver = _get_driver("https://act.ucsd.edu/studentDarsSelfservice/audit/read.html?printerFriendly=true")
    form = driver.find_element_by_css_selector('form[id=login]')
    btn = form.find_element_by_css_selector('button')
    account = form.find_element_by_css_selector('input[type=username]')
    password = form.find_element_by_css_selector('input[type=password]')
    account.send_keys(user_name)
    password.send_keys(pwd)
    current_url = driver.current_url
    
    btn.click()
    wait(driver, 15).until(EC.url_changes(current_url))
    try:
        error = driver.find_element_by_id('_login_error_message')
        driver.close()
        return {'reason': 'UCSD crediential mismatch'}, 400
    except:
        pass
    
    frame = driver.find_element_by_id('duo_iframe')
    driver.switch_to.frame(driver.find_element_by_id('duo_iframe'))
    btn = driver.find_element_by_css_selector('button[type=submit]')
    url = driver.current_url
    btn.click()
    time.sleep(15)
    if url == driver.current_url:
        return {'reason': 'need to check duo'}, 400

    ret = {}
    # div_outer = driver.find_element_by_id('auditMenu')
    # btn = div_outer.find_element_by_id('expandAll')
    # btn.click()
    # try:
    reqh = driver.find_elements_by_class_name('reqHeaderTable')
    reqb = driver.find_elements_by_class_name('reqBody')
    if len(reqh) != len(reqb):
        print('ERROR')
    sub_req = {}
    taken = []
    need = []
    start = False
    try: 
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
                    taken += ret_list
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
                                # eed.append(sub_req[sub_text][subreq_text]['course_needs'])
                            else:
                                sub_req[sub_text][subreq_text]['course_needs'] = parseClassIgnoreOr(td.text)
                                # need.append(sub_req[sub_text][subreq_text]['course_needs'])in_quarter = cat.text
                        except:
                            pass
        return {'reason': 'success', 'result': sub_req}, 200
    except:
        return {'reason': 'Run your degree auidt first, or your degree audit is unable to parse'}, 400

@degree_audit_api_bp.route('/attempt', methods=['GET'])
def attempt():
    return main(), 200