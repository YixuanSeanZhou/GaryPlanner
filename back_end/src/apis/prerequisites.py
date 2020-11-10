from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.prerequisites import Prerequisite

prereq_api_bp = Blueprint('prereq_api', __name__)
CORS(prereq_api_bp, supports_credentials=True)

# db.create_all()
# db.session.commit()

'''
@author: Jiazheng Liu

possible other methods:
get classes that has the given class as prereq
check if the given prereq is enough for a class
'''

@prereq_api_bp.route('/create_class_with_prereq', methods=['POST'])
def create_class_with_prereq():
    '''
    Route to create a user
    input   class_id(int), required_class(str, i.e. "CSE30, CSE100")
    output  'class with prereq created' or 'class with prereq existed'

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



@prereq_api_bp.route('/get_all_classes_with_prereq', methods=['GET'])
def get_all_classes_with_prereq():
    '''
    Route to get the prereq for all classes
    input   None
    output  prereq for all classses

    @author: Jiazheng Liu
    '''
    clss = Prerequisite.get_prereqs()
    return jsonify({'reason': 'success', 'result': clss}), 200

# FIXME:
# If the user wants to show prereq graph, and the frontend needs the prereq for a list of classes,
# do they use a for loop and call the api that gets only one class at a time, or do we need an api
# that takes a list and return a list of prereq (but how the list is passed? Through URL?)
@prereq_api_bp.route('/get_class_with_prereq', methods=['GET'])
def get_class_with_prereq():
    '''
    Route to get the prereq for one class
    input   class_id(int)
    output  prereq for the given class if the class exists in the BD or
            'failed: class with prereq DNE'

    @author: Jiazheng Liu
    '''
    # clss = Prerequisite.get_prereqs()
    class_id = request.args.get('class_id')
    clss = Prerequisite.get_prereq_by_class_id(class_id=class_id)
    if clss: 
        return jsonify({'reason': 'success', 'result': clss.to_json()}), 200
    return jsonify({'reason': 'failed: class with prereq DNE'}), 300


@prereq_api_bp.route('/update_class_with_prereq', methods=['POST'])
def update_class_with_prereq():
    '''
    Route to update the prereq for one class
    input   class_id(int), required_class(str, i.e. "CSE30, CSE100")
    output  class updated or 'failed: class with prereq DNE'

    @author: Jiazheng Liu
    '''
    req_data = request.get_json()
    class_id = req_data.get('class_id')
    required_classes = req_data.get('required_classes')


    # FIXME: In apis/user.py, there are two searches by User.get_user_by_id. Is it rly necessary? 
    status = Prerequisite.update_prereq(class_id=class_id, required_classes=required_classes)
    if status:
        ret = Prerequisite.get_prereq_by_class_id(class_id=class_id).to_json()
        return jsonify({'reason': 'success', 'result': ret}), 200
    return jsonify({'reason': 'failed: class with prereq DNE'}), 300
