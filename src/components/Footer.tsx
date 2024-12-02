import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center text-gray-600">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Subbu Mail Generator
          </div>
          <div className="mt-2 text-sm text-gray-500">
            © {new Date().getFullYear()} Subbu Mail Generator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};