import json
import copy
import numpy as np
from .takenCourse import takenCoures as tC

flatten = lambda t: [item for sublist in t for item in sublist]

def load_catalog(catalog_addr, dic):
    with open(catalog_addr) as infile:
        tmp_dic = json.loads(infile.read())
    for c in tmp_dic:
        dic[c['code']] = c


def get_data_from_json(json_file_addr):
    with open(json_file_addr) as infile:
        raw = json.loads(infile.read())
    return raw[0], raw[1:]


def least_courses(node, completed, class_dict, to_take=[], layer=0):
    if layer > 20:
        return {}
    if node in completed:
        return {}
    if node not in class_dict:
        return {i:0 for i in range(99)}
    
    prereqs = class_dict[node]["formatted_pre"]
    res = {node:prereqs}

    if len(prereqs) == 0:
        return res
    
    for it in prereqs:
        if type(it) == list:
            # check if any of the options is in the required courses
            flag = False
            for op in it:
                if op in to_take:
                    res.update(least_courses(op, completed, class_dict, to_take, layer+1))
                    flag = True
                    break
            if not flag:
                candidate = [{**least_courses(i, completed, class_dict, to_take, layer+1), **res} for i in it]
                candidate.sort(reverse=False, key=lambda d:len(d))
                res = candidate[0]

        else:
            res.update(least_courses(it, completed, class_dict, to_take, layer+1))

    return res


def generate_four_year_plan(completed_courses, to_take_courses, class_dict, ge_courses):
    plan = []
    completed = completed_courses.copy()
    to_take = to_take_courses.copy()
    ge = ge_courses.copy()
    while len(to_take) > 0:
        # compute the uncompleted prereq for courses in to_take
        prereqs = [least_courses(course, completed, class_dict, to_take_courses, 0) for course in to_take]
        # compute the number of dependencies
        depend = [0] * len(to_take)
        for i, course in enumerate(to_take):
            for preq in prereqs:
                if course in preq:
                    depend[i] += 1
        
        sort_list = [(prereqs[i], depend[i], to_take[i]) for i in range(len(to_take))]
        # Sort. len of prereqs acsending order. Tie: dependency descending order.
        sort_list.sort(reverse=True, key=lambda x:x[1])
        sort_list.sort(reverse=True, key=lambda x:len(x[0]))

        if len(ge) > 0:
            # take 3 major course and 1 ge
            num_courses = 3
        else:
            # take 4 major courses
            num_courses = 4

        quarter = []
        for cand in sort_list:
            if len(quarter) >= num_courses:
                break
            # no uncompleted prereqs
            if len(cand[0]) <= 1 and cand[2] not in quarter:
                quarter.append(cand[2])
                continue

            # take prereqs for this courses
            for preq in cand[0]:
                if len(least_courses(preq, completed, class_dict, to_take_courses, 0)) <= 1:
                    if preq not in quarter:
                        quarter.append(preq)
                if len(quarter) >= num_courses:
                    break
        
        if len(quarter) == 0:
            print("something wrong happens")
            print(plan)
            print(to_take)
            print(sort_list)
            return plam
        while len(quarter) < 4 and len(ge) > 0:
            quarter.append(ge.pop(0))
        for course in quarter:
            if course in to_take:
                to_take.remove(course)
            completed[course] = 0

        if len(to_take) == 0 and len(ge) > 0:
            to_take = ge
            ge = []
        
        plan.append(quarter)
    
    return plan


if __name__ == '__main__':
    # setup class dict
    class_dict = dict()
    load_catalog("./cse.json", class_dict)
    load_catalog("./math.json", class_dict)
    for i in range(100):
        code = 'GE '+str(i)
        class_dict[code] = {'code':code, 'formatted_pre':[]}
    
    # get needed course
    completed_courses, needed_courses, num_GE = tC.getNeededCourse(tC.bensonInfo)
    completed_courses = {code:0 for code in completed_courses}
    print(generate_four_year_plan(completed_courses, needed_courses, 
            class_dict, ['GE '+str(i) for i in range(6)]))
