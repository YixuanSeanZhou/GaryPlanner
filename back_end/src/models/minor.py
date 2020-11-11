from __future__ import annotations

from typing import List

from ..setup import db


class Minor(db.Model):
    __tablename__ = "Minors"

    id = db.Column(db.Integer, primary_key=True)
    minor_code = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
        super(Minor, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['minor_code'] = self.minor_code
        ret['title'] = self.title
        return ret

    def update_attr(self, minor_code: str, title: str) -> bool:
        if minor_code:
            self.minor_code = minor_code
        if title:
            self.title = title
        self.save()
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_minor(minor_code: str, title: str) -> bool:
        if Minor.get_minor_by_code(minor_code=minor_code):
            return False    # minor exists

        minor = Minor(minor_code=minor_code, title=title)
        db.session.add(minor)
        minor.save()
        return True

    @staticmethod
    def get_minors() -> List[Minor]:
        minors = Minor.query.all()
        if minors:
            return minors
        else:
            # there are no minors in database
            return None

    @staticmethod
    def get_minor(minor_id: int) -> Minor:
        minor = Minor.query.filter_by(id=minor_id).first()
        if minor:
            return minor
        else:
            # there is no minor matching the given id
            return None

    @staticmethod
    def get_minor_by_code(minor_code: str) -> Minor:
        minor = Minor.query.filter_by(minor_code=minor_code).first()
        if minor:
            return minor.to_json()
        else:
            # there is no minor matching the given code
            return None

    @staticmethod
    def update_minor(id: int, minor_code: str = None,
                     title: str = None) -> bool:

        minor = Minor.get_minor(minor_id=id)
        return minor.update_attr(minor_code=minor_code, title=title)
