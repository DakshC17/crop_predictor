import pandas as pd
import joblib
import os
import matplotlib.pyplot as plt

# Paths
MODEL_PATH = "models/crop_prediction_model.pkl"
ENCODER_DIR = "models/encoders"
OUTPUT_DIR = "outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load model
model = joblib.load(MODEL_PATH)

# Load encoders
encoders = {
    "State_Name": joblib.load(os.path.join(ENCODER_DIR, "State_Name_encoder.pkl")),
    "District_Name": joblib.load(os.path.join(ENCODER_DIR, "District_Name_encoder.pkl")),
    "Season": joblib.load(os.path.join(ENCODER_DIR, "Season_encoder.pkl")),
    "Crop": joblib.load(os.path.join(ENCODER_DIR, "Crop_encoder.pkl")),
}

# Function to predict crop with confidence
def predict_crop(input_data: dict) -> dict:
    df = pd.DataFrame([input_data])

    # Encode categorical inputs
    for col in ['State_Name', 'District_Name', 'Season']:
        df[col] = encoders[col].transform(df[col])

    # Predict and get probabilities
    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]
    confidence = max(probabilities) * 100  # convert to percentage

    # Decode crop label
    predicted_crop = encoders["Crop"].inverse_transform([prediction])[0]

    return {
        "predicted_crop": predicted_crop,
        "confidence": round(confidence, 2)
    }

# Function to plot input parameters
def plot_input_features(input_data: dict, predicted_crop: str):
    keys_to_plot = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    values = [input_data[key] for key in keys_to_plot]

    plt.figure(figsize=(10, 5))
    bars = plt.bar(keys_to_plot, values, color='mediumseagreen')
    plt.title(f"🌾 Input Feature Chart for: {predicted_crop}", fontsize=14)
    plt.ylabel("Value")
    plt.grid(axis='y', linestyle='--', alpha=0.7)

    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width() / 2, height + 1, f"{height:.1f}",
                 ha='center', va='bottom', fontsize=9)

    plt.tight_layout()
    chart_path = os.path.join(OUTPUT_DIR, "crop_input_chart.png")
    plt.savefig(chart_path)
    plt.close()
    return chart_path

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

    print("🌱 Predicted Crop:", result["predicted_crop"])
    print("🔒 Confidence Score:", result["confidence"], "%")

    # Plot input chart
    chart_file = plot_input_features(sample_input, result["predicted_crop"])
    print(f"📊 Input chart saved to: {chart_file}")

