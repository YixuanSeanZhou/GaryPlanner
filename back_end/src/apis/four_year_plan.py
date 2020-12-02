'''
@author: 
David Song
Benson Vuong
'''
from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from datetime import datetime
from pytz import timezone

from ..utils.catalog_process.combine import main as get_recommendation
from ..models.four_year_plan import FourYearPlan

import re

four_year_plan_api_bp = Blueprint('four_year_plan_api', __name__)
CORS(four_year_plan_api_bp, supports_credentials=True)


test_username = "gg"

# helper functions to format return values
def get_current_quarter():
    today = datetime.now(timezone("US/Pacific"))
    month = today.strftime("%m")
    day = today.strftime("%d")
    year = today.strftime("%y")

    current_quarter = ""
    if month == "1" or month == "2":
        current_quarter += "WI"
    elif month == "4" or month == "5":
        current_quarter += "SP"
    elif month == "7":
        current_quarter += "S1"
    elif month == "8":
        current_quarter += "S2"
    elif month == "10" or month == "11" or month == "12":
        current_quarter += "FA"
    elif month == "3":
        if day <= "23":
            current_quarter += "WI"
        else:
            current_quarter += "SP"
    elif month == "6":
        if day <= "20":
            current_quarter += "SP"
        else:
            current_quarter += "S1"
    elif month == "9":
        if day <= "14":
            current_quarter += "S2"
        else:
            current_quarter += "FA"
    current_quarter += year
    return current_quarter


def convertResultsto4YearPlan(results):
    response = {
        "courses": {},
        "quarters": {},
        "user_id": current_user.id,  # results["result"][0]['user_id'],
        "current_quarter": get_current_quarter()
    }
    # populating courses dictionary
    for class_in_plan in results["result"]:
        # create the unique course-id
        course_id = class_in_plan['id']
        class_code = class_in_plan['class_code']
        locked = class_in_plan['locked']
        string_id = "course-" + str(course_id)

        # add the course into the courses key in response
        response['courses'][string_id] = {
            "id": string_id,
            "content": class_code,
            "locked": locked
        }

    # getting user start year
    user_start_quarter = current_user.start_quarter
    if user_start_quarter == "None":
        start_year = int("20" + str(int(current_user.intended_grad_quarter[-2:]) - 4))
    else:
        start_year = int("20" + str(current_user.start_quarter[-2:]))
    quarter_array = generate_quarter_names(start_year)

    # loops through all the quarters in the student's plan
    for quarter in quarter_array:
        title = "Fall"
        if quarter.find("SP") != -1:
            title = "Spring"
        elif quarter.find("WI") != -1:
            title = "Winter"
        elif quarter.find("FA") != -1:
            title = "Fall"

        # gets all the courses in the plan that matches this quarter
        courses_for_quarter = []
        for course in results["result"]:
            course_id = course['id']
            if course["quarter_taken"] == quarter:
                courses_for_quarter.append("course-"+str(course_id))

        # create the dictionary for that quarter
        quarter_dictionary = {
            "id": quarter,
            "title": title,
            "courseIds": courses_for_quarter
        }
        response['quarters'][quarter] = quarter_dictionary

    # print(response)
    return response


# generates an array of all the quarter's name the person will have
def generate_quarter_names(start_year):

    year = [0] * 5

    for i in range(0, 5):
        year[i] = start_year + i

    quarter_names = []
    quarter_names.append("FA" + str(year[0])[2:4])

    for i in range(1, 4):
        quarter_names.append("WI" + str(year[i])[2:4])
        quarter_names.append("SP" + str(year[i])[2:4])
        quarter_names.append("FA" + str(year[i])[2:4])

    quarter_names.append("WI" + str(year[4])[2:4])
    quarter_names.append("SP" + str(year[4])[2:4])

    return quarter_names


#helper function to add all courses in 4yp recommendation to database
def add_recommendation_to_db(user_id:int):
    plan = get_recommendation()
    entries = []
    #loops through each quarter
    for quarter, courses in plan.items():
        #loops through each cours in a quarter
        for course in courses:
            #checks to make sure there is a space in course code
            if course.find(" ") == -1:
                index_of_number = re.search(r"\d", course).start()
                course = course[:index_of_number] + " " + course[index_of_number:]
            entry = {
                "user_id" : user_id,
                "class_code" : course,
                "quarter_taken" : quarter,
            }
            entries.append(entry)
    return entries

@four_year_plan_api_bp.route('/create_entry', methods=['POST'])
@login_required
def create_entry():
    req_data = request.get_json()
    user_id = req_data.get('user_id')
    class_code = req_data.get('class_code')
    class_schedule_id = req_data.get('class_schedule_id')
    quarter_taken = req_data.get('quarter_taken')  # FA20
    grade = req_data.get('grade')
    locked = req_data.get('locked')
    s, u = FourYearPlan.create_entry(
            user_id=user_id, class_code=class_code,
            class_schedule_id=class_schedule_id,
            quarter_taken=quarter_taken, grade=grade, locked=locked)
    if s:
        return jsonify({'reason': 'entry created', 'result': u.to_json()}), 200
    else:
        return jsonify({'reason': 'duplicate entry'}), 300

