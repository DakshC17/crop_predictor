import React from 'react';
import { Plane as Plant, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plant className="h-6 w-6 text-green-400" />
              <h2 className="text-lg font-bold text-white">CropSage</h2>
            </div>
            <p className="text-sm">
              Providing intelligent crop recommendations based on soil conditions, 
              climate data, and agricultural best practices.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-300 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Crop Database</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-300 transition-colors">Planting Guides</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Soil Analysis</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Weather Forecasts</a></li>
              <li><a href="#" className="hover:text-green-300 transition-colors">Farming Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
                <span>support@cropsage.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
                <span>+91 8837852977</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
                <span>Knowlege Park 2 Greater Noida - 201310</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center text-gray-400">
          <p>© {new Date().getFullYear()} CropSage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;