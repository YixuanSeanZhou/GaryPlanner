from __future__ import annotations

from typing import List

from ..setup import db


class Evaluation(db.Model):
    __tablename__ = "Evaluations"

    id = db.Column(db.Integer, primary_key=True)
    # TODO this used to be integer pointing to class code
    # But in order to test adding all capes eval to databse,
    # I had to change it to string cuz i didn't have class ids
    class_id = db.Column(db.String(255),# db.ForeignKey('AllClasses.id'),
                         nullable=False)
    instructor = db.Column(db.String(255), nullable=False)
    recommend_class = db.Column(db.Float, nullable=False)
    recommend_instructor = db.Column(db.Float, nullable=False)
    study_hours_per_week = db.Column(db.Float, nullable=False)
    avg_expected_grade = db.Column(db.String(255), nullable=False)
    avg_grade_received = db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
        super(Evaluation, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['class_id'] = self.class_id
        ret['instructor'] = self.instructor
        ret['recommend_class'] = self.recommend_class
        ret['recommend_instructor'] = self.recommend_instructor
        ret['study_hours_per_week'] = self.study_hours_per_week
        ret['avg_expected_grade'] = self.avg_expected_grade
        ret['avg_grade_received'] = self.avg_grade_received
        return ret

    def update_attr(self, class_id: int, instructor: str,
                    recommend_class: float, recommend_instructor: float,
                    study_hours_per_week: float, avg_expected_grade: str,
                    avg_grade_received: str) -> bool:
        if class_id:
            self.class_id = class_id
        if instructor:
            self.instructor = instructor
        if recommend_class:
            self.recommend_class = recommend_class
        if recommend_instructor:
            self.recommend_instructor = recommend_instructor
        if study_hours_per_week:
            self.study_hours_per_week = study_hours_per_week
        if avg_expected_grade:
            self.avg_expected_grade = avg_expected_grade
        if avg_grade_received:
            self.avg_grade_received = avg_grade_received
        self.save()
        return True, self

    def save(self):
        db.session.commit()

    @staticmethod
    def create_evaluation(class_id: int, instructor: str,
                          recommend_class: float, recommend_instructor: float,
                          study_hours_per_week: float, avg_expected_grade: str,
                          avg_grade_received: str) -> bool:

        evaluation = Evaluation(class_id=class_id, instructor=instructor,
                                recommend_class=recommend_class,
                                recommend_instructor=recommend_instructor,
                                study_hours_per_week=study_hours_per_week,
                                avg_expected_grade=avg_expected_grade,
                                avg_grade_received=avg_grade_received)
        db.session.add(evaluation)
        evaluation.save()
        return True, evaluation

    @staticmethod
    def get_evaluations() -> List[Evaluation]:
        evaluations = Evaluation.query.all()
        if evaluations:
            return evaluations

    @staticmethod
    def get_evaluation(evaluation_id: int) -> Evaluation:
        # gets evaluation by primary key id
        evaluation = Evaluation.query.filter_by(id=evaluation_id).first()
        if evaluation:
            return evaluation
        else:
            # there is no evaluation matching the given id
            return None

    @staticmethod
    def get_evaluation_by_class_id(class_id: int) -> List[Evaluation]:
        evaluations = Evaluation.query.filter_by(class_id=class_id)
        if evaluations.first():
            return evaluations
        else:
            # there are no evaluations matching the given class_id
            return None

    @staticmethod
    def get_evaluation_by_instructor(instructor: str) -> List[Evaluation]:
        split = instructor.split(" ")
        for i in range(len(split)):
            split[i] = "%"+split[i].strip()+"%"

        evaluations = Evaluation.query.filter(Evaluation.instructor.ilike(split[0]))

        for i in range(1,len(split)):
            if len(split[i]) > 3:
                print(split[i])
                evaluations = evaluations.filter(Evaluation.instructor.ilike(split[i]))

        if evaluations.first():
            return evaluations
        else:
            # there are no evaluations matching the given instructor name
            return None

    @staticmethod
    def update_evaluation(id: int, class_id: int = None,
                          instructor: str = None,
                          recommend_class: float = None,
                          recommend_instructor: float = None,
                          study_hours_per_week: float = None,
                          avg_expected_grade: str = None,
                          avg_grade_received: str = None) -> bool:

        evaluation = Evaluation.get_evaluation(evaluation_id=id)
        return evaluation.update_attr(class_id=class_id, instructor=instructor,
                                      recommend_class=recommend_class,
                                      recommend_instructor=recommend_instructor,
                                      study_hours_per_week=study_hours_per_week,
                                      avg_expected_grade=avg_expected_grade,
                                      avg_grade_received=avg_grade_received)