@four_year_plan_api_bp.route('/generate_plan', methods=['POST'])
@login_required
def generate_plan():
    if current_user.user_name == test_username:
        result = add_recommendation_to_db(current_user.id)
        for entry in result:
            user_id = entry['user_id']
            class_code = entry['class_code']
            quarter_taken = entry['quarter_taken']
            s, u = FourYearPlan.create_entry(
                    user_id=user_id, class_code=class_code,
                    quarter_taken=quarter_taken
                )
        return {"reason":"added recommendation to db", "result": result}, 200
    else:
        return {"reason": "Could not create a recommendation"}, 300

@four_year_plan_api_bp.route('/get_entries', methods=['GET'])
@login_required
def get_entries():
    all_entries = FourYearPlan.get_entries()
    all_entries = list(map(lambda x: x.to_json(), all_entries))
    return jsonify({'reason': 'success', 'result': all_entries}), 200


@four_year_plan_api_bp.route('/get_plan_by_user', methods=['GET'])
@login_required
def get_plan_by_user():
    user_id = current_user.id
    if request.args.get('user_id'):
        user_id = request.args.get('user_id')
    plan = FourYearPlan.get_plan_by_user(user_id=user_id)
    plan = list(map(lambda x: x.to_json(), plan))
    return jsonify({'reason': 'success', 'result': plan}), 200


@four_year_plan_api_bp.route('/get_formatted_plan_by_user', methods=['GET'])
@login_required
def get_formatted_plan_by_user():
    user_id = current_user.id
    if request.args.get('user_id'):
        user_id = request.args.get('user_id')
    plan = FourYearPlan.get_plan_by_user(user_id=user_id)
    plan = list(map(lambda x: x.to_json(), plan))
    # Now we call helper function
    formatted_plan = convertResultsto4YearPlan(
            {'reason': 'success', 'result': plan})
    return jsonify(formatted_plan), 200


@four_year_plan_api_bp.route('/get_locked_entries_by_user', methods=['GET'])
@login_required
def get_locked_entries_by_user():
    user_id = current_user.id
    plan = FourYearPlan.get_locked_entries_by_user(user_id=user_id)
    plan = list(map(lambda x: x.to_json(), plan))
    return jsonify({'reason': 'success', 'result': plan}), 200


@four_year_plan_api_bp.route('/get_entry_by_id', methods=['GET'])
@login_required
def get_entry_by_id():
    plan_id = request.args.get('plan_id')
    entry = FourYearPlan.get_entry_by_id(plan_id=plan_id)
    return jsonify({'reason': 'success', 'result': entry.to_json()}), 200


@four_year_plan_api_bp.route('/get_unique_entry', methods=['GET'])
@login_required
def get_unique_entry():
    user_id = current_user.id
    class_code = request.args.get('class_code')
    quarter_taken = request.args.get('quarter_taken')
    entry = FourYearPlan.get_unique_entry(user_id=user_id,
                                          class_code=class_code,
                                          quarter_taken=quarter_taken)
    return jsonify({'reason': 'succsess', 'result': entry.to_json()}), 200


@four_year_plan_api_bp.route('/update_entry', methods=['POST'])
@login_required
def update_entry():
    req_data = request.get_json()
    id = req_data.get('id')
    user_id = current_user.id
    class_code = req_data.get('class_code', None)
    class_schedule_id = req_data.get('class_schedule_id', None)
    quarter_taken = req_data.get('quarter_taken', None)
    grade = req_data.get('grade', None)
    locked = req_data.get('locked', None)

    s, p = FourYearPlan.update_entry(id=id, user_id=user_id, 
                                     class_code=class_code,
                                     class_schedule_id=class_schedule_id,
                                     quarter_taken=quarter_taken, grade=grade,
                                     locked=locked)
    p = p.to_json()
    if s:
        return jsonify({'reason': 'success', 'result': p}), 200
    else:
        return jsonify({'reason': 'failed', 'result': p}), 300


@four_year_plan_api_bp.route('/remove_entry', methods=['POST'])
@login_required
def remove_entry():
    req_data = request.get_json()
    id = req_data.get('id')
    user_id = req_data.get('user_id')
    class_code = req_data.get('class_code')
    quarter_taken = req_data.get('quarter_taken')
    s = FourYearPlan.remove_entry(id=id, user_id=user_id,
                                  class_code=class_code,
                                  quarter_taken=quarter_taken)
    if s:
        return jsonify({'reason': 'success'}), 200
    else:
        return jsonify({'reason': 'failed'}), 300

