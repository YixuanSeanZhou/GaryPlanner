from src.models.evaluations import Evaluation
from src.setup import db
import json
import time

def add_evals_to_db():
    start_time = time.time()
    with open('./capes_evaluation.json') as f:
        data = json.load(f)
    print("Creating evaluations for " + str(len(data)) +  "capes evaluations")

    evaluations = []
    for evaluation in data:
        class_name = evaluation['course']
        class_id = class_name[:class_name.find("-")].strip()
        instructor = evaluation['instructor']
        recommend_class = evaluation['recommend_class']
        if recommend_class == "N/A":
            recommend_class = -1
        recommend_instructor = evaluation['recommend_instructor']
        if recommend_instructor == "N/A":
            recommend_instructor = -1
        study_hours_per_week = evaluation['study_hour']
        if study_hours_per_week == "N/A":
            study_hours_per_week = -1
        avg_expected_grade = evaluation['expected_grade']
        avg_grade_received = evaluation['grade_received']
        evaluation = Evaluation(class_id=class_id, instructor=instructor,
                                recommend_class=recommend_class,
                                recommend_instructor=recommend_instructor,
                                study_hours_per_week=study_hours_per_week,
                                avg_expected_grade=avg_expected_grade,
                                avg_grade_received=avg_grade_received)
        evaluations.append(evaluation)
    db.session.add_all(evaluations)
    db.session.commit()
    print ("--- %s seconds ---" % (time.time() - start_time))