from __future__ import annotations

from typing import List

from ..setup import db



class AllClass(db.Model):
    __tablename__ = "AllClasses"

    id = db.Column(db.Integer, primary_key=True)
    class_code = db.Column(db.String(255), unique = True, nullable=False)
    title = db.Column(db.String(255), nullable=False) # FIXME: idk if this should be unique or not
    units = db.Column(db.Integer, nullable=False)
    support_grade_type = 
    description = 
    class_id = db.Column(db.Integer, unique = True, nullable=False) #db.ForeignKey('AllClasses.id'),
    required_classes = db.Column(db.String(255), nullable=False, default='None') # Nullable or not

    def __init__(self, **kwargs):
        super(AllClass, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['class_code'] = self.class_code
        ret['title'] = self.title
        ret['units'] = self.units
        ret['support_grade_type'] = self.support_grade_type
        ret['description'] = self.description
        return ret

    def update_attr(self, class_code: int, title: str, units: int, support_grade_type: int, description: str) -> bool:
        '''
        update the info
        input   class_id(int), required_class(str, i.e. "CSE30, CSE100")
        output  True
        @author: Jiazheng Liu
        '''
        if class_id:
            self.class_id = class_id
        if required_classes:
            self.required_classes = required_classes
        self.save()
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_prereq(class_id: int, required_classes: str = None) -> bool:
        '''
        create prereq
        input   class_id(int), required_class(str, i.e. "CSE30, CSE100")
        output  True if class successfully created
                False if class existed already
        @author: Jiazheng Liu
        '''
        # This is a pre done thing before the app goes public
        if Prerequisite.get_prereq_by_class_id(class_id=class_id):
            return False    # class with prereq exists
        prereq = Prerequisite(class_id=class_id, required_classes = required_classes)
        db.session.add(prereq)
        prereq.save()
        return True

    @staticmethod
    def get_prereqs() -> List[Prerequisite]:
        '''
        get all prereq
        input   None
        output  prereqs in JSON
        @author: Jiazheng Liu
        '''
        get_prereqs = Prerequisite.query.all()
        # FIXME: to_json in model or in api? Im trying to be consistent
        get_prereqs = list(map(lambda x: x.to_json(), get_prereqs))
        return get_prereqs

    @staticmethod
    def get_prereq_by_class_id(class_id: int) -> User:
        '''
        get prereq for a class
        input   class_id(int)
        output  prereq of that class
        @author: Jiazheng Liu
        '''
        return Prerequisite.query.filter_by(class_id=class_id).first()

    @staticmethod
    def update_prereq(class_id: int, required_classes: str = None) -> bool:
        '''
        update prereq for a class
        input   class_id(int), required_class(str, i.e. "CSE30, CSE100")
        output  True if class updated successfully,
                False if class does not exist
        @author: Jiazheng Liu
        '''
        # TODO: Maybe we want to use **kwargs, but maybe not...
        clss = Prerequisite.get_prereq_by_class_id(class_id=class_id)
        if clss:
            return clss.update_attr(class_id=class_id, required_classes=required_classes)
        return False