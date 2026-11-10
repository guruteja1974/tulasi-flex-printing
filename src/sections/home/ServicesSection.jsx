import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { homeServices } from '../../data/homeData.js';
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
          description="Explore the print, display, and fabrication categories in the approved business brief."
          eyebrow="Production capabilities"
          title="Specialized Printing & Fabrication"
        />
        <p className="home-services__image-note">
          Reference imagery supplied in the design code · not verified photographs
          of Tulasi facilities or client work
        </p>

        <div className="home-services__grid">
          {homeServices.map(({ title, description, icon: Icon, image, imageAlt }) => (
            <article className="home-service-card" key={title}>
              <div className="home-service-card__image">
                <img alt={imageAlt} loading="lazy" src={image} />
                <span className="home-service-card__reference">
                  Reference visual
                </span>
              </div>
              <div className="home-service-card__body">
                <div className="home-service-card__title-row">
                  <Icon aria-hidden="true" size={16} />
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
                <Link
                  aria-label={`Learn about ${title}`}
                  className="home-service-card__link"
                  to="/services"
                >
                  Explore service
                  <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
