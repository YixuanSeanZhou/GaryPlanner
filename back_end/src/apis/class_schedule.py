from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.class_schedule import ClassSchedule

class_schedule_api_bp = Blueprint('class_schedule_api', __name__)
CORS(class_schedule_api_bp, supports_credentials=True)


@class_schedule_api_bp.route('/create_class', methods=['POST'])
def create_class():
    '''
    Route to create and add a class into class schedule
    @author: JingL
    '''
    req_data = request.get_json()
    ci = req_data.get('class_id')
    qo = req_data.get('quarter_offered')
    sc = req_data.get('section_code')
    format = req_data.get('format')
    st = req_data.get('start_time')
    et = req_data.get('end_time')
    days = req_data.get('days')
    instructor = req_data.get('instructor')

    created = ClassSchedule.create_class(class_id=ci,
                                         quarter_offered=qo,
                                         section_code=sc,
                                         format=format,
                                         start_time=st,
                                         end_time=et,
                                         days=days,
                                         instructor=instructor)

    if created:
        return jsonify({'reason': 'class created'}), 200
    else:
        return jsonify({'reason': 'class exists'}), 300


@class_schedule_api_bp.route('/get_class_schedule', methods=['GET'])
def get_class_schedule():
    class_schedules = ClassSchedule.get_class_schedules()
    class_schedules = list(map(lambda x: x.to_json(), class_schedules))
    return jsonify({'reason': 'success', 'result': class_schedules}), 200


@class_schedule_api_bp.route('/get_class', methods=['GET'])
def get_class():
    if request.args:
        arguments = request.args
        id = arguments.get('id', None)

        class_sched = None
        if id:
            class_sched = ClassSchedule.get_class_schedule_by_id(id)
        if class_sched:
            class_sched = class_sched.to_json()
            return jsonify({'reason': 'success', 'result': class_sched}), 200
        else:
            # no class schedule found using either id
            return jsonify({'reason': 'no class schedule found with id'}), 200

    else:
        return jsonify({'reason': 'missing args'}), 300


@class_schedule_api_bp.route('/update_class_schedule', methods=['POST'])
def update_class_schedule():
    req_data = request.get_json()
    sched_id = req_data.get('id')

    if not sched_id:
        return jsonify({'reason': 'missing id'}), 300
    ci = req_data.get('class_id', None)
    qo = req_data.get('quarter_offered', None)
    sc = req_data.get('section_code', None)
    format = req_data.get('format', None)
    st = req_data.get('start_time', None)
    et = req_data.get('end_time', None)
    days = req_data.get('days', None)
    instructor = req_data.get('instructor', None)
    update, result = ClassSchedule.update_class_schedule(
                                                         id=sched_id,
                                                         class_id=ci,
                                                         quarter_offered=qo,
                                                         section_code=sc,
                                                         format=format,
                                                         start_time=st,
                                                         end_time=et,
                                                         days=days,
                                                         instructor=instructor)
    result = result.to_json()
    if update:
        return jsonify({'reason': 'success', 'result': result}), 200
    else:
        return jsonify({'reason': 'failed', 'result': result}), 300


@class_schedule_api_bp.route('/delete_class_schedule', methods=['DELETE'])
def delete_class_schedule():
    req_data = request.get_json()
    sched_id = req_data.get('id')

    deleted = ClassSchedule.delete_class_schedule(sched_id=sched_id)
    if(deleted):
        return jsonify({'reason': 'successfully deleted'}), 200
    else:
        return jsonify({'reason': 'no class schedule found with id'}), 300
