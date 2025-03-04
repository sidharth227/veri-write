
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import AuthForm from '@/components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserCheck, Shield, ChevronsRight } from 'lucide-react';

const Classroom = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<'email' | 'google'>('email');
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock function for Google login
  const handleGoogleLogin = () => {
    // This would be replaced with actual OAuth logic
    console.log('Google login clicked');
    // For demo purposes, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-5xl mx-auto mt-12">
          <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-veri">Sign In</span> to VeriWrite
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access your account to manage documents and check for plagiarism
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="opacity-0 animate-slide-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <GlassmorphismCard className="p-8 h-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <button 
                      className={`py-2 px-4 text-sm font-medium ${authMethod === 'email' ? 'text-veri border-b-2 border-veri' : 'text-muted-foreground'}`}
                      onClick={() => setAuthMethod('email')}
                    >
                      Email & Password
                    </button>
                    <button 
                      className={`py-2 px-4 text-sm font-medium ${authMethod === 'google' ? 'text-veri border-b-2 border-veri' : 'text-muted-foreground'}`}
                      onClick={() => setAuthMethod('google')}
                    >
                      Google
                    </button>
                  </div>
                </div>

                {authMethod === 'email' ? (
                  <AuthForm />
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 rounded-full bg-veri/10 w-fit">
                      <LogIn className="w-8 h-8 text-veri" />
                    </div>
                    <h2 className="text-2xl font-bold">Google Login</h2>
                    <p className="text-muted-foreground">
                      Sign in with your Google account to connect your Google Classroom to VeriWrite.
                      Access all your courses and assignments in one place.
                    </p>
                    <div className="pt-4">
                      <CustomButton 
                        onClick={handleGoogleLogin}
                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>}
                      >
                        Sign in with Google
                      </CustomButton>
                    </div>
                  </div>
                )}
              </GlassmorphismCard>
            </div>
            
            <div className="opacity-0 animate-slide-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="space-y-8 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-veri/10">
                    <UserCheck className="w-5 h-5 text-veri" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">One-Time Setup</h3>
                    <p className="text-muted-foreground text-sm">
                      Connect your Google Classroom account once and get instant access to all your courses and assignments.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-veri/10">
                    <Shield className="w-5 h-5 text-veri" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Secure Access</h3>
                    <p className="text-muted-foreground text-sm">
                      We use Google's secure OAuth protocol. VeriWrite never sees or stores your Google password.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-veri/10">
                    <ChevronsRight className="w-5 h-5 text-veri" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Seamless Integration</h3>
                    <p className="text-muted-foreground text-sm">
                      Access student submissions directly and run plagiarism checks with a single click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <GlassmorphismCard className="p-8 bg-gradient-to-br from-secondary/80 to-secondary mb-8">
              <h3 className="text-xl font-semibold mb-4">How it works</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-veri text-white flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-muted-foreground pt-0.5">
                    Sign in with your account or connect with Google Classroom.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-veri text-white flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-muted-foreground pt-0.5">
                    All your courses and assignments are automatically imported into your VeriWrite dashboard.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-veri text-white flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-muted-foreground pt-0.5">
                    Select any assignment to view student submissions and run plagiarism checks.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-veri text-white flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-muted-foreground pt-0.5">
                    Review detailed reports and provide feedback directly to students.
                  </p>
                </li>
              </ol>
            </GlassmorphismCard>
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

export default Classroom;
