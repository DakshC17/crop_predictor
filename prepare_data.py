import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import joblib
import os

# Step 1: Load cleaned dataset
# Hum apna cleaned crop production dataset yahan load kar rahe hain
data_path = "/home/dakshchoudhary/Desktop/projects/crop_predictor/data/cleaned_crop_data.csv"
df = pd.read_csv(data_path)

# Step 2: Encode categorical columns
# Machine learning models ko strings samajh nahi aate, isliye hum categorical values ko numeric mein convert kar rahe hain
categorical_cols = ['State_Name', 'District_Name', 'Season', 'Crop']
encoders = {}  # To store label encoders for each column
encoder_dir = "models/label_encoders"
os.makedirs(encoder_dir, exist_ok=True)  # Create directory if not already present

for col in categorical_cols:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col])  # Convert categories to numbers
    encoders[col] = encoder
    joblib.dump(encoder, os.path.join(encoder_dir, f"{col.lower()}_encoder.pkl"))  # Save each encoder

# Step 3: Define features and target
# Features (input variables) and target (output variable) ko define karna
X = df[['State_Name', 'District_Name', 'Season', 'Crop', 'Area']]  # Input features
y = df['Production']  # Target variable (what we want to predict)

# Step 4: Split into training and testing sets
# Training ke liye 80% data aur testing ke liye 20% data split kar rahe hain
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Optional: Save splits if needed
# In lines ko uncomment karo agar aap train/test data ko alag files mein save karna chahte ho
# X_train.to_csv("data/X_train.csv", index=False)
# X_test.to_csv("data/X_test.csv", index=False)
# y_train.to_csv("data/y_train.csv", index=False)
# y_test.to_csv("data/y_test.csv", index=False)

# Final message to confirm everything is done
print("✅ Data preparation complete. Label encoders saved to 'models/label_encoders'.")
