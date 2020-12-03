'''
@author: David Song
'''
from __future__ import annotations

from typing import List

from ..setup import db


class FourYearPlan(db.Model):
    __tableName__ = "FourYearPlan"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    class_code = db.Column(db.String(31),
                           db.ForeignKey('AllClasses.class_code'),
                           nullable=False)
    class_schedule_id = db.Column(db.Integer,
                                  # db.ForeignKey('ClassSchedules.id'),
                                  nullable=True)  # No need for this
    quarter_taken = db.Column(db.String(32), nullable=False)
    grade = db.Column(db.String(8), nullable=True)
    locked = db.Column(db.Boolean, nullable=False)

    def __init__(self, **kwargs):
        super(FourYearPlan, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['user_id'] = self.user_id
        ret['class_code'] = self.class_code
        ret['class_schedule_id'] = self.class_schedule_id
        ret['quarter_taken'] = self.quarter_taken
        ret['grade'] = self.grade
        ret['locked'] = self.locked
        return ret

    def update_attr(self, user_id: int, class_code: str,
                    class_schedule_id: int, quarter_taken: str,
                    grade: str, locked: bool) -> bool:
        if user_id:
            self.user_id = user_id
        if class_code:
            self.class_code = class_code
        if class_schedule_id:
            self.class_schedule_id = class_schedule_id
        if quarter_taken:
            self.quarter_taken = quarter_taken
        if grade:
            self.grade = grade
        if locked:
            self.locked = locked
        self.save()
        return True, self

    def save(self):
        db.session.commit()

    @staticmethod
    def create_entry(user_id: int, class_code: str,
                     quarter_taken: str,
                     class_schedule_id: int = None,
                     grade: str = None, locked: bool = False) -> bool:
        # if it's an identical user, class, and quarter, return false
        if FourYearPlan.get_unique_entry(user_id=user_id,
                                         class_code=class_code,
                                         quarter_taken=quarter_taken):
            return False, None
        four_year_plan = FourYearPlan(user_id=user_id, class_code=class_code,
                                      class_schedule_id=class_schedule_id,
                                      quarter_taken=quarter_taken,
                                      grade=grade, locked=locked)
        db.session.add(four_year_plan)
        four_year_plan.save()
        return True, four_year_plan

    # returns entire table
    @staticmethod
    def get_entries() -> List[FourYearPlan]:
        entries = FourYearPlan.query.all()
        return entries

    # Returns all entries composing the plan for one user
    @staticmethod
    def get_plan_by_user(user_id: int) -> List[FourYearPlan]:
        plan = FourYearPlan.query.filter_by(user_id=user_id).all()
        return plan

    # Returns all locked entries in a four year plan
    @staticmethod
    def get_locked_entries_by_user(user_id: int) -> List[FourYearPlan]:
        plan = FourYearPlan.query.filter_by(user_id=user_id,
                                            locked=True).all()
        return plan

    # returns a specific unique entry by the surrogate key
    @staticmethod
    def get_entry_by_id(plan_id: int) -> FourYearPlan:
        return FourYearPlan.query.filter_by(id=plan_id).first()

    # Returns specific unique entry by user, class, and quarter
    @staticmethod
    def get_unique_entry(user_id: int, class_code: str,
                         quarter_taken: str) -> FourYearPlan:
        return FourYearPlan.query.filter_by(
            user_id=user_id,
            class_code=class_code,
            quarter_taken=quarter_taken).first()

    @staticmethod
    def update_entry(id: int, user_id: int = None,
                     class_code: str = None,
                     class_schedule_id: int = None,
                     quarter_taken: str = None,
                     grade: str = None,
                     locked: bool = None) -> bool:
        # TODO: Maybe we want to use **kwargs, but maybe not...
        entry = FourYearPlan.get_entry_by_id(plan_id=id)
        return entry.update_attr(user_id=user_id, class_code=class_code,
                                 class_schedule_id=class_schedule_id,
                                 quarter_taken=quarter_taken,
                                 grade=grade, locked=locked)

    @staticmethod
    def remove_entry(
            id: int = None, user_id: int = None,
            class_code: str = None,
            quarter_taken: str = None):
        if id:
            entry = FourYearPlan.query.filter_by(id=id).first()
        elif user_id and class_code and quarter_taken:
            entry = FourYearPlan.query.filter_by(
                    user_id=user_id, class_code=class_code,
                    quarter_taken=quarter_taken).first()
        else:
            return False
        db.session.delete(entry)
        entry.save()
        return True
