import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Check, ArrowRight, TrendingDown, BadgeCheck } from "lucide-react";
import SignupForm from "../SignupForm.tsx";
import { trackButtonClick } from "@/lib/analytics.ts";

const Pricing = () => {
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

    return (
        <section className="py-20 bg-gradient-secondary">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Pay only for what you use. No hidden fees, no monthly commitments.
                    </p>
                </div>

                {/* Price Comparison Card */}
                <div className="max-w-5xl mx-auto mb-12">
                    <Card className="bg-card border-border shadow-bento overflow-hidden">
                        <CardContent className="p-0">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                                <div className="flex items-center justify-center gap-3">
                                    <BadgeCheck className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-semibold">GLM-4.7 Pricing Comparison</h3>
                                </div>
                                <p className="text-center text-sm text-muted-foreground mt-2">
                                    Output cost at <span className="text-primary font-semibold">50% of Z.AI</span> pricing
                                </p>
                            </div>

                            {/* Pricing Table */}
                            <div className="overflow-x-auto">
                                <div className="min-w-full">
                                    {/* Header Row */}
                                    <div className="grid grid-cols-5 gap-3 px-6 py-4 bg-muted/30 border-b border-border">
                                        <div className="font-semibold text-sm">Provider & Model</div>
                                        <div className="text-center font-semibold text-sm">Input</div>
                                        <div className="text-center font-semibold text-sm">Cache Write</div>
                                        <div className="text-center font-semibold text-sm">Cache Read</div>
                                        <div className="text-center font-semibold text-sm">Output</div>
                                    </div>

                                    {/* Vibe LLM Row - Highlighted */}
                                    <div className="grid grid-cols-5 gap-3 px-6 py-5 bg-primary/5 border-b border-primary/20">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <span className="font-semibold text-primary">Our Price</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground ml-4 mt-1">GLM-4.7</div>
                                        </div>
                                        <div className="text-center font-mono font-medium">$0.50</div>
                                        <div className="text-center font-mono font-medium">Free</div>
                                        <div className="text-center font-mono font-medium">$0.10</div>
                                        <div className="text-center">
                                            <span className="font-mono font-bold text-primary text-lg">$1.10</span>
                                            <div className="text-xs text-primary font-semibold">50% OFF</div>
                                        </div>
                                    </div>

                                    {/* Z.AI Row */}
                                    <div className="grid grid-cols-5 gap-3 px-6 py-4 border-b border-border hover:bg-muted/20 transition-colors">
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-muted-foreground">Z.AI</span>
                                                <a href="https://docs.z.ai/guides/overview/pricing"
                                                   className="text-primary hover:underline flex items-center gap-1 text-xs"
                                                   target="_blank" rel="noopener noreferrer">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="text-xs text-muted-foreground ml-4 mt-1">GLM-4.7</div>
                                        </div>
                                        <div className="text-center font-mono text-muted-foreground">$0.60</div>
                                        <div className="text-center font-mono text-muted-foreground">Free</div>
                                        <div className="text-center font-mono text-muted-foreground">$0.11</div>
                                        <div className="text-center">
                                            <span className="font-mono text-muted-foreground line-through text-sm mr-2">$2.20</span>
                                            <span className="text-xs text-destructive font-semibold">2x price</span>
                                        </div>
                                    </div>

                                    {/* OpenAI Row */}
                                    <div className="grid grid-cols-5 gap-3 px-6 py-4 border-b border-border hover:bg-muted/20 transition-colors">
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-muted-foreground">OpenAI</span>
                                                <a href="https://openai.com/api/pricing/"
                                                   className="text-primary hover:underline flex items-center gap-1 text-xs"
                                                   target="_blank" rel="noopener noreferrer">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="text-xs text-muted-foreground ml-4 mt-1">GPT-5.2</div>
                                        </div>
                                        <div className="text-center font-mono text-xs text-muted-foreground">$1.75</div>
                                        <div className="text-center font-mono text-xs text-muted-foreground">Free</div>
                                        <div className="text-center font-mono text-xs text-muted-foreground">$0.175</div>
                                        <div className="text-center font-mono text-xs text-muted-foreground">$14.00</div>
                                    </div>


                                  {/* Claude Row */}
                                  <div className="grid grid-cols-5 gap-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                                    <div>
                                      <div className="flex items-center gap-1">
                                        <span className="text-muted-foreground">Claude</span>
                                        <a href="https://www.anthropic.com/pricing#api"
                                           className="text-primary hover:underline flex items-center gap-1 text-xs"
                                           target="_blank" rel="noopener noreferrer">
                                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                          </svg>
                                        </a>
                                      </div>
                                      <div className="text-xs text-muted-foreground ml-4 mt-1">Sonnet 4.5</div>
                                    </div>
                                    <div className="text-center font-mono text-xs text-muted-foreground">$3~$6</div>
                                    <div className="text-center font-mono text-xs text-muted-foreground">$3.75~$7.50</div>
                                    <div className="text-center font-mono text-xs text-muted-foreground">$0.30~$0.60</div>
                                    <div className="text-center font-mono text-xs text-muted-foreground">$15~$22.50</div>
                                  </div>

                                </div>
                            </div>

                            {/* Footer note */}
                            <div className="px-6 py-4 bg-muted/20 border-t border-border">
                                <div className="text-center text-sm text-muted-foreground">
                                    All prices per 1M tokens.
                                    <span className="text-primary"> External links open official pricing pages.</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pricing Cards - Bento Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                    {/* Free Trial */}
                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <div className="h-1 bg-primary w-full" />
                        <CardContent className="p-8">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
                                <div className="text-5xl font-bold text-primary mb-2">$3</div>
                                <div className="text-sm text-muted-foreground">
                                    Free credit to try our product
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">GLM-4.7 full model capabilities</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">Standard API format</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">~300,000 tokens included</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-base py-6 h-auto"
                                onClick={() => {
                                    trackButtonClick("pricing_starter_join_waitlist");
                                    setIsSignupFormOpen(true);
                                }}
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <p className="text-center text-xs text-muted-foreground mt-4">
                                No credit card required
                            </p>
                        </CardContent>
                    </Card>

                    {/* Pay-as-You-Go */}
                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <div className="h-1 bg-primary w-full" />
                        <CardContent className="p-8">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">Pay-as-You-Go</h3>
                                <div className="text-5xl font-bold text-primary mb-2">$5+</div>
                                <div className="text-sm text-muted-foreground">
                                    Top up any amount, use as needed
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">Everything in Free Trial</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">99.9% uptime SLA</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">No monthly commitments</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-sm">Priority support</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-base py-6 h-auto"
                                onClick={() => {
                                    trackButtonClick("pricing_payasyougo_join_waitlist");
                                    setIsSignupFormOpen(true);
                                }}
                            >
                                Start Using
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <p className="text-center text-xs text-muted-foreground mt-4">
                                Scale from prototype to production
                            </p>
                        </CardContent>
                    </Card>
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
