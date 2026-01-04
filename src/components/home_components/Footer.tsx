import { useState } from "react";
import { Code, Mail } from "lucide-react";
import ContactUsForm from "../ContactUsForm.tsx";
import { Link } from "react-router-dom";
import { trackButtonClick } from "@/lib/analytics.ts";

const Footer = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <footer id="footer" className="bg-gradient-secondary border-t border-primary/10">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-primary mr-2" />
              <span className="text-h3 font-serif font-bold text-foreground">Vibe LLM</span>
            </div>
            <p className="text-body text-muted-foreground mb-6 leading-relaxed">
              Enterprise-grade AI at startup prices. Built for developers who demand performance without compromise.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:vibellm.online@gmail.com"
                className="inline-flex items-center gap-2 px-3 h-9 text-muted-foreground hover:text-primary transition-colors rounded-md"
              >
                <Mail className="w-4 h-4" />
                <span className="text-footnote">vibellm.online@gmail.com</span>
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="text-h4 font-serif font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-body text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">User Dashboard</Link></li>
              <li><Link to="/status" className="hover:text-primary transition-colors">Status Page</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-h4 font-serif font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-body text-muted-foreground">
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => {
                trackButtonClick("footer_contact");
                setIsContactFormOpen(true);
              }}>Contact</a></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
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