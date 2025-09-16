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
    <div className="border-b border-border/30">
      <Collapsible open={openSections[section]} onOpenChange={() => toggleSection(section)}>
        <CollapsibleTrigger className="w-full p-4 hover:bg-accent/30 transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{title}</span>
            {openSections[section] ? 
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /> : 
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            }
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <div className="space-y-3">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      {/* Style Selector */}
      <div className="p-4 bg-muted/20 border-b border-border/30">
        <Label className="text-xs font-medium text-foreground mb-3 block">Style Selector</Label>
        <Select defaultValue="element">
          <SelectTrigger className="h-9 bg-background border-input">
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
        <div>
          <Label className="text-xs font-medium text-foreground mb-2 block">Display</Label>
          <Select defaultValue="block">
            <SelectTrigger className="h-9 bg-muted/50 border-input">
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Flex Direction</Label>
            <Select defaultValue="row">
              <SelectTrigger className="h-9 bg-muted/50 border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="row">Row</SelectItem>
                <SelectItem value="column">Column</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Justify</Label>
            <Select defaultValue="start">
              <SelectTrigger className="h-9 bg-muted/50 border-input">
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
      </PropertySection>

      {/* Spacing */}
      <PropertySection title="Spacing" section="spacing">
        <div className="space-y-4">
          {/* Visual Box Model */}
          <div className="relative bg-muted/20 border border-border rounded-lg p-4">
            {/* Margin (outer) */}
            <div className="relative border-2 border-dashed border-orange-300 bg-orange-50/50 dark:bg-orange-900/20 rounded p-3">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded px-1">
                <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">margin</span>
              </div>
              
              {/* Margin input fields */}
              <input 
                placeholder="0" 
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                title="Margin Top"
              />
              <input 
                placeholder="0" 
                className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                title="Margin Right"
              />
              <input 
                placeholder="0" 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                title="Margin Bottom"
              />
              <input 
                placeholder="0" 
                className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                title="Margin Left"
              />

              {/* Padding (inner) */}
              <div className="relative border-2 border-dashed border-green-300 bg-green-50/50 dark:bg-green-900/20 rounded p-3">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded px-1">
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">padding</span>
                </div>
                
                {/* Padding input fields */}
                <input 
                  placeholder="0" 
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                  title="Padding Top"
                />
                <input 
                  placeholder="0" 
                  className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                  title="Padding Right"
                />
                <input 
                  placeholder="0" 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                  title="Padding Bottom"
                />
                <input 
                  placeholder="0" 
                  className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-12 h-6 text-xs text-center bg-background border border-input rounded px-1 focus:ring-1 focus:ring-ring"
                  title="Padding Left"
                />

                {/* Content area */}
                <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-300 rounded p-6 flex items-center justify-center">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PropertySection>

      {/* Size */}
      <PropertySection title="Size" section="size">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Width</Label>
            <Input placeholder="auto" className="h-9 bg-muted/50 border-input" />
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Height</Label>
            <Input placeholder="auto" className="h-9 bg-muted/50 border-input" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Min Width</Label>
            <Input placeholder="0" className="h-9 bg-muted/50 border-input" />
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Min Height</Label>
            <Input placeholder="0" className="h-9 bg-muted/50 border-input" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Max Width</Label>
            <Input placeholder="none" className="h-9 bg-muted/50 border-input" />
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Max Height</Label>
            <Input placeholder="none" className="h-9 bg-muted/50 border-input" />
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
        <div>
          <Label className="text-xs font-medium text-foreground mb-2 block">Font Family</Label>
          <Select defaultValue="inherit">
            <SelectTrigger className="h-9 bg-muted/50 border-input">
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Size</Label>
            <Input placeholder="16px" className="h-9 bg-muted/50 border-input" />
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Weight</Label>
            <Select defaultValue="400">
              <SelectTrigger className="h-9 bg-muted/50 border-input">
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
          <Label className="text-xs font-medium text-foreground mb-2 block">Text Color</Label>
          <div className="flex gap-2">
            <Input placeholder="#000000" className="h-9 bg-muted/50 border-input flex-1" />
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-foreground hover:bg-foreground/80">
              <div className="w-4 h-4 rounded border border-background"></div>
            </Button>
          </div>
        </div>
      </PropertySection>

      {/* Colors */}
      <PropertySection title="Colors" section="colors">
        <div>
          <Label className="text-xs font-medium text-foreground mb-2 block">Background</Label>
          <div className="flex gap-2">
            <Input placeholder="transparent" className="h-9 bg-muted/50 border-input flex-1" />
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent hover:bg-accent">
              <div className="w-4 h-4 rounded border border-border bg-background"></div>
            </Button>
          </div>
        </div>
        <div>
          <Label className="text-xs font-medium text-foreground mb-2 block">Border Color</Label>
          <div className="flex gap-2">
            <Input placeholder="transparent" className="h-9 bg-muted/50 border-input flex-1" />
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent hover:bg-accent">
              <div className="w-4 h-4 rounded border border-border bg-background"></div>
            </Button>
          </div>
        </div>
      </PropertySection>

      {/* Borders */}
      <PropertySection title="Borders" section="borders">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Width</Label>
            <Input placeholder="0" className="h-9 bg-muted/50 border-input" />
          </div>
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Style</Label>
            <Select defaultValue="solid">
              <SelectTrigger className="h-9 bg-muted/50 border-input">
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
            <Label className="text-xs font-medium text-foreground mb-2 block">Radius</Label>
            <Input placeholder="0" className="h-9 bg-muted/50 border-input" />
          </div>
        </div>
      </PropertySection>
    </div>
  );
};