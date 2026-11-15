import HeritageSection from '../../sections/home/HeritageSection.jsx';
import HeroSection from '../../sections/home/HeroSection.jsx';
import HomeExperienceSection from '../../sections/home/HomeExperienceSection.jsx';
import { HomeIllustrationLibrary } from '../../sections/home/HomeArtwork.jsx';
import PortfolioSection from '../../sections/home/PortfolioSection.jsx';
import ProcessSection from '../../sections/home/ProcessSection.jsx';
import QuoteSection from '../../sections/home/QuoteSection.jsx';
import TestimonialsSection from '../../sections/home/TestimonialsSection.jsx';
import ServicesSection from '../../sections/home/ServicesSection.jsx';
import './HomeLanding.css';

export default function Home() {
  return (
    <div className="home-landing">
      <HomeIllustrationLibrary />
      <HeroSection />
      <HeritageSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <HomeExperienceSection />
      <TestimonialsSection />
      <QuoteSection />
    </div>
  );
}
