import { Button } from "@/components/ui/button";
import { Scale, ArrowLeft, Shield, Users, FileText, AlertTriangle, Gavel, Mail, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePageTracking } from "@/hooks/use-analytics";

const TermsOfService = () => {
  const navigate = useNavigate();
  usePageTracking("Terms of Service");
  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16 px-6">
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
            Your rights and responsibilities when using Vibe LLM.
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
              By accessing or using Vibe LLM, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service. Continued use of the service constitutes acceptance of any updated terms.
            </p>
          </section>

          {/* Description of Service */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">2. Description of Service</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Vibe LLM provides a developer-oriented API proxy that enables access to third-party large language model providers at competitive pricing. Vibe LLM acts solely as an intermediary and does not independently generate model outputs.
            </p>
          </section>

          {/* Data Ownership and Responsibility */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">3. Data Ownership and Responsibility</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>You retain full ownership of all content you submit through the service.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prompts, code, and inputs remain your intellectual property</li>
                <li>We do not claim ownership of generated outputs</li>
                <li>We do not persistently store or retain your content</li>
                <li>You are solely responsible for the legality and appropriateness of your content and usage</li>
              </ul>
              <p>Data transmission and processing are subject to applicable third-party providers’ terms and policies.</p>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">4. Acceptable Use</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>You agree not to use the service to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Generate or distribute unlawful, harmful, or abusive content</li>
                <li>Attempt to reverse engineer, disrupt, or compromise the service</li>
                <li>Circumvent rate limits or security controls</li>
                <li>Share API credentials with unauthorized parties</li>
                <li>Violate the usage policies of any third-party model provider accessed through the service</li>
              </ul>
              <p>We reserve the right to suspend or terminate access for violations.</p>
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
                The service is provided on an “as-available” basis. We do not guarantee uninterrupted operation and are not responsible for downtime caused by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Scheduled maintenance</li>
                <li>Third-party service dependencies</li>
                <li>Network or infrastructure failures</li>
                <li>Security-related interruptions</li>
              </ul>
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
                All Vibe LLM branding, documentation, software, and infrastructure are the intellectual property of Vibe LLM.
              </p>
              <p>
                You may not use our name, logo, or branding without prior written permission.
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">7. Disclaimer of Warranties</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              The service is provided “as is” and “as available,” without warranties of any kind, express or implied. We do not warrant that the service will be error-free, secure, or meet your specific requirements.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">8. Limitation of Liability</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>
                To the maximum extent permitted by law, Vibe LLM shall not be liable for any indirect, incidental, special, or consequential damages arising from use of the service.
              </p>
              <p>
                Our total liability for any claim shall not exceed the amount paid by you for the service in the thirty (30) days preceding the claim.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">9. Changes to Terms</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              We may modify these Terms from time to time. Material changes will be communicated via email or prominent notice on our website. Continued use of the service after changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">10. Contact Information</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              If you have questions about these Terms of Service, please contact us at: <a href="mailto:welcome@vibe-llm.online" className="text-primary hover:underline">welcome@vibe-llm.online</a>
            </p>
          </section>
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

export default TermsOfService;
