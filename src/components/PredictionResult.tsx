import React from 'react';
import { PredictionResult } from '../types';
import { Check, Droplets, Calendar, Clock } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionResult | null;
}

const PredictionResultComponent: React.FC<PredictionResultProps> = ({ result }) => {
  if (!result) return null;

  const { recommendations, idealPlantingTime, soilSuitability, additionalNotes } = result;

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-green-400';
    if (confidence >= 0.7) return 'bg-yellow-500';
    if (confidence >= 0.6) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getWaterIcon = (level: string) => {
    const count = level === 'Low' ? 1 : level === 'Medium' ? 2 : 3;
    return Array(count).fill(0).map((_, i) => (
      <Droplets key={i} className="h-4 w-4 text-blue-500" />
    ));
  };

  // Animation classes for items to stagger in
  const getAnimationDelay = (index: number) => {
    return `animate-fade-in opacity-0 [animation-delay:${200 + index * 100}ms] [animation-fill-mode:forwards]`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Crop Recommendations</h2>
      
      <div className="flex items-center mb-4">
        <div className="h-2 bg-gray-200 rounded-full flex-grow mr-2">
          <div 
            className={`h-2 rounded-full ${getConfidenceColor(soilSuitability)}`} 
            style={{ width: `${soilSuitability * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">{Math.round(soilSuitability * 100)}% Soil Suitability</span>
      </div>

      <div className="mb-5 text-sm bg-blue-50 text-blue-800 p-3 rounded-md flex items-start">
        <Calendar className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
        <div>
          <p className="font-medium">Ideal Planting Time: {idealPlantingTime}</p>
          {additionalNotes && <p className="mt-1 text-blue-700">{additionalNotes}</p>}
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <div 
            key={crop.name}
            className={`p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all duration-300 ${getAnimationDelay(index)}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">{crop.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                crop.confidence >= 0.8 ? 'bg-green-100 text-green-800' : 
                crop.confidence >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {Math.round(crop.confidence * 100)}% match
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
                <span>{crop.seasonality}</span>
              </div>
              <div className="flex items-center">
                <div className="flex mr-1.5">
                  {getWaterIcon(crop.waterRequirements)}
                </div>
                <span>{crop.waterRequirements} water</span>
              </div>
              <div className="flex items-center col-span-2">
                <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                <span>{crop.growthDuration}</span>
              </div>
            </div>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No suitable crops found for the specified conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResultComponent;