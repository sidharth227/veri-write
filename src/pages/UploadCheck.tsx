
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, AlertCircle, CheckCircle, FileDown, Eye, Trash2, Loader } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';

// Define interface for plagiarism results returned from API
interface PlagiarismResult {
  score: number;       // Overall similarity score (percentage)
  matches: number;     // Number of matching sources found
  details?: {          // Optional detailed information
    matchedSources?: Array<{
      title: string;
      url: string;
      matchPercentage: number;
    }>;
    highlightedText?: Array<{
      text: string;
      matchId: string;
    }>;
  }
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

  /**
   * Analyze uploaded files for plagiarism
   * 
   * @remarks
   * This function sends the uploaded files to the plagiarism detection API
   * and updates the UI with the results.
   * 
   * @returns void
   */
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
      // INTEGRATION POINT: Replace this code block with your API implementation
      // ===================================================================
      // 1. Create a FormData object with the files
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file-${index}`, file);
      });
      
      // 2. Make the API call to your plagiarism detection service
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Authorization': 'Bearer YOUR_API_KEY'
      //   }
      // });
      
      // 3. Handle the API response
      // if (!response.ok) {
      //   throw new Error(`API Error: ${response.status}`);
      // }
      // const data = await response.json();
      // setResults(data);
      // ===================================================================
      
      // Simulating API call with timeout (REMOVE THIS IN PRODUCTION)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results (REPLACE WITH ACTUAL API RESPONSE)
      const mockResults: PlagiarismResult = {
        score: Math.floor(Math.random() * 30),
        matches: Math.floor(Math.random() * 10),
        details: {
          matchedSources: [
            { title: "Academic Paper #1", url: "https://example.com/paper1", matchPercentage: 12 },
            { title: "Online Article #2", url: "https://example.com/article2", matchPercentage: 8 }
          ]
        }
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

  /**
   * View detailed plagiarism report
   * 
   * @remarks
   * This function fetches and displays the detailed plagiarism report.
   * 
   * @returns void
   */
  const viewReport = async () => {
    if (!results) return;
    
    try {
      // INTEGRATION POINT: Replace this code block with your API implementation
      // ===================================================================
      // 1. Make the API call to fetch the detailed report
      // const reportId = "GENERATE_OR_RETRIEVE_REPORT_ID";
      // const response = await fetch(`YOUR_API_ENDPOINT/reports/${reportId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_API_KEY'
      //   }
      // });
      
      // 2. Handle the response
      // if (!response.ok) {
      //   throw new Error(`API Error: ${response.status}`);
      // }
      // const reportData = await response.json();
      // 
      // 3. Display the report in your UI
      // window.open(reportData.reportUrl, '_blank');
      // ===================================================================
      
      // In a real application, this would open a detailed report view
      toast({
        title: "Opening Report",
        description: "Opening detailed plagiarism report in a new window.",
      });
      
      // Simulating opening a report (REPLACE WITH ACTUAL IMPLEMENTATION)
      // For example, you might open a new window or display a modal with the report
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

  /**
   * Download plagiarism report as PDF
   * 
   * @remarks
   * This function generates and downloads the plagiarism report as a PDF file.
   * 
   * @returns void
   */
  const downloadReport = async () => {
    if (!results) return;
    
    try {
      // INTEGRATION POINT: Replace this code block with your API implementation
      // ===================================================================
      // 1. Make the API call to generate the PDF report
      // const reportId = "GENERATE_OR_RETRIEVE_REPORT_ID";
      // const response = await fetch(`YOUR_API_ENDPOINT/reports/${reportId}/pdf`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_API_KEY'
      //   }
      // });
      
      // 2. Handle the response
      // if (!response.ok) {
      //   throw new Error(`API Error: ${response.status}`);
      // }
      
      // 3. Download the PDF file
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `plagiarism-report-${Date.now()}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // window.URL.revokeObjectURL(url);
      // ===================================================================
      
      // In a real application, this would generate and download a PDF
      toast({
        title: "Downloading Report",
        description: "Your plagiarism report is being downloaded as a PDF.",
      });
      
      // Simulating download operation (REPLACE WITH ACTUAL IMPLEMENTATION)
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

  // Steps for the "How It Works" section
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
        {/* Decorative background elements */}
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
                  
                  {/* Error state */}
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
                  
                  {/* Empty state */}
                  {!results && !isAnalyzing && !isApiError && (
                    <div className="flex flex-col items-center justify-center h-60 text-center">
                      <AlertCircle size={40} className="text-muted-foreground mb-4 opacity-60" />
                      <p className="text-muted-foreground">
                        No results yet. Upload documents and run a plagiarism check to see results here.
                      </p>
                    </div>
                  )}

                  {/* Loading state */}
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

                  {/* Results state */}
                  {results && !isAnalyzing && !isApiError && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-secondary/30 p-5 rounded-lg border border-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Similarity Score</span>
                          <span className={cn(
                            "font-bold text-lg",
                            results.score < 15 ? "text-green-500" : 
                            results.score < 25 ? "text-amber-500" : "text-red-500"
                          )}>
                            {results.score}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
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
                          <div className="bg-secondary/30 px-4 py-2 rounded-lg border border-border">
                            <span className="font-bold text-lg">{results.matches}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">
                            sources with similar content
                          </span>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "p-4 rounded-lg flex items-center space-x-3",
                        results.score < 15 ? "bg-green-500/10 text-green-500 border border-green-200" : 
                        results.score < 25 ? "bg-amber-500/10 text-amber-500 border border-amber-200" : "bg-red-500/10 text-red-500 border border-red-200"
                      )}>
                        <CheckCircle size={20} />
                        <span className="text-sm font-medium">
                          {results.score < 15 ? "Low similarity - likely original content" : 
                           results.score < 25 ? "Moderate similarity - review highlighted sections" : 
                           "High similarity - significant matching content detected"}
                        </span>
                      </div>

                      {/* Optional: Display matched sources if available */}
                      {results.details?.matchedSources && results.details.matchedSources.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium mb-1">Matched Sources</h4>
                          <div className="max-h-32 overflow-y-auto space-y-2">
                            {results.details.matchedSources.map((source, idx) => (
                              <div key={idx} className="text-xs p-2 bg-secondary/20 rounded border border-border">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{source.title}</span>
                                  <span className="px-1.5 py-0.5 rounded-full bg-veri/10 text-veri">
                                    {source.matchPercentage}%
                                  </span>
                                </div>
                                <div className="text-muted-foreground truncate mt-1">
                                  {source.url}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

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
                
                {/* Interactive stepper */}
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-veri/50 via-veri/30 to-veri/10 z-0"></div>
                  
                  <div className="space-y-8">
                    {steps.map((step, index) => (
                      <div 
                        key={index}
                        className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                          activeStep === index ? 'bg-veri/5 shadow-sm transform scale-102' : 'hover:bg-veri/5'
                        }`}
                        onMouseEnter={() => setActiveStep(index)}
                      >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                          activeStep === index 
                            ? 'bg-veri/20 shadow-veri/20 shadow-md' 
                            : 'bg-veri/10'
                        }`}>
                          {step.icon}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-medium text-lg mb-2 transition-colors ${
                            activeStep === index ? 'text-veri' : ''
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                        
                        {activeStep === index && (
                          <div className="absolute -inset-px bg-veri/5 rounded-xl -z-10 animate-pulse opacity-50"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassmorphismCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadCheck;
