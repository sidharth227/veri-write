
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section 
      className={cn(
        'relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-28 pb-16 px-6 overflow-hidden',
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 -z-10" />
      
      {/* Radial glow behind the hero content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-veri/5 rounded-full blur-3xl -z-10" />

      {/* Animated dots pattern (purely decorative) */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-veri animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 right-40 w-3 h-3 rounded-full bg-write animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-32 left-1/4 w-5 h-5 rounded-full bg-veri animate-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute bottom-60 right-1/3 w-6 h-6 rounded-full bg-write animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Hero content */}
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-veri/10 text-veri">
            Academic Integrity Tool
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <span className="text-veri">Veri</span>
          <span className="text-write">Write</span>
          <span className="block text-foreground mt-4 text-balance">
            Protect Academic Integrity
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          Powerful plagiarism detection with Google Classroom integration. 
          Streamlined for educators, designed for academic excellence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <CustomButton 
            size="lg" 
            icon={<ArrowRight size={18} />} 
            iconPosition="right"
          >
            Get Started
          </CustomButton>
          <CustomButton 
            variant="outline" 
            size="lg"
          >
            Learn More
          </CustomButton>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <Shield className="text-veri" size={24} />,
              title: "Advanced Plagiarism Detection",
              description: "Compare submissions against a vast database and online sources",
              delay: '1.1s'
            },
            {
              icon: <svg className="w-6 h-6 text-veri" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              title: "Google Classroom Integration",
              description: "Seamlessly connect to your classroom for effortless document management",
              delay: '1.3s'
            },
            {
              icon: <CheckCircle className="text-veri" size={24} />,
              title: "Document Analysis",
              description: "Upload documents or check content against online sources with ease",
              delay: '1.5s'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 text-center rounded-lg bg-secondary/50 border border-border/50 hover:border-veri/20 hover:bg-secondary/80 transition-colors duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}
            >
              <div className="p-3 rounded-full bg-veri/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
