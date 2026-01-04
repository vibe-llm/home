import { Button } from "@/components/ui/button";
import { Scale, ArrowLeft, Shield, Users, FileText, AlertTriangle, Gavel, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePageTracking } from "@/hooks/use-analytics";

const TermsOfService = () => {
  const navigate = useNavigate();
  usePageTracking("Terms of Service");
  return (
    <div className="min-h-screen bg-gradient-hero py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <Scale className="w-16 h-16 text-primary" />
          </div>
          
          <h1 className="text-h1 md:text-5xl font-bold mb-6 text-foreground">
            Terms of Service
          </h1>
          
          <p className="text-bodyLg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your rights and responsibilities when using Vibe LLM. We don't own your data - you do.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 mb-16">
          {/* Acceptance of Terms */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">1. Acceptance of Terms</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              By accessing and using Vibe LLM services, you agree to comply with and be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services. Your continued use of our platform 
              constitutes acceptance of any updates to these terms.
            </p>
          </section>

          {/* Description of Service */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">2. Description of Service</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                Vibe LLM provides a secure API proxy service that enables developers to access Claude AI capabilities 
                at competitive pricing. Our service acts as an intermediary between your applications and Anthropic's Claude API.
              </p>
              <p>
                <strong className="text-primary">We are committed to providing a safe, reliable, and privacy-focused service</strong> 
                that respects your data ownership rights and maintains the highest security standards.
              </p>
            </div>
          </section>

          {/* User Data Ownership */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">3. Your Data Ownership Rights</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                <strong className="text-primary text-bodyLg">You own your data. We don't store it, period.</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prompts, code, and content you send through our service remain your intellectual property</li>
                <li>We do not store, log, or retain any of your conversations or data</li>
                <li>Your data is transmitted directly to Anthropic's Claude API and immediately discarded from our systems</li>
                <li>We have no access to, ownership of, or rights to your content</li>
                <li>You maintain full control and responsibility for your data at all times</li>
              </ul>
              <p>
                For complete details on our data handling practices, please review our 
                <Link to="/privacy-policy" className="text-primary hover:text-primary/80 underline mx-1">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">4. Acceptable Use</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>You agree to use Vibe LLM responsibly and in compliance with all applicable laws. Prohibited activities include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Attempting to reverse engineer, hack, or compromise our service</li>
                <li>Using the service for illegal activities or to generate harmful content</li>
                <li>Attempting to overload or disrupt our infrastructure</li>
                <li>Sharing your API tokens with unauthorized parties</li>
                <li>Violating Anthropic's usage policies when using Claude through our service</li>
              </ul>
            </div>
          </section>

          {/* Service Availability */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">5. Service Availability</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                We strive to provide reliable service with high uptime. However, we cannot guarantee uninterrupted access due to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Scheduled maintenance and updates</li>
                <li>Third-party service dependencies (Anthropic's Claude API)</li>
                <li>Network issues beyond our control</li>
                <li>Security-related service interruptions</li>
              </ul>
              <p>
                We will provide advance notice of planned maintenance whenever possible.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">6. Intellectual Property</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                <strong className="text-primary">Your content remains yours.</strong> Vibe LLM and its associated branding, 
                documentation, and service infrastructure are our intellectual property.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You retain all rights to content you create or input into our service</li>
                <li>We claim no ownership over your prompts, code, or generated outputs</li>
                <li>Our service name, logo, and documentation are protected by trademark and copyright</li>
                <li>You may not use our branding without explicit written permission</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">7. Limitation of Liability</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Vibe LLM is provided "as is" without warranties of any kind. We are not liable for any damages arising from
              service use, including but not limited to data loss, business interruption, or security breaches. 
              Your maximum remedy is limited to the amount paid for our services in the preceding 30 days.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">8. Changes to Terms</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              We may update these Terms of Service periodically to reflect changes in our practices or legal requirements.
              Material changes will be communicated via email to registered users at least 30 days before taking effect. 
              Continued use of our service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">9. Contact Information</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              If you have any questions about these Terms of Service, please contact us through our website's contact form.
              We're committed to addressing any concerns you may have about our terms or service.
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
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-bodyLg px-8 py-6 h-auto"
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

export default TermsOfService;
