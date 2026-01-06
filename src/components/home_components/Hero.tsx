import { Zap, Brain } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            console.error('Video ref is null');
            return;
        }

        const handleTimeUpdate = () => {
            if (video.duration && video.duration > 0) {
                const currentProgress = (video.currentTime / video.duration) * 100;
                setProgress(currentProgress);
            }
        };

        const handleError = (e: Event) => {
            const target = e.target as HTMLVideoElement;
            const error = target.error;
            console.error('Video error event:', e);
            console.error('Video error object:', error);
            
            if (error) {
                const errorMessages = [
                    'Unknown error',
                    'Video loading aborted',
                    'Network error',
                    'Video decode error',
                    'Video format not supported'
                ];
                const errorMessage = errorMessages[error.code] || errorMessages[0];
                setVideoError(`${errorMessage} (code: ${error.code})`);
            } else {
                setVideoError('Unknown video error');
            }
            setIsLoading(false);
            setVideoReady(false);
        };

        const handleLoadedData = () => {
            console.log('Video data loaded successfully');
            setVideoError(null);
            setIsLoading(false);
            setVideoReady(true);
        };

        const handleLoadStart = () => {
            console.log('Video loading started');
            setIsLoading(true);
        };

        const handleCanPlay = () => {
            console.log('Video can play - attempting to play');
            setIsLoading(false);
            setVideoReady(true);
            
            // Attempt to play
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Video playing successfully');
                    })
                    .catch(err => {
                        console.error('Autoplay failed:', err);
                        // Even if autoplay fails, the video is ready to be shown
                    });
            }
        };

        const handlePlaying = () => {
            console.log('Video is now playing');
            setIsLoading(false);
            setVideoReady(true);
        };


        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("error", handleError);
        video.addEventListener("loadeddata", handleLoadedData);
        video.addEventListener("loadstart", handleLoadStart);
        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("playing", handlePlaying);
        
        // Force load the video
        console.log('Calling video.load()');
        video.load();
        
        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("error", handleError);
            video.removeEventListener("loadeddata", handleLoadedData);
            video.removeEventListener("loadstart", handleLoadStart);
            video.removeEventListener("canplay", handleCanPlay);
            video.removeEventListener("playing", handlePlaying);
        };
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
                    <div className="rounded-2xl border-2 border-border overflow-hidden shadow-2xl relative bg-secondary/20 min-h-[300px]">
                        <video
                            ref={videoRef}
                            className="w-full h-auto pointer-events-none block"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            style={{ 
                                minHeight: '300px',
                                backgroundColor: '#000',
                                objectFit: 'contain'
                            }}
                        >
                            <source src="/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {isLoading && !videoError && !videoReady && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/90 z-10">
                                <div className="animate-pulse">
                                    <p className="text-muted-foreground text-sm mb-2">Loading video...</p>
                                    <div className="w-48 h-1 bg-primary/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-1/2 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {videoError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 border-2 border-destructive p-4 z-10">
                                <div className="text-center bg-background/90 p-4 rounded-lg">
                                    <p className="text-destructive text-sm font-semibold mb-2">❌ Video Error</p>
                                    <p className="text-destructive text-xs mb-2">{videoError}</p>
                                    <p className="text-xs text-muted-foreground">Check browser console for details</p>
                                </div>
                            </div>
                        )}
                        {/* Progress Bar */}
                        {videoReady && !videoError && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/30 z-10">
                                <div
                                    className="h-full bg-primary transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
