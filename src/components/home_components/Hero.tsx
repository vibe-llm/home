import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRight, Zap, Code, DollarSign, Cpu } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import SignupForm from "../SignupForm.tsx";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "@/lib/analytics.ts";

const Hero = () => {
    const navigate = useNavigate();
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

    return (
        <section className="relative min-h-[80vh] bg-gradient-hero">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                 style={{ backgroundImage: `url(${heroImage})` }} />

            {/* Content */}
            <div className="relative container mx-auto px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Bento-style grid layout */}
                    <div className="grid lg:grid-cols-12 gap-6 items-center">

                        {/* Left: Main message (8 columns) */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 border border-border text-sm font-medium">
                                <Zap className="w-4 h-4 mr-2 text-primary" />
                                Powered by Open-Source GLM-4.7
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                <span className="text-foreground">Vibe LLM</span>
                            </h1>
                            <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-foreground">
                                Access <span className="text-primary">GLM-4.7</span> at up to <span className="text-primary">50% Off</span>
                            </h2>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                Full GLM-4.7 model capabilities, optimized through engineering.
                                Same intelligence, lower cost.
                            </p>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    size="lg"
                                    className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-base px-8 py-6 h-auto"
                                    onClick={() => navigate('/dashboard2')}
                                >
                                    Login to Dashboard
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>

                            {/* Free credit note */}
                            <p className="text-sm text-muted-foreground">
                                <span className="text-primary font-semibold">$3 free credit</span> for new users
                            </p>
                        </div>

                        {/* Right: Info cards (4 columns) */}
                        <div className="lg:col-span-4 space-y-4">
                            {/* Cost savings card */}
                            <div className="bg-card border border-border rounded-xl p-5 shadow-bento">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">Up to 50% Savings</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            Engineering optimizations, not model degradation
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integration card */}
                            <div className="bg-card border border-border rounded-xl p-5 shadow-bento">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Code className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">Easy Integration</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            Standard API format, switch endpoints & keys
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Model info card */}
                            <div className="bg-card border border-border rounded-xl p-5 shadow-bento">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Cpu className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">GLM-4.7</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            Code, reasoning, Chinese language tasks
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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

export default Hero;
