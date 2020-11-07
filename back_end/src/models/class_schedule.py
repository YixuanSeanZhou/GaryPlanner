from __future__ import annotations

from typing import List

from datetime import time

from ..setup import db


class ClassSchedule(db.Model):
    __tablename__ = "ClasSchedule"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, unique=True, nullable=False)
    quarter_offered = db.Column(db.String(255), nullable=False)
    section_code = db.Column(db.String(255), unique=True, nullable=False)
    format = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.Time, nullablle=False)
    end_time = db.Column(db.Time, nullable=False)
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

    def update_attr(self, class_id: int, quarter_offered: str,
                    section_code: str, format: str, start_time: time,
                    end_time: time, days: int, instructor: str) -> bool:
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
        return True

    def save(self):
        db.session.commit()

    @staticmethod
    def create_class_schedule(class_id: int, quarter_offered: str,
                              section_code: str, format: str, start_time: time,
                              end_time: time, days: int,
                              instructor: str) -> bool:
        if ClassSchedule.get_class_schedule_by_id(classid_id=class_id):
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
        class_schedules = list(map(lambda x: x.to_json(), class_schedules))
        return class_schedules

    @staticmethod
    def get_class_schedule_by_id(class_id: int) -> ClassSchedule:
        return ClassSchedule.query.filter_by(class_id=class_id).first()

    @staticmethod
    def get_class_schedule_by_section_code(section_code: str) -> ClassSchedule:
        return ClassSchedule.query.filter_by(section_code=section_code).first()

    @staticmethod
    def update_class_schedule(class_id=class_id,
                              quarter_offered=quarter_offered,
                              section_code=section_code,
                              format=format, start_time=start_time,
                              end_time=end_time, days=days,
                              instructor=instructor) -> bool:
        class_schedule = ClassSchedule.get_class_schedule_by_id(
            class_id=class_id)
        return class_schedule.update_attr(class_id=class_id,
                                          quarter_offered=quarter_offered,
                                          section_code=section_code,
                                          format=format, start_time=start_time,
                                          end_time=end_time, days=days,
                                          instructor=instructor)
