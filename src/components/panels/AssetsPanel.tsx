import { useState } from "react";
import { Search, Plus, Upload, Image, FileText, Video, Palette, ArrowUpDown } from "lucide-react";
import { ViewModeToggle, ViewMode } from "../ViewModeToggle";

const sampleMedia = [
  { id: "1", name: "hero-image.jpg", type: "image", size: "245 KB", icon: Image, category: "media" },
  { id: "2", name: "logo.svg", type: "image", size: "12 KB", icon: Image, category: "media" },
  { id: "3", name: "document.pdf", type: "document", size: "1.2 MB", icon: FileText, category: "media" },
  { id: "4", name: "video-intro.mp4", type: "video", size: "15 MB", icon: Video, category: "media" },
  { id: "5", name: "icon-set.svg", type: "image", size: "8 KB", icon: Image, category: "media" },
  { id: "6", name: "background.png", type: "image", size: "567 KB", icon: Image, category: "media" },
];

const sampleTokens = [
  { id: "t1", name: "Primary Color", type: "color", value: "#3B82F6", category: "tokens" },
  { id: "t2", name: "Secondary Color", type: "color", value: "#64748B", category: "tokens" },
  { id: "t3", name: "Font Size Base", type: "size", value: "16px", category: "tokens" },
  { id: "t4", name: "Border Radius", type: "size", value: "8px", category: "tokens" },
  { id: "t5", name: "Spacing XL", type: "size", value: "32px", category: "tokens" },
];

type SortOption = "name-asc" | "name-desc" | "size" | "type";
type AssetCategory = "media" | "tokens";

export const AssetsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [activeCategory, setActiveCategory] = useState<AssetCategory>("media");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  
  const allAssets = [...sampleMedia, ...sampleTokens];
  
  const filteredAssets = allAssets
    .filter(asset => asset.category === activeCategory)
    .filter(asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const renderAsset = (asset: typeof allAssets[0]) => {
    if (activeCategory === "tokens") {
      return (
        <div key={asset.id} className="component-card p-2 flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{asset.name}</div>
              <div className="text-xs text-muted-foreground">{asset.type}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {"value" in asset ? asset.value : ""}
          </div>
        </div>
      );
    }

    const Icon = "icon" in asset ? asset.icon : Image;
    
    if (viewMode === "list") {
      return (
        <div key={asset.id} className="component-card p-2 flex items-center gap-3 group cursor-pointer">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{asset.name}</div>
            <div className="text-xs text-muted-foreground">{"size" in asset ? asset.size : ""}</div>
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
        <div className="text-xs text-muted-foreground">{"size" in asset ? asset.size : ""}</div>
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
        
        {/* Category Tabs */}
        <div className="flex border border-border rounded-sm overflow-hidden">
          <button
            onClick={() => setActiveCategory("media")}
            className={`flex-1 px-2 py-1 text-xs ${
              activeCategory === "media" ? "bg-muted" : "hover:bg-muted/50"
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveCategory("tokens")}
            className={`flex-1 px-2 py-1 text-xs ${
              activeCategory === "tokens" ? "bg-muted" : "hover:bg-muted/50"
            }`}
          >
            Tokens
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {filteredAssets.length} items
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="text-xs bg-transparent border-none outline-none text-muted-foreground"
            >
              <option value="name-asc">A-Z</option>
              <option value="name-desc">Z-A</option>
              <option value="type">Type</option>
            </select>
          </div>
          {activeCategory === "media" && (
            <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
          )}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className={`
          ${activeCategory === "tokens" ? "space-y-1" : ""}
          ${activeCategory === "media" && viewMode === "list" ? "space-y-1" : ""}
          ${activeCategory === "media" && viewMode === "grid" ? "grid grid-cols-2 gap-2" : ""}
          ${activeCategory === "media" && viewMode === "cards" ? "grid grid-cols-1 gap-3" : ""}
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