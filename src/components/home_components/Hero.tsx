import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import SignupForm from "../SignupForm.tsx";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

    return (
        <section className="relative min-h-[70vh] bg-gradient-hero flex items-center">
            {/* Subtle background - removed for light theme */}

            {/* Content */}
            <div className="relative container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-border/50 text-sm font-medium mb-8 shadow-sm">
                        <Zap className="w-4 h-4 mr-2 text-primary" />
                        Powered by Open-Source GLM-4.7
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                        Vibe LLM
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">
                        Access <span className="text-primary">GLM-4.7</span> at up to <span className="text-primary">50% Off</span>
                    </h2>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                        Full GLM-4.7 model capabilities, optimized through engineering.
                        Same intelligence, lower cost.
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg px-10 py-6 h-auto"
                            onClick={() => navigate('/dashboard2')}
                        >
                            Login to Dashboard
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>

                    {/* Free credit note */}
                    <p className="text-muted-foreground mt-8">
                        <span className="text-primary font-semibold">$3 free credit</span> for new users
                    </p>

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
