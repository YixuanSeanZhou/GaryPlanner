from __future__ import annotations

from typing import List

from ..setup import db

class Requirements(db.Model):
    tableName = "Requirements"

    id = db.Column(db.Integer, primary_key=True)
    major_id = db.Column(db.Integer, db.ForeignKey('majors.id'), nullable=True)
    minor_id = db.Column(db.Integer, db.ForeignKey('minors.id'), nullable=True)
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

    def update_attr(self, major_id: int, minor_id: int, class_id: string, 
                    category: string, subcategory: string) -> bool:
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
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_requirement(major_id: int, minor_id: int, class_id: string, 
                    category: string, subcategory: string) -> bool:
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
        requirements = list(map(lambda x: x.to_json(), requirements))
        return requirements

    # get requirements by major, category, and subcategory, if indicated
    @staticmethod
    def get_requirements_by_major(major_id: major_id, category: category, subcategory: subcategory) -> List[Requirements]:
        if category:
            if subcategory:
                # major, category, and subcategory provided
                requirements = Requirements.query.filter_by(major_id=major_id, category=category, subcategory=subcategory)
            else:
                # only major and category provided
                requirements = Requirements.query.filter_by(major_id=major_id, category=category)
        else:
            # only major provided
            requirements = Requirements.query.filter_by(major_id=major_id)
        requirements = list(map(lambda x: x.to_jason(), requirements))
        return requirements

    # get requirements by minor
    @staticmethod
    def get_requirements_by_minor(minor_id: minor_id) -> List[Requirements]:
        requirements = Requirements.query.filter_by(minor_id=minor_id)
        requirements = list(map(lambda x: x.to_jason(), requirements))
        return requirements

    # Any more getters or methods required?

    