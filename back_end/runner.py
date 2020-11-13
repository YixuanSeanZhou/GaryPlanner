from src.setup import cli, db, app
from src.utils.catalog_process.preprocess import get_info_from_catalog
from src.utils.catalog_process.prereq_graph import generate_prereq_graph
import nltk
nltk.download('wordnet')
nltk.download('punkt')

from flask_api import FlaskAPI
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask.cli import FlaskGroup
from flask_cors import CORS




from selenium.webdriver.chrome.options import Options
from selenium import webdriver


def set_chrome_options() -> None:
    """Sets chrome options for Selenium.
    Chrome options for headless browser is enabled.
    """
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_prefs = {}
    chrome_options.experimental_options["prefs"] = chrome_prefs
    chrome_prefs["profile.default_content_settings"] = {"images": 2}
    return chrome_options


@cli.command("create_db")
def create_db():
    # db_DropEverything(db)
    db.create_all()
    db.session.commit()
    # test()
    chrome_options = set_chrome_options()
    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    driver.get("https://ucsd.edu/")
    e = driver.find_element_by_class_name("col-md-6")
    print(e.text)
    # Do stuff with your driver
    driver.close()


def test(): 
    raw = get_info_from_catalog("https://www.ucsd.edu/catalog/courses/CSE.html")
    generate_prereq_graph(raw, 'cse.pdf')


if __name__ == "__main__":
    cli()
