from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.evaluations import Evaluation

evaluation_api_bp = Blueprint('evaluation_api', __name__)
CORS(evaluation_api_bp, supports_credentials=True)


@evaluation_api_bp.route('/create_evaluation', methods=['POST'])
def create_evaluation():
    '''
    Route to create an evaluation
    @author: BensonV
    '''
    # post request needs a class_code, instructor, recommend_class,
    # recommend_instructor, study_hours_per_week,
    # avg_expected_grade, avg_grade_received
    req_data = request.get_json()
    class_code = req_data.get('class_code')
    quarter = req_data.get('quarter')
    instructor = req_data.get('instructor')
    recommend_class = req_data.get('recommend_class')
    recommend_instructor = req_data.get('recommend_instructor')
    study_hours_per_week = req_data.get('study_hours_per_week')
    avg_expected_grade = req_data.get('avg_expected_grade')
    avg_grade_received = req_data.get('avg_grade_received')
    quarter = req_data.get('quarter')

    status, evaluation = Evaluation.create_evaluation(
                                class_code=class_code,
                                quarter=quarter,
                                instructor=instructor,
                                recommend_class=recommend_class,
                                recommend_instructor=recommend_instructor,
                                study_hours_per_week=study_hours_per_week,
                                avg_expected_grade=avg_expected_grade,
                                avg_grade_received=avg_grade_received,
                                quarter=quarter)

    if status:
        return jsonify({
            'reason': 'evaluation created',
            'result': evaluation.to_json()
            }), 200
    else:
        return jsonify({'reason': 'evaluation existed'}), 300


@evaluation_api_bp.route('/get_evaluations', methods=['GET'])
def get_evaluations():
    evaluations = Evaluation.get_evaluations()
    if evaluations:
        evaluations = list(map(lambda x: x.to_json(), evaluations))
    return jsonify({'reason': 'success', 'result': evaluations}), 200


@evaluation_api_bp.route('/get_evaluation', methods=['GET'])
def get_evaluation():
    # check for query string keys 'id' and/or 'class_code' and/or 'instructor'
    # (searching by class_code or instructor returns a list)
    if request.args:
        arguments = request.args
        id = arguments.get('id', None)
        class_code = arguments.get('class_code', None)
        instructor = arguments.get('instructor', None)

        evaluation = None
        if id:
            evaluation = Evaluation.get_evaluation(id)
        elif class_code:
            evaluation = Evaluation.get_evaluation_by_class_code(class_code)
        elif instructor:
            evaluation = Evaluation.get_evaluation_by_instructor(instructor)

        if evaluation:
            # if evaluation is reutrns just one evaluation
            if isinstance(evaluation, Evaluation):
                evaluation = evaluation.to_json()
            # if evaluation is a list
            else:
                evaluation = list(map(lambda x: x.to_json(), evaluation))
            return jsonify({'reason': 'success', 'result': evaluation}), 200
        else:
            # no evaluation matching criteria found
            return jsonify({'reason': 'No results found', 'result': None}), 300

    else:
        return jsonify({'reason': 'missing args'}), 300


@evaluation_api_bp.route('/update_evaluation', methods=['POST'])
def update_evaluation():
    req_data = request.get_json()
    # post request needs id
    eval_id = req_data.get('id')

    if not eval_id:
        return jsonify({'reason': 'missing evaluation id'}), 300

    class_code = req_data.get('class_code', None)
    quarter = req_data.get('quarter', None)
    instructor = req_data.get('instructor', None)
    recommend_class = req_data.get('recommend_class', None)
    recommend_instructor = req_data.get('recommend_instructor', None)
    study_hours_per_week = req_data.get('study_hours_per_week', None)
    avg_expected_grade = req_data.get('avg_expected_grade', None)
    avg_grade_received = req_data.get('avg_grade_received', None)
    quarter = req_data.get('quarter', None)

    status, evaluation = Evaluation.update_evaluation(
                            id=eval_id, class_code=class_code,
                            quarter=quarter,
                            instructor=instructor,
                            recommend_class=recommend_class,
                            recommend_instructor=recommend_instructor,
                            study_hours_per_week=study_hours_per_week,
                            avg_expected_grade=avg_expected_grade,
                            avg_grade_received=avg_grade_received,
                            quarter=quarter)
    if status:
        return jsonify({
            'reason': 'success',
            'result': evaluation.to_json()
            }), 200
    else:
        return jsonify({
            'reason': 'failed',
            'result': evaluation.to_json()
            }), 300
