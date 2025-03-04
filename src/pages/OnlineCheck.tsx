
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { Globe, Search, AlertTriangle, Check, Info } from 'lucide-react';

const OnlineCheck = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Simulate check process
  const handleCheck = () => {
    if (!text.trim()) return;
    
    setIsChecking(true);
    setProgress(0);
    
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 5;
      setProgress(progressValue);
      
      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsChecking(false);
          setCheckComplete(true);
        }, 500);
      }
    }, 150);
  };
  
  const handleReset = () => {
    setText('');
    setCheckComplete(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-5xl mx-auto mt-8">
          <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Online Plagiarism Check
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check text content against online sources to identify potential plagiarism.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 opacity-0 animate-slide-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <GlassmorphismCard className="p-6 h-full">
                {!checkComplete ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Enter Content to Check</h2>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe size={16} className="mr-1" />
                        <span>Online Check</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="content-check" className="block text-sm font-medium">
                        Paste your text below
                      </label>
                      <textarea
                        id="content-check"
                        rows={12}
                        placeholder="Enter or paste the text content you would like to check for plagiarism..."
                        className="w-full p-4 rounded-lg border border-input bg-background/70 focus:outline-none focus:ring-2 focus:ring-veri/20 transition-all resize-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isChecking}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Minimum 100 characters recommended</span>
                        <span>{text.length} characters</span>
                      </div>
                    </div>
                    
                    {isChecking ? (
                      <div className="space-y-4">
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div 
                            className="bg-veri h-2.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }} 
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Checking against online sources...
                          </span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <CustomButton 
                          onClick={handleCheck}
                          icon={<Search size={16} />}
                          disabled={text.length < 20}
                        >
                          Check for Plagiarism
                        </CustomButton>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                        <Check className="w-8 h-8 text-green-500" />
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
                      <p className="text-muted-foreground">
                        Your content has been analyzed against online sources.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 rounded-lg p-5 mb-8">
                      <div className="flex flex-col md:flex-row justify-between mb-6">
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-medium mb-1">Similarity Score</h3>
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl font-bold text-amber-700">
                              18%
                            </div>
                            <div className="ml-4">
                              <span className="text-sm inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                                Low Risk
                              </span>
                              <p className="text-xs text-muted-foreground mt-1">
                                Below threshold for concern
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-l-0 md:border-l border-border pl-0 md:pl-6">
                          <h3 className="font-medium mb-2">Summary</h3>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start">
                              <span className="inline-block w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                              <span>Most content appears to be original</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">!</span>
                              <span>Some phrases match common sources</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">i</span>
                              <span>3 potential sources identified</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h3 className="font-medium mb-2">Recommendation</h3>
                        <p className="text-sm text-muted-foreground">
                          The content has a low similarity score. While some phrases match common sources, the overall content appears to be mostly original. Review the detailed report to see specific matches.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <CustomButton 
                        variant="outline"
                        onClick={handleReset}
                      >
                        New Check
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
                <h2 className="text-xl font-semibold mb-4">About Online Checking</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-veri/10 mt-1">
                      <Globe className="w-5 h-5 text-veri" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Internet Sources</h3>
                      <p className="text-sm text-muted-foreground">
                        We check your content against billions of internet pages, academic papers, and publications.
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
                        Our system analyzes your text and compares it with online content to detect similarities and potential plagiarism.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-veri/10 mt-1">
                      <AlertTriangle className="w-5 h-5 text-veri" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        For the most accurate results, submit at least 300 characters of text and review the detailed report to understand all potential matches.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-medium mb-3">Tips for Interpretation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-veri">•</span>
                      <span>Similarity scores under 15% are generally considered low risk.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-veri">•</span>
                      <span>Common phrases may trigger matches but aren't necessarily plagiarism.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-veri">•</span>
                      <span>Always review sources to understand context of matches.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-veri">•</span>
                      <span>Use reports as a guide, not absolute determination of plagiarism.</span>
                    </li>
                  </ul>
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

export default OnlineCheck;
