from src.setup import app, cli, db
from src.utils.catalog_process.preprocess import get_info_from_catalog
from src.utils.catalog_process.prereq_graph import generate_prereq_graph
import nltk
nltk.download('wordnet')
nltk.download('punkt')


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    test()


def test():
    raw = get_info_from_catalog("https://www.ucsd.edu/catalog/courses/CSE.html")
    generate_prereq_graph(raw, 'cse.pdf')


if __name__ == "__main__":
    cli()
