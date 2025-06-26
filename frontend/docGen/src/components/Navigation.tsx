import React, { useState } from "react";
import { FileText, Menu, X } from "lucide-react";

interface NavigationProps {
  scrollY: number;
  navigate: (path: string) => void;
  currentPage?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  scrollY,
  navigate,
  currentPage = "home",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50
          ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 border-b border-cyan-500/20"
          : "bg-gray-900/80 backdrop-blur-lg"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-4 group"
            aria-label="DocGen Home"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/30 transition-all duration-300 transform group-hover:scale-110">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                DocGen
              </span>
              <p className="text-xs text-gray-400 group-hover:text-cyan-300 transition-colors">
                AI Documentation
              </p>
            </div>
          </button>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className={`text-lg font-medium transition-all duration-300 relative group ${
                  currentPage === "home"
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                Home
                <div
                  className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                    currentPage === "home" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></div>
              </button>
              <button
                onClick={() => navigate("/generate")}
                className={`text-lg font-medium transition-all duration-300 relative group ${
                  currentPage === "generate"
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                Generate
                <div
                  className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                    currentPage === "generate"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></div>
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-gray-300 hover:text-white transition-colors duration-300 p-2 hover:bg-white/10 rounded-lg"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-t border-cyan-500/20 shadow-2xl">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/");
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                currentPage === "home"
                  ? "text-cyan-400 bg-cyan-500/10"
                  : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/generate");
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                currentPage === "generate"
                  ? "text-cyan-400 bg-cyan-500/10"
                  : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5"
              }`}
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};