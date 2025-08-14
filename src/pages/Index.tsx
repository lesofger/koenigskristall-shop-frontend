import Hero from "@/components/Hero";
import CrystalGrid from "@/components/CrystalGrid";
import ServiceSection from "@/components/Services";
import QualityPromise from "@/components/QualityPromise";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import BottomFooter from "@/components/BottomFooter";


const Index = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ServiceSection />
      <CrystalGrid />
      <QualityPromise />
      <Footer />
      <BottomFooter />
    </div>
  );
};

export default Index;
