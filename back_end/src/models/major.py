from __future__ import annotations

from typing import List

from ..setup import db

from flask_login import UserMixin



class Major(db.Model):
    __tablename__ = "Majors"

    id = db.Column(db.Integer, primary_key=True)
    major_code = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(255), unique=True, nullable=False)
    degree_type = db.Column(db.String(255), unique=True, nullable=False)

    def __init__(self, **kwargs):
        super(Major, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['major_code'] = self.major_code
        ret['title'] = self.title
        ret['degree_type'] = self.degree_type
        return ret

    def update_attr(self, major_code: str, title: str,
                    degree_type: str) -> bool:
        if major_code:
            self.major_code = major_code
        if title:
            self.title = title
        if degree_type:
            self.degree_type = degree_type
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_major(major_code: str, title: str, degree_type: str) -> bool:
        major = Major(major_code=major_code, title=title, degree_type=degree_type)
        db.session.add(major)
        major.save()
        return True

    @staticmethod
    def get_majors() -> List[Major]:
        majors = Major.query.all()
        majors = list(map(lambda x: x.to_json(), majors))
        return majors

    @staticmethod
    def get_major(major_id: int) -> Major:
        return Major.query.filter_by(id=major_id).first()

    @staticmethod
    def get_major_by_code(major_code: str) -> Major:
        return Major.query.filter_by(major_code=major_code).first()

    @staticmethod
    def update_major(id: int, major_code: str = None,
                       title: str = None,
                       degree_type: str = None) -> bool:

        major = Major.get_major(major_id=id)
        return major.update_attr(major_code=major_code, title=title,
                               degree_type=degree_type)

