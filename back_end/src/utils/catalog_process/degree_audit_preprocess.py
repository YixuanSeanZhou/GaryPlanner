import datetime as dt
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import numpy as np
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import argparse

degree_audit_addr = "https://act.ucsd.edu/studentDarsSelfservice/audit/read.html?printerFriendly=true"

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


#You will receive a Duo Message. Accept that.
def get_degree_audit(user_name, user_pwd):
    driver = _get_driver(degree_audit_addr)

    form = driver.find_element_by_css_selector('form[id=login]')
    btn = form.find_element_by_css_selector('button')
    account = form.find_element_by_css_selector('input[type=username]')
    password = form.find_element_by_css_selector('input[type=password]')
    account.send_keys(user_name)
    password.send_keys(user_pwd)
    current_url = driver.current_url
    btn.click()
    wait(driver, 15).until(EC.url_changes(current_url))
    driver.switch_to.frame(driver.find_element_by_id('duo_iframe'))
    btn = driver.find_element_by_css_selector('button[type=submit]')
    current_url = driver.current_url
    btn.click()
    wait(driver, 60).until(EC.url_changes(current_url))

    div_all = driver.find_element_by_id('auditRequirements')
    div_heads = div_all.find_elements_by_css_selector('div[class=reqHeaderTable]')
    div_bodies = div_all.find_elements_by_css_selector('div[class=reqBody]')
    ret = []
    for i in range(len(div_bodies)):
        if 'ERND/WIP' in div_bodies[i].text:
            ret.append((i, div_bodies[i].text))
    return ret


def get_completed_courses(ret):
    complete = dict()
    for i in range(len(ret)):
        text = ret[i][1].split('\n')
        for j in range(len(text)):
            if (('FA' in text[j] or 'SP' in text[j] or 'WI' in text[j] 
                or 'S1' in text[j] or 'S2' in text[j]) and 'ERND' not in text[j]):
                #print(text[j])
                course_entry = text[j].split(' ')
                course_name = course_entry[1:-2]
                course_name = ''.join(course_name)
                credit = float(course_entry[-2])
                grade = course_entry[-1]
                if course_name not in complete:
                    complete[course_name] = (course_name, credit, grade)
    return complete


def get_needed_courses(ret):
    need = []
    for i in range(len(ret)):
        text_ = ret[i][1]
        if "Sub-Requirement Unfulfilled" not in text_:
            continue
        text_ = text_.replace("Sub-Requirement Complete", "<>\n")
        text_ = text_.replace("Sub-Requirement Unfulfilled", "<>\n<u>")
        text_ = text_.replace("Sub-Requirement In Progress", "<>\n")
        text = text_.split('\n<>\n')
        #print(text_)
        for line_ in text:
            if "<u>" in line_:
                #print(line_ + "\n")
                line = line_.splitlines()
                d = dict()
                it = 0
                while it < len(line):
                    if ')' in line[it] and len(line[it]) <= 6:
                        d['CATE'] = line[it+1]
                    if 'NEED' in line[it]:
                        d['NEED'] = {'num': float(line[it].split(' ')[1]), 'unit': line[it].split(' ')[2]}
                    if 'COURSE' in line[it]:
                        d['COURSE'] = []
                        for i in range(it+1, len(line)):
                            d['COURSE'].append(line[i])
                    it += 1
                need.append(d)
    
    return need


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Enter your ucsd username and password for the degree audit")
    parser.add_argument('user_name', help="your ucsd username")
    parser.add_argument('user_pwd', help="your account password")
    args = parser.parse_args()

    det = get_degree_audit(args.user_name, args.user_pwd)
    print("Check your phone for Duo")
    complete = get_completed_courses(det)
    need = get_needed_courses(det)

    print("Your completed Courses:")
    for k in complete:
        print(complete[k][0], complete[k][1], complete[k][2])
    print()

    print("Your needed Courses:")
    for k in need:
        print(k)
        print()