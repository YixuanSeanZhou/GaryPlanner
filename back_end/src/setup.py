from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask.cli import FlaskGroup
from flask_cors import CORS

app = FlaskAPI(__name__)
CORS(app)
app.config.from_object("src.config.Config")
db = SQLAlchemy(app)
cli = FlaskGroup(app)


