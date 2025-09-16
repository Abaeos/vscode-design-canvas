import { useState } from "react";
import { Search, Plus, Home, FileText, Settings, Users } from "lucide-react";

const samplePages = [
  { id: "1", name: "Home", path: "/", status: "published", icon: Home },
  { id: "2", name: "About", path: "/about", status: "draft", icon: FileText },
  { id: "3", name: "Contact", path: "/contact", status: "published", icon: Users },
  { id: "4", name: "Settings", path: "/settings", status: "draft", icon: Settings },
  { id: "5", name: "Privacy", path: "/privacy", status: "published", icon: FileText },
  { id: "6", name: "Blog", path: "/blog", status: "published", icon: FileText },
];

type SortOption = "name-asc" | "name-desc" | "status";

export const PagesPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  
  const filteredPages = samplePages
    .filter(page =>
      page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.path.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded-sm 
                     text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {filteredPages.length} pages
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="text-xs bg-transparent border-none outline-none text-muted-foreground"
            >
              <option value="name-asc">A-Z</option>
              <option value="name-desc">Z-A</option>
              <option value="status">Status</option>
            </select>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground">
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto">
        {filteredPages.map((page) => {
          const Icon = page.icon;
          return (
            <div key={page.id} className="tree-item p-3 border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{page.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      page.status === "published" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {page.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{page.path}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Button */}
      <div className="p-3 border-t border-border">
        <button className="w-full p-2 extension-tab rounded-sm flex items-center justify-center gap-2 text-sm">
          <Plus className="h-3.5 w-3.5" />
          New Page
        </button>
      </div>
    </div>
  );
};