import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import { homeMetrics } from '../../data/homeData.js';
import { WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';
import { HomeIllustration } from './HomeArtwork.jsx';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section aria-labelledby="home-hero-title" className="home-hero">
      <div className="container--wide home-hero__layout">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">
            <span aria-hidden="true" className="home-hero__eyebrow-dot" />
            Established 1994 <span aria-hidden="true">·</span> Printing &amp; Fabrication
          </p>
          <h1 className="home-hero__title" id="home-hero-title">
            Print. Display.
            <span>Ideas made to brief.</span>
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
            <WhatsAppLink message={WHATSAPP_MESSAGES.header} />
          </div>
          <p className="home-hero__contact-note">
            Message us on WhatsApp to discuss your printing and advertising
            needs.
          </p>
          <a className="home-hero__scroll" href="#home-about">
            About the business
            <ArrowDown aria-hidden="true" size={15} />
          </a>
        </div>

        <div
          aria-label="Illustrative printing, invitation, and signage artwork; not company project photographs"
          className="home-hero__visual"
          role="group"
        >
          <p className="home-hero__visual-note">
            Illustrative artwork · approved business photography pending
          </p>
          <figure className="home-hero__image home-hero__image--1">
            <svg
              aria-label="Illustration of a printing machine producing a banner"
              className="home-hero__machine-art"
              role="img"
              viewBox="0 0 400 520"
            >
              <rect fill="#141416" height="520" width="400" />
              <circle cx="200" cy="250" fill="#d4af37" opacity=".09" r="170" />
              <use href="#home-flex" height="293" width="440" x="-20" y="130" />
              <g transform="translate(318 78) rotate(10)">
                <circle fill="#d4af37" r="42" stroke="#0a0a0b" strokeWidth="3" />
                <text
                  fill="#0a0a0b"
                  fontFamily="Georgia, serif"
                  fontSize="18"
                  fontWeight="700"
                  textAnchor="middle"
                  y="6"
                >
                  EST.
                </text>
                <text
                  fill="#0a0a0b"
                  fontFamily="Arial, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                  y="25"
                >
                  1994
                </text>
              </g>
            </svg>
            <span className="home-hero__speech">
              Tulasi Flex Printing &amp; Arts was established in 1994.
            </span>
            <figcaption>Flex &amp; Large-Format Printing</figcaption>
          </figure>
          <figure className="home-hero__image home-hero__image--2">
            <HomeIllustration
              className="home-hero__small-art"
              label="Illustration of a wedding invitation card"
              name="invite"
            />
            <figcaption>Wedding &amp; Invitation Printing</figcaption>
          </figure>
          <figure className="home-hero__image home-hero__image--3">
            <HomeIllustration
              className="home-hero__small-art"
              label="Illustration of a shopfront with signage"
              name="sign"
            />
            <figcaption>Architectural Signage</figcaption>
          </figure>
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
