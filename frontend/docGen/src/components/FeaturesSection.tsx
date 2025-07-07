import React from 'react';
import { Link, FileText, Eye, Download } from 'lucide-react';
import SpotlightCard from '../reactBits/SpotlightCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Link className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Simple URL Input",
      description:
        "Just paste any public GitHub repository URL and our AI will analyze it instantly.",
    },
    {
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Smart Documentation",
      description:
        "AI-powered analysis generates comprehensive, structured documentation from your codebase.",
    },
    {
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Live Preview",
      description:
        "See your code and generated documentation side-by-side with real-time updates.",
    },
    {
      icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Export Ready",
      description:
        "Download beautiful markdown files ready for your README, wiki, or documentation site.",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Powerful Features for Better Documentation
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Everything you need to create professional documentation from
            any GitHub repository
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <SpotlightCard
              spotlightColor="rgba(0, 229, 255, 0.2)"
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-400 group"
            >
              <div className="text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;