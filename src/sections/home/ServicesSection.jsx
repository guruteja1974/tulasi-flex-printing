import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { homeServices } from '../../data/homeData.js';
import { HomeIllustration } from './HomeArtwork.jsx';
import './ServicesSection.css';

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="home-services-title"
      className="home-services section"
      id="home-services"
    >
      <div className="container--wide">
        <SectionHeading
          align="center"
          className="home-services__heading"
          id="home-services-title"
          description="Six print, display, and fabrication categories. Choose one to start an enquiry."
          eyebrow="Production capabilities"
          title="Specialized Printing & Fabrication"
        />
        <p className="home-services__image-note">
          Illustrative category artwork · actual company photography is pending
        </p>

        <div className="home-services__grid">
          {homeServices.map(({ title, description, route, illustration, speech }) => (
            <Link className="home-service-card" key={title} to={route}>
              <div className="home-service-card__image">
                <HomeIllustration
                  className="home-service-card__art"
                  label={`Illustration for ${title.toLowerCase()}`}
                  name={illustration}
                />
                <span className="home-service-card__reference">
                  Illustration
                </span>
              </div>
              <div className="home-service-card__body">
                <span className="home-service-card__speech">{speech}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="home-service-card__link">
                  Explore service
                  <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
