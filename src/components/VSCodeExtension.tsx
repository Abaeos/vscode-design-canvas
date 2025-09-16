import { useState } from "react";
import { Settings, Play } from "lucide-react";
import { TabNavigation } from "./TabNavigation";
import { ComponentsPanel } from "./panels/ComponentsPanel";
import { PagesPanel } from "./panels/PagesPanel";
import { AssetsPanel } from "./panels/AssetsPanel";
import { LayersPanel } from "./panels/LayersPanel";
import { SettingsPanel } from "./panels/SettingsPanel";

export type TabType = "components" | "pages" | "assets" | "layers";

interface VSCodeExtensionProps {
  onElementSelect?: (element: any) => void;
}

export const VSCodeExtension = ({ onElementSelect }: VSCodeExtensionProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("components");
  const [showSettings, setShowSettings] = useState(false);

  const renderActivePanel = () => {
    if (showSettings) return <SettingsPanel onClose={() => setShowSettings(false)} />;
    
    switch (activeTab) {
      case "components":
        return <ComponentsPanel />;
      case "pages":
        return <PagesPanel />;
      case "assets":
        return <AssetsPanel />;
      case "layers":
        return <LayersPanel onElementSelect={onElementSelect} />;
      default:
        return <ComponentsPanel />;
    }
  };

  return (
    <div className="extension-sidebar h-screen w-80 flex flex-col">
      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderActivePanel()}
      </div>
      
      {/* Action Buttons */}
      <div className="border-t border-border p-2 flex gap-2">
        <button
          onClick={() => console.log('Start preview')}
          className="flex-1 p-2 rounded extension-tab flex items-center justify-center group"
          title="Start Preview"
        >
          <Play className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex-1 p-2 rounded extension-tab flex items-center justify-center group"
          title="Extension Settings"
        >
          <Settings className="h-4 w-4 group-hover:rotate-45 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};