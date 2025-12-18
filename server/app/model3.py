import numpy as np
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd
import openai
import math
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

# Load the model
model = joblib.load(open('gest_diab_model.pkl', 'rb'))

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_chatgpt_comment(risk_factor, input_data, bmi):
    if bmi > 30:
        input_data['Weight_class'] = "very high"
    elif bmi > 25:
        input_data['Weight_class'] = "slightly above the normal"
    else:
        input_data['Weight_class'] = "optimal"
    
    
    input_data['Mother_Age_class'] = "Normal" if input_data['Mother_Age_class'] < 35 else "High"
    
    prompt = f"""
    Given the following data:
    - Mother's Age in the range of: {input_data['Mother_Age_class']}
    - Pre-Pregnancy Hypertension: {math.floor(float(input_data['pre_preg_hypertension']))}
    - Weight in kg is in the range of: {input_data['Weight_class']}
    - Family members with diabetes: {input_data['add']}
    
    The model predicts:
    - risk factor : {risk_factor}
    
    Please provide a very brief explanation in Egyptian Arabic(it's very important to do that specially Egyption) for the mother, focusing on the reasons for the prediction and also without using any latex make it about 2-3 lines without stating the numbers.
    if the risk factor is higher than (3) dont say congratulations.
    if the risk factor is (3) or lower, say congratulations mother!.
    adderess the user as a female as she is a mother.
    state that dr.nasser farahat and his medical team will be with her during the pregnancy proccess so dont worry and state the reasons.   
    """
    
    chat_completion = openai.ChatCompletion.create(
        model="gpt-4o-mini",  # or gpt-4 depending on your needs
        messages=[
            {"role": "system", "content": "You are an expert in maternal health."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=200,
        temperature=0.7
    )
    
    return chat_completion['choices'][0]['message']['content'].strip()

def calculate_risk_factor(output_value):
    if output_value <= 0.03:
        return 0
    elif output_value <= 0.06:
        return 1
    elif output_value <= 0.09:
        return 2
    elif output_value <= 0.12:
        return 3
    elif output_value <= 0.15:
        return 4
    elif output_value <= 0.18:
        return 5
    elif output_value <= 0.21:
        return 6
    else:
        return 7

def validate_data(data):
    required_fields = ['age', 'height', 'weight', 'prePregHypertension', 'add']
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            raise ValueError(f"Missing or invalid input: {field}")

@app.route('/predict3', methods=['POST'])
def predict3():
    data = request.json
    print(f"Received data: {data}")

    validate_data(data)
    
    mother_age_class = int(data['age'])
    height = float(data['height'])
    weight = float(data['weight'])
    pre_preg_hypertension = int(data['prePregHypertension'])
    add = int(data['add'])
    
    if height > 0:
        bmi = weight / ((height / 100) ** 2)
        bmi = round(bmi)
    else:
        raise ValueError("Height must be greater than zero")

    print(f"BMI: {bmi}")

    input_data = {
        'Mother_Age_class': mother_age_class,
        'pre_preg_hypertension': pre_preg_hypertension,
        'Hight_class': "Normal" if height < 170 else "High",
        'Weight_class': "Optimal",
        'add': add
    }
    
    input_array = pd.DataFrame([[
        mother_age_class,
        bmi,
        pre_preg_hypertension
    ]], columns=['mother_age_class', 'bmi', 'pre_preg_hypertension'])

    prediction = model.predict_proba(input_array)
    output_value = prediction[0][1]

    if add == 0:
        risk_factor = calculate_risk_factor(output_value)
    else:
        risk_factor = calculate_risk_factor(output_value) + 2

    chatgpt_comment = generate_chatgpt_comment(risk_factor, input_data, bmi)

    response = {
        'risk': risk_factor,
        'comment': chatgpt_comment
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
