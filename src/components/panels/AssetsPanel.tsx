import { useState } from "react";
import { Search, Plus, Upload, Image, FileText, Video } from "lucide-react";
import { ViewModeToggle, ViewMode } from "../ViewModeToggle";

const sampleAssets = [
  { id: "1", name: "hero-image.jpg", type: "image", size: "245 KB", icon: Image },
  { id: "2", name: "logo.svg", type: "image", size: "12 KB", icon: Image },
  { id: "3", name: "document.pdf", type: "document", size: "1.2 MB", icon: FileText },
  { id: "4", name: "video-intro.mp4", type: "video", size: "15 MB", icon: Video },
  { id: "5", name: "icon-set.svg", type: "image", size: "8 KB", icon: Image },
  { id: "6", name: "background.png", type: "image", size: "567 KB", icon: Image },
];

export const AssetsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  
  const filteredAssets = sampleAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAsset = (asset: typeof sampleAssets[0]) => {
    const Icon = asset.icon;
    
    if (viewMode === "list") {
      return (
        <div key={asset.id} className="component-card p-2 flex items-center gap-3 group cursor-pointer">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{asset.name}</div>
            <div className="text-xs text-muted-foreground">{asset.size}</div>
          </div>
        </div>
      );
    }
    
    if (viewMode === "grid") {
      return (
        <div key={asset.id} className="component-card p-2 group cursor-pointer">
          <div className="aspect-square bg-muted rounded-sm mb-2 flex items-center justify-center">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-xs font-medium truncate">{asset.name}</div>
        </div>
      );
    }
    
    // Cards view
    return (
      <div key={asset.id} className="component-card p-3 group cursor-pointer">
        <div className="aspect-[4/3] bg-muted rounded-sm mb-2 flex items-center justify-center">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-sm font-medium truncate">{asset.name}</div>
        <div className="text-xs text-muted-foreground">{asset.size}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded-sm 
                     text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {filteredAssets.length} assets
          </span>
          <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className={`
          ${viewMode === "list" ? "space-y-1" : ""}
          ${viewMode === "grid" ? "grid grid-cols-2 gap-2" : ""}
          ${viewMode === "cards" ? "grid grid-cols-1 gap-3" : ""}
        `}>
          {filteredAssets.map(renderAsset)}
        </div>
      </div>

      {/* Upload Button */}
      <div className="p-3 border-t border-border">
        <button className="w-full p-2 extension-tab rounded-sm flex items-center justify-center gap-2 text-sm">
          <Upload className="h-3.5 w-3.5" />
          Upload Asset
        </button>
      </div>
    </div>
  );
};