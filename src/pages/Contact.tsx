
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MessageSquare, MapPin, Send, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will respond shortly.",
      });
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about VeriWrite? We're here to help. Reach out to our team for support,
            feedback, or inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GlassmorphismCard>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-veri/10 rounded-full flex items-center justify-center mb-4">
                      <Check size={32} className="text-veri" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Your message has been successfully sent. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name <span className="text-veri">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 bg-secondary/30 rounded-lg border border-border focus:border-veri/50 focus:ring-1 focus:ring-veri/50 transition-all outline-none"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address <span className="text-veri">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-secondary/30 rounded-lg border border-border focus:border-veri/50 focus:ring-1 focus:ring-veri/50 transition-all outline-none"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 bg-secondary/30 rounded-lg border border-border focus:border-veri/50 focus:ring-1 focus:ring-veri/50 transition-all outline-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-veri">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-3 bg-secondary/30 rounded-lg border border-border focus:border-veri/50 focus:ring-1 focus:ring-veri/50 transition-all outline-none resize-none"
                        placeholder="Enter your message here..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="mt-8">
                      <CustomButton
                        type="submit"
                        loading={isSubmitting}
                        size="lg"
                        icon={<Send size={18} />}
                        iconPosition="right"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </CustomButton>
                    </div>
                  </form>
                )}
              </div>
            </GlassmorphismCard>
          </div>
          
          <div>
            <GlassmorphismCard className="h-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-veri/10 mr-4">
                      <Mail className="text-veri" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground text-sm mb-1">For general inquiries:</p>
                      <a href="mailto:info@veriwrite.com" className="text-veri hover:underline">
                        info@veriwrite.com
                      </a>
                      
                      <p className="text-muted-foreground text-sm mt-3 mb-1">For support:</p>
                      <a href="mailto:support@veriwrite.com" className="text-veri hover:underline">
                        support@veriwrite.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-veri/10 mr-4">
                      <MessageSquare className="text-veri" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Live Chat</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Our team is available Monday-Friday from 9am to 5pm EST.
                      </p>
                      <CustomButton variant="outline" size="sm">
                        Start Chat
                      </CustomButton>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-veri/10 mr-4">
                      <MapPin className="text-veri" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Location</h3>
                      <p className="text-muted-foreground text-sm">
                        123 Innovation Drive<br />
                        Cambridge, MA 02142<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {/* Social media icons */}
                    {[
                      { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, label: "Facebook" },
                      { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram" },
                      { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>, label: "Twitter" },
                      { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, label: "LinkedIn" }
                    ].map((social, index) => (
                      <a 
                        key={index}
                        href="#"
                        className="p-2 rounded-full bg-secondary/50 hover:bg-veri/10 hover:text-veri transition-colors"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </GlassmorphismCard>
          </div>
        </div>

        <div className="mt-12">
          <GlassmorphismCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    q: "How accurate is VeriWrite's plagiarism detection?",
                    a: "VeriWrite uses advanced algorithms that provide over 98% accuracy in plagiarism detection. Our system compares submissions against billions of online sources, academic papers, and previously submitted documents."
                  },
                  {
                    q: "Is my data secure when using VeriWrite?",
                    a: "Yes, security is our top priority. All uploads are encrypted and processed securely. Your documents remain private and are never shared with third parties without your explicit consent."
                  },
                  {
                    q: "How do I integrate VeriWrite with Google Classroom?",
                    a: "Simply sign in with your Google account, and our system will guide you through connecting VeriWrite to your Google Classroom. Once connected, you can access all your courses and assignments directly."
                  },
                  {
                    q: "What file formats does VeriWrite support?",
                    a: "VeriWrite supports a wide range of formats including PDF, DOCX, DOC, TXT, RTF, ODT, and more. If you have specific format requirements, please contact our support team."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Can't find the answer you're looking for? Contact our support team.
                </p>
                <CustomButton 
                  variant="outline" 
                  icon={<Mail size={18} />}
                >
                  Email Support
                </CustomButton>
              </div>
            </div>
          </GlassmorphismCard>
        </div>
      </main>
    </div>
  );
};

export default Contact;
