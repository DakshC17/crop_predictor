import { CropSuggestion, PredictionInput, PredictionResult } from '../types';

// Mock data for demonstration purposes
export const soilDescriptions = {
  Clay: 'Heavy, nutrient-rich soil that retains water well',
  Sandy: 'Light soil that drains quickly and warms up fast in spring',
  Loamy: 'Perfect balance of sand, silt and clay',
  Silty: 'Fertile soil with good water retention and drainage',
  Peaty: 'Dark soil rich in organic matter and typically acidic',
  Chalky: 'Alkaline soil that drains well but may lack some nutrients',
  Saline: 'Soil with high salt content that can be challenging for crops'
};

export const cropList: Record<string, CropSuggestion[]> = {
  Clay: [
    { name: 'Cabbage', confidence: 0.92, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '80-180 days' },
    { name: 'Broccoli', confidence: 0.87, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '100-150 days' },
    { name: 'Brussels Sprouts', confidence: 0.85, seasonality: 'Fall/Winter', waterRequirements: 'Medium', growthDuration: '90-180 days' }
  ],
  Sandy: [
    { name: 'Carrots', confidence: 0.94, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '70-80 days' },
    { name: 'Potatoes', confidence: 0.91, seasonality: 'Spring', waterRequirements: 'Medium', growthDuration: '70-120 days' },
    { name: 'Radishes', confidence: 0.89, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '21-30 days' }
  ],
  Loamy: [
    { name: 'Tomatoes', confidence: 0.96, seasonality: 'Summer', waterRequirements: 'Medium', growthDuration: '60-100 days' },
    { name: 'Corn', confidence: 0.92, seasonality: 'Summer', waterRequirements: 'High', growthDuration: '60-100 days' },
    { name: 'Bell Peppers', confidence: 0.90, seasonality: 'Summer', waterRequirements: 'Medium', growthDuration: '60-90 days' }
  ],
  Silty: [
    { name: 'Lettuce', confidence: 0.93, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '30-60 days' },
    { name: 'Spinach', confidence: 0.91, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '40-50 days' },
    { name: 'Chard', confidence: 0.87, seasonality: 'Spring/Summer/Fall', waterRequirements: 'Medium', growthDuration: '50-60 days' }
  ],
  Peaty: [
    { name: 'Blueberries', confidence: 0.95, seasonality: 'Spring/Summer', waterRequirements: 'Medium', growthDuration: 'Perennial' },
    { name: 'Cranberries', confidence: 0.93, seasonality: 'Fall', waterRequirements: 'High', growthDuration: 'Perennial' },
    { name: 'Blackberries', confidence: 0.89, seasonality: 'Summer', waterRequirements: 'Medium', growthDuration: 'Perennial' }
  ],
  Chalky: [
    { name: 'Lavender', confidence: 0.94, seasonality: 'Summer', waterRequirements: 'Low', growthDuration: 'Perennial' },
    { name: 'Wheat', confidence: 0.91, seasonality: 'Fall/Spring', waterRequirements: 'Medium', growthDuration: '120-240 days' },
    { name: 'Barley', confidence: 0.88, seasonality: 'Fall/Spring', waterRequirements: 'Medium', growthDuration: '60-70 days' }
  ],
  Saline: [
    { name: 'Asparagus', confidence: 0.89, seasonality: 'Spring', waterRequirements: 'Medium', growthDuration: 'Perennial' },
    { name: 'Beets', confidence: 0.86, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '55-70 days' },
    { name: 'Spinach', confidence: 0.83, seasonality: 'Spring/Fall', waterRequirements: 'Medium', growthDuration: '40-50 days' }
  ]
};

