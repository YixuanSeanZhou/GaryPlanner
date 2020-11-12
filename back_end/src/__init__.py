from flask import jsonify

from .setup import app, login_manager

from .models.user import User

# -----------------------------------------------
# DO NOT EDIT ABOVE THE LINE

from .apis.user import user_api_bp as uapi
from .apis.four_year_plan import four_year_plan_api_bp as fypapi

app.register_blueprint(uapi, url_prefix="/api/users")
app.register_blueprint(fypapi, url_prefix="/api/four_year_plan")


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
