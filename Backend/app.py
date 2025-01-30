# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from PIL import Image
# import torchvision.transforms.functional as TF
# import CNN
# import numpy as np
# import torch
# import pandas as pd
# import google.generativeai as genai

# genai.configure(api_key="AIzaSyCjPtph2f8acbwEl5f9UfuPcZEaA-B4WMo")
# prompt="""
#    You are an expert agronomist and AI system trained to analyze plant diseases and recommend the best treatment methods. Given the name of a plant disease, provide a detailed analysis covering the following aspects:

# 1. Disease Overview:
# Identify the crop(s) affected.
# Provide a scientific explanation of the disease.
# Explain how the disease spreads and its root cause.
# 2. Symptoms and Effects:
# Describe how the disease affects the plant at different stages.
# Explain visible symptoms such as discoloration, spots, stunted growth, or wilting.
# Detail how the disease impacts crop yield and quality.
# 3. Recommended Treatments:
# Fertilizers: Suggest suitable fertilizers (including composition and dosage) to improve plant health.
# Pesticides/Fungicides: Recommend the most effective chemical and organic solutions for disease control.
# Natural Remedies: Provide eco-friendly and organic treatments, such as neem oil, baking soda solutions, or microbial treatments.
# 4. Preventive Measures:
# Outline best practices to prevent the disease, such as crop rotation, proper irrigation, and resistant crop varieties.
# Suggest soil and plant management techniques to reduce disease occurrence.
# 5. Additional Insights:
# Highlight any environmental factors that contribute to the disease.
# Mention if the disease is more prevalent in certain climates or regions.
# Example Input: "Powdery Mildew in Cucumbers"

# Example Output:

# Disease Name: Powdery Mildew in Cucumbers
# Scientific Explanation: Powdery mildew is caused by the fungus Podosphaera xanthii. It spreads through airborne spores and thrives in warm, dry conditions. The disease weakens plants by disrupting photosynthesis.

# Symptoms & Effects:

# White powdery spots on leaves, stems, and fruits.
# Leaves may turn yellow and curl.
# Reduced fruit yield and quality.
# Recommended Treatments:

# Fertilizer: Use a potassium-rich fertilizer (e.g., 10-20-10) to strengthen plant immunity. Apply 2-3 pounds per 100 sq. ft.
# Pesticide/Fungicide: Spray sulfur-based or copper-based fungicides every 7–10 days.
# Natural Solution: Apply a milk-water solution (1:9 ratio) or neem oil spray twice a week.
# Preventive Measures:

# Ensure proper spacing between plants for air circulation.
# Avoid overhead watering to reduce humidity.
# Rotate crops to prevent fungal buildup.
# Additional Insights:

# Powdery mildew is common in dry, warm climates.
# Using resistant cucumber varieties can significantly reduce the risk.
  

# . Give response in Kannada
# """ 

# disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
# supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')

# # Load model
# model = CNN.CNN(39)
# model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
# model.eval()

# def predict(image_path):
#     image = Image.open(image_path)
#     image = image.resize((224, 224))
#     input_data = TF.to_tensor(image).unsqueeze(0)
#     output = model(input_data)
#     output = output.detach().numpy()
#     index = np.argmax(output)
#     return index

# app = Flask(__name__)
# CORS(app)  

# @app.route('/predict', methods=['POST'])
# def predict_disease():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image provided'}), 400
    
#     image = request.files['image']
#     filename = image.filename
#     file_path = os.path.join('static/uploads', filename)
#     image.save(file_path)
    
#     pred = predict(file_path)
    
#     response = {
#         'title': disease_info['disease_name'][pred],
#         'description': disease_info['description'][pred],
#         'preventive_measures': disease_info['Possible Steps'][pred],
        
#         'supplement': {
#             'name': supplement_info['supplement name'][pred],
#             'image_url': supplement_info['supplement image'][pred],
#             'buy_link': supplement_info['buy link'][pred]
#         }
#     }
    
#     return jsonify(response)


# @app.route('/analysis', methods=['GET'])
# def analysis():
#     disease_data="black rot disease in apple plant"
#     model=genai.GenerativeModel('gemini-1.5-flash')
#     res=model.generate_content([disease_data,prompt])
    
#     response={
#         'description':res.text
#     } 
#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)



 
 
 
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd
import google.generativeai as genai # type: ignore
import pickle
# Configure Google Gemini API
genai.configure(api_key="AIzaSyCjPtph2f8acbwEl5f9UfuPcZEaA-B4WMo")

# Load disease and supplement data
disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')
# Load the CNN model
model = CNN.CNN(39)
model.load_state_dict(torch.load("./models/plant_disease_model_1_latest.pt"))
model.eval()

# Function to predict disease from an image
def predict(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image).unsqueeze(0)
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

app = Flask(__name__)
CORS(app)  

