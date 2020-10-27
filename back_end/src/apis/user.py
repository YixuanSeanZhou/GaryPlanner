from flask_cors import CORS
from flask import Blueprint, request, jsonify

from ..models.user import User, db

user_api_bp = Blueprint('user_api', __name__)
CORS(user_api_bp, supports_credentials=True)

db.create_all()
db.session.commit()

@user_api_bp.route('/create_user', methods=['POST'])
def create_user():
    '''
    Route to create a user
    @author: YixuanZ
    '''
    name = request.json['name']
    User.create_user(name)
    return jsonify({'reason': 'user created'}), 200


@user_api_bp.route('/get_users', methods=['GET'])
def get_users():
    users = User.get_users()
    return jsonify({'reason': 'success', 'result': users}), 200
