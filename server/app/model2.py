from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import logging
import openai  
import math
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
def generate_weight_comment(current_weight, lower_bound, upper_bound, weeks):
    prompt = f"""
                
            - current weight: {current_weight} kg
            - week of pregnancy: {weeks}
            The model predicts the following:
            - healthy upper bound weight: {upper_bound[weeks]} kg
            - healthy lower bound weight: {lower_bound[weeks]} kg
            - healthy range: {lower_bound[weeks]} - {upper_bound[weeks]} kg
    
    very breifly give an advice in Egyptian Arabic (it's very important to do that specially Egyption) do not use any latex in your response.
    if the current weight is between healthy upper bound weight and healthy lower bound weight then this is good for the mother health and encourage the good work and keeping it
    other wise if the current weight is heigher than healthy upper bound weight then give advice to reduce that weight to reach the healthy range
    finally if the current weight is lower than the healthy lower bound weight then give advice to increase the weight to reach the weight to reach the healty range
    you are talking to a mother so always congratulate the mother for the pregnancy saying congratulaions mom or mother.
    never say if just talk with confidance giving the numbers.
    state that dr.nasser farahat and his medical team will be with her during the pregnancy proccess so dont worry and state the reasons.   
    give some advice depending on the situation
    """

    # Call ChatGPT for response
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

@app.route('/predict2', methods=['POST'])
def predict2():
    try:
        app.logger.info('Received request data: %s', request.json)
        
        data = request.json
        height_cm = float(data['height_cm'])
        weight_before_kg = float(data['weight_before_kg'])
        current_weight_kg = float(data['current_weight_kg'])
        week_of_pregnancy = int(data['week_of_pregnancy'])
        is_twins = data['is_twins'].strip().lower()

        app.logger.debug('Parsed input values: height_cm=%f, weight_before_kg=%f, current_weight_kg=%f, week_of_pregnancy=%d, is_twins=%s', 
                         height_cm, weight_before_kg, current_weight_kg, week_of_pregnancy, is_twins)

        bmi = weight_before_kg / ((height_cm / 100) ** 2)

        if bmi < 18.5:
            category = "Underweight"
            weight_gain_range = (37, 54) if is_twins == 'yes' else (28, 40)
        elif 18.5 <= bmi < 24.9:
            category = "Normal Weight"
            weight_gain_range = (37, 54) if is_twins == 'yes' else (25, 35)
        elif 25.0 <= bmi < 29.9:
            category = "Overweight"
            weight_gain_range = (31, 50) if is_twins == 'yes' else (15, 25)
        else:
            category = "Obese"
            weight_gain_range = (25, 42) if is_twins == 'yes' else (11, 20)

        app.logger.debug('Calculated BMI: %f, Category: %s, Weight gain range: %s', bmi, category, str(weight_gain_range))

        weight_gain_range_kg = tuple(np.array(weight_gain_range) * 0.453592)

        weeks = list(range(41))
        lower_bound = []
        upper_bound = []

        for week in weeks:
            if week < 13:
                lower = weight_before_kg + ((0.5 / 13) * week)
                upper = weight_before_kg + ((2 / 13) * week)
            else:
                lower = weight_before_kg + (((0.5 / 13) * 13) + ((weight_gain_range_kg[0] - 0.5) / 27) * (week - 13))
                upper = weight_before_kg + ((2 / 13) * 13) + (((weight_gain_range_kg[1] - 2) / 27) * (week - 13))
            lower_bound.append(round(lower, 1))
            upper_bound.append(round(upper, 1))

        # Call the generate_weight_comment to get advice
        comment = generate_weight_comment(current_weight_kg, lower_bound, upper_bound, week_of_pregnancy)

        response_data = {
            'weeks': weeks,
            'lower_bound': lower_bound,
            'upper_bound': upper_bound,
            'category': category,
            'comment': comment
        }

        app.logger.info('Sending response: %s', str(response_data))
        
        return jsonify(response_data)

    except KeyError as e:
        app.logger.error('Missing key in request data: %s', str(e), exc_info=True)
        return jsonify({'error': f'Missing required field: {str(e)}'}), 400
    except ValueError as e:
        app.logger.error('Invalid value in request data: %s', str(e), exc_info=True)
        return jsonify({'error': f'Invalid value: {str(e)}'}), 400
    except Exception as e:
        app.logger.error('An error occurred: %s', str(e), exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

    
