import React, { useState } from 'react';
import { Thermometer, MapPin, CloudRain, Voicemail as Soil, Droplet, Leaf } from 'lucide-react';
import { PredictionInput } from '../types';
import axios from 'axios';

const soilPhMap: { [key: string]: number } = {
  Clay: 5.5,
  Sandy: 6.0,
  Loamy: 6.5,
  Silty: 6.2,
  Peaty: 4.5,
  Chalky: 7.5,
  Saline: 8.0,
};

const weatherSeasonMap: { [key: string]: string } = {
  Sunny: 'Kharif',
  Rainy: 'Kharif',
  Cloudy: 'Rabi',
  Stormy: 'Rabi',
  Windy: 'Rabi',
  Snowy: 'Zaid',
  Foggy: 'Zaid',
};

const CropPredictionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    soil: 'Loamy',
    location: '',
    temperature: 25,
    weather: 'Sunny',
    state: 'Maharashtra',
    area: 1.0,
    n: 50,
    p: 30,
    k: 20,
    humidity: 60,
    rainfall: 200,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState('');

  const soilTypes = Object.keys(soilPhMap);
  const weatherConditions = Object.keys(weatherSeasonMap);
  const states = ['Maharashtra', 'Punjab', 'Karnataka', 'Bihar'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'temperature' || name === 'humidity' || name === 'rainfall' ||
              name === 'n' || name === 'p' || name === 'k' || name === 'area'
              ? Number(value)
              : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/predict', {
        params: {
          State_Name: formData.state,
          District_Name: formData.location,
          Crop_Year: new Date().getFullYear(),
          Season: weatherSeasonMap[formData.weather],
          Area: formData.area,
          N: formData.n,
          P: formData.p,
          K: formData.k,
          temperature: formData.temperature,
          humidity: formData.humidity,
          ph: soilPhMap[formData.soil],
          rainfall: formData.rainfall,
        }
      });

      setPrediction(response.data.predicted_crop);
    } catch (error) {
      console.error('Prediction failed:', error);
      setPrediction('Error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Crop Prediction Input</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* State */}
          <div>
            <label className="block text-sm font-medium">State</label>
            <select name="state" value={formData.state} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>

          {/* District (Location) */}
          <div>
            <label className="block text-sm font-medium">District</label>
            <input name="location" value={formData.location} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>

          {/* Soil */}
          <div>
            <label className="block text-sm font-medium">Soil Type</label>
            <select name="soil" value={formData.soil} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {soilTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-sm font-medium">Weather</label>
            <select name="weather" value={formData.weather} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {weatherConditions.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium">Temperature (°C)</label>
            <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-medium">Humidity (%)</label>
            <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>

          {/* Rainfall */}
          <div>
            <label className="block text-sm font-medium">Rainfall (mm)</label>
            <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium">Area (ha)</label>
            <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>

          {/* NPK */}
          <div>
            <label className="block text-sm font-medium">Nitrogen (N)</label>
            <input type="number" name="n" value={formData.n} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phosphorus (P)</label>
            <input type="number" name="p" value={formData.p} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Potassium (K)</label>
            <input type="number" name="k" value={formData.k} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white font-semibold ${
            isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Predicting...' : 'Predict Crop'}
        </button>
      </form>

      {prediction && (
        <div className="mt-4 text-green-700 text-lg font-bold">
          Recommended Crop: {prediction}
        </div>
      )}
    </div>
  );
};

export default CropPredictionForm;
// Note: Ensure to replace the API URL with your actual backend endpoint.