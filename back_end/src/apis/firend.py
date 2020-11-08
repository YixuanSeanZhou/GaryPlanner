from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, login_user, logout_user, current_user

from ..models.friend import Friend
from ..models.user import User

friend_api_bp = Blueprint('friend_api', __name__)
CORS(friend_api_bp, supports_credentials=True)


@friend_api_bp.route('/request_friend', methods=['POST'])
def request_friend():
    req_data = request.get_json()
    u1_id = req_data.get('requestor_id')
    u2_id = req_data.get('reciever_id')
    s = Friend.add_friend(user1_id=u1_id, user2_id=u2_id)
    if s:
        return jsonify({'reason': 'request sent success'}), 200
    else:
        return jsonify({'reason': 'request is duplicated'}), 400


@friend_api_bp.route('/accept_friend', methods=['POST'])
def accept_friend():
    req_data = request.get_json()
    u1_id = req_data.get('requestor_id')
    u2_id = req_data.get('reciever_id')
    s = Friend.add_friend(user1_id=u2_id, user2_id=u1_id)
    if s:
        return jsonify({'reason': 'request sent success'}), 200
    else:
        return jsonify({'reason': 'request is duplicated'}), 400

# @friend_api_bp('/get_all_friend', methods=['POST'])
