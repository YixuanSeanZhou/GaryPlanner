from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..models.friend import Friend
from ..models.user import User

friend_api_bp = Blueprint('friend_api', __name__)
CORS(friend_api_bp, supports_credentials=True)


@friend_api_bp.route('/request_friend', methods=['POST'])
@login_required
def request_friend():
    req_data = request.get_json()
    u2_id = req_data.get('receiver_id')
    if not User.get_user_by_id(u2_id):
        return jsonify({'reason': 'user id invalid'}), 300
    f = Friend.get_friend_by_sender_and_receiver(sender_id=current_user.id,
                                                 receiver_id=u2_id)
    r = Friend.get_friend_by_sender_and_receiver(sender_id=u2_id,
                                                 receiver_id=current_user.id)
    if f:
        return jsonify({'reason': 'duplicated request'}), 300

    if r:
        return jsonify({'reason':
                        'the requester has sent you a friend request'}), 300

    s, f = Friend.add_friend(sender_id=current_user.id, receiver_id=u2_id)
    if s:
        return jsonify({'reason': 'request sent success',
                        'result': f.to_json()}), 200
    else:
        return jsonify({'reason': 'request is duplicated'}), 400


@friend_api_bp.route('/accept_friend', methods=['POST'])
@login_required
def accept_friend():
    cur_id = current_user.id
    req_data = request.get_json()
    u1_id = req_data.get('requestor_id')
    if not User.get_user_by_id(u1_id):
        return jsonify({'reason': 'user id invalid'}), 300
    if not Friend.get_friend_by_sender_and_receiver(sender_id=u1_id,
                                                    receiver_id=cur_id):
        return jsonify({'reason':
                        'request not found'}), 300
    # u2_id = req_data.get('reciever_id')
    s, m, f = Friend.accept_friend(sender_id=u1_id, receiver_id=cur_id)
    if s:
        return jsonify({'reason': m, 'result': f.to_json()}), 200
    else:
        return jsonify({'reason': m}), 300


@friend_api_bp.route('/get_friends_for_user', methods=['GET'])
@login_required
def get_friends_for_user():
    f = Friend.get_friends_for_user(user_id=current_user.id)
    f = list(map(lambda x: x.to_json(), f))
    return jsonify({'reason': 'success', 'result': f}), 200


@friend_api_bp.route('/get_request_sent_by_user', methods=['GET'])
@login_required
def get_request_sent_by_user():
    f = Friend.get_requests_by_sender(sender_id=current_user.id)
    f = list(map(lambda x: x.to_json(), f))
    return jsonify({'reason': 'success', 'result': f}), 200


@friend_api_bp.route('/get_pending_request_to_user', methods=['GET'])
@login_required
def get_pending_request_to_user():
    r = Friend.get_pending_friend_request(user_id=current_user.id)
    r = list(map(lambda x: x.to_json(), r))
    return jsonify({'reason': 'success', 'result': r}), 200


@friend_api_bp.route('/remove_friend', methods=['POST'])
@login_required
def remove_friend():
    req_data = request.get_json()
    f_id = req_data.get('friend_id')
    if not User.get_user_by_id(f_id):
        return jsonify({'reason': 'user id invalid'}), 300
    s, m = Friend.remove_friend(user1_id=current_user.id, user2_id=f_id)
    if s:
        return jsonify({'reason': 'success', 'result': m}), 200
    else:
        return jsonify({'reason': m}), 300


@friend_api_bp.route('/is_friend_with', methods=['GET'])
@login_required
def is_friend_with():
    f_id = request.args.get('friend_id')
    if not User.get_user_by_id(f_id):
        return jsonify({'reason': 'user id invalid'}), 300
    s = Friend.is_friend(user1_id=current_user.id, user2_id=f_id)
    return jsonify({'reason': 'success', 'result': s}), 200
