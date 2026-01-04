import { Card, CardContent } from "@/components/ui/card.tsx";
import {
    DollarSign,
    Code,
    Zap,
    CreditCard
} from "lucide-react";

const Features = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium mb-5 text-foreground">
                        Why Choose Vibe LLM?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        Production-ready GLM-4.7 without the premium price tag
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">

                    {/* Large card - spans 2 cols, 2 rows */}
                    <Card className="md:col-span-2 md:row-span-2 bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
                        <CardContent className="p-8 flex-1 flex flex-col">
                            <div className="p-4 rounded-xl bg-primary/5 w-fit mb-6">
                                <DollarSign className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-serif font-medium mb-4 leading-tight">Save Up to 50% on Output Costs</h3>
                            <p className="text-base text-muted-foreground leading-relaxed mb-6">
                                Output at <span className="text-foreground font-medium">$1.10/M tokens</span> vs Z.AI's $2.20.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed mb-8">
                                Achieved through engineering optimizations like GPU scheduling, request batching, and efficient resource utilization.
                            </p>

                            <div className="mt-auto space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-foreground">Vibe LLM</span>
                                        <span className="text-primary font-bold">$1.10</span>
                                    </div>
                                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[50%] rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Z.AI</span>
                                        <span>$2.20</span>
                                    </div>
                                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-muted-foreground/20 w-full rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Merged GLM-4.7 Card - spans 2 cols */}
                    <Card className="md:col-span-2 bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7 flex items-start gap-5">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit flex-shrink-0">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-serif font-medium mb-2 leading-tight">Full-Fidelity GLM-4.7 Intelligence</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    Excels at code generation, complex reasoning, and Chinese language tasks. We use the complete GLM-4.7 model with no compromises—full capabilities, full intelligence.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pay-As-You-Go - spans 2 cols (Expanded to fill row) */}
                    <Card className="md:col-span-2 bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 rounded-xl bg-primary/5 w-fit">
                                    <CreditCard className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-serif font-medium leading-tight">Pay-As-You-Go</h3>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                No monthly commitments. Top up from $5, scale instantly.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Drop-In Integration (Merged with Built For Developers) - spans 4 cols (Full width bottom) */}
                    <Card className="md:col-span-4 bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-xl bg-primary/5 w-fit">
                                            <Code className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-medium leading-tight">Drop-In Integration</h3>
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                                        Standard API format compatible with popular AI tools. Change endpoints and keys - no code modifications needed.
                                    </p>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        Perfect for individual developers, early-stage startups, side projects, and internal tools where cost efficiency matters.
                                    </p>
                                </div>
                                <div className="w-full md:w-1/2 bg-secondary/50 rounded-xl p-6 border border-border/50 font-mono text-sm text-muted-foreground overflow-hidden shadow-inner">
                                    <div className="flex gap-3 mb-3">
                                        <span className="text-primary select-none">$</span>
                                        <span className="text-foreground">
                                        export ANTHROPIC_BASE_URL=https://api.vibe-llm.online/api/anthropic
                                        </span>
                                    </div>
                                    <div className="flex gap-3 mb-3">
                                        <span className="text-primary select-none">$</span>
                                        <span className="text-foreground">export ANTHROPIC_API_KEY=sk-vibe-...</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-primary select-none">$</span>
                                        <span className="text-green-600">claude # Ready to code!</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
};

export default Features;
