import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, AlertCircle, CheckCircle, FileDown, Eye, Trash2, Loader } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';

interface PlagiarismResult {
  message: string;
  results: Array<{
    file1: string;
    file2: string;
    similarity: string;
    level: string;
  }>;
}

const UploadCheck = () => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | PlagiarismResult>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isApiError, setIsApiError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const analyzeFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload at least one document to check for plagiarism.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setIsApiError(false);
    setErrorMessage('');
    
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file-${index}`, file);
      });
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults: PlagiarismResult = {
        message: "Plagiarism check complete",
        results: [
          {
            file1: "1.jpg",
            file2: "1.jpg",
            similarity: "100.00%",
            level: "High"
          },
          {
            file1: "1.jpg",
            file2: "img.jpg",
            similarity: "5.21%",
            level: "Low"
          },
          {
            file1: "1.jpg",
            file2: "sample.jpg",
            similarity: "5.21%",
            level: "Low"
          }
        ]
      };
      
      setResults(mockResults);
      
      toast({
        title: "Analysis Complete",
        description: "We've completed the plagiarism analysis for your documents.",
      });
    } catch (error) {
      console.error("Plagiarism check error:", error);
      setIsApiError(true);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      
      toast({
        title: "Error analyzing documents",
        description: "There was a problem analyzing your documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const viewReport = async () => {
    if (!results) return;
    
    try {
      toast({
        title: "Opening Report",
        description: "Opening detailed plagiarism report in a new window.",
      });
      
      console.log("Viewing report for results:", results);
    } catch (error) {
      console.error("Error viewing report:", error);
      toast({
        title: "Error viewing report",
        description: "There was a problem retrieving the report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadReport = async () => {
    if (!results) return;
    
    try {
      toast({
        title: "Downloading Report",
        description: "Your plagiarism report is being downloaded as a PDF.",
      });
      
      console.log("Downloading report PDF for results:", results);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Error downloading report",
        description: "There was a problem generating the PDF report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const steps = [
    {
      title: "Upload Documents",
      description: "Upload your documents in PDF, Word, or text format for analysis.",
      icon: <Upload className="text-veri" size={24} />
    },
    {
      title: "Analyze Content",
      description: "Our system compares your text against billions of documents and web pages.",
      icon: <CheckCircle className="text-veri" size={24} />
    },
    {
      title: "Review Results",
      description: "Get detailed similarity scores and source information in an easy-to-read report.",
      icon: <FileText className="text-veri" size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Navbar />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 -left-20 w-96 h-96 bg-veri/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-write/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-veri/5 rounded-full blur-3xl"></div>
        </div>
      
        <div className="relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload & Check Documents</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your documents to check for plagiarism against our comprehensive database.
              We support PDF, Word documents, and text files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <GlassmorphismCard className="h-full shadow-lg animate-scale-in" intensity="medium">
                <div 
                  className={cn(
                    "h-60 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
                    isDragging ? "border-veri bg-veri/10 scale-[0.99]" : "border-border hover:border-veri/50 hover:bg-secondary/50"
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

                  <Upload size={40} className={cn(
                    "mb-4 transition-all duration-300",
                    isDragging ? "text-veri" : "text-muted-foreground"
                  )} />
                  <p className="text-foreground font-medium mb-1">
                    {isDragging ? "Drop files here" : "Drag & drop files or click to browse"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Supports PDF, Word documents, and text files
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 animate-slide-up">
                    <h3 className="text-lg font-medium mb-4">Uploaded Documents ({files.length})</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                      {files.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border hover:border-border/80 hover:bg-secondary/40 transition-all"
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
                            className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                            aria-label="Remove file"
                          >
                            <Trash2 size={18} />
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
                        className="bg-gradient-to-r from-veri to-veri/90 hover:shadow-md transition-shadow"
                      >
                        {isAnalyzing ? "Analyzing Documents..." : "Check for Plagiarism"}
                      </CustomButton>
                    </div>
                  </div>
                )}
              </GlassmorphismCard>
            </div>

            <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
              <GlassmorphismCard className="h-full shadow-lg" intensity="medium">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="bg-veri/10 text-veri p-1.5 rounded-md mr-2">
                      <CheckCircle size={18} />
                    </span>
                    Analysis Results
                  </h3>
                  
                  {isApiError && (
                    <div className="flex flex-col items-center justify-center h-60 text-center">
                      <AlertCircle size={40} className="text-destructive mb-4" />
                      <p className="text-destructive font-medium mb-2">
                        Error analyzing documents
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {errorMessage || "Please try again or contact support."}
                      </p>
                    </div>
                  )}
                  
                  {!results && !isAnalyzing && !isApiError && (
                    <div className="flex flex-col items-center justify-center h-60 text-center">
                      <AlertCircle size={40} className="text-muted-foreground mb-4 opacity-60" />
                      <p className="text-muted-foreground">
                        No results yet. Upload documents and run a plagiarism check to see results here.
                      </p>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-60 text-center">
                      <div className="w-16 h-16 relative mb-4">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-veri/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-veri rounded-full animate-spin"></div>
                      </div>
                      <p className="text-muted-foreground">
                        Analyzing documents for plagiarism...
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        This may take a few moments depending on file size and complexity.
                      </p>
                    </div>
                  )}

                  {results && !isAnalyzing && !isApiError && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-veri/10 p-4 rounded-lg border border-veri/20">
                        <p className="font-medium text-center text-veri">
                          {results.message}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Comparison Results</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                          {results.results.map((item, index) => (
                            <div 
                              key={index} 
                              className={cn(
                                "p-3 rounded-lg border transition-all hover:bg-secondary/40",
                                item.level === "High" 
                                  ? "bg-red-500/10 border-red-200 text-red-600" 
                                  : item.level === "Medium"
                                    ? "bg-amber-500/10 border-amber-200 text-amber-600"
                                    : "bg-green-500/10 border-green-200 text-green-600"
                              )}
                            >
                              <div className="flex justify-between items-center">
                                <div className="truncate max-w-[200px]">
                                  <span className="font-medium">{item.file1}</span>
                                  {" vs "}
                                  <span className="font-medium">{item.file2}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold">{item.similarity}</span>
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    {item.level}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <CustomButton 
                          variant="outline" 
                          fullWidth
                          icon={<Eye size={18} />}
                          onClick={viewReport}
                        >
                          View Report
                        </CustomButton>
                        
                        <CustomButton 
                          fullWidth
                          icon={<FileDown size={18} />}
                          onClick={downloadReport}
                        >
                          Download PDF
                        </CustomButton>
                      </div>
                    </div>
                  )}
                </div>
              </GlassmorphismCard>
            </div>
          </div>

          <div className="mt-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <GlassmorphismCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">How It Works</h3>
                
                <

