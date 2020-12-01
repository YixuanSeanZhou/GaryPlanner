from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.minor import Minor

minor_api_bp = Blueprint('minor_api', __name__)
CORS(minor_api_bp, supports_credentials=True)


@minor_api_bp.route('/create_minor', methods=['POST'])
def create_minor():
    '''
    Route to create a minor
    @author: BensonV
    '''
    # post request needs a minor_code, title
    req_data = request.get_json()
    minor_code = req_data.get('minor_code')
    title = req_data.get('title')

    status = Minor.create_minor(minor_code=minor_code, title=title)

    if status:
        return jsonify({'reason': 'minor created'}), 200
    else:
        return jsonify({'reason': 'minor existed'}), 300


@minor_api_bp.route('/get_minors', methods=['GET'])
def get_minors():
    minors = Minor.get_minors()
    if minors:
        minors = list(map(lambda x: x.to_json(), minors))
    else:
        minors = {}
    return jsonify({'reason': 'success', 'result': minors}), 200


@minor_api_bp.route('/get_minor', methods=['GET'])
def get_minor():
    # check for query string keys 'id' and/or 'minor_code'
    if request.args:
        arguments = request.args
        id = arguments.get('id', None)
        minor_code = arguments.get('minor_code', None)

        minor = None
        if id:
            minor = Minor.get_minor(id)
        elif minor_code:
            minor = Minor.get_minor_by_code(minor_code)

        
        if minor:
            minor = minor.to_json()
            return jsonify({'reason': 'success', 'result': minor}), 200
        else:
            # no minor matching criteria found
            return jsonify({'reason': 'success', 'result': {}}), 200

    else:
        return jsonify({'reason': 'missing args'}), 300

    


@minor_api_bp.route('/update_minor', methods=['POST'])
def update_minor():
    req_data = request.get_json()
    # post request needs id, minor_code, title
    m_id = req_data.get('id')

    if not m_id:
        return jsonify({'reason': 'missing minor id'}), 300

    minor_code = req_data.get('minor_code', None)
    title = req_data.get('title', None)
    status = Minor.update_minor(id=m_id, minor_code=minor_code,
                                title=title)

    ret = Minor.get_minor(m_id).to_json()
    if status:
        return jsonify({'reason': 'success', 'result': ret}), 200
    else:
        return jsonify({'reason': 'failed', 'result': ret}), 300
