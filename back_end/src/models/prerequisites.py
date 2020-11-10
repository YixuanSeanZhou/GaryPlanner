from __future__ import annotations

from typing import List

from ..setup import db



class Prerequisite(db.Model):
    __tablename__ = "Prerequisites"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, unique = True, nullable=False) #db.ForeignKey('AllClasses.id'),
    required_classes = db.Column(db.String(255), nullable=False, default='None') # Nullable or not

    def __init__(self, **kwargs):
        super(Prerequisite, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['class_id'] = self.class_id
        ret['required_classes'] = self.required_classes
        return ret

    def update_attr(self, class_id: int, required_classes: str) -> bool:
        if class_id:
            self.class_id = class_id
        if required_classes:
            self.required_classes = required_classes
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_prereq(class_id: int, required_classes: str = None) -> bool:
        # This is a pre done thing before the app goes public
        if Prerequisite.get_prereq_by_class_id(class_id=class_id):
            return False    # class with prereq exists
        prereq = Prerequisite(class_id=class_id, required_classes = required_classes)
        db.session.add(prereq)
        prereq.save()
        return True

    @staticmethod
    def get_prereqs() -> List[Prerequisite]:
        get_prereqs = Prerequisite.query.all()
        get_prereqs = list(map(lambda x: x.to_json(), get_prereqs))
        return get_prereqs

    @staticmethod
    def get_prereq_by_class_id(class_id: int) -> User:
        return Prerequisite.query.filter_by(class_id=class_id).first()

    @staticmethod
    def update_prereq(class_id: int, required_classes: str = None) -> bool:
        # TODO: Maybe we want to use **kwargs, but maybe not...
        clss = Prerequisite.get_prereq_by_class_id(class_id=class_id)
        return clss.update_attr(class_id=class_id, required_classes=required_classes)
