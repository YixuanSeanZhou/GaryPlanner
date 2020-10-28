from flask import jsonify

from .apis.user import user_api_bp as uapi

from .setup import app

app.register_blueprint(uapi, url_prefix="/api/users")


@app.route("/")
def hello_world():
    return jsonify({'gary': 'planner'}), 200
