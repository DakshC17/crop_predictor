import pandas as pd
import joblib
import os

# Paths
MODEL_PATH = "models/crop_prediction_model.pkl"
ENCODER_DIR = "models/encoders"

# Load model
model = joblib.load(MODEL_PATH)

# Load encoders
encoders = {
    "State_Name": joblib.load(os.path.join(ENCODER_DIR, "State_Name_encoder.pkl")),
    "District_Name": joblib.load(os.path.join(ENCODER_DIR, "District_Name_encoder.pkl")),
    "Season": joblib.load(os.path.join(ENCODER_DIR, "Season_encoder.pkl")),
    "Crop": joblib.load(os.path.join(ENCODER_DIR, "Crop_encoder.pkl")),
}

# Function to predict crop
def predict_crop(input_data: dict) -> str:
    # Expected keys: State_Name, District_Name, Crop_Year, Season, Area, N, P, K, temperature, humidity, ph, rainfall
    df = pd.DataFrame([input_data])

    # Encode categorical inputs
    for col in ['State_Name', 'District_Name', 'Season']:
        df[col] = encoders[col].transform(df[col])

    # Predict
    prediction = model.predict(df)[0]

    # Decode crop label
    predicted_crop = encoders["Crop"].inverse_transform([prediction])[0]

    return predicted_crop

# Example usage
if __name__ == "__main__":
    sample_input = {
        "State_Name": "Punjab",
        "District_Name": "Jalandhar",
        "Crop_Year": 2023,
        "Season": "Rabi",
        "Area": 2.5,
        "N": 92,
        "P": 42,
        "K": 43,
        "temperature": 29.4,
        "humidity": 90.0,
        "ph": 6.5,
        "rainfall": 253.0,
    }

    result = predict_crop(sample_input)
    print("Predicted Crop:", result)
