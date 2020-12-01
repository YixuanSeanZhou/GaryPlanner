from src.models.evaluations import Evaluation
from src.models.all_classes import AllClass
from src.setup import db
import json
import time
import os

# JAPN 150A-B-C or A,B,C or VIS A-F
# AIP units have comma
# poli 30 or
def add_classes_to_db():
    print("Creating Classes")
    start_time = time.time()

    # loop through all files in utils/newJsons
    directory = "./src/utils/newJsons"
    all_classes = []
    all_class_code = {}

    for json_file in os.scandir(directory):
        #only reads json files
        if not json_file.path.endswith("json"):
            continue

        file_path = json_file.path
        with open(file_path) as f:
            data = json.load(f)

        #loops through all courses in each json
        for course in data:
            class_code = course['code']
            title = course['title']
            units = course['unit']
            description = course['description']
            prerequisites = course['prerequisite']
            offer = True
            support_grade_type = 2

            # These courses are unnecessary, so skip it
            if not prerequisites and not description and not units:
                continue

            # Check if this class is already in the database
            try:
                # found class code in dictionary, means it already exist
                search = all_class_code[class_code]
                continue
            except KeyError:
                pass

            if not prerequisites:
                prerequisites = "None"
            if not description:
                description = "There is currently no description for this course"

            # parse special case for units
            if units == None:
                units = 0
            units = str(units)
            if len(units) > 1:
                units = int(units[0])
            course = AllClass(
                            class_code=class_code, 
                            title=title, units=units,
                            support_grade_type=support_grade_type,
                            description=description,
                            prerequisites = prerequisites,
                            offer=offer
                        )
            all_classes.append(course)
            all_class_code[class_code] = file_path

    db.session.add_all(all_classes)
    db.session.commit()
    print ("--- %s seconds to create all classes ---" % (time.time() - start_time))


def add_evals_to_db():
    start_time = time.time()
    with open('./capes_evaluation.json') as f:
        data = json.load(f)
    print("Creating evaluations for " + str(len(data)) +  "capes evaluations")

    evaluations = []
    for evaluation in data:
        class_name = evaluation['course']
        class_code = class_name[:class_name.find("-")].strip()
        quarter= evaluation['quarter']
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
        evaluation = Evaluation(class_code=class_code, quarter=quarter,instructor=instructor,
                                recommend_class=recommend_class,
                                recommend_instructor=recommend_instructor,
                                study_hours_per_week=study_hours_per_week,
                                avg_expected_grade=avg_expected_grade,
                                avg_grade_received=avg_grade_received)
        evaluations.append(evaluation)
    db.session.add_all(evaluations)
    db.session.commit()
    print ("--- %s seconds to create all evaluations ---" % (time.time() - start_time))