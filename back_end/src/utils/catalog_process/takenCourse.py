from enum import Enum
import json
import math

takenCoures = [{"term": "FA18", "course": "CSE 11", "credit": "4.00", "grade": "A"}, {"term": "SP19", "course": "COGS 18", "credit": "4.00", "grade": "A+"}, {"term": "WI19", "course": "CSE 12", "credit": "4.00", "grade": "A+"}, {"term": "WI19", "course": "CSE 15L", "credit": "2.00", "grade": "A"}, {"term": "SP19", "course": "CSE 20", "credit": "4.00", "grade": "A"}, {"term": "FA19", "course": "CSE 21", "credit": "4.00", "grade": "A-"}, {"term": "FA19", "course": "CSE 30", "credit": "4.00", "grade": "A"}, {"term": "SP18", "course": "MATH 20A", "credit": "4.00", "grade": "TP"}, {"term": "SP18", "course": "MATH 20B", "credit": "4.00", "grade": "TP"}, {"term": "FA18", "course": "MATH 20C", "credit": "4.00", "grade": "A+"}, {"term": "WI19", "course": "MATH 18", "credit": "4.00", "grade": "A"}, {"term": "SP19", "course": "PHYS 2A", "credit": "4.00", "grade": "A"}, {"term": "FA19", "course": "PHYS 2B", "credit": "4.00", "grade": "A"}, {"term": "WI20", "course": "MATH183", "credit": "4.00", "grade": "A"}, {"term": "WI20", "course": "CSE 100", "credit": "4.00", "grade": "A+"}, {"term": "SP20", "course": "CSE 101", "credit": "4.00", "grade": "A-"}, {"term": "SP20", "course": "CSE 105", "credit": "4.00", "grade": "A"}, {"term": "FA20", "course": "CSE 110", "credit": "4.00", "grade": "WIP"}, {"term": "WI21", "course": "CSE 130", "credit": "4.00", "grade": "WIP"}, {"term": "FA20", "course": "CSE 140", "credit": "4.00", "grade": "WIP"}, {"term": "FA20", "course": "CSE 140L", "credit": "2.00", "grade": "WIP"}, {"term": "WI21", "course": "CSE 141", "credit": "4.00", "grade": "WIP"}, {"term": "WI21", "course": "CSE 141L", "credit": "2.00", "grade": "WIP"}, {"term": "SP20", "course": "CSE 151A", "credit": "4.00", "grade": "P"}, {"term": "WI19", "course": "WCWP 10A", "credit": "4.00", "grade": "B+"}, {"term": "SP19", "course": "WCWP 10B", "credit": "4.00", "grade": "A-"}, {"term": "FA19", "course": "PHIL 27", "credit": "4.00", "grade": "A-"}, {"term": "WI20", "course": "PHIL 28", "credit": "4.00", "grade": "B"}, {"term": "SP18", "course": "MATH 20A", "credit": "4.00", "grade": "TP"}, {"term": "SP18", "course": "MATH 20B", "credit": "4.00", "grade": "TP"}]


