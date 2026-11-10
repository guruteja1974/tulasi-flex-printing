import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import { homeMetrics, homeServices } from '../../data/homeData.js';
import './HeroSection.css';

const heroImages = [
  homeServices[2],
  homeServices[0],
  homeServices[3],
];

export default function HeroSection() {
  return (
    <section aria-labelledby="home-hero-title" className="home-hero">
      <div className="container--wide home-hero__layout">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">
            <span aria-hidden="true" className="home-hero__eyebrow-dot" />
            Established 1994 <span aria-hidden="true">·</span> Printing &amp;
            Fabrication
          </p>
          <h1 className="home-hero__title" id="home-hero-title">
            30 Years of
            <span> Creativity. Quality. Trust.</span>
          </h1>
          <p className="home-hero__description">
            From invitation and commercial print to large-format graphics,
            signage, and fabrication, tell us what you have in mind and request
            a project-specific quote.
          </p>
          <p className="home-hero__location">
            <MapPin aria-hidden="true" size={15} />
            Jaggayyapeta, NTR District, Andhra Pradesh
          </p>
          <div className="home-hero__actions">
            <Link className="button button--secondary" to="/services">
              Explore Our Services
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <WhatsAppLink />
          </div>
          <p className="home-hero__contact-note">
            WhatsApp enquiry activates after the verified business number is
            configured.
          </p>
          <a className="home-hero__scroll" href="#home-heritage">
            Explore the story
            <ArrowDown aria-hidden="true" size={15} />
          </a>
        </div>

        <div
          aria-label="Illustrative printing and fabrication imagery supplied with the design references, not verified company project photographs"
          className="home-hero__visual"
          role="group"
        >
          <p className="home-hero__visual-note">
            Designer reference imagery · company photography pending
          </p>
          {heroImages.map((item, index) => (
            <figure
              className={`home-hero__image home-hero__image--${index + 1}`}
              key={item.title}
            >
              <img
                alt={item.imageAlt}
                fetchPriority={index === 0 ? 'high' : undefined}
                src={item.image}
              />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
          <span aria-hidden="true" className="home-hero__visual-orbit" />
        </div>
      </div>

      <div aria-label="Business overview" className="container--wide home-metrics">
        {homeMetrics.map((metric) => (
          <div className="home-metrics__item" key={metric.label}>
            <span className="home-metrics__value">{metric.value}</span>
            <span className="home-metrics__label">{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
