import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { homeAdvantages } from '../../data/homeData.js';
import './AdvantagesSection.css';

export default function AdvantagesSection() {
  return (
    <section
      aria-labelledby="home-advantages-title"
      className="home-advantages section"
      id="home-advantages"
    >
      <div className="container--wide">
        <div className="home-advantages__intro">
          <SectionHeading
            className="home-advantages__heading"
            id="home-advantages-title"
            description="A clear brief, considered options, and confirmed scope help every enquiry start on solid ground."
            eyebrow="The Tulasi approach"
            title="Why Choose Tulasi"
          />
          <p className="home-advantages__disclaimer">
            Reference section copy; operational claims and measurable
            capabilities require confirmation before publication.
          </p>
        </div>

        <div className="home-advantages__grid">
          {homeAdvantages.map(({ number, title, description, icon: Icon }) => (
            <article className="home-advantage-card" key={number}>
              <div className="home-advantage-card__top">
                <span>{number}</span>
                <Icon aria-hidden="true" size={16} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span aria-hidden="true" className="home-advantage-card__rule" />
              <ArrowUpRight
                aria-hidden="true"
                className="home-advantage-card__arrow"
                size={15}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
