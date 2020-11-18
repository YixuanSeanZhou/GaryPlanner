from flask_cors import CORS, cross_origin
from flask import Blueprint, request, jsonify
from flask_login import login_required, login_user, logout_user, current_user

from ..models.user import User

user_api_bp = Blueprint('user_api', __name__)
CORS(user_api_bp, supports_credentials=True)

# db.create_all()
# db.session.commit()


@user_api_bp.route('/create_user', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_user():
    '''
    Route to create a user
    @author: YixuanZ
    '''
    req_data = request.get_json()
    user_name = req_data.get('user_name')
    email = req_data.get('email')  # primary key
    first_name = req_data.get('first_name', 'Gary')
    last_name = req_data.get('last_name', 'Gillespie')
    itgq = req_data.get('intended_grad_quarter', 'None')
    college = req_data.get('college')  # frontend need check validity
    # ; seperated list expected
    major = req_data.get('major', 'undeclared')
    minor = req_data.get('minor', 'undeclared')
    pwd = req_data.get('pwd')
    s, u = User.create_user(user_name=user_name, email=email, pwd=pwd,
                            first_name=first_name, last_name=last_name,
                            intended_grad_quarter=itgq,
                            college=college, major=major, minor=minor)
    if s:
        return jsonify({'reason': 'user created', 'result': u.to_json()}), 200
    else:
        return jsonify({'reason': 'user existed'}), 300


@user_api_bp.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    '''
    Route used to log in a user. Creates a session for them and returns the
    user object.\n
    '''
    req_data = request.get_json()
    email = req_data.get('email', None)
    pwd = req_data.get('pwd', '')
    remember = True if req_data.get('remember', '') == 'true' else False

    if User.check_password(email, pwd):
        user = User.get_user_by_email(email=email)
        login_user(user, remember=remember)
        return jsonify({'reason': 'logged in', 'result': user.to_json()}), 200
    else:
        return jsonify({'reason': 'User/Password doesn\'t match'}), 400


@user_api_bp.route('/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
@login_required
def logout():
    '''
    Route used to log out a user. Ends their session.\n
    '''
    logout_user()
    return jsonify({'reason': 'see you later'}), 200


@user_api_bp.route('/get_users', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def get_users():
    users = User.get_users()
    users = list(map(lambda x: x.to_json(), users))
    return jsonify({'reason': 'success', 'result': users}), 200


@user_api_bp.route('/get_user_profile', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def get_user_profile():
    u_id = current_user.id
    user = User.get_user_by_id(user_id=u_id)
    return jsonify({'reason': 'success', 'result': user.to_json()}), 200

# TODO: NO USER NAME


@user_api_bp.route('/update_profile', methods=['POST'])
@cross_origin(supports_credentials=True)
@login_required
def update_profile():
    req_data = request.get_json()
    u_id = current_user.id
    first_name = req_data.get('first_name', None)
    last_name = req_data.get('last_name', None)
    intended_grad_quarter = req_data.get('intended_grad_quarter', None)
    college = req_data.get('college', None)
    major = req_data.get('major', None)
    minor = req_data.get('minor', None)
    user_name = req_data.get('user_name', None)

    s, p = User.update_profile(user_id=u_id, first_name=first_name,
                               last_name=last_name,
                               user_name=user_name,
                               intended_grad_quarter=intended_grad_quarter,
                               college=college, major=major, minor=minor)
    if s:
        return jsonify({'reason': 'success', 'result': p.to_json()}), 200
    else:
        return jsonify({'reason': 'failed', 'result': p}), 300
