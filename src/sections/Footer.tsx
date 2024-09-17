'use client';

import React from 'react';
import { Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">

              <p className="text-sm text-gray-400">
                صمم بواسطة 
                <a 
                  href="https://www.facebook.com/profile.php?id=100012224269455" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:underline"
                >
                  {' '}
                  أحمد موسى
                </a>
                {' '}
                و
                {' '}
                <a 
                  href="https://www.facebook.com/profile.php?id=100012595743270" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:underline"
                >
                  باسل فرحات
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 text-center">
          <p className="text-sm mt-1 text-gray-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
