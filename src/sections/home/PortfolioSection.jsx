import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { portfolioReferences } from '../../data/homeData.js';
import HomeConceptArtwork from './HomeConceptArtwork.jsx';
import './PortfolioSection.css';

export default function PortfolioSection() {
  return (
    <section
      aria-labelledby="home-portfolio-title"
      className="home-portfolio section"
      id="home-portfolio"
    >
      <div className="container--wide">
        <div className="home-portfolio__intro">
          <SectionHeading
            className="home-portfolio__heading"
            id="home-portfolio-title"
            eyebrow="Selected visual references"
            title="Curated Print & Display Concepts"
          />
          <div className="home-portfolio__aside">
            <p>
              Illustrative design concepts only. They are not verified Tulasi
              client projects; approved project photography is pending.
            </p>
            <Link className="home-portfolio__all-link" to="/portfolio">
              Visit portfolio
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>

        <div className="home-portfolio__grid">
          {portfolioReferences.map((project, index) => (
            <article className="home-project-card" key={project.title}>
              <div className="home-project-card__image">
                <HomeConceptArtwork
                  label={project.imageAlt}
                  type={project.illustration}
                />
                <span className="home-project-card__category">
                  {project.category}
                </span>
                <span className="home-project-card__reference">
                  Concept only
                </span>
              </div>
              <div className="home-project-card__body">
                <span className="home-project-card__index">
                  Visual concept · {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description} Not a verified client project.</p>
                <Link
                  aria-label={`View portfolio page for ${project.title}`}
                  className="home-project-card__link"
                  to="/portfolio"
                >
                  <span>View project details</span>
                  <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="home-portfolio__footer">
          <span>
            <span aria-hidden="true" className="home-portfolio__footer-dot" />
            Concept imagery only · approved project photography pending
          </span>
          <Link className="button button--outline" to="/portfolio">
            Explore all work
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
