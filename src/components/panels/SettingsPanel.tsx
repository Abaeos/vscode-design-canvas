import { X, Monitor, Moon, Sun, Palette, Code, Zap } from "lucide-react";

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-medium">Extension Settings</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-muted rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">

        {/* Editor Section */}
        <div>
          <h4 className="text-xs font-medium mb-2 flex items-center gap-2">
            <Code className="h-3 w-3" />
            Editor
          </h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm">
              Auto-save changes
              <input type="checkbox" defaultChecked className="w-3 h-3" />
            </label>
            <label className="flex items-center justify-between text-sm">
              Show code preview
              <input type="checkbox" defaultChecked className="w-3 h-3" />
            </label>
            <label className="flex items-center justify-between text-sm">
              Enable live preview
              <input type="checkbox" defaultChecked className="w-3 h-3" />
            </label>
          </div>
        </div>

        {/* Performance Section */}
        <div>
          <h4 className="text-xs font-medium mb-2 flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Performance
          </h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm">
              Cache components
              <input type="checkbox" defaultChecked className="w-3 h-3" />
            </label>
            <label className="flex items-center justify-between text-sm">
              Lazy load assets
              <input type="checkbox" defaultChecked className="w-3 h-3" />
            </label>
          </div>
        </div>

        {/* Advanced Section */}
        <div>
          <h4 className="text-xs font-medium mb-2">Advanced</h4>
          <div className="space-y-2">
            <button className="w-full p-2 text-left text-sm extension-tab rounded-sm">
              Reset to defaults
            </button>
            <button className="w-full p-2 text-left text-sm extension-tab rounded-sm">
              Export settings
            </button>
            <button className="w-full p-2 text-left text-sm extension-tab rounded-sm">
              Import settings
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Visual Design Extension v1.0.0
        </div>
      </div>
    </div>
  );
};