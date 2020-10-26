#!/usr/bin/env python
# coding: utf-8

# In[1]:


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


# In[3]:


#open the first window
def start(link):
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get(link)
    driver_list = driver.window_handles

    time.sleep(0.2)
    return driver


# In[20]:


driver = start("https://act.ucsd.edu/studentDarsSelfservice/audit/read.html?printerFriendly=true&id=JobQueueRun!!!!ISEhIWludFNlcU5vPTU2MTg4OA=="")
btn = driver.find_element_by_id('socFacSubmit')
itm = driver.find_element_by_id('selectedSubjects')


# In[4]:


l = itm.find_elements_by_xpath("//option")


# In[5]:


l[55].click()


# In[6]:


btn.click()


# In[10]:


driver.find_element_by


# In[40]:


l_s = list(map(lambda x: x.text, l))


# In[38]:


len(l_s)


# In[39]:


print(l_s[])


# In[ ]:


# Login


# In[4]:


driver = start("https://act.ucsd.edu/studentDarsSelfservice/audit/read.html?printerFriendly=true")
user_name = 'yiz044'
pwd = '233Jiayi!'
form = driver.find_element_by_css_selector('form[id=login]')
btn = form.find_element_by_css_selector('button')
account = form.find_element_by_css_selector('input[type=username]')
password = form.find_element_by_css_selector('input[type=password]')
account.send_keys(user_name)
password.send_keys(pwd)
current_url = driver.current_url
current_url


# In[5]:


btn.click()
wait(driver, 15).until(EC.url_changes(current_url))
driver.current_url


# In[6]:


div = driver.find_elements_by_id('auth_methods')
#btn = div.find_element_by_css_selector('button[type=submit]')


# In[7]:


frame = driver.find_element_by_id('duo_iframe')


# In[8]:


driver.switch_to.frame(driver.find_element_by_id('duo_iframe'))


# In[9]:


btn = driver.find_element_by_css_selector('button[type=submit]')


# In[10]:


btn.click()


# In[11]:


ret = {}


# In[12]:


div_outer = driver.find_element_by_id('auditMenu')


# In[13]:


btn = div_outer.find_element_by_id('expandAll')


# In[14]:


btn.click()


# In[15]:


div_all = driver.find_element_by_id('auditRequirements')


# In[16]:


div_heads = div_all.find_elements_by_css_selector('div[class=reqHeaderTable]')
div_bodies = div_all.find_elements_by_css_selector('div[class=reqBody]')


# In[17]:


len(div_bodies)


# In[18]:


len(div_heads)


# In[19]:


div_heads[6].text
#div_bodies


# ### Div reqHeaderTable
# 
# - 0 --> GPA Requirements
# - 1 --> 180 points
# - 3 --> College info
# - 4 --> Major Requirement
# - 6 --> Major 1 Lower div Requirement

# In[20]:


div_bodies[6].text


# In[21]:


lower_div = div_bodies[6].text.split('\n')


# In[22]:


lower_div


# In[23]:


ret = []
for i in range(len(div_bodies)):
    if 'ERND/WIP' in div_bodies[i].text:
        ret.append((i, div_bodies[i].text))


# In[25]:


#ret[0][1].text


# In[26]:


ret[5][0]


# In[27]:


div_heads[11].text


# In[28]:


course_complete = {}
course_need = {}


# In[29]:


for i in range(len(ret)):
    text = ret[i][1].split('\n')
    for j in range(len(text)):
        if (('FA' in text[j] or 'SP' in text[j] or 'WI' in text[j] 
            or 'S1' in text[j] or 'S2' in text[j]) and 'WIP' not in text[j]):
            print(text[j])
            course_entry = text[j].split(' ')
            quarter = course_entry[0]
            course_name = course_entry[1:-2]
            course_name = ' '.join(course_name)
            credit = float(course_entry[-2])
            grade = course_entry[-1]
            if quarter not in course_complete:
                course_complete[quarter] = []
            course_complete[quarter].append({'name': course_name, 'credit': credit, 'grade': grade})
        


# In[30]:


course_complete


# In[31]:


need = {}
cat = ''
for i in range(len(ret)):
    text = ret[i][1].split('\n')
    for j in range(len(text)):
        if ')' in text[j]:
            cat = text[j+1]
            need[cat] = {}
        if 'NEED' in text[j]:
            need[cat]['NEED'] = {'num': float(text[j].split(' ')[1]), 'unit': text[j].split(' ')[2]}
        if 'COURSE' in text[j]:
            need[cat]['COURSE'] = text[j+1]
            


# In[32]:


need


# In[33]:


driver.close()


# In[ ]:




