from flask_cors import CORS
from flask import Blueprint, request, jsonify
from flask_login import login_required, login_user, logout_user

from ..models.user import User

user_api_bp = Blueprint('user_api', __name__)
CORS(user_api_bp, supports_credentials=True)

# db.create_all()
# db.session.commit()


@user_api_bp.route('/create_user', methods=['POST'])
def create_user():
    '''
    Route to create a user
    @author: YixuanZ
    '''
    name = request.json['name']
    email = request.json['email']  # primary key
    pwd = request.json['pwd']
    status = User.create_user(name=name, email=email, pwd=pwd)
    if status:
        return jsonify({'reason': 'user created'}), 200
    else:
        return jsonify({'reason': 'user existsed'}), 300


@user_api_bp.route('/login', methods=['POST'])
def login():
    '''
    Route used to log in a user. Creates a session for them and returns the
    user object.\n
    @author npcompletenate
    '''
    email = request.json.get('email', None)
    pwd = request.json.get('pwd', '')
    remember = True if request.json.get('remember', '') == 'true' else False

    if User.check_password(email, pwd):
        user = User.get_user_by_email(email=email)
        login_user(user, remember=remember)
        return jsonify({'reason': 'logged in', 'result': user.to_json()}), 200
    else:
        return jsonify({'reason': 'User/Password doesn\'t match'}), 400


@user_api_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    '''
    Route used to log out a user. Ends their session.\n
    @author npcompletenate
    '''
    logout_user()
    return jsonify({'reason': 'see you later'}), 200


@user_api_bp.route('/get_users', methods=['GET'])
@login_required
def get_users():
    users = User.get_users()
    return jsonify({'reason': 'success', 'result': users}), 200
