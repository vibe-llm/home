import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ArrowRight, Zap, Code, DollarSign} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import SignupForm from "./SignupForm";
import {useNavigate} from "react-router-dom";
import { trackButtonClick } from "@/lib/analytics";

const Hero = () => {
    const navigate = useNavigate();
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

    return (
        <section id="top" className="relative min-h-screen bg-gradient-hero overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{backgroundImage: `url(${heroImage})`}}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"/>

            {/* Content */}
            <div className="relative container mx-auto px-6 pt-32 pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium mb-8 shadow-glow">
                        <Zap className="w-4 h-4 mr-2"/>
                        Enterprise AI Power at Startup Prices
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-primary bg-clip-text text-transparent">Vibe LLM</span>
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Use Claude Code at <span
                        className="bg-gradient-primary bg-clip-text text-transparent">10%</span> the Cost
                    </h2>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                        Built for developers who want Claude-level AI without breaking the bank.
                    </p>

                    {/* Key Benefits */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <div className="flex items-center text-foreground">
                            <Code className="w-5 h-5 mr-2 text-primary"/>
                            <span className="font-medium">Easy Integration</span>
                        </div>
                        <div className="flex items-center text-foreground">
                            <DollarSign className="w-5 h-5 mr-2 text-primary"/>
                            <span className="font-medium">Pay-as-You-Go</span>
                        </div>
                        <div className="flex items-center text-foreground">
                            <Zap className="w-5 h-5 mr-2 text-primary"/>
                            <span className="font-medium">Production Ready</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
                            onClick={() => {
                                trackButtonClick("hero_join_waitlist");
                                setIsSignupFormOpen(true);
                            }}
                        >
                            Join Waitlist
                            <ArrowRight className="w-5 h-5 ml-2"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-primary/30 text-foreground hover:shadow-glow text-lg px-8 py-6 h-auto"
                            onClick={() => navigate('/dashboard')}
                        >
                            Already a User
                        </Button>
                    </div>

                    {/* Free Credit Badge */}
                    <p className="text-muted-foreground mt-6">
                        🎉 <span className="text-primary font-semibold">$3 free credit</span> for new users - no strings
                        attached
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