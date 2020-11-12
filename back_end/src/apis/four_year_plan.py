'''
@author: David Song
'''
from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..models.four_year_plan import FourYearPlan

four_year_plan_api_bp = Blueprint('four_year_plan_api', __name__)
CORS(four_year_plan_api_bp, supports_credentials=True)


@four_year_plan_api_bp.route('/create_entry', methods=['POST'])
def create_entry():
    req_data = request.get_json()
    user_id = req_data.get('user_id')
    # user_id = current_user.id
    class_id = req_data.get('class_id')
    class_schedule_id = req_data.get('class_schedule_id')
    quarter_taken = req_data.get('quarter_taken')
    grade = req_data.get('grade')
    locked = req_data.get('locked')
    s, u = FourYearPlan.create_entry(
            user_id=user_id, class_id=class_id,
            class_schedule_id=class_schedule_id,
            quarter_taken=quarter_taken, grade=grade, locked=locked)
    if s:
        return jsonify({'reason': 'entry created', 'result': u.to_json()}), 200
    else:
        return jsonify({'reason': 'duplicate entry'}), 300


@four_year_plan_api_bp.route('/get_entries', methods=['GET'])
def get_entries():
    all_entries = FourYearPlan.get_entries()
    all_entries = list(map(lambda x: x.to_json(), all_entries))
    return jsonify({'reason': 'success', 'result': all_entries}), 200


@four_year_plan_api_bp.route('/get_plan_by_user', methods=['GET'])
@login_required
def get_plan_by_user():
    # Do we use current user or parameterize the function?
    user_id = current_user.id
    plan = FourYearPlan.get_plan_by_user(user_id=user_id)
    plan = list(map(lambda x: x.to_json(), plan))
    return jsonify({'reason': 'success', 'result': plan}), 200


@four_year_plan_api_bp.route('/get_locked_entries_by_user', methods=['GET'])
@login_required
def get_locked_entries_by_user():
    # Do we use current user or parameterize the function?
    user_id = current_user.id
    plan = FourYearPlan.get_locked_entries_by_user(user_id=user_id)
    plan = list(map(lambda x: x.to_json(), plan))
    return jsonify({'reason': 'success', 'result': plan}), 200


@four_year_plan_api_bp.route('/get_entry_by_id', methods=['GET'])
def get_entry_by_id():
    plan_id = request.args.get('plan_id')
    entry = FourYearPlan.get_entry_by_id(plan_id=plan_id)
    return jsonify({'reason': 'success', 'result': entry.to_json()}), 200


@four_year_plan_api_bp.route('/get_unique_entry', methods=['GET'])
def get_unique_entry():
    user_id = current_user.id
    class_id = request.args.get('class_id')
    quarter_taken = request.args.get('quarter_taken')
    entry = FourYearPlan.get_unique_entry(user_id=user_id, class_id=class_id,
                                          quarter_taken=quarter_taken)
    return jsonify({'reason': 'succsess', 'result': entry.to_json()}), 200


@four_year_plan_api_bp.route('/update_entry', methods=['POST'])
@login_required
def update_entry():
    req_data = request.get_json()
    # user_id = req_data.get('user_id', None)
    user_id = current_user.id
    class_id = req_data.get('class_id', None)
    class_schedule_id = req_data.get('class_schedule_id', None)
    quarter_taken = req_data.get('quarter_taken', None)
    grade = req_data.get('grade', None)
    locked = req_data.get('locked', None)

    s, p = FourYearPlan.update_entry(user_id=user_id, class_id=class_id,
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
    class_id = req_data.get('class_id')
    quarter_taken = req_data.get('quarter_taken')
    FourYearPlan.remove_entry(id=id, user_id=user_id, class_id=class_id,
                              quarter_taken=quarter_taken)
