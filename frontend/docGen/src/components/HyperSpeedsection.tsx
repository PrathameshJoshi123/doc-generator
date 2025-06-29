import React from 'react';
import Hyperspeed from '../reactBits/Hyperspeed';

const HyperspeedSection: React.FC = () => {
  const stats = [
    { value: "<30s", label: "Average processing time" },
    { value: "1M+", label: "Lines of code analyzed" },
    { value: "50+", label: "Programming languages supported" },
  ];

  return (
    <section className="py-8 xs:py-12 sm:py-16 lg:py-20 px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 text-gray-900 dark:text-white px-1 xs:px-2">
            Lightning Fast Processing
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 xs:px-4 leading-relaxed">
            Experience the speed of AI-powered code analysis and
            documentation generation
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-lg xs:shadow-xl sm:shadow-2xl mx-1 xs:mx-2 sm:mx-0">
          <div className="w-full h-32 xs:h-40 sm:h-64 md:h-80 lg:h-96 relative">
            
            {/* Mobile Alternative Content - Show only on xs screens */}
            <div className="block sm:hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 animate-pulse">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Floating code symbols animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 left-4 text-cyan-300 opacity-60 animate-bounce" style={{animationDelay: '0s'}}>
                    &lt;/&gt;
                  </div>
                  <div className="absolute top-8 right-6 text-blue-300 opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}>
                    { }
                  </div>
                  <div className="absolute bottom-8 left-6 text-purple-300 opacity-60 animate-bounce" style={{animationDelay: '1s'}}>
                    [ ]
                  </div>
                  <div className="absolute bottom-4 right-4 text-cyan-300 opacity-60 animate-bounce" style={{animationDelay: '1.5s'}}>
                    ( )
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-40 animate-pulse" style={{animationDelay: '0.8s'}}>
                    →
                  </div>
                </div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center z-10 px-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">
                      Process Any Repository
                    </h3>
                    <p className="text-xs text-cyan-200 drop-shadow-lg">
                      Lightning fast analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Hyperspeed Component - Hide on xs screens */}
            <div className="hidden sm:block w-full h-full">
              <Hyperspeed
                effectOptions={{
                  onSpeedUp: () => {},
                  onSlowDown: () => {},
                  distortion: "turbulentDistortion",
                  length: 400,
                  roadWidth: 10,
                  islandWidth: 2,
                  lanesPerRoad: 4,
                  fov: 90,
                  fovSpeedUp: 150,
                  speedUp: 2,
                  carLightsFade: 0.4,
                  totalSideLightSticks: 20,
                  lightPairsPerRoadWay: 40,
                  shoulderLinesWidthPercentage: 0.05,
                  brokenLinesWidthPercentage: 0.1,
                  brokenLinesLengthPercentage: 0.5,
                  lightStickWidth: [0.12, 0.5],
                  lightStickHeight: [1.3, 1.7],
                  movingAwaySpeed: [60, 80],
                  movingCloserSpeed: [-120, -160],
                  carLightsLength: [400 * 0.03, 400 * 0.2],
                  carLightsRadius: [0.05, 0.14],
                  carWidthPercentage: [0.3, 0.5],
                  carShiftX: [-0.8, 0.8],
                  carFloorSeparation: [0, 5],
                  colors: {
                    roadColor: 0x080808,
                    islandColor: 0x0a0a0a,
                    background: 0x000000,
                    shoulderLines: 0xffffff,
                    brokenLines: 0xffffff,
                    leftCars: [0x3b82f6, 0x1d4ed8, 0x1e40af],
                    rightCars: [0x06b6d4, 0x0891b2, 0x0e7490],
                    sticks: 0x06b6d4,
                  },
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center z-10 px-4">
                  <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg leading-tight">
                    Process Any Repository
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl text-cyan-200 max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
                    From small scripts to enterprise codebases
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 xs:mt-6 sm:mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8 text-center px-1 xs:px-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 xs:mb-2">
                {stat.value}
              </div>
              <div className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HyperspeedSection;