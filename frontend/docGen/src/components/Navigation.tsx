import React from 'react';
import { FileText, Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  handleNavigate: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  scrollY,
  isMenuOpen,
  setIsMenuOpen,
  darkMode,
  setDarkMode,
  handleNavigate,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-12 xs:h-14 sm:h-16 md:h-18">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 group flex-shrink-0 min-w-0"
            aria-label="DocGen Home"
          >
            <div className="bg-blue-600 p-1 xs:p-1.5 sm:p-2 rounded-lg group-hover:bg-blue-700 transition-colors duration-200 flex-shrink-0">
              <FileText className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-200 truncate">
              DocGen
            </span>
          </Link>
          
          {/* Desktop & Tablet Navigation + Controls */}
          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <a
                href="#features"
                className="text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                Testimonials
              </a>
              <button
                className="bg-blue-600 text-white px-3 md:px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm text-sm lg:text-base whitespace-nowrap"
                onClick={handleNavigate}
              >
                Try Now
              </button>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 xs:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-gray-700 dark:text-gray-200 p-1.5 xs:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 flex-shrink-0"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 xs:w-5 xs:h-5" />
                ) : (
                  <Menu className="w-4 h-4 xs:w-5 xs:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-2 xs:px-3 sm:px-4 md:px-6 pt-2 pb-3 space-y-1">
            <a
              href="#features"
              className="block px-2 xs:px-3 py-2 xs:py-3 text-sm xs:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-2 xs:px-3 py-2 xs:py-3 text-sm xs:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="block px-2 xs:px-3 py-2 xs:py-3 text-sm xs:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="pt-1 xs:pt-2">
              <button
                className="w-full text-center bg-blue-600 text-white px-2 xs:px-3 py-2 xs:py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm xs:text-base"
                onClick={() => {
                  handleNavigate();
                  setIsMenuOpen(false);
                }}
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;