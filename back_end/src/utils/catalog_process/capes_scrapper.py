import datetime as dt
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json

# Workflow
# May be asked to login
# Got to https://cape.ucsd.edu/responses/Results.aspx
# Search by either professor or course
# Scrape Webpage

capes_link = "https://cape.ucsd.edu/responses/Results.aspx"

# class to check when the table has updated (search requirements changed and search button pressed)
class waittest:
    def __init__(self, prev):
        self.prev = prev

    def __call__(self, driver):
        try:
            new = driver.find_element_by_xpath("//table[1]/tbody/tr/td").text
            if new != self.prev:
                new = None
                return True
            else:
                new = None
                return False
        except selenium.common.exceptions.StaleElementReferenceException:
            return False
        

def start(link):
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    driver.get(link)

    time.sleep(0.2)
    return driver

# function to check if table has changed (tells driver that table is ready to be scrapped)
def table_change(driver, before_value=None):
    # checks if table exist or not
    try:
        table = driver.find_element_by_id("//table[1]")
        # first_element = table.find_element_by_xpath("/tr/td").text
        print("Success" + "REA")
    except selenium.common.exceptions.NoSuchElementException:
        print("Failed")
        return False
        


driver = start(capes_link)

#check to see if duo popped up
try:
    # log into duo
    form = driver.find_element_by_css_selector('form[id=login]')
    btn = form.find_element_by_css_selector('button')
    account = form.find_element_by_css_selector('input[type=username]')
    password = form.find_element_by_css_selector('input[type=password]')
    print("To access capes evaluations, you need to log into a valid ucsd account")
    user_name = input("Please enter your username:")
    user_pwd = input("Please enter your password:")
    account.send_keys(user_name)
    password.send_keys(user_pwd)
    current_url = driver.current_url
    btn.click()
    wait(driver, 15).until(EC.url_changes(current_url))
    driver.switch_to.frame(driver.find_element_by_id('duo_iframe'))
    btn = driver.find_element_by_css_selector('button[type=submit]')
    current_url = driver.current_url
    btn.click()
    print("Check your phone for Duo\n")
    wait(driver, 60).until(EC.url_changes(current_url))
except selenium.common.exceptions.NoSuchElementException:
    # duo not needed, continue on to capes scraping
    print ("TEST")
    pass



# get all possible departments from dropdown
all_departments = []
department_dropdown = driver.find_element_by_id('ctl00_ContentPlaceHolder1_ddlDepartments')
selection = department_dropdown
selection = Select(selection)

for x in department_dropdown.find_elements_by_css_selector("*"):
    all_departments.append(x.get_attribute("value"))

all_departments.pop(0)
print(all_departments)

# get capes eval for all departments

all_evaluations = []

