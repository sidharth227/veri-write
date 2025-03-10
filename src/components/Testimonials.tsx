
import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "VeriWrite has revolutionized how we handle academic integrity at our university. The handwritten document scanning is a game-changer.",
    author: "Dr. Sarah Johnson",
    role: "Department Chair, Stanford University"
  },
  {
    quote: "The accuracy of VeriWrite's plagiarism detection is unmatched. It catches subtle instances that other tools miss completely.",
    author: "Prof. Michael Chen",
    role: "Computer Science, MIT"
  },
  {
    quote: "My students appreciate the clear reports and learning opportunities that VeriWrite provides. It's not just about catching plagiarism, but teaching proper citation.",
    author: "Dr. Emily Rodriguez",
    role: "English Department, UC Berkeley"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Educators Are <span className="text-veri">Saying</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            VeriWrite is trusted by educators at leading institutions around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-xl relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-veri rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              <p className="italic text-muted-foreground mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