// Mock prediction function
export const predictCrop = (input: PredictionInput): PredictionResult => {
  const { soil, temperature, weather } = input;
  
  // Mock logic for recommendation
  const recommendations = cropList[soil] || cropList.Loamy;
  
  // Adjust confidence based on temperature and weather
  const adjustedRecommendations = recommendations.map(crop => {
    let adjustedConfidence = crop.confidence;
    
    // Temperature adjustments
    if (temperature < 0) adjustedConfidence *= 0.7;
    else if (temperature > 35) adjustedConfidence *= 0.8;
    
    // Weather adjustments
    if (weather === 'Stormy') adjustedConfidence *= 0.85;
    if (weather === 'Snowy') adjustedConfidence *= 0.6;
    
    return {
      ...crop,
      confidence: Number(adjustedConfidence.toFixed(2))
    };
  }).sort((a, b) => b.confidence - a.confidence);
  
  // Generate planting time recommendation
  const season = getSeason(temperature, weather);
  const idealPlantingTime = getIdealPlantingTime(season, soil as string);
  
  // Generate soil suitability score
  const soilSuitability = getSoilSuitability(soil as string, temperature, weather);
  
  return {
    recommendations: adjustedRecommendations,
    idealPlantingTime,
    soilSuitability,
    additionalNotes: getAdditionalNotes(soil as string, temperature, weather)
  };
};

const getSeason = (temperature: number, weather: string): string => {
  if (temperature > 25) return 'Summer';
  if (temperature < 5) return 'Winter';
  if (temperature >= 15 && temperature <= 25) return 'Spring';
  return 'Fall';
};

const getIdealPlantingTime = (season: string, soil: string): string => {
  const times: Record<string, Record<string, string>> = {
    Spring: {
      Clay: 'Late Spring',
      Sandy: 'Early Spring',
      Loamy: 'Mid Spring',
      Silty: 'Early Spring',
      Peaty: 'Mid Spring',
      Chalky: 'Mid Spring',
      Saline: 'Late Spring'
    },
    Summer: {
      Clay: 'Early Summer',
      Sandy: 'Early Summer',
      Loamy: 'Early Summer',
      Silty: 'Early Summer',
      Peaty: 'Mid Summer',
      Chalky: 'Early Summer',
      Saline: 'Late Summer'
    },
    Fall: {
      Clay: 'Early Fall',
      Sandy: 'Early Fall',
      Loamy: 'Mid Fall',
      Silty: 'Early Fall',
      Peaty: 'Early Fall',
      Chalky: 'Mid Fall',
      Saline: 'Early Fall'
    },
    Winter: {
      Clay: 'Not Recommended',
      Sandy: 'Not Recommended',
      Loamy: 'Late Winter (greenhouse)',
      Silty: 'Not Recommended',
      Peaty: 'Not Recommended',
      Chalky: 'Not Recommended',
      Saline: 'Not Recommended'
    }
  };
  
  return times[season][soil] || 'Mid Season';
};

const getSoilSuitability = (soil: string, temperature: number, weather: string): number => {
  // Base suitability
  let suitability = 0.8;
  
  // Adjust based on soil type
  if (soil === 'Loamy') suitability += 0.15;
  if (soil === 'Saline') suitability -= 0.2;
  
  // Adjust based on temperature
  if (temperature < 0 || temperature > 35) suitability -= 0.1;
  
  // Adjust based on weather
  if (weather === 'Stormy' || weather === 'Snowy') suitability -= 0.15;
  if (weather === 'Sunny' || weather === 'Cloudy') suitability += 0.05;
  
  // Ensure within 0-1 range
  return Number(Math.min(1, Math.max(0, suitability)).toFixed(2));
};

const getAdditionalNotes = (soil: string, temperature: number, weather: string): string => {
  const notes = [];
  
  if (soil === 'Clay') {
    notes.push('Consider adding organic matter to improve drainage.');
  } else if (soil === 'Sandy') {
    notes.push('Add compost to help with water retention.');
  } else if (soil === 'Saline') {
    notes.push('Frequent irrigation may be needed to reduce salt concentration.');
  }
  
  if (temperature < 5) {
    notes.push('Consider cold frames or greenhouse cultivation.');
  } else if (temperature > 30) {
    notes.push('Provide shade and ensure adequate irrigation.');
  }
  
  if (weather === 'Rainy') {
    notes.push('Ensure good drainage to prevent waterlogging.');
  } else if (weather === 'Sunny' && temperature > 25) {
    notes.push('Regular watering recommended, especially during early growth.');
  }
  
  return notes.join(' ');
};