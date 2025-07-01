import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, GitBranch, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { GitHubBranch } from '../utils/githubUtils'

interface BranchSelectorProps {
  branches: GitHubBranch[];
  selectedBranch: string;
  onBranchSelect: (branch: string) => void;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  disabled?: boolean;
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({
  branches,
  selectedBranch,
  onBranchSelect,
  isLoading,
  error,
  onRefresh,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-select main/master branch if available and no branch is selected
  useEffect(() => {
    if (branches.length > 0 && !selectedBranch) {
      const defaultBranch = branches.find(b => b.name === 'main') || 
                           branches.find(b => b.name === 'master') || 
                           branches[0];
      onBranchSelect(defaultBranch.name);
    }
  }, [branches, selectedBranch, onBranchSelect]);

  const toggleDropdown = () => {
    if (!disabled && !isLoading) {
      setIsOpen(!isOpen);
    }
  };

  const handleBranchSelect = (branchName: string) => {
    onBranchSelect(branchName);
    setIsOpen(false);
  };

  const selectedBranchObj = branches.find(b => b.name === selectedBranch);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled || isLoading || branches.length === 0}
        className={`relative w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg backdrop-blur-sm border rounded-xl sm:rounded-2xl transition-all duration-300 group ${
          disabled || isLoading || branches.length === 0
            ? 'bg-white/5 border-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-white/5 border-gray-600 text-white hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer'
        }`}
      >
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
          <span className="truncate">
            {isLoading ? 'Loading branches...' : 
             error ? 'Error loading branches' :
             branches.length === 0 ? 'No branches available' :
             selectedBranch || 'Select branch'}
          </span>
          {selectedBranchObj?.protected && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/30 flex-shrink-0">
              Protected
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {error && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRefresh();
              }}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              title="Retry loading branches"
            >
              <RefreshCw className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
            </button>
          )}
          
          {isLoading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-cyan-400" />
          ) : error ? (
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
          ) : (
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </div>

        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && branches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl border border-gray-600 rounded-xl sm:rounded-2xl shadow-2xl shadow-black/50 z-50 max-h-60 overflow-y-auto">
          {branches.map((branch) => (
            <button
              key={branch.name}
              type="button"
              onClick={() => handleBranchSelect(branch.name)}
              className={`w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-left transition-all duration-200 hover:bg-white/10 first:rounded-t-xl first:sm:rounded-t-2xl last:rounded-b-xl last:sm:rounded-b-2xl group ${
                selectedBranch === branch.name
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-l-4 border-cyan-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <GitBranch className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                <span className="truncate font-medium">{branch.name}</span>
                {branch.protected && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/30 flex-shrink-0">
                    Protected
                  </span>
                )}
              </div>
              {selectedBranch === branch.name && (
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse flex-shrink-0"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && !isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs sm:text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
    </div>
  );
};