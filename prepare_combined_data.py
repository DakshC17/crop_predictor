import pandas as pd
import os

# Create data directory if not exists
DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

# Load datasets
df_production = pd.read_csv(f"{DATA_DIR}/cleaned_crop_data.csv")
df_recommend = pd.read_csv(f"{DATA_DIR}/Crop_recommendation.csv")
df_core = pd.read_csv(f"{DATA_DIR}/data_core.csv")

# Clean column names
df_production.columns = df_production.columns.str.strip().str.replace(" ", "_")
df_core.columns = df_core.columns.str.strip().str.replace(" ", "_")
df_recommend.columns = df_recommend.columns.str.strip().str.replace(" ", "_")

# Rename 'label' to 'Crop' in recommendation dataset
if "label" in df_recommend.columns:
    df_recommend = df_recommend.rename(columns={"label": "Crop"})

# Clean and normalize Crop column where available
df_production['Crop'] = df_production['Crop'].str.strip().str.lower()
df_recommend['Crop'] = df_recommend['Crop'].str.strip().str.lower()

# Clean df_core['Crop'] only if it exists
if 'Crop' in df_core.columns:
    df_core['Crop'] = df_core['Crop'].str.strip().str.lower()

# Keep only needed columns from production
df_production = df_production[[
    "State_Name", "District_Name", "Crop_Year", "Season", "Crop", "Area", "Production"
]]
df_production = df_production.dropna(subset=["Production"])
df_production = df_production[df_production["Area"] > 0]

# Merge production with core if possible
if "Crop" in df_core.columns:
    df_combined = pd.merge(df_production, df_core, on="Crop", how="inner")
else:
    df_combined = df_production.copy()

# Merge with crop recommendation data
df_final = pd.merge(df_combined, df_recommend, on="Crop", how="inner")

# Save final combined dataset
combined_path = f"{DATA_DIR}/final_combined_dataset.csv"
df_final.to_csv(combined_path, index=False)

# Output results
print(f"✅ Combined dataset saved to: {combined_path}")
print(f"🔢 Final shape: {df_final.shape}")
print(f"🧾 Columns: {list(df_final.columns)}")
