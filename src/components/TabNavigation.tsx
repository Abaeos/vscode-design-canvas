import { Layers, FileText, Image, Component } from "lucide-react";
import { TabType } from "./VSCodeExtension";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "components" as TabType, icon: Component, title: "Components" },
  { id: "pages" as TabType, icon: FileText, title: "Pages" },
  { id: "assets" as TabType, icon: Image, title: "Assets" },
  { id: "layers" as TabType, icon: Layers, title: "Layers" },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="border-b border-border">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 p-3 extension-tab ${isActive ? "active" : ""} 
                         flex items-center justify-center relative group`}
              title={tab.title}
            >
              <Icon className="h-4 w-4" />
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};