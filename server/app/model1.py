from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import numpy as np
import pandas as pd
import openai  
from dotenv import load_dotenv
import os
import math

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load(open('labor_tree_model_final.pkl', 'rb'))

# Configure OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_chatgpt_comment(prediction_percentages, input_data):
    bmi = input_data['Weight_class']/(input_data['Hight_class'] * input_data['Hight_class']) * 10000
    if bmi > 30:
        input_data['Weight_class'] = "very high"
    elif bmi > 25:
        input_data['Weight_class'] = "Slightly above the normal"
    else:
        input_data['Weight-class'] = "Optimal"
    input_data['Mother_Age_class'] = "Normal" if input_data['Mother_Age_class'] < 35 else "High"
    prompt = f"""
    Given the following data:
    - Mother's Age in the range of: {input_data['Mother_Age_class']}
    - Pre-Pregnancy Diabetes: {input_data['Pre_Preg_Diabetes']}
    - Pre-Pregnancy Hypertension: {math.floor(float(input_data['pre_preg_hypertension']))}
    - Number of Previous Cesareans: {math.floor(float(input_data['Number_prev_ceserean']))}
    - Height in cm is in the range of: {input_data['Hight_class']}
    - Weight in kg is in the range of: {input_data['Weight_class']}
    
    The model predicts:
    - Normal Delivery: {math.floor(round(prediction_percentages[0]))}%
    - Cesarean: {math.floor(round(prediction_percentages[1]))}%
    
    Please provide a very brief explanation in Egyption Arabic (it's very important to do that specially Egyption) for the mother without scaring her, focusing on the reasons for the prediction and if normal delivery is less than 80 and dont refer to the number, you should state why is that and also without using any latex make it about 2-3 lines.
    state that dr.nasser farahat and his medical team will be with her during the pregnancy proccess so dont worry and state the reasons.   
    conselidate the mother if the Cesarean is higher than 30, this is so improtant so we dont misslead the mother and u can say dont worry every thing is under control (other wise congratulate her), and dont refer to the number.
    allways refer to the user as mama , mother with congrats if the (Cesarean) is lower than 40 other wise conseledate her dont congratulte her
    its a female so always refer to her as a female
    conselidate the mother if the Cesarean is higher than 40 and dont congratulate her!, this is so improtant so we dont misslead the mother and u can say dont worry every thing is under control (other wise congratulate her), and dont refer to the number

    """

    # Using the newer method to create a chat completion
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

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Extract features from the request data
    Mother_Age_class = data.get('age')
    Pre_Preg_Diabetes = data.get('prePregDiabetes')
    pre_preg_hypertension = data.get('prePregHypertension')
    Number_prev_ceserean = data.get('numPrevCesarean')
    Hight_class = data.get('heightClass')
    Weight_class = data.get('weightClass')
    print(Hight_class)
    input_data = pd.DataFrame([[
        Mother_Age_class,
        Pre_Preg_Diabetes,
        pre_preg_hypertension,
        Number_prev_ceserean,
        Hight_class,
        Weight_class
    ]], columns=['Mother_Age_class', 'Pre_Preg_Diabetes', 'pre_preg_hypertension', 'Number_prev_ceserean', 'Hight_class', 'Weight_class'])

    # Use the model to make a prediction
    prediction = model.predict_proba(input_data)
    prediction_percentages = (prediction * 100).tolist()[0]
    age = 0
    Height = 0
    weight = 0
    if Mother_Age_class == '3':
        age = 20
    if Mother_Age_class == '4':
        age = 27
    if Mother_Age_class == '5':
        age = 32
    if Mother_Age_class == '6':
        age = 37
    if Mother_Age_class == '7':
        age = 42
    if Mother_Age_class == '8':
        age = 47
    if Hight_class == '1':
        Height = 140
    if Hight_class == '2':
        Height = 170
    if Hight_class == '3':
        Height = 190
    if Weight_class == '1':
        weight = 40
    if Weight_class == '2':
        weight = 60
    if Weight_class == '3':
        weight = 80
    if Weight_class == '4':
        weight = 100

    
    comment = generate_chatgpt_comment(prediction_percentages, {
        'Mother_Age_class': age,
        'Pre_Preg_Diabetes': Pre_Preg_Diabetes,
        'pre_preg_hypertension': pre_preg_hypertension,
        'Number_prev_ceserean': Number_prev_ceserean,
        'Hight_class': Height,
        'Weight_class': weight
    })
    response = {
        'normal_delivery_percentage': round(prediction_percentages[0]),
        'c_section_percentage': round(prediction_percentages[1]),
        'comment': comment
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
