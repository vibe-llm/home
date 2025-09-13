import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Gift, Rocket } from "lucide-react";
import SignupForm from "./SignupForm";

const Pricing = () => {
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay only for what you use. No hidden fees, no monthly commitments. 
            Scale from prototype to production seamlessly.
          </p>
        </div>

        {/* Detailed Cost Comparison */}
        <div className="bg-gradient-secondary rounded-2xl p-8 mb-16 border border-primary/20">
          <h3 className="text-2xl font-bold text-center mb-8">Detailed Pricing Comparison</h3>
          
          {/* Mobile-first responsive table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="font-semibold text-sm relative pt-6">Category</div>
                <div className="text-center relative pt-6">
                  <div className="font-semibold text-sm text-primary">Claude Sonnet 4</div>
                  <div className="text-xs text-muted-foreground">per 1M tokens</div>
                </div>
                <div className="text-center relative pt-6">
                  <div className="font-semibold text-sm text-primary">OpenAI GPT-5</div>
                  <div className="text-xs text-muted-foreground">per 1M tokens</div>
                </div>
                <div className="text-center relative pt-6">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    BEST VALUE
                  </div>
                  <div className="font-semibold text-sm text-primary">Vibe LLM</div>
                  <div className="text-xs text-muted-foreground">per 1M tokens</div>
                </div>
              </div>

              {/* Input Pricing */}
              <div className="space-y-3 mb-6">
                <div className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Input Tokens</div>
                
                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium">≤ 200K tokens</div>
                  <div className="text-center font-bold text-destructive">$3.00</div>
                  <div className="text-center font-bold text-destructive">$1.25</div>
                  <div className="text-center font-bold text-primary">$0.60</div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium">{`> 200K tokens`}</div>
                  <div className="text-center font-bold text-destructive">$6.00</div>
                  <div className="text-center font-bold text-destructive">$1.25</div>
                  <div className="text-center font-bold text-primary">$0.90</div>
                </div>
              </div>

              {/* Output Pricing */}
              <div className="space-y-3 mb-6">
                <div className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Output Tokens</div>
                
                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium">≤ 200K tokens</div>
                  <div className="text-center font-bold text-destructive">$15.00</div>
                  <div className="text-center font-bold text-destructive">$10.00</div>
                  <div className="text-center font-bold text-primary">$3.00</div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium">{`> 200K tokens`}</div>
                  <div className="text-center font-bold text-destructive">$22.50</div>
                  <div className="text-center font-bold text-destructive">$10.00</div>
                  <div className="text-center font-bold text-primary">$5.50</div>
                </div>
              </div>

              {/* Cached Input Pricing */}
              <div className="space-y-3 mb-6">
                <div className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Cached Input</div>
                
                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium">≤ 200K tokens</div>
                  <div className="text-center font-bold text-destructive">$0.30</div>
                  <div className="text-center font-bold text-destructive">$0.125</div>
                  <div className="text-center font-bold text-primary">$0.06</div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-sm font-medium">{`> 200K tokens`}</div>
                  <div className="text-center font-bold text-destructive">$0.60</div>
                  <div className="text-center font-bold text-destructive">$0.125</div>
                  <div className="text-center font-bold text-primary">$0.096</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="text-center mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-2">Save 70-80%</div>
            <div className="text-muted-foreground mb-4">compared to leading providers across all token types</div>
            <div className="text-sm text-muted-foreground">
              * Pricing based on official rates from{" "}
              <a href="https://www.anthropic.com/pricing#api" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Anthropic
              </a>{" "}
              and{" "}
              <a href="https://openai.com/api/pricing/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                OpenAI
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-secondary border-primary/30 shadow-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pay-as-You-Go</h3>
                <p className="text-muted-foreground">Perfect for startups and growing teams</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-primary mb-2">Top up from $5</div>
                <div className="text-sm text-muted-foreground mt-2">
                  ~70% cheaper than Claude Sonnet or GPT-5
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3" />
                  <span>Claude Sonnet level performance</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3" />
                  <span>99.9% uptime SLA</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3" />
                  <span>No monthly commitments</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3" />
                  <span>Claude Code compatible API</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3" />
                  <span>Developer support</span>
                </div>
                <div className="flex items-center">
                  <Gift className="w-5 h-5 text-primary mr-3" />
                  <span className="font-semibold">$3 free credit to start</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 h-auto"
                onClick={() => setIsSignupFormOpen(true)}
              >
                Join Waitlist Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                No credit card required for free trial
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Startup Benefits */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Rocket className="w-5 h-5 text-primary mr-2" />
            <span className="font-semibold">Perfect for startups:</span>
            <span className="ml-2 text-muted-foreground">Scale your AI costs with your growth</span>
          </div>
        </div>
      </div>
      
      <SignupForm 
        isOpen={isSignupFormOpen}
        onOpenChange={setIsSignupFormOpen}
      />
    </section>
  );
};

export default Pricing;