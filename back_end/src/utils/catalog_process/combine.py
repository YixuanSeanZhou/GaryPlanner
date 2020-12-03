from .plan_generation import generate_four_year_plan as gfyp
from .plan_generation import load_catalog
from .degree_audit_parser import run_degree_audit_benson as rdab

from .takenCourse import getNeededCourse as gnc
from .takenCourse import sortTakenCourse as stc
from .takenCourse import combineCourse as cb
import json
import copy

def generate_benson_report():
    with open ('benson_da.json', 'r') as file:
        benson_info = json.load(file)
    taken, needed, numge = gnc(benson_info)
    taken_courses = taken.copy()
    class_dict = dict()
    load_catalog("/usr/src/app/src/utils/catalog_process/cse.json", class_dict)
    load_catalog("/usr/src/app/src/utils/catalog_process/math.json", class_dict)
    for i in range(100):
        code = 'GE '+str(i)
        class_dict[code] = {'code':code, 'formatted_pre':[]}
    taken_courses = {code: 0 for code in taken_courses}
    ret = gfyp(taken_courses, needed, class_dict, ['GE '+str(i) for i in range(numge)])
    print(type(ret))
    return ret

def final_output(taken, plan):
    quar, ta, _ = stc(taken)
    q2, d2 = cb(quar, ta, plan)
    return q2, d2

def obtain_json_file():
    rdab()

def get_taken(taken):
    q2, d2 = final_output(taken, [])
    return d2

def main():
    rdab()
    plan = generate_benson_report()
    with open('benson_taken.json', 'r') as file:
        taken = json.load(file)
    q2, d2 = final_output(taken, plan)
    print(d2)
    return d2


def extra(data, num):
    try:
        taken, needed, numge = gnc(data)
        numge = num
        taken_courses = taken.copy()
        class_dict = dict()
        load_catalog("/usr/src/app/src/utils/catalog_process/cse.json", class_dict)
        load_catalog("/usr/src/app/src/utils/catalog_process/math.json", class_dict)
        for i in range(100):
            code = 'GE '+str(i)
            class_dict[code] = {'code':code, 'formatted_pre':[]}
        taken_courses = {code: 0 for code in taken_courses}
        ret = gfyp(taken_courses, needed, class_dict, ['GE '+str(i) for i in range(numge)])
        print(type(ret))
        return ret
    except:
        print('here')


if __name__ == '__main__':
    main()
    
