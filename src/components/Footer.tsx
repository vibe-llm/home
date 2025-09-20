import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Github, Twitter, Mail } from "lucide-react";
import ContactUsForm from "./ContactUsForm";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <footer id="footer" className="bg-gradient-secondary border-t border-primary/10">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-primary mr-2" />
              <span className="text-2xl font-bold">Vibe LLM</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Enterprise-grade AI at startup prices. Built for developers who demand performance without compromise.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary"
                onClick={() => setIsContactFormOpen(true)}
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/quick-start" className="hover:text-primary transition-colors">API Documentation</Link></li>
              <li><Link to="/" onClick={() => setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><a href="https://vibe-router.onrender.com/health" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Status Page</a></li>
            </ul>
          </div>
          
          {/* Developers */}
          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/quick-start" className="hover:text-primary transition-colors">Quick Start</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/" onClick={() => setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="hover:text-primary transition-colors">About</Link></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => setIsContactFormOpen(true)}>Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-primary/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2025 Vibe LLM. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
      <ContactUsForm 
        isOpen={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </footer>
  );
};

export default Footer;