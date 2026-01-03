import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import ContactUsForm from "../ContactUsForm.tsx";
import SignupForm from "../SignupForm.tsx";
import { trackButtonClick } from "@/lib/analytics.ts";

const faqs = [
    {
        question: "What is GLM-4.7 and why should I use it?",
        answer: "GLM-4.7 is a production-ready open-source large language model that excels at code generation, complex reasoning, and Chinese language tasks. It delivers stable, mature performance covering most general conversation and code-related use cases."
    },
    {
        question: "Why is Vibe LLM cheaper than the official GLM-4.7 API?",
        answer: "We reduce costs through engineering optimizations, not by degrading the model. Our infrastructure uses GPU scheduling optimization, request batching, efficient resource utilization, and load balancing. This allows us to offer up to 50% savings while maintaining full model capabilities."
    },
    {
        question: "Do you modify or weaken the GLM-4.7 model?",
        answer: "No. We use the complete GLM-4.7 model - the weights and architecture are fully compliant with the open-source agreement. Model capabilities remain identical to the original version."
    },
    {
        question: "How easy is it to integrate Vibe LLM?",
        answer: "Very easy. We provide a standard API format compatible with popular AI tools. Simply change the API endpoint and key - no code changes required."
    },
    {
        question: "Are there any usage limits or minimum commitments?",
        answer: "No minimum commitments whatsoever. You pay only for what you use, down to the token. Free tier users have reasonable rate limits, and paid users enjoy higher limits."
    },
    {
        question: "What's included in the $3 free credit?",
        answer: "The $3 free credit gives you approximately 300,000 tokens to test our service - enough to process about 150 pages of text or have hundreds of conversations. No credit card required to sign up."
    }
];

const FAQ = () => {
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Everything you need to know about Vibe LLM
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-3">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="bg-card border border-border rounded-lg px-6 hover:border-primary/40 hover:shadow-sm transition-all"
                            >
                                <AccordionTrigger className="text-left font-semibold hover:text-primary py-5">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Contact CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-muted-foreground mb-4">
                            Can't find your answer?{" "}
                            <button
                                onClick={() => {
                                    trackButtonClick("faq_contact_team");
                                    setIsContactFormOpen(true);
                                }}
                                className="text-primary hover:underline ml-1"
                            >
                                Contact our team
                            </button>
                        </p>
                    </div>
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
