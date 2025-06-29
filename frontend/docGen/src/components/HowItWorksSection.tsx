import React from 'react';
import { Link, Zap, Eye, Download } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Link className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
      title: "Enter Repository URL",
      description:
        "Paste the GitHub repository URL or upload a ZIP file of your project.",
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />,
      title: "Generate Documentation",
      description:
        "Click the Generate Docs button to analyze your code and create documentation.",
    },
    {
      icon: <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
      title: "Review & Preview",
      description:
        "View the generated markdown, live preview, and project structure instantly.",
    },
    {
      icon: <Download className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />,
      title: "Export & Download",
      description:
        "Export your documentation or download the enhanced project as a ZIP file.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/40 dark:to-gray-800"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-cyan-900/60 via-blue-900/40 to-gray-900/80 rounded-2xl sm:rounded-3xl shadow-2xl border border-cyan-500/20 p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 sm:mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center group transition-transform duration-300 hover:scale-105"
              >
                <div className="relative mb-3 sm:mb-4">
                  <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg shadow-cyan-500/20 z-10">
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="bg-gray-900/80 border border-cyan-500/20 rounded-full p-3 sm:p-4 lg:p-5 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-cyan-200 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;