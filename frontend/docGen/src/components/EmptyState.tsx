import React from "react";
import { FileText, Github, Archive, Sparkles } from "lucide-react";

interface EmptyStateProps {
  inputType: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ inputType }) => {
  return (
    <div className="flex items-center justify-center min-h-[500px] relative">
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <div className="relative mb-8">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-12 rounded-full mx-auto w-fit backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <FileText className="w-20 h-20 text-cyan-400" />
          </div>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse">
            {inputType === "github" ? (
              <Github className="w-6 h-6 text-blue-400" />
            ) : (
              <Archive className="w-6 h-6 text-purple-400" />
            )}
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to Generate Documentation
        </h2>

        <div className="space-y-4 text-lg text-gray-300 mb-8">
          <p className="leading-relaxed">
            {inputType === "github"
              ? "🚀 Enter a GitHub repository URL above to get started"
              : "📁 Upload a ZIP file containing your project"}
          </p>
          <p className="text-cyan-400 font-medium">
            ✨ AI will analyze your code and create beautiful documentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Auto Analysis
            </h3>
            <p className="text-gray-400 text-sm">
              Automatically analyzes code structure and generates comprehensive
              docs
            </p>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Beautiful Output
            </h3>
            <p className="text-gray-400 text-sm">
              Creates clean, readable markdown with proper formatting and
              styling
            </p>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Multi-Platform
            </h3>
            <p className="text-gray-400 text-sm">
              Supports GitHub repos and ZIP uploads for maximum flexibility
            </p>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float delay-1000 opacity-20">
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float delay-500 opacity-20">
        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
      </div>
    </div>
  );
};