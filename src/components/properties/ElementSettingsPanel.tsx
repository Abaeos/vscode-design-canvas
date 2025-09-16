import { useState } from "react";
import { ChevronDown, ChevronRight, Image, Type, Layout, MousePointer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface ElementSettingsPanelProps {
  element: any;
}

export const ElementSettingsPanel = ({ element }: ElementSettingsPanelProps) => {
  const [openSections, setOpenSections] = useState({
    visibility: true,
    elementProps: true,
    accessibility: false,
    interactions: false,
    customAttributes: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const PropertySection = ({ 
    title, 
    section, 
    children,
    icon: Icon
  }: { 
    title: string; 
    section: keyof typeof openSections; 
    children: React.ReactNode;
    icon?: any;
  }) => (
    <Collapsible open={openSections[section]} onOpenChange={() => toggleSection(section)}>
      <CollapsibleTrigger className="w-full p-3 hover:bg-accent/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <span className="text-sm font-medium">{title}</span>
          </div>
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

  // Dynamic content based on element type
  const getElementSpecificSettings = () => {
    const elementType = element?.type || 'div';
    
    switch (elementType) {
      case 'img':
        return (
          <PropertySection title="Image Settings" section="elementProps" icon={Image}>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Source (src)</Label>
                <Input placeholder="https://example.com/image.jpg" className="h-8 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Alt Text</Label>
                <Input placeholder="Image description" className="h-8 mt-1" />
              </div>
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
              <div>
                <Label className="text-xs text-muted-foreground">Object Fit</Label>
                <Select defaultValue="cover">
                  <SelectTrigger className="h-8 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cover</SelectItem>
                    <SelectItem value="contain">Contain</SelectItem>
                    <SelectItem value="fill">Fill</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lazy-load" />
                <Label htmlFor="lazy-load" className="text-xs">Lazy Loading</Label>
              </div>
            </div>
          </PropertySection>
        );
      
      case 'button':
        return (
          <PropertySection title="Button Settings" section="elementProps" icon={MousePointer}>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Text Content</Label>
                <Input placeholder="Button text" className="h-8 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Button Type</Label>
                <Select defaultValue="button">
                  <SelectTrigger className="h-8 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="button">Button</SelectItem>
                    <SelectItem value="submit">Submit</SelectItem>
                    <SelectItem value="reset">Reset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Variant</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="h-8 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="destructive">Destructive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" />
                <Label htmlFor="disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </PropertySection>
        );
      
      case 'input':
        return (
          <PropertySection title="Input Settings" section="elementProps" icon={Type}>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Input Type</Label>
                <Select defaultValue="text">
                  <SelectTrigger className="h-8 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="tel">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Placeholder</Label>
                <Input placeholder="Enter placeholder text" className="h-8 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Default Value</Label>
                <Input placeholder="Default input value" className="h-8 mt-1" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="required" />
                <Label htmlFor="required" className="text-xs">Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="readonly" />
                <Label htmlFor="readonly" className="text-xs">Read Only</Label>
              </div>
            </div>
          </PropertySection>
        );
      
      default:
        return (
          <PropertySection title="Element Properties" section="elementProps" icon={Layout}>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Element ID</Label>
                <Input placeholder="unique-id" className="h-8 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">CSS Classes</Label>
                <Input placeholder="custom-class another-class" className="h-8 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Text Content</Label>
                <Textarea placeholder="Element text content" className="min-h-[60px] mt-1" />
              </div>
            </div>
          </PropertySection>
        );
    }
  };

  return (
    <div className="space-y-1">
      {/* Visibility */}
      <PropertySection title="Visibility" section="visibility">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Visibility</Label>
            <Select defaultValue="visible">
              <SelectTrigger className="h-8 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visible">Visible</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
                <SelectItem value="collapse">Collapse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Opacity</Label>
            <Input placeholder="1" className="h-8 mt-1" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pointer-events" defaultChecked />
            <Label htmlFor="pointer-events" className="text-xs">Enable Pointer Events</Label>
          </div>
        </div>
      </PropertySection>

      {/* Element-specific settings */}
      {getElementSpecificSettings()}

      {/* Accessibility */}
      <PropertySection title="Accessibility" section="accessibility">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">ARIA Label</Label>
            <Input placeholder="Descriptive label" className="h-8 mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">ARIA Role</Label>
            <Select>
              <SelectTrigger className="h-8 mt-1">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="button">Button</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="heading">Heading</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="main">Main</SelectItem>
                <SelectItem value="navigation">Navigation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Tab Index</Label>
            <Input placeholder="0" className="h-8 mt-1" />
          </div>
        </div>
      </PropertySection>

      {/* Interactions */}
      <PropertySection title="Interactions" section="interactions">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">onClick Handler</Label>
            <Input placeholder="handleClick" className="h-8 mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">onHover Handler</Label>
            <Input placeholder="handleHover" className="h-8 mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Link (href)</Label>
            <Input placeholder="/path-or-url" className="h-8 mt-1" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="external-link" />
            <Label htmlFor="external-link" className="text-xs">Open in New Tab</Label>
          </div>
        </div>
      </PropertySection>

      {/* Custom Attributes */}
      <PropertySection title="Custom Attributes" section="customAttributes">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Data Attributes</Label>
            <Textarea 
              placeholder={`data-testid="component-name"\ndata-analytics="button-click"`}
              className="min-h-[60px] mt-1 font-mono text-xs"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Custom Props</Label>
            <Textarea 
              placeholder={`customProp="value"\nanotherProp={true}`}
              className="min-h-[60px] mt-1 font-mono text-xs"
            />
          </div>
        </div>
      </PropertySection>
    </div>
  );
};