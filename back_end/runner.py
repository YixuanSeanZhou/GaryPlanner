from flask_cors import CORS
from src.setup import app, cli, db
from src.utils.catalog_process.preprocess import get_info_from_catalog
from src.utils.catalog_process.prereq_graph import generate_prereq_graph
from initiate_db import add_evals_to_db, add_classes_to_db
import nltk


nltk.download('wordnet')
nltk.download('punkt')


@cli.command("create_db")
def create_db():
    # db.drop_all()
    db.create_all()
    db.session.commit()
<<<<<<< HEAD
    # test()
    add_classes_to_db()
    add_evals_to_db()
=======
    test()
    # add_classes_to_db()
    # add_evals_to_db()
    
>>>>>>> 63f4cba09b4bd10e6d9265ffd0bbf58f24ab26eb


def test():
    raw = get_info_from_catalog("https://www.ucsd.edu/catalog/courses/CSE.html")
    generate_prereq_graph(raw, 'cse.pdf')


if __name__ == "__main__":
    CORS(app)
    cli()