bensonInfo = {"major": ["CS26", "COMPUTER SCIENCE - BS"], "college": "WARREN", "req": {"Lower Division Requirements": {"Intro Computer Sci": {"taken": [{"term": "FA18", "course": "CSE 11", "credit": "4.00", "grade": "A"}], "needs": {}}, "CSE": {"taken": [{"term": "SP19", "course": "COGS 18", "credit": "4.00", "grade": "A+"}, {"term": "WI19", "course": "CSE 12", "credit": "4.00", "grade": "A+"}, {"term": "WI19", "course": "CSE 15L", "credit": "2.00", "grade": "A"}, {"term": "SP19", "course": "CSE 20", "credit": "4.00", "grade": "A"}, {"term": "FA19", "course": "CSE 21", "credit": "4.00", "grade": "A-"}, {"term": "FA19", "course": "CSE 30", "credit": "4.00", "grade": "A"}], "needs": {}}, "Mathematics": {"taken": [{"term": "SP18", "course": "MATH 20A", "credit": "4.00", "grade": "TP"}, {"term": "SP18", "course": "MATH 20B", "credit": "4.00", "grade": "TP"}, {"term": "FA18", "course": "MATH 20C", "credit": "4.00", "grade": "A+"}, {"term": "WI19", "course": "MATH 18", "credit": "4.00", "grade": "A"}], "needs": {}}, "General Science": {"taken": [{"term": "SP19", "course": "PHYS 2A", "credit": "4.00", "grade": "A"}, {"term": "FA19", "course": "PHYS 2B", "credit": "4.00", "grade": "A"}], "needs": {}}, "Statistics": {"taken": [{"term": "WI20", "course": "MATH183", "credit": "4.00", "grade": "A"}], "needs": {}}}, "Upper Division Major GPA": {}, "Upper Division Requirements": {"CSE": {"taken": [{"term": "WI20", "course": "CSE 100", "credit": "4.00", "grade": "A+"}, {"term": "SP20", "course": "CSE 101", "credit": "4.00", "grade": "A-"}, {"term": "SP20", "course": "CSE 105", "credit": "4.00", "grade": "A"}, {"term": "FA20", "course": "CSE 110", "credit": "4.00", "grade": "WIP"}, {"term": "WI21", "course": "CSE 130", "credit": "4.00", "grade": "WIP"}, {"term": "FA20", "course": "CSE 140", "credit": "4.00", "grade": "WIP"}, {"term": "FA20", "course": "CSE 140L", "credit": "2.00", "grade": "WIP"}, {"term": "WI21", "course": "CSE 141", "credit": "4.00", "grade": "WIP"}, {"term": "WI21", "course": "CSE 141L", "credit": "2.00", "grade": "WIP"}, {"term": "SP20", "course": "CSE 151A", "credit": "4.00", "grade": "P"}], "needs": {"Courses": 2}, "course_needs": [["CSE 120", "CSE 123", "CSE 124"],["CSE 107", "CSE 127"]]}, "Electives": {"taken": [], "needs": {"Courses": 5}, "course_needs": ["CSE 100", "CSE 101", "CSE 102", "CSE 103", "CSE 104", "CSE 105", "CSE 106", "CSE 107", "CSE 108", "CSE 109", "CSE 110", "CSE 111", "CSE 112", "CSE 113", "CSE 114", "CSE 115", "CSE 116", "CSE 117", "CSE 118", "CSE 119", "CSE 120", "CSE 121", "CSE 122", "CSE 123", "CSE 124", "CSE 125", "CSE 126", "CSE 127", "CSE 128", "CSE 129", "CSE 130", "CSE 131", "CSE 132", "CSE 133", "CSE 134", "CSE 135", "CSE 136", "CSE 137", "CSE 138", "CSE 139", "CSE 140", "CSE 141", "CSE 142", "CSE 143", "CSE 144", "CSE 145", "CSE 146", "CSE 147", "CSE 148", "CSE 149", "CSE 150", "CSE 151", "CSE 152", "CSE 153", "CSE 154", "CSE 155", "CSE 156", "CSE 157", "CSE 158", "CSE 159", "CSE 160", "CSE 161", "CSE 162", "CSE 163", "CSE 164", "CSE 165", "CSE 166", "CSE 167", "CSE 168", "CSE 169", "CSE 170", "CSE 171", "CSE 172", "CSE 173", "CSE 174", "CSE 175", "CSE 176", "CSE 177", "CSE 178", "CSE 179", "CSE 180", "CSE 181", "CSE 182", "CSE 183", "CSE 184", "CSE 185", "CSE 186", "CSE 187", "CSE 188", "CSE 189", "CSE 190", "CSE 193", "CSE 194", "CSE 197", "CSE 198", "CSE 199", "COGS 121", "COGS 187A", "COGS 188", "COGS 319"]}, "Technical Elective": {"taken": [], "needs": {"Courses": 2}, "course_needs": ["CSE 100", "CSE 101", "CSE 102", "CSE 103", "CSE 104", "CSE 105", "CSE 106", "CSE 107", "CSE 108", "CSE 109", "CSE 110", "CSE 111", "CSE 112", "CSE 113", "CSE 114", "CSE 115", "CSE 116", "CSE 117", "CSE 118", "CSE 119", "CSE 120", "CSE 121", "CSE 122", "CSE 123", "CSE 124", "CSE 125", "CSE 126", "CSE 127", "CSE 128", "CSE 129", "CSE 130", "CSE 131", "CSE 132", "CSE 133", "CSE 134", "CSE 135", "CSE 136", "CSE 137", "CSE 138", "CSE 139", "CSE 140", "CSE 141", "CSE 142", "CSE 143", "CSE 144", "CSE 145", "CSE 146", "CSE 147", "CSE 148", "CSE 149", "CSE 150", "CSE 151", "CSE 152", "CSE 153", "CSE 154", "CSE 155", "CSE 156", "CSE 157", "CSE 158", "CSE 159", "CSE 160", "CSE 161", "CSE 162", "CSE 163", "CSE 164", "CSE 165", "CSE 166", "CSE 167", "CSE 168", "CSE 169", "CSE 170", "CSE 171", "CSE 172", "CSE 173", "CSE 174", "CSE 175", "CSE 176", "CSE 177", "CSE 178", "CSE 179", "CSE 180", "CSE 181", "CSE 182", "CSE 183", "CSE 184", "CSE 185", "CSE 186", "CSE 187", "CSE 188", "CSE 189", "CSE 190", "CSE 191", "CSE 192", "CSE 193", "CSE 194", "CSE 197", "CSE 198", "CSE 199", "COGS 188", "MGT 103", "MGT 110", "MGT 121A", "MGT 164", "MGT 166", "MGT 172", "MGT 174", "MGT 181", "COGS 101A", "COGS 101B", "COGS 101C", "COGS 102A", "COGS 102B", "COGS 102C", "COGS 107A", "COGS 107B", "COGS 107C", "COGS 108A", "COGS 108B", "COGS 108C", "COGS 108D", "COGS 108E", "COGS 108F", "COGS 109", "COGS 118A", "COGS 118B", "COGS 120", "COGS 121", "COGS 130", "COGS 131", "COGS 132", "COGS 141", "COGS 150", "COGS 153", "COGS 170", "COGS 180", "COGS 181", "COGS 182", "COGS 185", "COGS 187A", "COGS 187B", "COGS 188", "ECE 100", "ECE 101", "ECE 102", "ECE 103", "ECE 104", "ECE 105", "ECE 106", "ECE 107", "ECE 108", "ECE 109", "ECE 110", "ECE 111", "ECE 112", "ECE 113", "ECE 114", "ECE 115", "ECE 116", "ECE 117", "ECE 118", "ECE 119", "ECE 120", "ECE 121", "ECE 122", "ECE 123", "ECE 124", "ECE 125", "ECE 126", "ECE 127", "ECE 128", "ECE 129", "ECE 130", "ECE 131", "ECE 132", "ECE 133", "ECE 134", "ECE 135", "ECE 136", "ECE 137", "ECE 138", "ECE 139", "ECE 140", "ECE 141", "ECE 142", "ECE 143", "ECE 144", "ECE 145", "ECE 146", "ECE 147", "ECE 148", "ECE 149", "ECE 150", "ECE 151", "ECE 152", "ECE 153", "ECE 154", "ECE 155", "ECE 156", "ECE 157", "ECE 158", "ECE 159", "ECE 160", "ECE 161", "ECE 162", "ECE 163", "ECE 164", "ECE 165", "ECE 166", "ECE 167", "ECE 168", "ECE 169", "ECE 170", "ECE 171", "ECE 172", "ECE 173", "ECE 174", "ECE 175", "ECE 176", "ECE 177", "ECE 178", "ECE 179", "ECE 180", "ECE 181", "ECE 182", "ECE 183", "ECE 184", "ECE 185", "ECE 186", "ECE 187", "ECE 188", "ECE 189", "ECE 190", "ECE 191", "ECE 192", "ECE 193", "ECE 194", "ECON 100A", "ECON 100B", "ECON 109", "ECON 110A", "ECON 110B", "ECON 113", "ECON 120B", "ECON 120C", "ECON 121", "ECON 170A", "ECON 170B", "ECON 171", "ECON 172A", "ECON 172B", "ECON 172C", "ECON 178", "LIGN 110", "LIGN 111", "LIGN 115", "LIGN 120", "LIGN 121", "LIGN 125", "LIGN 130", "LIGN 160", "LIGN 163", "LIGN 165", "LIGN 170", "LIGN 172", "LIGN 175", "MAE 100", "MAE 101", "MAE 102", "MAE 103", "MAE 104", "MAE 105", "MAE 106", "MAE 107", "MAE 108", "MAE 109", "MAE 110", "MAE 111", "MAE 112", "MAE 113", "MAE 114", "MAE 115", "MAE 116", "MAE 117", "MAE 118", "MAE 119", "MAE 120", "MAE 121", "MAE 122", "MAE 123", "MAE 124", "MAE 125", "MAE 126", "MAE 127", "MAE 128", "MAE 129", "MAE 130", "MAE 131", "MAE 132", "MAE 133", "MAE 134", "MAE 135", "MAE 136", "MAE 137", "MAE 138", "MAE 139", "MAE 140", "MAE 141", "MAE 142", "MAE 143", "MAE 144", "MAE 145", "MAE 146", "MAE 147", "MAE 148", "MAE 149", "MAE 150", "MAE 151", "MAE 152", "MAE 153", "MAE 154", "MAE 155", "MAE 156", "MAE 157", "MAE 158", "MAE 159", "MAE 160", "MAE 161", "MAE 162", "MAE 163", "MAE 164", "MAE 165", "MAE 166", "MAE 167", "MAE 168", "MAE 169", "MAE 170", "MAE 171", "MAE 172", "MAE 173", "MAE 174", "MAE 175", "MAE 176", "MAE 177", "MAE 178", "MAE 179", "MAE 180", "MAE 181", "MAE 182", "MAE 183", "MAE 184", "MAE 185", "MAE 186", "MAE 187", "MAE 188", "MAE 189", "MAE 190", "MAE 191", "MAE 192", "MAE 193", "MAE 194", "MATH 100", "MATH 101", "MATH 102", "MATH 103", "MATH 104", "MATH 105", "MATH 106", "MATH 107", "MATH 108", "MATH 109", "MATH 110", "MATH 111", "MATH 112", "MATH 113", "MATH 114", "MATH 115", "MATH 116", "MATH 117", "MATH 118", "MATH 119", "MATH 120", "MATH 121", "MATH 122", "MATH 123", "MATH 124", "MATH 125", "MATH 126", "MATH 127", "MATH 128", "MATH 129", "MATH 130", "MATH 131", "MATH 132", "MATH 133", "MATH 134", "MATH 135", "MATH 136", "MATH 137", "MATH 138", "MATH 139", "MATH 140", "MATH 141", "MATH 142", "MATH 143", "MATH 144", "MATH 145", "MATH 146", "MATH 147", "MATH 148", "MATH 149", "MATH 150", "MATH 151", "MATH 152", "MATH 153", "MATH 154", "MATH 155", "MATH 156", "MATH 157", "MATH 158", "MATH 159", "MATH 160", "MATH 161", "MATH 162", "MATH 163", "MATH 164", "MATH 165", "MATH 166", "MATH 167", "MATH 168", "MATH 169", "MATH 170", "MATH 171", "MATH 172", "MATH 173", "MATH 174", "MATH 175", "MATH 176", "MATH 177", "MATH 178", "MATH 179", "MATH 180", "MATH 181", "MATH 182", "MATH 183", "MATH 184", "MATH 185", "MATH 186", "MATH 187", "MATH 188", "MATH 189", "MATH 190", "MATH 191", "MATH 192", "MATH 193", "MATH 194", "MUS 171", "MUS 172", "MUS 173", "PSYC 161", "COMM 105G", "COCU 177", "ECON 120A", "PHYS 105"]}}, "Warren Core GE": {"Warren Writing A": {"taken": [{"term": "WI19", "course": "WCWP 10A", "credit": "4.00", "grade": "B+"}], "needs": {}}, "Warren Writing B": {"taken": [{"term": "SP19", "course": "WCWP 10B", "credit": "4.00", "grade": "A-"}], "needs": {}}, "Ethics and Society": {"taken": [{"term": "FA19", "course": "PHIL 27", "credit": "4.00", "grade": "A-"}, {"term": "WI20", "course": "PHIL 28", "credit": "4.00", "grade": "B"}], "needs": {}}, "Formal Skills": {"taken": [{"term": "SP18", "course": "MATH 20A", "credit": "4.00", "grade": "TP"}, {"term": "SP18", "course": "MATH 20B", "credit": "4.00", "grade": "TP"}], "needs": {}}}}}

