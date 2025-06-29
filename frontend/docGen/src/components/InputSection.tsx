import React from "react";
import {
  Link,
  Archive,
  CheckCircle,
  Upload,
  Zap,
  Loader2,
} from "lucide-react";

interface InputSectionProps {
  inputType: string;
  setInputType: (type: string) => void;
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  uploadedFile: File | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  injectComments: boolean;
  setInjectComments: (value: boolean) => void;
  handleGenerateDocs: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputType,
  setInputType,
  repoUrl,
  setRepoUrl,
  uploadedFile,
  handleFileUpload,
  injectComments,
  setInjectComments,
  handleGenerateDocs,
  isLoading,
}) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-cyan-500/10 shadow-2xl shadow-cyan-500/5">
      {/* Input Type Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <button
          onClick={() => setInputType("github")}
          className={`group flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto ${
            inputType === "github"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl shadow-cyan-500/30"
              : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-gray-700 hover:border-cyan-500/30"
          }`}
        >
          <Link className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">GitHub Repository</span>
          {inputType === "github" && (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse flex-shrink-0" />
          )}
        </button>
        <button
          onClick={() => setInputType("zip")}
          className={`group flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto ${
            inputType === "zip"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl shadow-cyan-500/30"
              : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-gray-700 hover:border-cyan-500/30"
          }`}
        >
          <Archive className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">ZIP File Upload</span>
          {inputType === "zip" && (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse flex-shrink-0" />
          )}
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            {inputType === "github" ? (
              <div className="relative group">
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg backdrop-blur-sm border bg-white/5 border-gray-600 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/10"
                />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ) : (
              <div className="relative group">
                <div className="w-full px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm border bg-white/5 border-gray-600 rounded-xl sm:rounded-2xl transition-all duration-300 hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/10 cursor-pointer">
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                    <span
                      className={`text-sm sm:text-base lg:text-lg transition-colors truncate ${
                        uploadedFile && uploadedFile.name
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {uploadedFile && uploadedFile.name
                        ? uploadedFile.name
                        : "Click to upload ZIP file"}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerateDocs}
            disabled={(!repoUrl && !uploadedFile) || isLoading}
            className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm sm:text-base lg:text-lg font-semibold rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 sm:space-x-3 min-w-[140px] sm:min-w-[180px] xl:min-w-[200px] transition-all duration-300 transform hover:scale-105 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" />
                <span className="hidden sm:inline">Generating...</span>
                <span className="sm:hidden">Loading...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="hidden sm:inline">Generate Docs</span>
                <span className="sm:hidden">Generate</span>
              </>
            )}
          </button>
        </div>

        {/* Toggle Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 pt-3 sm:pt-4 border-t border-gray-700/50">
          <span className="text-gray-300 font-medium text-sm sm:text-base">Inject Comments:</span>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setInjectComments(!injectComments)}
              className={`relative inline-flex h-6 w-11 sm:h-8 sm:w-14 items-center rounded-full transition-all duration-300 focus:outline-none transform hover:scale-105 ${
                injectComments
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              aria-pressed={injectComments}
            >
              <span
                className={`inline-block h-4 w-4 sm:h-6 sm:w-6 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
                  injectComments ? "translate-x-6 sm:translate-x-7" : "translate-x-1"
                }`}
              ></span>
            </button>
            <span className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              Include inline documentation in generated files
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
