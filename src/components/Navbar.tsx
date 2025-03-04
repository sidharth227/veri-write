
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import DarkModeToggle from './DarkModeToggle';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Classroom', path: '/classroom' },
  { name: 'Upload & Check', path: '/upload-check' },
  { name: 'Online Check', path: '/online-check' },
  { name: 'Contact Us', path: '/contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
        scrolled 
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-md' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Logo size="md" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors relative',
                'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100',
                location.pathname === item.path 
                  ? 'after:bg-veri after:scale-x-100 text-foreground' 
                  : 'after:bg-veri/70 text-foreground/80 hover:text-foreground',
                'animate-slide-in'
              )}
              style={{ 
                animationDelay: `${0.1 + index * 0.1}s`, 
                animationFillMode: 'backwards' 
              }}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Dark mode toggle */}
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <DarkModeToggle />
          <button 
            className="text-foreground" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg py-4 px-6 animate-slide-up">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'py-2 text-sm font-medium transition-colors',
                  location.pathname === item.path 
                    ? 'text-veri' 
                    : 'text-foreground/80 hover:text-foreground',
                  'animate-fade-in'
                )}
                style={{ 
                  animationDelay: `${0.1 + index * 0.1}s`, 
                  animationFillMode: 'backwards' 
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
