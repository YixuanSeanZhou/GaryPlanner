from __future__ import annotations

from typing import List

from ..setup import db

from flask_login import UserMixin

# security
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated="auto")


class User(db.Model, UserMixin):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), unique=True, nullable=False)
    last_name = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    pwd = db.Column(db.String(255), nullable=False)
    intended_grad_quarter = db.Column(db.String(255), nullable=False)
    college = db.Column(db.String(255), nullable=False)
    major = db.Column(db.String(255), nullable=False, default='None')
    minor = db.Column(db.String(255), nullable=False, default='None')

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['user_name'] = self.user_name
        ret['first_name'] = self.first_name
        ret['last_name'] = self.last_name
        ret['email'] = self.email
        ret['intended_grad_quarter'] = self.intended_grad_quarter
        ret['college'] = self.college
        ret['major'] = self.major
        ret['minor'] = self.minor
        return ret

    def update_attr(self, first_name: str, user_name: str,
                    last_name: str, college: str,
                    intended_grad_quarter: str,
                    major: str, minor: str) -> bool:
        if first_name:
            self.first_name = first_name
        if last_name:
            self.last_name = last_name
        if user_name:
            self.user_name = user_name
        if college:
            self.college = college
        if intended_grad_quarter:
            self.intended_grad_quarter = intended_grad_quarter
        if major:
            self.major = major
        if minor:
            self.minor = minor
        self.save()
        return True, self

    def save(self):
        db.session.commit()

    @staticmethod
    def create_user(user_name: str, email: str, pwd: str,
                    first_name: str, last_name: str,
                    intended_grad_quarter: str,
                    college: str, major: str, minor: str) -> (bool, User):
        # TODO: Change to user_name?
        if User.get_user_by_email(email=email):
            return False, None    # user exists
        pwd = pwd_context.hash(pwd)
        user = User(user_name=user_name, email=email, pwd=pwd,
                    first_name=first_name, last_name=last_name,
                    intended_grad_quarter=intended_grad_quarter,
                    college=college, major=major, minor=minor)
        db.session.add(user)
        user.save()
        return True, user

    @staticmethod
    def get_users() -> List[User]:
        users = User.query.all()
        return users

    @staticmethod
    def get_user_by_id(user_id: int) -> User:
        return User.query.filter_by(id=user_id).first()

    @staticmethod
    def get_user_by_email(email: str) -> User:
        return User.query.filter_by(email=email).first()

    @staticmethod
    def check_password(email=email, pwd=pwd) -> bool:
        user = User.query.filter_by(email=email).first()
        if user:
            if pwd_context.verify(pwd, user.pwd):
                return True
        return False

    @staticmethod
    def update_profile(user_id: int, first_name: str = None,
                       last_name: str = None,
                       user_name: str = None,
                       intended_grad_quarter: str = None,
                       college: str = None, major: str = None,
                       minor: str = None) -> (bool, User):
        # TODO: Maybe we want to use **kwargs, but maybe not...
        usr = User.get_user_by_id(user_id=user_id)
        if not usr:
            return False, None
        return usr.update_attr(first_name=first_name, user_name=user_name,
                               last_name=last_name, college=college,
                               intended_grad_quarter=intended_grad_quarter,
                               major=major, minor=minor)
