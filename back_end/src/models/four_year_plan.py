from __future__ import annotations

from typing import List

from ..setup import db

class FourYearPlan(db.Model):
    tableName = "FourYearPlan"

    # TODO: Check nullable and foreign key class names
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    class_id = db.Column(db.Integer, db.ForeignKey('all_classes.id'), nullable = False)
    class_schedule_id = db.Column(db.Integer, db.ForeignKey('class_schedule.id'), nullable = False)
    quarter_taken = db.Column(db.String(32), nullable = False)
    grade = db.Column(db.String(8), nullable = True) 
    locked = db.Column(db.Boolean, nullable = True) 

    def __init__(self, **kwargs):
        super(FourYearPlan, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['user_id'] = self.user_id
        ret['class_id'] = self.class_id
        ret['class_schedule_id'] = self.class_schedule_id
        ret['quarter_taken'] = self.quarter_taken
        ret['grade'] = self.grade
        ret['locked'] = self.locked
        return ret

    def update_attr(self, user_id: int, class_id: int,
                    class_schedule_id: int, quarter_taken: str,
                    grade: str, locked: bool) -> bool:
        if user_id:
            self.user_id = user_id
        if class_id:
            self.class_id = class_id
        if class_schedule_id:
            self.class_schedule_id = class_schedule_id
        if quarter_taken:
            self.quarter_taken = quarter_taken
        if grade:
            self.grade = grade
        if locked:
            self.locked = locked
        return True   

    def save(self):
        db.session.commit()

    @staticmethod
    def create_entry(user_id: int, class_id: int,
                    class_schedule_id: int, quarter_taken: str,
                    grade: str, locked: bool) -> bool:
        # if it's an identical user, class, and quarter, return false
        if FourYearPlan.get_unique_entry(user_id=user_id, 
                class_id=class_id, quarter_taken=quarter_taken):
            return False
        four_year_plan = FourYearPlan(user_id=user_id, class_id=class_id, 
                class_schedule_id=class_schedule_id, quarter_taken=quarter_taken, 
                grade=grade, locked=locked)
        db.session.add(four_year_plan)
        four_year_plan.save()
        return True

    #returns entire table
    @staticmethod
    def get_entries() -> List[FourYearPlan]:
        entries = FourYearPlan.query.all()
        entries = list(map(lambda x: x.to_json(), entries))
        return entries

    #Returns all entries composing the plan for one user
    @staticmethod
    def get_plan_by_user(user_id: int) -> List[FourYearPlan]:
        plan = FourYearPlan.query.filter_by(user_id=user_id)
        plan = list(map(lambda x: x.to_jason(), plan))
        return plan

    #Returns all locked entries in a four year plan
    @staticmethod
    def get_plan_by_user(user_id: int, locked: bool) -> List[FourYearPlan]:
        plan = FourYearPlan.query.filter_by(user_id=user_id, locked=locked)
        plan = list(map(lambda x: x.to_jason(), plan))
        return plan

    #returns a specific unique entry by the surrogate key
    @staticmethod
    def get_entry_by_id(plan_id: int) -> FourYearPlan:
        return FourYearPlan.query.filter_by(id=plan_id).first()

    #Returns specific unique entry by user, class, and quarter
    @staticmethod
    def get_unique_entry(user_id: int, class_id: int, quarter_taken: string) -> FourYearPlan:
        return FourYearPlan.query.filter_by(user_id=user_id, 
                class_id=class_id, quarter_taken=quarter_taken).first()


    # TODO: Is there an equivalent method to implement for four year plan?

    # @staticmethod
    # def update_profile(user_id: int, first_name: str = None,
    #                    last_name: str = None,
    #                    user_name: str = None,
    #                    intended_grad_quarter: str = None,
    #                    college: str = None, major: str = None,
    #                    minor: str = None) -> bool:
    #     # TODO: Maybe we want to use **kwargs, but maybe not...
    #     usr = User.get_user_by_id(user_id=user_id)
    #     return usr.update_attr(first_name=first_name, user_name=user_name,
    #                            last_name=last_name, college=college,
    #                            intended_grad_quarter=intended_grad_quarter,
    #                            major=major, minor=minor)
