import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    company: "Early-stage AI startup",
    avatar: "SC",
    content: "Vibe LLM saved us over $2,000 per month in AI costs without any performance drop. As a bootstrapped startup, this cost reduction allowed us to extend our runway and focus on growth instead of worrying about AI bills.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Developer",
    company: "Independent Contractor",
    avatar: "MR",
    content: "The API integration was seamless - literally just changed the endpoint in my existing code. Performance is identical to GPT-4 but at a fraction of the cost. Game-changer for my client projects.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers and startups who've already made the switch to affordable, high-performance AI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card"
            >
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Trusted by 1,000+ developers and growing</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-2xl font-bold">7M+</div>
            <div className="text-sm text-muted-foreground">API Calls</div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-2xl font-bold">93ms</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;