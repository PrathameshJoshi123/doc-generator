import React from 'react';
import { Github, ArrowRight, Check } from 'lucide-react';

interface CTASectionProps {
  handleNavigate: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ handleNavigate }) => {
  const benefits = [
    "Free to use",
    "No account required",
    "Instant results",
    "Export ready",
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
          Ready to Create Amazing Documentation?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
          Join thousands of developers who are creating professional
          documentation with just a GitHub URL. Start for free today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8 px-4">
          <button
            className="group bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg w-full sm:w-auto"
            onClick={handleNavigate}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Start Generating</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100 px-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-1 sm:space-x-2">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;