import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";

const Building = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <Construction className="w-16 h-16 text-primary" />
          </div>
        </div>
        
        {/* Main Message */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          This page is under construction
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          We're still building this feature. It will be available soon.
        </p>
        
        {/* CTA Button */}
        <Button 
          size="lg" 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Vibe LLM
        </Button>
      </div>
    </div>
  );
};

export default Building;