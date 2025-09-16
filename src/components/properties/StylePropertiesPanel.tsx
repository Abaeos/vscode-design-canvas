import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface StylePropertiesPanelProps {
  element: any;
}

export const StylePropertiesPanel = ({ element }: StylePropertiesPanelProps) => {
  const [openSections, setOpenSections] = useState({
    layout: true,
    spacing: true,
    size: false,
    position: false,
    typography: false,
    colors: false,
    backgrounds: false,
    borders: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const PropertySection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof openSections; 
    children: React.ReactNode;
  }) => (
    <Collapsible open={openSections[section]} onOpenChange={() => toggleSection(section)}>
      <CollapsibleTrigger className="w-full p-3 hover:bg-accent/50 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{title}</span>
          {openSections[section] ? 
            <ChevronDown className="h-4 w-4" /> : 
            <ChevronRight className="h-4 w-4" />
          }
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="space-y-1">
      {/* Style Selector */}
      <div className="p-3 border-b border-border">
        <Label className="text-xs text-muted-foreground mb-2 block">Style Selector</Label>
        <Select defaultValue="element">
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="element">Element</SelectItem>
            <SelectItem value="hover">:hover</SelectItem>
            <SelectItem value="focus">:focus</SelectItem>
            <SelectItem value="active">:active</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Layout */}
      <PropertySection title="Layout" section="layout">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Display</Label>
            <Select defaultValue="block">
              <SelectTrigger className="h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Flex Direction</Label>
              <Select defaultValue="row">
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Justify</Label>
              <Select defaultValue="start">
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                  <SelectItem value="between">Between</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PropertySection>

      {/* Spacing */}
      <PropertySection title="Spacing" section="spacing">
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-1">
            <div>
              <Label className="text-xs text-muted-foreground">Top</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Right</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Bottom</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Left</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">Margin</div>
          <div className="grid grid-cols-4 gap-1">
            <div>
              <Label className="text-xs text-muted-foreground">Top</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Right</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Bottom</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Left</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">Padding</div>
        </div>
      </PropertySection>

      {/* Size */}
      <PropertySection title="Size" section="size">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Width</Label>
              <Input placeholder="auto" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Height</Label>
              <Input placeholder="auto" className="h-8 mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Min W</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Min H</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Max W</Label>
              <Input placeholder="none" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Max H</Label>
              <Input placeholder="none" className="h-8 mt-1" />
            </div>
          </div>
        </div>
      </PropertySection>

      {/* Position */}
      <PropertySection title="Position" section="position">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Position</Label>
            <Select defaultValue="static">
              <SelectTrigger className="h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="static">Static</SelectItem>
                <SelectItem value="relative">Relative</SelectItem>
                <SelectItem value="absolute">Absolute</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="sticky">Sticky</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Top</Label>
              <Input placeholder="auto" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Right</Label>
              <Input placeholder="auto" className="h-8 mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Bottom</Label>
              <Input placeholder="auto" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Left</Label>
              <Input placeholder="auto" className="h-8 mt-1" />
            </div>
          </div>
        </div>
      </PropertySection>

      {/* Typography */}
      <PropertySection title="Typography" section="typography">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Font Family</Label>
            <Select defaultValue="inherit">
              <SelectTrigger className="h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inherit">Inherit</SelectItem>
                <SelectItem value="sans">Sans Serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="mono">Monospace</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Size</Label>
              <Input placeholder="16px" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Weight</Label>
              <Select defaultValue="400">
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light</SelectItem>
                  <SelectItem value="400">Normal</SelectItem>
                  <SelectItem value="500">Medium</SelectItem>
                  <SelectItem value="600">Semibold</SelectItem>
                  <SelectItem value="700">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Text Color</Label>
            <div className="flex gap-2 mt-1">
              <Input placeholder="#000000" className="h-8 flex-1" />
              <div className="w-8 h-8 bg-foreground border border-border rounded"></div>
            </div>
          </div>
        </div>
      </PropertySection>

      {/* Colors */}
      <PropertySection title="Colors" section="colors">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Background</Label>
            <div className="flex gap-2 mt-1">
              <Input placeholder="transparent" className="h-8 flex-1" />
              <div className="w-8 h-8 bg-transparent border border-border rounded"></div>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Border Color</Label>
            <div className="flex gap-2 mt-1">
              <Input placeholder="transparent" className="h-8 flex-1" />
              <div className="w-8 h-8 bg-transparent border border-border rounded"></div>
            </div>
          </div>
        </div>
      </PropertySection>

      {/* Borders */}
      <PropertySection title="Borders" section="borders">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Width</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Style</Label>
              <Select defaultValue="solid">
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Radius</Label>
              <Input placeholder="0" className="h-8 mt-1" />
            </div>
          </div>
        </div>
      </PropertySection>
    </div>
  );
};