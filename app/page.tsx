import { AboutSection } from "@/components/home/AboutSection";
import { AdditiveCapabilitiesSection } from "@/components/home/AdditiveCapabilitiesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { PageLoader } from "@/components/shared/PageLoader";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PageLoader />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <IndustriesSection />
        <ProductsSection />
        <AdditiveCapabilitiesSection />
        <TechnologySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
