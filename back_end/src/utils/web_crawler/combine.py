from ..catalog_process.plan_generation import generate_four_year_plan as gfyp
from ..catalog_process.plan_generation import load_catalog

from takenCourse import getNeededCourse as gnc
import json

def generate_benson_report():
    with open ('benson_dq.html', 'r') as file:
        benson_info = json.load(file)
    taken, needed, numge = gnc(benson_info)
