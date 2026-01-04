import { Card, CardContent } from "@/components/ui/card.tsx";
import {
    DollarSign,
    Code,
    Zap,
    CreditCard,
    Shield,
    Rocket,
    Server,
    Gauge
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
                    <Card className="md:col-span-2 md:row-span-2 bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-8 h-full flex flex-col">
                            <div className="p-4 rounded-xl bg-primary/5 w-fit mb-5">
                                <DollarSign className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 leading-tight">Save Up to 50% on Output Costs</h3>
                            <p className="text-base text-muted-foreground leading-relaxed flex-1">
                                Output at $1.10/M tokens vs Z.AI's $2.20. Same GLM-4.7 model, optimized infrastructure.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Small cards */}
                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-tight">GLM-4.7 Production Ready</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Excels at code generation, complex reasoning, and Chinese language tasks.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-tight">No Model Compromises</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                We use the complete GLM-4.7 model. Full capabilities, full intelligence.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4">
                                <Server className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-tight">Engineering Optimizations</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Cost savings from GPU scheduling, request batching, and efficient resource utilization.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4">
                                <Code className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-tight">Drop-In Integration</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Standard API format. Change endpoints and keys - no code modifications.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4">
                                <Gauge className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-tight">99.9% Uptime SLA</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Reliable infrastructure with redundant systems. Real-time status monitoring.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="p-3 rounded-xl bg-primary/5 w-fit mb-4">
                                <CreditCard className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 leading-tight">Pay-As-You-Go</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                No monthly commitments. Top up from $5, scale instantly.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Large card - spans 2 cols */}
                    <Card className="md:col-span-2 bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-7">
                            <div className="flex items-start gap-5">
                                <div className="p-4 rounded-xl bg-primary/5">
                                    <Rocket className="w-8 h-8 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-3 leading-tight">Built For Developers</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        Individual developers, early-stage startups, side projects, and internal tools where cost efficiency matters.
                                    </p>
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
