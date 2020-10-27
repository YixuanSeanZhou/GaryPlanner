from __future__ import annotations

from typing import List

from ...setup import db


class User(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['name'] = self.name

    def save(self):
        db.session.commit()

    @staticmethod
    def create_user(name: str):
        user = User(name=name)
        db.session.add(user)
        user.save()

    @staticmethod
    def get_users() -> List[User]:
        users = User.query.all()
        users = list(map(lambda x: x.to_json(), users))
        return users