@app.route('/predict', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    filename = image.filename
    file_path = os.path.join('static/uploads', filename)
    image.save(file_path)
    
    pred = predict(file_path)
    
    response = {
        'title': disease_info['disease_name'][pred],
        'description': disease_info['description'][pred],
        'preventive_measures': disease_info['Possible Steps'][pred],
        
        'supplement': {
            'name': supplement_info['supplement name'][pred],
            'image_url': supplement_info['supplement image'][pred],
            'buy_link': supplement_info['buy link'][pred]
        }
    }
    
    return jsonify(response)

@app.route('/analysis', methods=['POST'])
def analysis():
    data = request.json
    print(data)
    disease_name = data.get("disease_name", "")
    language = data.get("language", "en")   
    print(language)
    # Define language-based prompt modifications
    language_prompts = {
        "en": "Give response in English",
        "kn": "Give response in Kannada",
        "hi": "Give response in Hindi",
        "te": "Give response in Telugu",
        "ta": "Give response in Tamil",
        "mr": "Give response in Marathi",
        "ml": "Give response in Malayalam"
    }

    # Construct the dynamic prompt
    prompt = f"""
    You are an expert agronomist and AI system trained to analyze plant diseases and recommend the best treatment methods in regional languages of India. Given the name of a plant disease, provide a detailed analysis covering the following aspects:

    1. Disease Overview:
    - Identify the crop(s) affected.
    - Provide a scientific explanation of the disease.
    - Explain how the disease spreads and its root cause.

    2. Symptoms and Effects:
    - Describe how the disease affects the plant at different stages.
    - Explain visible symptoms such as discoloration, spots, stunted growth, or wilting.
    - Detail how the disease impacts crop yield and quality.

    3. Recommended Treatments:
    - Fertilizers: Suggest suitable fertilizers (including composition and dosage) to improve plant health.
    - Pesticides/Fungicides: Recommend the most effective chemical and organic solutions for disease control.
    - Natural Remedies: Provide eco-friendly and organic treatments, such as neem oil, baking soda solutions, or microbial treatments.

    4. Preventive Measures:
    - Outline best practices to prevent the disease, such as crop rotation, proper irrigation, and resistant crop varieties.
    - Suggest soil and plant management techniques to reduce disease occurrence.

    5. Additional Insights:
    - Highlight any environmental factors that contribute to the disease.
    - Mention if the disease is more prevalent in certain climates or regions.
     Note you have to  respond in requested language
    {language_prompts.get(language, 'Give response in English')}
    """
    print(prompt)
     
    model = genai.GenerativeModel('gemini-1.5-flash')
    res = model.generate_content([disease_name, prompt])
    
    response = {
        'description': res.text
    } 
    return jsonify(response)
# #######################################################################
recommend = pickle.load(open('./models/croprec.pkl','rb'))
sc = pickle.load(open('./models/standscaler.pkl','rb'))
ms = pickle.load(open('./models/minmaxscaler.pkl','rb'))

@app.route("/recommend", methods=['POST'])
def recoommend():
    # Getting JSON data from the request
    data = request.get_json()

    N = data['Nitrogen']
    P = data['Phosphorus']
    K = data['Potassium']
    temp = data['Temperature']
    humidity = data['Humidity']
    ph = data['Ph']
    rainfall = data['Rainfall']

    # Feature list and transformation
    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    # Scaling features
    scaled_features = ms.transform(single_pred)
    final_features = sc.transform(scaled_features)
    
    # Predicting the crop
    prediction = recommend.predict(final_features)

    crop_dict = {
        1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
        8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
        14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
        19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
    }

    # Return the result as a response
    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = {"crop": crop, "message": f"{crop} is the best crop to be cultivated right there"}
    else:
        result = {"error": "Sorry, we could not determine the best crop to be cultivated with the provided data."}
    return jsonify(result)

#########################################################################################
cropyield= pickle.load(open('./models/yield.pkl','rb'))  
le_crop = pickle.load(open('./models/crop_encoder.pkl','rb')) 
le_season = pickle.load(open('./models/season_encoder.pkl','rb')) 
le_state = pickle.load(open('./models/state_encoder.pkl','rb')) 

@app.route('/yield', methods=['POST'])
def crop_yield():
    data = request.get_json()

    # Extract features from the incoming request
    Crop = data['Crop']
    Season = data['Season']
    State = data['State']
    Area = data['Area']
    Annual_Rainfall = data['Annual_Rainfall']
    Fertilizer = data['Fertilizer']
    Pesticide = data['Pesticide']

    # Process the features through the recommendation function
    Crop = le_crop.transform([Crop])[0]
    Season = le_season.transform([Season])[0]
    State = le_state.transform([State])[0]
    features = np.array([[Crop, Season, State, Area, Annual_Rainfall, Fertilizer, Pesticide]])

    # Predict the output
    prediction = cropyield.predict(features).reshape(1, -1)

    # Return the prediction as a response
    return jsonify({'prediction': prediction[0][0]})
###############################################################################
irrigation=pickle.load(open("./models/irrigation.pkl","rb"))
@app.route('/irrigation', methods=['POST'])
def sirrigation():
    # Get data from request
    data = request.get_json()

    try:
        Crop = data['Crop']
        N = data['N']
        P = data['P']
        K = data['K']
        Moisture = data['Moisture']
        Temperature = data['Temperature']
        pH = data['pH']

        
        features = np.array([[Crop, N, P, K, Moisture, Temperature, pH]])
        predict = irrigation.predict(features).reshape(1, -1)
        predicted_value = int(predict[0]) 
        if predicted_value :
            state = "On"
            return jsonify({'state': state})
        elif predicted_value ==0:
            state = "Off"
            return jsonify({"state": state})
        else:
            return jsonify({'error': 'No data available'}), 500
    except KeyError as e:
        return jsonify({'error': f'Missing parameter: {str(e)}'}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
