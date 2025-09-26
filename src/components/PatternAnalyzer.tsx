import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, Scan, Sparkles, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  dotCount: number;
  symmetryType: string;
  complexity: string;
  principles: string[];
  description: string;
}

export function PatternAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const analyzePattern = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate API call - In real implementation, this would call Gemini API
    try {
      // This is where you'd integrate with Gemini API
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // const response = await fetch('/api/analyze-kolam', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Simulated analysis for demo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAnalysisResult({
        dotCount: Math.floor(Math.random() * 50) + 20,
        symmetryType: "Radial Symmetry",
        complexity: "Intermediate",
        principles: [
          "Geometric Progression",
          "Central Point Anchoring", 
          "Concentric Pattern Flow",
          "Traditional Dot Matrix"
        ],
        description: "This kolam demonstrates classic South Indian geometric principles with intricate dot connections forming a harmonious radial pattern. The design follows traditional mathematical proportions used in temple architecture."
      });

      toast({
        title: "Analysis Complete!",
        description: "Your kolam pattern has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your kolam. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card className="card-traditional">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl font-traditional">
            <Scan className="w-8 h-8 text-primary" />
            <span>Pattern Analyzer</span>
          </CardTitle>
          <CardDescription className="text-base">
            Upload a kolam image to discover its mathematical principles and cultural significance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="upload-area text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            {preview ? (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Kolam preview"
                  className="max-w-md max-h-64 mx-auto rounded-xl shadow-lg object-contain"
                />
                <p className="text-sm text-muted-foreground">
                  {selectedFile?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-primary/60 mx-auto" />
                <div>
                  <p className="text-lg font-medium">
                    Drop your kolam image here
                  </p>
                  <p className="text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="mt-6 text-center">
              <Button
                onClick={analyzePattern}
                disabled={isAnalyzing}
                className="btn-hero px-8 py-3"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Analyzing Pattern...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Kolam
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="animate-traditional-fade space-y-6">
          <h2 className="text-2xl font-traditional font-bold text-center text-primary">
            Pattern Analysis Results
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dot Count */}
            <Card className="analysis-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <span>Dot Count</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {analysisResult.dotCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  Individual connection points
                </p>
              </CardContent>
            </Card>

            {/* Symmetry Type */}
            <Card className="analysis-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Sparkles className="w-5 h-5 text-kolam-gold" />
                  <span>Symmetry</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-primary mb-1">
                  {analysisResult.symmetryType}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pattern organization
                </p>
              </CardContent>
            </Card>

            {/* Complexity */}
            <Card className="analysis-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <ImageIcon className="w-5 h-5 text-sacred-red" />
                  <span>Complexity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-primary mb-1">
                  {analysisResult.complexity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Design intricacy level
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Principles */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="text-xl font-traditional">
                Traditional Principles Identified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {analysisResult.principles.map((principle, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full" />
                    <span className="font-medium">{principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="card-traditional">
            <CardHeader>
              <CardTitle className="text-xl font-traditional">
                Cultural & Mathematical Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed">
                {analysisResult.description}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}