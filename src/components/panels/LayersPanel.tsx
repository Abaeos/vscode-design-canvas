import { useState } from "react";
import { ChevronRight, ChevronDown, Eye, EyeOff, Lock, Unlock, Square, Image, Code, Type, Layout, Columns, FileText } from "lucide-react";

interface LayerNode {
  id: string;
  name: string;
  type: string;
  children?: LayerNode[];
  isVisible: boolean;
  isLocked: boolean;
}

const getElementIcon = (type: string) => {
  switch (type) {
    case "div":
    case "body":
      return Square;
    case "img":
      return Image;
    case "code":
      return Code;
    case "section":
      return Layout;
    case "header":
    case "footer":
    case "nav":
      return Layout;
    case "main":
      return FileText;
    case "h1":
    case "h2":
    case "h3":
    case "p":
    case "span":
      return Type;
    case "container":
      return Columns;
    default:
      return Square;
  }
};

const sampleLayers: LayerNode[] = [
  {
    id: "1",
    name: "App",
    type: "div",
    isVisible: true,
    isLocked: false,
    children: [
      {
        id: "2",
        name: "Header",
        type: "header",
        isVisible: true,
        isLocked: false,
        children: [
          { id: "3", name: "Logo", type: "img", isVisible: true, isLocked: false },
          { id: "4", name: "Navigation", type: "nav", isVisible: true, isLocked: false },
        ],
      },
      {
        id: "5",
        name: "Main Content",
        type: "main",
        isVisible: true,
        isLocked: false,
        children: [
          { id: "6", name: "Hero Section", type: "section", isVisible: true, isLocked: false },
          { id: "7", name: "Features", type: "section", isVisible: true, isLocked: false },
        ],
      },
      { id: "8", name: "Footer", type: "footer", isVisible: true, isLocked: false },
    ],
  },
];

interface LayersPanelProps {
  onElementSelect?: (element: any) => void;
}

export const LayersPanel = ({ onElementSelect }: LayersPanelProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["1", "2", "5"]));
  const [selectedNode, setSelectedNode] = useState<string>("6");

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderLayerNode = (node: LayerNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <div
          className={`tree-item flex items-center py-1 px-2 cursor-pointer group ${
            isSelected ? "bg-[hsl(var(--extension-selected))]" : ""
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            setSelectedNode(node.id);
            onElementSelect?.(node);
          }}
        >
          {/* Expand/Collapse Button */}
          <button
            className="w-4 h-4 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleExpanded(node.id);
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )
            ) : null}
          </button>

          {/* Layer Info */}
          <div className="flex-1 flex items-center gap-2 min-w-0 ml-1">
            {(() => {
              const Icon = getElementIcon(node.type);
              return <Icon className="h-3 w-3 text-muted-foreground" />;
            })()}
            <span className="text-sm truncate">{node.name}</span>
            <span className="text-xs text-muted-foreground opacity-60">{node.type}</span>
          </div>

          {/* Layer Controls */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-0.5 hover:bg-muted rounded"
              onClick={(e) => e.stopPropagation()}
              title={node.isVisible ? "Hide" : "Show"}
            >
              {node.isVisible ? (
                <Eye className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3 text-muted-foreground" />
              )}
            </button>
            <button
              className="p-0.5 hover:bg-muted rounded"
              onClick={(e) => e.stopPropagation()}
              title={node.isLocked ? "Unlock" : "Lock"}
            >
              {node.isLocked ? (
                <Lock className="h-3 w-3" />
              ) : (
                <Unlock className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderLayerNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="text-xs text-muted-foreground">Page Structure</div>
      </div>

      {/* Layer Tree */}
      <div className="flex-1 overflow-y-auto">
        {sampleLayers.map((layer) => renderLayerNode(layer))}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {selectedNode && `Selected: ${sampleLayers[0].children?.find(c => c.id === selectedNode)?.name || "Element"}`}
        </div>
      </div>
    </div>
  );
};