# start = "FA18"

class Quarter(Enum):
    FA = 2
    WI = 0
    SP = 1


# quarters: list of passed quarters (sorted) from the start to the current; can be the first return value of sortTakenCourse
# taken: taken courses in dict form; can be the second return value of sortTakenCourse
# planed: 2d list of planed courses. 
# first return: list of sorted quarters from the start to the very end (not current)
# second return: taken and planned courses in dict form. Should rander the 4-year-plan using this
def combineCourse(quarters, taken, planed):
    combined = dict(taken)
    length = len(planed)
    planed = iter(planed)
    quarters = list(quarters)
    currQ = quarters[-1]
    currNum = int(currQ[2:])*3+Quarter[currQ[:2]].value
    for num in range(currNum+1, currNum+length+1):
        quar = getQuarterName(num)
        combined[quar] = next(planed)
        quarters.append(quar)
    return quarters, combined


# returns: first: a sorted list of quarters e.g. ['SP18', 'FA18', 'WI19', 'SP19', 'FA19', 'WI20', 'SP20', 'FA20', 'WI21']
# second: dict of courses where key is the quarter name and value is the list of courses taken that quarter
# third: a list of all taken courses
def sortTakenCourse(courses, start = "FA18"):
    sortedCourse = {}
    takeCourses = []
    
    for course in courses:
        term = course["term"]
        if term not in sortedCourse:
            sortedCourse[term] = []
        sortedCourse[term].append(course["course"])
        takeCourses.append(course["course"])
    
    newCourse = {}
    for key in sortedCourse:
        if getQuarterValue(key) >= getQuarterValue(start):
            newCourse[key] = sortedCourse[key]
    return sorted(newCourse.keys(), key=getQuarterValue), newCourse, takeCourses

