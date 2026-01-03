import { Card, CardContent } from "@/components/ui/card.tsx";
import {
    DollarSign,
    Code,
    Zap,
    CreditCard,
    Shield,
    Rocket
} from "lucide-react";

const features = [
    {
        icon: DollarSign,
        title: "Up to 50% Cost Savings",
        description: "Full GLM-4.7 model at significantly lower prices than official APIs. Same capabilities, optimized infrastructure.",
        size: "large"
    },
    {
        icon: Zap,
        title: "GLM-4.7 Intelligence",
        description: "Excels at code generation, complex reasoning, and Chinese language tasks.",
        size: "small"
    },
    {
        icon: Shield,
        title: "Why Cheaper?",
        description: "Engineering optimizations: GPU scheduling, request batching, efficient resource utilization.",
        size: "small"
    },
    {
        icon: Code,
        title: "Easy Integration",
        description: "Standard API format. Switch endpoints and keys - no code changes required.",
        size: "small"
    },
    {
        icon: CreditCard,
        title: "Pay-as-You-Go",
        description: "No monthly commitments or minimum usage requirements. Pay only for what you use.",
        size: "small"
    },
    {
        icon: Rocket,
        title: "Built For",
        description: "Individual developers, early-stage startups, side projects, and internal tools where cost efficiency matters.",
        size: "large"
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Choose Vibe LLM?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Production-ready GLM-4.7 at a fraction of the cost
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">

                    {/* Large card - spans 2 cols, 2 rows */}
                    <Card className="md:col-span-2 md:row-span-2 bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-8 h-full flex flex-col">
                            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                                <DollarSign className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Up to 50% Cost Savings</h3>
                            <p className="text-muted-foreground leading-relaxed flex-1">
                                Full GLM-4.7 model at significantly lower prices than official APIs. Same capabilities, optimized infrastructure.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Small cards */}
                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">GLM-4.7 Intelligence</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Excels at code generation, complex reasoning, and Chinese language tasks.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Why Cheaper?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Engineering optimizations: GPU scheduling, request batching, efficient resource utilization.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                                <Code className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Easy Integration</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Standard API format. Switch endpoints and keys - no code changes required.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                                <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Pay-as-You-Go</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No monthly commitments. Pay only for what you use.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Large card - spans 2 cols */}
                    <Card className="md:col-span-2 bg-card border-border shadow-bento hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-primary/10">
                                    <Rocket className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Built For</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
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
