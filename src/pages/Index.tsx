import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralNetworkBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="divider-glow mx-auto max-w-md" />
        <ServicesSection />
        <div className="divider-glow mx-auto max-w-md" />
        <ProcessSection />
        <div className="divider-glow mx-auto max-w-md" />
        <WhyChooseSection />
        <CTASection />
        <div className="divider-glow mx-auto max-w-md" />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
