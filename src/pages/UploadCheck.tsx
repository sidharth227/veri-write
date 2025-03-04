
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { Upload, FileText, X, Check, AlertTriangle, Info, UploadCloud } from 'lucide-react';

const UploadCheck = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      e.dataTransfer.clearData();
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  // Remove file
  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // Start upload and scan process
  const startUploadAndScan = () => {
    if (files.length === 0) return;
    
    setUploadStatus('uploading');
    
    // Simulated upload process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus('success');
        setTimeout(() => {
          setScanComplete(true);
        }, 1000);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-5xl mx-auto mt-8">
          <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload & Check Documents
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload documents to check for plagiarism against our comprehensive database.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 opacity-0 animate-slide-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <GlassmorphismCard className="p-6 h-full">
                {!scanComplete ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Upload Documents</h2>
                      {files.length > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {files.length} file{files.length !== 1 ? 's' : ''} selected
                        </span>
                      )}
                    </div>
                    
                    {/* Upload area */}
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center 
                        ${isDragging ? 'border-veri bg-veri/5' : 'border-border'} 
                        transition-colors`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center">
                        <UploadCloud 
                          className={`w-16 h-16 mb-4 ${isDragging ? 'text-veri' : 'text-muted-foreground'}`} 
                        />
                        <h3 className="text-lg font-medium mb-2">
                          {isDragging ? 'Drop files here' : 'Drag and drop files here'}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          or click to browse from your computer
                        </p>
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">
                          <CustomButton 
                            type="button" 
                            icon={<Upload size={16} />}
                          >
                            Browse Files
                          </CustomButton>
                        </label>
                      </div>
                    </div>
                    
                    {/* File list */}
                    {files.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-medium">Files to Check</h3>
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                          {files.map((file, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                            >
                              <div className="flex items-center">
                                <FileText className="text-muted-foreground mr-3" size={20} />
                                <div>
                                  <p className="font-medium truncate max-w-xs">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-secondary rounded-full transition-colors"
                                aria-label="Remove file"
                              >
                                <X size={16} className="text-muted-foreground" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Upload controls */}
                    {files.length > 0 && (
                      <div>
                        {uploadStatus === 'idle' ? (
                          <div className="flex justify-end">
                            <CustomButton 
                              onClick={startUploadAndScan}
                              icon={<Check size={16} />}
                            >
                              Start Plagiarism Check
                            </CustomButton>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-full bg-secondary rounded-full h-2.5 dark:bg-gray-700">
                              <div 
                                className="bg-veri h-2.5 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${scanProgress}%` }} 
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {uploadStatus === 'uploading' ? 'Scanning documents...' : 'Scan complete!'}
                              </span>
                              <span className="font-medium">{scanProgress}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">Scan Complete!</h2>
                    <p className="text-muted-foreground mb-8">
                      Your documents have been analyzed for plagiarism.
                    </p>
                    
                    <div className="max-w-md mx-auto bg-secondary/50 rounded-lg p-4 mb-8">
                      <div className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div className="text-left">
                          <h4 className="font-medium">Summary of Findings</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            We found potential matches in 2 of your documents. Review the detailed report for more information.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <CustomButton 
                        variant="outline"
                        onClick={() => {
                          setFiles([]);
                          setUploadStatus('idle');
                          setScanProgress(0);
                          setScanComplete(false);
                        }}
                      >
                        New Scan
                      </CustomButton>
                      <CustomButton>
                        View Detailed Report
                      </CustomButton>
                    </div>
                  </div>
                )}
              </GlassmorphismCard>
            </div>
            
            <div className="opacity-0 animate-slide-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <GlassmorphismCard className="p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">About Document Checking</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-veri/10 mt-1">
                      <FileText className="w-5 h-5 text-veri" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Supported Formats</h3>
                      <p className="text-sm text-muted-foreground">
                        We support .docx, .pdf, .txt, and other common document formats.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-veri/10 mt-1">
                      <Info className="w-5 h-5 text-veri" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">How It Works</h3>
                      <p className="text-sm text-muted-foreground">
                        Our advanced algorithms analyze your documents and compare them against our database to identify potential plagiarism.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-veri/10 mt-1">
                      <AlertTriangle className="w-5 h-5 text-veri" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Privacy & Security</h3>
                      <p className="text-sm text-muted-foreground">
                        All documents are processed securely. We respect your privacy and do not share your content with third parties.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-medium mb-3">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're experiencing any issues or have questions about the document checking process, our support team is here to help.
                  </p>
                  <CustomButton 
                    variant="outline" 
                    fullWidth
                  >
                    Contact Support
                  </CustomButton>
                </div>
              </GlassmorphismCard>
            </div>
          </div>
        </div>
      </main>
      
      {/* Simple footer */}
      <footer className="bg-secondary py-6 px-6">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} VeriWrite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UploadCheck;
