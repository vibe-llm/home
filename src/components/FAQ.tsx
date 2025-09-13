import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactUsForm from "./ContactUsForm";
import SignupForm from "./SignupForm";

const faqs = [
  {
    question: "How does Vibe LLM compare to Claude Sonnet and GPT-5 in terms of performance?",
    answer: "Vibe LLM delivers comparable performance to Claude Sonnet and GPT-5 across all major benchmarks including reasoning, coding, and creative tasks. Our models are fine-tuned for efficiency while maintaining the same level of intelligence and accuracy you expect from top-tier LLMs."
  },
  {
    question: "How easy is it to switch from Anthropic to Vibe LLM?",
    answer: "Extremely easy. Vibe LLM is fully compatible with Claude's API format. Simply change your API endpoint and key - no code changes required. Whether you're using the OpenAI Python library, Cursor, Claude for Work, or any other tool, it will work seamlessly."
  },
  {
    question: "Are there any usage limits or minimum commitments?",
    answer: "No minimum commitments whatsoever. You pay only for what you use, down to the token. There are decent rate limits for free tier users, and we offer higher limits for all paid users."
  },
  {
    question: "What's included in the $3 free credit?",
    answer: "The $3 free credit gives you approximately 300,000 tokens to test our service - enough to process about 150 pages of text or have hundreds of conversations. No credit card required to sign up, and there's no expiration date on your free credit."
  },
  {
    question: "How do you ensure reliability and uptime?",
    answer: "We maintain 99.9% uptime with redundant infrastructure across multiple regions. Our average response time is under 50ms, and we provide real-time status monitoring. Plus, we offer enterprise SLAs for mission-critical applications."
  },
  {
    question: "How does billing work?",
    answer: "Billing is transparent and usage-based. You're charged per token at $10 per million tokens (input and output combined). We provide detailed usage analytics. Invoices are generated per payment with no hidden fees."
  },
  {
    question: "What if I want to withdraw unused credit?",
    answer: "You can withdraw unused credit at any time. Simply contact our team and we'll process the refund. No questions asked."
  },
  {
    question: "Can I use Vibe LLM for commercial projects?",
    answer: "Absolutely. Vibe LLM is designed for production use in commercial applications. We offer standard commercial licensing with no restrictions on use cases (following our acceptable use policy). Many startups already rely on us for their AI needs."
  }
];

const FAQ = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about switching to Vibe LLM. Can't find your answer? 
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="text-primary hover:underline ml-1 cursor-pointer"
            >
              Contact our team
            </button>.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-lg px-6 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* CTA at bottom of FAQ */}
        <div className="text-center mt-16">
          <button 
            onClick={() => setIsSignupFormOpen(true)}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 cursor-pointer"
          >
            Ready to get started? Join the waitlist!
          </button>
        </div>
      </div>
      <ContactUsForm 
        isOpen={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
      <SignupForm 
        isOpen={isSignupFormOpen}
        onOpenChange={setIsSignupFormOpen}
      />
    </section>
  );
};

export default FAQ;