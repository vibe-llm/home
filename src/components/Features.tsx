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
    description: "Access Claude-style capabilities at just 20% the cost of official APIs."
  },
  {
    icon: Code,
    title: "Drop-In Replacement",
    description: "Works seamlessly with your existing AI tools. E.g. Connect Claude client with just an API key change."
  },
  {
    icon: CreditCard,
    title: "Pay-as-You-Go",
    description: "No monthly commitments or minimum usage requirements. Scale up or down instantly and pay only for what you use."
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