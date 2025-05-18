import pandas as pd

# Load the raw crop production dataset (CSV file)
df = pd.read_csv("/home/dakshchoudhary/Desktop/projects/crop_predictor/data/Crop Production data.csv")

# Keep only the relevant columns we need for prediction and analysis
df = df[['State_Name', 'District_Name', 'Season', 'Crop_Year', 'Crop', 'Area', 'Production']]

# Remove rows where production is missing (NaN values)
df = df.dropna(subset=['Production'])

# Filter out records where area is zero or negative (invalid cases hata rahe hain yahan)
df = df[df['Area'] > 0]

# Remove extreme outliers in Area and Production to clean the data
df = df[(df['Area'] < 1e6) & (df['Production'] < 1e7)]

# Clean the text fields: remove extra spaces and convert to proper title case (jaise "rice" → "Rice")
df['State_Name'] = df['State_Name'].str.strip().str.title()
df['District_Name'] = df['District_Name'].str.strip().str.title()
df['Season'] = df['Season'].str.strip().str.title()
df['Crop'] = df['Crop'].str.strip().str.title()

# Save the cleaned dataset to a new CSV file for model training (ab ye clean version use hoga training mein)
df.to_csv("/home/dakshchoudhary/Desktop/projects/crop_predictor/data/cleaned_crop_data.csv", index=False)



#this data consist of around 14 rows and 1 columns 

