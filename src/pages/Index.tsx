import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="divider-glow mx-auto max-w-md" />
        <ServicesSection />
        <div className="divider-glow mx-auto max-w-md" />
        <PortfolioSection />
        <div className="divider-glow mx-auto max-w-md" />
        <ProcessSection />
        <div className="divider-glow mx-auto max-w-md" />
        <WhyChooseSection />
        <CTASection />
        <div className="divider-glow mx-auto max-w-md" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
