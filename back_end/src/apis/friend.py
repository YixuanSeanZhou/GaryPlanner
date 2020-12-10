from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..models.friend import Friend
from ..models.user import User
from ..models.four_year_plan import FourYearPlan
from ..apis.four_year_plan import convertResultsto4YearPlan

friend_api_bp = Blueprint('friend_api', __name__)
CORS(friend_api_bp, supports_credentials=True)


@friend_api_bp.route('/request_friend', methods=['POST'])
@login_required
def request_friend():
    req_data = request.get_json()
    u2_id = req_data.get('user_id')
    u2 = User.get_user_by_id(user_id=u2_id)
    if not u2:
        return jsonify({'reason': 'user id invalid'}), 300
    if u2.id == current_user.id:
        return jsonify({'reason': 'you should be friend with yourself'}), 301
    s, f = Friend.add_friend(sender_id=current_user.id, receiver_id=u2_id)
    if s:
        return jsonify({'reason': 'request sent success'}), 200
    else:
        if f.accepted:
            return jsonify({'reason': 'you are already friends'}), 304
        if f.sender_id == current_user.id:
            return jsonify({'reason': 'you already sent a request'}), 303
        else:
            return jsonify({'reason': 'the user has sent you a friend request'}),
            302


@friend_api_bp.route('/accept_friend', methods=['POST'])
@login_required
def accept_friend():
    cur_id = current_user.id
    req_data = request.get_json()
    u1_id = req_data.get('request_id')
    r = Friend.get_request_by_id(u1_id)
    if r.sender_id == cur_id:
        return jsonify({'reason': 'cannot accept your own friend request'}), 302
    s, m, f = Friend.accept_friend(request_id=u1_id)
    if not f:
        return jsonify({'reason': 'request not found'}), 300
    if s:
        sender = User.get_user_by_id(f.sender_id)
        return jsonify({'reason': m, 'result': sender.to_json()}), 200
    else:
        return jsonify({'reason': m}), 301


@friend_api_bp.route('/get_friends_for_user', methods=['GET'])
@login_required
def get_friends_for_user():
    f, p = Friend.get_friends_for_user(user_id=current_user.id)
    f = list(map(lambda x: x.to_json(), f))
    p = list(map(lambda x: x.to_json(), p))
    for pending in p:
        pending.update({'first_name':
                        User.get_user_by_id(pending['sender_id']).first_name})
        pending.update({'last_name':
                        User.get_user_by_id(pending['sender_id']).last_name})
        pending.update({'user_name':
                        User.get_user_by_id(pending['sender_id']).user_name})
        pending.update({'email':
                        User.get_user_by_id(pending['sender_id']).email})
        pending.update({'request_id': pending['id']})
        del pending['id']
        pending.update({'id': pending['sender_id']})
        del pending['sender_id']
        del pending['receiver_id']
        del pending['accepted']
    return jsonify({'reason': 'success', 'friends': f, 'requests': p}), 200


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
    f = User.get_user_by_id(user_id=f_id)
    if not f:
        return jsonify({'reason': 'user id invalid'}), 300
    if f.id == current_user.id:
        return jsonify({'reason': 'you should be friend with yourself'}), 301
    s, m = Friend.remove_friend(user1_id=current_user.id, user2_id=f_id)
    if s:
        return jsonify({'reason': 'success', 'result': m}), 200
    else:
        return jsonify({'reason': m}), 302


@friend_api_bp.route('/is_friend_with', methods=['GET'])
@login_required
def is_friend_with():
    f_id = request.args.get('friend_id')
    f = User.get_user_by_id(user_id=f_id)
    if not f:
        return jsonify({'reason': 'user id invalid'}), 300
    if f.id == current_user.id:
        return jsonify({'reason': 'you should be friend with yourself'}), 300
    s = Friend.is_friend(user1_id=current_user.id, user2_id=f_id)
    return jsonify({'reason': 'success', 'result': s}), 200


@friend_api_bp.route('/get_friend_fyp', methods=['GET'])
@login_required
def get_friend_fyp():
    f_id = request.args.get('friend_id')
    f = User.get_user_by_id(user_id=f_id)
    if not f:
        return jsonify({'reason': 'user id invalid'}), 300
    if f.id == current_user.id:
        return jsonify({'reason': 'you should be friend with yourself'}), 301
    if(Friend.is_friend(user1_id=current_user.id, user2_id=f_id)):
        friend_fyp = FourYearPlan.get_plan_by_user(f_id)
        friend_fyp = list(map(lambda x: x.to_json(), friend_fyp))
        formatted_plan = convertResultsto4YearPlan(
            {'reason': 'success', 'result': friend_fyp})
        return jsonify(formatted_plan), 200
    else:
        return jsonify({'reason': 'user is not friends with this person'}), 302


@friend_api_bp.route('/get_friend_profile', methods=['GET'])
@login_required
def get_friend_profile():
    f_id = request.args.get('friend_id')
    f = User.get_user_by_id(user_id=f_id)
    if not f:
        return jsonify({'reason': 'user id invalid'}), 300
    if f.id == current_user.id:
        return jsonify({'reason': 'this is your own profile'}), 301
    if not Friend.is_friend(user1_id=current_user.id, user2_id=f_id):
        return jsonify({'reason': 'you are not friends'}), 302
    else:
        fp = User.get_user_by_id(user_id=f_id)
        return jsonify({'reason': 'success', 'result': fp.to_json()}), 200


@friend_api_bp.route('/find_user', methods=['GET'])
@login_required
def find_user():
    name = request.args.get('name')
    by_user_name = User.get_user_by_user_name(name=name)
    by_email = User.get_user_by_email(email=name)
    if by_user_name:
        user = {"id": by_user_name.id,
                "first_name": by_user_name.first_name,
                "last_name": by_user_name.last_name,
                "user_name": by_user_name.user_name,
                "email": by_user_name.email}
        return jsonify({'reason': 'success', 'result': user}), 200
    elif by_email:
        user = {"id": by_email.id,
                "first_name": by_email.first_name,
                "last_name": by_email.last_name,
                "user_name": by_email.user_name,
                "email": by_email.email}
        return jsonify({'reason': 'success', 'result': user}), 200
    else:
        return jsonify({'reason': 'user not found'}), 300


@friend_api_bp.route('/decline_friend_request', methods=['POST'])
@login_required
def decline_request():
    req_data = request.get_json()
    r = req_data.get('request_id')
    b, dec = Friend.decline_request(request_id=r)
    if not dec:
        return jsonify({'reason': 'request id invalid'}), 300
    if b:
        return jsonify({'reason': 'request declined'}), 200
    else:
        return jsonify({'reason': 'already friends'}), 301