def getQuarterValue(quarter):
    return int(quarter[2:])*3+Quarter[quarter[:2]].value

def getQuarterName(quarter):
    return Quarter(quarter%3).name + str(quarter//3)


# userInfo is bensonInfo above
# first return: list of taken courses
# second return: list of planed courses
# third return: number of ge needed
def getNeededCourse(userInfo):
    userInfo = userInfo["req"]
    ge = 0
    neededList = []
    _,_,takenList = sortTakenCourse(takenCoures)
    ge = rec(userInfo, neededList, takenList)
    return takenList,neededList, ge

def rec(dic, rtnList, takenList):
    ge = 0
    for key in dic:
        d1 = dic[key]
        if "GE" in key:
            ge += checkGE(dic, key, json.load(open("/usr/src/app/src/utils/catalog_process/Warren.json"))) # warren college json file
        elif "needs" in d1.keys():
            if "Elective" in key:
                potentialCourses = process("/usr/src/app/src/utils/catalog_process/cse.json", d1["course_needs"]) 
                num = d1["needs"]["Courses"]
                cour = iter(potentialCourses)
                while num > 0:
                    curCour = next(cour)
                    if curCour not in takenList and curCour not in rtnList:
                        num -= 1
                        rtnList.append(curCour)
            else:
                if "course_needs" in d1.keys():
                    for cours in d1["course_needs"]:
                        rtnList.append(cours[0])
        else:
            ge += rec(d1, rtnList, takenList)
    return ge


def process(file_name, sample):
    with open(file_name, 'r') as file:
        o = json.load(file)
    codes = []
    for entry in o:
        codes.append(entry['code'])
    i = 0
    while i < len(sample):
        if sample[i] not in codes:
            sample.pop(i)
            continue
        i += 1
    return sample

def checkGE(user,key,college): # for Warren
    ge = 0
    if "Warren Core GE" == key: # hard coding for Warren
        d1 = user[key]
        for subKey in d1.keys():
            d2 = d1[subKey]
            if "needs" in d2 and "Units" in d2["needs"]:
                courses = math.ceil(d2["needs"]["Units"] / 4)
                ge += courses
    else:
        d2 = user[key]
        if "AREA STUDY" in key:
            for clgKey in college["AREA STUDY"].keys():
                if clgKey in key:
                    clgDic = college["AREA STUDY"][clgKey]
                    needs = d2["needs"]
                    if "Units" in needs:
                        courses = math.ceil(needs["Units"] / 4)
                        ge += courses
    return ge


if __name__ == '__main__':
    planned = [['CSE 131', 'CSE 120', 'CSE 107', 'GE 0'], ['CSE 103', 'CSE 106', 'CSE 112', 'GE 1'], ['CSE 113', 'CSE 118', 'CSE 123', 'GE 2'], ['CSE 124', 'GE 3', 'GE 4', 'GE 5']]
    quar, ta, _ = sortTakenCourse(takenCoures)
    # print(quar)
    # print(combineCourse(quar, ta, planned))
    q2,d2 = combineCourse(quar, ta, planned)
    # print(quar)
    for q in q2:
        print(d2[q])