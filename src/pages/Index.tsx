import { VSCodeExtension } from "@/components/VSCodeExtension";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { useState } from "react";

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background flex">
      <VSCodeExtension onElementSelect={setSelectedElement} />
      <div className="flex-1 bg-muted/20">
        {/* Main canvas area - placeholder */}
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Main Canvas Area
        </div>
      </div>
      <PropertiesPanel selectedElement={selectedElement} />
    </div>
  );
};

export default Index;
