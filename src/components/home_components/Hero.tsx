import { Zap, Brain } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (video.duration) {
                const currentProgress = (video.currentTime / video.duration) * 100;
                setProgress(currentProgress);
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    return (
        <section className="relative min-h-screen bg-background flex flex-col pt-20">

            {/* Main Content */}
            <div className="flex-1 container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 pb-20">

                {/* Left Column */}
                <div className="flex-1 text-left space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-footnote font-medium border border-border/50">
                        <Zap className="w-3.5 h-3.5 mr-2 text-primary" />
                        Powered by Open-Source GLM-4.7
                    </div>

                    <h1 className="text-[3.5rem] font-serif font-normal leading-tight tracking-tight text-foreground">
                        Access <span className="font-bold">Full GLM-4.7</span> <br/>
                        at up to <span className="font-bold italic text-[#D97757]">50% Off</span>
                    </h1>

                    <div className="space-y-4 max-w-lg">
                        <div className="flex items-center gap-3 text-bodyLg text-muted-foreground font-light">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                <Brain className="w-4 h-4" />
                            </span>
                            Same intelligence, lower cost. Optimized through engineering.
                        </div>
                        <div className="flex items-center gap-3 text-bodyLg text-muted-foreground font-light">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                <Zap className="w-4 h-4" />
                            </span>
                            Integrate in just 10 seconds
                        </div>
                    </div>

                    <div className="max-w-xs">
                        <GoogleSignInButton />
                    </div>

                     {/* Free credit note */}
                    <p className="text-footnote text-muted-foreground">
                        <span className="text-primary font-semibold">$3 free credit</span> for new users
                    </p>
                </div>

                {/* Right Column - Video Placeholder */}
                <div className="flex-1 w-full max-w-xl space-y-3">
                    <p className="text-sm font-medium text-muted-foreground text-center md:text-left pl-1">
                        Watch: How to integrate in seconds
                    </p>
                    <div className="rounded-2xl border border-border overflow-hidden shadow-2xl relative">
                        <video
                            ref={videoRef}
                            src="/demo.mp4"
                            className="w-full h-auto pointer-events-none"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/30">
                            <div
                                className="h-full bg-primary transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
