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
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-2 bg-gray-900/40 backdrop-blur-xl p-2 rounded-2xl border border-cyan-500/10 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
