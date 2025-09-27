import numpy as np
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd
import openai
import math

app = Flask(__name__)
CORS(app)

model = joblib.load(open('gest_hypertension_model_class.pkl', 'rb'))

openai.api_key = "***********************************************"

def generate_chatgpt_comment(risk_factor, input_data, bmi):
    if bmi > 30:
        input_data['Weight_class'] = "very high"
    elif bmi > 25:
        input_data['Weight_class'] = "slightly above the normal"
    else:
        input_data['Weight_class'] = "optimal"
    
    input_data['Mother_Age_class'] = "Normal" if input_data['Mother_Age_class'] < 7 else "High"
    
    prompt = f"""
    Given the following data:
    - Mother's Age in the range of: {input_data['Mother_Age_class']}
    - Pre-Pregnancy diabetes: {math.floor(float(input_data['prev_diab']))}
    - Weight in kg is in the range of: {input_data['Weight_class']}
    
    The model predicts:
    - risk factor : {risk_factor}
    
    Please provide a very brief explanation in Egyptian Arabic(it's very important to do that specially Egyption) for the mother, focusing on the reasons for the prediction and also without using any latex make it about 2-3 lines without stating the numbers.
    if the risk factor is higher than (2) dont say congratulations.
    if the risk factor is (2) or lower, say congratulations mother!.
    adderess the user as a female.
    state that dr.nasser farahat and his medical team will be with her during the pregnancy proccess so dont worry and state the reasons.   
    """
    
    chat_completion = openai.ChatCompletion.create(
        model="gpt-4o-mini", 
        messages=[
            {"role": "system", "content": "You are an expert in maternal health."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=200,
        temperature=0.7
    )
    
    return chat_completion['choices'][0]['message']['content'].strip()

def calculate_risk_factor(output_value):
    if output_value <= 0.05:
        return 0
    elif output_value <= 0.08:
        return 1
    elif output_value <= 0.11:
        return 2
    elif output_value <= 0.14:
        return 3
    elif output_value <= 0.17:
        return 4
    else:
        return 5

def validate_data(data):
    required_fields = ['age', 'height', 'weight']
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            raise ValueError(f"Missing or invalid input: {field}")

@app.route('/predict4', methods=['POST'])
def predict4():
    data = request.json
    print(f"Received data: {data}")  

    validate_data(data)  
    
    mother_age_class = int(data['age'])
    height = float(data['height'])  
    weight = float(data['weight']) 
    pre_diab = int(data['pre_diab'])
    
    if height > 0:  
        bmi = weight / ((height / 100) ** 2)
        bmi = round(bmi)
    else:
        raise ValueError("Height must be greater than zero")
    
    # Create input_data for ChatGPT
    input_data = {
        'Mother_Age_class': mother_age_class,
        'prev_diab': pre_diab
    }

    input_array = pd.DataFrame([[
        mother_age_class,
        bmi,
        pre_diab,
    ]], columns=['mager9', 'bmi', 'pre_diab'])

    prediction = model.predict_proba(input_array)
    output_value = prediction[0][1]
    
    risk_factor = calculate_risk_factor(output_value)
    comment = generate_chatgpt_comment(risk_factor, input_data, bmi)
    
    response = {
        'risk': risk_factor,
        'comment': comment
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
