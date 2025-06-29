import React from "react";
import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex items-center justify-center overflow-x-auto pb-2">
      <div className="flex items-center space-x-1 sm:space-x-2 bg-gray-900/40 backdrop-blur-xl p-1 sm:p-2 rounded-xl sm:rounded-2xl border border-cyan-500/10 shadow-lg min-w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm lg:text-base hidden xs:inline">
                {tab.label}
              </span>
              <span className="font-medium text-xs xs:hidden">
                {tab.id === "editor" ? "Edit" : tab.id === "preview" ? "View" : "Tree"}
              </span>
              {activeTab === tab.id && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse flex-shrink-0"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};