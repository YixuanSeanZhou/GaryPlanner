from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.all_classes import AllClass

all_classes_api_bp = Blueprint('all_classes_api', __name__)
CORS(all_classes_api_bp, supports_credentials=True)

# db.create_all()
# db.session.commit()

'''
@author: Jiazheng Liu

other possible methods:

'''

#helper function
def convert_to_four_year_plan(result):
    courses = {}
    #loops through all the classes in search result
    for course in result:
        class_code = course['class_code']
        id = 'course-' + class_code.replace(" ","")
        
        courses[id] = {
            "id" : id,
            "content" : class_code,
            "locked" : False
        }
    return courses

@all_classes_api_bp.route('/create_class', methods=['POST'])
def create_class():
    '''
    Route to create class
    input   class_code: str, title: str, units: int, support_grade_type: int,
            description: str, prerequisites: str (i.e. ("A and (B or C or D)
            and (E or F)")), offer: bool (if this class is still offered)
    output  'class created' or 'class existed'
    @author: Jiazheng Liu
    '''
    req_data = request.get_json()
    class_code = req_data.get('class_code')
    title = req_data.get('title')
    units = req_data.get('units')
    support_grade_type = req_data.get('support_grade_type')
    description = req_data.get('description')
    prerequisites = req_data.get('prerequisites')
    offer = req_data.get('offer')  # Can be optional i think but will fix later
    status = AllClass.create_class(
            class_code=class_code, title=title, units=units,
            support_grade_type=support_grade_type, description=description,
            prerequisites=prerequisites, offer=offer)
    if status[0]:
        return jsonify({'reason': 'class created',
                        'result': status[1].to_json()}), 200
    else:
        return jsonify({'reason': 'class existed'}), 300


@all_classes_api_bp.route('/get_all_classes', methods=['GET'])
def get_all_classes():
    '''
    Route to get all classes
    input   None
    output  all classses
    @author: Jiazheng Liu
    '''
    clss = AllClass.get_classes()
    clss = list(map(lambda x: x.to_json(), clss))
    return jsonify({'reason': 'success', 'result': clss}), 200


@all_classes_api_bp.route('/get_class_by_search', methods=['GET'])
def get_class_by_search():
    '''
    Route to get multiple classes by search query
    input   search(str)
    output  info for the given classes if the classes exists in the BD or
            'failed: class DNE'
    @author: Jiazheng Liu
    '''

    search = request.args.get('search')
    clss = AllClass.get_class_by_search(search=search)
    clss = list(map(lambda x: x.to_json(), clss))
    if clss:
        return jsonify({'reason': 'success', 'result': clss}), 200
    return jsonify({'reason': 'failed: class DNE'}), 300

@all_classes_api_bp.route('/get_formatted_class_by_search', methods=['GET'])
def get_formatted_class_by_search():
    '''
    Route to get multiple classes by search query and format it for 4 year plan
    input   search(str)
    output  info for the given classes if the classes exists in the BD or
            'failed: class DNE'
    @author: Benson V
    '''
    search = request.args.get('search')
    clss = AllClass.get_class_by_search(search=search)
    clss = list(map(lambda x: x.to_json(), clss))
    result = convert_to_four_year_plan(clss)
    if result:
        return result
    return jsonify({'reason': 'failed: class DNE'}), 300


@all_classes_api_bp.route('/get_prereq_and_description', methods=['GET'])
def get_prereq_and_description():
    '''
    API for Huaming's formatted reques
    input: class_name: str
    output: description and prereqs for a given class
    @author: David S
    '''
    class_code = request.args.get('class_code')
    clss = AllClass.get_class_by_code(class_code=class_code)
    if not clss:
        return jsonify({'reason': "class DNE"}), 403
    clss = clss.to_json()
    prereq = clss["prerequisites"]
    desc = clss["description"]
    #units = clss["units"]
    classDes = {
        "prerequisites": prereq,
        "description": desc#,
        #"units": units
    }
    return jsonify({'reason': 'retrieved class info', 'result': classDes}), 200


@all_classes_api_bp.route('/get_class_by_code', methods=['GET'])
def get_class_by_code():
    '''
    Route to get one class
    input   class_code(str)
    output  info for the given class if the class exists in the BD or
            'failed: class DNE'
    @author: Jiazheng Liu
    '''
    # clss = AllClass.get_prereqs()
    class_code = request.args.get('class_code')
    clss = AllClass.get_class_by_code(class_code=class_code)
    if clss:
        return jsonify({'reason': 'success', 'result': clss.to_json()}), 200
    return jsonify({'reason': 'failed: class DNE'}), 300


@all_classes_api_bp.route('/update_class', methods=['POST'])
def update_class():
    '''
    Route to update the info for one class
    input   class_code: str, title: str, units: int, support_grade_type: int,
            description: str, prerequisites: str (i.e. ("A and (B or C or D)
            and (E or F)")), offer: bool (if this class is still offered)
    output  class updated or 'failed: class DNE'
    @author: Jiazheng Liu
    '''
    req_data = request.get_json()
    class_code = req_data.get('class_code')
    title = req_data.get('title')
    units = req_data.get('units')
    support_grade_type = req_data.get('support_grade_type')
    description = req_data.get('description')
    prerequisites = req_data.get('prerequisites')
    offer = req_data.get('offer')

    status = AllClass.update_class(
            class_code=class_code, title=title, units=units,
            support_grade_type=support_grade_type, description=description,
            prerequisites=prerequisites, offer=offer)
    if status[0]:
        return jsonify({'reason': 'success',
                        'result': status[1].to_json()}), 200
    return jsonify({'reason': 'failed: class DNE'}), 300
