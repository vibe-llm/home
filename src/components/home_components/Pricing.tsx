import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Check, ArrowRight, BadgeCheck } from "lucide-react";
import { trackButtonClick } from "@/lib/analytics.ts";

const Pricing = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-gradient-secondary">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium mb-5 text-foreground">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        Pay only for what you use. No hidden fees, no monthly commitments.
                    </p>
                </div>

                {/* Price Comparison Card */}
                <div className="max-w-6xl mx-auto mb-12">
                    <Card className="bg-card border-border shadow-card overflow-hidden rounded-2xl">
                        <CardContent className="p-0">
                            {/* Header */}
                            <div className="bg-secondary/30 p-6 border-b border-border/50">
                                <div className="flex items-center justify-center gap-3">
                                    <BadgeCheck className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-serif font-medium">GLM-4.7 Pricing Comparison</h3>
                                </div>
                                <p className="text-center text-sm text-muted-foreground mt-2">
                                    Output cost at <span className="text-primary font-semibold">50% of Z.AI</span> pricing
                                </p>
                            </div>

                            {/* Pricing Table */}
                            <div className="overflow-x-auto">
                                <div className="min-w-full">
                                    {/* Header Row */}
                                    <div className="grid grid-cols-12 gap-3 px-6 py-4 bg-secondary/50 border-b border-border/50">
                                        <div className="col-span-4 font-medium text-sm text-muted-foreground">Provider & Model</div>
                                        <div className="col-span-2 text-center font-medium text-sm text-muted-foreground">Input</div>
                                        <div className="col-span-2 text-center font-medium text-sm text-muted-foreground">Cache Write</div>
                                        <div className="col-span-2 text-center font-medium text-sm text-muted-foreground">Cache Read</div>
                                        <div className="col-span-2 text-center font-medium text-sm text-muted-foreground">Output</div>
                                    </div>

                                    {/* Vibe LLM Row - Highlighted */}
                                    <div className="grid grid-cols-12 gap-3 px-6 py-5 bg-primary/5 border-b border-primary/10">
                                        <div className="col-span-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <span className="font-semibold text-primary">Our Price</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground ml-4 mt-1">GLM-4.7</div>
                                        </div>
                                        <div className="col-span-2 text-center font-mono font-medium">$0.50</div>
                                        <div className="col-span-2 text-center font-mono font-medium">Free</div>
                                        <div className="col-span-2 text-center font-mono font-medium">$0.10</div>
                                        <div className="col-span-2 text-center">
                                            <span className="font-mono font-bold text-primary text-lg">$1.10</span>
                                            <div className="text-xs text-primary font-semibold">50% OFF</div>
                                        </div>
                                    </div>

                                    {/* Z.AI Row */}
                                    <div className="grid grid-cols-12 gap-3 px-6 py-4 border-b border-border hover:bg-muted/20 transition-colors">
                                        <div className="col-span-4">
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
                                        <div className="col-span-2 text-center font-mono text-muted-foreground">$0.60</div>
                                        <div className="col-span-2 text-center font-mono text-muted-foreground">Free</div>
                                        <div className="col-span-2 text-center font-mono text-muted-foreground">$0.11</div>
                                        <div className="col-span-2 text-center">
                                            <span className="font-mono text-muted-foreground line-through text-sm mr-2">$2.20</span>
                                            <span className="text-xs text-destructive font-semibold">2x price</span>
                                        </div>
                                    </div>

                                    {/* OpenAI Row */}
                                    <div className="grid grid-cols-12 gap-3 px-6 py-4 border-b border-border hover:bg-muted/20 transition-colors">
                                        <div className="col-span-4">
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
                                        <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$1.75</div>
                                        <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">Free</div>
                                        <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$0.175</div>
                                        <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$14.00</div>
                                    </div>


                                  {/* Claude Row */}
                                  <div className="grid grid-cols-12 gap-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                                    <div className="col-span-4">
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
                                    <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$3~$6</div>
                                    <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$3.75~$7.50</div>
                                    <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$0.30~$0.60</div>
                                    <div className="col-span-2 text-center font-mono text-xs text-muted-foreground">$15~$22.50</div>
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
                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
                    {/* Free Trial */}
                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300 flex flex-col">
                        <div className="h-1 bg-primary w-full" />
                        <CardContent className="p-9 flex flex-col flex-1">
                            <div className="text-center mb-7">
                                <h3 className="text-3xl font-bold mb-3">Free Trial</h3>
                                <div className="text-6xl font-bold text-primary mb-3">$3</div>
                                <div className="text-base text-muted-foreground">
                                    Free credit to try our product
                                </div>
                            </div>

                            <div className="space-y-4 mb-7">
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">GLM-4.7 full model capabilities</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">Standard API format</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">~300,000 tokens included</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg px-8 h-20 rounded-xl font-medium shadow-lg shadow-primary/20 mt-auto"
                                onClick={() => {
                                    trackButtonClick("pricing_starter_dashboard");
                                    navigate("/dashboard2");
                                }}
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <p className="text-center text-sm text-muted-foreground mt-5">
                                No credit card required
                            </p>
                        </CardContent>
                    </Card>

                    {/* Pay-as-You-Go */}
                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-bl-lg">
                            POPULAR
                        </div>
                        <div className="h-1 bg-primary w-full" />
                        <CardContent className="p-9 flex flex-col flex-1">
                            <div className="text-center mb-7">
                                <h3 className="text-3xl font-bold mb-3">Pay-as-You-Go</h3>
                                <div className="text-6xl font-bold text-primary mb-3">$5+</div>
                                <div className="text-base text-muted-foreground">
                                    Top up any amount, use as needed
                                </div>
                            </div>

                            <div className="space-y-4 mb-7">
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">Everything in Free Trial</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">99.9% uptime SLA</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">No monthly commitments</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-base">Priority support</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg px-8 h-20 rounded-xl font-medium shadow-lg shadow-primary/20 mt-auto"
                                onClick={() => {
                                    trackButtonClick("pricing_payasyougo_dashboard");
                                    navigate("/dashboard2");
                                }}
                            >
                                Start Using
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <p className="text-center text-sm text-muted-foreground mt-5">
                                Scale from prototype to production
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
