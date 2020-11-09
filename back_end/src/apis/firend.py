from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, login_user, logout_user, current_user

from ..models.friend import Friend
from ..models.user import User

friend_api_bp = Blueprint('friend_api', __name__)
CORS(friend_api_bp, supports_credentials=True)

# TODO: Updates to check if the requester exist

@friend_api_bp.route('/request_friend', methods=['POST'])
@login_required
def request_friend():
    req_data = request.get_json()
    # u1_id = req_data.get('requestor_id')
    u2_id = req_data.get('reciever_id')
    s = Friend.add_friend(user1_id=current_user.id, user2_id=u2_id)
    if s:
        return jsonify({'reason': 'request sent success'}), 200
    else:
        return jsonify({'reason': 'request is duplicated'}), 400

# TODO: check if the request is sent by anyone

@friend_api_bp.route('/accept_friend', methods=['POST'])
@login_required
def accept_friend():
    req_data = request.get_json()
    u1_id = req_data.get('requestor_id')
    # u2_id = req_data.get('reciever_id')
    s = Friend.add_friend(user1_id=current_user.id, user2_id=u1_id)
    if s:
        return jsonify({'reason': 'request sent success'}), 200
    else:
        return jsonify({'reason': 'request is duplicated'}), 400


@friend_api_bp('/get_friends_for_user', methods=['POST'])
@login_required
def get_friends_for_user():
    f = Friend.get_friends_for_user(user_id=current_user.id)
    f = list(map(lambda x: x.to_json(), f))
    return jsonify({'reason': 'request sent success', 'result': f}), 200


@friend_api_bp('/remove_friend', methods=['POST'])
@login_required
def remove_friend():
    req_data = request.get_json()
    f_id = req_data.get('friend_id')
    Friend.remove_friend(user1_id=current_user.id, user2_id=f_id)
    return jsonify({'reason': 'You are no longer friends'}), 200


@friend_api_bp('/is_friend_with', methods=['POST'])
@login_required
def is_friend_with():
    req_data = request.get_json()
    f_id = req_data.get('friend_id')
    ret = Friend.is_friend(user1_id=current_user.id, user2_id=f_id)
    return jsonify({'reason': 'request sent success', 'result': ret}), 200