for department in all_departments:
    selection.select_by_value(department)
    # TODO try moving this outside for loop and remove timer
    wait(driver, 5).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_btnSubmit')))
    attempts = 0
    while (attempts < 4):
        try:
            search_btn = driver.find_element_by_id("ctl00_ContentPlaceHolder1_btnSubmit").click()
            break
        except selenium.common.exceptions.StaleElementReferenceException:
            attempts += 1
    search_btn = None
    print("Currently searching the " + selection.first_selected_option.text + " department")

    #try to get the table, if it does not exist that means we need to wait for it 
    try:
        # check when instructor changes after change in search
        prev_instructor = driver.find_element_by_xpath("//table[1]/tbody/tr/td").text
        print("Table found, need to wait until first row changes")
        wait(driver, 60).until(waittest(prev_instructor))
    except selenium.common.exceptions.NoSuchElementException:
        print("Table not found, need to wait until table is found")
        wait(driver, 60).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_gvCAPEs')))
    except selenium.common.exceptions.StaleElementReferenceException:
        print("Table taking a while to load, waiting for it to load")
        wait(driver, 60).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_gvCAPEs')))



    # get the current row for the new table
    wait(driver, 60).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_gvCAPEs')))
    attempts = 0
    while (attempts < 4):
        try:
            html = driver.find_element_by_id("ctl00_ContentPlaceHolder1_gvCAPEs").get_attribute('innerHTML')
            break
        except selenium.common.exceptions.StaleElementReferenceException:
            attempts += 1
    rows = html.split('<tr class=')[1:]
    
    count = 0
    search_start = 0
    for row in rows:
        # get the instructor
        instructor_start_index = row.find("<td>") + 4
        instructor_end_index = row.find("</td>")
        instructor = row[instructor_start_index : instructor_end_index].strip()
        search_start = instructor_end_index

        # get course
        course_start_index = row.find("_blank\">", search_start) + 8
        course_end_index = row.find("</a>", course_start_index) - 4
        course = row[course_start_index:course_end_index].strip()
        search_start = course_end_index

        # get quarter
        quarter_start_index = row.find("<td>", search_start) + 4
        quarter_end_index = row.find("</td>", quarter_start_index)
        quarter = row[quarter_start_index:quarter_end_index].strip()
        search_start = quarter_end_index

        # get recommend class
        recommend_class_start_index = row.find("RecommendCourse\">", search_start) + 17
        recommend_class_end_index = row.find("%</span>", recommend_class_start_index)
        recommend_class = row[recommend_class_start_index:recommend_class_end_index].strip()
        search_start = recommend_class_end_index

        # get recommend instructor
        recommend_instructor_start_index = row.find("RecommendInstructor\">", search_start) + 21
        recommend_instructor_end_index = row.find("%</span>", recommend_instructor_start_index)
        recommend_instructor = row[recommend_instructor_start_index:recommend_instructor_end_index].strip()
        search_start = recommend_instructor_end_index

        # get study hour
        hour_start_index = row.find("StudyHours\">", search_start) + 12
        hour_end_index = row.find("</span>", hour_start_index)
        study_hour = row[hour_start_index:hour_end_index].strip()
        search_start = hour_end_index

        # get expected grade
        expected_grade_start_index = row.find("GradeExpected\">", search_start) + 15
        expected_grade_end_index = row.find("</span>", expected_grade_start_index)
        expected_grade = row[expected_grade_start_index:expected_grade_end_index].strip()
        search_start = expected_grade_end_index

        # get grade received
        grade_received_start_index = row.find("GradeReceived\">", search_start) + 15
        grade_received_end_index = row.find("</span>", grade_received_start_index)
        grade_received = row[grade_received_start_index:grade_received_end_index].strip()
        search_start = grade_received_end_index


        # create a dictionary
        response = {}
        response['instructor'] = instructor
        response['course'] = course
        response['quarter'] = quarter
        response['recommend_class'] = recommend_class
        response['recommend_instructor'] = recommend_instructor
        response['study_hour'] = study_hour
        response['expected_grade'] = expected_grade
        response['grade_received'] = grade_received
        all_evaluations.append(response)

        count += 1
    print(count)

with open("capes_evaluation.json", "w", encoding='utf-8') as outfile:
        json.dump(all_evaluations, outfile, indent=1) 















# search_btn = driver.find_element_by_id("ctl00_ContentPlaceHolder1_btnSubmit")
# selection.select_by_value("CSE")
# print(selection.first_selected_option.text)
# search_btn.click()

# # try to get the table, if it does not exist that means we need to wait for it 
# try:
#     table = driver.find_element_by_xpath("//table[1]/tbody")
#     current_row = table.find_element_by_xpath(".//tr/td")
#     print("Table found, need to wait until first row changes")
#     # TODO wait until first row changes
# except selenium.common.exceptions.NoSuchElementException:
#     print("Table not found, need to wait until table is found")
#     wait(driver,10).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_gvCAPEs')))



# first_element = driver.find_element_by_xpath("//table[1]/tbody//tr/td")
# first_instructor = first_element.text
# first_element = None




# selection.select_by_value("CAT")
# print(selection.first_selected_option.text)
# time.sleep(1)
# search_btn = driver.find_element_by_id("ctl00_ContentPlaceHolder1_btnSubmit")
# search_btn.click()
# wait(driver, 10).until(waittest(first_instructor))
# print("new instructor")
# new_element = driver.find_element_by_xpath("//table[1]/tbody//tr/td").text
# print(new_element)

# get all evaluations department by department

# for department in all_departments:
#     department_dropdown.select_by_value("CSE")
#     search_btn.click()