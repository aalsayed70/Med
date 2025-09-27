from flask import Blueprint, request, jsonify
from .model1 import predict as predict_model1
from .model3 import predict3 as predict_model3
from .model2 import predict2 as predict_model2
from .model4 import predict4 as predict_model4


# Create a Blueprint for routes
routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET'])
def home():
    return "Welcome to the API"

@routes.route('/predict', methods=['POST'])
def predict1():
    """Route for model1 predictions."""
    return predict_model1()

@routes.route('/predict2', methods=['POST'])
def predict2():
    """Route for model2 predictions."""
    return predict_model2()
@routes.route('/predict3', methods=['POST'])
def predict3():
    """Route for model3 predictions."""
    return predict_model3()
@routes.route('/predict4', methods=['POST'])
def predict4():
    return predict_model4()


