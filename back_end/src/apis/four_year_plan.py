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
import pytz

from ..models.four_year_plan import FourYearPlan

four_year_plan_api_bp = Blueprint('four_year_plan_api', __name__)
CORS(four_year_plan_api_bp, supports_credentials=True)


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
    print(current_quarter)
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
    # populating quarters
    # TODO get start year from user
    start_year = 2018
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
    plan = FourYearPlan.get_plan_by_user(user_id=user_id)
    plan = list(map(lambda x: x.to_json(), plan))
    return jsonify({'reason': 'success', 'result': plan}), 200


@four_year_plan_api_bp.route('/get_formatted_plan_by_user', methods=['GET'])
@login_required
def get_formatted_plan_by_user():
    user_id = current_user.id
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

    s, p = FourYearPlan.update_entry(id=id, user_id=user_id, class_code=class_code,
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

