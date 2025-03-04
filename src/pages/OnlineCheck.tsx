
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Search, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { cn } from '@/lib/utils';

const OnlineCheck = () => {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | { 
    score: number; 
    matches: number;
    sources: Array<{ url: string; similarity: number; title: string }>;
  }>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const analyzeText = () => {
    if (text.trim().length < 50) {
      toast({
        title: "Text too short",
        description: "Please enter at least 50 characters for accurate plagiarism detection.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate plagiarism check with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Generate mock results
      const mockScore = Math.floor(Math.random() * 40);
      const mockMatches = Math.floor(Math.random() * 5) + 1;
      
      const mockSources = Array.from({ length: mockMatches }, (_, i) => ({
        url: `https://example${i + 1}.com/article${Math.floor(Math.random() * 100)}`,
        similarity: Math.floor(Math.random() * 30) + 10,
        title: `Sample Academic Article ${i + 1}`
      }));
      
      setResults({
        score: mockScore,
        matches: mockMatches,
        sources: mockSources
      });
      
      toast({
        title: "Analysis Complete",
        description: "We've completed the plagiarism analysis of your text.",
      });
    }, 2500);
  };

  const clearText = () => {
    setText('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Online Plagiarism Check</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check text directly against online sources to verify originality and identify 
            potential plagiarism in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GlassmorphismCard className="h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Enter Text to Check</h3>
                  <div>
                    <CustomButton 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearText}
                    >
                      Clear
                    </CustomButton>
                  </div>
                </div>

                <textarea
                  className="w-full h-64 p-4 bg-secondary/30 rounded-lg border border-border focus:border-veri/50 focus:ring-1 focus:ring-veri/50 transition-all outline-none resize-none"
                  placeholder="Paste or type the text you want to check for plagiarism here..."
                  value={text}
                  onChange={handleTextChange}
                ></textarea>
                
                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                  <span>{text.length} characters</span>
                  <span>Minimum 50 characters required</span>
                </div>

                <div className="mt-6">
                  <CustomButton 
                    onClick={analyzeText} 
                    loading={isAnalyzing}
                    fullWidth 
                    size="lg"
                    icon={<Search size={18} />}
                  >
                    {isAnalyzing ? "Analyzing Text..." : "Check for Plagiarism"}
                  </CustomButton>
                </div>
              </div>
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
                      No results yet. Enter text and run a plagiarism check to see results here.
                    </p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center h-60 text-center">
                    <div className="w-12 h-12 border-4 border-t-transparent border-veri rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground">
                      Analyzing text for plagiarism...
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
                      <h4 className="font-medium mb-2">Online Sources</h4>
                      {results.sources.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {results.sources.map((source, index) => (
                            <div key={index} className="bg-secondary/30 p-3 rounded-lg border border-border">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-sm truncate w-48">{source.title}</p>
                                  <p className="text-xs text-muted-foreground truncate w-48">{source.url}</p>
                                </div>
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-veri/10 text-veri">
                                  {source.similarity}%
                                </span>
                              </div>
                              <div className="mt-2 flex justify-end">
                                <button 
                                  className="text-xs flex items-center text-veri hover:underline"
                                  onClick={() => window.open(source.url, '_blank')}
                                >
                                  View Source
                                  <ExternalLink size={10} className="ml-1" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No matching sources found.</p>
                      )}
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
              <h3 className="text-xl font-semibold mb-4">Online Plagiarism Detection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-3">How It Works</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-veri/10 text-veri flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">1</span>
                      <span>Paste your text in the editor or type directly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-veri/10 text-veri flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">2</span>
                      <span>Our algorithms compare your text with billions of online sources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-veri/10 text-veri flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">3</span>
                      <span>Receive a detailed analysis with similarity scores and matching sources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-veri/10 text-veri flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">4</span>
                      <span>Review highlighted sections to identify potential plagiarism</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-3">Best Practices</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-veri mr-2 mt-0.5" />
                      <span>Check drafts before final submission to catch issues early</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-veri mr-2 mt-0.5" />
                      <span>Review all highlighted matches, some may be coincidental</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-veri mr-2 mt-0.5" />
                      <span>Use proper citations for all referenced materials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-veri mr-2 mt-0.5" />
                      <span>For longer documents, use the document upload feature instead</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </div>
      </main>
    </div>
  );
};

export default OnlineCheck;
