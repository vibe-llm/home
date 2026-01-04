import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Lock, Eye, Database, UserCheck, FileText, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePageTracking } from "@/hooks/use-analytics";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  usePageTracking("Privacy Policy");
  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          
          <h1 className="text-h1 md:text-5xl font-bold mb-6 text-foreground">
            Privacy Policy
          </h1>
          
          <p className="text-bodyLg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your privacy is our priority. We don't store your data, and we're committed to keeping you safe.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 mb-16">
          {/* Our Commitment */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Our Commitment to Your Privacy</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Vibe LLM is designed with privacy by design. We are committed to protecting your personal information
              and ensuring that your data remains private and secure. This policy explains how we handle your information 
              when you use our services.
            </p>
          </section>

          {/* Data We Don't Store */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">What We Don't Store</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                <strong className="text-primary">We do not store any of your personal data or conversation history.</strong> 
                This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your code or prompts sent to Claude</li>
                <li>Conversation history or chat logs</li>
                <li>Personal files or documents</li>
                <li>Usage patterns or analytics data</li>
                <li>IP addresses or device information</li>
              </ul>
              <p>
                When you use Vibe LLM, your requests are processed in real-time and immediately discarded after response delivery.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Limited Information Collection</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              The only information we collect is what you voluntarily provide when signing up for our service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4 text-muted-foreground text-body">
              <li>Email address for account creation and API token delivery</li>
              <li>Basic usage metrics for service monitoring (request counts, not content)</li>
            </ul>
          </section>

          {/* Security Measures */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Security Measures</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                We implement industry-standard security measures to protect our service:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for all communications</li>
                <li>Secure API token generation and management</li>
                <li>Regular security audits and updates</li>
                <li>No persistent data storage = no data breach risk</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Third-Party Services</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Vibe LLM acts as a secure proxy to Anthropic's Claude API. Your requests are forwarded directly
              to Anthropic without logging or storage. We recommend reviewing 
              <a href="https://www.anthropic.com/privacy" className="text-primary hover:text-primary/80 underline mx-1">
                Anthropic's Privacy Policy
              </a>
              for their data handling practices.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Policy Updates</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              We may update this privacy policy periodically to reflect changes in our practices or legal requirements.
              Any changes will be posted on this page with an updated effective date. Since we don't store your contact 
              information, we encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Contact Us</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              If you have any questions about this privacy policy or our data practices, please contact us through
              our website's contact form or via email `welcome@vibe-llm.online`. We're committed to addressing any privacy concerns you may have.
            </p>
          </section>

          {/* Effective Date */}
          <div className="text-center py-8">
            <p className="text-muted-foreground text-bodySm">
              <strong>Effective Date:</strong> July 1, 2025
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Vibe LLM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
