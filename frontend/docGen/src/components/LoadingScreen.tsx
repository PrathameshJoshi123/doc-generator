import React, { useState, useEffect } from 'react';
import { Code, Coffee, Zap } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dots, setDots] = useState('');

  const messages = [
    "Hang tight, dev! I'm reading your repo like a pro.",
    "Analyzing your code architecture...",
    "Mapping out your project structure...",
    "Generating beautiful documentation...",
    "Adding some developer magic...",
    "Almost there! Polishing the docs..."
  ];

  useEffect(() => {
    if (!isVisible) return;

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, [isVisible, messages.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Pixelated Mascot */}
        <div className="relative mb-6 sm:mb-8">
          <div className="pixel-mascot mx-auto mb-4 sm:mb-6">
            {/* Mascot Head */}
            <div className="pixel-head">
              <div className="pixel-row">
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-yellow-400"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-black animate-pulse"></div>
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-black animate-pulse"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-pink-400"></div>
                <div className="pixel bg-yellow-400"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-yellow-400"></div>
                <div className="pixel bg-black"></div>
                <div className="pixel bg-black"></div>
                <div className="pixel bg-yellow-400"></div>
              </div>
            </div>
            
            {/* Mascot Body */}
            <div className="pixel-body">
              <div className="pixel-row">
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-blue-500"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-white"></div>
                <div className="pixel bg-white"></div>
                <div className="pixel bg-blue-500"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-blue-500"></div>
                <div className="pixel bg-blue-500"></div>
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute -top-3 sm:-top-4 -left-6 sm:-left-8 animate-bounce">
              <Code className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
            </div>
            <div className="absolute -top-1 sm:-top-2 -right-6 sm:-right-8 animate-bounce delay-300">
              <Coffee className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div className="absolute -bottom-1 sm:-bottom-2 -left-4 sm:-left-6 animate-bounce delay-500">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="speech-bubble relative bg-white text-gray-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md mx-auto">
            <div className="font-mono text-xs sm:text-sm md:text-base font-semibold">
              {messages[currentMessage]}{dots}
            </div>
            <div className="speech-arrow"></div>
          </div>
        </div>

        {/* Mini Developer Animation */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3 sm:gap-4 bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-cyan-500/20">
            <div className="dev-computer relative">
              <div className="w-12 h-9 sm:w-16 sm:h-12 bg-gray-700 rounded-md border border-gray-600">
                <div className="w-9 h-6 sm:w-12 sm:h-8 bg-black rounded-sm mx-auto mt-0.5 sm:mt-1">
                  <div className="typing-animation">
                    <div className="typing-line bg-green-400"></div>
                    <div className="typing-line bg-blue-400 delay-200"></div>
                    <div className="typing-line bg-yellow-400 delay-400"></div>
                  </div>
                </div>
              </div>
              <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-gray-600 mx-auto rounded-b-md"></div>
            </div>
            
            <div className="text-left">
              <div className="text-cyan-400 font-mono text-xs sm:text-sm mb-1">Processing...</div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          <div className="progress-bar">
            <div className="text-xs text-cyan-400 mb-1 text-left">Scanning files...</div>
            <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-progress-1"></div>
            </div>
          </div>
          
          <div className="progress-bar delay-1000">
            <div className="text-xs text-green-400 mb-1 text-left">Analyzing structure...</div>
            <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-progress-2"></div>
            </div>
          </div>
          
          <div className="progress-bar delay-2000">
            <div className="text-xs text-purple-400 mb-1 text-left">Generating docs...</div>
            <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress-3"></div>
            </div>
          </div>
        </div>

        {/* Retro Loading Text */}
        <div className="text-lg sm:text-xl lg:text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          LOADING{dots}
        </div>
      </div>

      <style>{`
        .pixel-mascot {
          transform: scale(1.5);
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        @media (min-width: 640px) {
          .pixel-mascot {
            transform: scale(2);
          }
        }

        .pixel {
          width: 6px;
          height: 6px;
          display: inline-block;
        }

        @media (min-width: 640px) {
          .pixel {
            width: 8px;
            height: 8px;
          }
        }

        .pixel-row {
          display: flex;
          justify-content: center;
        }

        .pixel-head, .pixel-body {
          margin-bottom: 3px;
        }

        @media (min-width: 640px) {
          .pixel-head, .pixel-body {
            margin-bottom: 4px;
          }
        }

        .speech-bubble {
          animation: float 3s ease-in-out infinite;
        }

        .speech-arrow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid white;
        }

        @media (min-width: 640px) {
          .speech-arrow {
            bottom: -8px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
          }
        }

        .typing-animation {
          padding: 2px;
        }

        @media (min-width: 640px) {
          .typing-animation {
            padding: 4px;
          }
        }

        .typing-line {
          height: 1.5px;
          margin: 0.5px 0;
          animation: typing-width 2s ease-in-out infinite;
        }

        @media (min-width: 640px) {
          .typing-line {
            height: 2px;
            margin: 1px 0;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes typing-width {
          0%, 100% { width: 20%; }
          50% { width: 80%; }
        }

        @keyframes progress-1 {
          0% { width: 0%; }
          100% { width: 85%; }
        }

        @keyframes progress-2 {
          0% { width: 0%; }
          100% { width: 65%; }
        }

        @keyframes progress-3 {
          0% { width: 0%; }
          100% { width: 45%; }
        }

        .animate-progress-1 {
          animation: progress-1 4s ease-out infinite;
        }

        .animate-progress-2 {
          animation: progress-2 5s ease-out infinite;
        }

        .animate-progress-3 {
          animation: progress-3 6s ease-out infinite;
        }
      `}</style>
    </div>
  );
};