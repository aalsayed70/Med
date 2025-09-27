from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Set up CORS
    CORS(app)

    # Register blueprints
    from app.routes import routes
    app.register_blueprint(routes)

    return app

