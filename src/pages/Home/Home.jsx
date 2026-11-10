import AdvantagesSection from '../../sections/home/AdvantagesSection.jsx';
import EmergencySupportSection from '../../sections/home/EmergencySupportSection.jsx';
import HeritageSection from '../../sections/home/HeritageSection.jsx';
import HeroSection from '../../sections/home/HeroSection.jsx';
import PortfolioSection from '../../sections/home/PortfolioSection.jsx';
import ProcessSection from '../../sections/home/ProcessSection.jsx';
import QuoteSection from '../../sections/home/QuoteSection.jsx';
import ServicesSection from '../../sections/home/ServicesSection.jsx';
import TestimonialsSection from '../../sections/home/TestimonialsSection.jsx';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeritageSection />
      <ServicesSection />
      <AdvantagesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <EmergencySupportSection />
      <QuoteSection />
    </>
  );
}
