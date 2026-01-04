import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Lock, Database, UserCheck, FileText, Mail, Cpu, Clock } from "lucide-react";
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
            We take user privacy seriously and aim to minimize data collection to what is strictly necessary
            to operate and maintain the service.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 mb-16">
          {/* Overview */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Overview</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Vibe LLM is designed with a privacy-first approach. The service processes requests in real time
              and does not use user prompts or outputs for model training, fine-tuning, or data resale.
            </p>
          </section>

          {/* Data We Process */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Data We Process</h2>
            </div>
            <div className="text-muted-foreground text-body leading-body space-y-4">
              <p>When you use Vibe LLM, we process the following data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-primary">Prompts and responses:</strong> processed transiently to generate a response.
                  Prompts and outputs are not stored persistently and are not used for training or analytics.
                </li>
                <li>
                  <strong className="text-primary">Account information:</strong> email address used for account creation and API access.
                </li>
                <li>
                  <strong className="text-primary">Operational metadata:</strong> limited, short-lived logs such as request counts, error signals,
                  and latency metrics used solely for reliability, rate limiting, and debugging.
                </li>
              </ul>
            </div>
          </section>

          {/* What We Do Not Do */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">What We Do Not Do</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground text-body">
              <li>We do not train or fine-tune models on user prompts or outputs.</li>
              <li>We do not sell, share, or monetize user prompt data.</li>
              <li>We do not scrape user repositories or files.</li>
              <li>We do not build user profiles or perform behavioral analytics.</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Data Retention</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Operational logs are retained only for a short period and are automatically rotated.
              They are used exclusively for service stability and incident investigation,
              and are not manually inspected unless required to debug a reported issue.
            </p>
          </section>

          {/* Model Inference */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Model Inference</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              Vibe LLM provides access to open-source language models (such as GLM-4.7)
              through a Claude-compatible API interface.
              Inference is performed on our infrastructure; model weights and architectures are not modified.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Third-Party Services</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              We do not share prompt or response data with third parties.
              Infrastructure providers may process transient data strictly for hosting and networking purposes.
            </p>
          </section>

          {/* Security */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Security</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              We use standard industry practices to protect the service, including encrypted transport,
              secure API key handling, and restricted internal access.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Policy Updates</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              This policy may be updated as the service evolves. Any changes will be published on this page.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-h3 font-semibold text-foreground">Contact</h2>
            </div>
            <p className="text-muted-foreground text-body leading-body">
              If you have questions about this policy or encounter a privacy-related issue,
              you can contact us at <a href="mailto:vibellm.online@gmail.com" className="text-primary hover:underline">vibellm.online@gmail.com</a>.
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

export default PrivacyPolicy;
