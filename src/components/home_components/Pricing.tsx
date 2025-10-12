import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Check, ArrowRight, Gift, Rocket} from "lucide-react";
import SignupForm from "../SignupForm.tsx";
import { trackButtonClick } from "@/lib/analytics.ts";

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

                {/* Our price */}
                <div className="bg-gradient-secondary rounded-2xl p-8 mb-16 border border-primary/20">
                    <h3 className="text-2xl font-bold text-center mb-8">Our Price</h3>

                    {/* Mobile-first responsive table */}
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                                <div className="font-semibold text-sm relative pt-6">Category</div>
                                <div className="text-center relative pt-6">
                                    <div className="font-semibold text-sm text-primary">Input Costs</div>
                                    <div className="text-xs text-muted-foreground">per 1M tokens</div>
                                </div>
                                <div className="text-center relative pt-6">
                                    <div className="font-semibold text-sm text-primary">Output Costs</div>
                                    <div className="text-xs text-muted-foreground">per 1M tokens</div>
                                </div>
                                <div className="text-center relative pt-6">
                                    <div className="font-semibold text-sm text-primary">Cache Input Write / Read</div>
                                    <div className="text-xs text-muted-foreground">per 1M tokens</div>
                                </div>
                            </div>

                            {/* Vibe-LLM 4 Pricing */}
                            <div className="space-y-3 mb-6">
                                <div
                                    className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Vibe-Air
                                </div>

                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        input tokens: (0, 32K]
                                        <br />
                                        output tokens: (0, 0.2K]
                                    </div>
                                    <div className="text-center font-bold ">$0.2</div>
                                    <div className="text-center font-bold ">$0.6</div>
                                    <div className="text-center font-bold ">$0 / $0.05</div>
                                </div>

                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        input tokens: (0, 32K]
                                        <br />
                                        output tokens: (0.2K+]
                                    </div>
                                    <div className="text-center font-bold ">$0.2</div>
                                    <div className="text-center font-bold ">$1.8</div>
                                    <div className="text-center font-bold ">$0 / $0.05</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        input tokens: (32K+]
                                        <br />
                                        output tokens: unlimited
                                    </div>
                                    <div className="text-center font-bold ">$0.3</div>
                                    <div className="text-center font-bold ">$2.4</div>
                                    <div className="text-center font-bold ">$0 / $0.07</div>
                                </div>
                            </div>


                            {/* Vibe-LLM 4.1 Pricing */}
                            <div className="space-y-3 mb-6">
                                <div
                                    className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Vibe-Normal
                                </div>

                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        input tokens: (0, 32K]
                                        <br />
                                        output tokens: (0, 0.2K]
                                    </div>
                                    <div className="text-center font-bold ">$0.6</div>
                                    <div className="text-center font-bold ">$2.0</div>
                                    <div className="text-center font-bold ">$0 / $0.1</div>
                                </div>

                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        input tokens: (0, 32K]
                                        <br />
                                        output tokens: (0.2K+]
                                    </div>
                                    <div className="text-center font-bold ">$0.9</div>
                                    <div className="text-center font-bold ">$3.4</div>
                                    <div className="text-center font-bold ">$0 / $0.2</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        input tokens: (32K+]
                                        <br />
                                        output tokens: unlimited
                                    </div>
                                    <div className="text-center font-bold ">$1.2</div>
                                    <div className="text-center font-bold ">$4.0</div>
                                    <div className="text-center font-bold ">$0 / $0.3</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Summary */}
                    <div className="text-center mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="text-sm text-muted-foreground">
                            * If you are using Vibe-Normal with 1k input tokens and 1k output tokens,
                            it costs $0.0033 (0.9/1M * 1k + 3.4/1M * 1k)
                        </div>
                    </div>
                </div>

                {/* Detailed Cost Comparison */}
                <div className="bg-gradient-secondary rounded-2xl p-8 mb-16 border border-primary/20">
                    <h3 className="text-2xl font-bold text-center mb-8">Pricing Comparison</h3>

                    {/* Mobile-first responsive table */}
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                                <div className="font-semibold text-sm relative pt-6">Model</div>
                                <div className="text-center relative pt-6">
                                    <div className="font-semibold text-sm text-primary">Input Costs</div>
                                    <div className="text-xs text-muted-foreground">per 1M tokens</div>
                                </div>
                                <div className="text-center relative pt-6">
                                    <div className="font-semibold text-sm text-primary">Output Costs</div>
                                    <div className="text-xs text-muted-foreground">per 1M tokens</div>
                                </div>
                                <div className="text-center relative pt-6">
                                    <div className="font-semibold text-sm text-primary">Cache Input Write / Read</div>
                                    <div className="text-xs text-muted-foreground">per 1M tokens</div>
                                </div>
                            </div>

                            {/* Vibe LLM 4 / 4.1 Row */}
                            <div className="space-y-3 mb-6">
                                <div
                                    className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Vibe-LLM
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        <div className="font-semibold text-sm">Vibe-Air</div>
                                    </div>
                                    <div className="text-center font-bold text-primary">$0.2~0.3</div>
                                    <div className="text-center font-bold text-primary">$0.6~2.4 </div>
                                    <div className="text-center font-bold text-primary">$0.0 / $0.05</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">
                                        <div className="font-semibold text-sm">Vibe-Normal</div>
                                    </div>
                                    <div className="text-center font-bold text-primary">$0.6~$1.2</div>
                                    <div className="text-center font-bold text-primary">$2~$4</div>
                                    <div className="text-center font-bold text-primary">$0.0 / $0.1~0.3</div>
                                </div>
                            </div>

                            {/* Claude Sonnet / Opus Row */}
                            <div className="space-y-3 mb-6">
                                <div
                                    className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">Claude
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">Claude Sonnet </div>
                                    <div className="text-center font-bold text-destructive">$3~$6</div>
                                    <div className="text-center font-bold text-destructive">$15.0~$22.5</div>
                                    <div className="text-center font-bold text-destructive">$3.75~$7.5 / $0.3~0.6 </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">Claude Opus</div>
                                    <div className="text-center font-bold text-destructive">$15</div>
                                    <div className="text-center font-bold text-destructive">$75.0</div>
                                    <div className="text-center font-bold text-destructive">$18.75 / $1.5</div>
                                </div>
                            </div>

                            {/* OpenAI GPT-5 Row */}
                            <div className="space-y-3 mb-6">
                                <div
                                    className="text-lg font-semibold text-primary border-b border-primary/20 pb-2">OpenAI
                                </div>
                                <div className="grid grid-cols-4 gap-4 p-3 bg-background/50 rounded-lg">
                                    <div className="text-sm font-medium">GPT-5</div>
                                    <div className="text-center font-bold text-destructive">$1.25</div>
                                    <div className="text-center font-bold text-destructive">$10.00</div>
                                    <div className="text-center font-bold text-destructive">$0.0 / $0.125</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="text-center mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="text-sm text-muted-foreground">
                            * Pricing based on official rates from{" "}
                            <a href="https://www.anthropic.com/pricing#api" className="text-primary hover:underline"
                               target="_blank" rel="noopener noreferrer">
                                Anthropic
                            </a>{" "}
                            and{" "}
                            <a href="https://openai.com/api/pricing/" className="text-primary hover:underline"
                               target="_blank" rel="noopener noreferrer">
                                OpenAI
                            </a>
                        </div>
                    </div>
                </div>

                {/* Pricing Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="bg-gradient-secondary border-primary/30 shadow-card relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"/>
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                                {/*<p className="text-muted-foreground">Perfect for startups and growing teams</p>*/}
                            </div>

                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold text-primary mb-2">Free</div>
                                <div className="text-sm text-muted-foreground mt-2">
                                    $3 to try out our product
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3"/>
                                    <span>Claude Sonnet level performance</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3"/>
                                    <span>Claude Code compatible API</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 h-auto"
                                onClick={() => {
                                    trackButtonClick("pricing_starter_join_waitlist");
                                    setIsSignupFormOpen(true);
                                }}
                            >
                                Join Waitlist Now
                                <ArrowRight className="w-5 h-5 ml-2"/>
                            </Button>

                            <p className="text-center text-sm text-muted-foreground mt-4">
                                No credit card required for free trial
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-secondary border-primary/30 shadow-card relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"/>
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">Pay-as-You-Go</h3>
                                {/*<p className="text-muted-foreground">Perfect for startups and growing teams</p>*/}
                            </div>

                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold text-primary mb-2">Top up from $5</div>
                                <div className="text-sm text-muted-foreground mt-2">
                                    ~90% cheaper than Claude or GPT-5
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3"/>
                                    <span>Including everything in free</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3"/>
                                    <span>99.9% uptime SLA</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3"/>
                                    <span>No monthly commitments</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="w-5 h-5 text-primary mr-3"/>
                                    <span>Developer support</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 h-auto"
                                onClick={() => {
                                    trackButtonClick("pricing_payasyougo_join_waitlist");
                                    setIsSignupFormOpen(true);
                                }}
                            >
                                Join Waitlist Now
                                <ArrowRight className="w-5 h-5 ml-2"/>
                            </Button>

                            <p className="text-center text-sm text-muted-foreground mt-4">
                                No credit card required for free trial
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Startup Benefits */}
                <div className="mt-16 text-center">
                    <div
                        className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                        <Rocket className="w-5 h-5 text-primary mr-2"/>
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