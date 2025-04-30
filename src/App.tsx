import React, { useState } from 'react';
import Header from './components/Header';
import CropPredictionForm from './components/CropPredictionForm';
import PredictionResultComponent from './components/PredictionResult';
import Footer from './components/Footer';
import { PredictionInput, PredictionResult } from './types';
import { predictCrop } from './utils/mockData';
import { Sprout } from 'lucide-react';

function App() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (data: PredictionInput) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const predictionResult = predictCrop(data);
      setResult(predictionResult);
      setIsLoading(false);
      setHasSubmitted(true);
      
      // Scroll to result section if on mobile
      if (window.innerWidth < 768) {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Crop Prediction</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-green-100">
              Get personalized crop recommendations based on your soil type, location, and weather conditions.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <CropPredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
            
            <div id="results-section" className="flex flex-col justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full p-12 bg-white rounded-lg shadow-lg">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-700 mb-4"></div>
                  <p className="text-lg text-gray-600">Analyzing growing conditions...</p>
                </div>
              ) : !hasSubmitted ? (
                <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center h-full">
                  <Sprout className="h-16 w-16 text-green-600 mb-4" />
                  <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                    Enter your growing conditions
                  </h2>
                  <p className="text-gray-600 text-center">
                    Fill out the form to get personalized crop recommendations
                    for your specific growing conditions.
                  </p>
                </div>
              ) : (
                <PredictionResultComponent result={result} />
              )}
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">Why Use CropSage?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-green-100 text-green-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Data-Driven Predictions</h3>
                <p className="text-gray-600">
                  Our predictions are based on extensive agricultural data and scientific research.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Optimize Your Yield</h3>
                <p className="text-gray-600">
                  Increase your harvest by planting crops best suited to your specific conditions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Save Time & Resources</h3>
                <p className="text-gray-600">
                  Focus your efforts on crops with the highest probability of success in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;