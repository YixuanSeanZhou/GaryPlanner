from __future__ import annotations

from typing import List

from ..setup import db


class ClassSchedule(db.Model):
    __tablename__ = "ClassSchedules"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('AllClasses.id'),
                         nullable=False)
    quarter_offered = db.Column(db.String(255), nullable=False)
    section_code = db.Column(db.String(255), nullable=False)
    format = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.String(255), nullable=False)
    end_time = db.Column(db.String(255), nullable=False)
    days = db.Column(db.String(255), nullable=False)
    instructor = db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
        super(ClassSchedule, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['class_id'] = self.class_id
        ret['quarter_offered'] = self.quarter_offered
        ret['section_code'] = self.section_code
        ret['format'] = self.format
        ret['start_time'] = self.start_time
        ret['end_time'] = self.end_time
        ret['days'] = self.days
        ret['instructor'] = self.instructor
        return ret

    def update_attr(self, class_id: int, quarter_offered: str,
                    section_code: str, format: str, start_time: str,
                    end_time: str, days: str,
                    instructor: str) -> (bool, ClassSchedule):
        if class_id:
            self.class_id = class_id
        if quarter_offered:
            self.quarter_offered = quarter_offered
        if section_code:
            self.section_code = section_code
        if format:
            self.format = format
        if start_time:
            self.start_time = start_time
        if end_time:
            self.end_time = end_time
        if days:
            self.days = days
        if instructor:
            self.instructor = instructor
        self.save()
        return True, self

    def save(self):
        db.session.commit()

    @staticmethod
    def create_class_schedule(class_id: int, quarter_offered: str,
                              section_code: str, format: str, start_time: str,
                              end_time: str, days: str,
                              instructor: str) -> bool:
        if(ClassSchedule.class_exists(class_id, section_code)):
            return False    # class already exists in db
        class_schedule = ClassSchedule(class_id=class_id,
                                       quarter_offered=quarter_offered,
                                       section_code=section_code,
                                       format=format, start_time=start_time,
                                       end_time=end_time, days=days,
                                       instructor=instructor)
        db.session.add(class_schedule)
        class_schedule.save()
        return True

    @staticmethod
    def get_class_schedules() -> List[ClassSchedule]:
        class_schedules = ClassSchedule.query.all()
        return class_schedules

    @staticmethod
    def get_class_schedule_by_id(sched_id: int) -> ClassSchedule:
        return ClassSchedule.query.filter_by(id=sched_id).first()

    @staticmethod
    def get_class_schedule_by_class_id(class_id: int) -> ClassSchedule:
        return ClassSchedule.query.filter_by(class_id=class_id).first()

    @staticmethod
    def update_class_schedule(id: int, class_id: int, quarter_offered: str,
                              section_code: str, format: str, start_time: str,
                              end_time: str, days: str,
                              instructor: str) -> (bool, ClassSchedule):
        class_sched = ClassSchedule.get_class_schedule_by_id(
                sched_id=id)
        if not class_sched:
            return False, None
        return class_sched.update_attr(class_id=class_id,
                                       quarter_offered=quarter_offered,
                                       section_code=section_code,
                                       format=format, start_time=start_time,
                                       end_time=end_time, days=days,
                                       instructor=instructor)

    @staticmethod
    def delete_class_schedule(sched_id: int) -> bool:
        to_delete = ClassSchedule.query.filter_by(id=sched_id)
        if(to_delete.first()):
            to_delete.delete()
            db.session.commit()
            return True
        else:
            return False
    
    @staticmethod
    def class_exists(class_id: int, section_code: int) -> bool:
        if(ClassSchedule.query.filter_by(class_id=class_id,
                                         section_code=section_code).first()):
            return True
        else:
            return False
