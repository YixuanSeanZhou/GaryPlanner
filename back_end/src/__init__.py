from flask import jsonify

from .setup import app, login_manager

from .models.user import User

# -----------------------------------------------
# DO NOT EDIT ABOVE THE LINE

from .apis.user import user_api_bp as uapi
from .apis.four_year_plan import four_year_plan_api_bp as fypapi
from .apis.requirements import requirements_api_bp as reqapi
from .apis.friend import friend_api_bp as faip
from .apis.all_classes import all_classes_api_bp as acapi
from .apis.major import major_api_bp as mapi
from .apis.minor import minor_api_bp as minor_api

app.register_blueprint(uapi, url_prefix="/api/users")
app.register_blueprint(fypapi, url_prefix="/api/four_year_plan")
app.register_blueprint(reqapi, url_prefix="/api/requirements")
app.register_blueprint(faip, url_prefix="/api/friends")
app.register_blueprint(acapi, url_prefix="/api/all_classes")
app.register_blueprint(mapi, url_prefix="/api/majors")
app.register_blueprint(minor_api, url_prefix="/api/minors")


@app.route("/")
def hello_world():
    return jsonify({'gary': 'planner'}), 200


# DO NOT EDIT BELOW THE LINE
# -----------------------------------------------
@login_manager.user_loader
def load_user(user_id):
    '''
    Function used to be a default loader for flask login.
    '''
    return User.get_user_by_id(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    '''
    Function used to turn down people who aren't logged in trying to
    access routes that are locked down.
    '''
    return jsonify({'reason': "Not logged in!"}), 403
