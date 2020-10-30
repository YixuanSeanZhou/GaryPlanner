from flask_api import FlaskAPI
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask.cli import FlaskGroup
from flask_cors import CORS

app = FlaskAPI(__name__)
CORS(app)
app.secret_key = 'secret_key'
app.config.from_object("src.config.Config")
db = SQLAlchemy(app)
db.init_app(app)
db.create_all()
db.session.commit()
cli = FlaskGroup(app)
login_manager = LoginManager()
login_manager.init_app(app)
