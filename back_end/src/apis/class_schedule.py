from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.class_schedule import ClassSchedule

class_schedule_api_bp = Blueprint('class_schedule_api', __name__)
CORS(class_schedule_api_bp, supports_credentials=True)


@class_schedule_api_bp.route('/create_class_schedule', methods=['POST'])
def create_class_schedule():
    '''
    Route to create a class schedule
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

    created = ClassSchedule.create_class_schedule(class_id=ci,
                                                  quarter_offered=qo,
                                                  section_code=sc,
                                                  format=format,
                                                  start_time=st,
                                                  end_time=et,
                                                  days=days,
                                                  instructor=instructor)

    if created:
        return jsonify({'reason': 'class schedule created'}), 200
    else:
        return jsonify({'reason': 'class schedule exists'}), 300


@class_schedule_api_bp.route('/get_class_schedules', methods=['GET'])
def get_class_schedules():
    class_schedules = ClassSchedule.get_class_schedules()
    class_schedules = list(map(lambda x: x.to_json(), class_schedules))
    return jsonify({'reason': 'success', 'result': class_schedules}), 200


@class_schedule_api_bp.route('/get_class_schedule', methods=['GET'])
def get_class_schedule():
    if request.args:
        arguments = request.args
        ci = arguments.get('class_id', None)
        sc = arguments.get('section_code', None)

        class_sched = None
        if ci:
            class_sched = ClassSchedule.get_class_schedule_by_id(ci)
        elif sc:  # section_code
            class_sched = ClassSchedule.get_class_schedule_by_section_code(sc)

        if class_sched:
            class_sched = class_sched.to_json()
            return jsonify({'reason': 'success', 'result': class_sched}), 200
        else:
            # no class schedule found using either id or section code
            return jsonify({'reason': 'success', 'result': {}}), 200

    else:
        return jsonify({'reason': 'missing args'}), 300


@class_schedule_api_bp.route('/update_class_schedule', methods=['POST'])
def update_class_schedule():
    req_data = request.get_json()
    id = req_data.get('id')

    if not id:
        return jsonify({'reason': 'missing id'}), 300
    ci = req_data.get('class_id', None)
    qo = req_data.get('quarter_offered', None)
    sc = req_data.get('section_code', None)
    format = req_data.get('format', None)
    st = req_data.get('start_time', None)
    et = req_data.get('end_time', None)
    days = req_data.get('days', None)
    instructor = req_data.get('instructor', None)
    updated = ClassSchedule.update_class_schedule(
                                                  id=id,
                                                  class_id=ci,
                                                  quarter_offered=qo,
                                                  section_code=sc,
                                                  format=format,
                                                  start_time=st,
                                                  end_time=et,
                                                  days=days,
                                                  instructor=instructor)
    result = ClassSchedule.get_class_schedule_by_id(id).to_json()
    if updated:
        return jsonify({'reason': 'success', 'result': result}), 200
    else:
        return jsonify({'reason': 'failed', 'result': result}), 300


