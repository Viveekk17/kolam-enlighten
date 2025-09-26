import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, 
  Grid, 
  Sparkles, 
  Save, 
  Download, 
  Undo, 
  Redo,
  RotateCw,
  Zap,
  Eye,
  Layers,
  Settings,
  Paintbrush2,
  MousePointer
} from "lucide-react";

interface Tool {
  name: string;
  icon: any;
  description: string;
  active?: boolean;
}

const tools: Tool[] = [
  { name: "Select", icon: MousePointer, description: "Select and move elements" },
  { name: "Dot", icon: Grid, description: "Place connection dots" },
  { name: "Line", icon: Paintbrush2, description: "Draw connecting lines" },
  { name: "Pattern", icon: Sparkles, description: "Add traditional patterns" }
];

const templates = [
  {
    name: "Simple 5-Dot",
    difficulty: "Beginner",
    dots: 5,
    preview: "◦ ◦ ◦\n ◦ ◦",
    description: "Perfect starting pattern for newcomers"
  },
  {
    name: "Lotus Mandala", 
    difficulty: "Intermediate",
    dots: 13,
    preview: "◦ ◦ ◦ ◦ ◦\n◦ ◦ ◦ ◦ ◦\n ◦ ◦ ◦",
    description: "Classic lotus-inspired design"  
  },
  {
    name: "Temple Gateway",
    difficulty: "Advanced", 
    dots: 25,
    preview: "◦ ◦ ◦ ◦ ◦\n◦ ◦ ◦ ◦ ◦\n◦ ◦ ◦ ◦ ◦\n◦ ◦ ◦ ◦ ◦\n ◦ ◦ ◦ ◦ ◦",
    description: "Complex temple-inspired geometry"
  }
];

const colorPalettes = [
  { name: "Traditional", colors: ["#8B0000", "#FFD700", "#FFFFFF", "#000000"] },
  { name: "Festival", colors: ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5"] },
  { name: "Temple", colors: ["#4A0E4E", "#81689D", "#FFD23F", "#FF6B35"] },
  { name: "Modern", colors: ["#2C3E50", "#3498DB", "#E74C3C", "#F39C12"] }
];

export default function Create() {
  const [selectedTool, setSelectedTool] = useState("Select");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState([3]);
  const [selectedPalette, setSelectedPalette] = useState("Traditional");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700"; 
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-traditional font-bold text-primary">
          Creation Studio
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Design beautiful kolam patterns with our digital tools. Start from templates 
          or create from scratch using traditional principles and modern technology.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Tools & Options */}
        <div className="space-y-6">
          {/* Tools */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-primary" />
                <span>Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tools.map((tool) => (
                <Button
                  key={tool.name}
                  variant={selectedTool === tool.name ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start ${
                    selectedTool === tool.name 
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" 
                      : ""
                  }`}
                  onClick={() => setSelectedTool(tool.name)}
                >
                  <tool.icon className="w-4 h-4 mr-2" />
                  {tool.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Brush Settings */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Brush Size</label>
                <Slider
                  value={brushSize}
                  onValueChange={setBrushSize}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Size: {brushSize[0]}px
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Grid Snap</label>
                <Button size="sm" variant="outline" className="w-full">
                  <Grid className="w-4 h-4 mr-2" />
                  Enabled
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Color Palettes */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Paintbrush2 className="w-5 h-5 text-primary" />
                <span>Colors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {colorPalettes.map((palette) => (
                <div key={palette.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{palette.name}</span>
                    <Button 
                      size="sm" 
                      variant={selectedPalette === palette.name ? "default" : "outline"}
                      onClick={() => setSelectedPalette(palette.name)}
                      className="h-6 px-2 text-xs"
                    >
                      {selectedPalette === palette.name ? "Active" : "Use"}
                    </Button>
                  </div>
                  <div className="flex space-x-1">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Undo className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Redo className="w-4 h-4 mr-2" />
                Redo
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <RotateCw className="w-4 h-4 mr-2" />
                Rotate
              </Button>
              <div className="divider-traditional my-3" />
              <Button size="sm" className="w-full justify-start bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save Design
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Canvas Controls */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-traditional font-bold text-primary">
              Canvas
            </h2>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" variant="outline">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </Button>
              <Button size="sm" variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Auto-Complete
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <Card className="card-traditional">
            <CardContent className="p-8">
              <div className="aspect-square bg-gradient-to-br from-background to-kolam-cream/30 rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center dot-pattern">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                    <Palette className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-traditional font-semibold text-primary mb-2">
                      Start Creating
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Select a template to begin or start drawing with the tools on the left. 
                      Your kolam pattern will appear here.
                    </p>
                  </div>
                  <Button className="btn-hero">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Begin Drawing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canvas Info */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="analysis-card text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Dots Placed</div>
              </CardContent>
            </Card>
            <Card className="analysis-card text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Lines Drawn</div>
              </CardContent>
            </Card>
            <Card className="analysis-card text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">—</div>
                <div className="text-sm text-muted-foreground">Symmetry</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Templates & Inspiration */}
        <div className="space-y-6">
          {/* Templates */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-primary" />
                <span>Templates</span>
              </CardTitle>
              <CardDescription>
                Start with traditional patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {templates.map((template, index) => (
                <div 
                  key={index}
                  className="p-3 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedTemplate(template.name)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-primary text-sm">{template.name}</h4>
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="bg-background/50 rounded p-2 mb-2 font-mono text-xs text-center">
                    {template.preview.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.dots} dots</span>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Inspiration */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Inspiration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="font-medium text-primary">Traditional Principles:</p>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>• Start from center point</li>
                  <li>• Maintain symmetry</li>
                  <li>• Connect without lifting</li>
                  <li>• Use mathematical ratios</li>
                </ul>
              </div>
              
              <div className="divider-traditional" />
              
              <div className="text-sm space-y-2">
                <p className="font-medium text-primary">Popular Motifs:</p>
                <div className="flex flex-wrap gap-1">
                  {["Lotus", "Peacock", "Star", "Mandala", "Temple"].map((motif) => (
                    <Badge key={motif} variant="outline" className="text-xs">
                      {motif}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}