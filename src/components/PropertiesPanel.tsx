import { useState } from "react";
import { ChevronRight, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StylePropertiesPanel } from "./properties/StylePropertiesPanel";
import { ElementSettingsPanel } from "./properties/ElementSettingsPanel";

interface PropertiesPanelProps {
  selectedElement: any;
}

export const PropertiesPanel = ({ selectedElement }: PropertiesPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="w-8 bg-extension-background border-l border-border flex flex-col">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-accent transition-colors"
          title="Expand Properties Panel"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-extension-background border-l border-border flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Properties</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 hover:bg-accent rounded transition-colors"
          title="Collapse Properties Panel"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedElement ? (
          <Tabs defaultValue="styles" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-2">
              <TabsTrigger value="styles" className="text-xs">Styles</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">Properties</TabsTrigger>
            </TabsList>
            
            <TabsContent value="styles" className="flex-1 overflow-y-auto m-0">
              <StylePropertiesPanel element={selectedElement} />
            </TabsContent>
            
            <TabsContent value="settings" className="flex-1 overflow-y-auto m-0">
              <ElementSettingsPanel element={selectedElement} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-4">
            <Settings className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm text-center">
              Select an element to view and edit its properties
            </p>
          </div>
        )}
      </div>
    </div>
  );
};