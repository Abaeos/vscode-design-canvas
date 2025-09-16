import { Grid, List, LayoutGrid } from "lucide-react";

export type ViewMode = "list" | "grid" | "cards";

interface ViewModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const viewModes = [
  { id: "list" as ViewMode, icon: List, title: "List View" },
  { id: "grid" as ViewMode, icon: Grid, title: "Grid View" },
  { id: "cards" as ViewMode, icon: LayoutGrid, title: "Card View" },
];

export const ViewModeToggle = ({ mode, onModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex rounded-sm border border-border overflow-hidden">
      {viewModes.map((viewMode) => {
        const Icon = viewMode.icon;
        const isActive = mode === viewMode.id;
        
        return (
          <button
            key={viewMode.id}
            onClick={() => onModeChange(viewMode.id)}
            className={`p-1.5 view-mode-btn ${isActive ? "active" : ""}`}
            title={viewMode.title}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
};