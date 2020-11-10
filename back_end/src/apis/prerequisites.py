from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.prerequisites import Prerequisite

prereq_api_bp = Blueprint('prereq_api', __name__)
CORS(prereq_api_bp, supports_credentials=True)

# db.create_all()
# db.session.commit()


@prereq_api_bp.route('/create_class_with_prereq', methods=['POST'])
def create_class_with_prereq():
    '''
    Route to create a user
    @author: Jiazheng Liu
    '''
    req_data = request.get_json()
    class_id = req_data.get('class_id')
    required_classes = req_data.get('required_classes')
    status = Prerequisite.create_prereq(class_id = class_id, required_classes = required_classes)
    if status:
        return jsonify({'reason': 'class with prereq created'}), 200
    else:
        return jsonify({'reason': 'class with prereq existed'}), 300



@prereq_api_bp.route('/get_classes_with_prereq', methods=['GET'])
def get_classes_with_prereq():
    clss = Prerequisite.get_prereqs()
    return jsonify({'reason': 'success', 'result': clss}), 200


@prereq_api_bp.route('/update_class_with_prereq', methods=['POST'])
def update_class_with_prereq():
    req_data = request.get_json()
    class_id = req_data.get('class_id')
    required_classes = req_data.get('required_classes')


    # In apis/user.py, there are two searches by User.get_user_by_id. Is it rly necessary? 
    status = Prerequisite.update_prereq(class_id=class_id, required_classes=required_classes)
    ret = Prerequisite.get_prereq_by_class_id(class_id=class_id).to_json()
    if status:
        return jsonify({'reason': 'success', 'result': ret}), 200
    else:
        return jsonify({'reason': 'failed', 'result': ret}), 300
