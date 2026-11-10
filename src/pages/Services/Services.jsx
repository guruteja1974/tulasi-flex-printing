import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/common/PageHero.jsx';
import { servicesData } from '../../data/servicesData.js';
import '../contentPages.css';
import './Services.css';

export default function Services() {
  return (
    <div className="content-page services-page">
      <PageHero
        description="Explore the six print, display, and fabrication categories in the business brief. Materials, equipment, scope, and availability are confirmed for each enquiry."
        eyebrow="Services · Print, display & fabrication"
        title="A considered approach to every format"
      >
        <Link className="button button--secondary" to="/contact">
          Discuss your project <ArrowRight aria-hidden="true" size={16} />
        </Link>
        <a className="button button--outline" href="#service-catalog">
          Browse services <ArrowDown aria-hidden="true" size={16} />
        </a>
      </PageHero>

      <section
        aria-label="Service categories"
        className="services-page__catalog content-section"
        id="service-catalog"
      >
        <div className="container--wide">
          <div className="services-page__jump-links">
            {servicesData.map(({ number, title }) => (
              <a href={`#service-${number}`} key={number}>
                <span>{number}</span>
                {title}
              </a>
            ))}
          </div>
          <p className="content-note services-page__reference-note">
            Service descriptions outline enquiry topics only. Supplied images
            are designer references and are not confirmed photographs of
            Tulasi facilities or client work.
          </p>

          <div className="services-page__list">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  className={`services-page__service${index % 2 ? ' services-page__service--reverse' : ''}`}
                  id={`service-${service.number}`}
                  key={service.title}
                >
                  <div className="services-page__image">
                    <img alt={service.imageAlt} loading="lazy" src={service.image} />
                    <span>Illustrative design reference</span>
                  </div>
                  <div className="services-page__copy">
                    <p className="services-page__number">
                      <span>{service.number}</span> Service category
                    </p>
                    <div className="services-page__title">
                      <Icon aria-hidden="true" size={22} />
                      <h2>{service.title}</h2>
                    </div>
                    <p>{service.overview}</p>
                    <h3>Possible project discussions</h3>
                    <ul>
                      {service.options.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ul>
                    <Link className="button button--outline" to="/contact">
                      Enquire about this category
                      <ArrowRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="content-section content-section--alternate">
        <div className="container--wide services-page__closing">
          <div>
            <p className="page-hero__eyebrow">Plan your next project</p>
            <h2>Start with the details that matter to you.</h2>
            <p>
              Share your requirements, preferred materials, dimensions, and
              timing. We can then confirm what is suitable and available.
            </p>
          </div>
          <Link className="button button--secondary" to="/contact">
            Request an enquiry <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
