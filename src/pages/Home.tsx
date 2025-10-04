import Hero from "@/components/home_components/Hero.tsx";
import Features from "@/components/home_components/Features.tsx";
import Pricing from "@/components/home_components/Pricing.tsx";
import Testimonials from "@/components/home_components/Testimonials.tsx";
import FAQ from "@/components/home_components/FAQ.tsx";
import Footer from "@/components/home_components/Footer.tsx";
import { usePageTracking } from "@/hooks/use-analytics";

const Home = () => {
  usePageTracking("Home");

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
