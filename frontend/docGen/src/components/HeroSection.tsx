import React from 'react';
import { Github, FileText, ArrowRight, Sparkles } from 'lucide-react';
import Orb from "../reactBits/Orb.tsx"
import BlurText from "../reactBits/BlurText.tsx"

interface HeroSectionProps {
  handleNavigate: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleNavigate }) => {
  const stats = [
    { number: "10K+", label: "Repositories Processed" },
    { number: "500+", label: "Happy Developers" },
    { number: "50K+", label: "Docs Generated" },
    { number: "99%", label: "Accuracy Rate" },
  ];

  return (
    <section className="pt-16 xs:pt-20 sm:pt-24 pb-8 xs:pb-12 sm:pb-16 px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6 sm:mb-8 inline-flex items-center space-x-2 bg-gray-800 px-3 sm:px-4 py-2 rounded-full">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
          <span className="text-xs sm:text-sm font-medium text-yellow-200">
            AI-Powered Documentation Generator
          </span>
        </div>

        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 xs:mb-4 sm:mb-6 text-white leading-tight px-0 xs:px-1">
          Transform GitHub Code into
          <br className="hidden sm:block" />
          <span className="block mt-1 xs:mt-2 sm:mt-0">
            <BlurText
              text="Beautiful Documentation!"
              delay={150}
              animateBy="words"
              direction="top"
              className="justify-center text-blue-400"
            />
          </span>
        </h1>

        <p className="text-xs xs:text-sm sm:text-lg lg:text-xl text-gray-300 mb-4 xs:mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-1 xs:px-2">
          Simply paste a GitHub repository URL and watch as our AI creates
          comprehensive, professional documentation. View code and docs
          side-by-side, then export as markdown.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center mb-6 xs:mb-8 sm:mb-12 gap-4 xs:gap-6 lg:gap-16">
          {/* Orb Container - Made much smaller for mobile */}
          <div className="w-40 h-40 xs:w-48 xs:h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex-shrink-0 flex items-center justify-center">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-blue-600 rounded-full p-1.5 xs:p-2 sm:p-4 lg:p-6 shadow-lg flex items-center justify-center">
                <FileText className="w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 xs:gap-4 justify-center items-center w-full max-w-xs px-1 xs:px-2">
            <button
              className="group relative bg-blue-600 text-white px-3 xs:px-4 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg text-xs xs:text-sm sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 xs:space-x-2 sm:space-x-3 shadow-lg w-full overflow-hidden"
              onClick={handleNavigate}
            >
              <div className="w-full absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-100"></div>
                <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-300"></div>
                <div className="absolute bottom-3 left-12 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-500"></div>
                <div className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-700"></div>
              </div>
              
              <div className="relative flex items-center justify-center space-x-1 xs:space-x-2 sm:space-x-3 z-10 w-full">
                <Github className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                <span className="group-hover:tracking-wide transition-all duration-300 text-xs xs:text-sm sm:text-base">
                  Generate Documentation
                </span>
                <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
              </div>
            </button>

            <button onClick={() =>
                window.open(
                  "https://youtu.be/URkMKGPIsug",
                  "_blank",
                  "noopener,noreferrer"
                )
              } className="px-4 xs:px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm xs:text-base sm:text-lg font-semibold border-2 border-gray-700 text-gray-200 hover:bg-gray-800 transition-colors w-full">
              View Demo
            </button>
          </div>
        </div>

        {/* Demo URL Example */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16 px-2 xs:px-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-300 mb-3 font-medium">
              Try with this example repository:
            </p>
            <div className="bg-gray-900 rounded-lg p-2 xs:p-3 sm:p-4 font-mono text-xs sm:text-sm text-gray-200 border-gray-700 break-all">
              https://github.com/username/awesome-project
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-8 max-w-4xl mx-auto px-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;