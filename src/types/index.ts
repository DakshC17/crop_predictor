export type SoilType = 
  | 'Clay'
  | 'Sandy'
  | 'Loamy'
  | 'Silty'
  | 'Peaty'
  | 'Chalky'
  | 'Saline';

export type WeatherCondition = 
  | 'Sunny'
  | 'Cloudy'
  | 'Rainy'
  | 'Stormy'
  | 'Windy'
  | 'Snowy'
  | 'Foggy';

export type PredictionInput = {
  soil: SoilType;
  location: string;
  temperature: number;
  weather: WeatherCondition;
};

export type CropSuggestion = {
  name: string;
  confidence: number;
  seasonality: string;
  waterRequirements: 'Low' | 'Medium' | 'High';
  growthDuration: string;
};

export type PredictionResult = {
  recommendations: CropSuggestion[];
  idealPlantingTime: string;
  soilSuitability: number;
  additionalNotes?: string;
};