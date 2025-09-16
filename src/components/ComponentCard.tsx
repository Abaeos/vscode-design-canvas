import { MoreVertical, Copy, Edit, Trash2 } from "lucide-react";
import { ViewMode } from "./ViewModeToggle";
import { useState } from "react";

interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface ComponentCardProps {
  component: Component;
  viewMode: ViewMode;
}

export const ComponentCard = ({ component, viewMode }: ComponentCardProps) => {
  const [showActions, setShowActions] = useState(false);

  if (viewMode === "list") {
    return (
      <div className="component-card p-2 flex items-center justify-between group">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">{component.name}</span>
            <span className="text-xs text-muted-foreground">{component.category}</span>
          </div>
        </div>
        <button 
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
          onClick={() => setShowActions(!showActions)}
        >
          <MoreVertical className="h-3 w-3" />
        </button>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="component-card p-2 group cursor-pointer">
        <div className="aspect-square bg-muted rounded-sm mb-2 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">
            {component.name.charAt(0)}
          </span>
        </div>
        <div className="text-xs font-medium truncate">{component.name}</div>
      </div>
    );
  }

  // Cards view
  return (
    <div className="component-card p-3 group cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium truncate">{component.name}</h4>
          <p className="text-xs text-muted-foreground">{component.category}</p>
        </div>
        <div className="relative">
          <button 
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical className="h-3 w-3" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-sm shadow-lg z-10 min-w-32">
              <button className="w-full px-3 py-1.5 text-left text-xs hover:bg-muted flex items-center gap-2">
                <Copy className="h-3 w-3" />
                Duplicate
              </button>
              <button className="w-full px-3 py-1.5 text-left text-xs hover:bg-muted flex items-center gap-2">
                <Edit className="h-3 w-3" />
                Edit
              </button>
              <button className="w-full px-3 py-1.5 text-left text-xs hover:bg-muted flex items-center gap-2 text-destructive">
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="aspect-[4/3] bg-muted rounded-sm mb-2 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          {component.name}
        </span>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2">
        {component.description}
      </p>
    </div>
  );
};