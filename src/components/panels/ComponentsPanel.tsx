import { useState } from "react";
import { Search, Plus, ArrowUpDown } from "lucide-react";
import { ViewModeToggle, ViewMode } from "../ViewModeToggle";
import { ComponentCard } from "../ComponentCard";

const sampleComponents = [
  { id: "1", name: "Button", category: "Form", description: "Primary action button" },
  { id: "2", name: "Input", category: "Form", description: "Text input field" },
  { id: "3", name: "Card", category: "Layout", description: "Content container" },
  { id: "4", name: "Modal", category: "Overlay", description: "Dialog overlay" },
  { id: "5", name: "Navbar", category: "Navigation", description: "Navigation bar" },
  { id: "6", name: "Footer", category: "Layout", description: "Page footer" },
  { id: "7", name: "Sidebar", category: "Layout", description: "Side navigation" },
  { id: "8", name: "Avatar", category: "Display", description: "User avatar" },
];

type SortOption = "name-asc" | "name-desc" | "category";

export const ComponentsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  
  const filteredComponents = sampleComponents
    .filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded-sm 
                     text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {filteredComponents.length} components
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="text-xs bg-transparent border-none outline-none text-muted-foreground"
            >
              <option value="name-asc">A-Z</option>
              <option value="name-desc">Z-A</option>
              <option value="category">Category</option>
            </select>
          </div>
          <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className={`
          ${viewMode === "list" ? "space-y-1" : ""}
          ${viewMode === "grid" ? "grid grid-cols-2 gap-2" : ""}
          ${viewMode === "cards" ? "grid grid-cols-1 gap-3" : ""}
        `}>
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>

      {/* Add Button */}
      <div className="p-3 border-t border-border">
        <button className="w-full p-2 extension-tab rounded-sm flex items-center justify-center gap-2 text-sm">
          <Plus className="h-3.5 w-3.5" />
          Add Component
        </button>
      </div>
    </div>
  );
};