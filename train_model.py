import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# Paths
DATA_PATH = "/home/dakshchoudhary/Desktop/projects/crop_predictor/data/final_combined_dataset.csv"
MODEL_DIR = "models"
ENCODER_DIR = os.path.join(MODEL_DIR, "encoders")
os.makedirs(ENCODER_DIR, exist_ok=True)

# Load the dataset
df = pd.read_csv(DATA_PATH)

# Features and target
features = ['State_Name', 'District_Name', 'Crop_Year', 'Season', 'Area',
            'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
target = 'Crop'

# Encode categorical columns
categorical_cols = ['State_Name', 'District_Name', 'Season']
encoders = {}

for col in categorical_cols + [target]:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col])
    encoders[col] = encoder
    joblib.dump(encoder, f"{ENCODER_DIR}/{col}_encoder.pkl")

# Split data
X = df[features]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Train optimized Random Forest (no GridSearch)
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=20,
    min_samples_split=5,
    min_samples_leaf=2,
    max_features='sqrt',
    bootstrap=True,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("📊 Classification Report:\n", classification_report(y_test, y_pred))
print("✅ Accuracy Score:", accuracy_score(y_test, y_pred))

# Save model
joblib.dump(model, f"{MODEL_DIR}/crop_prediction_model.pkl")
print(f"💾 Model saved to: {MODEL_DIR}/crop_prediction_model.pkl")

## this is a new comment
