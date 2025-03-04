
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CustomButton from '@/components/ui/CustomButton';
import Logo from '@/components/Logo';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-veri">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to protect academic integrity?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join educators worldwide who trust VeriWrite to uphold standards of academic honesty
              and foster an environment of original thinking.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CustomButton 
                className="bg-white text-veri hover:bg-white/90" 
                size="lg" 
                icon={<ArrowRight size={18} />} 
                iconPosition="right"
              >
                Get Started Now
              </CustomButton>
              <Link to="/contact">
                <CustomButton 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10" 
                  size="lg"
                >
                  Contact Sales
                </CustomButton>
              </Link>
            </div>
          </div>
        </section>
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
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-medium text-lg mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground text-sm">contact@veriwrite.com</span>
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
