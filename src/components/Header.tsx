import React from 'react';
import { Plane as Plant } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plant className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">CropSage</h1>
            <p className="text-xs sm:text-sm text-green-100">Intelligent Crop Prediction</p>
          </div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li className="hover:text-green-200 transition-colors">
              <a href="#" className="text-sm font-medium">Home</a>
            </li>
            <li className="hover:text-green-200 transition-colors">
              <a href="#" className="text-sm font-medium">About</a>
            </li>
            <li className="hover:text-green-200 transition-colors">
              <a href="#" className="text-sm font-medium">Crop Database</a>
            </li>
            <li className="hover:text-green-200 transition-colors">
              <a href="#" className="text-sm font-medium">Contact</a>
            </li>
          </ul>
        </nav>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;