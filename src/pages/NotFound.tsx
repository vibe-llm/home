import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import astronautImage from "@/assets/404-astronaut.png";
import { usePageTracking } from "@/hooks/use-analytics";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  usePageTracking("404 Not Found");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-6 pt-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Astronaut Illustration */}
        <div className="mb-8">
          <img 
            src={astronautImage} 
            alt="Lost astronaut floating in space" 
            className="w-64 h-64 mx-auto mb-6 opacity-90"
          />
        </div>
        
        {/* Main Message */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          404
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground mb-2">
          🚀 Looks like you've drifted into space.
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          This page doesn't exist!
        </p>
        
        {/* CTA Button */}
        <Button 
          size="lg" 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
          onClick={() => navigate('/')}
        >
          Take me home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
