'''
@author: David Song
'''
from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.requirements import Requirements

requirements_api_bp = Blueprint('requirements_api', __name__)
CORS(requirements_api_bp, supports_credentials=True)


@requirements_api_bp.route('/create_requirement', methods=['POST'])
def create_requirement():
    req_data = request.get_json()
    major_id = req_data.get('major_id')
    minor_id = req_data.get('minor_id')
    class_id = req_data.get('class_id')
    category = req_data.get('category')
    subcategory = req_data.get('subcategory')
    s, u, = Requirements.create_requirement(
            major_id=major_id, minor_id=minor_id, class_id=class_id,
            category=category, subcategory=subcategory)
    if s:
        return jsonify({'reason': 'requirement created',
                        'result': u.to_json()}), 200
    else:
        return jsonify({'reason': 'requirement existed'}), 300


@requirements_api_bp.route('/get_requirements', methods=['GET'])
def get_requirements():
    requirements = Requirements.get_requirements()
    requirements = list(map(lambda x: x.to_json(), requirements))
    return jsonify({'reason': 'success', 'result': requirements}), 200


@requirements_api_bp.route('/get_requirement_by_id', methods=['GET'])
def get_requirement_by_id():
    id = request.args.get('id')
    requirement = Requirements.get_requirement_by_id(id)
    return jsonify({'reason': 'success', 'result': requirement.to_json()}), 200


@requirements_api_bp.route('/get_requirements_by_major', methods=['GET'])
def get_requirements_by_major():
    major_id = request.args.get('major_id')
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    requirements = Requirements.get_requirements_by_major(
            major_id=major_id, category=category, subcategory=subcategory)
    requirements = list(map(lambda x: x.to_json(), requirements))
    return jsonify({'reason': 'success', 'result': requirements}), 200


@requirements_api_bp.route('/get_requirements_by_minor', methods=['GET'])
def get_requirements_by_minor():
    minor_id = request.args.get('minor_id')
    requirements = Requirements.get_requirements_by_minor(minor_id=minor_id)
    requirements = list(map(lambda x: x.to_json(), requirements))
    return jsonify({'reason': 'success', 'result': requirements}), 200


# TODO: Currently still unsuccessful test on Postman
# It seems no one else has made a delete method
# Shall I still keep it?
@requirements_api_bp.route('/delete_requirement', methods=['POST'])
def delete_requirement():
    id = request.args.get('id')
    s, m = Requirements.delete_requirement(id)
    if s:
        return jsonify({'reason': 'requirement deleted'}), 200
    else:
        return jsonify({'reason': m}), 300
