from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.major import Major

major_api_bp = Blueprint('major_api', __name__)
CORS(major_api_bp, supports_credentials=True)


@major_api_bp.route('/create_major', methods=['POST'])
def create_major():
    '''
    Route to create a major
    @author: BensonV
    '''
    # post request needs a major_code, title, and degree_type
    req_data = request.get_json()
    major_code = req_data.get('major_code')
    title = req_data.get('title')
    degree_type = req_data.get('degree_type')

    status = Major.create_major(major_code=major_code, title=title, 
                                degree_type=degree_type)

    if status:
        return jsonify({'reason': 'major created'}), 200
    else:
        return jsonify({'reason': 'major existed'}), 300


@major_api_bp.route('/get_majors', methods=['GET'])
def get_majors():
    majors = Major.get_majors()
    majors = list(map(lambda x: x.to_json(), majors))
    return jsonify({'reason': 'success', 'result': majors}), 200


@major_api_bp.route('/get_major', methods=['GET'])
def get_major():
    # check for query string keys 'id' and/or 'major_code'
    if request.args:
        arguments = request.args
        id = arguments.get('id', None)
        major_code = arguments.get('major_code', None)

        major = None
        if id:
            major = Major.get_major(id)
        elif major_code:
            major = Major.get_major_by_code(major_code)

        
        if major:
            major = major.to_json()
            return jsonify({'reason': 'success', 'result': major}), 200
        else:
            # no major matching criteria found
            return jsonify({'reason': 'success', 'result': {}}), 200

    else:
        return jsonify({'reason': 'missing args'}), 300

    


@major_api_bp.route('/update_major', methods=['POST'])
def update_major():
    req_data = request.get_json()
    # post request needs id, major_code, title, and degree_type
    m_id = req_data.get('id')

    if not m_id:
        return jsonify({'reason': 'missing major id'}), 300

    major_code = req_data.get('major_code', None)
    title = req_data.get('title', None)
    degree_type = req_data.get('degree_type', None)
    status = Major.update_major(id=m_id, major_code=major_code,
                                title=title,
                                degree_type=degree_type)

    ret = Major.get_major(m_id).to_json()
    if status:
        return jsonify({'reason': 'success', 'result': ret}), 200
    else:
        return jsonify({'reason': 'failed', 'result': ret}), 300
