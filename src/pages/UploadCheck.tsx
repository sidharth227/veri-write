
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { cn } from '@/lib/utils';

const UploadCheck = () => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | { score: number; matches: number }>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Filter for acceptable file types
    const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const validFiles = newFiles.filter(file => acceptedTypes.includes(file.type));
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, Word documents, and text files are supported.",
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload at least one document to check for plagiarism.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate plagiarism check with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        score: Math.floor(Math.random() * 30), // Random similarity score between 0-30%
        matches: Math.floor(Math.random() * 10) // Random number of matches
      });
      
      toast({
        title: "Analysis Complete",
        description: "We've completed the plagiarism analysis for your documents.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload & Check Documents</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your documents to check for plagiarism against our comprehensive database.
            We support PDF, Word documents, and text files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GlassmorphismCard className="h-full">
              <div 
                className={cn(
                  "h-60 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
                  isDragging ? "border-veri bg-veri/5" : "border-border hover:border-veri/50 hover:bg-secondary/50",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />

                <Upload size={40} className="text-muted-foreground mb-4" />
                <p className="text-foreground font-medium mb-1">
                  {isDragging ? "Drop files here" : "Drag & drop files or click to browse"}
                </p>
                <p className="text-muted-foreground text-sm">
                  Supports PDF, Word documents, and text files
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Uploaded Documents ({files.length})</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border"
                      >
                        <div className="flex items-center">
                          <FileText className="text-veri mr-3" size={20} />
                          <div>
                            <p className="font-medium truncate max-w-[300px]">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove file"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <CustomButton 
                      onClick={analyzeFiles} 
                      loading={isAnalyzing}
                      fullWidth 
                      size="lg"
                    >
                      {isAnalyzing ? "Analyzing Documents..." : "Check for Plagiarism"}
                    </CustomButton>
                  </div>
                </div>
              )}
            </GlassmorphismCard>
          </div>

          <div>
            <GlassmorphismCard className="h-full">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
                
                {!results && !isAnalyzing && (
                  <div className="flex flex-col items-center justify-center h-60 text-center">
                    <AlertCircle size={40} className="text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No results yet. Upload documents and run a plagiarism check to see results here.
                    </p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center h-60 text-center">
                    <div className="w-12 h-12 border-4 border-t-transparent border-veri rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground">
                      Analyzing documents for plagiarism...
                    </p>
                  </div>
                )}

                {results && !isAnalyzing && (
                  <div className="space-y-6">
                    <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Similarity Score</span>
                        <span className={cn(
                          "font-bold",
                          results.score < 15 ? "text-green-500" : 
                          results.score < 25 ? "text-amber-500" : "text-red-500"
                        )}>
                          {results.score}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            results.score < 15 ? "bg-green-500" : 
                            results.score < 25 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${results.score}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Matches Found</h4>
                      <div className="flex items-center space-x-2">
                        <div className="bg-secondary/30 px-3 py-2 rounded-lg border border-border">
                          <span className="font-bold">{results.matches}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          sources with similar content
                        </span>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-lg flex items-center space-x-2",
                      results.score < 15 ? "bg-green-500/10 text-green-500" : 
                      results.score < 25 ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                    )}>
                      <CheckCircle size={18} />
                      <span className="text-sm font-medium">
                        {results.score < 15 ? "Low similarity - likely original content" : 
                         results.score < 25 ? "Moderate similarity - review highlighted sections" : 
                         "High similarity - significant matching content detected"}
                      </span>
                    </div>

                    <CustomButton 
                      variant="outline" 
                      fullWidth
                    >
                      View Detailed Report
                    </CustomButton>
                  </div>
                )}
              </div>
            </GlassmorphismCard>
          </div>
        </div>

        <div className="mt-12">
          <GlassmorphismCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-veri/10 flex items-center justify-center mb-4">
                    <span className="text-veri font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-medium mb-2">Upload Documents</h4>
                  <p className="text-muted-foreground text-sm">
                    Upload your documents in PDF, Word, or text format for analysis.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-veri/10 flex items-center justify-center mb-4">
                    <span className="text-veri font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-medium mb-2">Analyze Content</h4>
                  <p className="text-muted-foreground text-sm">
                    Our system compares your text against billions of documents and web pages.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-veri/10 flex items-center justify-center mb-4">
                    <span className="text-veri font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-medium mb-2">Review Results</h4>
                  <p className="text-muted-foreground text-sm">
                    Get detailed similarity scores and source information in an easy-to-read report.
                  </p>
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </div>
      </main>
    </div>
  );
};

export default UploadCheck;
