from fastapi import FastAPI, Query
import pandas as pd
import joblib
import os
from fastapi.middleware.cors import CORSMiddleware
import pydantic as py


app = FastAPI()

# Load model and encoders
model = joblib.load("models/crop_prediction_model.pkl")
encoders = {
    name: joblib.load(os.path.join("models/encoders", f"{name}_encoder.pkl"))
    for name in ["State_Name", "District_Name", "Season", "Crop"]
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # You can restrict to ["http://localhost:3000"] for safety
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/predict")
def predict_crop(
    State_Name: str,
    District_Name: str,
    Crop_Year: int,
    Season: str,
    Area: float,
    N: int,
    P: int,
    K: int,
    temperature: float,
    humidity: float,
    ph: float,
    rainfall: float,
):
    data = pd.DataFrame([{
        "State_Name": State_Name,
        "District_Name": District_Name,
        "Crop_Year": Crop_Year,
        "Season": Season,
        "Area": Area,
        "N": N,
        "P": P,
        "K": K,
        "temperature": temperature,
        "humidity": humidity,
        "ph": ph,
        "rainfall": rainfall,
    }])
    
    for col in ['State_Name', 'District_Name', 'Season']:
        data[col] = encoders[col].transform(data[col])

    pred = model.predict(data)[0]
    crop = encoders["Crop"].inverse_transform([pred])[0]
    return {"predicted_crop": crop}
