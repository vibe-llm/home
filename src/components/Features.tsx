import { Card, CardContent } from "@/components/ui/card";
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
    title: "Massive Cost Savings",
    description: "Get the same intelligence as Claude Sonnet or GPT-5 at 50-70% less cost. Perfect for budget-conscious startups and scaling teams."
  },
  {
    icon: Code,
    title: "Drop-In Replacement",
    description: "Works seamlessly with your existing AI tools. E.g. Connect Claude client with just an API key change."
  },
  {
    icon: Zap,
    title: "Enterprise Performance",
    description: "High throughput, low latency, and 99.9% uptime. Built for production workloads with the reliability you need."
  },
  {
    icon: CreditCard,
    title: "Pay-as-You-Go",
    description: "No monthly commitments or minimum usage requirements. Scale up or down instantly and pay only for what you use."
  },
  {
    icon: Shield,
    title: "Developer-Friendly API",
    description: "Clean, well-documented API with comprehensive examples. Get up and running in minutes, not hours."
  },
  {
    icon: Rocket,
    title: "Startup Optimized",
    description: "Designed specifically for growing teams. Get enterprise AI capabilities while keeping costs low as you scale."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to Build with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed for developers and startups who demand performance without compromise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-primary mr-4 group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;