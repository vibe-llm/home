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
    description: "Full GLM-4.7 model at significantly lower prices than official APIs. Same capabilities, optimized infrastructure."
  },
  {
    icon: Zap,
    title: "GLM-4.7: Production-Ready Intelligence",
    description: "GLM-4.7 excels at code generation, complex reasoning, and Chinese language tasks. Proven performance in real-world applications."
  },
  {
    icon: Shield,
    title: "Why We're Cheaper",
    description: "Engineering optimizations, not model degradation. We reduce costs through GPU scheduling, request batching, and efficient resource utilization."
  },
  {
    icon: Code,
    title: "Easy Integration",
    description: "Standard API format compatible with popular AI tools. Switch endpoints and keys - no code changes required."
  },
  {
    icon: CreditCard,
    title: "Pay-as-You-Go",
    description: "No monthly commitments or minimum usage requirements. Scale up or down instantly and pay only for what you use."
  },
  {
    icon: Rocket,
    title: "Ideal For",
    description: "Individual developers, early-stage startups, side projects, and internal tools where cost efficiency matters."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Vibe LLM?
          </h2>
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