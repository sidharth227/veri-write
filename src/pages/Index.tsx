
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Logo from '@/components/Logo';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Logo className="mb-4" />
              <p className="text-muted-foreground text-sm">
                Advanced plagiarism detection for educators committed to academic integrity.
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-medium text-lg mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link to="/classroom" className="text-muted-foreground hover:text-foreground text-sm">Classroom</Link></li>
                <li><Link to="/upload-check" className="text-muted-foreground hover:text-foreground text-sm">Upload & Check</Link></li>
                <li><Link to="/online-check" className="text-muted-foreground hover:text-foreground text-sm">Online Check</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-medium text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground text-sm">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-medium text-lg mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground text-sm">22cs362@mgits.ac</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground text-sm">123 Academic Ave, Education City, EC 12345</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} VeriWrite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
