'''
@author: David Song
'''
from __future__ import annotations

from typing import List

from ..setup import db


class Requirements(db.Model):
    __tableName__ = "Requirements"

    id = db.Column(db.Integer, primary_key=True)
    major_id = db.Column(db.Integer, db.ForeignKey('Majors.id'),
                         nullable=True)
    minor_id = db.Column(db.Integer, db.ForeignKey('Minors.id'),
                         nullable=True)
    class_id = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=True)
    subcategory = db.Column(db.String, nullable=True)

    def __init__(self, **kwargs):
        super(Requirements, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['major_id'] = self.major_id
        ret['minor_id'] = self.minor_id
        ret['class_id'] = self.class_id
        ret['category'] = self.category
        ret['subcategory'] = self.subcategory
        return ret

    def update_attr(self, major_id: int, minor_id: int, class_id: str,
                    category: str, subcategory: str) -> bool:
        if major_id:
            self.major_id = major_id
        if minor_id:
            self.minor_id = minor_id
        if class_id:
            self.class_id = class_id
        if category:
            self.category = category
        if subcategory:
            self.subcategory = subcategory
        self.save()
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_requirement(major_id: int, minor_id: int, class_id: str,
                           category: str, subcategory: str) -> bool:
        # check for identical entries to return false
        requirement = Requirements(major_id=major_id, minor_id=minor_id,
                                   class_id=class_id, category=category,
                                   subcategory=subcategory)
        db.session.add(requirement)
        requirement.save()
        return True

    # get whole table of requirements
    @staticmethod
    def get_requirements() -> List[Requirements]:
        requirements = Requirements.query.all()
        return requirements

    @staticmethod
    def get_requirement_by_id(id: int):
        requirement = Requirements.query.all(id=id).first()
        return requirement

    # get requirements by major, category, and subcategory, if indicated
    @staticmethod
    def get_requirements_by_major(
                major_id: major_id, category: category,
                subcategory: subcategory) -> List[Requirements]:
        if category:
            if subcategory:
                # major, category, and subcategory provided
                requirements = Requirements.query.filter_by(
                        major_id=major_id,
                        category=category,
                        subcategory=subcategory).all()
            else:
                # only major and category provided
                requirements = Requirements.query.filter_by(
                        major_id=major_id,
                        category=category).all()
        else:
            # only major provided
            requirements = Requirements.query.filter_by(
                    major_id=major_id).all()
        return requirements

    # get requirements by minor
    @staticmethod
    def get_requirements_by_minor(minor_id: minor_id) -> List[Requirements]:
        requirements = Requirements.query.filter_by(minor_id=minor_id).all()
        requirements = list(map(lambda x: x.to_jason(), requirements))
        return requirements

    # delete a requirement
    @staticmethod
    def delete_requirement(id: int):
        # should I use major, minor, class, category, subcategory instead?
        # I'm not sure if all majors have subcategories.
        # also I think sometimes classes are in multiple categories;
        # so basically I'd have to delete based on all attributes.
        requirement = Requirements.query.filter_by(id=id)
        db.session.delete(requirement)
        requirement.save()
        return True
