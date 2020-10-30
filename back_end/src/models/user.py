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
    name = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    pwd = db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['name'] = self.name
        ret['email'] = self.email
        return ret

    def save(self):
        db.session.commit()

    @staticmethod
    def create_user(name: str, email: str, pwd: str) -> bool:
        if User.query.filter_by(email=email).all():
            return False    # user exists
        pwd = pwd_context.hash(pwd)
        user = User(name=name, email=email, pwd=pwd)
        db.session.add(user)
        user.save()
        return True

    @staticmethod
    def get_users() -> List[User]:
        users = User.query.all()
        users = list(map(lambda x: x.to_json(), users))
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
