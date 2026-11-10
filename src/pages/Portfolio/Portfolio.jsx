import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/common/PageHero.jsx';
import { portfolioCategories, portfolioData } from '../../data/portfolioData.js';
import '../contentPages.css';
import './Portfolio.css';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All work');
  const visibleProjects = useMemo(
    () =>
      activeCategory === 'All work'
        ? portfolioData
        : portfolioData.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="content-page portfolio-page">
      <PageHero
        description="A gallery of visual references supplied with the design materials. Approved Tulasi project photography and case studies can replace these concepts when provided."
        eyebrow="Portfolio · Visual references"
        title="Print and display, seen through the design lens"
      >
        <Link className="button button--secondary" to="/contact">
          Discuss a project <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </PageHero>

      <section className="content-section">
        <div className="container--wide">
          <div className="content-note portfolio-page__note">
            <strong>Reference gallery:</strong> The images below came from
            supplied designer reference code. They are illustrative only and
            do not represent verified Tulasi customers, installations, or
            completed projects.
          </div>

          <div aria-label="Filter portfolio references" className="portfolio-page__filters">
            {portfolioCategories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={`portfolio-page__filter${activeCategory === category ? ' is-active' : ''}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="portfolio-page__result-count">
            Showing {visibleProjects.length}{' '}
            {visibleProjects.length === 1 ? 'reference' : 'references'}
          </p>

          <div className="portfolio-page__grid">
            {visibleProjects.map((project, index) => (
              <article className="portfolio-page__card" key={project.title}>
                <div className="portfolio-page__image">
                  <img alt={project.imageAlt} loading="lazy" src={project.image} />
                  <span>{project.category}</span>
                  <span>Design reference</span>
                </div>
                <div className="portfolio-page__card-copy">
                  <p>Visual concept · {String(index + 1).padStart(2, '0')}</p>
                  <h2>{project.title}</h2>
                  <p>
                    Illustrative category image. Client attribution and
                    project details are not supplied.
                  </p>
                  <Link to="/contact">
                    Discuss a similar brief
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section--alternate">
        <div className="container--wide portfolio-page__cta">
          <div>
            <p className="page-hero__eyebrow">Have a brief in mind?</p>
            <h2>Let’s talk about your next print or display project.</h2>
          </div>
          <Link className="button button--secondary" to="/contact">
            Start an enquiry <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
