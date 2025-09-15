import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Code, Mail, Terminal, Play, ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const QuickStart = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = async (text: string, index: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Sign Up & Verify Email",
      description: "Fill and submit the sign up request and verify your email address.",
      icon: <Mail className="w-6 h-6" />,
    },
    {
      number: 2,
      title: "Receive API Token",
      description: "You will receive an email containing your API token with $3 of free credit.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: 3,
      title: "Configure Environment",
      description: "Run the following commands in your terminal that runs Claude Code:",
      icon: <Terminal className="w-6 h-6" />,
      code: [
        "export ANTHROPIC_BASE_URL=https://vibe-router.onrender.com/api/anthropic",
        "export ANTHROPIC_AUTH_TOKEN=<API token from the email>"
      ],
    },
    {
      number: 4,
      title: "Launch Claude Code",
      description: "Run claude to open Claude Code. You should see the following:",
      icon: <Code className="w-6 h-6" />,
      code: [`claude`],
      output: `Overrides (via env):
   • API Base URL: 
     https://vibe-router.onrender.com/api/anthropic`,
    },
    {
      number: 5,
      title: "Happy Coding!",
      description: "You're all set! Start coding with Claude Code powered by Vibe LLM.",
      icon: <Play className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <Code className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Quick Start Guide
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect Claude Code with Vibe LLM in just 5 simple steps.{" "}
            <Link
              to="/"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              Back to Vibe LLM
            </Link>
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-lg">
                      {step.description}
                    </p>
                    
                    {/* Code blocks */}
                    {step.code && (
                      <div className="space-y-3">
                        {step.code.map((command, cmdIndex) => {
                          const copyId = `${index}-${cmdIndex}`;
                          const isCopied = copiedIndex === copyId;
                          
                          return (
                            <div key={cmdIndex} className="bg-black/20 rounded-lg p-4 border border-white/10 relative group">
                              <code className="text-green-400 font-mono text-sm md:text-base pr-12">
                                {command}
                              </code>
                              <button
                                onClick={() => copyToClipboard(command, copyId)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                title="Copy to clipboard"
                              >
                                {isCopied ? (
                                  <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Output block */}
                    {step.output && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Expected output:</p>
                        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                          <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                            {step.output}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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

export default QuickStart;
